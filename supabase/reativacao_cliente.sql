-- Cooldown da automação de reativação de cliente inativo (rotina diária).
-- Rode este script no SQL Editor do Supabase.

alter table clientes add column if not exists reativacao_enviada_em timestamptz;
