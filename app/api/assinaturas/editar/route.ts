import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisAsaas, editarAssinaturaAsaas, editarPagamentoAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { company_id, assinatura_id, valor } = await req.json();
  if (!company_id || !assinatura_id || !valor) {
    return NextResponse.json({ error: "company_id, assinatura_id e valor são obrigatórios" }, { status: 400 });
  }
  try {
    const { data: assinatura, error } = await supabaseAdmin
      .from("assinaturas").select("*").eq("id", assinatura_id).eq("company_id", company_id).single();
    if (error || !assinatura) throw new Error("Assinatura não encontrada.");

    const cred = await getCredenciaisAsaas(company_id);
    if (assinatura.asaas_payment_id) {
      await editarPagamentoAsaas({ apiKey: cred.api_key, sandbox: cred.sandbox, paymentId: assinatura.asaas_payment_id, valor });
    } else {
      await editarAssinaturaAsaas({ apiKey: cred.api_key, sandbox: cred.sandbox, subscriptionId: assinatura.asaas_subscription_id, valor });
    }

    // O valor fica salvo na própria assinatura (não no plano) — outros
    // clientes no mesmo plano não são afetados por essa edição individual.
    await supabaseAdmin.from("assinaturas").update({ valor, updated_at: new Date().toISOString() }).eq("id", assinatura_id);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao editar assinatura" }, { status: 500 });
  }
}
