import type { Lesson } from '@/lib/content';
export const additionalLessons: Lesson[] = [
    {
        id: 'planejamento', module: 0, title: 'Planejando o seu primeiro ciclo', time: '3 min',
        intro: 'Antes de juntar os alimentos, prepare o caminho.',
        paragraphs: [
            'Voc\u00EA precisa de um lugar para o balde, dos materiais para us\u00E1-lo e de um destino para os restos de alimentos depois da fermenta\u00E7\u00E3o. Planeje os tr\u00EAs antes de come\u00E7ar.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Escolha um lugar acess\u00EDvel: Coloque o balde em uma superf\u00EDcie firme, sem sol direto. Deixe espa\u00E7o para abrir a tampa e recolher o l\u00EDquido.',
                    'Separe os materiais: Tenha farelo pr\u00F3prio para Bokashi, um utens\u00EDlio para pressionar os alimentos e um pote para recolher o l\u00EDquido do balde.',
                    'Defina onde usar terra: Prepare um recipiente maior com terra ou uma \u00E1rea sem plantas. Se for entregar a outra pessoa ou composteira, confirme antes se ela recebe restos de alimentos ap\u00F3s a fermenta\u00E7\u00E3o.',
                    'Planeje os pr\u00F3ximos restos: Enquanto o primeiro balde cheio fica fechado, use outro sistema para os novos restos de alimentos. N\u00E3o continue colocando comida no balde que j\u00E1 est\u00E1 descansando.'
                ]
            }
        ],
        takeaway: 'Dois baldes encaixados formam um \u00FAnico sistema: um recebe os alimentos e o outro coleta o l\u00EDquido. Para alternar ciclos, voc\u00EA precisa de outro sistema completo.',
        sources: [
            'rhs',
            'usask'
        ],
        question: 'Lia n\u00E3o tem quintal. O que precisa decidir antes de come\u00E7ar a usar o Bokashi?',
        options: [
            'S\u00F3 escolher o balde; o destino dos restos pode ficar para depois.',
            'Preparar um recipiente maior com terra ou combinar a entrega dos restos ap\u00F3s a fermenta\u00E7\u00E3o.',
            'Escolher um vaso j\u00E1 plantado para colocar os restos assim que sa\u00EDrem do balde.'
        ],
        answer: 1,
        explanation: 'Lia precisa organizar onde os restos de alimentos v\u00E3o se decompor depois do per\u00EDodo no balde. Um vaso com plantas n\u00E3o substitui essa prepara\u00E7\u00E3o.'
    },
    {
        id: 'montagem', module: 1, title: 'Montando um sistema com baldes', time: '5 min',
        intro: 'Dois baldes encaixados, duas fun\u00E7\u00F5es diferentes.',
        paragraphs: [
            'O balde de dentro recebe os alimentos e deixa o l\u00EDquido passar pelo fundo. O balde de fora recolhe esse l\u00EDquido. A tampa fecha o balde que recebe os alimentos.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: []
            }
        ],
        takeaway: 'Use baldes pr\u00F3prios para contato com alimentos. N\u00E3o reaproveite embalagens de produtos qu\u00EDmicos. Se n\u00E3o tiver pr\u00E1tica com perfura\u00E7\u00E3o ou instala\u00E7\u00E3o da torneira, pe\u00E7a ajuda.',
        sources: [
            'mofga',
            'redland',
            'rhs'
        ],
        question: 'No modelo com dois baldes encaixados, onde ficam os furos de passagem do l\u00EDquido?',
        options: [
            'Nas laterais dos dois baldes, para entrar ar.',
            'Na tampa, para o l\u00EDquido evaporar.',
            'No fundo do balde de dentro; o balde de fora ret\u00E9m o l\u00EDquido.'
        ],
        answer: 2,
        explanation: 'Os furos no fundo interno deixam o l\u00EDquido chegar ao coletor. O fundo externo n\u00E3o pode deixar esse l\u00EDquido escapar; tampa e laterais n\u00E3o recebem furos para ventilar.'
    },
    {
        id: 'diagnostico', module: 2, title: 'Lendo os sinais do seu balde', time: '4 min',
        intro: 'Cheiro, tampa e apar\u00EAncia ajudam a conferir.',
        paragraphs: [
            'Observe os sinais durante o manejo necess\u00E1rio, sem abrir o balde s\u00F3 para colocar ar. O cheiro \u00E1cido, parecido com conserva, \u00E9 diferente de cheiro de comida apodrecida.'
        ],
        sections: [
            {
                title: 'Passo a passo',
                steps: [
                    'Cascas vis\u00EDveis e cheiro \u00E1cido: Podem fazer parte da fermenta\u00E7\u00E3o normal dos restos de alimentos. Confira o tempo ap\u00F3s o enchimento e o fechamento; as cascas ainda precisam se decompor depois de sair do balde.',
                    'Cheiro de podre ou moscas: Retire o l\u00EDquido acumulado, confira a quantidade de farelo no r\u00F3tulo, pressione os alimentos, limpe a borda e feche sem frestas.',
                    'Muito mofo verde ou preto: Pare de acrescentar alimentos. Separe o conte\u00FAdo para uma compostagem que aceite receb\u00EA-lo, sem aplicar direto nas plantas, e recomece com o balde limpo.'
                ]
            }
        ],
        takeaway: 'Uma camada branca pode aparecer sobre os restos de alimentos durante a fermenta\u00E7\u00E3o; confira tamb\u00E9m se a tampa fecha bem. Muito mofo verde ou preto junto com cheiro ruim pede interromper o ciclo, n\u00E3o apenas retirar uma colher.',
        sources: [
            'rhs',
            'usask'
        ],
        question: 'O balde cumpriu o per\u00EDodo fechado, tem cheiro \u00E1cido e ainda h\u00E1 cascas vis\u00EDveis. O que isso pode indicar?',
        options: [
            'Pode ser fermenta\u00E7\u00E3o normal dos alimentos; eles ainda precisam se decompor com terra ou em outra composteira.',
            'Os restos j\u00E1 podem tocar as ra\u00EDzes, sem outro cuidado.',
            '\u00C9 preciso furar as laterais para colocar ar no balde.'
        ],
        answer: 0,
        explanation: 'Cheiro \u00E1cido e cascas reconhec\u00EDveis podem fazer parte da fermenta\u00E7\u00E3o dos restos de alimentos. Isso n\u00E3o \u00E9 o mesmo que composto pronto para o cultivo.'
    },
];
