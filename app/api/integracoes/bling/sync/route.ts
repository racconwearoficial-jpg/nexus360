import { NextRequest, NextResponse } from "next/server";
import { getValidAccessToken, BLING_API_BASE } from "@/lib/bling";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// ATENÇÃO: o mapeamento de campos abaixo (contatos e pedidos de venda) segue
// a documentação pública da API v3 do Bling de memória — não foi testado
// contra uma conta real (não temos credenciais). Antes de usar em produção,
// rode uma sincronização com uma empresa de teste e confira no console/log
// se os campos batem; ajuste extrairContato/extrairVenda se a Bling
// devolver nomes diferentes.

async function blingFetch(path: string, token: string) {
  const r = await fetch(`${BLING_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!r.ok) throw new Error(`Bling respondeu ${r.status} em ${path}`);
  const json = await r.json();
  return json.data || json;
}

function extrairContato(c: any) {
  return {
    nome: c.nome,
    telefone: c.telefone || c.celular || null,
    cpf: c.numeroDocumento || c.cpf || null,
  };
}

function extrairVenda(v: any) {
  return {
    contatoId: v.contato?.id ?? v.contatoId,
    contatoNome: v.contato?.nome ?? null,
    valor: Number(v.total ?? v.totalVenda ?? 0),
    data: (v.data || v.dataVenda || "").slice(0, 10),
  };
}

export async function POST(req: NextRequest) {
  const { company_id } = await req.json();
  if (!company_id) {
    return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });
  }

  try {
    const token = await getValidAccessToken(company_id);

    // 1) Puxa contatos (clientes) — primeira página, 100 registros.
    // Pra base grande, isso precisa de paginação (parâmetro `pagina`).
    const contatosRaw = await blingFetch("/contatos?pagina=1&limite=100", token);
    const contatos = (Array.isArray(contatosRaw) ? contatosRaw : []).map(extrairContato);

    // 2) Puxa vendas recentes (últimos 30 dias, pra não reimportar histórico inteiro sem controle).
    const desde = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const vendasRaw = await blingFetch(`/pedidos/vendas?dataInicial=${desde}&pagina=1&limite=100`, token);
    const vendas = (Array.isArray(vendasRaw) ? vendasRaw : []).map(extrairVenda);

    let criados = 0, atualizados = 0, vendasRegistradas = 0;

    for (const v of vendas) {
      const contatoInfo = contatos.find((c: any, idx: number) => (contatosRaw[idx]?.id === v.contatoId));
      if (!contatoInfo || (!contatoInfo.cpf && !contatoInfo.telefone)) continue;

      let cliente: any = null;
      if (contatoInfo.cpf) {
        const { data } = await supabaseAdmin.from("clientes").select("*")
          .eq("company_id", company_id).eq("cpf", contatoInfo.cpf).single();
        cliente = data;
      }
      if (!cliente && contatoInfo.telefone) {
        const { data } = await supabaseAdmin.from("clientes").select("*")
          .eq("company_id", company_id).eq("telefone", contatoInfo.telefone).single();
        cliente = data;
      }

      const novoGasto = Number(cliente?.total_gasto || 0) + v.valor;
      let status = "ativo";
      if (novoGasto >= 300) status = "vip";

      if (cliente) {
        await supabaseAdmin.from("clientes").update({
          total_gasto: novoGasto,
          ultima_compra: v.data,
          status,
        }).eq("id", cliente.id);
        await supabaseAdmin.from("vendas").insert({
          company_id, cliente_id: cliente.id, cliente_nome: cliente.nome,
          valor: v.valor, data: v.data, itens: "Importado do Bling",
        });
        atualizados++;
      } else {
        const { data: novo } = await supabaseAdmin.from("clientes").insert({
          company_id, nome: contatoInfo.nome, telefone: contatoInfo.telefone,
          cpf: contatoInfo.cpf, total_gasto: v.valor, ultima_compra: v.data, status,
        }).select().single();
        if (novo) {
          await supabaseAdmin.from("vendas").insert({
            company_id, cliente_id: novo.id, cliente_nome: novo.nome,
            valor: v.valor, data: v.data, itens: "Importado do Bling",
          });
          criados++;
        }
      }
      vendasRegistradas++;
    }

    await supabaseAdmin.from("integracoes_bling").update({
      last_sync_at: new Date().toISOString(),
      last_sync_erro: null,
    }).eq("company_id", company_id);

    return NextResponse.json({ ok: true, criados, atualizados, vendasRegistradas });
  } catch (e: any) {
    await supabaseAdmin.from("integracoes_bling").update({
      last_sync_erro: e.message || "erro desconhecido",
    }).eq("company_id", company_id);
    return NextResponse.json({ error: e.message || "Falha ao sincronizar com o Bling" }, { status: 500 });
  }
}
