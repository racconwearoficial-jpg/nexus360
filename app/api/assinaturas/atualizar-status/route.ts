import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisAsaas, ultimoPagamentoAssinatura, consultarPagamentoAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// Consulta manual (botão "Atualizar status") pra quem não configurou o
// webhook do Asaas — pergunta pro Asaas na hora qual o status da última
// cobrança dessa assinatura e atualiza local.
const MAPA_STATUS: Record<string, string> = {
  RECEIVED: "ativa", CONFIRMED: "ativa", RECEIVED_IN_CASH: "ativa",
  OVERDUE: "atrasada",
  PENDING: "pendente", AWAITING_RISK_ANALYSIS: "pendente",
};

export async function POST(req: NextRequest) {
  const { company_id, assinatura_id } = await req.json();
  if (!company_id || !assinatura_id) {
    return NextResponse.json({ error: "company_id e assinatura_id são obrigatórios" }, { status: 400 });
  }

  try {
    const { data: assinatura, error } = await supabaseAdmin
      .from("assinaturas").select("*").eq("id", assinatura_id).eq("company_id", company_id).single();
    if (error || !assinatura) throw new Error("Assinatura não encontrada.");
    if (!assinatura.asaas_subscription_id && !assinatura.asaas_payment_id) throw new Error("Assinatura sem vínculo com o Asaas.");

    const cred = await getCredenciaisAsaas(company_id);
    const pagamento = assinatura.asaas_payment_id
      ? await consultarPagamentoAsaas({ apiKey: cred.api_key, sandbox: cred.sandbox, paymentId: assinatura.asaas_payment_id })
      : await ultimoPagamentoAssinatura({ apiKey: cred.api_key, sandbox: cred.sandbox, subscriptionId: assinatura.asaas_subscription_id });

    if (!pagamento) {
      return NextResponse.json({ ok: true, status: assinatura.status, msg: "Nenhuma cobrança encontrada ainda no Asaas." });
    }

    const novoStatus = MAPA_STATUS[pagamento.status] || assinatura.status;
    await supabaseAdmin.from("assinaturas").update({
      status: novoStatus,
      proxima_cobranca: pagamento.dueDate || assinatura.proxima_cobranca,
      updated_at: new Date().toISOString(),
    }).eq("id", assinatura_id);

    return NextResponse.json({ ok: true, status: novoStatus, statusAsaas: pagamento.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao consultar status" }, { status: 500 });
  }
}
