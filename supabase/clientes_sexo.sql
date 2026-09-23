-- Campo de sexo do cliente (F/M/null), usado pra segmentar campanhas de
-- WhatsApp por público. Rode uma vez no SQL Editor do Supabase (já aplicado
-- em produção em 23/09/2026 via supabase db query --linked, incluindo o
-- preenchimento inicial por inferência de nome pra Drogaria 208 Sul e
-- Drogaria Popular).

alter table public.clientes add column if not exists sexo text;
