-- Bucket de Storage pra imagem das campanhas (upload direto pelo sistema,
-- em vez de colar link). Bucket público porque o Z-API precisa buscar a
-- imagem por URL pra mandar no WhatsApp. Rode este script no SQL Editor
-- do Supabase.
--
-- "to public" (em vez de "to anon") porque a policy tem que valer pro
-- request feito pelo sistema com a anon key igual do resto do app —
-- "to anon" bateu em row-level security na prática numa conta real
-- (07/09/2026), possivelmente porque o insert do bucket e a criação da
-- policy rodaram na mesma transação e algo no meio reverteu tudo.

insert into storage.buckets (id, name, public)
values ('campanhas-midia', 'campanhas-midia', true)
on conflict (id) do update set public = true;

drop policy if exists "campanhas-midia: upload publico" on storage.objects;
create policy "campanhas-midia: upload publico" on storage.objects
  for insert to public
  with check (bucket_id = 'campanhas-midia');

drop policy if exists "campanhas-midia: leitura publica" on storage.objects;
create policy "campanhas-midia: leitura publica" on storage.objects
  for select to public
  using (bucket_id = 'campanhas-midia');
