import { supabaseAdmin } from "./supabaseAdmin";

// Cliente da API do Z-API (envio de WhatsApp via instância própria de cada
// empresa). Endpoints e formato de body confirmados ao vivo contra a
// documentação oficial (developer.z-api.io) em 04/09/2026: send-text,
// send-image e status seguem o padrão /instances/{instanceId}/token/{token}/...
// autenticado por header Client-Token quando a empresa tiver essa proteção
// ativada no painel dela (opcional, mas recomendado pelo próprio Z-API).
//
// Cada empresa conecta a PRÓPRIA instância Z-API (instanceId + token gerados
// no painel dela), guardada em integracoes_zapi — mesmo padrão do Bling e do
// Asaas. O Nexus360 nunca é dono do número de WhatsApp que envia a mensagem.

const ZAPI_BASE = "https://api.z-api.io";

export async function getCredenciaisZapi(companyId) {
  const { data, error } = await supabaseAdmin
    .from("integracoes_zapi")
    .select("instance_id, token, client_token")
    .eq("company_id", companyId)
    .single();
  if (error || !data) throw new Error("Empresa não conectou o WhatsApp (Z-API) ainda.");
  return data;
}

function headers(clientToken) {
  const h = { "Content-Type": "application/json" };
  if (clientToken) h["Client-Token"] = clientToken;
  return h;
}

async function zapiFetch(instanceId, token, path, { clientToken, ...options } = {}) {
  const r = await fetch(`${ZAPI_BASE}/instances/${instanceId}/token/${token}${path}`, {
    ...options,
    headers: { ...headers(clientToken), ...(options.headers || {}) },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || data.message || `Z-API respondeu ${r.status}`);
  return data;
}

// Usada ao conectar: confere se instanceId/token são válidos antes de salvar.
export async function testarInstanciaZapi({ instanceId, token, clientToken }) {
  const status = await zapiFetch(instanceId, token, "/status", { clientToken, method: "GET" });
  if (status.error && !status.connected) {
    throw new Error(status.error);
  }
  return status;
}

export async function statusInstanciaZapi({ instanceId, token, clientToken }) {
  return zapiFetch(instanceId, token, "/status", { clientToken, method: "GET" });
}

function formatarTelefone(numero) {
  const limpo = (numero || "").replace(/\D/g, "");
  return limpo.startsWith("55") ? limpo : "55" + limpo;
}

export async function enviarTextoZapi({ instanceId, token, clientToken, telefone, mensagem }) {
  return zapiFetch(instanceId, token, "/send-text", {
    clientToken, method: "POST",
    body: JSON.stringify({ phone: formatarTelefone(telefone), message: mensagem }),
  });
}

export async function enviarImagemZapi({ instanceId, token, clientToken, telefone, imagemUrl, legenda }) {
  return zapiFetch(instanceId, token, "/send-image", {
    clientToken, method: "POST",
    body: JSON.stringify({ phone: formatarTelefone(telefone), image: imagemUrl, caption: legenda || "" }),
  });
}
