'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw, BookOpen, CircleAlert } from 'lucide-react';
import { lessons, modules } from '@/lib/content';
import { PASS_SCORE, CHALLENGE_XP, type ModuleChallenge, type ChallengeResult } from '@/lib/learning';

export function ModuleChallengeView({ challenge, ready, busy, submit, review, back }: {
  challenge: ModuleChallenge; ready: boolean; busy: boolean;
  submit: (module: number, answers: number[]) => Promise<ChallengeResult>;
  review: (id: string) => void; back: () => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(challenge.questions.map(() => null));
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ChallengeResult | null>(null);
  const [error, setError] = useState('');
  const question = challenge.questions[step];
  const legend=useRef<HTMLLegendElement>(null);
  useEffect(()=>{legend.current?.focus();},[step]);
  async function finish() {
    setError('');
    try { setResult(await submit(challenge.module, answers as number[])); window.scrollTo({ top: 0 }); }
    catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível conferir. Tente novamente.'); }
  }
  function reset() { setAnswers(challenge.questions.map(() => null)); setStep(0); setResult(null); setError(''); }
  return <section className="module-challenge">
    <button className="back-link" onClick={back}><ArrowLeft size={16}/>Voltar à trilha</button>
    <span className="eyebrow">DESAFIO · {modules[challenge.module]}</span>
    <h1>{challenge.title}</h1>
    <p className="challenge-intro">Quatro situações para aplicar o que você aprendeu. Acerte pelo menos {PASS_SCORE} para concluir. O primeiro resultado aprovado vale {CHALLENGE_XP} XP.</p>
    {!ready ? <div className="inline-note"><CircleAlert size={18}/><p>Conclua as três lições deste módulo antes do desafio.</p></div> : result ? <>
      <div className={'challenge-result '+(result.passed?'success':'')} role="status"><strong>{result.passed&&<><Check size={22}/>Módulo concluído · </>}Você acertou {result.score} de {challenge.questions.length}.</strong><p>{result.passed?(result.awarded?`Desafio concluído. Você ganhou ${CHALLENGE_XP} XP e uma medalha de módulo.`:'Desafio revisado. A conquista e os pontos já estavam salvos.'):'Leia as explicações e retome os pontos que faltaram. Você pode tentar novamente, sem perder pontos.'}</p></div>
      <div className="challenge-review">{challenge.questions.map((q,index) => <article key={q.id}>
        <span className={'answer-label '+(answers[index]===q.answer?'correct':'review')}>{answers[index]===q.answer?<Check size={16}/>:<BookOpen size={16}/>}Questão {index+1} · {answers[index]===q.answer?'Acertou':'Para revisar'}</span>
        <h2>{q.question}</h2><p>Sua resposta: {q.options[answers[index]!]}</p>
        {answers[index]!==q.answer && <p><strong>Resposta adequada:</strong> {q.options[q.answer]}</p>}
        <p>{q.explanation}</p><button className="text-button" onClick={() => review(q.lesson)}>Rever “{lessons.find(lesson => lesson.id===q.lesson)?.title}” <ArrowRight size={15}/></button>
      </article>)}</div>
      <div className="lesson-actions"><button className="text-button" onClick={reset}><RotateCcw size={16}/>Refazer o desafio</button><button className="button" onClick={back}>Voltar à trilha <ArrowRight size={17}/></button></div>
    </> : <>
      <div className="challenge-counter" aria-live="polite">Questão {step+1} de {challenge.questions.length}</div>
      <progress value={step+1} max={challenge.questions.length} aria-label="Questão atual"/>
      <p className="challenge-source-note">Você viu esse assunto na lição <strong>“{lessons.find(lesson=>lesson.id===question.lesson)?.title}”</strong>.</p>
      <form onSubmit={e => {e.preventDefault();if(answers[step]===null)return;if(step<challenge.questions.length-1)setStep(step+1);else void finish();}}>
        <fieldset className="quiz" disabled={busy}><legend key={question.id} tabIndex={-1} ref={legend}>{question.question}</legend>
          {question.options.map((option,index) => <label key={question.id+index} className={answers[step]===index?'chosen':''}><input type="radio" name={question.id} value={index} checked={answers[step]===index} onChange={() => setAnswers(previous=>previous.map((value,i)=>i===step?index:value))}/>{option}</label>)}
        </fieldset>
        {error && <p className="error-banner" role="alert">{error}</p>}
        <div className="lesson-actions"><button className="text-button" type="button" disabled={step===0||busy} onClick={()=>setStep(step-1)}><ArrowLeft size={16}/>Anterior</button><button className="button" type="submit" disabled={answers[step]===null||busy}>{busy?'Conferindo…':step===challenge.questions.length-1?'Conferir respostas':'Próxima questão'}<ArrowRight size={17}/></button></div>
      </form>
    </>}
  </section>;
}
