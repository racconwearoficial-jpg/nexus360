-- Integração Z-API (WhatsApp) — rode este script no SQL Editor do Supabase.

create table if not exists integracoes_zapi (
  company_id       uuid primary key,
  instance_id      text not null unique,
  token            text not null,
  client_token     text,
  atendimento_auto boolean not null default false,
  connected_at     timestamptz not null default now()
);

-- Se você já rodou uma versão anterior deste script (sem atendimento_auto):
-- alter table integracoes_zapi add column if not exists atendimento_auto boolean not null default false;
-- alter table integracoes_zapi add constraint integracoes_zapi_instance_id_key unique (instance_id);

alter table integracoes_zapi enable row level security;

-- Sem policy de leitura/escrita pro anon — credenciais Z-API só passam pelo
-- backend (service role), igual Bling e Asaas. O navegador nunca lê essa
-- tabela direto, só consulta/altera via /api/integracoes/zapi/*.
-- instance_id é UNIQUE porque o webhook (mensagem recebida) usa ele pra
-- descobrir de qual empresa é a mensagem, sem precisar de company_id no payload.
