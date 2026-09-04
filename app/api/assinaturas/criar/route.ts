import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buscarOuCriarClienteAsaas, criarAssinaturaAsaas, criarCobrancaAvulsaAsaas, getCredenciaisAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// Cria a assinatura no Asaas (na conta própria da empresa) e grava o vínculo
// local. Chamado quando o admin assina um cliente a um plano recorrente.
export async function POST(req: NextRequest) {
  const { company_id, cliente_id, plano_id } = await req.json();
  if (!company_id || !cliente_id || !plano_id) {
    return NextResponse.json({ error: "company_id, cliente_id e plano_id são obrigatórios" }, { status: 400 });
  }

  try {
    const cred = await getCredenciaisAsaas(company_id); // lança erro claro se a empresa não conectou

    const { data: cliente, error: errCli } = await supabaseAdmin
      .from("clientes").select("*").eq("id", cliente_id).eq("company_id", company_id).single();
    if (errCli || !cliente) throw new Error("Cliente não encontrado.");

    const { data: plano, error: errPlano } = await supabaseAdmin
      .from("planos_assinatura").select("*").eq("id", plano_id).eq("company_id", company_id).single();
    if (errPlano || !plano) throw new Error("Plano não encontrado.");

    const asaasCustomerId = await buscarOuCriarClienteAsaas({
      apiKey: cred.api_key, sandbox: cred.sandbox,
      nome: cliente.nome, cpfCnpj: cliente.cpf, telefone: cliente.telefone,
    });

    const amanha = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const ehAvulso = plano.ciclo === "AVULSO";

    // Avulso = pagamento único via /payments (não existe "assinatura" no
    // Asaas pra isso, é diferente de /subscriptions que é sempre recorrente).
    const asaasResultado = ehAvulso
      ? await criarCobrancaAvulsaAsaas({
          apiKey: cred.api_key, sandbox: cred.sandbox,
          customerId: asaasCustomerId, valor: plano.valor,
          descricao: plano.nome, vencimento: amanha,
        })
      : await criarAssinaturaAsaas({
          apiKey: cred.api_key, sandbox: cred.sandbox,
          customerId: asaasCustomerId, valor: plano.valor,
          ciclo: plano.ciclo, descricao: plano.nome, proximaCobranca: amanha,
        });

    const { data: novaAssinatura, error: errIns } = await supabaseAdmin.from("assinaturas").insert({
      company_id, cliente_id, plano_id,
      asaas_customer_id: asaasCustomerId,
      asaas_subscription_id: ehAvulso ? null : asaasResultado.id,
      asaas_payment_id: ehAvulso ? asaasResultado.id : null,
      status: "pendente", // só vira "ativa" quando o webhook confirmar o pagamento
      valor: plano.valor,
      proxima_cobranca: amanha,
    }).select().single();
    if (errIns) throw errIns;

    return NextResponse.json({ ok: true, assinatura: novaAssinatura });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao criar assinatura" }, { status: 500 });
  }
}
