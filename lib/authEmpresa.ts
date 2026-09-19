import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "./supabaseAdmin";

// Autenticação das rotas /api que mexem no WhatsApp de uma empresa.
//
// Por quê: antes, essas rotas aceitavam o company_id no corpo da requisição SEM
// conferir quem chamava. Qualquer pessoa que soubesse o company_id de uma
// drogaria podia mandar mensagens pelo número dela (spam = número banido),
// ligar/desligar o chatbot ou desconectar o Z-API. Agora exigem o token de
// sessão do Supabase (Authorization: Bearer ...) de um usuário que pertença à
// empresa (tabela company_users).

export type Sessao = { userId: string; companyId: string };

export async function autenticar(
  req: NextRequest,
  empresaDesejada?: string | null
): Promise<{ sessao: Sessao | null; erro: NextResponse | null }> {
  const cabecalho = req.headers.get("authorization") || "";
  const token = cabecalho.toLowerCase().startsWith("bearer ") ? cabecalho.slice(7).trim() : "";
  if (!token) {
    return { sessao: null, erro: NextResponse.json({ error: "Não autenticado" }, { status: 401 }) };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) {
    return { sessao: null, erro: NextResponse.json({ error: "Sessão inválida ou expirada" }, { status: 401 }) };
  }

  let consulta = supabaseAdmin.from("company_users").select("company_id").eq("user_id", data.user.id);
  if (empresaDesejada) consulta = consulta.eq("company_id", empresaDesejada);
  const { data: vinculos } = await consulta.limit(1);
  if (!vinculos || !vinculos.length) {
    return { sessao: null, erro: NextResponse.json({ error: "Sem permissão para esta empresa" }, { status: 403 }) };
  }

  return { sessao: { userId: data.user.id, companyId: vinculos[0].company_id }, erro: null };
}

// Para rotas que recebem o company_id no corpo/consulta: devolve a resposta de
// erro (401/403) ou null se o usuário logado pertence à empresa.
export async function exigirEmpresa(req: NextRequest, companyId: string | null | undefined): Promise<NextResponse | null> {
  if (!companyId) return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });
  const { erro } = await autenticar(req, companyId);
  return erro;
}

// Para as rotas /api/automacoes/*: o payload traz "record" com company_id. Exige
// usuário logado da empresa do registro; se o registro veio sem company_id,
// preenche com a empresa do usuário (nunca confia em valor forjado).
export async function exigirEmpresaDoRegistro(req: NextRequest, payload: any): Promise<NextResponse | null> {
  const empresa = payload?.record?.company_id ?? null;
  const { sessao, erro } = await autenticar(req, empresa);
  if (erro) return erro;
  if (payload?.record && !payload.record.company_id && sessao) payload.record.company_id = sessao.companyId;
  return null;
}

// Trava de segurança do envio manual (botão "Enviar WhatsApp" do sistema): mesmo
// com usuário legítimo, limita a cadência para não virar rajada pelo número da
// empresa. Usa o próprio log de automações (tabela só acessível pelo servidor).
const MANUAL_POR_HORA = 40;
const MANUAL_INTERVALO_MS = 2500;
export const TIPO_ENVIO_MANUAL = "manual_enviar";

export async function limiteEnvioManual(companyId: string): Promise<NextResponse | null> {
  const agora = Date.now();
  const [hora, recente] = await Promise.all([
    supabaseAdmin.from("automacoes_whatsapp_log").select("id", { count: "exact", head: true })
      .eq("company_id", companyId).eq("tipo", TIPO_ENVIO_MANUAL).gte("enviado_em", new Date(agora - 3600_000).toISOString()),
    supabaseAdmin.from("automacoes_whatsapp_log").select("id", { count: "exact", head: true })
      .eq("company_id", companyId).eq("tipo", TIPO_ENVIO_MANUAL).gte("enviado_em", new Date(agora - MANUAL_INTERVALO_MS).toISOString()),
  ]);
  if ((recente.count || 0) > 0) {
    return NextResponse.json({ error: "Aguarde alguns segundos entre um envio e outro (proteção do seu número de WhatsApp)." }, { status: 429 });
  }
  if ((hora.count || 0) >= MANUAL_POR_HORA) {
    return NextResponse.json({ error: "Limite de envios por hora atingido. Aguarde um pouco para proteger seu número de WhatsApp." }, { status: 429 });
  }
  return null;
}
