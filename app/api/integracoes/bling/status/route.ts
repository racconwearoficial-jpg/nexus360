import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabaseAdminConfigurado } from "@/lib/supabaseAdmin";
import { blingEnvConfigurado } from "@/lib/bling";

// Sem isso, o Next/Netlify pode cachear a resposta e mostrar "conectado"
// mesmo depois de desconectar (ou vice-versa).
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });
  }
  const headers = { "Cache-Control": "no-store, max-age=0" };

  if (!supabaseAdminConfigurado || !blingEnvConfigurado()) {
    return NextResponse.json({ disponivel: false, conectado: false }, { headers });
  }

  const { data } = await supabaseAdmin
    .from("integracoes_bling")
    .select("connected_at, last_sync_at, last_sync_erro")
    .eq("company_id", companyId)
    .single();

  return NextResponse.json({
    disponivel: true,
    conectado: Boolean(data),
    conectadoEm: data?.connected_at || null,
    ultimaSincronia: data?.last_sync_at || null,
    ultimoErro: data?.last_sync_erro || null,
  }, { headers });
}
