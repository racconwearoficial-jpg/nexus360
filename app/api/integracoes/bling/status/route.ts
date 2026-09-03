import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabaseAdminConfigurado } from "@/lib/supabaseAdmin";
import { blingEnvConfigurado } from "@/lib/bling";

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });
  }
  if (!supabaseAdminConfigurado || !blingEnvConfigurado()) {
    return NextResponse.json({ disponivel: false, conectado: false });
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
  });
}
