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
