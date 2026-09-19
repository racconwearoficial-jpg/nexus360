// Pedido de saída (opt-out) de mensagens promocionais por WhatsApp.
//
// Por que existe: a principal causa de banimento de número no WhatsApp é o
// destinatário denunciar/bloquear. Quem quer parar de receber precisa ter um
// jeito fácil e imediato de pedir ("SAIR") — senão ele denuncia. Também é
// exigência da LGPD (direito de oposição ao tratamento).
//
// CommonJS de propósito: é importado tanto pelo Next (webhook) quanto pela
// function do Netlify (rotina-diaria.js, empacotada à parte, import relativo).

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // tira acentos
    .replace(/[^a-z0-9 ]/g, " ")                        // tira pontuação/emoji
    .replace(/\s+/g, " ")
    .trim();
}

// Mensagem INTEIRA igual a uma destas (depois de normalizar). Igualdade exata,
// não "contém": "posso sair mais cedo?" ou "cancelar minha reserva" são
// mensagens normais de cliente e NÃO podem cair aqui.
const PEDIDOS_DE_SAIDA = new Set([
  "sair", "parar", "pare", "parem", "stop", "descadastrar", "remover", "sair da lista",
  "cancelar inscricao", "cancelar mensagens", "pare de enviar", "nao enviar mais",
  "nao quero receber", "nao quero mais receber",
  "nao quero receber mensagens", "nao quero mais receber mensagens",
]);

const PEDIDOS_DE_VOLTA = new Set([
  "voltar", "quero receber", "quero voltar a receber", "reativar",
]);

function ehPedidoDeSaida(texto) { return PEDIDOS_DE_SAIDA.has(normalizar(texto)); }
function ehPedidoDeVolta(texto) { return PEDIDOS_DE_VOLTA.has(normalizar(texto)); }

// Rodapé das mensagens promocionais automáticas. Só deve ser usado quando o
// opt-out está realmente funcionando (coluna clientes.optout_marketing existe e
// o webhook trata "SAIR") — senão promete uma coisa que o sistema não cumpre.
const RODAPE_OPTOUT = "Para não receber mais mensagens, responda SAIR.";

// Prazo (em dias) de validade do SAIR e do VOLTAR. "sair" e "voltar" são palavras comuns
// demais para valerem a qualquer hora: SAIR só é aceito de quem RECEBEU uma promoção
// nos últimos JANELA_DIAS dias, e VOLTAR só nos JANELA_DIAS dias depois de o cliente ter
// saído (funciona como "desfazer" para quem saiu por engano).
const JANELA_DIAS = 3;

const MSG_SAIDA_CONFIRMADA = `Tudo bem, você não vai mais receber mensagens promocionais da gente. Se foi engano, responda VOLTAR nos próximos ${JANELA_DIAS} dias.`;
const MSG_VOLTA_CONFIRMADA = "Pronto, você voltou a receber nossas novidades. Se quiser parar de novo, responda SAIR.";

// Escolhe uma variação ao acaso — mensagens idênticas em série para muita gente
// são um dos sinais que o WhatsApp usa para detectar envio em massa.
function escolher(variacoes) {
  return variacoes[Math.floor(Math.random() * variacoes.length)];
}

module.exports = {
  normalizar, ehPedidoDeSaida, ehPedidoDeVolta, escolher,
  RODAPE_OPTOUT, MSG_SAIDA_CONFIRMADA, MSG_VOLTA_CONFIRMADA, JANELA_DIAS,
};
