-- Registro de cada troca de pontos (19/10/2026).
-- Antes, o resgate só diminuía clientes.pontos e não ficava nenhum histórico
-- (ex.: resgate da cliente Wagna, 100 pontos = R$ 5, sem registro).
-- Usado por: tela de Fidelidade (lista "Resgates recentes") e rotina-diaria.js
-- (lembrete de marco volta a valer depois de um resgate).
-- Rodar inteiro no SQL Editor do Supabase. Pode rodar mais de uma vez.

create table if not exists public.fidelidade_resgates (
  id            bigserial primary key,
  company_id    uuid not null,
  cliente_id    bigint not null,
  cliente_nome  text,
  pontos        integer not null,
  beneficio     text,
  valor         numeric,
  saldo_depois  integer,
  modo          text,          -- 'admin' ou 'funcionario' (de onde o resgate foi feito)
  created_at    timestamptz not null default now()
);

create index if not exists fidelidade_resgates_empresa_cliente
  on public.fidelidade_resgates (company_id, cliente_id, created_at desc);

-- Mesmo isolamento por empresa das outras tabelas (company_id = get_my_company_id()).
alter table public.fidelidade_resgates enable row level security;
drop policy if exists "isola_fidelidade_resgates" on public.fidelidade_resgates;
create policy "isola_fidelidade_resgates" on public.fidelidade_resgates
  for all using (company_id = get_my_company_id()) with check (company_id = get_my_company_id());

-- Desfazer: drop table public.fidelidade_resgates;
