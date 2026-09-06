import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisZapi, enviarTextoZapi } from "@/lib/zapi";
import { jaEnviado, registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Supabase Database Webhook na tabela "itens", evento UPDATE — mesma tabela
// do estoque-reposto, direção oposta. Quando um item zera o estoque, avisa
// o WHATSAPP DA PRÓPRIA FARMÁCIA (configuracoes.whatsapp, não é cliente),
// pra repor antes de perder venda.

const TIPO = "estoque_zerado";

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    console.error("[automacao-estoque-zerado] body inválido:", e.message);
    return NextResponse.json({ ok: true });
  }

  if (payload.type !== "UPDATE" || !payload.record || !payload.old_record) {
    return NextResponse.json({ ok: true });
  }

  const item = payload.record;
  const itemAntes = payload.old_record;
  const estoqueAntes = parseInt(itemAntes.estoque ?? 0);
  const estoqueDepois = parseInt(item.estoque ?? 0);

  if (!(estoqueAntes > 0 && estoqueDepois <= 0)) {
    return NextResponse.json({ ok: true });
  }

  const companyId = item.company_id;

  try {
    if (await jaEnviado({ companyId, clienteId: null, tipo: TIPO, referenciaId: item.id, desde: new Date(Date.now() - 24 * 3600 * 1000).toISOString() })) {
      return NextResponse.json({ ok: true });
    }

    const { data: config } = await supabaseAdmin.from("configuracoes").select("whatsapp").eq("company_id", companyId).single();
    if (!config?.whatsapp) return NextResponse.json({ ok: true });

    const cred = await getCredenciaisZapi(companyId);
    const mensagem = `Aviso do sistema: o item "${item.nome}" ficou sem estoque.`;
    await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone: config.whatsapp, mensagem });
    await registrarEnvio({ companyId, clienteId: null, tipo: TIPO, referenciaId: item.id });
    console.log("[automacao-estoque-zerado] alerta interno enviado:", item.id);
  } catch (e: any) {
    console.error("[automacao-estoque-zerado] erro:", e.message);
  }

  return NextResponse.json({ ok: true });
}
