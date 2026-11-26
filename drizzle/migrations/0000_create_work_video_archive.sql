create table public.work_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  storage_path text not null unique,
  mime_type text not null default 'video/mp4',
  created_at timestamptz not null default now(),
  constraint work_videos_title_not_blank check (length(btrim(title)) > 0)
);

grant select on public.work_videos to anon, authenticated;
grant insert, update, delete on public.work_videos to authenticated;
grant all on public.work_videos to service_role;

alter table public.work_videos enable row level security;

create policy "Work videos are public"
on public.work_videos for select to anon, authenticated
using (true);

create policy "Owner manages work videos"
on public.work_videos for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can read work video files"
on storage.objects for select to anon, authenticated
using (bucket_id = 'work-videos');

create policy "Owner uploads work video files"
on storage.objects for insert to authenticated
with check (bucket_id = 'work-videos' and public.has_role(auth.uid(), 'admin'));

create policy "Owner updates work video files"
on storage.objects for update to authenticated
using (bucket_id = 'work-videos' and public.has_role(auth.uid(), 'admin'))
with check (bucket_id = 'work-videos' and public.has_role(auth.uid(), 'admin'));

create policy "Owner deletes work video files"
on storage.objects for delete to authenticated
using (bucket_id = 'work-videos' and public.has_role(auth.uid(), 'admin'));