import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { testarInstanciaZapi } from "@/lib/zapi";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { company_id, instance_id, token, client_token } = await req.json();
  if (!company_id || !instance_id || !token) {
    return NextResponse.json({ error: "company_id, instance_id e token são obrigatórios" }, { status: 400 });
  }

  try {
    await testarInstanciaZapi({ instanceId: instance_id, token, clientToken: client_token }); // valida antes de salvar
  } catch (e: any) {
    return NextResponse.json({ error: "Não foi possível validar a instância Z-API: " + (e.message || "erro desconhecido") }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("integracoes_zapi").upsert({
    company_id,
    instance_id,
    token,
    client_token: client_token || null,
    connected_at: new Date().toISOString(),
  }, { onConflict: "company_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
