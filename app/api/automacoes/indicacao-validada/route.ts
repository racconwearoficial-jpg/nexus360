import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisZapi, enviarTextoZapi } from "@/lib/zapi";
import { jaEnviado, registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Supabase Database Webhook na tabela "indicacoes", evento UPDATE. Quando um
// atendente valida a indicação (status vira "validada"), confirma pros dois
// lados — quem indicou e o amigo indicado — usando os valores reais
// configurados em Fidelidade (nunca inventados).

const TIPO = "indicacao_validada";

// Mesmos padrões de FCFG_DEFAULTS em nexus360_v2.html.
const FCFG_DEFAULTS = { indPts: 30, indDesc: 5, indMin: 20 };

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    console.error("[automacao-indicacao-validada] body inválido:", e.message);
    return NextResponse.json({ ok: true });
  }

  if (payload.type !== "UPDATE" || !payload.record || !payload.old_record) {
    return NextResponse.json({ ok: true });
  }

  const indicacao = payload.record;
  if (indicacao.status !== "validada" || payload.old_record.status === "validada") {
    return NextResponse.json({ ok: true });
  }

  const companyId = indicacao.company_id;

  try {
    if (await jaEnviado({ companyId, clienteId: indicacao.quem_id, tipo: TIPO, referenciaId: indicacao.id })) {
      return NextResponse.json({ ok: true });
    }

    const [{ data: config }, { data: quem }] = await Promise.all([
      supabaseAdmin.from("configuracoes").select("fidelidade_config").eq("company_id", companyId).single(),
      supabaseAdmin.from("clientes").select("nome, telefone").eq("id", indicacao.quem_id).single(),
    ]);

    let fcfg = FCFG_DEFAULTS;
    try {
      if (config?.fidelidade_config) fcfg = { ...FCFG_DEFAULTS, ...JSON.parse(config.fidelidade_config) };
    } catch {}

    const cred = await getCredenciaisZapi(companyId);

    if (quem?.telefone) {
      const msgQuem = `Boa notícia, ${quem.nome}! Sua indicação (${indicacao.amigo_nome}) foi validada e você já ganhou +${fcfg.indPts} pontos de fidelidade.`;
      await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone: quem.telefone, mensagem: msgQuem });
    }

    if (indicacao.amigo_tel) {
      const msgAmigo = `Oi, ${indicacao.amigo_nome}! Sua indicação foi confirmada — você tem R$${fcfg.indDesc} de desconto na sua próxima compra acima de R$${fcfg.indMin}.`;
      await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone: indicacao.amigo_tel, mensagem: msgAmigo });
    }

    await registrarEnvio({ companyId, clienteId: indicacao.quem_id, tipo: TIPO, referenciaId: indicacao.id });
    console.log("[automacao-indicacao-validada] confirmações enviadas:", indicacao.id);
  } catch (e: any) {
    console.error("[automacao-indicacao-validada] erro:", e.message);
  }

  return NextResponse.json({ ok: true });
}
