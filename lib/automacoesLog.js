import { supabaseAdmin } from "./supabaseAdmin";

// Dedupe compartilhado por todas as automações de WhatsApp (reservas,
// entregas, indicações, estoque, recompra, fiado, reativação, aniversário).
// Cada automação confere jaEnviado(...) antes de mandar e chama
// registrarEnvio(...) depois — evita duplicar aviso se o webhook do
// Supabase disparar mais de uma vez, ou reenviar todo dia sem necessidade.

export async function jaEnviado({ companyId, clienteId, tipo, referenciaId, desde }) {
  let query = supabaseAdmin
    .from("automacoes_whatsapp_log")
    .select("id")
    .eq("company_id", companyId)
    .eq("tipo", tipo)
    .limit(1);

  query = clienteId == null ? query.is("cliente_id", null) : query.eq("cliente_id", clienteId);
  query = referenciaId == null ? query.is("referencia_id", null) : query.eq("referencia_id", String(referenciaId));
  if (desde) query = query.gte("enviado_em", desde);

  const { data } = await query;
  return Boolean(data && data.length);
}

export async function registrarEnvio({ companyId, clienteId, tipo, referenciaId }) {
  await supabaseAdmin.from("automacoes_whatsapp_log").insert({
    company_id: companyId,
    cliente_id: clienteId ?? null,
    tipo,
    referencia_id: referenciaId != null ? String(referenciaId) : null,
  });
}
