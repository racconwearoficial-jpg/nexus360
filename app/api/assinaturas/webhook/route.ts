import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Recebe eventos de QUALQUER conta Asaas conectada (uma por empresa) — cada
// empresa configura o próprio webhook na Asaas dela, todos apontando pra esta
// mesma URL: https://nexus360.app.br/api/assinaturas/webhook.
// Como o asaas_subscription_id é único globalmente, dá pra achar a empresa
// certa sem precisar de uma URL por empresa: acha a assinatura pelo id, pega
// o company_id dela, e só então confere o token de segurança daquela empresa
// (se ela tiver configurado um).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const evento = body?.event;
  const subscriptionId = body?.payment?.subscription;
  if (!evento || !subscriptionId) return NextResponse.json({ ok: true }); // ignora eventos sem assinatura (cobrança avulsa)

  const { data: assinatura } = await supabaseAdmin
    .from("assinaturas").select("id, company_id").eq("asaas_subscription_id", subscriptionId).single();
  if (!assinatura) return NextResponse.json({ ok: true }); // assinatura não é do Nexus360, ignora

  const { data: integ } = await supabaseAdmin
    .from("integracoes_asaas").select("webhook_token").eq("company_id", assinatura.company_id).single();
  if (integ?.webhook_token) {
    const tokenRecebido = req.headers.get("asaas-access-token");
    if (tokenRecebido !== integ.webhook_token) {
      return NextResponse.json({ error: "token inválido" }, { status: 401 });
    }
  }

  let novoStatus: string | null = null;
  if (evento === "PAYMENT_CONFIRMED" || evento === "PAYMENT_RECEIVED") novoStatus = "ativa";
  else if (evento === "PAYMENT_OVERDUE") novoStatus = "atrasada";

  if (novoStatus) {
    await supabaseAdmin.from("assinaturas")
      .update({ status: novoStatus, updated_at: new Date().toISOString() })
      .eq("id", assinatura.id);
  }

  return NextResponse.json({ ok: true });
}
