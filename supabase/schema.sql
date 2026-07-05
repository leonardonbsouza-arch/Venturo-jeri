create table if not exists public.booking_leads (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  preferred_date date,
  preferred_time time,
  customer_name text,
  notes text,
  source text not null default 'venturojeri.com',
  created_at timestamptz not null default now()
);

alter table public.booking_leads enable row level security;

drop policy if exists "Allow public lead inserts" on public.booking_leads;

create policy "Allow public lead inserts"
  on public.booking_leads
  for insert
  to anon
  with check (true);
