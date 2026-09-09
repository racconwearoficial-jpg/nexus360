-- Convite de fidelidade preso pra sempre em "convidado" -- achado em produção
-- 09/09/2026: 23 clientes convidados sem completar nem recusar, um deles há
-- 111 dias. Enquanto nesse estado, TODA mensagem futura da pessoa (mesmo sem
-- relação com fidelidade) é interpretada pela IA como resposta ao convite,
-- podendo mandar mensagem sem contexto (confirmado: "Joaquim Neto" mandou só
-- "Indo" e recebeu pedido de nome/data de nascimento). Registra quando o
-- convite foi mandado pra poder expirar depois de alguns dias sem resposta.
alter table clientes add column if not exists fidelidade_convite_em timestamptz;

-- Backfill: quem já está preso em "convidado" sem essa data marca como
-- expirado imediatamente (30 dias atrás), já que todos estão esperando
-- resposta há bem mais tempo que o prazo novo (4 dias) -- desbloqueia os 23
-- de uma vez assim que o código novo for publicado.
update clientes
set fidelidade_convite_em = now() - interval '30 days'
where fidelidade_status = 'convidado' and fidelidade_convite_em is null;
