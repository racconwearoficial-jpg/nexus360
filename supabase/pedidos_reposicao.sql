-- Pedidos de Reposição — lista de produtos a pedir pro fornecedor, com
-- acompanhamento de status (A pedir / Pedido feito / Recebido).
-- Rode uma vez no SQL Editor do Supabase (já aplicado em produção em
-- 22/09/2026 via supabase db query --linked).

create table if not exists pedidos_reposicao (
  id           uuid primary key default gen_random_uuid(),
  company_id   uuid not null,
  item_id      bigint,        -- referência opcional a itens.id — null se for item avulso/não catalogado
  nome         text not null,
  categoria    text,          -- mesmas categorias de itens.categoria/getCategorias() — não é lista separada
  quantidade   integer not null default 1,
  fornecedor   text,
  observacao   text,
  status       text not null default 'a_pedir', -- a_pedir | pedido | recebido
  created_at   timestamptz not null default now(),
  pedido_em    timestamptz,
  recebido_em  timestamptz
);

alter table pedidos_reposicao enable row level security;

-- Mesmo padrão de isolamento real por empresa já usado em clientes/vendas
-- (não o "using(true)" permissivo antigo — ver rls_isolamento_por_empresa.sql).
drop policy if exists "isola_pedidos_reposicao" on pedidos_reposicao;
create policy "isola_pedidos_reposicao" on pedidos_reposicao
  for all using (company_id = get_my_company_id()) with check (company_id = get_my_company_id());

create index if not exists pedidos_reposicao_company_status_idx
  on pedidos_reposicao (company_id, status);
