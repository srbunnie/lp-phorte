// Áreas com foto no bloco "Explore por área". As demais áreas do catálogo aparecem como cards compactos.
export const courseAreaImages = {
  'Educação Física': {
    image: './images/area-educacao-fisica.webp',
    alt: 'Profissional de educação física orienta uma aluna',
  },
  Educação: {
    image: './images/area-educacao.webp',
    alt: 'Profissional conversa com uma aluna em ambiente de aprendizagem',
  },
};

// Área cujos temas (subcategorias) aparecem em destaque no hero e no bloco "Explore por área".
export const topicsArea = 'Educação Física';

// Slugs da taxonomia product_cursoslivres_categorias, usados na URL da página de filtros do site.
export const categorySlugs = {
  Educação: 'educacao-cursoslivres',
  'Educação Física': 'educacao-fisica-cursoslivres',
  Fisioterapia: 'fisioterapia',
  Nutrição: 'nutricao-cursoslivres',
  Biomecânica: 'biomecanica-cursoslivres',
  'Doenças Crônicas': 'doencas-cronicas',
  Emagrecimento: 'emagrecimento',
  'Fisiologia do Exercício': 'fisiologiadoexercicio-cursoslivres',
  Futsal: 'futsal',
  Gestantes: 'gestantes',
  'Gestão de Carreira': 'gestao-de-carreira',
  'Hipertensão Arterial': 'hipertensao-arterial',
  Marketing: 'marketing',
  Musculação: 'musculacao-cursoslivres',
  'Prescrição do Exercício': 'prescricao-do-exercicio',
  'Reabilitação de Lesões': 'reabilitacao-de-lesoes',
  'Terceira Idade': 'terceira-idade',
};

const filterPageBase = 'https://faculdadephorte.edu.br/cursos-phorte/';

export function filterPageUrl(slug) {
  return slug ? filterPageBase + 'filtros/tax/categorias/' + slug + '/' : filterPageBase;
}
