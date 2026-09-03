import { NextRequest, NextResponse } from "next/server";
import { trocarCodePorToken, buscarCnpjDaConta } from "@/lib/bling";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Volta pra página do sistema depois de conectar/errar, com um aviso na URL.
function voltarSistema(req: NextRequest, params: Record<string, string>) {
  const url = new URL("/system/nexus360_v2.html", req.nextUrl.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return NextResponse.redirect(url.toString());
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const stateRaw = req.nextUrl.searchParams.get("state");
  const erroBling = req.nextUrl.searchParams.get("error");

  if (erroBling) {
    return voltarSistema(req, { bling: "erro", msg: erroBling });
  }
  if (!code || !stateRaw) {
    return voltarSistema(req, { bling: "erro", msg: "callback_invalido" });
  }

  let companyId: string;
  try {
    const decoded = JSON.parse(Buffer.from(stateRaw, "base64url").toString("utf8"));
    companyId = decoded.cid;
    if (!companyId) throw new Error("sem company id");
  } catch {
    return voltarSistema(req, { bling: "erro", msg: "state_invalido" });
  }

  try {
    const token = await trocarCodePorToken(code);
    const expires_at = new Date(Date.now() + (token.expires_in || 21600) * 1000).toISOString();

    const cnpj = await buscarCnpjDaConta(token.access_token);
    if (cnpj) {
      const { data: outra } = await supabaseAdmin
        .from("integracoes_bling")
        .select("company_id")
        .eq("bling_cnpj", cnpj)
        .neq("company_id", companyId)
        .maybeSingle();
      if (outra) {
        return voltarSistema(req, { bling: "erro", msg: "essa_conta_bling_ja_esta_conectada_em_outra_empresa" });
      }
    }

    const { error } = await supabaseAdmin.from("integracoes_bling").upsert({
      company_id: companyId,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at,
      bling_cnpj: cnpj,
      connected_at: new Date().toISOString(),
      last_sync_at: null,
      last_sync_erro: null,
    }, { onConflict: "company_id" });
    if (error) throw error;

    return voltarSistema(req, { bling: "conectado" });
  } catch (e: any) {
    return voltarSistema(req, { bling: "erro", msg: e.message || "falha_ao_conectar" });
  }
}
