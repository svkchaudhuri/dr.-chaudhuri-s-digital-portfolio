create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Site settings are public" on public.site_settings for select to anon, authenticated using (true);
create policy "Owner manages site settings" on public.site_settings for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can read site documents" on storage.objects for select to anon, authenticated using (bucket_id = 'site-documents');
create policy "Owner uploads site documents" on storage.objects for insert to authenticated with check (bucket_id = 'site-documents' and public.has_role(auth.uid(), 'admin'));
create policy "Owner updates site documents" on storage.objects for update to authenticated using (bucket_id = 'site-documents' and public.has_role(auth.uid(), 'admin'));
create policy "Owner deletes site documents" on storage.objects for delete to authenticated using (bucket_id = 'site-documents' and public.has_role(auth.uid(), 'admin'));