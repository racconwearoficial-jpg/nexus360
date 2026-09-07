-- Bucket de Storage pra imagem das campanhas (upload direto pelo sistema,
-- em vez de colar link). Bucket público porque o Z-API precisa buscar a
-- imagem por URL pra mandar no WhatsApp. Rode este script no SQL Editor
-- do Supabase.

insert into storage.buckets (id, name, public)
values ('campanhas-midia', 'campanhas-midia', true)
on conflict (id) do nothing;

drop policy if exists "campanhas-midia: upload publico" on storage.objects;
create policy "campanhas-midia: upload publico" on storage.objects
  for insert to anon
  with check (bucket_id = 'campanhas-midia');

drop policy if exists "campanhas-midia: leitura publica" on storage.objects;
create policy "campanhas-midia: leitura publica" on storage.objects
  for select to anon
  using (bucket_id = 'campanhas-midia');
