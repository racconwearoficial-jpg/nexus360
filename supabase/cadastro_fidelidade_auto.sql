-- Separa "chatbot completo responde perguntas" (atendimento_auto) de
-- "só cadastra cliente novo e convida pra fidelidade" (cadastro_fidelidade_auto)
-- — antes era uma coisa só, dava pra ligar/desligar junto. Rode este script
-- no SQL Editor do Supabase.

alter table integracoes_zapi add column if not exists cadastro_fidelidade_auto boolean not null default false;
