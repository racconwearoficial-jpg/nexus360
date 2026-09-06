import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisZapi, enviarTextoZapi } from "@/lib/zapi";
import { jaEnviado, registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Supabase Database Webhook na tabela "itens", evento UPDATE. Quando o
// estoque de um item sai de zero/negativo pra positivo, avisa todo mundo que
// estava na lista de espera desse produto.

const TIPO = "lista_espera_avisada";

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    console.error("[automacao-estoque-reposto] body inválido:", e.message);
    return NextResponse.json({ ok: true });
  }

  if (payload.type !== "UPDATE" || !payload.record || !payload.old_record) {
    return NextResponse.json({ ok: true });
  }

  const item = payload.record;
  const itemAntes = payload.old_record;
  const estoqueAntes = parseInt(itemAntes.estoque ?? 0);
  const estoqueDepois = parseInt(item.estoque ?? 0);

  if (!(estoqueAntes <= 0 && estoqueDepois > 0)) {
    return NextResponse.json({ ok: true });
  }

  const companyId = item.company_id;

  try {
    const { data: esperando } = await supabaseAdmin
      .from("lista_espera")
      .select("id, client_id, quantity, clientes(nome, telefone)")
      .eq("company_id", companyId)
      .eq("product_id", item.id)
      .eq("status", "aguardando");

    if (!esperando || !esperando.length) return NextResponse.json({ ok: true });

    const cred = await getCredenciaisZapi(companyId);

    for (const espera of esperando as any[]) {
      try {
        const telefone = espera.clientes?.telefone;
        if (!telefone) continue;
        if (await jaEnviado({ companyId, clienteId: espera.client_id, tipo: TIPO, referenciaId: espera.id })) continue;

        const mensagem = `Oi, ${espera.clientes?.nome || ""}! O produto que você estava esperando (${item.nome}) já chegou. Se ainda tiver interesse, é só chamar.`;
        await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone, mensagem });
        await registrarEnvio({ companyId, clienteId: espera.client_id, tipo: TIPO, referenciaId: espera.id });
        await supabaseAdmin.from("lista_espera").update({ status: "notificado" }).eq("id", espera.id);
        console.log("[automacao-estoque-reposto] avisado:", espera.id);
      } catch (e: any) {
        console.error("[automacao-estoque-reposto] erro item lista_espera", espera.id, e.message);
      }
    }
  } catch (e: any) {
    console.error("[automacao-estoque-reposto] erro:", e.message);
  }

  return NextResponse.json({ ok: true });
}
