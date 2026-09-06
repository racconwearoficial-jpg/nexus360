import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { enviarTextoZapi } from "@/lib/zapi";

export const dynamic = "force-dynamic";

// Webhook "ao receber mensagem" do Z-API — configurado manualmente no painel
// Z-API de cada empresa (Instância → Webhooks → Ao receber), apontando pra
// esta URL. Formato do payload confirmado ao vivo contra a documentação
// oficial (developer.z-api.io/webhooks/on-message-received-examples) em
// 04/09/2026.
//
// Responde SEMPRE 200 (mesmo em erro interno) pra evitar reenvio em loop
// pelo Z-API — erros ficam só no campo "erroInterno" da resposta, pra debug.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Mesmos padrões de FCFG_DEFAULTS em nexus360_v2.html — manter em sincronia
// se o dono mudar os defaults lá.
const FCFG_DEFAULTS = {
  ptsReal: 1,
  r1Pts: 100, r1Val: 5,
  r2Pts: 200, r2Val: 12,
  r3Pts: 350, r3Val: 20,
  minDesconto: 20,
  vipPts: 1000, vipBonus: 100, vipDias: 60,
  b1Marco: 500, b1Bonus: 30,
  b2Marco: 800, b2Bonus: 50,
  indPts: 30, indDesc: 5, indMin: 20,
};

// Mesmos limiares da função nivel()/nivelLabel() em nexus360_v2.html.
function nivelCliente(pontos: number) {
  if (pontos >= 1000) return "Diamond";
  if (pontos >= 500) return "Gold";
  if (pontos >= 200) return "Silver";
  return "Bronze";
}

function normalizarTelefone(numero: string) {
  let limpo = (numero || "").replace(/\D/g, "");
  if (limpo.startsWith("55") && limpo.length > 11) limpo = limpo.slice(2);
  return limpo;
}

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch (e: any) {
    console.error("[zapi-webhook] body não é JSON válido:", e.message);
    return NextResponse.json({ ok: true });
  }

  console.log("[zapi-webhook] payload recebido:", JSON.stringify({
    instanceId: payload.instanceId, phone: payload.phone, fromMe: payload.fromMe,
    isGroup: payload.isGroup, temTexto: Boolean(payload?.text?.message),
  }));

  // Ignora: mensagem que o próprio número do negócio enviou (evita loop —
  // inclusive a resposta que este webhook manda), mensagem de grupo, ou
  // qualquer coisa que não seja texto simples (áudio, figurinha, imagem).
  if (payload.fromMe || payload.isGroup || !payload?.text?.message) {
    console.log("[zapi-webhook] ignorado: fromMe/isGroup/sem texto");
    return NextResponse.json({ ok: true });
  }

  const instanceId = payload.instanceId;
  const telefoneCliente = payload.phone;
  const mensagemRecebida = String(payload.text.message).slice(0, 1000);
  if (!instanceId || !telefoneCliente) {
    console.log("[zapi-webhook] ignorado: faltou instanceId ou phone no payload");
    return NextResponse.json({ ok: true });
  }

  try {
    const { data: integracao, error: erroIntegracao } = await supabaseAdmin
      .from("integracoes_zapi")
      .select("company_id, instance_id, token, client_token, atendimento_auto")
      .eq("instance_id", instanceId)
      .single();

    // Sem integração cadastrada, ou atendimento automático desligado (é
    // opt-in) — não responde nada, deixa o dono responder manualmente.
    if (!integracao || !integracao.atendimento_auto) {
      console.log("[zapi-webhook] não respondeu:", {
        instanceIdRecebido: instanceId,
        encontrouIntegracao: Boolean(integracao),
        atendimentoAuto: integracao?.atendimento_auto,
        erroBusca: erroIntegracao?.message,
      });
      return NextResponse.json({ ok: true });
    }

    const companyId = integracao.company_id;

    const [{ data: config }, { data: clientes }, { data: itens }, { data: planos }] = await Promise.all([
      supabaseAdmin.from("configuracoes").select("nome_negocio, segmento, chatbot_horario, chatbot_endereco, chatbot_pagamento, chatbot_faq, fidelidade_config").eq("company_id", companyId).single(),
      supabaseAdmin.from("clientes").select("id, nome, telefone, pontos, status, ultima_compra, fidelidade_status").eq("company_id", companyId),
      supabaseAdmin.from("itens").select("nome, preco, tipo, estoque").eq("company_id", companyId).order("nome").limit(60),
      supabaseAdmin.from("planos_assinatura").select("nome, descricao, valor, ciclo").eq("company_id", companyId).eq("ativo", true),
    ]);

    const telNormalizado = normalizarTelefone(telefoneCliente);
    let cliente = (clientes || []).find((c: any) => normalizarTelefone(c.telefone) === telNormalizado);

    // Número não cadastrado ainda — cadastra automaticamente usando o nome do
    // perfil do WhatsApp (senderName, vem pronto no payload do Z-API, não
    // precisa perguntar nada nem depender da IA interpretar texto livre).
    // Sem pontos, sem compra — só transforma o contato em lead no CRM.
    let clienteNovo = false;
    if (!cliente) {
      const nomeWhatsapp = String(payload.senderName || payload.chatName || "").trim().slice(0, 80) || "Cliente WhatsApp";
      const { data: novo, error: erroNovoCliente } = await supabaseAdmin
        .from("clientes")
        .insert({ company_id: companyId, nome: nomeWhatsapp, telefone: telefoneCliente, status: "ativo", pontos: 0 })
        .select("id, nome, telefone, pontos, status, ultima_compra, fidelidade_status")
        .single();
      if (novo) {
        cliente = novo;
        clienteNovo = true;
        console.log("[zapi-webhook] cliente novo cadastrado automaticamente:", { nome: nomeWhatsapp, telefone: telefoneCliente });
      } else {
        console.error("[zapi-webhook] falha ao cadastrar cliente automaticamente:", erroNovoCliente?.message);
      }
    }

    // Reservas em aberto do cliente (produto separado aguardando retirada) —
    // só busca se o número já é cliente cadastrado, porque a tabela guarda
    // client_id, não telefone.
    let contextoReservas: string | null = null;
    if (cliente) {
      const { data: reservas } = await supabaseAdmin
        .from("reservas")
        .select("quantity, expires_at, itens(nome)")
        .eq("company_id", companyId)
        .eq("client_id", cliente.id)
        .eq("status", "reservado");
      if (reservas && reservas.length) {
        contextoReservas = reservas
          .map((r: any) => `${r.quantity}x ${r.itens?.nome || "produto"} — retirar até ${new Date(r.expires_at).toLocaleDateString("pt-BR")}`)
          .join("\n");
      }
    }

    const negocio = config?.nome_negocio || "nosso negócio";
    const segmento = config?.segmento || "comércio local";

    const contextoCliente = cliente
      ? `${clienteNovo ? "Cliente NOVO, acabou de ser cadastrado automaticamente agora (primeira mensagem dele) — vale dar boas-vindas" : "Cliente identificado"}: ${cliente.nome}, status ${cliente.status}, nível ${nivelCliente(cliente.pontos || 0)}, ${cliente.pontos || 0} pontos acumulados${cliente.ultima_compra ? ", última compra em " + cliente.ultima_compra : ", ainda sem compra registrada"}.`
      : "Esse número não está cadastrado como cliente ainda.";

    // Regras de fidelidade e indicação — mesma fonte (configuracoes.fidelidade_config)
    // usada pela tela de Fidelidade do sistema, salva em fcfgSalvar(). Sem isso aqui,
    // o chatbot não tinha como responder pergunta de pontos/indicação com dado real.
    let fcfg = FCFG_DEFAULTS;
    try {
      if (config?.fidelidade_config) fcfg = { ...FCFG_DEFAULTS, ...JSON.parse(config.fidelidade_config) };
    } catch {}

    const contextoFidelidade = `NÍVEIS: Bronze (até 199 pts), Silver (200-499 pts), Gold (500-999 pts), Diamond (1000+ pts).
Cada R$1 gasto = ${fcfg.ptsReal} ponto(s).
Recompensas: ${fcfg.r1Pts} pts = R$${fcfg.r1Val} de desconto | ${fcfg.r2Pts} pts = R$${fcfg.r2Val} de desconto | ${fcfg.r3Pts} pts = R$${fcfg.r3Val} de desconto ou produto.
Compra mínima para usar desconto de pontos: R$${fcfg.minDesconto}. Apenas 1 benefício por compra.
VIP: a partir de ${fcfg.vipPts} pontos, dura ${fcfg.vipDias} dias, ganha +${fcfg.vipBonus} pts de bônus ao entrar.

INDICAÇÃO: quem indica ganha +${fcfg.indPts} pontos quando o amigo indicado faz a primeira compra. O amigo indicado ganha R$${fcfg.indDesc} de desconto na primeira compra acima de R$${fcfg.indMin}. Para registrar uma indicação, o cliente precisa informar nome e telefone do amigo — só um atendente humano registra isso no sistema, o chatbot não cadastra indicação sozinho.`;

    // Convite ao programa de fidelidade — máquina de estados simples guardada
    // em clientes.fidelidade_status, sem precisar de histórico de conversa.
    // A IA sinaliza a transição de estado terminando a resposta com uma linha
    // "#ACAO_FIDELIDADE:<valor>", que é extraída e aplicada no banco abaixo
    // (nunca aparece pro cliente final). Só nome e aniversario podem ser
    // gravados por essa ação — nada de pontos, status de cliente ou telefone.
    const statusFidelidade = cliente?.fidelidade_status || null;
    let contextoConvite: string;
    if (statusFidelidade === "completo" || statusFidelidade === "recusado") {
      contextoConvite = "Esse assunto já foi resolvido com esse cliente antes — não convide de novo, só fale sobre fidelidade se ele perguntar.";
    } else if (statusFidelidade === "convidado") {
      contextoConvite = `Esse cliente já foi convidado antes a participar do programa de fidelidade e a conversa está em andamento sobre isso.
- Se a mensagem dele aceitar participar mas SEM trazer nome completo e data de nascimento, peça essas duas informações.
- Se a mensagem já trouxer nome completo E data de nascimento, extraia os dois e termine sua resposta, em uma linha própria, sozinha, com exatamente: #ACAO_FIDELIDADE:{"nome":"<nome completo exatamente como o cliente escreveu>","aniversario":"<data no formato AAAA-MM-DD>"}
- Se ele recusar participar, termine sua resposta, em uma linha própria, sozinha, com exatamente: #ACAO_FIDELIDADE:recusado
- Se a mensagem não tiver nada a ver com isso, ignore esse assunto e não emita nenhuma linha #ACAO_FIDELIDADE.`;
    } else {
      contextoConvite = `Esse cliente ainda não foi convidado a participar do programa de fidelidade. Depois de responder a mensagem dele normalmente, se fizer sentido no tom da conversa, convide-o a participar em 1-2 frases, citando que ele ganha pontos em cada compra, pode trocar pontos por desconto, entra no ranking mensal de fidelidade e concorre a prêmios. Se convidar agora, termine sua resposta, em uma linha própria, sozinha, com exatamente: #ACAO_FIDELIDADE:convidado
Se não for um bom momento pra convidar (ex: cliente irritado, pergunta urgente, assunto de saúde), não convide e não emita nenhuma linha #ACAO_FIDELIDADE.`;
    }

    // Catálogo real (preço já cadastrado no sistema) — pode ser citado com
    // segurança, porque não é invenção, é leitura do que já está configurado.
    const contextoCatalogo = (itens && itens.length)
      ? itens.map((i: any) => `${i.nome} — R$ ${parseFloat(i.preco || 0).toFixed(2)}${i.tipo !== "serviço" ? (i.estoque > 0 ? "" : " (sem estoque no momento)") : ""}`).join("\n")
      : "Nenhum produto/serviço cadastrado no catálogo ainda.";

    const cicloLabel: Record<string, string> = { MONTHLY: "mensal", WEEKLY: "semanal", YEARLY: "anual", AVULSO: "pagamento único" };
    const contextoPlanos = (planos && planos.length)
      ? planos.map((p: any) => `${p.nome} — R$ ${parseFloat(p.valor || 0).toFixed(2)} (${cicloLabel[p.ciclo] || p.ciclo})${p.descricao ? ": " + p.descricao : ""}`).join("\n")
      : null;

    // Informações gerais cadastradas em Configurações → Informações para o
    // Chatbot — permite responder direto (horário, endereço, pagamento, FAQ
    // do dono) sem cair em "vou verificar com atendente" à toa.
    //
    // A IA não sabe que dia/hora é "agora" sozinha — sem isso explícito no
    // prompt, ela não tem como calcular se o negócio está aberto comparando
    // com o texto de horário configurado (bug real: perguntado num domingo
    // 18h07 com horário só de seg-sex, respondeu errado).
    const agora = new Date();
    const diaSemanaAtual = agora.toLocaleDateString("pt-BR", { weekday: "long", timeZone: "America/Sao_Paulo" });
    const dataHoraAtual = agora.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });

    const infoPartes: string[] = [`Agora é ${diaSemanaAtual}, ${dataHoraAtual} (horário de Brasília). Use isso pra calcular se o negócio está aberto ou fechado neste momento, comparando com o horário de funcionamento abaixo (se tiver).`];
    if (config?.chatbot_horario) infoPartes.push(`Horário de funcionamento: ${config.chatbot_horario}`);
    if (config?.chatbot_endereco) infoPartes.push(`Endereço: ${config.chatbot_endereco}`);
    if (config?.chatbot_pagamento) infoPartes.push(`Formas de pagamento aceitas: ${config.chatbot_pagamento}`);
    const contextoGeral = infoPartes.join("\n");

    let contextoFaq: string | null = null;
    try {
      const faqs = config?.chatbot_faq ? JSON.parse(config.chatbot_faq) : [];
      if (faqs.length) {
        contextoFaq = faqs.map((f: any) => `P: ${f.pergunta}\nR: ${f.resposta}`).join("\n\n");
      }
    } catch {}

    const prompt = `Você é o atendente virtual do WhatsApp de ${negocio} (${segmento}). Responda de forma curta, educada e direta, como uma pessoa real do atendimento responderia. Nunca revele que é uma IA a menos que perguntem diretamente.

REGRAS OBRIGATÓRIAS, NUNCA QUEBRE:
1. NUNCA dê conselho de saúde, indicação de medicamento, dosagem, interação ou qualquer informação médica — mesmo se perguntarem diretamente. Responda que um atendente humano vai retornar sobre isso o quanto antes.
2. Preço e disponibilidade só podem vir do CATÁLOGO e dos PLANOS abaixo — nunca invente valor, desconto ou promessa que não esteja lá.
3. Pontos, nível e indicação só podem vir do bloco FIDELIDADE E INDICAÇÃO abaixo — nunca invente pontuação ou regra que não esteja lá.
4. Reserva só pode vir do bloco RESERVAS abaixo — se não tiver nada lá, diga que não encontrou reserva em aberto pra esse número.
5. Se perguntarem algo que não está no catálogo, nos planos, na fidelidade/indicação, nas reservas, nas informações gerais, no FAQ nem nas informações do cliente, diga que vai verificar e um atendente humano responde em breve — não chute.
6. Nunca use asteriscos ou markdown. No máximo 3 frases (a linha #ACAO_FIDELIDADE, quando existir, não conta nessas 3 frases e nunca é vista pelo cliente).
7. Só emita a linha #ACAO_FIDELIDADE exatamente nas situações descritas em CONVITE AO PROGRAMA DE FIDELIDADE abaixo. Nunca invente nome ou data de nascimento que o cliente não tenha mandado nessa conversa.

INFORMAÇÕES DO CLIENTE:
${contextoCliente}

CATÁLOGO (produtos/serviços e preços reais):
${contextoCatalogo}
${contextoPlanos ? `\nPLANOS/PACOTES DE ASSINATURA (preços reais):\n${contextoPlanos}` : ""}

FIDELIDADE E INDICAÇÃO:
${contextoFidelidade}

CONVITE AO PROGRAMA DE FIDELIDADE:
${contextoConvite}

RESERVAS:
${contextoReservas || "Nenhuma reserva em aberto pra esse número."}
${contextoGeral ? `\nINFORMAÇÕES GERAIS DO NEGÓCIO:\n${contextoGeral}` : ""}
${contextoFaq ? `\nPERGUNTAS FREQUENTES CADASTRADAS PELO DONO (use a resposta exata quando a pergunta do cliente for parecida):\n${contextoFaq}` : ""}

Mensagem do cliente: "${mensagemRecebida}"

Sua resposta:`;

    const respostaIA = await fetch(`${SUPABASE_URL}/functions/v1/ia-mensagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify({ prompt }),
    }).then(r => r.json()).catch(() => null);

    let textoResposta = respostaIA?.mensagem || "Recebi sua mensagem! Um atendente vai te responder em breve.";

    // Extrai a ação de fidelidade (se a IA emitiu) e some com a linha antes
    // de mandar pro cliente — isso nunca deve aparecer no WhatsApp dele.
    const marcadorAcao = textoResposta.match(/#ACAO_FIDELIDADE:(.+?)\s*$/m);
    if (marcadorAcao && cliente) {
      textoResposta = textoResposta.replace(marcadorAcao[0], "").trim();
      const valorAcao = marcadorAcao[1].trim();
      try {
        if (valorAcao === "convidado" || valorAcao === "recusado") {
          await supabaseAdmin.from("clientes").update({ fidelidade_status: valorAcao }).eq("id", cliente.id);
        } else if (valorAcao.startsWith("{")) {
          const dados = JSON.parse(valorAcao);
          const updateCliente: Record<string, any> = { fidelidade_status: "completo" };
          if (typeof dados.nome === "string" && dados.nome.trim()) updateCliente.nome = dados.nome.trim().slice(0, 120);
          if (typeof dados.aniversario === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dados.aniversario)) updateCliente.aniversario = dados.aniversario;
          await supabaseAdmin.from("clientes").update(updateCliente).eq("id", cliente.id);
        }
        console.log("[zapi-webhook] ação de fidelidade aplicada:", valorAcao);
      } catch (e: any) {
        console.error("[zapi-webhook] falha ao aplicar ação de fidelidade:", e.message, valorAcao);
      }
    }

    console.log("[zapi-webhook] enviando resposta:", { telefoneCliente, textoResposta });

    await enviarTextoZapi({
      instanceId: integracao.instance_id,
      token: integracao.token,
      clientToken: integracao.client_token,
      telefone: telefoneCliente,
      mensagem: textoResposta,
    });

    console.log("[zapi-webhook] resposta enviada com sucesso");
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[zapi-webhook] erro interno:", e.message, e.stack);
    return NextResponse.json({ ok: true, erroInterno: e.message });
  }
}
