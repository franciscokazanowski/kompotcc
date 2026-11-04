import type { ReferenceId } from '@/lib/content';

export type Visual = 'alimentos'|'solo'|'balde'|'local'|'materiais'|'destino'|'separar'|'escorrer'|'fechar'|'calendario'|'sinais'|'revisar'|'farelo'|'drenagem'|'terra'|'pressionar';
export type GuideStep = { title:string; text:string; visual:Visual };
export type LessonGuide = {
 intro:string; summary:string; concepts?:{name:string;meaning:string}[]; steps:GuideStep[];
 care:string; example?:string; detailTitle:string; details:string[]; sources:ReferenceId[];
};

export const lessonGuides:Record<string,LessonGuide> = {
 ciclo:{
  intro:'O caminho dos restos de alimentos até o cultivo.',
  summary:'Compostagem é a transformação de restos de alimentos e outros materiais orgânicos em composto. Esse composto é um material que ajuda a melhorar o solo usado no cultivo.',
  steps:[
   {title:'Separe os restos de alimentos',text:'Junte cascas, talos e sobras de comida. Retire embalagens, adesivos e outros materiais que não sejam alimentos.',visual:'alimentos'},
   {title:'Conheça o começo do Bokashi',text:'Bokashi é um método em que os restos de alimentos passam por uma fermentação dentro de um balde fechado. Eles ficam ácidos, mas podem continuar parecendo comida.',visual:'balde'},
   {title:'Continue o processo com terra',text:'Depois de fermentar no balde, os restos de alimentos precisam se decompor com terra ou em outra composteira. Só depois dessa decomposição eles podem ser aproveitados no cultivo.',visual:'solo'},
  ],
  care:'As cascas ainda estarem visíveis depois da fermentação no balde não significa, por si só, que deu errado. Sair do balde também não significa que o composto já está pronto.',
  example:'Uma casca de banana pode continuar reconhecível ao sair do balde. Ela ainda precisa se decompor com terra ou em outra composteira antes de participar do cultivo.',
  detailTitle:'Por que aproveitar os restos de alimentos?',
  details:['Separar e tratar esses restos reduz a quantidade de resíduos orgânicos enviada ao lixo comum.','O composto pronto ajuda a cuidar do solo. Conforme o cultivo, seu uso também pode reduzir a compra de alguns insumos.'],sources:['mma','composto','rhs','usask'],
 },
 bokashi:{
  intro:'O que acontece com os alimentos no balde?',
  summary:'No Bokashi, usamos um produto próprio para ajudar na fermentação dos restos de alimentos: o farelo para Bokashi. Ele deve estar separado antes de você começar.',
  concepts:[
   {name:'O que é esse farelo?',meaning:'É um produto com microrganismos, seres muito pequenos, como algumas bactérias, que ajudam a fermentar os restos de alimentos. O produto é preparado para essa finalidade.'},
   {name:'E “farelo inoculado”?',meaning:'É outro nome que pode aparecer no produto. “Inoculado” significa que o farelo recebeu esses microrganismos. Farelo comum de cozinha ou serragem comum não fazem a mesma função.'},
  ],
  steps:[
   {title:'Espalhe o farelo nos alimentos',text:'A cada nova camada de restos de alimentos, distribua o farelo para Bokashi. A quantidade depende do produto: siga o rótulo.',visual:'farelo'},
   {title:'Pressione e mantenha fechado',text:'A fermentação dos restos de alimentos acontece com pouca presença de ar. Pressione a camada e feche bem; não faça furos na tampa ou nas laterais para ventilar.',visual:'fechar'},
   {title:'Conte o tempo depois de encher',text:'Quando o balde encher, anote a data. Mantenha-o fechado, sem novos alimentos, por pelo menos duas semanas; continue retirando o líquido que se acumular.',visual:'calendario'},
   {title:'Depois do balde, use terra',text:'Misture os restos de alimentos após a fermentação com terra ou leve-os a uma composteira que aceite recebê-los. É fora do balde que eles terminam de se decompor.',visual:'terra'},
  ],
  care:'Fermentação dos restos de alimentos é a transformação que ocorre no balde com a ajuda dos microrganismos do farelo. Essa transformação deixa os restos ácidos; ela não produz composto pronto dentro do balde.',
  detailTitle:'Por que não revirar para colocar ar?',details:['Outras formas de compostagem precisam de entrada de ar. No Bokashi, abrir e revirar para ventilar atrapalha a fase de fermentação dos restos de alimentos.','Os furos no fundo do balde interno, mostrados na montagem, servem para o líquido passar ao coletor. Tampa e laterais não recebem furos para ventilar.'],sources:['rhs','usask'],
 },
 planejamento:{
  intro:'Antes de juntar os alimentos, prepare o caminho.',
  summary:'Você precisa de um lugar para o balde, dos materiais para usá-lo e de um destino para os restos de alimentos depois da fermentação. Planeje os três antes de começar.',
  steps:[
   {title:'Escolha um lugar acessível',text:'Coloque o balde em uma superfície firme, sem sol direto. Deixe espaço para abrir a tampa e recolher o líquido.',visual:'local'},
   {title:'Separe os materiais',text:'Tenha farelo próprio para Bokashi, um utensílio para pressionar os alimentos e um pote para recolher o líquido do balde.',visual:'materiais'},
   {title:'Defina onde usar terra',text:'Prepare um recipiente maior com terra ou uma área sem plantas. Se for entregar a outra pessoa ou composteira, confirme antes se ela recebe restos de alimentos após a fermentação.',visual:'destino'},
   {title:'Planeje os próximos restos',text:'Enquanto o primeiro balde cheio fica fechado, use outro sistema para os novos restos de alimentos. Não continue colocando comida no balde que já está descansando.',visual:'balde'},
  ],
  care:'Dois baldes encaixados formam um único sistema: um recebe os alimentos e o outro coleta o líquido. Para alternar ciclos, você precisa de outro sistema completo.',
  example:'Seu balde encheu hoje. Você anota a data e o mantém fechado. As sobras de amanhã vão para outro sistema, sem interromper a fermentação dos alimentos do primeiro.',
  detailTitle:'Moro em apartamento e não tenho quintal',details:['Você pode preparar a decomposição dos restos de alimentos em um recipiente maior com terra ou combinar a entrega com quem faça essa etapa. Confira se há espaço e se a entrega é aceita antes de iniciar.','Não coloque os restos recém-retirados do balde nas raízes de um vaso já plantado. Eles ainda estão ácidos e precisam se decompor primeiro.'],sources:['rhs','usask'],
 },
 montagem:{
  intro:'Dois baldes encaixados, duas funções diferentes.',
  summary:'O balde de dentro recebe os alimentos e deixa o líquido passar pelo fundo. O balde de fora recolhe esse líquido. A tampa fecha o balde que recebe os alimentos.',steps:[],
  care:'Use baldes próprios para contato com alimentos. Não reaproveite embalagens de produtos químicos. Se não tiver prática com perfuração ou instalação da torneira, peça ajuda.',
  example:'Os furos ficam no fundo do balde de dentro. O balde de fora precisa reter o líquido; não fure o fundo dele.',
  detailTitle:'Já tenho um kit pronto para Bokashi',details:['Siga a montagem do fabricante. Alguns kits usam uma peça interna furada em vez de dois baldes encaixados; a função é a mesma: separar os alimentos do líquido.','O tamanho dos furos, a posição da torneira e as peças de fechamento dependem do recipiente escolhido. Os desenhos da lição mostram as funções e não definem medidas universais.'],sources:['mofga','redland','rhs'],
 },
 preparo:{
  intro:'Alimentos, farelo, pressão e tampa fechada.',
  summary:'Confira se a torneira está fechada e a tampa encaixa sem frestas. Separe o farelo próprio para Bokashi: é o produto com microrganismos que ajudam na fermentação dos restos de alimentos.',
  steps:[
   {title:'Comece pela parte sólida',text:'Coloque farelo no fundo conforme o rótulo. Retire embalagens, escorra o caldo das sobras que tiverem líquido e corte pedaços grandes antes de fazer a camada de alimentos.',visual:'alimentos'},
   {title:'Espalhe o farelo por cima',text:'Distribua o farelo para Bokashi sobre a nova camada de alimentos. A dose vem no rótulo; farelo comum e serragem comum não substituem esse produto.',visual:'farelo'},
   {title:'Pressione a camada',text:'Use um utensílio para apertar os alimentos e reduzir os espaços de ar entre eles. Não é para revirar a mistura.',visual:'pressionar'},
   {title:'Limpe a borda e feche',text:'Retire os restos presos na borda e encaixe bem a tampa. Deixe o balde fechado entre as adições de alimentos.',visual:'fechar'},
  ],
  care:'Se o farelo próprio para Bokashi acabar, reponha o produto antes de acrescentar novas camadas. Não substitua por farelo de cozinha, serragem comum ou água.',
  example:'Você separou cascas e sobras de arroz sem caldo. Coloque no balde, espalhe o farelo, pressione e feche. Essa sequência se repete a cada nova camada.',
  detailTitle:'Onde guardar o farelo?',details:['Guarde e manuseie o farelo conforme as instruções do fabricante. O produto precisa continuar adequado ao uso; não invente uma dose ou uma mistura para substituí-lo.','Organize os materiais antes de abrir o balde. Assim você consegue adicionar os alimentos, pressionar e fechar sem deixá-lo aberto desnecessariamente.'],sources:['rhs','usask'],
 },
 separacao:{
  intro:'Separe o alimento da embalagem e do caldo.',
  summary:'Cascas, talos, borra de café e sobras de comida podem entrar no Bokashi. Comida cozida, carne e laticínios também são aceitos nesse método, com os cuidados abaixo.',
  steps:[
   {title:'Retire o que não é alimento',text:'Tire embalagens, etiquetas, talheres e cápsulas. A borra de café entra sem a cápsula de plástico ou metal.',visual:'separar'},
   {title:'Escorra só quando houver caldo',text:'Se as sobras tiverem caldo, escorra e aproveite a parte sólida. Não coloque sopa líquida, grandes volumes de óleo ou outros líquidos livres no balde.',visual:'escorrer'},
   {title:'Confira a condição dos restos',text:'Deixe fora alimentos já muito mofados ou com cheiro de podre e ossos grandes. Corte pedaços grandes dos alimentos aceitos para facilitar a formação das camadas.',visual:'alimentos'},
  ],
  care:'O farelo não transforma embalagens em composto. Produtos de limpeza, plástico, vidro e metal ficam fora do balde. As orientações desta trilha são para Bokashi; um minhocário tem outros cuidados.',
  example:'Sobrou arroz com caldo em um pote plástico. Separe o pote e escorra o caldo: só a parte sólida dos alimentos vai para o Bokashi, junto do farelo próprio.',
  detailTitle:'E um alimento que não aparece aqui?',details:['Abra “Pode ou não pode?” e escolha o alimento para ver o motivo e os cuidados. A explicação aparece junto ao item selecionado.','Se outra pessoa receber os restos depois da fermentação, confirme também se o sistema dela aceita carne e laticínios.'],sources:['rhs','mma','wellington'],
 },
 manejo:{
  intro:'Retire o líquido que os alimentos produzem.',
  summary:'Durante a fermentação dos restos de alimentos, pode se acumular líquido no coletor. Retirar esse líquido é fazer a drenagem. A tampa permanece bem fechada entre as adições.',
  steps:[
   {title:'Ponha o pote sob a torneira',text:'Confira o coletor a cada dois ou três dias. Abra a torneira do próprio balde, recolha o líquido e feche novamente; confira diariamente se houver muito líquido.',visual:'drenagem'},
   {title:'Confira o fechamento',text:'Limpe a borda e encaixe a tampa sem frestas. Esse bom fechamento é a vedação; ele reduz a entrada de ar durante a fermentação dos alimentos.',visual:'fechar'},
   {title:'Ao encher, anote a data',text:'Deixe o balde cheio fechado, sem novos alimentos, por pelo menos duas semanas. Continue retirando o líquido; as próximas sobras vão para outro sistema.',visual:'calendario'},
  ],
  care:'Não coloque água para drenar: você está retirando o líquido que os alimentos produziram. Não use esse líquido puro nas plantas. Diluir é misturar esse líquido com água na proporção indicada para a aplicação. Siga o manual do seu sistema; receitas de outro kit não são uma regra geral.',
  example:'Seu kit e uma postagem recomendam diluições diferentes. Use a orientação do seu kit. Se não houver instrução confiável de aplicação, não use o líquido nas plantas.',
  detailTitle:'Teste com água e drenagem são a mesma coisa?',details:['Não. O teste com água serve para procurar vazamentos durante a montagem, com o balde ainda sem alimentos. Essa água é retirada antes do uso.','A drenagem durante o uso retira o líquido produzido pelos restos de alimentos. Se seu modelo não tem torneira, a retirada exige separar os baldes com cuidado e esvaziar o coletor.'],sources:['rhs','usask'],
 },
 diagnostico:{
  intro:'Cheiro, tampa e aparência ajudam a conferir.',
  summary:'Observe os sinais durante o manejo necessário, sem abrir o balde só para colocar ar. O cheiro ácido, parecido com conserva, é diferente de cheiro de comida apodrecida.',
  steps:[
   {title:'Cascas visíveis e cheiro ácido',text:'Podem fazer parte da fermentação normal dos restos de alimentos. Confira o tempo após o enchimento e o fechamento; as cascas ainda precisam se decompor depois de sair do balde.',visual:'sinais'},
   {title:'Cheiro de podre ou moscas',text:'Retire o líquido acumulado, confira a quantidade de farelo no rótulo, pressione os alimentos, limpe a borda e feche sem frestas.',visual:'revisar'},
   {title:'Muito mofo verde ou preto',text:'Pare de acrescentar alimentos. Separe o conteúdo para uma compostagem que aceite recebê-lo, sem aplicar direto nas plantas, e recomece com o balde limpo.',visual:'balde'},
  ],
  care:'Uma camada branca pode aparecer sobre os restos de alimentos durante a fermentação; confira também se a tampa fecha bem. Muito mofo verde ou preto junto com cheiro ruim pede interromper o ciclo, não apenas retirar uma colher.',
  example:'Seu balde tem cheiro de podre e líquido acumulado. Retire o líquido e confira farelo e fechamento. Se grande parte dos alimentos já estiver estragada, interrompa esse ciclo e recomece com o sistema limpo.',
  detailTitle:'Posso tentar disfarçar o cheiro?',details:['Não coloque perfume ou produto de limpeza nos alimentos. Corrija o acúmulo de líquido, a falta de farelo ou as frestas; se grande parte dos alimentos já estiver estragada, reinicie o ciclo.','Uma imagem ou um sinal isolado não confirma que o processo está correto. Considere cheiro, aparência, fechamento e histórico de uso juntos.'],sources:['rhs','usask'],
 },
 destino:{
  intro:'Depois do balde, os restos ainda precisam se decompor.',
  summary:'Após o período de fermentação no balde fechado, os restos de alimentos ainda estão ácidos. Agora você vai misturá-los com terra ou colocá-los em uma composteira que aceite recebê-los.',
  steps:[
   {title:'Prepare um lugar sem plantas',text:'Escolha um recipiente maior com terra de jardim, uma área de solo sem cultivo ou uma composteira já combinada. Não use um vaso já plantado para essa etapa.',visual:'balde'},
   {title:'Misture os restos com terra',text:'No recipiente maior, coloque terra no fundo, misture nela os restos de alimentos retirados do balde e cubra com mais terra. Mantenha sem contato com raízes.',visual:'terra'},
   {title:'Espere os restos se desfazerem',text:'Na mistura em recipiente com terra, comece a conferir a decomposição após cerca de duas semanas. Ela pode levar várias semanas; restos ainda reconhecíveis indicam que o processo precisa continuar.',visual:'solo'},
  ],
  care:'Duas semanas no balde não tornam os restos prontos para encostar nas raízes. Além da fermentação dos alimentos, é preciso concluir a decomposição com terra ou em outra composteira.',
  example:'O balde completou o período fechado hoje. Você ainda não vai plantar por cima dos restos: primeiro mistura com terra e espera a decomposição acontecer.',
  detailTitle:'Quanto tempo leva depois de misturar com terra?',details:['O guia da Universidade de Saskatchewan orienta começar a conferir um recipiente com terra após duas semanas e descreve cerca de seis semanas para a decomposição completa nesse manejo. Isso é uma referência, não uma garantia para qualquer recipiente ou temperatura.','No solo do jardim ou em outra composteira, o acompanhamento depende do manejo escolhido. Mantenha os restos cobertos, sem contato imediato com raízes, e aguarde a decomposição antes de plantar.','Se for entregar a outra pessoa, confirme antes o recebimento dos restos de alimentos após a fermentação, inclusive quando houver carne ou laticínios.'],sources:['rhs','usask'],
 },
};
