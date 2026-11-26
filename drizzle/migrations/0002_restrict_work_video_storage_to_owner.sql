drop policy if exists "Owner or published work video files are readable" on storage.objects;

create policy "Owners read their work video files"
on storage.objects for select to authenticated
using (
  bucket_id = 'work-videos'
  and owner_id = (select auth.uid()::text)
);