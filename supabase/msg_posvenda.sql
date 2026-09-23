-- Mensagem pós-venda editável em Configurações (botão WA na tela de Vendas).
-- Rode este script uma vez no SQL Editor do Supabase (já aplicado em produção
-- em 22/09/2026 via supabase db query --linked).

alter table public.configuracoes add column if not exists msg_posvenda text;
