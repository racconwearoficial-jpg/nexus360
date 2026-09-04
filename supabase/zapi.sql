-- Integração Z-API (WhatsApp) — rode este script no SQL Editor do Supabase.

create table if not exists integracoes_zapi (
  company_id    uuid primary key,
  instance_id   text not null,
  token         text not null,
  client_token  text,
  connected_at  timestamptz not null default now()
);

alter table integracoes_zapi enable row level security;

-- Sem policy de leitura/escrita pro anon — credenciais Z-API só passam pelo
-- backend (service role), igual Bling e Asaas. O navegador nunca lê essa
-- tabela direto, só consulta o status via /api/integracoes/zapi/status.
