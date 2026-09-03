import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buscarOuCriarClienteAsaas, criarAssinaturaAsaas, asaasConfigurado } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// Cria a assinatura no Asaas e grava o vínculo local. Chamado quando o admin
// assina um cliente a um plano de assinatura recorrente.
export async function POST(req: NextRequest) {
  const { company_id, cliente_id, plano_id } = await req.json();
  if (!company_id || !cliente_id || !plano_id) {
    return NextResponse.json({ error: "company_id, cliente_id e plano_id são obrigatórios" }, { status: 400 });
  }
  if (!asaasConfigurado()) {
    return NextResponse.json({ error: "Asaas não configurado no servidor (falta ASAAS_API_KEY)." }, { status: 500 });
  }

  try {
    const { data: cliente, error: errCli } = await supabaseAdmin
      .from("clientes").select("*").eq("id", cliente_id).eq("company_id", company_id).single();
    if (errCli || !cliente) throw new Error("Cliente não encontrado.");

    const { data: plano, error: errPlano } = await supabaseAdmin
      .from("planos_assinatura").select("*").eq("id", plano_id).eq("company_id", company_id).single();
    if (errPlano || !plano) throw new Error("Plano não encontrado.");

    const asaasCustomerId = await buscarOuCriarClienteAsaas({
      nome: cliente.nome, cpfCnpj: cliente.cpf, telefone: cliente.telefone,
    });

    const amanha = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const assinaturaAsaas = await criarAssinaturaAsaas({
      customerId: asaasCustomerId,
      valor: plano.valor,
      ciclo: plano.ciclo,
      descricao: plano.nome,
      proximaCobranca: amanha,
    });

    const { data: novaAssinatura, error: errIns } = await supabaseAdmin.from("assinaturas").insert({
      company_id, cliente_id, plano_id,
      asaas_customer_id: asaasCustomerId,
      asaas_subscription_id: assinaturaAsaas.id,
      status: "ativa",
      proxima_cobranca: amanha,
    }).select().single();
    if (errIns) throw errIns;

    return NextResponse.json({ ok: true, assinatura: novaAssinatura });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao criar assinatura" }, { status: 500 });
  }
}
