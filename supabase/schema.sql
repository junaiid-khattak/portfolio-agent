-- Run in Supabase SQL editor to provision lead capture.
-- Tables are written via the service-role key from server routes only.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  session_id text unique,
  name text,
  email text,
  company text,
  audience_type text,
  what_building text,
  budget_band text,
  source text default 'site',
  ua text,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.conversations (
  session_id text primary key,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS on; only service role (used server-side) bypasses it. No public policies =
-- the anon key can't read/write these tables.
alter table public.leads enable row level security;
alter table public.conversations enable row level security;
