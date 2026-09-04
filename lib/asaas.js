import { supabaseAdmin } from "./supabaseAdmin";

// Cliente da API do Asaas (gateway de pagamento/assinatura recorrente).
// Base URLs e endpoints (/customers, /subscriptions) confirmados contra a
// documentação oficial (docs.asaas.com). O header de autenticação (access_token,
// não "Authorization: Bearer") segue o padrão estável e bem documentado do
// Asaas, mas — diferente do Bling — não consegui abrir cada exemplo de request
// ao vivo na doc (conteúdo carregado sob demanda). TESTE PRIMEIRO NO SANDBOX
// antes de usar em produção, isso mexe com dinheiro real.
//
// Cada empresa conecta a PRÓPRIA conta Asaas (chave própria, guardada em
// integracoes_asaas) — o dinheiro do cliente final cai direto na conta bancária
// dela, o Nexus360 nunca fica no meio do fluxo do dinheiro.

export function asaasApiBase(sandbox) {
  return sandbox ? "https://api-sandbox.asaas.com/v3" : "https://api.asaas.com/v3";
}

export async function getCredenciaisAsaas(companyId) {
  const { data, error } = await supabaseAdmin
    .from("integracoes_asaas")
    .select("api_key, sandbox, webhook_token")
    .eq("company_id", companyId)
    .single();
  if (error || !data) throw new Error("Empresa não conectou a conta Asaas ainda.");
  return data;
}

function headers(apiKey) {
  return {
    access_token: apiKey,
    "Content-Type": "application/json",
    "User-Agent": "Nexus360/1.0",
  };
}

export async function asaasFetch(path, { apiKey, sandbox, ...options }) {
  const r = await fetch(`${asaasApiBase(sandbox)}${path}`, {
    ...options,
    headers: { ...headers(apiKey), ...(options.headers || {}) },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.errors?.[0]?.description || `Asaas respondeu ${r.status}`);
  return data;
}

// Usada ao conectar: confere se a chave é válida antes de salvar.
export async function testarChaveAsaas(apiKey, sandbox) {
  await asaasFetch("/customers?limit=1", { apiKey, sandbox });
}

export async function buscarOuCriarClienteAsaas({ apiKey, sandbox, nome, cpfCnpj, telefone }) {
  if (cpfCnpj) {
    const busca = await asaasFetch(`/customers?cpfCnpj=${encodeURIComponent(cpfCnpj)}`, { apiKey, sandbox });
    if (busca.data?.length) return busca.data[0].id;
  }
  const novo = await asaasFetch("/customers", {
    apiKey, sandbox, method: "POST",
    body: JSON.stringify({ name: nome, cpfCnpj: cpfCnpj || undefined, mobilePhone: telefone || undefined }),
  });
  return novo.id;
}

export async function criarAssinaturaAsaas({ apiKey, sandbox, customerId, valor, ciclo, descricao, proximaCobranca }) {
  return asaasFetch("/subscriptions", {
    apiKey, sandbox, method: "POST",
    body: JSON.stringify({
      customer: customerId,
      billingType: "PIX",
      value: valor,
      cycle: ciclo || "MONTHLY",
      description: descricao,
      nextDueDate: proximaCobranca,
    }),
  });
}

export async function cancelarAssinaturaAsaas({ apiKey, sandbox, subscriptionId }) {
  return asaasFetch(`/subscriptions/${subscriptionId}`, { apiKey, sandbox, method: "DELETE" });
}

// Consulta pontual (botão "Atualizar status") — pra acompanhamento contínuo o
// certo é o webhook, isso aqui é só o atalho manual pra quem não configurou.
export async function ultimoPagamentoAssinatura({ apiKey, sandbox, subscriptionId }) {
  const r = await asaasFetch(`/subscriptions/${subscriptionId}/payments`, { apiKey, sandbox });
  const pagamentos = r.data || [];
  if (!pagamentos.length) return null;
  return pagamentos.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))[0];
}

// Endpoints confirmados contra a doc: /finance/balance e /financialTransactions.
export async function consultarSaldo({ apiKey, sandbox }) {
  return asaasFetch("/finance/balance", { apiKey, sandbox });
}

export async function consultarExtrato({ apiKey, sandbox, limit = 20 }) {
  return asaasFetch(`/financialTransactions?limit=${limit}&offset=0`, { apiKey, sandbox });
}

export async function editarAssinaturaAsaas({ apiKey, sandbox, subscriptionId, valor }) {
  return asaasFetch(`/subscriptions/${subscriptionId}`, {
    apiKey, sandbox, method: "PUT",
    body: JSON.stringify({ value: valor }),
  });
}

// ── Cobrança avulsa (ciclo "AVULSO") — pagamento único via /payments, não
// /subscriptions (que é sempre recorrente por natureza). Endpoints
// confirmados ao vivo contra docs.asaas.com em 04/09/2026.
export async function criarCobrancaAvulsaAsaas({ apiKey, sandbox, customerId, valor, descricao, vencimento }) {
  return asaasFetch("/payments", {
    apiKey, sandbox, method: "POST",
    body: JSON.stringify({
      customer: customerId,
      billingType: "PIX",
      value: valor,
      dueDate: vencimento,
      description: descricao,
    }),
  });
}

export async function consultarPagamentoAsaas({ apiKey, sandbox, paymentId }) {
  return asaasFetch(`/payments/${paymentId}`, { apiKey, sandbox });
}

export async function editarPagamentoAsaas({ apiKey, sandbox, paymentId, valor }) {
  return asaasFetch(`/payments/${paymentId}`, {
    apiKey, sandbox, method: "PUT",
    body: JSON.stringify({ value: valor }),
  });
}

// Só funciona se a cobrança ainda não foi paga — cobrança já recebida não
// pode ser removida no Asaas (dinheiro já caiu na conta).
export async function cancelarPagamentoAsaas({ apiKey, sandbox, paymentId }) {
  return asaasFetch(`/payments/${paymentId}`, { apiKey, sandbox, method: "DELETE" });
}

// Link de Pagamento — página hospedada pelo próprio Asaas, aceita cartão,
// Pix e boleto (billingType UNDEFINED deixa o pagador escolher). Usado no
// checkout público da página de vendas: um link reutilizável por pacote,
// não um link novo a cada clique. Endpoint confirmado ao vivo em 04/09/2026.
export async function criarLinkPagamentoAsaas({ apiKey, sandbox, nome, valor, recorrente, cicloAsaas }) {
  const body = {
    name: nome,
    value: valor,
    billingType: "UNDEFINED",
    chargeType: recorrente ? "RECURRENT" : "DETACHED",
  };
  if (recorrente) body.subscriptionCycle = cicloAsaas || "MONTHLY";
  return asaasFetch("/paymentLinks", { apiKey, sandbox, method: "POST", body: JSON.stringify(body) });
}

// ATENÇÃO: endpoint /notifications/batch confirmado na doc, mas os nomes
// exatos dos campos (whatsApp/enabled) não foram conferidos ao vivo — se o
// Asaas devolver erro de campo inválido aqui, é o primeiro lugar pra olhar.
export async function ativarNotificacaoWhatsapp({ apiKey, sandbox, customerId }) {
  const lista = await asaasFetch(`/customers/${customerId}/notifications`, { apiKey, sandbox });
  const ids = (lista.data || []).map(n => n.id);
  if (!ids.length) return null;
  return asaasFetch("/notifications/batch", {
    apiKey, sandbox, method: "PUT",
    body: JSON.stringify({
      customer: customerId,
      notifications: ids.map(id => ({ id, whatsApp: true, enabled: true })),
    }),
  });
}
