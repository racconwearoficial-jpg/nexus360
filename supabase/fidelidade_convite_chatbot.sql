-- Convite automático ao programa de fidelidade pelo chatbot do WhatsApp (Z-API).
-- Rode este script no SQL Editor do Supabase.

alter table clientes add column if not exists fidelidade_status text;

-- Valores possíveis (controlados pelo webhook, não é enum forçado no banco
-- pra não travar deploy se um valor novo for adicionado depois):
-- null         -> nunca foi convidado ainda
-- 'convidado'  -> já foi convidado, aguardando resposta (aceitar/recusar/dados)
-- 'completo'   -> aceitou e já mandou nome completo + data de nascimento
-- 'recusado'   -> disse que não quer participar, não convidar de novo
