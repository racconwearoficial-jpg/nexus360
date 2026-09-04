import { NextRequest, NextResponse } from "next/server";
import { getCredenciaisZapi, enviarTextoZapi, enviarImagemZapi } from "@/lib/zapi";

export const dynamic = "force-dynamic";

// Envia uma mensagem de WhatsApp real via Z-API (texto, ou imagem com legenda
// se imagem_url vier preenchida). Usada como upgrade do botão "Enviar
// WhatsApp" do sistema quando a empresa tem o Z-API conectado — sem isso, o
// sistema cai pro link wa.me como sempre fez.
export async function POST(req: NextRequest) {
  const { company_id, telefone, mensagem, imagem_url } = await req.json();
  if (!company_id || !telefone || !mensagem) {
    return NextResponse.json({ error: "company_id, telefone e mensagem são obrigatórios" }, { status: 400 });
  }

  try {
    const cred = await getCredenciaisZapi(company_id);
    const resultado = imagem_url
      ? await enviarImagemZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone, imagemUrl: imagem_url, legenda: mensagem })
      : await enviarTextoZapi({ ...cred, instanceId: cred.instance_id, clientToken: cred.client_token, telefone, mensagem });
    return NextResponse.json({ ok: true, resultado });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao enviar mensagem" }, { status: 500 });
  }
}
