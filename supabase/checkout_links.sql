-- Cache dos Links de Pagamento do Asaas usados no checkout público da
-- página de vendas (app/page.tsx) — rode este script no SQL Editor do Supabase.
--
-- Um link por pacote, reaproveitado entre visitantes (não cria um link novo
-- no Asaas a cada clique). Se o preço do pacote mudar no código, a rota
-- detecta a diferença e gera um link novo automaticamente.

create table if not exists checkout_links (
  pacote        text primary key, -- 'recomeco' | 'presenca' | 'crescimento' | 'aceleracao'
  valor         numeric(10,2) not null, -- valor usado ao gerar o link (pra detectar mudança de preço)
  url           text not null,
  asaas_link_id text,
  created_at    timestamptz not null default now()
);

alter table checkout_links enable row level security;
-- Sem policy pro anon — só o backend (service role) lê/escreve, o navegador
-- só recebe a URL final através da rota /api/checkout/criar.
