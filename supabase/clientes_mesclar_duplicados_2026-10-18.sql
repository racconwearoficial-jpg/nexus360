-- Mescla clientes duplicados (mesmo telefone pelos últimos 8 dígitos) — 18/10/2026.
--
-- Causa: o chatbot do WhatsApp procurava o cliente só por telefone_normalizado, que
-- fica vazio ou diferente em quem foi cadastrado no balcão. Cada vez que um cliente
-- antigo chamava, nascia um cadastro novo com 0 pontos e o nome do perfil do WhatsApp.
--
-- O que este script faz, em uma transação só:
--   1. Em cada grupo de mesmo telefone, MANTÉM o cadastro com mais pontos
--      (empate: mais vendas, depois o mais antigo) e REMOVE os outros.
--   2. Antes de remover, passa para o cadastro mantido tudo que apontava para o
--      removido: vendas, reservas, entregas, lista de espera, pendências,
--      assinaturas, logs de WhatsApp, follow-ups, eventos e indicações.
--   3. Soma no mantido os pontos e o total gasto do removido (nos grupos em que os
--      dois tinham compras, nenhum ponto do cliente se perde) e completa o que
--      faltar (aniversário, CPF, sexo, telefone com DDD). Quem pediu SAIR continua fora.
--   4. Guarda cópia de tudo em tabelas backup_*_20261018 (desfazer:
--      clientes_mesclar_duplicados_ROLLBACK_2026-10-18.sql).
--
-- NÃO mescla (ficam para conferência manual) os grupos que parecem ser pessoas
-- diferentes usando o mesmo número: DDDs diferentes, ou dois ou mais cadastros
-- com compras e primeiros nomes diferentes (ex.: mãe e filho no mesmo celular).
--
-- Rodar inteiro no SQL Editor do Supabase.

begin;

create temp table _base on commit drop as
select
  c.id, c.company_id, coalesce(c.pontos, 0) as pontos, c.created_at,
  regexp_replace(coalesce(c.telefone, ''), '\D', '', 'g') as dig,
  right(regexp_replace(coalesce(c.telefone, ''), '\D', '', 'g'), 8) as chave,
  lower(translate(split_part(trim(coalesce(c.nome, '')), ' ', 1),
    'áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ',
    'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC')) as primeiro_nome,
  (select count(*) from vendas v where v.cliente_id = c.id) as n_vendas
from clientes c
where length(regexp_replace(coalesce(c.telefone, ''), '\D', '', 'g')) >= 8;

alter table _base add column ddd text;
update _base set ddd = case
  when length(dig) >= 12 and dig like '55%' then left(substr(dig, 3), 2)
  when length(dig) in (10, 11) then left(dig, 2)
end;

create temp table _grupos on commit drop as
select company_id, chave,
  count(distinct ddd) > 1
  or (count(*) filter (where n_vendas > 0) >= 2
      and count(distinct primeiro_nome) filter (where n_vendas > 0) > 1) as revisar
from _base
group by company_id, chave
having count(*) > 1;

create temp table _mapa on commit drop as
with r as (
  select b.id, b.company_id, b.chave,
    row_number() over (partition by b.company_id, b.chave
                       order by b.pontos desc, b.n_vendas desc, b.created_at asc, b.id asc) as pos
  from _base b join _grupos g using (company_id, chave)
  where not g.revisar
)
select r.id as removido_id, m.id as mantido_id
from r join r m on m.company_id = r.company_id and m.chave = r.chave and m.pos = 1
where r.pos > 1;

-- Backups
create table backup_clientes_removidos_20261018 as
  select c.*, m.mantido_id from clientes c join _mapa m on m.removido_id = c.id;
create table backup_clientes_mantidos_20261018 as
  select * from clientes where id in (select mantido_id from _mapa);
create table backup_mesclagem_refs_20261018 (tabela text, coluna text, linha_id text, cliente_id_original bigint);

insert into backup_mesclagem_refs_20261018
  select 'vendas', 'cliente_id', id::text, cliente_id from vendas where cliente_id in (select removido_id from _mapa)
  union all select 'reservas', 'client_id', id::text, client_id from reservas where client_id in (select removido_id from _mapa)
  union all select 'entregas', 'cliente_id', id::text, cliente_id from entregas where cliente_id in (select removido_id from _mapa)
  union all select 'lista_espera', 'client_id', id::text, client_id from lista_espera where client_id in (select removido_id from _mapa)
  union all select 'pendencias', 'cliente_id', id::text, cliente_id from pendencias where cliente_id in (select removido_id from _mapa)
  union all select 'assinaturas', 'cliente_id', id::text, cliente_id from assinaturas where cliente_id in (select removido_id from _mapa)
  union all select 'automacoes_whatsapp_log', 'cliente_id', id::text, cliente_id from automacoes_whatsapp_log where cliente_id in (select removido_id from _mapa)
  union all select 'employee_followups', 'cliente_id', id::text, cliente_id from employee_followups where cliente_id in (select removido_id from _mapa)
  union all select 'eventos', 'cliente_id', id::text, cliente_id from eventos where cliente_id in (select removido_id from _mapa)
  union all select 'indicacoes', 'quem_id', id::text, quem_id from indicacoes where quem_id in (select removido_id from _mapa)
  union all select 'indicacoes', 'amigo_id', id::text, amigo_id from indicacoes where amigo_id in (select removido_id from _mapa);

-- Passa as referências para o cadastro mantido
update vendas t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update reservas t set client_id = m.mantido_id from _mapa m where t.client_id = m.removido_id;
update entregas t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update lista_espera t set client_id = m.mantido_id from _mapa m where t.client_id = m.removido_id;
update pendencias t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update assinaturas t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update automacoes_whatsapp_log t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update employee_followups t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update eventos t set cliente_id = m.mantido_id from _mapa m where t.cliente_id = m.removido_id;
update indicacoes t set quem_id = m.mantido_id from _mapa m where t.quem_id = m.removido_id;
update indicacoes t set amigo_id = m.mantido_id from _mapa m where t.amigo_id = m.removido_id;

-- O que os removidos tinham, somado por cadastro mantido
create temp table _soma on commit drop as
select m.mantido_id,
  sum(coalesce(c.pontos, 0)) as pontos,
  sum(coalesce(c.total_gasto, 0)) as total_gasto,
  max(c.ultima_compra) as ultima_compra,
  max(c.aniversario) as aniversario,
  max(c.cpf) as cpf,
  max(c.sexo) as sexo,
  max(c.fidelidade_status) as fidelidade_status,
  max(c.reativacao_enviada_em) as reativacao_enviada_em,
  bool_or(coalesce(c.optout_marketing, false)) as optout,
  max(c.optout_em) as optout_em,
  (array_agg(c.telefone order by length(regexp_replace(coalesce(c.telefone, ''), '\D', '', 'g')) desc))[1] as melhor_tel,
  max(c.telefone_normalizado) as normalizado
from _mapa m join clientes c on c.id = m.removido_id
group by m.mantido_id;

delete from clientes where id in (select removido_id from _mapa);

update clientes k set
  pontos = coalesce(k.pontos, 0) + s.pontos,
  total_gasto = coalesce(k.total_gasto, 0) + s.total_gasto,
  ultima_compra = greatest(k.ultima_compra, s.ultima_compra),
  aniversario = coalesce(k.aniversario, s.aniversario),
  cpf = coalesce(nullif(k.cpf, ''), s.cpf),
  sexo = coalesce(k.sexo, s.sexo),
  fidelidade_status = coalesce(k.fidelidade_status, s.fidelidade_status),
  reativacao_enviada_em = greatest(k.reativacao_enviada_em, s.reativacao_enviada_em),
  optout_marketing = coalesce(k.optout_marketing, false) or s.optout,
  optout_em = case when coalesce(k.optout_marketing, false) then k.optout_em
                   when s.optout then s.optout_em else k.optout_em end,
  telefone = case when length(regexp_replace(coalesce(k.telefone, ''), '\D', '', 'g')) < 10
                   and length(regexp_replace(coalesce(s.melhor_tel, ''), '\D', '', 'g')) >= 10
                  then s.melhor_tel else k.telefone end,
  telefone_normalizado = coalesce(k.telefone_normalizado, s.normalizado)
from _soma s
where k.id = s.mantido_id;

-- Resumo (confira antes do commit aparecer na tela)
select
  (select count(*) from _mapa) as cadastros_removidos,
  (select count(distinct mantido_id) from _mapa) as clientes_mesclados,
  (select count(*) from _grupos where revisar) as grupos_para_conferir_manual,
  (select count(*) from backup_mesclagem_refs_20261018) as referencias_transferidas,
  (select count(*) from clientes) as clientes_agora;

commit;
