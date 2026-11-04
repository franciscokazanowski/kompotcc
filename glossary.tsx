'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { X, ExternalLink } from 'lucide-react';
import glossary from '@/lib/glossary.json';

type TermId = keyof typeof glossary;
const TermContext = createContext<(term:TermId)=>void>(()=>{});

export function GlossaryProvider({children,scope}:{children:ReactNode;scope:string}) {
 const [term,setTerm]=useState<TermId|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{setTerm(null);dialog.current?.close();},[scope]);
 useEffect(()=>{if(term&&!dialog.current?.open)dialog.current?.showModal();},[term]);
 const entry=term?glossary[term]:null;
 function close(){dialog.current?.close();setTerm(null);}
 return <TermContext.Provider value={setTerm}>{children}
  <dialog ref={dialog} className="term-dialog" aria-labelledby="term-title" onClose={()=>setTerm(null)} onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)close();}}}>
   <button className="icon-button dialog-close" aria-label="Fechar explicação" onClick={close}><X size={22}/></button>
   {entry&&<><span className="eyebrow">EM POUCAS PALAVRAS</span><h2 id="term-title">{entry.title}</h2>{entry.paragraphs.map(text=><p key={text}>{text}</p>)}<details><summary>De onde vem esta informação</summary>{entry.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.name}<ExternalLink size={13}/></a>)}</details><button className="button small" onClick={close}>Entendi</button></>}
   {!entry&&<h2 id="term-title" className="sr-only">Explicação</h2>}
  </dialog>
 </TermContext.Provider>;
}

function Term({id,children}:{id:TermId;children:string}) {
 const open=useContext(TermContext);
 return <button type="button" className="term" aria-haspopup="dialog" aria-label={`Entender: ${children}`} onClick={()=>open(id)}>{children}</button>;
}

const terms:Record<string,TermId>={
 'compostagem':'compostagem','resíduos orgânicos':'organicos','restos orgânicos':'organicos','composto orgânico':'composto',
 'bokashi':'bokashi','farelo inoculado':'farelo','farelo de bokashi':'farelo','farelo para bokashi':'farelo','farelo próprio para bokashi':'farelo','fermentação':'fermentacao','microrganismos':'micro',
 'decomposição':'decomposicao','fermentado':'fermentado','vedação':'vedacao','drenagem':'drenagem','maturação':'maturacao','diluição':'diluicao','diluições':'diluicao','diluir':'diluicao','xp':'xp',
};

// A função é local a cada renderização: só a primeira ocorrência por tela recebe ajuda.
// Não depende de mutação global, acesso ao DOM ou estado do navegador.
export function glossaryRenderer() {
 const used=new Set<TermId>();
 return (text:string):ReactNode => {
  const expression=/(?<![\p{L}\p{N}])(composto orgânico|resíduos orgânicos|restos orgânicos|farelo próprio para Bokashi|farelo para Bokashi|farelo inoculado|farelo de Bokashi|compostagem|Bokashi|fermentação|microrganismos|decomposição|fermentado|vedação|drenagem|maturação|diluição|diluições|diluir|XP)(?![\p{L}\p{N}])/giu;
  const parts:ReactNode[]=[];let cursor=0;
  for(const match of text.matchAll(expression)){
   const id=terms[match[0].toLocaleLowerCase('pt-BR')];
   if(!id||used.has(id))continue;
   parts.push(text.slice(cursor,match.index));parts.push(<Term key={match.index} id={id}>{match[0]}</Term>);
   used.add(id);cursor=match.index!+match[0].length;
  }
  parts.push(text.slice(cursor));return parts;
 };
}
