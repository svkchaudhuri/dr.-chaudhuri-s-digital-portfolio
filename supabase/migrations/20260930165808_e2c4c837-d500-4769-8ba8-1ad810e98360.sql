create table public.custom_career_moments (
  id text primary key,
  title text not null,
  tag text not null default '',
  src text not null,
  created_at timestamptz not null default now()
);
grant select on public.custom_career_moments to anon, authenticated;
grant insert, update, delete on public.custom_career_moments to authenticated;
grant all on public.custom_career_moments to service_role;
alter table public.custom_career_moments enable row level security;
create policy "Career photos are public" on public.custom_career_moments for select to anon, authenticated using (true);
create policy "Owner manages career photos" on public.custom_career_moments for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));