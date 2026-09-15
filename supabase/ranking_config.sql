-- O ciclo do ranking mensal (duração) e as descrições dos prêmios só estavam
-- sendo salvos no localStorage do navegador — por isso sumiam depois de um
-- tempo (troca de dispositivo, cache limpo, outro funcionário no sistema).
-- Este script cria as colunas no Supabase para o sistema sincronizar essas
-- configurações entre dispositivos, igual já acontece com fidelidade_config.
--
-- ranking_inicio_ts e ranking_encerrado_em já eram usadas pelo código, mas o
-- comentário no código sinalizava que talvez não existissem como coluna —
-- se não existirem, TODO o botão "Salvar configurações" (nome do negócio,
-- WhatsApp, expiração de pontos, etc.) falha silenciosamente ou com erro,
-- porque tudo vai numa única chamada. Rode este script no SQL Editor do
-- Supabase para eliminar essa causa.

alter table configuracoes add column if not exists ranking_config text;
alter table configuracoes add column if not exists ranking_inicio_ts bigint;
alter table configuracoes add column if not exists ranking_encerrado_em timestamptz;
