import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisZapi, enviarTextoZapi } from "@/lib/zapi";
import { jaEnviado, registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Chamado por um Supabase Database Webhook (Database → Webhooks) cadastrado
// na tabela "reservas", evento INSERT, apontando pra esta URL. Payload no
// formato padrão do Supabase: { type, table, record, old_record, schema }.
// Confirma a reserva pro cliente por WhatsApp assim que ela é criada,
// não importa em qual tela do sistema foi cadastrada.

const TIPO = "reserva_criada";

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    console.error("[automacao-reserva-criada] body inválido:", e.message);
    return NextResponse.json({ ok: true });
  }

  if (payload.type !== "INSERT" || !payload.record) {
    return NextResponse.json({ ok: true });
  }

  const reserva = payload.record;
  const companyId = reserva.company_id;
  const clienteId = reserva.client_id;

  try {
    if (await jaEnviado({ companyId, clienteId, tipo: TIPO, referenciaId: reserva.id })) {
      console.log("[automacao-reserva-criada] já enviado antes, ignorando:", reserva.id);
      return NextResponse.json({ ok: true });
    }

    const [{ data: cliente }, { data: item }] = await Promise.all([
      supabaseAdmin.from("clientes").select("nome, telefone").eq("id", clienteId).single(),
      supabaseAdmin.from("itens").select("nome").eq("id", reserva.product_id).single(),
    ]);

    if (!cliente?.telefone) {
      console.log("[automacao-reserva-criada] cliente sem telefone, não dá pra avisar:", clienteId);
      return NextResponse.json({ ok: true });
    }

    const cred = await getCredenciaisZapi(companyId);
    const dataFmt = new Date(reserva.expires_at).toLocaleDateString("pt-BR");
    const mensagem = `Oi, ${cliente.nome}! Sua reserva de ${reserva.quantity}x ${item?.nome || "produto"} está confirmada. Retirar até ${dataFmt}.`;

    await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone: cliente.telefone, mensagem });
    await registrarEnvio({ companyId, clienteId, tipo: TIPO, referenciaId: reserva.id });
    console.log("[automacao-reserva-criada] confirmação enviada:", { clienteId, reservaId: reserva.id });
  } catch (e: any) {
    console.error("[automacao-reserva-criada] erro:", e.message);
  }

  return NextResponse.json({ ok: true });
}
