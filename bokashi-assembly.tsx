'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const steps = [
  {
    "title": "Separe dois baldes e uma tampa",
    "text": "Escolha dois baldes próprios para contato com alimentos que encaixem firmemente. O de dentro recebe os alimentos; o de fora recolhe o líquido. Separe uma tampa que feche o balde de dentro.",
    "reason": "Dois baldes encaixados formam um único sistema. Para receber novas sobras enquanto esse sistema cheio fica fechado, você precisará de outro sistema completo.",
    "alt": "Balde interno claro, balde coletor verde, tampa e peças da torneira separados na bancada."
  },
  {
    "title": "Fure só o fundo do balde de dentro",
    "text": "Faça pequenos furos de passagem no fundo do balde que vai receber os alimentos. Mantenha as laterais e a tampa sem furos para ventilar. Peça ajuda para perfurar se não tiver prática.",
    "reason": "Esses furos deixam o líquido passar para o coletor. O fundo do balde de fora fica sem furos, para reter o líquido.",
    "alt": "Balde interno claro virado para baixo, com furos somente na base; furadeira desligada ao lado."
  },
  {
    "title": "Encaixe e confira o espaço embaixo",
    "text": "Coloque o balde de dentro no balde de fora. Confira se sobra espaço abaixo do fundo furado para recolher o líquido e se o encaixe fica firme.",
    "reason": "Os alimentos ficam no balde de dentro e não devem ficar mergulhados no líquido do coletor. O desenho abaixo mostra a separação entre os dois espaços.",
    "alt": "Duas mãos encaixam o balde claro dentro do balde coletor verde."
  },
  {
    "title": "Organize a retirada do líquido",
    "text": "Se usar torneira, instale no balde de fora, abaixo do fundo interno, com as peças de vedação indicadas para ela. Não existe uma medida única de furo ou de altura para todos os baldes.",
    "reason": "Sem torneira, a retirada exige levantar o balde de dentro com cuidado e esvaziar o coletor. Escolha a opção que você consegue usar com firmeza.",
    "alt": "Torneira instalada na parte baixa do balde coletor verde; o balde interno está separado ao fundo."
  },
  {
    "title": "Teste com água, ainda sem alimentos",
    "text": "Coloque um pouco de água no sistema vazio. Confira se ela passa do fundo interno para o coletor e se há vazamentos. Se houver torneira, teste também a abertura e o fechamento.",
    "reason": "Retire toda a água do teste antes de usar. Depois que os alimentos entrarem, a drenagem será a retirada do líquido que eles produzirem; não é para adicionar água.",
    "alt": "Teste com água no sistema vazio, com o líquido recolhido pela torneira em um pote."
  },
  {
    "title": "Confira a tampa bem fechada",
    "text": "Encaixe a tampa no balde que vai receber os alimentos. Confira se tampa e encaixe fecham sem frestas. Esse bom fechamento é chamado de vedação.",
    "reason": "A montagem está conferida. Antes de começar a usar, tenha farelo próprio para Bokashi e defina onde os restos de alimentos vão se decompor depois de sair do balde.",
    "alt": "Mãos fechando a tampa verde sobre o balde interno, encaixado no coletor verde."
  }
];

function Bucket({ x, y, width=150, height=170, holes=false, collector=false }: {x:number;y:number;width?:number;height?:number;holes?:boolean;collector?:boolean}) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M0 15 L${width*.12} ${height-15} Q${width/2} ${height+8} ${width*.88} ${height-15} L${width} 15 Z`} fill={collector?'#e0e7d7':'#fdfcf7'} stroke="#2e4631" strokeWidth="3"/>
    <ellipse cx={width/2} cy="15" rx={width/2} ry="14" fill="#edf0e4" stroke="#2e4631" strokeWidth="3"/>
    {holes && <><ellipse cx={width/2} cy={height-23} rx={width*.34} ry="12" fill="#edf0e4" stroke="#2e4631" strokeWidth="2"/>{[-2,-1,0,1,2].map(index=><circle key={index} cx={width/2+index*width*.105} cy={height-23} r="4" fill="#a75f43"/>)}</>}
  </g>;
}

export function AssemblyDrawing({ step }: {step:number}) {
  return <svg viewBox="0 0 520 330" role="img" aria-label={steps[step].title} className="assembly-drawing">
    <title>{steps[step].title}</title><desc>{steps[step].text}</desc>
    <defs><marker id={`drain-arrow-${step}`} markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#6d9589" strokeWidth="1.5"/></marker></defs>
    <rect x="0" y="0" width="520" height="330" rx="12" fill="#f1f0e6"/>
    {step===0 ? <>
      <Bucket x={55} y={100}/><Bucket x={315} y={100} collector/>
      <g transform="translate(43 59)"><rect width="174" height="14" rx="7" fill="#2e4631"/><ellipse cx="87" cy="1" rx="87" ry="10" fill="#496049"/></g>
      <text x="130" y="306" textAnchor="middle">Balde interno + tampa</text><text x="390" y="306" textAnchor="middle">Balde coletor</text>
    </> : step===1 ? <>
      <Bucket x={160} y={35} width={200} height={230} holes/>
      {[221,260,299].map(x=><path key={x} d={`M${x} 275V305`} stroke="#6d9589" strokeWidth="3" markerEnd={`url(#drain-arrow-${step})`}/>)}
      <path d="M320 243H434" stroke="#a75f43" strokeWidth="2"/><circle cx="320" cy="243" r="5" fill="#a75f43"/>
      <text x="434" y="224" textAnchor="middle">Furos no fundo</text>
    </> : <>
      <Bucket x={125} y={83} width={270} height={215} collector/>
      {step!==5 && <path d="M160 272Q260 292 360 272L359 283Q260 306 161 283Z" fill="#a4bcb1"/>}
      <Bucket x={130} y={44} width={260} height={207} holes/>
      <path d="M125 98H137M383 98H395" stroke="#496049" strokeWidth="8" strokeLinecap="round"/>
      {step<5 && [230,260,290].map(x=><path key={x} d={`M${x} 255V275`} stroke="#6d9589" strokeWidth="2" markerEnd={`url(#drain-arrow-${step})`}/>)}
      {step>=3 && <g><path d="M365 268H425V285H440" stroke="#2e4631" strokeWidth="12" fill="none" strokeLinejoin="round"/><path d="M408 252H434" stroke="#a75f43" strokeWidth="7" strokeLinecap="round"/><path d="M422 252V265" stroke="#a75f43" strokeWidth="5"/>
        <path d="M419 302L423 322H463L468 302" fill="#fdfcf7" stroke="#2e4631" strokeWidth="2"/>
        {step===4 && <path d="M440 289V308" stroke="#6d9589" strokeWidth="3" strokeDasharray="3 4"/>}
      </g>}
      {step===2 && <><path d="M283 275H449" stroke="#6d9589" strokeWidth="2"/><text x="450" y="235" textAnchor="middle">Espaço de<tspan x="450" dy="20">coleta</tspan></text></>}
      {step===4 && <g transform="translate(87 23) rotate(-16)"><path d="M0 0H45V38H0Z" fill="#a4bcb1" stroke="#2e4631" strokeWidth="2"/><path d="M44 7Q77 8 54 30" fill="none" stroke="#2e4631" strokeWidth="2"/><path d="M45 38Q85 51 97 84" fill="none" stroke="#6d9589" strokeWidth="3" strokeDasharray="4 5"/></g>}
      {step===5 && <><rect x="121" y="43" width="278" height="18" rx="9" fill="#2e4631"/><ellipse cx="260" cy="43" rx="139" ry="12" fill="#496049"/><circle cx="406" cy="75" r="27" fill="#2e4631"/><path d="M393 75L402 84L420 65" fill="none" stroke="#f8f6ef" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>}
    </>}
  </svg>;
}

export function BokashiAssembly() {
  const [step,setStep]=useState(0);
  const current=steps[step];
  return <section className="assembly-guide" aria-label="Montagem do sistema com baldes">
    <div className="section-heading"><h3>Monte seu sistema, passo a passo</h3><span className="small-text muted">{step+1} de {steps.length}</span></div>
    <nav className="assembly-step-nav" aria-label="Etapas de montagem">{steps.map((item,index)=><button key={item.title} aria-current={index===step?'step':undefined} aria-label={`Etapa ${index+1}: ${item.title}`} onClick={()=>setStep(index)}>{index+1}</button>)}</nav>
    <figure><img className="assembly-art" src={`/illustrations/montagem-${String(step+1).padStart(2,'0')}.webp`} width="1200" height="800" alt={current.alt} decoding="async"/>
     <figcaption aria-live="polite"><h4>{current.title}</h4><p>{current.text}</p><div className="assembly-reason">{current.reason}</div></figcaption>
    </figure>
    {[1,2,3,4].includes(step)&&<details key={step} className="assembly-structure" open={step===2}><summary>Entenda a posição das peças por dentro</summary><AssemblyDrawing step={step}/><p className="assembly-note">Esquema sem escala: fundo interno furado; espaço de coleta abaixo; parte externa que retém o líquido. As medidas dependem das peças escolhidas.</p></details>}
    <div className="assembly-actions"><button className="text-button" disabled={step===0} onClick={()=>setStep(step-1)}><ArrowLeft size={16}/>Anterior</button>{step<steps.length-1?<button className="button small" onClick={()=>setStep(step+1)}>Próxima etapa<ArrowRight size={16}/></button>:<span className="assembly-end"><Check size={16}/>Montagem conferida · siga para o preparo</span>}</div>
    <p className="assembly-note">Nas artes, o balde claro fica dentro do verde. Os desenhos ajudam a reconhecer as peças; confira o encaixe real, a tampa e as instruções da torneira antes de usar.</p>
  </section>;
}
