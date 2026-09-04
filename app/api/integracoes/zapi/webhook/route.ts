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

function normalizarTelefone(numero: string) {
  let limpo = (numero || "").replace(/\D/g, "");
  if (limpo.startsWith("55") && limpo.length > 11) limpo = limpo.slice(2);
  return limpo;
}

export async function POST(req: NextRequest) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  // Ignora: mensagem que o próprio número do negócio enviou (evita loop —
  // inclusive a resposta que este webhook manda), mensagem de grupo, ou
  // qualquer coisa que não seja texto simples (áudio, figurinha, imagem).
  if (payload.fromMe || payload.isGroup || !payload?.text?.message) {
    return NextResponse.json({ ok: true });
  }

  const instanceId = payload.instanceId;
  const telefoneCliente = payload.phone;
  const mensagemRecebida = String(payload.text.message).slice(0, 1000);
  if (!instanceId || !telefoneCliente) return NextResponse.json({ ok: true });

  try {
    const { data: integracao } = await supabaseAdmin
      .from("integracoes_zapi")
      .select("company_id, instance_id, token, client_token, atendimento_auto")
      .eq("instance_id", instanceId)
      .single();

    // Sem integração cadastrada, ou atendimento automático desligado (é
    // opt-in) — não responde nada, deixa o dono responder manualmente.
    if (!integracao || !integracao.atendimento_auto) {
      return NextResponse.json({ ok: true });
    }

    const companyId = integracao.company_id;

    const [{ data: config }, { data: clientes }] = await Promise.all([
      supabaseAdmin.from("configuracoes").select("nome_negocio, segmento").eq("company_id", companyId).single(),
      supabaseAdmin.from("clientes").select("nome, telefone, pontos, status, ultima_compra").eq("company_id", companyId),
    ]);

    const telNormalizado = normalizarTelefone(telefoneCliente);
    const cliente = (clientes || []).find((c: any) => normalizarTelefone(c.telefone) === telNormalizado);

    const negocio = config?.nome_negocio || "nosso negócio";
    const segmento = config?.segmento || "comércio local";

    const contextoCliente = cliente
      ? `Cliente identificado: ${cliente.nome}, status ${cliente.status}, ${cliente.pontos || 0} pontos acumulados${cliente.ultima_compra ? ", última compra em " + cliente.ultima_compra : ", ainda sem compra registrada"}.`
      : "Esse número não está cadastrado como cliente ainda.";

    const prompt = `Você é o atendente virtual do WhatsApp de ${negocio} (${segmento}). Responda de forma curta, educada e direta, como uma pessoa real do atendimento responderia. Nunca revele que é uma IA a menos que perguntem diretamente.

REGRAS OBRIGATÓRIAS, NUNCA QUEBRE:
1. NUNCA dê conselho de saúde, indicação de medicamento, dosagem, interação ou qualquer informação médica — mesmo se perguntarem diretamente. Responda que um atendente humano vai retornar sobre isso o quanto antes.
2. NUNCA invente preço, desconto, disponibilidade de produto ou qualquer promessa que não esteja explicitamente nas informações abaixo.
3. Se não souber responder com certeza, diga que vai verificar e um atendente humano responde em breve — não chute.
4. Nunca use asteriscos ou markdown. No máximo 3 frases.

INFORMAÇÕES DISPONÍVEIS:
${contextoCliente}

Mensagem do cliente: "${mensagemRecebida}"

Sua resposta:`;

    const respostaIA = await fetch(`${SUPABASE_URL}/functions/v1/ia-mensagem`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify({ prompt }),
    }).then(r => r.json()).catch(() => null);

    const textoResposta = respostaIA?.mensagem || "Recebi sua mensagem! Um atendente vai te responder em breve.";

    await enviarTextoZapi({
      instanceId: integracao.instance_id,
      token: integracao.token,
      clientToken: integracao.client_token,
      telefone: telefoneCliente,
      mensagem: textoResposta,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: true, erroInterno: e.message });
  }
}
