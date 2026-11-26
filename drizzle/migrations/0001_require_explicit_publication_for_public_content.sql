alter table public.custom_publications add column is_public boolean not null default false;
alter table public.custom_career_moments add column is_public boolean not null default false;
alter table public.interest_publications add column is_public boolean not null default false;
alter table public.scholar_metrics add column is_public boolean not null default false;
alter table public.site_settings add column is_public boolean not null default false;
alter table public.work_videos add column is_public boolean not null default false;

update public.custom_publications set is_public = true;
update public.custom_career_moments set is_public = true;
update public.interest_publications set is_public = true;
update public.scholar_metrics set is_public = true;
update public.site_settings set is_public = true;
update public.work_videos set is_public = true;

drop policy if exists "Publications are public" on public.custom_publications;
create policy "Published publications are public"
on public.custom_publications for select to anon, authenticated
using (is_public);

drop policy if exists "Career photos are public" on public.custom_career_moments;
create policy "Published career photos are public"
on public.custom_career_moments for select to anon, authenticated
using (is_public);

drop policy if exists "Interest picks are public" on public.interest_publications;
create policy "Published interest picks are public"
on public.interest_publications for select to anon, authenticated
using (is_public);

drop policy if exists "Scholar metrics are publicly readable" on public.scholar_metrics;
create policy "Published scholar metrics are public"
on public.scholar_metrics for select to anon, authenticated
using (is_public);

drop policy if exists "Site settings are public" on public.site_settings;
create policy "Published site settings are public"
on public.site_settings for select to anon, authenticated
using (is_public);

drop policy if exists "Work videos are public" on public.work_videos;
create policy "Published work videos are public"
on public.work_videos for select to anon, authenticated
using (is_public);

drop policy if exists "Anyone can read site documents" on storage.objects;
create policy "Owner or published site documents are readable"
on storage.objects for select to anon, authenticated
using (
  bucket_id = 'site-documents'
  and (
    owner_id = (select auth.uid()::text)
    or exists (
      select 1
      from public.site_settings as settings
      cross join lateral jsonb_each_text(
        case when jsonb_typeof(settings.value) = 'object' then settings.value else '{}'::jsonb end
      ) as document(label, storage_path)
      where settings.key = 'document_paths'
        and settings.is_public
        and document.storage_path = storage.objects.name
    )
  )
);

drop policy if exists "Anyone can read work video files" on storage.objects;
create policy "Owner or published work video files are readable"
on storage.objects for select to anon, authenticated
using (
  bucket_id = 'work-videos'
  and (
    owner_id = (select auth.uid()::text)
    or exists (
      select 1
      from public.work_videos as videos
      where videos.storage_path = storage.objects.name
        and videos.is_public
    )
  )
);