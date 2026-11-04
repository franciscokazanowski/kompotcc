-- Atualização dos títulos da interface. Os identificadores e progressos são preservados.
begin;
update public.learning_modules set title=case id
 when 0 then 'Conhecer o ciclo' when 1 then 'Preparar a rotina' when 2 then 'Cuidar do processo' end where id in (0,1,2);
update public.lessons set title=case id
 when 'ciclo' then 'O ciclo dos resíduos' when 'bokashi' then 'Entendendo o Bokashi'
 when 'preparo' then 'Preparando o recipiente' when 'separacao' then 'Separando os resíduos'
 when 'manejo' then 'Acompanhando o processo' when 'destino' then 'Destino e revisão' end
 where id in ('ciclo','bokashi','preparo','separacao','manejo','destino');
update public.badges set title=case id
 when 'primeiro-passo' then 'Primeiro passo' when 'meio-caminho' then 'Explorador' when 'ciclo-completo' then 'Ciclo completo' end
 where id in ('primeiro-passo','meio-caminho','ciclo-completo');
commit;
