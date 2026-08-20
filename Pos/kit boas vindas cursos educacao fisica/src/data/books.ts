import { Book } from '@/types';

export const CATEGORY_LABELS: Record<string, string> = {
  treinamento: 'Treinamento & Força',
  esportes: 'Esportes & Performance',
  saude: 'Saúde & Reabilitação',
  educacao: 'Educação Física & Ensino',
};

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Manual de Musculação (8ª Edição)',
    author: 'Uchida, Charro, Bacurau, Pintes e Navarro',
    category: 'treinamento',
    image: '/images/manual_de_musculacao_8a_edicao_uchida_charro_bacurau_pintes_e_navarro_943_1_aa785b2982430f6078ea3c33f49db870.webp',
    description:
      'Referência obrigatória no Brasil sobre treinamento de força, fisiologia do exercício resistido e periodização para hipertrofia.',
  },
  {
    id: 2,
    title: 'Biomecânica Aplicada ao Treinamento de Força',
    author: 'Paulo Marchetti, Ruy Calheiros e Mario Charro',
    category: 'treinamento',
    image: '/images/biomecanica_aplicada_uma_abordagem_para_o_treinamento_de_forca_paulo_marchetti_ruy_calheiros_e_mario_819_1_20190726104517.webp',
    description:
      'Uma abordagem prática e aprofundada para entender as forças mecânicas nos exercícios resistidos e prevenção de lesões.',
  },
  {
    id: 3,
    title: 'Testes, Medidas e Avaliação em Educação Física e Esportes',
    author: 'Francisco José Gondim Pitanga',
    category: 'treinamento',
    image: '/images/testes_medidas_e_avaliacao_em_educacao_fisica_e_esportes_francisco_jose_gondim_pitanga_825_1_20190924102653.webp',
    description:
      'Protocolos completos de avaliação cineantropométrica, aptidão cardiorrespiratória e testes neuromotores.',
  },
  {
    id: 4,
    title: 'Personal Training para Pequenos Grupos',
    author: 'Luis Claudio Bossi',
    category: 'treinamento',
    image: '/images/personal_training_para_pequenos_grupos_luis_claudio_bossi_945_1_264f8a699201539003facdef1c10853c.webp',
    description:
      'Estratégias de atendimento, prescrição de treinos coletivos personalizados e gestão de negócio para personal trainers.',
  },
  {
    id: 5,
    title: 'Futsal: Conceitos Modernos (2ª Edição)',
    author: 'Nicolino Belo e Ubiratan Silva Alves',
    category: 'esportes',
    image: '/images/futsal_conceitos_modernos_2a_edicao_nicolino_belo_ubiratan_silva_alves_831_1_20200218145231.webp',
    description:
      'Metodologia contemporânea do futsal, táticas defensivas e ofensivas e preparação física aplicada.',
  },
  {
    id: 6,
    title: 'Corrida de Rua: Periodização para o Atleta da Vida Real',
    author: 'Editora Phorte',
    category: 'esportes',
    image: '/images/corrida_de_rua_periodizao_para_o_atleta_da_vida_re_1_20260814084805_19fe855989de.webp',
    description:
      'Do sedentário à maratona: modelos práticos de periodização de corrida, biomecânica da passada e planilhas de evolução.',
  },
  {
    id: 7,
    title: 'O Esporte Paralímpico no Brasil',
    author: 'Editora Phorte',
    category: 'esportes',
    image: '/images/o_esporte_paralimpico_no_brasil_profissionalismo_administracao_e_classificacao_de_atletas_530_1_20180601125838.webp',
    description:
      'Profissionalismo, administração esportiva e classificação funcional de atletas paralímpicos.',
  },
  {
    id: 8,
    title: 'O Evento Esportivo como Objeto de Marketing (2ª Edição)',
    author: 'Editora Phorte',
    category: 'esportes',
    image: '/images/o_evento_esportivo_como_objeto_de_marketing_2a_edicao_532_1_20180604093415.webp',
    description:
      'Planejamento, patrocínios, ativações e estratégias comerciais de gestão em eventos de esporte.',
  },
  {
    id: 9,
    title: 'Teste e Avaliação em Esporte Adaptado',
    author: 'Editora Phorte',
    category: 'esportes',
    image: '/images/teste_e_avaliacao_em_esporte_adaptado_668_1_20180601130134.webp',
    description:
      'Critérios científicos e testes adaptados para avaliação de pessoas com deficiência motora, visual ou intelectual.',
  },
  {
    id: 10,
    title: 'Ensinando Natação (4ª Edição)',
    author: 'Editora Phorte',
    category: 'esportes',
    image: '/images/ensinando_natacao_4a_edicao_222_1_20180427111832.webp',
    description:
      'Pedagogia do ensino dos 4 nados da adaptação ao meio líquido ao aperfeiçoamento técnico.',
  },
  {
    id: 11,
    title: 'Treinamento da Natação Competitiva',
    author: 'Editora Phorte',
    category: 'esportes',
    image: '/images/treinamento_da_natacao_competitiva_uma_abordagem_metodologica_682_1_20180601151129.webp',
    description:
      'Uma abordagem metodológica de alta performance para periodização, séries de treino e controle fisiológico.',
  },
  {
    id: 12,
    title: 'Eletroestimulação de Corpo Inteiro (EMS)',
    author: 'Alexandre Evangelista e Tiago Volpi',
    category: 'saude',
    image: '/images/eletroestimulacao_de_corpo_inteiro_org_alexandre_evangelista_e_tiago_volpi_947_1_099173ec2e8e5227e4f188f00d0c8bad.webp',
    description:
      'Fundamentos fisiológicos, segurança clínica e protocolos de aplicação prática de EMS no fitness e reabilitação.',
  },
  {
    id: 13,
    title: 'Método Pilates: A Arte de Esculpir o Corpo',
    author: 'Cecília Panelli',
    category: 'saude',
    image: '/images/metodo_pilates_a_arte_de_esculpir_o_corpo_org_cecilia_panelli_939_1_781c6ab13717c7575d09cf59943ed152.webp',
    description:
      'Os princípios clássicos de Joseph Pilates aplicados ao matwork, aparelhos e alinhamento postural.',
  },
  {
    id: 14,
    title: 'Método Pilates para Crianças',
    author: 'Editora Phorte',
    category: 'saude',
    image: '/images/metodo_pilates_para_criancas_460_1_20180601105331.webp',
    description:
      'Adaptações lúdicas e seguras do pilates para desenvolvimento motor, postura e concentração infantil.',
  },
  {
    id: 15,
    title: 'A Dança na Arte, no Esporte e na Educação',
    author: 'Carla Salvagni e Antonio Carlos de Quadros Jr.',
    category: 'educacao',
    image: '/images/a_danca_na_arte_no_esporte_e_na_educacao_carla_salvagni_e_antonio_carlos_de_quadros_jr_organizadores_935_1_3ea98d88ea7c18e17ff06ea6512b1dd3.webp',
    description:
      'Expressão corporal, ritmo, coreografia e a dança como ferramenta pedagógica e formativa.',
  },
  {
    id: 16,
    title: 'Jogos Educativos (5ª Edição)',
    author: 'Editora Phorte',
    category: 'educacao',
    image: '/images/jogos_educativos_5a_edicao_estrutura_e_organizacao_da_pratica_390_1_20180417142730.webp',
    description:
      'Estrutura, regras, dinâmicas de grupo e organização da prática lúdica nas aulas de Educação Física.',
  },
  {
    id: 17,
    title: 'Educação Física Infantil: Construindo o Movimento na Escola (7ª Edição)',
    author: 'Editora Phorte',
    category: 'educacao',
    image: '/images/educacao_fisica_infantil_construindo_o_movimento_na_escola_7a_edicao_204_1_20180601161708.webp',
    description:
      'Guia essencial para professores com planos de aula, psicomotricidade e desenvolvimento na primeira infância.',
  },
];

export const BOOKS_DATA = BOOKS;
