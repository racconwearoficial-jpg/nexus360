-- Desfaz clientes_mesclar_duplicados_2026-10-18.sql usando os backups que ele criou.
-- Rodar inteiro no SQL Editor do Supabase. Só funciona enquanto as tabelas
-- backup_*_20261018 existirem.

begin;

-- 1. Volta os cadastros mantidos ao estado de antes (pontos, telefone etc.)
update clientes k set
  pontos = b.pontos, total_gasto = b.total_gasto, ultima_compra = b.ultima_compra,
  aniversario = b.aniversario, cpf = b.cpf, sexo = b.sexo, fidelidade_status = b.fidelidade_status,
  reativacao_enviada_em = b.reativacao_enviada_em, optout_marketing = b.optout_marketing,
  optout_em = b.optout_em, telefone = b.telefone, telefone_normalizado = b.telefone_normalizado
from backup_clientes_mantidos_20261018 b
where k.id = b.id;

-- 2. Recria os cadastros removidos com o mesmo id
insert into clientes (id, nome, telefone, aniversario, status, total_gasto, pontos, ultima_compra,
  created_at, company_id, cpf, fidelidade_status, reativacao_enviada_em, telefone_normalizado,
  fidelidade_convite_em, optout_marketing, optout_em, sexo)
select id, nome, telefone, aniversario, status, total_gasto, pontos, ultima_compra,
  created_at, company_id, cpf, fidelidade_status, reativacao_enviada_em, telefone_normalizado,
  fidelidade_convite_em, optout_marketing, optout_em, sexo
from backup_clientes_removidos_20261018;

-- 3. Devolve cada venda/reserva/etc. ao cadastro original
update vendas t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'vendas' and t.id::text = r.linha_id;
update reservas t set client_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'reservas' and t.id::text = r.linha_id;
update entregas t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'entregas' and t.id::text = r.linha_id;
update lista_espera t set client_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'lista_espera' and t.id::text = r.linha_id;
update pendencias t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'pendencias' and t.id::text = r.linha_id;
update assinaturas t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'assinaturas' and t.id::text = r.linha_id;
update automacoes_whatsapp_log t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'automacoes_whatsapp_log' and t.id::text = r.linha_id;
update employee_followups t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'employee_followups' and t.id::text = r.linha_id;
update eventos t set cliente_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'eventos' and t.id::text = r.linha_id;
update indicacoes t set quem_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'indicacoes' and r.coluna = 'quem_id' and t.id::text = r.linha_id;
update indicacoes t set amigo_id = r.cliente_id_original from backup_mesclagem_refs_20261018 r where r.tabela = 'indicacoes' and r.coluna = 'amigo_id' and t.id::text = r.linha_id;

commit;
