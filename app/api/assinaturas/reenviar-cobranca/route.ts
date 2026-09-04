import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisAsaas, ultimoPagamentoAssinatura, consultarPagamentoAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// Busca o link da cobrança atual (invoiceUrl, página hospedada pelo Asaas)
// pra reenviar pro cliente — não gera cobrança nova, só recupera a existente.
export async function POST(req: NextRequest) {
  const { company_id, assinatura_id } = await req.json();
  if (!company_id || !assinatura_id) {
    return NextResponse.json({ error: "company_id e assinatura_id são obrigatórios" }, { status: 400 });
  }
  try {
    const { data: assinatura, error } = await supabaseAdmin
      .from("assinaturas").select("*").eq("id", assinatura_id).eq("company_id", company_id).single();
    if (error || !assinatura) throw new Error("Assinatura não encontrada.");

    const cred = await getCredenciaisAsaas(company_id);
    const pagamento = assinatura.asaas_payment_id
      ? await consultarPagamentoAsaas({ apiKey: cred.api_key, sandbox: cred.sandbox, paymentId: assinatura.asaas_payment_id })
      : await ultimoPagamentoAssinatura({ apiKey: cred.api_key, sandbox: cred.sandbox, subscriptionId: assinatura.asaas_subscription_id });
    if (!pagamento) throw new Error("Nenhuma cobrança encontrada ainda pra essa assinatura.");

    return NextResponse.json({
      ok: true,
      invoiceUrl: pagamento.invoiceUrl || null,
      valor: pagamento.value,
      vencimento: pagamento.dueDate,
      statusAsaas: pagamento.status,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao buscar cobrança" }, { status: 500 });
  }
}
