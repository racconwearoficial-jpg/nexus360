-- Integração Asaas (por empresa) — rode este script no SQL Editor do Supabase.
-- Guarda a chave de API da PRÓPRIA conta Asaas de cada empresa cliente. O
-- dinheiro do cliente final cai direto na conta bancária dela — o Nexus360
-- nunca fica no meio do fluxo de pagamento.

create table if not exists integracoes_asaas (
  id             uuid primary key default gen_random_uuid(),
  company_id     uuid not null unique,
  api_key        text not null,
  sandbox        boolean not null default false,
  webhook_token  text,
  connected_at   timestamptz not null default now()
);

alter table integracoes_asaas enable row level security;
-- Sem policies = ninguém acessa via anon key. Só a service role (backend) acessa.
