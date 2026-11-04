import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import ts from 'typescript';
const db=new PGlite();
await db.exec(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;`);
await db.exec(await readFile(new URL('../supabase/migrations/202610090001_kompo.sql',import.meta.url),'utf8'));
await db.exec(await readFile(new URL('../supabase/migrations/202610250001_conteudo.sql',import.meta.url),'utf8'));
const a='00000000-0000-0000-0000-000000000001', b='00000000-0000-0000-0000-000000000002';
await db.exec(`insert into auth.users values('${a}'),('${b}');set role authenticated;set request.jwt.claim.sub='${a}';`);
async function complete(id,answer){return (await db.query('select public.complete_lesson($1,$2) as result',[id,answer])).rows[0].result;}
await assert.rejects(()=>complete('nao-existe',0));
await assert.rejects(()=>complete('ciclo',null));
assert.equal((await complete('ciclo',1)).total_xp,25);
assert.equal((await complete('ciclo',1)).awarded,false);
await assert.rejects(()=>complete('bokashi',2));
assert.equal((await complete('bokashi',0)).total_xp,50);
await complete('preparo',2);
assert.equal((await db.query('select * from public.user_badges')).rows.length,2);
await assert.rejects(()=>db.exec(`insert into public.xp_events(user_id,lesson_id,points) values('${a}','separacao',25)`));
await assert.rejects(()=>db.exec(`insert into public.lesson_progress(user_id,lesson_id) values('${a}','separacao')`));
await db.exec(`insert into public.user_checklist values('${a}','destino',true);set request.jwt.claim.sub='${b}';`);
assert.equal((await db.query('select * from public.lesson_progress')).rows.length,0);
assert.equal((await db.query('select * from public.user_checklist')).rows.length,0);
await assert.rejects(()=>db.exec(`insert into public.user_checklist values('${a}','recipiente',true)`));
assert.equal((await complete('ciclo',1)).total_xp,25);
assert.equal((await db.query('select * from public.xp_events')).rows.length,1);
assert.equal((await db.query('select * from public.user_badges')).rows.length,1);
assert.equal((await db.query('update public.user_checklist set checked=false where user_id=$1 returning *',[a])).rows.length,0);
await assert.rejects(()=>db.exec(`insert into public.user_badges values('${b}','ciclo-completo',now())`));
await db.exec(`set request.jwt.claim.sub='${a}'`);
await complete('separacao',1); await complete('manejo',2);
assert.equal((await complete('destino',0)).total_xp,150);
assert.equal((await db.query('select * from public.user_badges')).rows.length,3);
await db.exec(`set request.jwt.claim.sub=''`);
await assert.rejects(()=>complete('ciclo',1));
await db.exec(`reset role;set role anon;set request.jwt.claim.sub='';`);
await assert.rejects(()=>complete('ciclo',1));
assert.equal((await db.query('select * from public.lessons')).rows.length,6);
await db.exec(`reset role;delete from auth.users where id='${a}';`);
assert.equal((await db.query('select * from public.xp_events where user_id=$1',[a])).rows.length,0);
console.log('PASS: original migrations, idempotency, RLS and deletion cascade.');

const expansion=await readFile(new URL('../supabase/migrations/202610280001_aprendizagem.sql',import.meta.url),'utf8');
await db.exec(expansion);
assert.equal((await db.query('select count(*)::int as n from public.lessons')).rows[0].n,9);
assert.equal((await db.query('select sum(points)::int as xp from public.xp_events where user_id=$1',[b])).rows[0].xp,25);

// Check the actual question bank against the SQL key: a mismatch would block learners.
async function sourceArray(path,name){
 const source=ts.createSourceFile(path,await readFile(new URL(path,import.meta.url),'utf8'),ts.ScriptTarget.Latest,true);
 let found;function visit(node){if(ts.isVariableDeclaration(node)&&node.name.getText(source)===name)found=node.initializer;ts.forEachChild(node,visit);}visit(source);
 assert.ok(found&&ts.isArrayLiteralExpression(found));return found.elements;
}
function property(object,name){return object.properties.find(p=>p.name?.getText().replaceAll("'",'')===name)?.initializer;}
const bank=await sourceArray('../lib/learning.ts','moduleChallenges');
for(const module of bank){
 const id=Number(property(module,'module').text);
 const answers=property(module,'questions').elements.map(q=>Number(property(q,'answer').text));
 assert.equal(answers.length,4);
 assert.deepEqual((await db.query('select correct_answers from public.module_assessments where module_id=$1',[id])).rows[0].correct_answers,answers);
}
for(const lesson of [...await sourceArray('../lib/content.ts','initialLessons'),...await sourceArray('../lib/additional-content.ts','additionalLessons')]){
 const id=property(lesson,'id').text;
 assert.equal((await db.query('select correct_answer from public.lessons where id=$1',[id])).rows[0].correct_answer,Number(property(lesson,'answer').text));
}

const c='00000000-0000-0000-0000-000000000003';
await db.exec(`insert into auth.users values('${c}');set role authenticated;set request.jwt.claim.sub='${c}';`);
async function challenge(id,answers){return (await db.query('select public.submit_module_assessment($1,$2) as result',[id,answers])).rows[0].result;}
await assert.rejects(()=>challenge(0,[1,0,2,1]));
await assert.rejects(()=>db.query('select correct_answers from public.module_assessments'));
await assert.rejects(()=>db.query('select public.award_learning_badges($1)',[c]));
await complete('ciclo',1);await complete('bokashi',0);await complete('planejamento',1);
await assert.rejects(()=>challenge(0,[1,0,2,null]));
await assert.rejects(()=>challenge(0,[1,0,2]));
await assert.rejects(()=>challenge(0,[1,0,2,3]));
await assert.rejects(()=>challenge(99,[1,0,2,1]));
const failed=await challenge(0,[0,0,0,0]);
assert.equal(failed.score,1);assert.equal(failed.passed,false);assert.equal(failed.total_xp,75);
const passed=await challenge(0,[1,0,2,0]);
assert.equal(passed.score,3);assert.equal(passed.awarded,true);assert.equal(passed.total_xp,125);
const review=await challenge(0,[1,0,2,1]);
assert.equal(review.score,4);assert.equal(review.awarded,false);assert.equal(review.total_xp,125);assert.equal(review.attempts,3);
const laterFailure=await challenge(0,[0,0,0,0]);
assert.equal(laterFailure.passed_once,true);assert.equal(laterFailure.best_score,4);assert.equal(laterFailure.total_xp,125);
for(const [id,answer] of [['montagem',2],['preparo',2],['separacao',1],['manejo',2],['diagnostico',0],['destino',0]])await complete(id,answer);
assert.equal((await challenge(1,[0,2,1,0])).total_xp,325);
assert.equal((await challenge(2,[2,1,0,2])).total_xp,375);
assert.equal((await db.query('select * from public.user_badges')).rows.length,8);
await assert.rejects(()=>db.exec(`insert into public.module_xp_events(user_id,module_id,points) values('${c}',0,50)`));
await assert.rejects(()=>db.exec(`update public.module_results set best_score=4`));
await db.exec(`set request.jwt.claim.sub='${b}'`);
assert.equal((await db.query('select * from public.module_results')).rows.length,0);
assert.equal((await db.query('select * from public.module_xp_events')).rows.length,0);
await assert.rejects(()=>challenge(0,[1,0,2,1]));
await db.exec(`reset role;set role anon;set request.jwt.claim.sub='';`);
await assert.rejects(()=>challenge(0,[1,0,2,1]));
await assert.rejects(()=>db.query('select * from public.module_results'));
await db.exec('reset role');
await db.exec(expansion);
assert.equal((await db.query('select count(*)::int as n from public.module_xp_events where user_id=$1',[c])).rows[0].n,3);
await db.exec(`delete from auth.users where id='${c}'`);
assert.equal((await db.query('select * from public.module_results where user_id=$1',[c])).rows.length,0);
assert.equal((await db.query('select * from public.module_xp_events where user_id=$1',[c])).rows.length,0);
console.log('PASS: curriculum/key parity, existing progress preserved, prerequisites, malformed answers, server grading, 375 XP without duplicates, 8 badges, RLS, repeatable migration and deletion cascade.');
await db.close();
