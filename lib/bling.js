import { supabaseAdmin } from "./supabaseAdmin";

// Endpoints da API v3 do Bling — conferidos direto contra o securitySchemes
// do OpenAPI oficial (developer.bling.com.br/build/assets/openapi-*.json) e
// contra o schema de /contatos, /pedidos/vendas e /empresas/me/dados-basicos.
// Importante: a API de dados fica em api.bling.com.br (domínio diferente do
// authorize/token, que ficam em bling.com.br sem o "www").
export const BLING_AUTH_URL  = "https://bling.com.br/Api/v3/oauth/authorize";
export const BLING_TOKEN_URL = "https://bling.com.br/Api/v3/oauth/token";
export const BLING_API_BASE  = "https://api.bling.com.br/Api/v3";

export function blingEnvConfigurado() {
  return Boolean(
    process.env.BLING_CLIENT_ID &&
    process.env.BLING_CLIENT_SECRET &&
    process.env.BLING_REDIRECT_URI
  );
}

function basicAuthHeader() {
  const raw = `${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`;
  return "Basic " + Buffer.from(raw).toString("base64");
}

export async function trocarCodePorToken(code) {
  const r = await fetch(BLING_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": basicAuthHeader(),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.BLING_REDIRECT_URI,
    }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error_description || data.error || "Falha ao trocar code por token no Bling");
  return data; // { access_token, refresh_token, expires_in, ... }
}

async function renovarToken(refreshToken) {
  const r = await fetch(BLING_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": basicAuthHeader(),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error_description || data.error || "Falha ao renovar token do Bling");
  return data;
}

// Busca o CNPJ da conta Bling autenticada — usado pra impedir a mesma conta
// Bling de ser conectada em duas empresas diferentes do Nexus360.
export async function buscarCnpjDaConta(accessToken) {
  const r = await fetch(`${BLING_API_BASE}/empresas/me/dados-basicos`, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  if (!r.ok) throw new Error(`Bling respondeu ${r.status} ao buscar dados da empresa`);
  const json = await r.json();
  return json.data?.cnpj || null;
}

// Retorna um access_token válido para a empresa, renovando (e persistindo)
// se estiver perto de expirar. Lança erro se a empresa não tiver conectado.
export async function getValidAccessToken(companyId) {
  const { data: row, error } = await supabaseAdmin
    .from("integracoes_bling")
    .select("*")
    .eq("company_id", companyId)
    .single();
  if (error || !row) throw new Error("Empresa não tem integração com o Bling conectada.");

  const expiraEm = new Date(row.expires_at).getTime();
  const folga = 60 * 1000; // renova 1min antes de expirar
  if (Date.now() < expiraEm - folga) return row.access_token;

  const novo = await renovarToken(row.refresh_token);
  const expires_at = new Date(Date.now() + (novo.expires_in || 21600) * 1000).toISOString();
  await supabaseAdmin.from("integracoes_bling").update({
    access_token: novo.access_token,
    refresh_token: novo.refresh_token || row.refresh_token,
    expires_at,
  }).eq("company_id", companyId);

  return novo.access_token;
}
