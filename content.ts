import { additionalLessons } from '@/lib/additional-content';
export const SOURCE = 'https://extension.wsu.edu/kitsap/bokashi-composting/';
export const RHS = 'https://www.rhs.org.uk/garden-inspiration/get-gardening/bokashi';
export const MMA = 'https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/saneamento/protegeer/biblioteca/CompostagemDomsticaComunitriaeInstitucionaldeResduosOrgnicosMMA.pdf';
export const WELLINGTON = 'https://wellington.govt.nz/-/media/rubbish-recycling-and-waste/reducing-your-waste/composting/files/bokashi-guide.pdf?hash=EA20EB46CA8F89477EF787189D59AAFD8B67755E&la=en';
export type ReferenceId = 'mma' | 'wsu' | 'rhs' | 'fauth' | 'wellington' | 'usask' | 'brisbane' | 'diy' | 'composto' | 'mofga' | 'redland';
export const references: Record<ReferenceId, {
    author: string;
    title: string;
    detail: string;
    url: string;
}> = {
    mofga: { author: 'Maine Organic Farmers and Gardeners Association', title: 'Homemade Bokashi Bucket', detail: 'Relato de construção com baldes próprios para alimentos, fundo interno furado, tampa e torneira no coletor.', url: 'https://www.mofga.org/resources/compost/homemade-bokashi-bucket/' },
    redland: { author: 'Redland City Council', title: 'Composting — How to make your own bokashi bin', detail: 'Montagem com baldes encaixados, passagem de líquido pelo fundo interno e retirada pelo coletor.', url: 'https://www.redland.qld.gov.au/Environment-and-sustainability/Green-living/Composting' },
    composto: { author: 'Royal Horticultural Society', title: 'Composting', detail: 'Conceito de composto e contribuição para o solo e o cultivo.', url: 'https://www.rhs.org.uk/soil-composts-mulches/composting' },
    usask: { author: 'University of Saskatchewan · Gardening at USask', title: 'Bokashi composting (indoor method)', detail: 'Guia de planejamento, fermentação e tratamento com terra, 2022.', url: 'https://gardening.usask.ca/articles-and-lists/articles-healthysoils/bokashi.php' },
    brisbane: { author: 'Brisbane City Council', title: 'Compost at home — Use a bokashi system', detail: 'Características do recipiente, drenagem, uso e solução de problemas.', url: 'https://www.brisbane.qld.gov.au/environment-and-water/plants--trees-and-gardening/compost-at-home' },
    diy: { author: 'Lorin Nielsen · revisão de Sarah Jay · Epic Gardening', title: 'Bokashi Compost Buckets: An Easy DIY Method', detail: 'Construção com dois baldes, drenagem e vedação; atualização de 2025.', url: 'https://www.epicgardening.com/bokashi-compost-buckets/' },
    mma: { author: 'Ministério do Meio Ambiente', title: 'Compostagem doméstica, comunitária e institucional de resíduos orgânicos', detail: 'Manual de orientação, 2017. Separação na fonte e alternativas de tratamento, p. 20–23 e 34–36.', url: MMA },
    wsu: { author: 'Washington State University · WSU Extension', title: 'Bokashi Composting', detail: 'Guia de fermentação, manejo, solução de problemas e tratamento posterior.', url: SOURCE },
    rhs: { author: 'Royal Horticultural Society', title: 'How to recycle food waste with bokashi', detail: 'Materiais aceitos, preparo, fermentação e uso no solo.', url: RHS },
    fauth: { author: 'Glenda Fauth · IFSC', title: 'Relatório técnico para a Prefeitura Municipal de Garopaba', detail: 'Compostagem de resíduos orgânicos e redução de gases de efeito estufa, 2024, p. 115–118.', url: 'https://www.ifsc.edu.br/documents/d/pesquisa-e-inovacao/ptt-relatorio-de-pesquisa_glenda_fauth-2-' },
    wellington: { author: 'Wellington City Council', title: 'Bokashi guide', detail: 'Resíduos aceitos, incluindo borra de café e chá.', url: WELLINGTON },
};
export type Lesson = {
    id: string;
    module: number;
    title: string;
    time: string;
    intro: string;
    paragraphs: string[];
    sections: {
        title: string;
        steps: string[];
    }[];
    takeaway: string;
    sources: ReferenceId[];
    question: string;
    options: string[];
    answer: number;
    explanation: string;
};
export const modules = ['Conhecer o ciclo', 'Preparar a rotina', 'Cuidar do processo'];
const initialLessons: Lesson[] = [
    {
        id: 'ciclo', module: 0, title: 'O ciclo dos resíduos', time: '3 min',
        intro: 'O caminho dos restos de alimentos at\u00E9 o cultivo.',
        paragraphs: [
            'Compostagem \u00E9 a transforma\u00E7\u00E3o de restos de alimentos e outros materiais org\u00E2nicos em composto. Esse composto \u00E9 um material que ajuda a melhorar o solo usado no cultivo.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Separe os restos de alimentos: Junte cascas, talos e sobras de comida. Retire embalagens, adesivos e outros materiais que n\u00E3o sejam alimentos.',
                    'Conhe\u00E7a o come\u00E7o do Bokashi: Bokashi \u00E9 um m\u00E9todo em que os restos de alimentos passam por uma fermenta\u00E7\u00E3o dentro de um balde fechado. Eles ficam \u00E1cidos, mas podem continuar parecendo comida.',
                    'Continue o processo com terra: Depois de fermentar no balde, os restos de alimentos precisam se decompor com terra ou em outra composteira. S\u00F3 depois dessa decomposi\u00E7\u00E3o eles podem ser aproveitados no cultivo.'
                ]
            }
        ],
        takeaway: 'As cascas ainda estarem vis\u00EDveis depois da fermenta\u00E7\u00E3o no balde n\u00E3o significa, por si s\u00F3, que deu errado. Sair do balde tamb\u00E9m n\u00E3o significa que o composto j\u00E1 est\u00E1 pronto.',
        sources: [
            'mma',
            'composto',
            'rhs',
            'usask'
        ],
        question: 'Depois da fermenta\u00E7\u00E3o dos restos de alimentos no balde, o que voc\u00EA faz com eles?',
        options: [
            'Coloca direto junto \u00E0s ra\u00EDzes de qualquer vaso.',
            'Mistura com terra ou leva a uma composteira que aceite esses restos, para terminar a decomposi\u00E7\u00E3o.',
            'Deixa os restos descobertos sobre o ch\u00E3o.'
        ],
        answer: 1,
        explanation: 'Os restos ainda podem estar \u00E1cidos e com cascas vis\u00EDveis. Depois do balde, eles precisam se decompor com terra ou em outra composteira antes do cultivo.'
    },
    {
        id: 'bokashi', module: 0, title: 'Entendendo o Bokashi', time: '3 min',
        intro: 'O que acontece com os alimentos no balde?',
        paragraphs: [
            'No Bokashi, usamos um produto pr\u00F3prio para ajudar na fermenta\u00E7\u00E3o dos restos de alimentos: o farelo para Bokashi. Ele deve estar separado antes de voc\u00EA come\u00E7ar.',
            'O que \u00E9 esse farelo? \u00C9 um produto com microrganismos, seres muito pequenos, como algumas bact\u00E9rias, que ajudam a fermentar os restos de alimentos. O produto \u00E9 preparado para essa finalidade.',
            'E \u201Cfarelo inoculado\u201D? \u00C9 outro nome que pode aparecer no produto. \u201CInoculado\u201D significa que o farelo recebeu esses microrganismos. Farelo comum de cozinha ou serragem comum n\u00E3o fazem a mesma fun\u00E7\u00E3o.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Espalhe o farelo nos alimentos: A cada nova camada de restos de alimentos, distribua o farelo para Bokashi. A quantidade depende do produto: siga o r\u00F3tulo.',
                    'Pressione e mantenha fechado: A fermenta\u00E7\u00E3o dos restos de alimentos acontece com pouca presen\u00E7a de ar. Pressione a camada e feche bem; n\u00E3o fa\u00E7a furos na tampa ou nas laterais para ventilar.',
                    'Conte o tempo depois de encher: Quando o balde encher, anote a data. Mantenha-o fechado, sem novos alimentos, por pelo menos duas semanas; continue retirando o l\u00EDquido que se acumular.',
                    'Depois do balde, use terra: Misture os restos de alimentos ap\u00F3s a fermenta\u00E7\u00E3o com terra ou leve-os a uma composteira que aceite receb\u00EA-los. \u00C9 fora do balde que eles terminam de se decompor.'
                ]
            }
        ],
        takeaway: 'Fermenta\u00E7\u00E3o dos restos de alimentos \u00E9 a transforma\u00E7\u00E3o que ocorre no balde com a ajuda dos microrganismos do farelo. Essa transforma\u00E7\u00E3o deixa os restos \u00E1cidos; ela n\u00E3o produz composto pronto dentro do balde.',
        sources: [
            'rhs',
            'usask'
        ],
        question: 'Como acontece a fermenta\u00E7\u00E3o dos restos de alimentos no Bokashi?',
        options: [
            'Com farelo pr\u00F3prio para Bokashi e o balde bem fechado entre as adi\u00E7\u00F5es.',
            'Com a tampa aberta e os alimentos revirados todos os dias.',
            'Com apenas \u00E1gua, sem usar farelo pr\u00F3prio para Bokashi.'
        ],
        answer: 0,
        explanation: 'O farelo pr\u00F3prio traz os microrganismos que ajudam a fermentar os restos de alimentos. Pressionar e fechar reduz a entrada de ar nesse processo.'
    },
    {
        id: 'preparo', module: 1, title: 'Preparando o recipiente', time: '4 min',
        intro: 'Alimentos, farelo, press\u00E3o e tampa fechada.',
        paragraphs: [
            'Confira se a torneira est\u00E1 fechada e a tampa encaixa sem frestas. Separe o farelo pr\u00F3prio para Bokashi: \u00E9 o produto com microrganismos que ajudam na fermenta\u00E7\u00E3o dos restos de alimentos.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Comece pela parte s\u00F3lida: Coloque farelo no fundo conforme o r\u00F3tulo. Retire embalagens, escorra o caldo das sobras que tiverem l\u00EDquido e corte peda\u00E7os grandes antes de fazer a camada de alimentos.',
                    'Espalhe o farelo por cima: Distribua o farelo para Bokashi sobre a nova camada de alimentos. A dose vem no r\u00F3tulo; farelo comum e serragem comum n\u00E3o substituem esse produto.',
                    'Pressione a camada: Use um utens\u00EDlio para apertar os alimentos e reduzir os espa\u00E7os de ar entre eles. N\u00E3o \u00E9 para revirar a mistura.',
                    'Limpe a borda e feche: Retire os restos presos na borda e encaixe bem a tampa. Deixe o balde fechado entre as adi\u00E7\u00F5es de alimentos.'
                ]
            }
        ],
        takeaway: 'Se o farelo pr\u00F3prio para Bokashi acabar, reponha o produto antes de acrescentar novas camadas. N\u00E3o substitua por farelo de cozinha, serragem comum ou \u00E1gua.',
        sources: [
            'rhs',
            'usask'
        ],
        question: 'O que precisa estar preparado para come\u00E7ar as camadas de alimentos?',
        options: [
            'Um balde aberto e os restos ainda misturados \u00E0s embalagens.',
            'Um balde com tampa, mesmo sem farelo e sem destino para os restos.',
            'Um sistema que feche bem e permita retirar o l\u00EDquido, farelo pr\u00F3prio para Bokashi e um destino para os restos depois do balde.'
        ],
        answer: 2,
        explanation: 'Separe o sistema, o farelo pr\u00F3prio e o destino antes de come\u00E7ar. Cada nova camada recebe alimentos, farelo, press\u00E3o com um utens\u00EDlio e tampa bem fechada.'
    },
    {
        id: 'separacao', module: 1, title: 'Separando os resíduos', time: '3 min',
        intro: 'Separe o alimento da embalagem e do caldo.',
        paragraphs: [
            'Cascas, talos, borra de caf\u00E9 e sobras de comida podem entrar no Bokashi. Comida cozida, carne e latic\u00EDnios tamb\u00E9m s\u00E3o aceitos nesse m\u00E9todo, com os cuidados abaixo.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Retire o que n\u00E3o \u00E9 alimento: Tire embalagens, etiquetas, talheres e c\u00E1psulas. A borra de caf\u00E9 entra sem a c\u00E1psula de pl\u00E1stico ou metal.',
                    'Escorra s\u00F3 quando houver caldo: Se as sobras tiverem caldo, escorra e aproveite a parte s\u00F3lida. N\u00E3o coloque sopa l\u00EDquida, grandes volumes de \u00F3leo ou outros l\u00EDquidos livres no balde.',
                    'Confira a condi\u00E7\u00E3o dos restos: Deixe fora alimentos j\u00E1 muito mofados ou com cheiro de podre e ossos grandes. Corte peda\u00E7os grandes dos alimentos aceitos para facilitar a forma\u00E7\u00E3o das camadas.'
                ]
            }
        ],
        takeaway: 'O farelo n\u00E3o transforma embalagens em composto. Produtos de limpeza, pl\u00E1stico, vidro e metal ficam fora do balde. As orienta\u00E7\u00F5es desta trilha s\u00E3o para Bokashi; um minhoc\u00E1rio tem outros cuidados.',
        sources: [
            'rhs',
            'mma',
            'wellington'
        ],
        question: 'Qual destes materiais deve ficar fora do balde de Bokashi?',
        options: [
            'Casca de vegetal sem embalagem.',
            'Embalagem pl\u00E1stica.',
            'Borra de caf\u00E9 retirada da c\u00E1psula.'
        ],
        answer: 1,
        explanation: 'O Bokashi trata restos de alimentos. Pl\u00E1stico n\u00E3o vira composto nesse processo; retire a embalagem antes de colocar a comida no balde.'
    },
    {
        id: 'manejo', module: 2, title: 'Acompanhando o processo', time: '4 min',
        intro: 'Retire o l\u00EDquido que os alimentos produzem.',
        paragraphs: [
            'Durante a fermenta\u00E7\u00E3o dos restos de alimentos, pode se acumular l\u00EDquido no coletor. Retirar esse l\u00EDquido \u00E9 fazer a drenagem. A tampa permanece bem fechada entre as adi\u00E7\u00F5es.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Ponha o pote sob a torneira: Confira o coletor a cada dois ou tr\u00EAs dias. Abra a torneira do pr\u00F3prio balde, recolha o l\u00EDquido e feche novamente; confira diariamente se houver muito l\u00EDquido.',
                    'Confira o fechamento: Limpe a borda e encaixe a tampa sem frestas. Esse bom fechamento \u00E9 a veda\u00E7\u00E3o; ele reduz a entrada de ar durante a fermenta\u00E7\u00E3o dos alimentos.',
                    'Ao encher, anote a data: Deixe o balde cheio fechado, sem novos alimentos, por pelo menos duas semanas. Continue retirando o l\u00EDquido; as pr\u00F3ximas sobras v\u00E3o para outro sistema.'
                ]
            }
        ],
        takeaway: 'N\u00E3o coloque \u00E1gua para drenar: voc\u00EA est\u00E1 retirando o l\u00EDquido que os alimentos produziram. N\u00E3o use esse l\u00EDquido puro nas plantas. Diluir \u00E9 misturar esse l\u00EDquido com \u00E1gua na propor\u00E7\u00E3o indicada para a aplica\u00E7\u00E3o. Siga o manual do seu sistema; receitas de outro kit n\u00E3o s\u00E3o uma regra geral.',
        sources: [
            'rhs',
            'usask'
        ],
        question: 'Durante o uso do Bokashi, como voc\u00EA retira o l\u00EDquido acumulado no coletor?',
        options: [
            'Acrescenta \u00E1gua no balde e deixa a tampa aberta.',
            'Revolve os alimentos para o l\u00EDquido evaporar.',
            'Coloca um pote sob a torneira do pr\u00F3prio balde, recolhe o l\u00EDquido e fecha novamente.'
        ],
        answer: 2,
        explanation: 'Retirar o l\u00EDquido acumulado \u00E9 fazer a drenagem. Voc\u00EA n\u00E3o acrescenta \u00E1gua: recolhe o l\u00EDquido que os alimentos produziram e fecha a torneira ao terminar.'
    },
    {
        id: 'destino', module: 2, title: 'Destino e revisão', time: '4 min',
        intro: 'Depois do balde, os restos ainda precisam se decompor.',
        paragraphs: [
            'Ap\u00F3s o per\u00EDodo de fermenta\u00E7\u00E3o no balde fechado, os restos de alimentos ainda est\u00E3o \u00E1cidos. Agora voc\u00EA vai mistur\u00E1-los com terra ou coloc\u00E1-los em uma composteira que aceite receb\u00EA-los.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Prepare um lugar sem plantas: Escolha um recipiente maior com terra de jardim, uma \u00E1rea de solo sem cultivo ou uma composteira j\u00E1 combinada. N\u00E3o use um vaso j\u00E1 plantado para essa etapa.',
                    'Misture os restos com terra: No recipiente maior, coloque terra no fundo, misture nela os restos de alimentos retirados do balde e cubra com mais terra. Mantenha sem contato com ra\u00EDzes.',
                    'Espere os restos se desfazerem: Na mistura em recipiente com terra, comece a conferir a decomposi\u00E7\u00E3o ap\u00F3s cerca de duas semanas. Ela pode levar v\u00E1rias semanas; restos ainda reconhec\u00EDveis indicam que o processo precisa continuar.'
                ]
            }
        ],
        takeaway: 'Duas semanas no balde n\u00E3o tornam os restos prontos para encostar nas ra\u00EDzes. Al\u00E9m da fermenta\u00E7\u00E3o dos alimentos, \u00E9 preciso concluir a decomposi\u00E7\u00E3o com terra ou em outra composteira.',
        sources: [
            'rhs',
            'usask'
        ],
        question: 'Quando os restos de alimentos retirados do balde podem ser aproveitados no cultivo?',
        options: [
            'Depois de se decomporem com terra ou em outra composteira, sem aplicar restos rec\u00E9m-fermentados junto \u00E0s ra\u00EDzes.',
            'No mesmo dia em que sa\u00EDrem do balde, mesmo que ainda estejam \u00E1cidos.',
            'Assim que uma casca mudar de cor, sem conferir o restante.'
        ],
        answer: 0,
        explanation: 'Primeiro vem a fermenta\u00E7\u00E3o dos alimentos no balde; depois, a decomposi\u00E7\u00E3o com terra ou em outra composteira. O prazo varia, e restos rec\u00E9m-retirados n\u00E3o devem tocar as ra\u00EDzes.'
    },
];
const lessonOrder = ['ciclo', 'bokashi', 'planejamento', 'montagem', 'preparo', 'separacao', 'manejo', 'diagnostico', 'destino'];
export const lessons: Lesson[] = [...initialLessons, ...additionalLessons].sort((a, b) => lessonOrder.indexOf(a.id) - lessonOrder.indexOf(b.id));
export type Residue = {
    id: string;
    name: string;
    status: 'Pode' | 'Com cuidados' | 'Não adicionar';
    icon: string;
    why: string;
    care: string[];
    source: string;
    sourceName: string;
    terms: string;
};
export const residues: Residue[] = [
    { id: 'frutas', name: 'Cascas de frutas', status: 'Pode', icon: 'citrus', why: 'Cascas e pedaços de frutas, inclusive cítricos, podem entrar no Bokashi.', care: ['Retire etiquetas e embalagens.', 'Corte peças grandes e distribua junto aos outros alimentos.', 'Cubra a camada com farelo, pressione e feche.'], source: RHS, sourceName: 'Royal Horticultural Society', terms: 'banana laranja limão maçã casca fruta citricos cítricos' },
    { id: 'legumes', name: 'Restos de legumes', status: 'Pode', icon: 'carrot', why: 'Cascas, talos, folhas e aparas de vegetais compõem os resíduos aceitos no Bokashi.', care: ['Separe os vegetais dos sacos, bandejas e elásticos.', 'Reduza pedaços grandes antes de adicionar.', 'Distribua o farelo sobre a camada e mantenha o recipiente vedado.'], source: SOURCE, sourceName: 'WSU Extension', terms: 'cenoura batata talo vegetal verdura cebola alho' },
    { id: 'cafe', name: 'Borra de café', status: 'Pode', icon: 'coffee', why: 'A borra de café pode ser adicionada com os demais restos de alimentos.', care: ['Retire a borra da cápsula de plástico ou metal.', 'Escorra o líquido livre antes da adição.', 'Distribua a borra na camada de alimentos e espalhe o farelo próprio para Bokashi.'], source: WELLINGTON, sourceName: 'Wellington City Council · Bokashi guide', terms: 'cafe café capsula cápsula borra filtro' },
    { id: 'cozidos', name: 'Alimentos cozidos', status: 'Com cuidados', icon: 'utensils', why: 'Arroz, massa, pão e legumes cozidos podem entrar no Bokashi. A parte sólida é aproveitada na fermentação.', care: ['Escorra caldos, molhos e óleo livre antes de adicionar.', 'Corte pedaços grandes, distribua na camada e acrescente farelo.', 'Pressione e feche. Depois da fermentação dos restos de alimentos no balde, misture esses restos com terra ou leve a uma composteira que aceite recebê-los.'], source: RHS, sourceName: 'Royal Horticultural Society', terms: 'arroz macarrão massa comida cozida sobras pão pao' },
    { id: 'carne', name: 'Carne e laticínios', status: 'Com cuidados', icon: 'utensils', why: 'Sobras de carne, peixe e laticínios são aceitas no Bokashi. Confirme se a composteira ou horta que receberá os restos depois da fermentação também aceita esses alimentos.', care: ['Separe ossos grandes e escorra líquidos e gordura livre.', 'Distribua em pedaços menores com os demais alimentos e cubra com farelo.', 'Mantenha o recipiente vedado e o material final coberto com solo ou dentro da compostagem.'], source: RHS, sourceName: 'Royal Horticultural Society', terms: 'carne leite queijo peixe osso iogurte' },
    { id: 'liquidos', name: 'Óleo, caldos e sopas', status: 'Não adicionar', icon: 'utensils', why: 'Grandes volumes de líquido e óleo prejudicam o manejo. Aproveite a parte sólida das sobras e separe o líquido livre.', care: ['Escorra a comida antes de colocá-la no Bokashi.', 'Guarde óleo de fritura usado para uma coleta específica.', 'Drene pela torneira o líquido produzido pelo próprio processo.'], source: RHS, sourceName: 'Royal Horticultural Society', terms: 'sopa caldo óleo oleo molho água agua liquido líquido gordura' },
    { id: 'mofados', name: 'Alimentos muito mofados', status: 'Não adicionar', icon: 'shield', why: 'Alimentos apodrecidos ou com mofo abundante podem atrapalhar a fermentação dos demais restos de alimentos. Separe-os dos resíduos destinados ao Bokashi.', care: ['Não misture a porção deteriorada aos novos alimentos.', 'Uma película branca que aparece durante a fermentação no balde é diferente de um alimento que já entrou apodrecido.', 'Para corrigir um ciclo com deterioração, abra “Preciso de ajuda”.'], source: RHS, sourceName: 'Royal Horticultural Society', terms: 'mofo mofado podre apodrecido fungo bolor' },
    { id: 'plastico', name: 'Plásticos e embalagens', status: 'Não adicionar', icon: 'package', why: 'Plásticos, cápsulas e embalagens não fazem parte dos resíduos alimentares tratados no recipiente.', care: ['Retire embalagens e adesivos antes de adicionar os alimentos.', 'Separe o material para a coleta correspondente no município.'], source: MMA, sourceName: 'Ministério do Meio Ambiente · separação na fonte', terms: 'plástico plastico embalagem sacola cápsula capsula adesivo' },
    { id: 'vidro', name: 'Vidro e metal', status: 'Não adicionar', icon: 'package', why: 'Esses materiais precisam ser separados dos orgânicos. Fragmentos também dificultam e tornam inseguro o manejo.', care: ['Confira pratos e tábuas antes de reunir os restos de comida.', 'Acondicione fragmentos cortantes de forma protegida e identifique-os para a coleta.'], source: MMA, sourceName: 'Ministério do Meio Ambiente · separação na fonte', terms: 'vidro metal lata alumínio aluminio talher' },
    { id: 'limpeza', name: 'Produtos de limpeza', status: 'Não adicionar', icon: 'shield', why: 'Detergentes, desinfetantes e água de limpeza não são alimentos e ficam fora do recipiente de fermentação.', care: ['Separe a limpeza do recipiente da etapa de adição dos alimentos.', 'Retire os resíduos da lavagem e siga o rótulo dos produtos para o descarte.'], source: MMA, sourceName: 'Ministério do Meio Ambiente · separação na fonte', terms: 'detergente sabão sabao desinfetante produto limpeza' },
];
export const checklist = [
    { id: 'destino', label: 'Defini onde os restos vão se decompor depois do balde' },
    { id: 'recipiente', label: 'Conferi o balde e o fechamento da tampa' },
    { id: 'inoculante', label: 'Separei o farelo próprio para Bokashi' },
    { id: 'embalagens', label: 'Retirei embalagens e adesivos dos resíduos' },
];
