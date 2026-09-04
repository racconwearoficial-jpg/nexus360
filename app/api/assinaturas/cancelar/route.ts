import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cancelarAssinaturaAsaas, cancelarPagamentoAsaas, getCredenciaisAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { assinatura_id, company_id } = await req.json();
  if (!assinatura_id || !company_id) {
    return NextResponse.json({ error: "assinatura_id e company_id são obrigatórios" }, { status: 400 });
  }
  try {
    const { data: assinatura, error } = await supabaseAdmin
      .from("assinaturas").select("*").eq("id", assinatura_id).eq("company_id", company_id).single();
    if (error || !assinatura) throw new Error("Assinatura não encontrada.");

    if (assinatura.asaas_subscription_id) {
      const cred = await getCredenciaisAsaas(company_id);
      await cancelarAssinaturaAsaas({ apiKey: cred.api_key, sandbox: cred.sandbox, subscriptionId: assinatura.asaas_subscription_id });
    } else if (assinatura.asaas_payment_id && assinatura.status !== "ativa") {
      // Cobrança avulsa ainda não paga: remove no Asaas. Se já foi paga
      // (status ativa), o dinheiro já caiu na conta — o Asaas não deixa
      // remover, então só marca cancelada localmente (não desfaz o pagamento).
      const cred = await getCredenciaisAsaas(company_id);
      await cancelarPagamentoAsaas({ apiKey: cred.api_key, sandbox: cred.sandbox, paymentId: assinatura.asaas_payment_id });
    }
    await supabaseAdmin.from("assinaturas").update({ status: "cancelada", updated_at: new Date().toISOString() }).eq("id", assinatura_id);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao cancelar assinatura" }, { status: 500 });
  }
}
