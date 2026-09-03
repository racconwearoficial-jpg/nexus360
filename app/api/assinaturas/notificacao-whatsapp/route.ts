import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisAsaas, ativarNotificacaoWhatsapp } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// Ativa o canal WhatsApp nas notificações padrão do Asaas pro cliente dessa
// assinatura (cobrança criada, vencimento, recebido etc. — vem desligado por
// padrão em toda conta Asaas nova).
export async function POST(req: NextRequest) {
  const { company_id, assinatura_id } = await req.json();
  if (!company_id || !assinatura_id) {
    return NextResponse.json({ error: "company_id e assinatura_id são obrigatórios" }, { status: 400 });
  }
  try {
    const { data: assinatura, error } = await supabaseAdmin
      .from("assinaturas").select("*").eq("id", assinatura_id).eq("company_id", company_id).single();
    if (error || !assinatura) throw new Error("Assinatura não encontrada.");
    if (!assinatura.asaas_customer_id) throw new Error("Assinatura sem cliente vinculado no Asaas.");

    const cred = await getCredenciaisAsaas(company_id);
    const resultado = await ativarNotificacaoWhatsapp({
      apiKey: cred.api_key, sandbox: cred.sandbox, customerId: assinatura.asaas_customer_id,
    });
    if (!resultado) throw new Error("Cliente sem notificações cadastradas no Asaas ainda.");

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao ativar notificação" }, { status: 500 });
  }
}
