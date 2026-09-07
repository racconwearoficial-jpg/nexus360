-- Campanha com imagem, período e envio automático (sem clicar em "Enviar"
-- pra cada cliente) — usado pela rotina diária (auto_envio) e pelo chatbot
-- pra responder sobre a "promoção atual". Rode este script no SQL Editor
-- do Supabase.

alter table campanhas add column if not exists imagem_url text;
alter table campanhas add column if not exists periodo_inicio date;
alter table campanhas add column if not exists periodo_fim date;
alter table campanhas add column if not exists auto_envio boolean not null default false;
