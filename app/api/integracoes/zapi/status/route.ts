import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { statusInstanciaZapi } from "@/lib/zapi";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("company_id");
  if (!companyId) return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });

  const { data } = await supabaseAdmin
    .from("integracoes_zapi")
    .select("instance_id, token, client_token, connected_at")
    .eq("company_id", companyId)
    .single();

  if (!data) {
    return NextResponse.json(
      { conectado: false },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  // Além de ter credenciais salvas, confere se o WhatsApp da instância está
  // de fato conectado no momento (pode ter caído/desconectado do lado do Z-API).
  let whatsappConectado = null;
  try {
    const status = await statusInstanciaZapi({ instanceId: data.instance_id, token: data.token, clientToken: data.client_token });
    whatsappConectado = Boolean(status.connected);
  } catch (e) {
    whatsappConectado = null; // não deu pra checar agora, mas as credenciais existem
  }

  return NextResponse.json(
    { conectado: true, whatsappConectado, conectadoEm: data.connected_at },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
