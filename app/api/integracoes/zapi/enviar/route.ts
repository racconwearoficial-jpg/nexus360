import { NextRequest, NextResponse } from "next/server";
import { getCredenciaisZapi, enviarTextoZapi, enviarImagemZapi } from "@/lib/zapi";
import { exigirEmpresa, limiteEnvioManual, TIPO_ENVIO_MANUAL } from "@/lib/authEmpresa";
import { registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Envia uma mensagem de WhatsApp real via Z-API (texto, ou imagem com legenda
// se imagem_url vier preenchida). Usada como upgrade do botão "Enviar
// WhatsApp" do sistema quando a empresa tem o Z-API conectado — sem isso, o
// sistema cai pro link wa.me como sempre fez.
//
// Proteções (número de WhatsApp da empresa é ativo crítico): exige usuário
// logado que pertença à empresa, valida o telefone e limita a cadência.
export async function POST(req: NextRequest) {
  const { company_id, telefone, mensagem, imagem_url } = await req.json();
  if (!company_id || !telefone || !mensagem) {
    return NextResponse.json({ error: "company_id, telefone e mensagem são obrigatórios" }, { status: 400 });
  }

  const negado = await exigirEmpresa(req, company_id);
  if (negado) return negado;

  const digitos = String(telefone).replace(/\D/g, "");
  if (String(telefone).includes("@") || digitos.length < 10 || digitos.length > 13) {
    return NextResponse.json({ error: "Telefone inválido" }, { status: 400 });
  }
  if (String(mensagem).length > 4000) {
    return NextResponse.json({ error: "Mensagem muito longa" }, { status: 400 });
  }

  const limitado = await limiteEnvioManual(company_id);
  if (limitado) return limitado;

  try {
    const cred = await getCredenciaisZapi(company_id);
    const resultado = imagem_url
      ? await enviarImagemZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone, imagemUrl: imagem_url, legenda: mensagem })
      : await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone, mensagem });
    await registrarEnvio({ companyId: company_id, clienteId: null, tipo: TIPO_ENVIO_MANUAL, referenciaId: null });
    return NextResponse.json({ ok: true, resultado });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao enviar mensagem" }, { status: 500 });
  }
}
