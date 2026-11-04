'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';
import { lessons, checklist } from '@/lib/content';
import { getProfile } from '@/lib/profile';
import { moduleChallenges, moduleIsReady, PASS_SCORE, CHALLENGE_XP, type ModuleResult, type ChallengeResult } from '@/lib/learning';

export type Progress = { completed: string[]; checks: string[]; xp: number; assessments: Record<string, ModuleResult> };
export const EMPTY: Progress = { completed: [], checks: [], xp: 0, assessments: {} };
const LOCAL_KEY = 'kompo-demo-v1';

// A demonstração é independente da conta e nunca é enviada automaticamente.
function readDemo(): Progress {
  try {
    const value = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null');
    const completed = Array.isArray(value?.completed)
      ? [...new Set<string>(value.completed.filter((id: unknown) => lessons.some(l => l.id === id)))] : [];
    const checks = Array.isArray(value?.checks)
      ? [...new Set<string>(value.checks.filter((id: unknown) => checklist.some(c => c.id === id)))] : [];
    const assessments: Record<string, ModuleResult> = {};
    for (const challenge of moduleChallenges) {
      const valueResult=value?.assessments?.[challenge.module];
      if (valueResult && Number.isInteger(valueResult.bestScore) && valueResult.bestScore>=0 && valueResult.bestScore<=4 && Number.isInteger(valueResult.attempts) && valueResult.attempts>0 && moduleIsReady(challenge.module,completed))
        assessments[challenge.module]={bestScore:valueResult.bestScore,attempts:valueResult.attempts,passed:valueResult.bestScore>=PASS_SCORE};
    }
    return { completed, checks, assessments, xp: completed.length * 25 + Object.values(assessments).filter(result=>result.passed).length*CHALLENGE_XP };
  } catch { return EMPTY; }
}

export function useKompo() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [privacyContact, setPrivacyContact] = useState('');
  const [localSaved, setLocalSaved] = useState(true);
  const client = useRef<SupabaseClient | null>(null);
  const identity = useRef<string | null>(null);
  const generation = useRef(0);
  const alive = useRef(false);
  const lock = useRef(false);
  const currentProgress = useRef(EMPTY);
  const updateProgress = useCallback((p: Progress) => { currentProgress.current = p; setProgress(p); }, []);

  const load = useCallback(async (u: User | null) => {
    const revision = ++generation.current;
    identity.current = u?.id || null;
    setUser(u); setReady(false); setError(''); updateProgress(EMPTY);
    if (!u) { updateProgress(readDemo()); setReady(true); return; }
    try {
      const c = client.current!;
      const [p, x, k, a, ax] = await Promise.all([
        c.from('lesson_progress').select('lesson_id').eq('user_id', u.id),
        c.from('xp_events').select('points').eq('user_id', u.id),
        c.from('user_checklist').select('item_id,checked').eq('user_id', u.id),
        c.from('module_results').select('module_id,best_score,attempts,passed_at').eq('user_id', u.id),
        c.from('module_xp_events').select('points').eq('user_id', u.id),
      ]);
      if (!alive.current || revision !== generation.current) return;
      if (p.error || x.error || k.error || a.error || ax.error) throw Error('load');
      updateProgress({ completed: (p.data || []).map(v => v.lesson_id),
        xp: [...(x.data || []),...(ax.data || [])].reduce((sum, v) => sum + v.points, 0),
        assessments: Object.fromEntries((a.data || []).map(result => [result.module_id,{bestScore:result.best_score,attempts:result.attempts,passed:!!result.passed_at}])),
        checks: (k.data || []).filter(v => v.checked).map(v => v.item_id) });
      setReady(true);
    } catch {
      if (alive.current && revision === generation.current)
        setError('Não foi possível carregar seus dados. Confira a conexão e tente novamente. Nenhum progresso foi substituído.');
    }
  }, [updateProgress]);

  useEffect(() => {
    alive.current = true;
    let cancelled = false;
    let unsubscribe = () => {};
    async function init() {
      try {
        const res = await fetch('/api/config', { cache: 'no-store' });
        if (!res.ok) throw Error('config');
        const config = await res.json() as {url?:string;key?:string;privacyContact?:string};
        if (cancelled) return;
        setPrivacyContact(config.privacyContact || '');
        if (!config.url || !config.key) { await load(null); return; }
        // PKCE associa o retorno OAuth ao navegador que iniciou o login.
        const c = createClient(config.url, config.key, { auth: {
          flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true,
        } });
        client.current = c; setConfigured(true);
        const result = await c.auth.getSession();
        if (cancelled) return;
        if (result.error) throw result.error;
        const oauthError = new URLSearchParams(location.search).has('error') || location.hash.includes('error=');
        const returned = new URLSearchParams(location.search).has('code');
        if (oauthError || returned) history.replaceState({}, '', location.pathname + (returned && result.data.session ? '#inicio' : ''));
        await load(result.data.session?.user || null);
        if (cancelled) return;
        if (oauthError) setError('O login não foi concluído. Você pode tentar entrar novamente.');
        const { data } = c.auth.onAuthStateChange((event, session) => {
          if (cancelled) return;
          const nextId = session?.user.id || null;
          if (nextId !== identity.current || event === 'USER_UPDATED') {
            queueMicrotask(() => { if (!cancelled) void load(session?.user || null); });
          }
        });
        unsubscribe = () => data.subscription.unsubscribe();
      } catch {
        if (!cancelled) {
          setError('Não foi possível iniciar a conexão de conta. Recarregue para tentar novamente.');
          setReady(false);
        }
      }
    }
    void init();
    return () => { cancelled = true; alive.current = false; ++generation.current; unsubscribe(); };
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 6500);
    return () => clearTimeout(timer);
  }, [notice]);

  function saveDemo(next: Progress) {
    updateProgress(next);
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); setLocalSaved(true); }
    catch { setLocalSaved(false); setError('O navegador não permitiu salvar. Seu progresso está disponível apenas nesta visita.'); }
  }
  async function complete(lessonId: string, answer: number) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || !ready || lock.current) return false;
    if (answer !== lesson.answer) throw Error('Ainda não. Releia o conteúdo e tente outra alternativa.');
    lock.current = true; setBusy(true);
    const operationUser = identity.current;
    const revision = generation.current;
    try {
      const previous = currentProgress.current;
      let awarded = !previous.completed.includes(lessonId);
      if (operationUser && client.current) {
        const { data, error } = await client.current.rpc('complete_lesson', { p_lesson_id: lessonId, p_answer: answer });
        if (error || typeof data?.total_xp !== 'number') throw Error('Não foi possível confirmar a conclusão. Tente novamente; os pontos não serão duplicados.');
        if (revision !== generation.current || !alive.current) return false;
        updateProgress({ ...currentProgress.current, completed: [...new Set([...currentProgress.current.completed, lessonId])], xp: data.total_xp });
        awarded = data.awarded;
      } else {
        saveDemo({ ...previous, completed: [...new Set([...previous.completed, lessonId])], xp: previous.xp + (awarded ? 25 : 0) });
      }
      setNotice(awarded ? 'Lição concluída! +25 XP para sua jornada.' : 'Revisão concluída. Seus pontos continuam os mesmos.');
      return true;
    } finally { lock.current = false; if (alive.current) setBusy(false); }
  }
  async function submitModule(moduleId: number, answers: number[]): Promise<ChallengeResult> {
    const challenge=moduleChallenges.find(item=>item.module===moduleId);
    if (!challenge || !ready || lock.current) throw Error('Aguarde a conexão para continuar.');
    if (!moduleIsReady(moduleId,currentProgress.current.completed)) throw Error('Conclua as lições deste módulo antes do desafio.');
    if (answers.length!==challenge.questions.length || answers.some(answer=>!Number.isInteger(answer)||answer<0||answer>2)) throw Error('Responda às quatro questões para continuar.');
    lock.current=true; setBusy(true);
    const revision=generation.current;
    try {
      let score=answers.filter((answer,index)=>answer===challenge.questions[index].answer).length;
      let passed=score>=PASS_SCORE;
      let awarded=false;
      if (identity.current && client.current) {
        const {data,error}=await client.current.rpc('submit_module_assessment',{p_module_id:moduleId,p_answers:answers});
        if(error || typeof data?.score!=='number' || typeof data?.total_xp!=='number') throw Error('Não foi possível salvar o desafio. Tente novamente; os pontos não serão duplicados.');
        if(revision!==generation.current || !alive.current) throw Error('A conta mudou. Abra o desafio novamente.');
        score=data.score;passed=data.passed;awarded=data.awarded;
        updateProgress({...currentProgress.current,xp:data.total_xp,assessments:{...currentProgress.current.assessments,[moduleId]:{bestScore:data.best_score,attempts:data.attempts,passed:data.passed_once}}});
      } else {
        const previous=currentProgress.current.assessments[moduleId];
        awarded=passed&&!previous?.passed;
        const bestScore=Math.max(previous?.bestScore||0,score);
        saveDemo({...currentProgress.current,xp:currentProgress.current.xp+(awarded?CHALLENGE_XP:0),assessments:{...currentProgress.current.assessments,[moduleId]:{bestScore,attempts:(previous?.attempts||0)+1,passed:bestScore>=PASS_SCORE}}});
      }
      setNotice(awarded?`Desafio concluído! +${CHALLENGE_XP} XP.`:passed?'Revisão concluída. Os pontos não se repetem.':'Confira as explicações e tente novamente no seu ritmo.');
      return {score,passed,awarded};
    } finally {lock.current=false;if(alive.current)setBusy(false);}
  }
  async function toggleCheck(id: string) {
    if (!ready || lock.current || !checklist.some(c => c.id === id)) return;
    lock.current = true; setBusy(true);
    const revision = generation.current;
    const operationUser = identity.current;
    const before = currentProgress.current;
    const checked = !before.checks.includes(id);
    const checks = checked ? [...before.checks, id] : before.checks.filter(v => v !== id);
    try {
      if (operationUser && client.current) {
        const { error } = await client.current.from('user_checklist').upsert({ user_id: operationUser, item_id: id, checked }, { onConflict: 'user_id,item_id' });
        if (error) throw error;
        if (revision !== generation.current || !alive.current) return;
        updateProgress({ ...currentProgress.current, checks });
      } else saveDemo({ ...before, checks });
    } catch { if (revision === generation.current) setNotice('Não foi possível salvar a marcação. Tente novamente.'); }
    finally { lock.current = false; if (alive.current) setBusy(false); }
  }
  async function signIn() {
    if (!client.current || lock.current) return;
    lock.current = true; setBusy(true); setError('');
    try {
      const { error } = await client.current.auth.signInWithOAuth({ provider: 'google', options: {
        redirectTo: location.origin + '/', scopes: 'openid email profile',
      } });
      if (error) throw error;
    } catch { setError('Não foi possível abrir o login Google. Confira a configuração do provedor e tente novamente.'); }
    finally { lock.current = false; if (alive.current) setBusy(false); }
  }
  async function signOut() {
    if (!client.current || lock.current) return false;
    lock.current = true; setBusy(true);
    try {
      const { error } = await client.current.auth.signOut();
      if (error) throw error;
      await load(null);
      setNotice('Você saiu da conta. O histórico da demonstração é separado.');
      return true;
    } catch { setError('Não foi possível sair. Tente novamente.'); return false; }
    finally { lock.current = false; if (alive.current) setBusy(false); }
  }
  function exportProgress() {
    const profile = getProfile(user);
    const payload = { exportedAt: new Date().toISOString(), mode: user ? 'conta' : 'demonstracao',
      profile: user ? { name: profile.fullName, avatarUrl: profile.avatarUrl || null } : null,
      progress: currentProgress.current };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'kompo-meu-progresso.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return { user, progress, ready, configured, busy, error, notice, privacyContact, localSaved,
    complete, submitModule, toggleCheck, signIn, signOut, exportProgress,
    dismissNotice: () => setNotice(''), retry: () => location.reload(),
    resetDemo: () => { if (!identity.current) { saveDemo(EMPTY); setNotice('Demonstração reiniciada.'); } },
  };
}
