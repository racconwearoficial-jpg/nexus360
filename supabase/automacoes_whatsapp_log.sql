-- Log de deduplicação das automações de WhatsApp (reservas, entregas,
-- indicações, estoque, recompra, fiado, reativação, aniversário).
-- Rode este script no SQL Editor do Supabase.

create table if not exists automacoes_whatsapp_log (
  id            bigint generated always as identity primary key,
  company_id    uuid not null,
  cliente_id    bigint,
  tipo          text not null,
  referencia_id text,
  enviado_em    timestamptz not null default now()
);

create index if not exists automacoes_whatsapp_log_lookup
  on automacoes_whatsapp_log (company_id, tipo, cliente_id, referencia_id);

alter table automacoes_whatsapp_log enable row level security;

-- Sem policy de leitura/escrita pro anon — só o backend (service role)
-- grava e lê essa tabela, igual integracoes_zapi.
