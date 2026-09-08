-- Guarda quantos pontos aquela venda especificamente rendeu pro cliente,
-- pra mensagem de WhatsApp pós-venda poder mostrar "você ganhou X pontos
-- com essa compra" em vez de só o total acumulado. Rode este script no
-- SQL Editor do Supabase.
--
-- Vendas registradas antes desse script ficam com pontos = null — a
-- mensagem simplesmente não mostra a frase de pontos ganhos pra elas.

alter table vendas add column if not exists pontos integer;
