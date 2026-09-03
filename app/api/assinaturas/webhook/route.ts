import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Recebe eventos do Asaas (configurar em Asaas > Integrações > Webhooks,
// apontando pra https://nexus360.app.br/api/assinaturas/webhook).
// Se ASAAS_WEBHOOK_TOKEN estiver definido, exige que o Asaas envie o mesmo
// valor no header "asaas-access-token" (configurável na tela de webhook do
// Asaas) — sem isso, qualquer um poderia forjar uma notificação de pagamento.
export async function POST(req: NextRequest) {
  const tokenEsperado = process.env.ASAAS_WEBHOOK_TOKEN;
  if (tokenEsperado) {
    const tokenRecebido = req.headers.get("asaas-access-token");
    if (tokenRecebido !== tokenEsperado) {
      return NextResponse.json({ error: "token inválido" }, { status: 401 });
    }
  }

  const body = await req.json().catch(() => null);
  const evento = body?.event;
  const subscriptionId = body?.payment?.subscription;
  if (!evento || !subscriptionId) return NextResponse.json({ ok: true }); // ignora eventos sem assinatura (cobrança avulsa)

  let novoStatus: string | null = null;
  if (evento === "PAYMENT_CONFIRMED" || evento === "PAYMENT_RECEIVED") novoStatus = "ativa";
  else if (evento === "PAYMENT_OVERDUE") novoStatus = "atrasada";

  if (novoStatus) {
    await supabaseAdmin.from("assinaturas")
      .update({ status: novoStatus, updated_at: new Date().toISOString() })
      .eq("asaas_subscription_id", subscriptionId);
  }

  return NextResponse.json({ ok: true });
}
