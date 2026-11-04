import type { ReactNode } from 'react';
import { ChevronRight, CircleAlert } from 'lucide-react';
import type { LessonGuide, Visual } from '@/lib/lesson-guides';

const pictures:Record<Visual,{file:string;alt:string}>={
 alimentos:{file:'alimentos',alt:'Cascas de banana e laranja, aparas de legumes e borra de café separados em uma tigela.'},
 solo:{file:'solo',alt:'Composto escuro e bem decomposto em uma pá, ao lado de uma planta cultivada em solo.'},
 balde:{file:'balde',alt:'Balde de Bokashi fechado, farelo próprio e colher de medida.'},
 local:{file:'local',alt:'Balde fechado sobre uma superfície firme, em um canto interno acessível e sem sol direto.'},
 materiais:{file:'materiais',alt:'Farelo próprio para Bokashi, colher de medida, utensílio para pressionar e pote coletor.'},
 destino:{file:'terra',alt:'Recipiente separado onde os restos de alimentos retirados do balde de Bokashi são misturados com terra e cobertos com mais terra.'},
 separar:{file:'separar',alt:'Restos de alimentos na tigela, separados de uma embalagem, uma etiqueta e uma cápsula de café vazia.'},
 escorrer:{file:'escorrer',alt:'Alimentos sólidos no escorredor; o caldo cai em outra tigela e fica separado.'},
 fechar:{file:'fechar',alt:'Duas mãos pressionando a tampa para fechar o balde de Bokashi.'},
 calendario:{file:'calendario',alt:'Balde fechado junto de um calendário e lápis para registrar a data do enchimento.'},
 sinais:{file:'balde',alt:'Sistema de Bokashi fechado; os sinais do conteúdo são observados durante o manejo.'},
 revisar:{file:'fechar',alt:'Conferência do encaixe da tampa, pressionada contra a borda do balde.'},
 farelo:{file:'farelo',alt:'Uma mão espalha farelo próprio para Bokashi sobre uma camada de alimentos.'},
 drenagem:{file:'drenagem',alt:'Pote diretamente sob a torneira do balde fechado, recolhendo o líquido produzido no processo.'},
 terra:{file:'terra',alt:'Mistura dos restos de alimentos após a fermentação no balde com terra em um recipiente separado, ainda sem plantas.'},
 pressionar:{file:'pressionar',alt:'Utensílio de madeira pressiona a camada de alimentos com farelo dentro do balde.'},
};

export function LessonPicture({kind}:{kind:Visual;label?:string}) {
 const picture=pictures[kind];
 return <img src={`/illustrations/${picture.file}.webp`} width="1200" height="800" alt={picture.alt} loading="lazy" decoding="async"/>;
}

export function VisualLesson({guide,text,children}:{guide:LessonGuide;text:(s:string)=>ReactNode;children?:ReactNode}) {
 return <>
  <p className="visual-summary">{text(guide.summary)}</p>
  {guide.concepts&&<section className="lesson-concepts" aria-label="Antes do passo a passo">{guide.concepts.map(concept=><div key={concept.name}><h3>{concept.name}</h3><p>{text(concept.meaning)}</p></div>)}</section>}
  {children}
  {guide.steps.length>0&&<ol className="visual-steps" aria-label="Passo a passo da lição">{guide.steps.map((step,index)=><li key={step.title}><div className="step-picture"><LessonPicture kind={step.visual} label={step.title}/></div><div className="step-copy"><span className="step-number">{String(index+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{text(step.text)}</p></div></li>)}</ol>}
  <aside className="essential-care"><CircleAlert size={20} aria-hidden="true"/><div><strong>Para dar certo</strong><p>{text(guide.care)}</p></div></aside>
  {guide.example&&<section className="lesson-example"><h3>Um exemplo do dia a dia</h3><p>{text(guide.example)}</p></section>}
  <details className="lesson-more"><summary>{guide.detailTitle}<ChevronRight size={16}/></summary><div>{guide.details.map(item=><p key={item}>{text(item)}</p>)}</div></details>
 </>;
}
