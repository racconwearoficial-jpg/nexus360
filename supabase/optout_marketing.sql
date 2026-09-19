-- Opt-out de mensagens promocionais (pedido "SAIR" por WhatsApp).
-- Aditivo e seguro: só cria duas colunas com valor padrao; nenhuma linha existente muda
-- (todos continuam recebendo ate pedirem para sair). O codigo se ativa sozinho quando a
-- coluna existe: antes dela, a rotina nao coloca o rodape "responda SAIR" nas mensagens
-- (para nao prometer algo que o sistema ainda nao cumpre).
--
-- Rodar no SQL Editor do Supabase. Reversao:
--   alter table public.clientes drop column if exists optout_marketing;
--   alter table public.clientes drop column if exists optout_em;

alter table public.clientes add column if not exists optout_marketing boolean not null default false;
alter table public.clientes add column if not exists optout_em timestamptz;
