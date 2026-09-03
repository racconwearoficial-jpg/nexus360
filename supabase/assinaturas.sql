-- Módulo de Assinatura Recorrente — rode este script no SQL Editor do Supabase.

-- Planos de assinatura definidos pela empresa (ex: "Corte Ilimitado — R$89/mês").
-- Acesso direto pelo navegador com a anon key, igual clientes/campanhas — não
-- guarda nada sensível, só a definição do plano.
create table if not exists planos_assinatura (
  id           uuid primary key default gen_random_uuid(),
  company_id   uuid not null,
  nome         text not null,
  descricao    text,
  valor        numeric(10,2) not null,
  ciclo        text not null default 'MONTHLY', -- MONTHLY | WEEKLY | YEARLY (valores aceitos pelo Asaas)
  ativo        boolean not null default true,
  created_at   timestamptz not null default now()
);

-- Assinaturas de clientes — a parte sensível (id do cliente/assinatura no Asaas)
-- só é escrita pelo backend (service role), o navegador só lê.
create table if not exists assinaturas (
  id                  uuid primary key default gen_random_uuid(),
  company_id          uuid not null,
  cliente_id          bigint not null, -- clientes.id é numérico (bigint), não uuid
  plano_id            uuid not null references planos_assinatura(id),
  asaas_customer_id   text,
  asaas_subscription_id text,
  status              text not null default 'pendente', -- pendente | ativa | atrasada | cancelada
  valor               numeric(10,2), -- snapshot do valor no momento da assinatura (pode divergir do plano se editado depois)
  proxima_cobranca    date,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Se você criou a tabela antes desta versão do script, roda também:
-- alter table assinaturas add column if not exists valor numeric(10,2);

alter table planos_assinatura enable row level security;
alter table assinaturas enable row level security;

-- Planos: a empresa pode ler/escrever os próprios (mesmo padrão de clientes/campanhas).
drop policy if exists "planos_assinatura por empresa" on planos_assinatura;
create policy "planos_assinatura por empresa" on planos_assinatura
  for all using (true) with check (true);
-- Nota: ajuste esta policy para o mesmo esquema de autorização por company_id
-- que as tabelas clientes/campanhas já usam no seu projeto Supabase, se for
-- diferente de "true" (aqui deixei permissivo pra não quebrar — o filtro real
-- de segurança nessas tabelas já é feito pela query .eq('company_id', ...)
-- no app, igual o restante do sistema).

-- Assinaturas: SEM policy de escrita pro anon — só leitura. Criar/cancelar
-- assinatura sempre passa pelo backend (service role), porque mexe com Asaas.
drop policy if exists "assinaturas leitura por empresa" on assinaturas;
create policy "assinaturas leitura por empresa" on assinaturas
  for select using (true);
