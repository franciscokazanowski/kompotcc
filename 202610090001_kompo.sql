-- Kompô: first migration. Apply once to a NEW project through SQL Editor or CLI.
-- No service-role credential is needed by the browser.
begin;
create table public.learning_modules (
 id smallint primary key, title text not null, position smallint not null unique
);
create table public.lessons (
 id text primary key, module_id smallint not null references public.learning_modules(id),
 title text not null, position smallint not null unique,
 correct_answer smallint not null check (correct_answer between 0 and 2),
 xp smallint not null default 25 check (xp=25), published boolean not null default true
);
create table public.lesson_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id text not null references public.lessons(id),
 completed_at timestamptz not null default now(),
 primary key(user_id,lesson_id)
);
create table public.xp_events (
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id text not null references public.lessons(id),
 points smallint not null check(points=25), created_at timestamptz not null default now(),
 primary key(user_id,lesson_id),
 foreign key(user_id,lesson_id) references public.lesson_progress(user_id,lesson_id) on delete cascade
);
create table public.badges (
 id text primary key, title text not null, lessons_required smallint not null check(lessons_required>0)
);
create table public.user_badges (
 user_id uuid not null references auth.users(id) on delete cascade,
 badge_id text not null references public.badges(id), awarded_at timestamptz not null default now(),
 primary key(user_id,badge_id)
);
create table public.checklist_items (id text primary key, label text not null);
create table public.user_checklist (
 user_id uuid not null references auth.users(id) on delete cascade,
 item_id text not null references public.checklist_items(id), checked boolean not null default false,
 primary key(user_id,item_id)
);
insert into public.learning_modules values (0,'Conheça o ciclo',0),(1,'Prepare sua rotina',1),(2,'Cuide e transforme',2);
insert into public.lessons (id,module_id,title,position,correct_answer) values
 ('ciclo',0,'Um novo destino para o que sobra',0,1),
 ('bokashi',0,'Bokashi, sem mistério',1,0),
 ('preparo',1,'Seu cantinho de compostagem',2,2),
 ('separacao',1,'Pode ou não pode?',3,1),
 ('manejo',2,'Uma rotina que faz sentido',4,2),
 ('destino',2,'O ciclo continua',5,0);
insert into public.badges values ('primeiro-passo','Primeira semente',1),('meio-caminho','Criando raízes',3),('ciclo-completo','Ciclo de aprendizado',6);
insert into public.checklist_items values
 ('destino','Defini o destino do material fermentado'),
 ('recipiente','Conferi o recipiente e a vedação'),
 ('inoculante','Separei o inoculante indicado'),
 ('embalagens','Retirei embalagens e adesivos dos resíduos');

alter table public.learning_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.xp_events enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.checklist_items enable row level security;
alter table public.user_checklist enable row level security;

revoke all on public.learning_modules,public.lessons,public.lesson_progress,public.xp_events,public.badges,public.user_badges,public.checklist_items,public.user_checklist from anon, authenticated;
grant select on public.learning_modules,public.lessons,public.badges,public.checklist_items to anon,authenticated;
grant select on public.lesson_progress,public.xp_events,public.user_badges,public.user_checklist to authenticated;
grant insert,update on public.user_checklist to authenticated;
create policy modules_read on public.learning_modules for select to anon,authenticated using(true);
create policy lessons_read on public.lessons for select to anon,authenticated using(published);
create policy badges_read on public.badges for select to anon,authenticated using(true);
create policy checklist_catalog_read on public.checklist_items for select to anon,authenticated using(true);
create policy progress_own on public.lesson_progress for select to authenticated using((select auth.uid())=user_id);
create policy xp_own on public.xp_events for select to authenticated using((select auth.uid())=user_id);
create policy user_badges_own on public.user_badges for select to authenticated using((select auth.uid())=user_id);
create policy checklist_own_read on public.user_checklist for select to authenticated using((select auth.uid())=user_id);
create policy checklist_own_insert on public.user_checklist for insert to authenticated with check((select auth.uid())=user_id);
create policy checklist_own_update on public.user_checklist for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);

-- Atomic and idempotent: the server decides both the user and XP.
-- The client cannot insert progress, XP or badges directly.
create or replace function public.complete_lesson(p_lesson_id text, p_answer integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
 v_user uuid := auth.uid(); v_lesson public.lessons%rowtype;
 v_inserted integer; v_total integer; v_count integer;
begin
 if v_user is null then raise exception 'Authentication required' using errcode='28000'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_user::text,0));
 select * into v_lesson from public.lessons where id=p_lesson_id and published;
 if not found then raise exception 'Lesson unavailable'; end if;
 if p_answer is null or p_answer<>v_lesson.correct_answer then raise exception 'Incorrect answer'; end if;
 insert into public.lesson_progress(user_id,lesson_id) values(v_user,p_lesson_id) on conflict do nothing;
 get diagnostics v_inserted = row_count;
 if v_inserted=1 then
  insert into public.xp_events(user_id,lesson_id,points) values(v_user,p_lesson_id,v_lesson.xp);
 end if;
 select count(*) into v_count from public.lesson_progress where user_id=v_user;
 insert into public.user_badges(user_id,badge_id)
 select v_user,b.id from public.badges b where b.lessons_required<=v_count on conflict do nothing;
 select coalesce(sum(points),0)::integer into v_total from public.xp_events where user_id=v_user;
 return jsonb_build_object('awarded',v_inserted=1,'total_xp',v_total,'completed_lessons',v_count);
end;
$$;
revoke all on function public.complete_lesson(text,integer) from public,anon;
grant execute on function public.complete_lesson(text,integer) to authenticated;
commit;
