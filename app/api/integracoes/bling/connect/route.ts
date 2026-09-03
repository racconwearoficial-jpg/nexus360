import { NextRequest, NextResponse } from "next/server";
import { BLING_AUTH_URL, blingEnvConfigurado } from "@/lib/bling";

// Inicia o fluxo OAuth: redireciona o admin pra tela de autorização do Bling.
export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });
  }
  if (!blingEnvConfigurado()) {
    return NextResponse.json(
      { error: "Integração com Bling não configurada no servidor (faltam BLING_CLIENT_ID/SECRET/REDIRECT_URI)." },
      { status: 500 }
    );
  }

  const state = Buffer.from(JSON.stringify({ cid: companyId, ts: Date.now() })).toString("base64url");
  const url = new URL(BLING_AUTH_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", process.env.BLING_CLIENT_ID as string);
  url.searchParams.set("state", state);

  return NextResponse.redirect(url.toString());
}
