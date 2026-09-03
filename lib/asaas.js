// Cliente da API do Asaas (gateway de pagamento/assinatura recorrente).
// Base URLs e endpoints (/customers, /subscriptions) confirmados contra a
// documentação oficial (docs.asaas.com). O header de autenticação (access_token,
// não "Authorization: Bearer") segue o padrão estável e bem documentado do
// Asaas, mas — diferente do Bling — não consegui abrir cada exemplo de request
// ao vivo na doc (conteúdo carregado sob demanda). TESTE PRIMEIRO NO SANDBOX
// (ASAAS_SANDBOX=true) antes de usar em produção, isso mexe com dinheiro real.

export function asaasApiBase() {
  return process.env.ASAAS_SANDBOX === "true"
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";
}

export function asaasConfigurado() {
  return Boolean(process.env.ASAAS_API_KEY);
}

function headers() {
  return {
    access_token: process.env.ASAAS_API_KEY,
    "Content-Type": "application/json",
    "User-Agent": "Nexus360/1.0",
  };
}

async function asaasFetch(path, options = {}) {
  const r = await fetch(`${asaasApiBase()}${path}`, {
    ...options,
    headers: { ...headers(), ...(options.headers || {}) },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.errors?.[0]?.description || `Asaas respondeu ${r.status}`);
  return data;
}

export async function buscarOuCriarClienteAsaas({ nome, cpfCnpj, telefone }) {
  if (cpfCnpj) {
    const busca = await asaasFetch(`/customers?cpfCnpj=${encodeURIComponent(cpfCnpj)}`);
    if (busca.data?.length) return busca.data[0].id;
  }
  const novo = await asaasFetch("/customers", {
    method: "POST",
    body: JSON.stringify({ name: nome, cpfCnpj: cpfCnpj || undefined, mobilePhone: telefone || undefined }),
  });
  return novo.id;
}

export async function criarAssinaturaAsaas({ customerId, valor, ciclo, descricao, proximaCobranca }) {
  return asaasFetch("/subscriptions", {
    method: "POST",
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

export async function cancelarAssinaturaAsaas(subscriptionId) {
  return asaasFetch(`/subscriptions/${subscriptionId}`, { method: "DELETE" });
}
