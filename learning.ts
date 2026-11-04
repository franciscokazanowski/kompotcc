import { lessons, type ReferenceId } from '@/lib/content';
export type ModuleResult = {
    bestScore: number;
    attempts: number;
    passed: boolean;
};
export type ChallengeResult = {
    score: number;
    passed: boolean;
    awarded: boolean;
};
export type ChallengeQuestion = {
    id: string;
    question: string;
    options: string[];
    answer: number;
    explanation: string;
    lesson: string;
    sources: ReferenceId[];
};
export type ModuleChallenge = {
    module: number;
    title: string;
    questions: ChallengeQuestion[];
};
export const PASS_SCORE = 3;
export const CHALLENGE_XP = 50;
export const moduleChallenges: ModuleChallenge[] = [
    { module: 0, title: 'Planeje um ciclo que funciona', questions: [
            { id: 'ciclo-destino', question: 'Ana tem um balde, mas ainda n\u00E3o sabe onde colocar os restos de alimentos depois da fermenta\u00E7\u00E3o. O que ela deve fazer antes de come\u00E7ar?', options: [
                    'Come\u00E7ar e decidir o destino s\u00F3 quando o balde encher.',
                    'Preparar a decomposi\u00E7\u00E3o com terra ou confirmar quem recebe esses restos.',
                    'Planejar coloc\u00E1-los direto nas ra\u00EDzes dos vasos.'
                ], answer: 1, explanation: 'O per\u00EDodo no balde \u00E9 s\u00F3 parte do processo. Ana precisa combinar ou preparar onde os restos de alimentos v\u00E3o terminar de se decompor.', lesson: 'planejamento', sources: ['rhs', 'usask'] },
            { id: 'metodo-ar', question: 'Um v\u00EDdeo manda furar as laterais e deixar a tampa aberta para entrar ar. Isso serve para o balde de Bokashi desta trilha?', options: [
                    'N\u00E3o. Durante a fermenta\u00E7\u00E3o dos restos de alimentos, a tampa fica bem fechada e as laterais n\u00E3o recebem furos para ventilar.',
                    'Sim. Basta usar mais farelo para compensar a tampa aberta.',
                    'Sim. O objetivo \u00E9 manter ar circulando entre os alimentos.'
                ], answer: 0, explanation: 'O Bokashi precisa de pouco ar durante a fermenta\u00E7\u00E3o dos restos de alimentos. Os furos no fundo interno t\u00EAm outra fun\u00E7\u00E3o: deixar o l\u00EDquido passar ao coletor.', lesson: 'bokashi', sources: ['rhs', 'brisbane'] },
            { id: 'ciclo-aspecto', question: 'O balde cumpriu o per\u00EDodo fechado e algumas cascas continuam vis\u00EDveis. S\u00F3 isso quer dizer que deu errado?', options: [
                    'Sim, qualquer casca vis\u00EDvel significa que tudo estragou.',
                    'N\u00E3o; basta triturar as cascas e colocar direto nas ra\u00EDzes.',
                    'N\u00E3o. As cascas podem continuar reconhec\u00EDveis ap\u00F3s a fermenta\u00E7\u00E3o dos alimentos; elas ainda v\u00E3o se decompor com terra ou em outra composteira.'
                ], answer: 2, explanation: 'Fermentar os restos de alimentos no balde n\u00E3o \u00E9 o mesmo que transform\u00E1-los em composto pronto. A apar\u00EAncia de comida pode permanecer nessa fase.', lesson: 'ciclo', sources: ['rhs', 'usask'] },
            { id: 'ciclo-alternar', question: 'Seu balde encheu hoje e vai ficar fechado. Onde colocar as novas sobras de comida de amanh\u00E3?', options: [
                    'No mesmo balde, abrindo s\u00F3 um pouco a tampa.',
                    'Em outro sistema de Bokashi, sem interromper o per\u00EDodo fechado do primeiro.',
                    'No primeiro balde, depois de tirar metade dos restos.'
                ], answer: 1, explanation: 'O primeiro sistema cheio continua fechado, sem receber novos alimentos. Um segundo sistema permite continuar a coleta enquanto os restos do primeiro fermentam.', lesson: 'planejamento', sources: ['rhs', 'usask'] },
        ] },
    { module: 1, title: 'Prepare e separe com atenção', questions: [
            { id: 'montagem-drenar', question: 'Voc\u00EA est\u00E1 montando dois baldes encaixados. Qual op\u00E7\u00E3o mant\u00E9m os alimentos separados do l\u00EDquido?', options: [
                    'Furos no fundo do balde de dentro; balde de fora retendo o l\u00EDquido e tampa bem fechada.',
                    'Furos no fundo dos dois baldes, deixando o l\u00EDquido sair pelo ch\u00E3o.',
                    'Furos na tampa e nas laterais para o cheiro escapar.'
                ], answer: 0, explanation: 'O balde interno segura os alimentos e deixa o l\u00EDquido passar pelo fundo. O externo coleta o l\u00EDquido; a tampa e os encaixes precisam fechar sem frestas.', lesson: 'montagem', sources: ['diy', 'brisbane'] },
            { id: 'separar-sopa', question: 'Sobrou arroz com caldo em um pote pl\u00E1stico. O que vai para o Bokashi?', options: [
                    'Tudo junto, porque o farelo tamb\u00E9m trata a embalagem.',
                    'S\u00F3 o caldo, para molhar o interior do balde.',
                    'A parte s\u00F3lida dos alimentos, depois de separar o pote e escorrer o caldo.'
                ], answer: 2, explanation: 'O pote pl\u00E1stico fica fora, e o caldo \u00E9 separado. A parte s\u00F3lida da comida pode entrar, seguida do farelo pr\u00F3prio para Bokashi, press\u00E3o e fechamento.', lesson: 'separacao', sources: ['rhs'] },
            { id: 'preparo-farelo', question: 'O farelo pr\u00F3prio para Bokashi acabou. Voc\u00EA s\u00F3 tem serragem comum. O que faz antes de colocar uma nova camada de alimentos?', options: [
                    'Troca o farelo por serragem comum na mesma quantidade.',
                    'Rep\u00F5e o farelo pr\u00F3prio para Bokashi antes de acrescentar a nova camada.',
                    'Coloca \u00E1gua no lugar do farelo.'
                ], answer: 1, explanation: 'O farelo pr\u00F3prio cont\u00E9m os microrganismos usados para fermentar os alimentos. Serragem comum e \u00E1gua n\u00E3o substituem esse produto.', lesson: 'preparo', sources: ['rhs', 'brisbane'] },
            { id: 'preparo-camada', question: 'Voc\u00EA j\u00E1 retirou as embalagens e cortou os peda\u00E7os grandes. Qual \u00E9 a sequ\u00EAncia para fazer a camada no balde?', options: [
                    'Distribuir os alimentos, espalhar farelo pr\u00F3prio para Bokashi, pressionar e fechar a tampa.',
                    'Distribuir os alimentos, colocar \u00E1gua e deixar a tampa aberta.',
                    'Colocar os alimentos dentro de um saco pl\u00E1stico fechado no balde.'
                ], answer: 0, explanation: 'O farelo ajuda na fermenta\u00E7\u00E3o dos restos de alimentos. A press\u00E3o reduz os espa\u00E7os de ar, e a tampa mant\u00E9m o balde bem fechado entre as adi\u00E7\u00F5es.', lesson: 'preparo', sources: ['rhs', 'usask'] },
        ] },
    { module: 2, title: 'Resolva situações do dia a dia', questions: [
            { id: 'manejo-cheiro', question: 'O balde est\u00E1 com cheiro de comida apodrecida e h\u00E1 l\u00EDquido acumulado no coletor. Que cuidados voc\u00EA deve conferir?', options: [
                    'Colocar serragem comum e revirar para entrar ar.',
                    'Esperar mais duas semanas sem retirar o l\u00EDquido.',
                    'Retirar o l\u00EDquido, conferir farelo, pressionar os alimentos e fechar sem frestas.'
                ], answer: 2, explanation: 'O l\u00EDquido acumulado e o fechamento ruim podem atrapalhar o processo. Confira esses cuidados e o farelo; se grande parte dos restos j\u00E1 estiver estragada, interrompa o ciclo e recomece com o sistema limpo.', lesson: 'diagnostico', sources: ['rhs', 'brisbane'] },
            { id: 'manejo-liquido', question: 'O manual do seu kit e uma postagem recomendam dilui\u00E7\u00F5es diferentes para o l\u00EDquido do balde. Qual orienta\u00E7\u00E3o seguir?', options: [
                    'A receita mais concentrada, porque o l\u00EDquido \u00E9 natural.',
                    'A orienta\u00E7\u00E3o do seu pr\u00F3prio sistema; o l\u00EDquido n\u00E3o deve ser aplicado puro nas plantas.',
                    'Qualquer receita, porque a mesma dilui\u00E7\u00E3o serve para todos os sistemas.'
                ], answer: 1, explanation: 'Diluir \u00E9 misturar o l\u00EDquido com \u00E1gua na propor\u00E7\u00E3o orientada para a aplica\u00E7\u00E3o. A propor\u00E7\u00E3o varia entre sistemas; n\u00E3o copie uma receita como se servisse para todos.', lesson: 'manejo', sources: ['rhs', 'brisbane'] },
            { id: 'destino-raizes', question: 'Terminou o per\u00EDodo de fermenta\u00E7\u00E3o dos alimentos no balde. Voc\u00EA j\u00E1 pode colocar esses restos nas ra\u00EDzes de uma muda?', options: [
                    'Ainda n\u00E3o. Primeiro eles precisam se decompor com terra ou em outra composteira, longe das ra\u00EDzes.',
                    'Sim, basta despejar os restos ao redor das ra\u00EDzes.',
                    'Sim, basta misturar no vaso e plantar no mesmo dia.'
                ], answer: 0, explanation: 'Os restos rec\u00E9m-retirados do balde ainda est\u00E3o \u00E1cidos. A decomposi\u00E7\u00E3o com terra ou em outra composteira acontece antes do uso no cultivo.', lesson: 'destino', sources: ['rhs', 'usask'] },
            { id: 'diagnostico-mofo', question: 'Grande parte dos restos est\u00E1 coberta de mofo verde ou preto e o cheiro est\u00E1 ruim. O que fazer?', options: [
                    'Cobrir com terra e usar imediatamente nas plantas.',
                    'Retirar s\u00F3 uma colher e continuar colocando alimentos.',
                    'Parar as adi\u00E7\u00F5es, destinar os restos a uma compostagem que aceite receb\u00EA-los e recome\u00E7ar com o balde limpo.'
                ], answer: 2, explanation: 'Muito mofo escuro junto com cheiro ruim pede interromper esse ciclo. N\u00E3o aplique esses restos direto nas plantas e confira os cuidados de farelo, retirada do l\u00EDquido e fechamento antes de recome\u00E7ar.', lesson: 'diagnostico', sources: ['rhs'] },
        ] },
];
export type LearningBadge = {
    id: string;
    name: string;
    text: string;
    at: number;
    module?: number;
    allModules?: boolean;
};
export const badges: LearningBadge[] = [
    { id: 'primeiro-passo', name: 'Primeiro passo', text: 'Conclua sua primeira lição.', at: 1 },
    { id: 'meio-caminho', name: 'Explorador', text: 'Conclua três lições.', at: 3 },
    { id: 'ciclo-completo', name: 'Base consolidada', text: 'Conclua seis lições.', at: 6 },
    { id: 'trilha-completa', name: 'Jornada Bokashi', text: 'Conclua as nove lições.', at: 9 },
    { id: 'desafio-ciclo', name: 'Ciclo planejado', text: 'Acerte pelo menos três questões no desafio Conhecer o ciclo.', at: 3, module: 0 },
    { id: 'desafio-preparo', name: 'Preparo consciente', text: 'Acerte pelo menos três questões no desafio Preparar a rotina.', at: 3, module: 1 },
    { id: 'desafio-manejo', name: 'Olhar de cuidado', text: 'Acerte pelo menos três questões no desafio Cuidar do processo.', at: 3, module: 2 },
    { id: 'pratica-completa', name: 'Bokashi na prática', text: 'Conclua as nove lições e os três desafios de módulo.', at: 9, allModules: true },
];
export function moduleIsReady(module: number, completed: string[]) {
    return lessons.filter(lesson => lesson.module === module).every(lesson => completed.includes(lesson.id));
}
export function badgeIsEarned(badge: LearningBadge, completed: string[], results: Record<string, ModuleResult>) {
    return completed.length >= badge.at &&
        (badge.module === undefined || results[badge.module]?.passed === true) &&
        (!badge.allModules || moduleChallenges.every(challenge => results[challenge.module]?.passed === true));
}
export function levelFor(xp: number) {
    return xp >= 300 ? 'Guardião do ciclo' : xp >= 150 ? 'Cultivador' : xp >= 75 ? 'Explorador' : 'Semente';
}
