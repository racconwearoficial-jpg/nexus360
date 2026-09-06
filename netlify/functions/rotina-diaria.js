const { createClient } = require("@supabase/supabase-js");

// Roda 1x por dia (agendado via netlify.toml, seção [functions."rotina-diaria"]).
// Cobre as 4 automações que dependem de data/tempo, não de um evento
// pontual: recompra, cobrança de fiado, reativação de inativo e aniversário.
// Mesma lógica de dedupe do resto (automacoes_whatsapp_log) pra nunca mandar
// a mesma coisa duas vezes no mesmo dia/ano.
//
// Importa relativo (sem alias "@/") porque essa função é empacotada
// separado do Next.js pelo bundler de functions do Netlify.

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key"
);

const ZAPI_BASE = "https://api.z-api.io";

function headersZapi(clientToken) {
  const h = { "Content-Type": "application/json" };
  if (clientToken) h["Client-Token"] = clientToken;
  return h;
}

async function enviarTextoZapi({ instanceId, token, clientToken, telefone, mensagem }) {
  const limpo = String(telefone || "").replace(/\D/g, "");
  const phone = limpo.startsWith("55") ? limpo : "55" + limpo;
  const r = await fetch(`${ZAPI_BASE}/instances/${instanceId}/token/${token}/send-text`, {
    method: "POST",
    headers: headersZapi(clientToken),
    body: JSON.stringify({ phone, message: mensagem }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || data.message || `Z-API respondeu ${r.status}`);
  return data;
}

async function jaEnviado({ companyId, clienteId, tipo, referenciaId, desde }) {
  let query = supabaseAdmin
    .from("automacoes_whatsapp_log")
    .select("id")
    .eq("company_id", companyId)
    .eq("tipo", tipo)
    .limit(1);
  query = clienteId == null ? query.is("cliente_id", null) : query.eq("cliente_id", clienteId);
  query = referenciaId == null ? query.is("referencia_id", null) : query.eq("referencia_id", String(referenciaId));
  if (desde) query = query.gte("enviado_em", desde);
  const { data } = await query;
  return Boolean(data && data.length);
}

async function registrarEnvio({ companyId, clienteId, tipo, referenciaId }) {
  await supabaseAdmin.from("automacoes_whatsapp_log").insert({
    company_id: companyId,
    cliente_id: clienteId ?? null,
    tipo,
    referencia_id: referenciaId != null ? String(referenciaId) : null,
  });
}

async function gerarMensagemIA(prompt, fallback) {
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/ia-mensagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` },
      body: JSON.stringify({ prompt }),
    });
    const d = await r.json();
    return d?.mensagem || fallback;
  } catch {
    return fallback;
  }
}

const inicioDeHoje = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.toISOString(); };
const diasAtras = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };

// #6 — Lembrete de recompra: usa só a cadência real de compras do cliente
// (datas em "vendas"), não tenta adivinhar qual item específico está
// acabando — a tabela de vendas não guarda item por linha, só texto livre,
// então não dá pra afirmar "seu remédio X está acabando" sem inventar.
async function rodarRecompra(integ, credZapi) {
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("id, nome, telefone").eq("company_id", integ.company_id);
  for (const cliente of clientes || []) {
    try {
      const { data: vendas } = await supabaseAdmin
        .from("vendas").select("data").eq("company_id", integ.company_id).eq("cliente_id", cliente.id)
        .order("data", { ascending: true });
      if (!vendas || vendas.length < 3) continue;

      const datas = vendas.map((v) => new Date(v.data).getTime()).filter((t) => !isNaN(t));
      if (datas.length < 3) continue;
      const intervalos = [];
      for (let i = 1; i < datas.length; i++) intervalos.push(datas[i] - datas[i - 1]);
      const mediaMs = intervalos.reduce((a, b) => a + b, 0) / intervalos.length;
      const mediaDias = mediaMs / 86400000;
      if (mediaDias < 5) continue; // recorrência rápida demais pra fazer sentido lembrar

      const ultima = datas[datas.length - 1];
      const diasDesdeUltima = (Date.now() - ultima) / 86400000;
      const dentroDaJanela = Math.abs(diasDesdeUltima - mediaDias) <= 1;
      if (!dentroDaJanela) continue;

      if (await jaEnviado({ companyId: integ.company_id, clienteId: cliente.id, tipo: "recompra", referenciaId: null, desde: diasAtras(20).toISOString() })) continue;
      if (!cliente.telefone) continue;

      const mensagem = `Oi, ${cliente.nome}! Faz um tempinho desde sua última compra com a gente — se estiver precisando repor algo, é só chamar por aqui.`;
      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "recompra", referenciaId: null });
      console.log("[rotina-diaria] recompra enviada:", cliente.id);
    } catch (e) {
      console.error("[rotina-diaria] erro recompra cliente", cliente.id, e.message);
    }
  }
}

// #7 — Cobrança de fiado: só pendências reais, valor e vencimento exatamente
// como estão cadastrados em "pendencias". Um lembrete por dia no máximo
// (dedupe por dia, não por cobrança inteira, porque enquanto não pagar faz
// sentido lembrar de novo depois de um tempo).
async function rodarFiado(integ, credZapi) {
  const amanha = new Date(); amanha.setDate(amanha.getDate() + 1);
  const { data: pendencias } = await supabaseAdmin
    .from("pendencias").select("id, cliente_id, cliente_nome, valor, valor_pago, vencimento, status")
    .eq("company_id", integ.company_id).eq("status", "pendente").lte("vencimento", amanha.toISOString().slice(0, 10));
  for (const p of pendencias || []) {
    try {
      if (!p.cliente_id) continue;
      if (await jaEnviado({ companyId: integ.company_id, clienteId: p.cliente_id, tipo: "fiado_lembrete", referenciaId: p.id, desde: inicioDeHoje() })) continue;

      const { data: cliente } = await supabaseAdmin.from("clientes").select("nome, telefone").eq("id", p.cliente_id).single();
      if (!cliente?.telefone) continue;

      const restante = parseFloat(p.valor || 0) - parseFloat(p.valor_pago || 0);
      const vencido = new Date(p.vencimento) < new Date();
      const dataFmt = new Date(p.vencimento).toLocaleDateString("pt-BR");
      const mensagem = `Oi, ${cliente.nome}! Passando pra lembrar da sua pendência de R$${restante.toFixed(2)}${vencido ? `, vencida em ${dataFmt}` : `, com vencimento em ${dataFmt}`}. Qualquer coisa é só chamar.`;
      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await registrarEnvio({ companyId: integ.company_id, clienteId: p.cliente_id, tipo: "fiado_lembrete", referenciaId: p.id });
      console.log("[rotina-diaria] lembrete de fiado enviado:", p.id);
    } catch (e) {
      console.error("[rotina-diaria] erro fiado pendencia", p.id, e.message);
    }
  }
}

// #8 — Reativação: sem bônus inventado (não existe valor de "bônus de
// reativação" configurado no sistema hoje) — só convite de volta, citando a
// fidelidade real que já existe. Cooldown de 60 dias por cliente.
async function rodarReativacao(integ, credZapi) {
  const corteCooldown = diasAtras(60).toISOString();
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("id, nome, telefone, reativacao_enviada_em")
    .eq("company_id", integ.company_id).eq("status", "inativo");
  for (const cliente of clientes || []) {
    try {
      if (cliente.reativacao_enviada_em && cliente.reativacao_enviada_em > corteCooldown) continue;
      if (!cliente.telefone) continue;

      const mensagem = `Oi, ${cliente.nome}! Faz tempo que a gente não te vê por aqui — sentimos sua falta. Toda compra continua valendo pontos que dá pra trocar por desconto. Quando quiser, é só chamar.`;
      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await supabaseAdmin.from("clientes").update({ reativacao_enviada_em: new Date().toISOString() }).eq("id", cliente.id);
      console.log("[rotina-diaria] reativação enviada:", cliente.id);
    } catch (e) {
      console.error("[rotina-diaria] erro reativação cliente", cliente.id, e.message);
    }
  }
}

// #9 — Aniversário: mesmo prompt que o botão manual já usa no sistema
// (gerador de mensagem de aniversário), só que disparado sozinho no dia.
async function rodarAniversario(integ, credZapi) {
  const hoje = new Date();
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("id, nome, telefone, aniversario").eq("company_id", integ.company_id);
  for (const cliente of clientes || []) {
    try {
      if (!cliente.aniversario) continue;
      const aniv = new Date(cliente.aniversario + "T12:00:00");
      if (aniv.getDate() !== hoje.getDate() || aniv.getMonth() !== hoje.getMonth()) continue;
      if (!cliente.telefone) continue;

      const referenciaAno = String(hoje.getFullYear());
      if (await jaEnviado({ companyId: integ.company_id, clienteId: cliente.id, tipo: "aniversario", referenciaId: referenciaAno })) continue;

      const prompt = "Crie uma mensagem curta e calorosa de felicitacao de aniversario para WhatsApp de um estabelecimento para um cliente. Use {nome} para o nome do cliente. Maximo 2 linhas. Sem markdown. Sem emojis excessivos.";
      const fallback = `Feliz aniversário, {nome}! Desejamos um dia incrível, com muita saúde e alegria.`;
      const template = await gerarMensagemIA(prompt, fallback);
      const mensagem = template.replace(/\{nome\}/g, cliente.nome).replace(/\*\*/g, "");

      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "aniversario", referenciaId: referenciaAno });
      console.log("[rotina-diaria] aniversário enviado:", cliente.id);
    } catch (e) {
      console.error("[rotina-diaria] erro aniversário cliente", cliente.id, e.message);
    }
  }
}

exports.handler = async function () {
  const { data: integracoes, error } = await supabaseAdmin
    .from("integracoes_zapi").select("company_id, instance_id, token, client_token");
  if (error) {
    console.error("[rotina-diaria] falha ao buscar integrações:", error.message);
    return { statusCode: 200, body: "ok" };
  }

  for (const integ of integracoes || []) {
    const credZapi = { instanceId: integ.instance_id, token: integ.token, clientToken: integ.client_token };
    console.log("[rotina-diaria] processando empresa:", integ.company_id);
    await rodarRecompra(integ, credZapi);
    await rodarFiado(integ, credZapi);
    await rodarReativacao(integ, credZapi);
    await rodarAniversario(integ, credZapi);
  }

  return { statusCode: 200, body: "ok" };
};
