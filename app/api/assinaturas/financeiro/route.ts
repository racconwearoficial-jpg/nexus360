import { NextRequest, NextResponse } from "next/server";
import { getCredenciaisAsaas, consultarSaldo, consultarExtrato } from "@/lib/asaas";

export const dynamic = "force-dynamic";

// GET /api/assinaturas/financeiro?company_id=...&tipo=saldo|extrato
export async function GET(req: NextRequest) {
  const companyId = req.nextUrl.searchParams.get("company_id");
  const tipo = req.nextUrl.searchParams.get("tipo") || "saldo";
  if (!companyId) return NextResponse.json({ error: "company_id é obrigatório" }, { status: 400 });

  try {
    const cred = await getCredenciaisAsaas(companyId);
    if (tipo === "extrato") {
      const extrato = await consultarExtrato({ apiKey: cred.api_key, sandbox: cred.sandbox });
      return NextResponse.json({ ok: true, movimentacoes: extrato.data || [] }, { headers: { "Cache-Control": "no-store" } });
    }
    const saldo = await consultarSaldo({ apiKey: cred.api_key, sandbox: cred.sandbox });
    return NextResponse.json({ ok: true, saldo: saldo.balance ?? saldo.totalBalance ?? null, bruto: saldo }, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Falha ao consultar financeiro" }, { status: 500 });
  }
}
