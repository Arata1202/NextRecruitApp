-- Normalize selectionstar values to 3 statuses:
-- 1: 内定済み / 2: 選考中 / 3: 辞退
-- This script is idempotent and keeps existing selection references valid.

-- Ensure required sort rows exist.
insert into public.selectionstar (title, sort)
select '内定済み', 1
where not exists (
  select 1 from public.selectionstar where sort = 1
);

insert into public.selectionstar (title, sort)
select '選考中', 2
where not exists (
  select 1 from public.selectionstar where sort = 2
);

insert into public.selectionstar (title, sort)
select '辞退', 3
where not exists (
  select 1 from public.selectionstar where sort = 3
);

-- Canonicalize titles for sort 1..3.
update public.selectionstar set title = '内定済み' where sort = 1;
update public.selectionstar set title = '選考中' where sort = 2;
update public.selectionstar set title = '辞退' where sort = 3;

-- If duplicate rows exist in sort 1..3, keep the smallest id for each sort.
with ranked as (
  select id, sort, min(id) over (partition by sort) as keep_id
  from public.selectionstar
  where sort in (1, 2, 3)
), to_move as (
  select id, keep_id
  from ranked
  where id <> keep_id
)
update public.selection s
set star_id = tm.keep_id
from to_move tm
where s.star_id = tm.id;

with ranked as (
  select id, sort, min(id) over (partition by sort) as keep_id
  from public.selectionstar
  where sort in (1, 2, 3)
)
delete from public.selectionstar ss
using ranked r
where ss.id = r.id
  and r.id <> r.keep_id;

-- Reassign rows referencing non-target statuses to "選考中".
with in_progress as (
  select id
  from public.selectionstar
  where sort = 2
  order by id
  limit 1
)
update public.selection s
set star_id = ip.id
from in_progress ip
where s.star_id in (
  select id
  from public.selectionstar
  where sort not in (1, 2, 3)
     or sort is null
);

-- Remove statuses outside 1..3.
delete from public.selectionstar
where sort not in (1, 2, 3)
   or sort is null;

-- Keep deterministic ordering.
create unique index if not exists selectionstar_sort_unique
  on public.selectionstar (sort);
