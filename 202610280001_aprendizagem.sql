-- Kompô: expansão da trilha e desafios. Preserva contas, conclusões e pontos existentes.
-- Aplicar depois das duas migrações anteriores. Não executar novamente a migração inicial.
begin;

update public.lessons set position=position+1000;
insert into public.lessons(id,module_id,title,position,correct_answer) values
 ('ciclo',0,'O ciclo dos resíduos',0,1),
 ('bokashi',0,'Entendendo o Bokashi',1,0),
 ('planejamento',0,'Planejando o seu primeiro ciclo',2,1),
 ('montagem',1,'Montando um sistema com baldes',3,2),
 ('preparo',1,'Preparando o recipiente',4,2),
 ('separacao',1,'Separando os resíduos',5,1),
 ('manejo',2,'Acompanhando o processo',6,2),
 ('diagnostico',2,'Lendo os sinais do seu balde',7,0),
 ('destino',2,'Destino e revisão',8,0)
on conflict(id) do update set module_id=excluded.module_id,title=excluded.title,
 position=excluded.position,correct_answer=excluded.correct_answer;

create table if not exists public.module_assessments (
 module_id smallint primary key references public.learning_modules(id),
 correct_answers integer[] not null check(cardinality(correct_answers)=4),
 passing_score smallint not null default 3 check(passing_score=3),
 xp smallint not null default 50 check(xp=50),
 published boolean not null default true
);
insert into public.module_assessments(module_id,correct_answers) values
 (0,array[1,0,2,1]),(1,array[0,2,1,0]),(2,array[2,1,0,2])
on conflict(module_id) do update set correct_answers=excluded.correct_answers;

create table if not exists public.module_results (
 user_id uuid not null references auth.users(id) on delete cascade,
 module_id smallint not null references public.module_assessments(module_id),
 best_score smallint not null check(best_score between 0 and 4),
 attempts integer not null check(attempts>0),
 passed_at timestamptz,
 updated_at timestamptz not null default now(),
 primary key(user_id,module_id),
 check(passed_at is null or best_score>=3)
);
create table if not exists public.module_xp_events (
 user_id uuid not null references auth.users(id) on delete cascade,
 module_id smallint not null,
 points smallint not null check(points=50),
 created_at timestamptz not null default now(),
 primary key(user_id,module_id),
 foreign key(user_id,module_id) references public.module_results(user_id,module_id) on delete cascade
);
alter table public.module_assessments enable row level security;
alter table public.module_results enable row level security;
alter table public.module_xp_events enable row level security;
revoke all on public.module_assessments,public.module_results,public.module_xp_events from public,anon,authenticated;
grant select on public.module_results,public.module_xp_events to authenticated;
drop policy if exists module_results_own on public.module_results;
create policy module_results_own on public.module_results for select to authenticated using((select auth.uid())=user_id);
drop policy if exists module_xp_own on public.module_xp_events;
create policy module_xp_own on public.module_xp_events for select to authenticated using((select auth.uid())=user_id);

alter table public.badges add column if not exists module_required smallint references public.learning_modules(id);
alter table public.badges add column if not exists all_modules_required boolean not null default false;
update public.badges set title='Base consolidada' where id='ciclo-completo';
insert into public.badges(id,title,lessons_required,module_required,all_modules_required) values
 ('trilha-completa','Jornada Bokashi',9,null,false),
 ('desafio-ciclo','Ciclo planejado',3,0,false),
 ('desafio-preparo','Preparo consciente',3,1,false),
 ('desafio-manejo','Olhar de cuidado',3,2,false),
 ('pratica-completa','Bokashi na prática',9,null,true)
on conflict(id) do update set title=excluded.title,lessons_required=excluded.lessons_required,
 module_required=excluded.module_required,all_modules_required=excluded.all_modules_required;

create or replace function public.award_learning_badges(p_user uuid)
returns void language sql security definer set search_path='' as $$
 insert into public.user_badges(user_id,badge_id)
 select p_user,b.id from public.badges b
 where b.lessons_required <= (select count(*) from public.lesson_progress p where p.user_id=p_user)
 and (b.module_required is null or exists(select 1 from public.module_results r
   where r.user_id=p_user and r.module_id=b.module_required and r.passed_at is not null))
 and (not b.all_modules_required or not exists(select 1 from public.module_assessments a
   where a.published and not exists(select 1 from public.module_results r
     where r.user_id=p_user and r.module_id=a.module_id and r.passed_at is not null)))
 on conflict do nothing;
$$;
revoke all on function public.award_learning_badges(uuid) from public,anon,authenticated;

create or replace function public.complete_lesson(p_lesson_id text,p_answer integer)
returns jsonb language plpgsql security definer set search_path='' as $$
declare
 v_user uuid:=auth.uid(); v_lesson public.lessons%rowtype;
 v_inserted integer; v_total integer; v_count integer;
begin
 if v_user is null then raise exception 'Authentication required' using errcode='28000'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_user::text,0));
 select * into v_lesson from public.lessons where id=p_lesson_id and published;
 if not found then raise exception 'Lesson unavailable'; end if;
 if p_answer is null or p_answer<>v_lesson.correct_answer then raise exception 'Incorrect answer'; end if;
 insert into public.lesson_progress(user_id,lesson_id) values(v_user,p_lesson_id) on conflict do nothing;
 get diagnostics v_inserted=row_count;
 if v_inserted=1 then
  insert into public.xp_events(user_id,lesson_id,points) values(v_user,p_lesson_id,v_lesson.xp);
 end if;
 perform public.award_learning_badges(v_user);
 select count(*)::integer into v_count from public.lesson_progress where user_id=v_user;
 select coalesce(sum(points),0)::integer into v_total from (
  select points from public.xp_events where user_id=v_user
  union all select points from public.module_xp_events where user_id=v_user
 ) events;
 return jsonb_build_object('awarded',v_inserted=1,'total_xp',v_total,'completed_lessons',v_count);
end;
$$;
revoke all on function public.complete_lesson(text,integer) from public,anon;
grant execute on function public.complete_lesson(text,integer) to authenticated;

create or replace function public.submit_module_assessment(p_module_id integer,p_answers integer[])
returns jsonb language plpgsql security definer set search_path='' as $$
declare
 v_user uuid:=auth.uid(); v_assessment public.module_assessments%rowtype;
 v_required integer; v_completed integer; v_score integer:=0; v_index integer;
 v_awarded integer; v_total integer; v_result public.module_results%rowtype;
begin
 if v_user is null then raise exception 'Authentication required' using errcode='28000'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(v_user::text,0));
 select * into v_assessment from public.module_assessments where module_id=p_module_id and published;
 if not found then raise exception 'Assessment unavailable'; end if;
 if p_answers is null or array_ndims(p_answers)<>1 or array_lower(p_answers,1)<>1 or cardinality(p_answers)<>4
  or exists(select 1 from unnest(p_answers) answer where answer is null or answer<0 or answer>2)
 then raise exception 'Invalid answers'; end if;
 select count(*)::integer into v_required from public.lessons where module_id=p_module_id and published;
 select count(*)::integer into v_completed from public.lesson_progress p join public.lessons l on l.id=p.lesson_id
  where p.user_id=v_user and l.module_id=p_module_id and l.published;
 if v_required=0 or v_completed<>v_required then raise exception 'Complete this module first'; end if;
 for v_index in 1..4 loop
  if p_answers[v_index]=v_assessment.correct_answers[v_index] then v_score:=v_score+1; end if;
 end loop;
 insert into public.module_results(user_id,module_id,best_score,attempts,passed_at)
 values(v_user,p_module_id,v_score,1,case when v_score>=v_assessment.passing_score then now() end)
 on conflict(user_id,module_id) do update set
  best_score=greatest(public.module_results.best_score,excluded.best_score),
  attempts=public.module_results.attempts+1,
  passed_at=coalesce(public.module_results.passed_at,excluded.passed_at),updated_at=now()
 returning * into v_result;
 v_awarded:=0;
 if v_score>=v_assessment.passing_score then
  insert into public.module_xp_events(user_id,module_id,points) values(v_user,p_module_id,v_assessment.xp) on conflict do nothing;
  get diagnostics v_awarded=row_count;
 end if;
 perform public.award_learning_badges(v_user);
 select coalesce(sum(points),0)::integer into v_total from (
  select points from public.xp_events where user_id=v_user
  union all select points from public.module_xp_events where user_id=v_user
 ) events;
 return jsonb_build_object('score',v_score,'passed',v_score>=v_assessment.passing_score,
  'awarded',v_awarded=1,'best_score',v_result.best_score,'attempts',v_result.attempts,
  'passed_once',v_result.passed_at is not null,'total_xp',v_total);
end;
$$;
revoke all on function public.submit_module_assessment(integer,integer[]) from public,anon;
grant execute on function public.submit_module_assessment(integer,integer[]) to authenticated;
commit;
