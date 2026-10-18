import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { exigirEmpresa } from "@/lib/authEmpresa";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("company_id");
  if (!companyId) return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });

  const negado = await exigirEmpresa(req, companyId);
  if (negado) return negado;

  const { data } = await supabaseAdmin
    .from("integracoes_asaas")
    .select("connected_at, sandbox")
    .eq("company_id", companyId)
    .single();

  return NextResponse.json(
    { conectado: Boolean(data), conectadoEm: data?.connected_at || null, sandbox: data?.sandbox || false },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
