const { createClient } = require("@supabase/supabase-js");

// Roda a cada 30 min no horário comercial (agendado via netlify.toml, seção
// [functions."rotina-diaria"]) e manda poucas mensagens por rodada — ver
// LIMITE_DIARIO_TOTAL / LIMITE_POR_EXECUCAO abaixo.
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

const { escolher, RODAPE_OPTOUT } = require("../../lib/optout.js");

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
    // Sem emoji, mesmo que a IA coloque (padrão visual do produto).
    const limpa = String(d?.mensagem || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").replace(/[ \t]{2,}/g, " ").replace(/ +\n/g, "\n").trim();
    return limpa || fallback;
  } catch {
    return fallback;
  }
}

const inicioDeHoje = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.toISOString(); };
const diasAtras = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };

// Mesma tabela de benefícios do painel (FID_RECOMPENSAS em nexus360_v2.html).
// Duplicado aqui porque essa function é empacotada à parte e não importa o
// HTML — se a tabela mudar lá, replicar aqui também.
const FID_RECOMPENSAS = [
  { pontos: 100, label: "R$5 de desconto", valor: 5 },
  { pontos: 200, label: "R$10 de desconto", valor: 10 },
  { pontos: 300, label: "R$20 de desconto", valor: 20 },
];
function proximoBeneficio(pontos) {
  const p = parseInt(pontos) || 0;
  const prox = FID_RECOMPENSAS.find((r) => r.pontos > p);
  return prox ? { faltam: prox.pontos - p, label: prox.label } : null;
}
// Cliente que já bateu o maior nível recebe aviso de que já pode trocar
// pontos pelo benefício máximo, em vez de "faltam 0 pontos".
function fraseBeneficio(pontos) {
  const prox = proximoBeneficio(pontos);
  if (prox) return `Faltam ${prox.faltam} pontos pra você resgatar ${prox.label}.`;
  const max = FID_RECOMPENSAS[FID_RECOMPENSAS.length - 1];
  return `Você já pode trocar seus pontos pelo benefício de ${max.label}!`;
}

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

// Espalhar os envios ao longo do dia (padrão de rajada é o que mais chama a
// atenção do WhatsApp): a function roda a cada 30 min (netlify.toml), manda
// poucas mensagens por execução com pausa ALEATÓRIA entre elas, e para de vez
// quando atinge o teto do dia. Como cada tipo tem dedupe próprio, rodar várias
// vezes por dia não repete envio. Ajuste os 4 números abaixo se precisar.
const LIMITE_DIARIO_TOTAL = 30;  // todas as automações somadas, por empresa/dia
const LIMITE_POR_EXECUCAO = 2;   // por rodada (a cada 30 min)
const PAUSA_MIN_MS = 4000;
const PAUSA_MAX_MS = 9000;
const pausar = (ms) => new Promise((r) => setTimeout(r, ms));
const pausaAleatoria = () => pausar(PAUSA_MIN_MS + Math.random() * (PAUSA_MAX_MS - PAUSA_MIN_MS));

// Orçamento de envios da rodada atual, compartilhado entre todas as automações.
let orcamento = 0;
const temOrcamento = () => orcamento > 0;
const gastarOrcamento = () => { orcamento--; };

// Quantos envios de rotina já saíram hoje (fuso de Brasília = UTC-3, sem horário
// de verão). Reativação não grava no log, só em clientes.reativacao_enviada_em.
async function contarEnviadosHoje(companyId) {
  const { ano, mes, dia } = hojeBrasilia();
  const inicio = new Date(Date.UTC(ano, mes - 1, dia, 3, 0, 0)).toISOString();
  const [log, reat] = await Promise.all([
    supabaseAdmin.from("automacoes_whatsapp_log").select("id", { count: "exact", head: true })
      .eq("company_id", companyId).in("tipo", ["recompra", "fiado_lembrete", "aniversario", "campanha_auto"]).gte("enviado_em", inicio),
    supabaseAdmin.from("clientes").select("id", { count: "exact", head: true })
      .eq("company_id", companyId).gte("reativacao_enviada_em", inicio),
  ]);
  return (log.count || 0) + (reat.count || 0);
}

// ── Proteção do número de WhatsApp ───────────────────────────────────────────
// 1) Rampa de aquecimento: número recém-conectado à API não pode sair mandando
//    o volume cheio (o WhatsApp desconfia de sessão nova enviando muito). O teto
//    do dia começa em WARMUP_BASE e sobe WARMUP_POR_DIA a cada dia desde
//    integracoes_zapi.connected_at, até LIMITE_DIARIO_TOTAL.
// 2) Disjuntor: cada falha de envio é registrada (tipo "falha_envio"). Erro grave
//    (banido/bloqueado/desconectado) ou FALHAS_MAX_POR_DIA falhas param os envios
//    da empresa pelo resto do dia — melhor parar do que insistir num número em
//    risco.
// 3) Antes de cada rodada confere se o WhatsApp da instância está conectado.
const WARMUP_BASE = 8;
const WARMUP_POR_DIA = 2;
const FALHAS_MAX_POR_DIA = 3;
const ERRO_GRAVE = /(banned|\bban\b|bloquead|blocked|suspens|restrict|desconect|disconnect|not connected|n[aã]o conectad|unauthorized|invalid token|token inv)/i;

function limiteDiarioDaInstancia(integ) {
  if (!integ.connected_at) return LIMITE_DIARIO_TOTAL;
  const dias = Math.max(0, Math.floor((Date.now() - new Date(integ.connected_at).getTime()) / 86400000));
  return Math.max(0, Math.min(LIMITE_DIARIO_TOTAL, WARMUP_BASE + WARMUP_POR_DIA * dias));
}

function inicioDoDiaBrasilia() {
  const { ano, mes, dia } = hojeBrasilia();
  return new Date(Date.UTC(ano, mes - 1, dia, 3, 0, 0)).toISOString();
}

async function contarFalhasHoje(companyId) {
  const { count } = await supabaseAdmin.from("automacoes_whatsapp_log").select("id", { count: "exact", head: true })
    .eq("company_id", companyId).eq("tipo", "falha_envio").gte("enviado_em", inicioDoDiaBrasilia());
  return count || 0;
}

async function tratarFalha(integ, erro) {
  gastarOrcamento(); // falha também conta no orçamento da rodada
  try {
    const msg = String((erro && erro.message) || erro || "");
    const vezes = ERRO_GRAVE.test(msg) ? FALHAS_MAX_POR_DIA : 1; // erro grave desarma na hora
    for (let i = 0; i < vezes; i++) await registrarEnvio({ companyId: integ.company_id, clienteId: null, tipo: "falha_envio", referenciaId: msg.slice(0, 120) });
    if (vezes >= FALHAS_MAX_POR_DIA) {
      orcamento = 0; // erro grave: nem tenta o próximo cliente desta rodada
      console.error("[rotina-diaria] DISJUNTOR ACIONADO (erro grave), envios pausados hoje:", integ.company_id, msg);
    }
  } catch (e) { console.error("[rotina-diaria] não consegui registrar falha:", e.message); }
}

async function instanciaConectada(credZapi) {
  try {
    const r = await fetch(`${ZAPI_BASE}/instances/${credZapi.instanceId}/token/${credZapi.token}/status`, { method: "GET", headers: headersZapi(credZapi.clientToken) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, motivo: d.error || d.message || `status HTTP ${r.status}` };
    if (d.connected !== true) return { ok: false, motivo: d.error || "WhatsApp da instância não está conectado" };
    return { ok: true };
  } catch (e) {
    return { ok: false, motivo: e.message };
  }
}

function domingoBrasilia() {
  return new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short" }).format(new Date()) === "Sun";
}

// Cliente que pediu para sair (SAIR) não recebe nenhuma mensagem promocional.
// A coluna pode ainda não existir (migração optout_marketing.sql): nesse caso a
// propriedade é undefined e ninguém é excluído. O rodapé "responda SAIR" só é
// usado quando a coluna existe, ou seja, quando o pedido de saída é cumprido de fato.
const pediuSaida = (c) => c && c.optout_marketing === true;

// Últimos 8 dígitos do telefone = identifica a MESMA pessoa mesmo cadastrada duas
// vezes. Hoje há dezenas de duplicatas (o cadastro automático não achava o cliente
// porque telefone_normalizado está errado/vazio em ~30% da base e criava outro),
// e cada duplicata recebia a campanha: a pessoa levava a mesma mensagem 2x.
const chaveTel = (c) => {
  const d = String((c && c.telefone) || "").replace(/\D/g, "");
  return d.length >= 8 ? d.slice(-8) : "";
};
// Se qualquer cadastro daquele telefone pediu para sair, todos ficam de fora.
const telefonesQueSairam = (clientes) => new Set((clientes || []).filter(pediuSaida).map(chaveTel).filter(Boolean));
const rodapeOptout = (c) => (c && Object.prototype.hasOwnProperty.call(c, "optout_marketing") ? `\n\n${RODAPE_OPTOUT}` : "");

function horaBrasilia() {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  return { hora: Number(p.find((x) => x.type === "hour").value) % 24, minuto: Number(p.find((x) => x.type === "minute").value) };
}

// Fisher-Yates — usado só nas campanhas automáticas, pra cada execução
// pegar uma amostra aleatória de quem ainda não recebeu (em vez de sempre
// os mesmos primeiros da lista, que sairia em ordem de cadastro todo dia).
function embaralhar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// #6 — Lembrete de recompra: usa só a cadência real de compras do cliente
// (datas em "vendas"), não tenta adivinhar qual item específico está
// acabando — a tabela de vendas não guarda item por linha, só texto livre,
// então não dá pra afirmar "seu remédio X está acabando" sem inventar.
async function rodarRecompra(integ, credZapi) {
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("*").eq("company_id", integ.company_id);
  let enviados = 0;
  for (const cliente of clientes || []) {
    if (enviados >= LIMITE_ENVIOS_POR_TIPO || !temOrcamento()) break;
    if (pediuSaida(cliente)) continue;
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

      const mensagem = escolher([
        `Oi, ${cliente.nome}! Faz um tempinho desde sua última compra com a gente — se estiver precisando repor algo, é só chamar por aqui.`,
        `Olá, ${cliente.nome}! Passando para lembrar que estamos por aqui caso precise repor algo. É só responder esta mensagem.`,
        `${cliente.nome}, tudo bem? Se estiver na hora de repor alguma coisa, é só chamar a gente por aqui.`,
      ]) + rodapeOptout(cliente);
      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "recompra", referenciaId: null });
      console.log("[rotina-diaria] recompra enviada:", cliente.id);
      enviados++;
      gastarOrcamento();
      if (temOrcamento()) await pausaAleatoria();
    } catch (e) {
      console.error("[rotina-diaria] erro recompra cliente", cliente.id, e.message);
      await tratarFalha(integ, e);
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
    if (enviados >= LIMITE_ENVIOS_POR_TIPO || !temOrcamento()) break;
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
      gastarOrcamento();
      if (temOrcamento()) await pausaAleatoria();
    } catch (e) {
      console.error("[rotina-diaria] erro fiado pendencia", p.id, e.message);
      await tratarFalha(integ, e);
    }
  }
}

// #8 — Reativação: sem bônus inventado (não existe valor de "bônus de
// reativação" configurado no sistema hoje) — só convite de volta, citando a
// fidelidade real que já existe. Cooldown de 60 dias por cliente.
async function rodarReativacao(integ, credZapi) {
  if (!temOrcamento()) return;
  const corteCooldown = diasAtras(30).toISOString();

  // O sistema NUNCA grava status='inativo' no banco — calcularStatus() no
  // nexus360_v2.html computa isso na hora só pra exibir na tela, comparando
  // ultima_compra com dias_inativo. Filtrar por clientes.status aqui nunca
  // achava ninguém, mesmo com centenas de inativos reais. Recalcula do
  // mesmo jeito que o sistema calcula.
  const [{ data: config }, { data: candidatos }] = await Promise.all([
    supabaseAdmin.from("configuracoes").select("dias_inativo, fidelidade_config").eq("company_id", integ.company_id).single(),
    supabaseAdmin.from("clientes")
      .select("*")
      .eq("company_id", integ.company_id)
      // nullsFirst: quem nunca recebeu tem prioridade; depois de enviado, só
      // volta a concorrer daqui 30 dias — assim uma base grande de inativos
      // vai sendo coberta aos poucos (LIMITE_ENVIOS_POR_TIPO por dia).
      // Traz a base toda (não só quem está fora do cooldown) para decidir por
      // TELEFONE: se um cadastro do número já recebeu, os duplicados não recebem.
      .order("reativacao_enviada_em", { ascending: true, nullsFirst: true }),
  ]);
  const todosClientes = candidatos || [];
  const telsSaida = telefonesQueSairam(todosClientes);
  const telsComCooldown = new Set(todosClientes
    .filter((c) => c.reativacao_enviada_em && new Date(c.reativacao_enviada_em).toISOString() >= corteCooldown)
    .map(chaveTel).filter(Boolean));
  const telsVistos = new Set();

  const diasInativoLimite = parseInt(config?.dias_inativo || 30);
  let vipPts = 1000;
  try {
    if (config?.fidelidade_config) vipPts = JSON.parse(config.fidelidade_config).vipPts || 1000;
  } catch {}

  const agora = Date.now();
  const clientes = todosClientes
    .filter((c) => {
      if (pediuSaida(c)) return false;
      // Cooldown do próprio cadastro (antes feito na consulta) e do número inteiro.
      if (c.reativacao_enviada_em && new Date(c.reativacao_enviada_em).toISOString() >= corteCooldown) return false;
      const chave = chaveTel(c);
      if (chave && (telsSaida.has(chave) || telsComCooldown.has(chave))) return false;
      const pontos = parseInt(c.pontos || 0);
      const gasto = parseFloat(c.total_gasto || 0);
      if (pontos >= vipPts || gasto >= 500) return false; // VIP nunca é inativo
      // Sem compra registrada: só considera inativo depois do mesmo prazo
      // contado a partir do CADASTRO — senão lead novo (auto-cadastrado pelo
      // WhatsApp, ultima_compra null por nunca ter comprado) cai aqui no dia
      // seguinte e recebe "sentimos sua falta" antes até de ser atendido.
      const referencia = c.ultima_compra || c.created_at;
      if (!referencia) return false;
      const dias = Math.floor((agora - new Date(referencia).getTime()) / 86400000);
      if (dias <= diasInativoLimite) return false;
      // Uma mensagem por telefone nesta rodada (a mesma pessoa cadastrada 2x).
      if (chave) { if (telsVistos.has(chave)) return false; telsVistos.add(chave); }
      return true;
    })
    .slice(0, LIMITE_ENVIOS_POR_TIPO);

  for (const cliente of clientes) {
    if (!temOrcamento()) break;
    try {
      if (!cliente.telefone) continue;

      const mensagem = escolher([
        `Oi, ${cliente.nome}! Faz tempo que a gente não te vê por aqui — sentimos sua falta. Toda compra continua valendo pontos que dá pra trocar por desconto. Quando quiser, é só chamar.`,
        `Olá, ${cliente.nome}! Sentimos sua falta por aqui. Suas compras continuam gerando pontos que viram desconto. Quando precisar, é só chamar.`,
        `${cliente.nome}, tudo bem? Faz um tempo que você não passa por aqui. Seus pontos de fidelidade continuam valendo — é só chamar quando quiser.`,
      ]) + rodapeOptout(cliente);
      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await supabaseAdmin.from("clientes").update({ reativacao_enviada_em: new Date().toISOString() }).eq("id", cliente.id);
      console.log("[rotina-diaria] reativação enviada:", cliente.id);
      gastarOrcamento();
      if (temOrcamento()) await pausaAleatoria();
    } catch (e) {
      console.error("[rotina-diaria] erro reativação cliente", cliente.id, e.message);
      await tratarFalha(integ, e);
    }
  }
}

// #9 — Aniversário: mesmo prompt que o botão manual já usa no sistema
// (gerador de mensagem de aniversário), só que disparado sozinho no dia.
async function rodarAniversario(integ, credZapi) {
  const hoje = hojeBrasilia();
  const { data: clientes } = await supabaseAdmin
    .from("clientes").select("*").eq("company_id", integ.company_id);
  console.log("[rotina-diaria] aniversario: checando", { hoje, totalClientes: clientes?.length || 0 });
  let enviados = 0;
  for (const cliente of clientes || []) {
    if (enviados >= LIMITE_ENVIOS_POR_TIPO || !temOrcamento()) break;
    try {
      if (!cliente.aniversario) continue;
      if (pediuSaida(cliente)) continue;
      // aniversario é sempre "AAAA-MM-DD" (string) — compara texto direto,
      // sem passar por Date/timezone.
      const [, mesAniv, diaAniv] = cliente.aniversario.split("-").map(Number);
      if (mesAniv !== hoje.mes || diaAniv !== hoje.dia) continue;
      if (!cliente.telefone) continue;

      const referenciaAno = String(hoje.ano);
      if (await jaEnviado({ companyId: integ.company_id, clienteId: cliente.id, tipo: "aniversario", referenciaId: referenciaAno })) continue;

      const prompt = "Crie uma mensagem curta e calorosa de felicitacao de aniversario para WhatsApp de um estabelecimento para um cliente. Use {nome} para o nome do cliente. Maximo 2 linhas. Sem markdown. Sem emojis.";
      const fallback = `Feliz aniversário, {nome}! Desejamos um dia incrível, com muita saúde e alegria.`;
      const template = await gerarMensagemIA(prompt, fallback);
      const mensagem = template.replace(/\{nome\}/g, cliente.nome).replace(/\*\*/g, "");

      await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
      await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "aniversario", referenciaId: referenciaAno });
      console.log("[rotina-diaria] aniversário enviado:", cliente.id);
      enviados++;
      gastarOrcamento();
      if (temOrcamento()) await pausaAleatoria();
    } catch (e) {
      console.error("[rotina-diaria] erro aniversário cliente", cliente.id, e.message);
      await tratarFalha(integ, e);
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
  if (!temOrcamento()) return;
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
    supabaseAdmin.from("configuracoes").select("nome_negocio, dias_inativo, fidelidade_config").eq("company_id", integ.company_id).single(),
    supabaseAdmin.from("clientes").select("*").eq("company_id", integ.company_id),
  ]);
  const neg = config?.nome_negocio || "nossa loja";
  const diasInativoLimite = parseInt(config?.dias_inativo || 30);
  let vipPts = 1000;
  try { if (config?.fidelidade_config) vipPts = JSON.parse(config.fidelidade_config).vipPts || 1000; } catch {}

  // A coluna clientes.status NÃO é mantida no banco (quase todo mundo fica "ativo",
  // inclusive quem nunca comprou): a tela calcula na hora (calcularStatus() no
  // nexus360_v2.html). Usar a coluna mandava "Ativos" para a base inteira, com
  // contatos frios — o que mais gera denúncia. Aqui replica o cálculo da tela.
  // Data da última compra ao meio-dia de Brasília (15:00 UTC), igual a
  // _dataUltimaCompra() da tela, para o corte de dias bater com o dashboard.
  const statusReal = (c) => {
    if ((parseInt(c.pontos) || 0) >= vipPts) return "vip";
    if (!c.ultima_compra) return "inativo";
    const [a, m, d] = String(c.ultima_compra).split("T")[0].split("-").map(Number);
    const dias = Math.floor((Date.now() - Date.UTC(a, m - 1, d, 15, 0, 0)) / 86400000);
    return dias > diasInativoLimite ? "inativo" : "ativo";
  };

  const telsSaida = telefonesQueSairam(clientes);

  for (const camp of campanhas) {
    const pub = (camp.publico || "Todos").toLowerCase().trim();
    let destinatarios = (clientes || []).filter((c) => c.telefone && c.telefone.trim() && !pediuSaida(c) && !telsSaida.has(chaveTel(c)));

    if (pub === "ativos") {
      // VIP é, por definição, um cliente ativo: "Ativos" = ativo + VIP (como no dashboard).
      destinatarios = destinatarios.filter((c) => statusReal(c) !== "inativo");
    } else if (pub === "inativos") {
      destinatarios = destinatarios.filter((c) => {
        // Mesma correção do rodarReativacao: sem compra usa o cadastro como
        // referência, não conta lead novo como inativo no dia seguinte.
        const referencia = c.ultima_compra || c.created_at;
        if (!referencia) return false;
        const dias = Math.floor((Date.now() - new Date(referencia).getTime()) / 86400000);
        return dias > diasInativoLimite;
      });
    } else if (pub === "vip") {
      destinatarios = destinatarios.filter((c) => statusReal(c) === "vip");
    } else if (pub === "aniversariantes") {
      destinatarios = destinatarios.filter((c) => {
        if (!c.aniversario) return false;
        const [, mesAniv, diaAniv] = c.aniversario.split("-").map(Number);
        return mesAniv === hoje.mes && diaAniv === hoje.dia;
      });
    } else if (pub === "feminino") {
      destinatarios = destinatarios.filter((c) => c.sexo === "F");
    } else if (pub === "masculino") {
      destinatarios = destinatarios.filter((c) => c.sexo === "M");
    }

    // Uma mensagem por TELEFONE nesta campanha: tira quem repete dentro da lista e
    // quem já recebeu por outro cadastro do mesmo número (registro no log).
    const { data: jaRecebeu } = await supabaseAdmin.from("automacoes_whatsapp_log").select("cliente_id")
      .eq("company_id", integ.company_id).eq("tipo", "campanha_auto").eq("referencia_id", String(camp.id));
    const idsQueRecebeu = new Set((jaRecebeu || []).map((r) => r.cliente_id));
    const telsQueRecebeu = new Set((clientes || []).filter((c) => idsQueRecebeu.has(c.id)).map(chaveTel).filter(Boolean));
    const telsVistos = new Set();
    destinatarios = destinatarios.filter((c) => {
      const k = chaveTel(c);
      if (!k) return true;
      if (telsQueRecebeu.has(k) || telsVistos.has(k)) return false;
      telsVistos.add(k);
      return true;
    });

    let enviados = 0;
    for (const cliente of embaralhar(destinatarios)) {
      if (enviados >= LIMITE_ENVIOS_POR_TIPO || !temOrcamento()) break;
      try {
        if (await jaEnviado({ companyId: integ.company_id, clienteId: cliente.id, tipo: "campanha_auto", referenciaId: camp.id })) continue;

        const pontosCliente = parseInt(cliente.pontos) || 0;
        const prox = proximoBeneficio(pontosCliente);
        const maxBeneficio = FID_RECOMPENSAS[FID_RECOMPENSAS.length - 1].label;
        const mensagem = (camp.mensagem || `Oi, {nome}! Temos uma novidade em ${neg}: ${camp.nome}.`)
          .replace(/\{nome\}/g, cliente.nome || "")
          .replace(/\{negocio\}/g, neg)
          .replace(/\{pontos\}/g, String(pontosCliente))
          .replace(/\{faltam\}/g, prox ? String(prox.faltam) : "0")
          .replace(/\{beneficio\}/g, prox ? prox.label : maxBeneficio)
          .replace(/\{status_pontos\}/g, fraseBeneficio(pontosCliente))
          + rodapeOptout(cliente);

        if (camp.imagem_url) {
          await enviarImagemZapi({ ...credZapi, telefone: cliente.telefone, imagemUrl: camp.imagem_url, legenda: mensagem });
        } else {
          await enviarTextoZapi({ ...credZapi, telefone: cliente.telefone, mensagem });
        }
        await registrarEnvio({ companyId: integ.company_id, clienteId: cliente.id, tipo: "campanha_auto", referenciaId: camp.id });
        console.log("[rotina-diaria] campanha automática enviada:", camp.id, cliente.id);
        enviados++;
        gastarOrcamento();
      if (temOrcamento()) await pausaAleatoria();
      } catch (e) {
        console.error("[rotina-diaria] erro campanha automática", camp.id, cliente.id, e.message);
        await tratarFalha(integ, e);
      }
    }
  }
}

exports.handler = async function () {
  const { data: integracoes, error } = await supabaseAdmin
    .from("integracoes_zapi").select("company_id, instance_id, token, client_token, connected_at");
  if (error) {
    console.error("[rotina-diaria] falha ao buscar integrações:", error.message);
    return { statusCode: 200, body: "ok" };
  }

  for (const integ of integracoes || []) {
    const credZapi = { instanceId: integ.instance_id, token: integ.token, clientToken: integ.client_token };
    console.log("[rotina-diaria] processando empresa:", integ.company_id);

    // Cada empresa é isolada: um erro numa não impede as outras.
    try {
      // 1) Disjuntor: falhas demais hoje → não envia mais nada até amanhã.
      const falhasHoje = await contarFalhasHoje(integ.company_id);
      if (falhasHoje >= FALHAS_MAX_POR_DIA) {
        console.warn("[rotina-diaria] envios pausados hoje (disjuntor):", integ.company_id, "falhas:", falhasHoje);
        continue;
      }

      // 2) Só envia se o WhatsApp da instância está conectado agora.
      const conexao = await instanciaConectada(credZapi);
      if (!conexao.ok) {
        console.warn("[rotina-diaria] instância não conectada, pulando rodada:", integ.company_id, conexao.motivo);
        continue;
      }

      // 3) Orçamento desta rodada = o menor entre o limite por execução e o que
      //    ainda cabe no teto do dia (com rampa de aquecimento para número novo).
      const limiteDia = limiteDiarioDaInstancia(integ);
      const jaHoje = await contarEnviadosHoje(integ.company_id);
      orcamento = Math.max(0, Math.min(LIMITE_POR_EXECUCAO, limiteDia - jaHoje));
      console.log("[rotina-diaria] enviados hoje:", jaHoje, "| teto do dia:", limiteDia, "| orçamento da rodada:", orcamento);
      if (!temOrcamento()) continue;

    // Ordem = prioridade (o orçamento é compartilhado): o que tem data marcada
    // vem primeiro; campanhas antes de reativação. Recompra faz uma consulta por
    // cliente (pesado), então só na primeira rodada da manhã — o dedupe de 20
    // dias impede repetir nas demais.
      // Domingo: sem mensagem promocional (recompra, campanha, reativação);
      // aniversário e cobrança de fiado seguem normalmente.
      const { hora, minuto } = horaBrasilia();
      const domingo = domingoBrasilia();
      await rodarAniversario(integ, credZapi);
      await rodarFiado(integ, credZapi);
      if (!domingo) {
        if (hora === 8 && minuto < 20) await rodarRecompra(integ, credZapi);
        await rodarCampanhasAutomaticas(integ, credZapi);
        await rodarReativacao(integ, credZapi);
      }
    } catch (e) {
      console.error("[rotina-diaria] erro ao processar empresa", integ.company_id, e.message);
    }
  }

  return { statusCode: 200, body: "ok" };
};
