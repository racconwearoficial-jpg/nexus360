import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCredenciaisAsaas, criarLinkPagamentoAsaas } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// Checkout público da página de vendas (nexus360.app.br) — usa a PRÓPRIA
// conta Asaas da agência (conectada em Integrações dentro do sistema, sob
// a company_id definida em NEXUS360_AGENCY_COMPANY_ID), não a de um cliente.
//
// Preço e nome vêm SEMPRE do mapa abaixo, nunca do que o navegador manda —
// evita alguém forjar um valor menor na requisição.
const PACOTES: Record<string, { nome: string; valor: number; recorrente: boolean }> = {
  recomeco:    { nome: "Nexus 360 — Recomeço",    valor: 150, recorrente: false },
  presenca:    { nome: "Nexus 360 — Presença",    valor: 297, recorrente: false },
  crescimento: { nome: "Nexus 360 — Crescimento", valor: 597, recorrente: true },
  aceleracao:  { nome: "Nexus 360 — Aceleração",  valor: 997, recorrente: true },
};

const AGENCY_COMPANY_ID = process.env.NEXUS360_AGENCY_COMPANY_ID;

export async function POST(req: NextRequest) {
  const { pacote } = await req.json().catch(() => ({}));
  const cfg = pacote && PACOTES[pacote];
  if (!cfg) return NextResponse.json({ error: "Pacote inválido" }, { status: 400 });
  if (!AGENCY_COMPANY_ID) return NextResponse.json({ error: "Checkout ainda não configurado (falta NEXUS360_AGENCY_COMPANY_ID)" }, { status: 500 });

  try {
    // Reaproveita o link já criado pra esse pacote, se o preço não mudou.
    const { data: cache } = await supabaseAdmin
      .from("checkout_links").select("*").eq("pacote", pacote).single();
    if (cache && Number(cache.valor) === cfg.valor) {
      return NextResponse.json({ ok: true, url: cache.url });
    }

    const cred = await getCredenciaisAsaas(AGENCY_COMPANY_ID);
    const link = await criarLinkPagamentoAsaas({
      apiKey: cred.api_key, sandbox: cred.sandbox,
      nome: cfg.nome, valor: cfg.valor, recorrente: cfg.recorrente, cicloAsaas: "MONTHLY",
    });

    await supabaseAdmin.from("checkout_links").upsert({
      pacote, valor: cfg.valor, url: link.url, asaas_link_id: link.id,
    }, { onConflict: "pacote" });

    return NextResponse.json({ ok: true, url: link.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao gerar checkout" }, { status: 500 });
  }
}
