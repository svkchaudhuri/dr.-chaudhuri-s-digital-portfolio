create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- The very first signed-in account becomes the site owner; afterwards nobody else can claim.
create or replace function public.claim_site_owner()
returns boolean language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then return false; end if;
  perform pg_advisory_xact_lock(424242);
  if exists (select 1 from public.user_roles where role = 'admin') then
    return public.has_role(auth.uid(), 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke execute on function public.claim_site_owner() from public, anon;
grant execute on function public.claim_site_owner() to authenticated;

create table public.custom_publications (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'Journals',
  authors text not null,
  title text not null,
  venue text not null default '',
  year integer not null,
  details text,
  doi text,
  url text,
  created_at timestamptz not null default now()
);
grant select on public.custom_publications to anon, authenticated;
grant insert, update, delete on public.custom_publications to authenticated;
grant all on public.custom_publications to service_role;
alter table public.custom_publications enable row level security;
create policy "Publications are public" on public.custom_publications for select to anon, authenticated using (true);
create policy "Owner manages publications" on public.custom_publications for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.interest_publications (
  interest_name text primary key,
  publication_keys text[] not null default '{}',
  updated_at timestamptz not null default now()
);
grant select on public.interest_publications to anon, authenticated;
grant insert, update, delete on public.interest_publications to authenticated;
grant all on public.interest_publications to service_role;
alter table public.interest_publications enable row level security;
create policy "Interest picks are public" on public.interest_publications for select to anon, authenticated using (true);
create policy "Owner manages interest picks" on public.interest_publications for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));