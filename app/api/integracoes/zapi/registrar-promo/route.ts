import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { exigirEmpresa } from "@/lib/authEmpresa";
import { registrarEnvio } from "@/lib/automacoesLog";

export const dynamic = "force-dynamic";

// Registra que uma mensagem promocional foi enviada MANUALMENTE a um cliente (botões do
// sistema que abrem o WhatsApp: "Enviar Campanha", "Recuperar inativos" e sugestões de
// contato). Essas mensagens levam o rodapé "responda SAIR"; o webhook só aceita um SAIR
// de quem recebeu promoção recentemente, então sem este registro o SAIR de quem recebeu
// uma mensagem enviada à mão seria ignorado.
export async function POST(req: NextRequest) {
  const { company_id, cliente_id } = await req.json();
  if (!company_id || !cliente_id) {
    return NextResponse.json({ error: "company_id e cliente_id são obrigatórios" }, { status: 400 });
  }

  const negado = await exigirEmpresa(req, company_id);
  if (negado) return negado;

  // O cliente precisa ser da própria empresa (não confia no id vindo do navegador).
  const { data: cliente } = await supabaseAdmin
    .from("clientes").select("id").eq("id", cliente_id).eq("company_id", company_id).maybeSingle();
  if (!cliente) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });

  await registrarEnvio({ companyId: company_id, clienteId: cliente.id, tipo: "promo_manual", referenciaId: null });
  return NextResponse.json({ ok: true });
}
