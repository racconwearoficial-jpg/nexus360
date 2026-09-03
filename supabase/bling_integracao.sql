-- Integração Bling — rode este script uma vez no SQL Editor do Supabase.
-- Guarda o token OAuth do Bling por empresa. Nenhuma policy de leitura/escrita
-- é criada de propósito: só a API do Nexus360 (com a service role key) acessa
-- esta tabela, o navegador do empresário nunca fala com ela diretamente.

create table if not exists integracoes_bling (
  id             uuid primary key default gen_random_uuid(),
  company_id     uuid not null unique,
  access_token   text not null,
  refresh_token  text not null,
  expires_at     timestamptz not null,
  connected_at   timestamptz not null default now(),
  last_sync_at   timestamptz,
  last_sync_erro text
);

alter table integracoes_bling enable row level security;
-- Sem policies = ninguém acessa via anon key. Só a service role (backend) passa por cima do RLS.
