import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Liga/desliga o atendimento automático (chatbot) por empresa. Fica
// desligado por padrão mesmo com o Z-API conectado — é opt-in, porque
// responder cliente final sozinho é decisão mais delicada que só enviar.
export async function POST(req: NextRequest) {
  const { company_id, ativo } = await req.json();
  if (!company_id || typeof ativo !== "boolean") {
    return NextResponse.json({ error: "company_id e ativo (boolean) são obrigatórios" }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from("integracoes_zapi")
    .update({ atendimento_auto: ativo })
    .eq("company_id", company_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
