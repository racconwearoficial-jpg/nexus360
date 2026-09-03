import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { company_id } = await req.json();
  if (!company_id) {
    return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from("integracoes_bling").delete().eq("company_id", company_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
