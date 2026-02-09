-- Harden RLS for app-facing public tables.
-- This script is idempotent and rebuilds policies for target tables.

-- 1) Enable RLS on target tables.
alter table public.analysis enable row level security;
alter table public.selection enable row level security;
alter table public.selectiondetail enable row level security;
alter table public.selectionflow enable row level security;
alter table public.template enable row level security;
alter table public.todo enable row level security;
alter table public.happiness_entries enable row level security;
alter table public.analysisgroup enable row level security;
alter table public.analysistitle enable row level security;
alter table public.selectionstar enable row level security;
alter table public.selectiondetailtitle enable row level security;
alter table public.selectionflowtitle enable row level security;
alter table public.templatetitle enable row level security;

-- 2) Drop all existing policies on target tables so policy behavior is deterministic.
do $$
declare
  t text;
begin
  foreach t in array array[
    'analysis',
    'selection',
    'selectiondetail',
    'selectionflow',
    'template',
    'todo',
    'happiness_entries',
    'analysisgroup',
    'analysistitle',
    'selectionstar',
    'selectiondetailtitle',
    'selectionflowtitle',
    'templatetitle'
  ]
  loop
    execute (
      select string_agg(format('drop policy if exists %I on public.%I;', p.policyname, t), ' ')
      from pg_policies p
      where p.schemaname = 'public' and p.tablename = t
    );
  end loop;
end
$$;

-- 3) Owner-scoped policies for user-owned tables.
create policy analysis_select_own
on public.analysis
for select
to authenticated
using (auth.uid() = supabaseauth_id);

create policy analysis_insert_own
on public.analysis
for insert
to authenticated
with check (auth.uid() = supabaseauth_id);

create policy analysis_update_own
on public.analysis
for update
to authenticated
using (auth.uid() = supabaseauth_id)
with check (auth.uid() = supabaseauth_id);

create policy analysis_delete_own
on public.analysis
for delete
to authenticated
using (auth.uid() = supabaseauth_id);

create policy selection_select_own
on public.selection
for select
to authenticated
using (auth.uid() = supabaseauth_id);

create policy selection_insert_own
on public.selection
for insert
to authenticated
with check (auth.uid() = supabaseauth_id);

create policy selection_update_own
on public.selection
for update
to authenticated
using (auth.uid() = supabaseauth_id)
with check (auth.uid() = supabaseauth_id);

create policy selection_delete_own
on public.selection
for delete
to authenticated
using (auth.uid() = supabaseauth_id);

create policy template_select_own
on public.template
for select
to authenticated
using (auth.uid() = supabaseauth_id);

create policy template_insert_own
on public.template
for insert
to authenticated
with check (auth.uid() = supabaseauth_id);

create policy template_update_own
on public.template
for update
to authenticated
using (auth.uid() = supabaseauth_id)
with check (auth.uid() = supabaseauth_id);

create policy template_delete_own
on public.template
for delete
to authenticated
using (auth.uid() = supabaseauth_id);

create policy todo_select_own
on public.todo
for select
to authenticated
using (auth.uid() = supabaseauth_id);

create policy todo_insert_own
on public.todo
for insert
to authenticated
with check (auth.uid() = supabaseauth_id);

create policy todo_update_own
on public.todo
for update
to authenticated
using (auth.uid() = supabaseauth_id)
with check (auth.uid() = supabaseauth_id);

create policy todo_delete_own
on public.todo
for delete
to authenticated
using (auth.uid() = supabaseauth_id);

create policy happiness_entries_select_own
on public.happiness_entries
for select
to authenticated
using (auth.uid() = user_id);

create policy happiness_entries_insert_own
on public.happiness_entries
for insert
to authenticated
with check (auth.uid() = user_id);

create policy happiness_entries_update_own
on public.happiness_entries
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy happiness_entries_delete_own
on public.happiness_entries
for delete
to authenticated
using (auth.uid() = user_id);

-- Child tables: visibility/editability follows parent selection ownership.
create policy selectiondetail_select_own
on public.selectiondetail
for select
to authenticated
using (
  exists (
    select 1
    from public.selection s
    where s.id = selectiondetail.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectiondetail_insert_own
on public.selectiondetail
for insert
to authenticated
with check (
  exists (
    select 1
    from public.selection s
    where s.id = selectiondetail.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectiondetail_update_own
on public.selectiondetail
for update
to authenticated
using (
  exists (
    select 1
    from public.selection s
    where s.id = selectiondetail.selection_id
      and s.supabaseauth_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.selection s
    where s.id = selectiondetail.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectiondetail_delete_own
on public.selectiondetail
for delete
to authenticated
using (
  exists (
    select 1
    from public.selection s
    where s.id = selectiondetail.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectionflow_select_own
on public.selectionflow
for select
to authenticated
using (
  exists (
    select 1
    from public.selection s
    where s.id = selectionflow.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectionflow_insert_own
on public.selectionflow
for insert
to authenticated
with check (
  exists (
    select 1
    from public.selection s
    where s.id = selectionflow.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectionflow_update_own
on public.selectionflow
for update
to authenticated
using (
  exists (
    select 1
    from public.selection s
    where s.id = selectionflow.selection_id
      and s.supabaseauth_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.selection s
    where s.id = selectionflow.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

create policy selectionflow_delete_own
on public.selectionflow
for delete
to authenticated
using (
  exists (
    select 1
    from public.selection s
    where s.id = selectionflow.selection_id
      and s.supabaseauth_id = auth.uid()
  )
);

-- Master tables: read-only for authenticated users.
create policy analysisgroup_read_authenticated
on public.analysisgroup
for select
to authenticated
using (true);

create policy analysistitle_read_authenticated
on public.analysistitle
for select
to authenticated
using (true);

create policy selectionstar_read_authenticated
on public.selectionstar
for select
to authenticated
using (true);

create policy selectiondetailtitle_read_authenticated
on public.selectiondetailtitle
for select
to authenticated
using (true);

create policy selectionflowtitle_read_authenticated
on public.selectionflowtitle
for select
to authenticated
using (true);

create policy templatetitle_read_authenticated
on public.templatetitle
for select
to authenticated
using (true);
