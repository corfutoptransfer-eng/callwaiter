create extension if not exists pgcrypto;
create table if not exists restaurants(id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz not null default now());
create table if not exists tables(id uuid primary key default gen_random_uuid(), restaurant_id uuid not null references restaurants(id) on delete cascade, table_number int not null, token text not null unique default encode(gen_random_bytes(12),'hex'), active boolean not null default true, unique(restaurant_id,table_number));
create table if not exists service_requests(id uuid primary key default gen_random_uuid(), restaurant_id uuid not null references restaurants(id) on delete cascade, table_id uuid not null references tables(id) on delete cascade, table_number int not null, type text not null check(type in ('CALL_WAITER','ORDER','BILL','OTHER')), status text not null default 'WAITING' check(status in ('WAITING','ACCEPTED','COMPLETED')), created_at timestamptz not null default now(), accepted_at timestamptz, completed_at timestamptz);
alter table restaurants enable row level security;
alter table tables enable row level security;
alter table service_requests enable row level security;
create or replace function create_table_request(p_table_token text,p_type text) returns uuid language plpgsql security definer set search_path=public as $$ declare t tables; rid uuid; new_id uuid; begin select * into t from tables where token=p_table_token and active=true limit 1; if not found then raise exception 'Invalid table'; end if; insert into service_requests(restaurant_id,table_id,table_number,type) values(t.restaurant_id,t.id,t.table_number,p_type) returning id into new_id; return new_id; end; $$;
grant execute on function create_table_request(text,text) to anon, authenticated;
-- MVP/demo policies. Before production, replace these with staff-authenticated RLS policies.
create policy "staff read requests demo" on service_requests for select to anon, authenticated using (true);
create policy "staff update requests demo" on service_requests for update to anon, authenticated using (true) with check (true);
create publication supabase_realtime;
alter publication supabase_realtime add table service_requests;
insert into restaurants(name) values ('The Olive Restaurant & Bar') on conflict do nothing;
insert into tables(restaurant_id,table_number,token) select id,24,'demo-table-24' from restaurants where name='The Olive Restaurant & Bar' on conflict do nothing;
