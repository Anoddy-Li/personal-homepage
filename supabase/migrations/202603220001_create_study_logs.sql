create extension if not exists "pgcrypto";

create table if not exists public.study_logs (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  slug text not null unique,
  summary text not null,
  content text not null,
  tags text[] not null default '{}',
  mood text,
  duration_minutes integer check (
    duration_minutes is null or duration_minutes > 0
  ),
  is_public boolean not null default false,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists study_logs_set_updated_at on public.study_logs;

create trigger study_logs_set_updated_at
before update on public.study_logs
for each row
execute function public.update_updated_at_column();

create index if not exists study_logs_date_idx on public.study_logs (date desc);
create index if not exists study_logs_public_date_idx on public.study_logs (is_public, date desc);
create index if not exists study_logs_slug_idx on public.study_logs (slug);
create index if not exists study_logs_tags_idx on public.study_logs using gin (tags);
create index if not exists study_logs_search_idx
on public.study_logs
using gin (
  to_tsvector(
    'simple',
    coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, '')
  )
);

alter table public.study_logs enable row level security;

drop policy if exists "Public can read public study logs" on public.study_logs;

create policy "Public can read public study logs"
on public.study_logs
for select
using (is_public = true);
