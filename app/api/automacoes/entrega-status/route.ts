import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisZapi, enviarTextoZapi } from "@/lib/zapi";
import { jaEnviado, registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Supabase Database Webhook na tabela "entregas", evento UPDATE. Avisa o
// cliente quando o status muda pra "em_rota", "entregue" ou "cancelado"
// (valores exatamente como no select #ent-status do sistema).

const TIPO = "entrega_status";

const MENSAGENS: Record<string, (nome: string) => string> = {
  em_rota: (nome) => `Oi, ${nome}! Seu pedido saiu pra entrega e já está a caminho.`,
  entregue: (nome) => `Oi, ${nome}! Seu pedido foi entregue. Qualquer coisa, estamos à disposição.`,
  cancelado: (nome) => `Oi, ${nome}. Sua entrega foi cancelada. Se precisar reagendar, é só chamar.`,
};

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    console.error("[automacao-entrega-status] body inválido:", e.message);
    return NextResponse.json({ ok: true });
  }

  if (payload.type !== "UPDATE" || !payload.record || !payload.old_record) {
    return NextResponse.json({ ok: true });
  }

  const entrega = payload.record;
  if (entrega.status === payload.old_record.status || !MENSAGENS[entrega.status]) {
    return NextResponse.json({ ok: true });
  }
  if (!entrega.cliente_id) {
    return NextResponse.json({ ok: true }); // entrega avulsa, sem cliente vinculado
  }

  const companyId = entrega.company_id;

  try {
    if (await jaEnviado({ companyId, clienteId: entrega.cliente_id, tipo: TIPO, referenciaId: `${entrega.id}:${entrega.status}` })) {
      return NextResponse.json({ ok: true });
    }

    const { data: cliente } = await supabaseAdmin.from("clientes").select("nome, telefone").eq("id", entrega.cliente_id).single();
    if (!cliente?.telefone) return NextResponse.json({ ok: true });

    const cred = await getCredenciaisZapi(companyId);
    const mensagem = MENSAGENS[entrega.status](cliente.nome);
    await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone: cliente.telefone, mensagem });
    await registrarEnvio({ companyId, clienteId: entrega.cliente_id, tipo: TIPO, referenciaId: `${entrega.id}:${entrega.status}` });
    console.log("[automacao-entrega-status] aviso enviado:", entrega.id, entrega.status);
  } catch (e: any) {
    console.error("[automacao-entrega-status] erro:", e.message);
  }

  return NextResponse.json({ ok: true });
}
