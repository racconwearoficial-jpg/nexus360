import { supabaseAdmin } from "./supabaseAdmin";

// Endpoints da API v3 do Bling. Confira contra a documentação oficial
// (developer.bling.com.br) antes de ativar em produção — a Bling já mudou
// detalhes desses fluxos entre versões e isto não foi testado contra uma
// conta real.
export const BLING_AUTH_URL  = "https://www.bling.com.br/Api/v3/oauth/authorize";
export const BLING_TOKEN_URL = "https://www.bling.com.br/Api/v3/oauth/token";
export const BLING_API_BASE  = "https://www.bling.com.br/Api/v3";

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
