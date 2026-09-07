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

async function enviarImagemZapi({ instanceId, token, clientToken, telefone, imagemUrl, legenda }) {
  const limpo = String(telefone || "").replace(/\D/g, "");
  const phone = limpo.startsWith("55") ? limpo : "55" + limpo;
  const r = await fetch(`${ZAPI_BASE}/instances/${instanceId}/token/${token}/send-image`, {
    method: "POST",
    headers: headersZapi(clientToken),
    body: JSON.stringify({ phone, image: imagemUrl, caption: legenda || "" }),
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

// Netlify roda em UTC — usar new Date().getDate()/getMonth() direto compara
// o dia errado boa parte da noite no horário de Brasília (UTC já virou o
// dia seguinte). Calcula a data de "hoje" sempre no fuso de Brasília.
function hojeBrasilia() {
  const [ano, mes, dia] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date()).split("-").map(Number);
  return { ano, mes, dia }; // mes: 1-12
}

// Limite de envios por tipo por execução, e pausa entre cada um — sem isso,
// uma base grande (ex: 167 clientes inativos de uma vez) manda tudo em
// segundos, o que o WhatsApp detecta como spam e pode banir o número. O
// excedente simplesmente fica pra próxima execução (rotativo, ninguém fica
// de fora, só espalhado ao longo dos dias).
const LIMITE_ENVIOS_POR_TIPO = 20;
const pausar = (ms) => new Promise((r) => setTimeout(r, ms));

// #6 — Lembrete de recompra: usa só a cadência real de compras do cliente
// (datas em "vendas"), não tenta adivinhar qual item específico está
// acabando — a tabela de vendas não guarda item por linha, só texto livre,
// então não dá pra afirmar "seu remédio X está acabando" sem inventar.
async function rodarRecompra(integ, credZapi) {
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("id, nome, telefone").eq("company_id", integ.company_id);
  let enviados = 0;
  for (const cliente of clientes || []) {
    if (enviados >= LIMITE_ENVIOS_POR_TIPO) break;
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
      enviados++;
      await pausar(1500);
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
  let enviados = 0;
  for (const p of pendencias || []) {
    if (enviados >= LIMITE_ENVIOS_POR_TIPO) break;
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
      enviados++;
      await pausar(1500);
    } catch (e) {
      console.error("[rotina-diaria] erro fiado pendencia", p.id, e.message);
    }
  }
}

// #8 — Reativação: sem bônus inventado (não existe valor de "bônus de
// reativação" configurado no sistema hoje) — só convite de volta, citando a
// fidelidade real que já existe. Cooldown de 60 dias por cliente.
async function rodarReativacao(integ, credZapi) {
  const corteCooldown = diasAtras(30).toISOString();

  // O sistema NUNCA grava status='inativo' no banco — calcularStatus() no
  // nexus360_v2.html computa isso na hora só pra exibir na tela, comparando
  // ultima_compra com dias_inativo. Filtrar por clientes.status aqui nunca
  // achava ninguém, mesmo com centenas de inativos reais. Recalcula do
  // mesmo jeito que o sistema calcula.
  const [{ data: config }, { data: candidatos }] = await Promise.all([
    supabaseAdmin.from("configuracoes").select("dias_inativo, fidelidade_config").eq("company_id", integ.company_id).single(),
    supabaseAdmin.from("clientes")
      .select("id, nome, telefone, ultima_compra, pontos, total_gasto, reativacao_enviada_em")
      .eq("company_id", integ.company_id)
      // nullsFirst: quem nunca recebeu tem prioridade; depois de enviado, só
      // volta a concorrer daqui 30 dias — assim uma base grande de inativos
      // vai sendo coberta aos poucos (LIMITE_ENVIOS_POR_TIPO por dia).
      .or(`reativacao_enviada_em.is.null,reativacao_enviada_em.lt.${corteCooldown}`)
      .order("reativacao_enviada_em", { ascending: true, nullsFirst: true }),
  ]);

  const diasInativoLimite = parseInt(config?.dias_inativo || 30);
  let vipPts = 1000;
  try {
    if (config?.fidelidade_config) vipPts = JSON.parse(config.fidelidade_config).vipPts || 1000;
  } catch {}

  const agora = Date.now();
  const clientes = (candidatos || [])
    .filter((c) => {
      const pontos = parseInt(c.pontos || 0);
      const gasto = parseFloat(c.total_gasto || 0);
      if (pontos >= vipPts || gasto >= 500) return false; // VIP nunca é inativo
      if (!c.ultima_compra) return true;
      const dias = Math.floor((agora - new Date(c.ultima_compra).getTime()) / 86400000);
      return dias > diasInativoLimite;
    })
    .slice(0, LIMITE_ENVIOS_POR_TIPO);

  for (const cliente of clientes) {
    try {
      if (!cliente.telefone) continue;

      const mensagem = `Oi, ${cliente.nome}! Faz tempo que a gente não te vê por aqui — sentimos sua falta. Toda compra continua valendo pontos que dá pra trocar por desconto. Quando quiser, é só chamar.`;
      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await supabaseAdmin.from("clientes").update({ reativacao_enviada_em: new Date().toISOString() }).eq("id", cliente.id);
      console.log("[rotina-diaria] reativação enviada:", cliente.id);
      await pausar(1500);
    } catch (e) {
      console.error("[rotina-diaria] erro reativação cliente", cliente.id, e.message);
    }
  }
}

// #9 — Aniversário: mesmo prompt que o botão manual já usa no sistema
// (gerador de mensagem de aniversário), só que disparado sozinho no dia.
async function rodarAniversario(integ, credZapi) {
  const hoje = hojeBrasilia();
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("id, nome, telefone, aniversario").eq("company_id", integ.company_id);
  console.log("[rotina-diaria] aniversario: checando", { hoje, totalClientes: clientes?.length || 0 });
  let enviados = 0;
  for (const cliente of clientes || []) {
    if (enviados >= LIMITE_ENVIOS_POR_TIPO) break;
    try {
      if (!cliente.aniversario) continue;
      // aniversario é sempre "AAAA-MM-DD" (string) — compara texto direto,
      // sem passar por Date/timezone.
      const [, mesAniv, diaAniv] = cliente.aniversario.split("-").map(Number);
      if (mesAniv !== hoje.mes || diaAniv !== hoje.dia) continue;
      if (!cliente.telefone) continue;

      const referenciaAno = String(hoje.ano);
      if (await jaEnviado({ companyId: integ.company_id, clienteId: cliente.id, tipo: "aniversario", referenciaId: referenciaAno })) continue;

      const prompt = "Crie uma mensagem curta e calorosa de felicitacao de aniversario para WhatsApp de um estabelecimento para um cliente. Use {nome} para o nome do cliente. Maximo 2 linhas. Sem markdown. Sem emojis excessivos.";
      const fallback = `Feliz aniversário, {nome}! Desejamos um dia incrível, com muita saúde e alegria.`;
      const template = await gerarMensagemIA(prompt, fallback);
      const mensagem = template.replace(/\{nome\}/g, cliente.nome).replace(/\*\*/g, "");

      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "aniversario", referenciaId: referenciaAno });
      console.log("[rotina-diaria] aniversário enviado:", cliente.id);
      enviados++;
      await pausar(1500);
    } catch (e) {
      console.error("[rotina-diaria] erro aniversário cliente", cliente.id, e.message);
    }
  }
}

// #10 — Campanhas com envio automático: mesmo filtro de público-alvo que o
// botão manual "Enviar Campanha" usa no sistema (Todos/Ativos/Inativos/VIP/
// Aniversariantes), só que disparada sozinha pela rotina diária enquanto a
// campanha estiver dentro do período (periodo_inicio/periodo_fim) e marcada
// auto_envio=true — campanha antiga sem esses campos nunca dispara sozinha.
// Dedupe por campanha+cliente (tipo="campanha_auto", referencia_id=campanha.id,
// sem "desde"): cada cliente recebe UMA vez por campanha, não repete todo dia
// enquanto o período estiver aberto.
async function rodarCampanhasAutomaticas(integ, credZapi) {
  const hoje = hojeBrasilia();
  const hojeISO = `${hoje.ano}-${String(hoje.mes).padStart(2, "0")}-${String(hoje.dia).padStart(2, "0")}`;

  const { data: campanhas } = await supabaseAdmin
    .from("campanhas")
    .select("id, nome, publico, mensagem, imagem_url")
    .eq("company_id", integ.company_id)
    .eq("ativa", true)
    .eq("auto_envio", true)
    .lte("periodo_inicio", hojeISO)
    .gte("periodo_fim", hojeISO);
  if (!campanhas || !campanhas.length) return;

  const [{ data: config }, { data: clientes }] = await Promise.all([
    supabaseAdmin.from("configuracoes").select("nome_negocio, dias_inativo").eq("company_id", integ.company_id).single(),
    supabaseAdmin.from("clientes").select("id, nome, telefone, status, ultima_compra, aniversario").eq("company_id", integ.company_id),
  ]);
  const neg = config?.nome_negocio || "nossa loja";
  const diasInativoLimite = parseInt(config?.dias_inativo || 30);

  for (const camp of campanhas) {
    const pub = (camp.publico || "Todos").toLowerCase().trim();
    let destinatarios = (clientes || []).filter((c) => c.telefone && c.telefone.trim());

    if (pub === "ativos") {
      destinatarios = destinatarios.filter((c) => c.status === "ativo");
    } else if (pub === "inativos") {
      destinatarios = destinatarios.filter((c) => {
        if (!c.ultima_compra) return true;
        const dias = Math.floor((Date.now() - new Date(c.ultima_compra).getTime()) / 86400000);
        return dias > diasInativoLimite;
      });
    } else if (pub === "vip") {
      destinatarios = destinatarios.filter((c) => c.status === "vip");
    } else if (pub === "aniversariantes") {
      destinatarios = destinatarios.filter((c) => {
        if (!c.aniversario) return false;
        const [, mesAniv, diaAniv] = c.aniversario.split("-").map(Number);
        return mesAniv === hoje.mes && diaAniv === hoje.dia;
      });
    }

    let enviados = 0;
    for (const cliente of destinatarios) {
      if (enviados >= LIMITE_ENVIOS_POR_TIPO) break;
      try {
        if (await jaEnviado({ companyId: integ.company_id, clienteId: cliente.id, tipo: "campanha_auto", referenciaId: camp.id })) continue;

        const mensagem = (camp.mensagem || `Oi, {nome}! Temos uma novidade em ${neg}: ${camp.nome}.`)
          .replace(/\{nome\}/g, cliente.nome || "").replace(/\{negocio\}/g, neg);

        if (camp.imagem_url) {
          await enviarImagemZapi({ ...credZapi, telefone: cliente.telefone, imagemUrl: camp.imagem_url, legenda: mensagem });
        } else {
          await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
        }
        await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "campanha_auto", referenciaId: camp.id });
        console.log("[rotina-diaria] campanha automática enviada:", camp.id, cliente.id);
        enviados++;
        await pausar(1500);
      } catch (e) {
        console.error("[rotina-diaria] erro campanha automática", camp.id, cliente.id, e.message);
      }
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
    await rodarCampanhasAutomaticas(integ, credZapi);
  }

  return { statusCode: 200, body: "ok" };
};
