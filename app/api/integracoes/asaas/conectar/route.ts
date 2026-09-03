import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { testarChaveAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { company_id, api_key, sandbox, webhook_token } = await req.json();
  if (!company_id || !api_key) {
    return NextResponse.json({ error: "company_id e api_key são obrigatórios" }, { status: 400 });
  }

  try {
    await testarChaveAsaas(api_key, Boolean(sandbox)); // valida a chave antes de salvar
  } catch (e: any) {
    return NextResponse.json({ error: "Chave Asaas inválida: " + (e.message || "não foi possível validar") }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("integracoes_asaas").upsert({
    company_id,
    api_key,
    sandbox: Boolean(sandbox),
    webhook_token: webhook_token || null,
    connected_at: new Date().toISOString(),
  }, { onConflict: "company_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
