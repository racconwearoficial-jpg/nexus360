-- Campos novos pro chatbot (Configurações → Informações para o Chatbot) —
-- rode este script no SQL Editor do Supabase.

alter table configuracoes add column if not exists chatbot_horario text;
alter table configuracoes add column if not exists chatbot_endereco text;
alter table configuracoes add column if not exists chatbot_pagamento text;
alter table configuracoes add column if not exists chatbot_faq text; -- JSON: [{"pergunta":"...","resposta":"..."}]
