import assert from 'node:assert/strict';

import {
  buildCardModel,
  getCardState,
} from '../src/card-controller.js';
import {
  buildEnrollmentSource,
  buildPoloCatalogByCourseAndModalidade,
  buildPoloCatalogByModalidade,
  buildInterestCatalogByModalidade,
  listAvailableCourses,
} from '../src/course-catalog.js';
import {
  buildInterestChoices,
  resolveInterestChoice,
} from '../src/popup-interest-options.js';

const sheetSnapshot = {
  courses: [
    {
      curso_id: 'pedagogia',
      curso_nome: 'Pedagogia',
      valor_base: 'R$ 198,00',
      aprovado_mec: 'TRUE',
      nota_5_mec: 'FALSE',
    },
    {
      curso_id: 'administracao',
      curso_nome: 'Administração',
      valor_base: 'R$ 198,00',
      aprovado_mec: 'TRUE',
      nota_5_mec: 'FALSE',
    },
    {
      curso_id: 'traducao-interpretacao-ingles-portugues',
      curso_nome: 'Tradução e Interpretação Inglês / Português',
      valor_base: 'R$ 529,00',
      aprovado_mec: 'TRUE',
      nota_5_mec: 'TRUE',
    },
    {
      curso_id: 'processos-gerenciais',
      curso_nome: 'Processos Gerenciais',
      valor_base: 'R$ 198,00',
      aprovado_mec: 'TRUE',
      nota_5_mec: 'FALSE',
    },
    {
      curso_id: 'marketing',
      curso_nome: 'Marketing',
      valor_base: 'R$ 198,00',
      aprovado_mec: 'TRUE',
      nota_5_mec: 'FALSE',
    },
    {
      curso_id: 'recursos-humanos',
      curso_nome: 'Recursos Humanos',
      valor_base: 'R$ 198,00',
      aprovado_mec: 'TRUE',
      nota_5_mec: 'FALSE',
    },
  ],
  offers: [
    {
      curso_id: 'pedagogia',
      curso_nome: 'Pedagogia',
      modalidade: 'Semipresencial',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'administracao',
      curso_nome: 'Administração',
      modalidade: 'EAD',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'administracao',
      curso_nome: 'Administração',
      modalidade: 'Presencial',
      polo_nome: 'Polo Lapa',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'traducao-interpretacao-ingles-portugues',
      curso_nome: 'Tradução e Interpretação Inglês / Português',
      modalidade: 'EAD Ao Vivo',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 529,00',
      disponivel: 'TRUE',
      turma_confirmada: 'TRUE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'recursos-humanos',
      curso_nome: 'Recursos Humanos',
      modalidade: 'EAD',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'recursos-humanos',
      curso_nome: 'Recursos Humanos',
      modalidade: 'EAD',
      polo_nome: 'Polo Lapa',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'processos-gerenciais',
      curso_nome: 'Processos Gerenciais',
      modalidade: 'EAD',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'processos-gerenciais',
      curso_nome: 'Processos Gerenciais',
      modalidade: 'EAD',
      polo_nome: 'Polo Lapa',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'processos-gerenciais',
      curso_nome: 'Processos Gerenciais',
      modalidade: 'Presencial',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'marketing',
      curso_nome: 'Marketing',
      modalidade: 'EAD',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
    {
      curso_id: 'marketing',
      curso_nome: 'Marketing',
      modalidade: 'EAD',
      polo_nome: 'Polo Lapa',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.1',
    },
  ],
};

function run(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

run('builds interest catalog by modalidade from spreadsheet offers', () => {
  const catalog = buildInterestCatalogByModalidade(sheetSnapshot.offers);

  assert.deepEqual(catalog, {
    semipresencial: ['Pedagogia'],
    ead: [
      'Administração',
      'Recursos Humanos',
      'Processos Gerenciais',
      'Marketing',
    ],
    presencial: [
      'Administração',
      'Processos Gerenciais',
    ],
    'ead-ao-vivo': ['Tradução e Interpretação Inglês / Português'],
  });
});

run('builds polo catalog by modalidade from spreadsheet offers', () => {
  const catalog = buildPoloCatalogByModalidade(sheetSnapshot.offers);

  assert.deepEqual(catalog, {
    semipresencial: ['Polo Bela Vista'],
    ead: ['Polo Bela Vista', 'Polo Lapa'],
    presencial: ['Polo Lapa', 'Polo Bela Vista'],
    'ead-ao-vivo': ['Polo Bela Vista'],
  });
});

run('builds polo catalog by course and modalidade from spreadsheet offers', () => {
  const catalog = buildPoloCatalogByCourseAndModalidade(sheetSnapshot.offers);

  assert.deepEqual(catalog.presencial, {
    administracao: ['Polo Lapa'],
    'processos-gerenciais': ['Polo Bela Vista'],
  });
  assert.deepEqual(catalog.ead, {
    administracao: ['Polo Bela Vista'],
    'recursos-humanos': ['Polo Bela Vista', 'Polo Lapa'],
    'processos-gerenciais': ['Polo Bela Vista', 'Polo Lapa'],
    marketing: ['Polo Bela Vista', 'Polo Lapa'],
  });
});

run('builds enrollment source for administracao using spreadsheet snapshot', () => {
  const source = buildEnrollmentSource(sheetSnapshot, 'administracao');

  assert.equal(source.course.courseId, 'administracao');
  assert.equal(source.course.courseLabel, 'Administração');
  assert.equal(source.course.mecBadgeLabel, '');
  assert.equal(source.course.valorBase, 198);
  assert.deepEqual(
    source.cardOffers.map((offer) => ({
      modalidade: offer.modalidadeLabel,
      polo: offer.poloLabel,
      preco: offer.preco,
      turma: offer.turmaAtiva,
    })),
    [
      {
        modalidade: 'EAD',
        polo: 'Polo Bela Vista',
        preco: 198,
        turma: 'Turma 2026.1',
      },
      {
        modalidade: 'Presencial',
        polo: 'Polo Lapa',
        preco: 198,
        turma: 'Turma 2026.1',
      },
    ],
  );
  assert.deepEqual(source.interestCatalogByModalidade.presencial, [
    'Administração',
    'Processos Gerenciais',
  ]);
  assert.deepEqual(source.poloCatalogByModalidade.presencial, [
    'Polo Lapa',
    'Polo Bela Vista',
  ]);
  assert.deepEqual(source.poloCatalogByCourseAndModalidade.presencial, {
    administracao: ['Polo Lapa'],
    'processos-gerenciais': ['Polo Bela Vista'],
  });
});

run('lists available courses from spreadsheet snapshot in course order', () => {
  const courses = listAvailableCourses(sheetSnapshot);

  assert.deepEqual(courses, [
    { courseId: 'pedagogia', courseLabel: 'Pedagogia' },
    { courseId: 'administracao', courseLabel: 'Administração' },
    {
      courseId: 'traducao-interpretacao-ingles-portugues',
      courseLabel: 'Tradução e Interpretação Inglês / Português',
    },
    { courseId: 'processos-gerenciais', courseLabel: 'Processos Gerenciais' },
    { courseId: 'marketing', courseLabel: 'Marketing' },
    { courseId: 'recursos-humanos', courseLabel: 'Recursos Humanos' },
  ]);
});

run('builds MEC badge only for nota 5 courses', () => {
  const source = buildEnrollmentSource(
    sheetSnapshot,
    'traducao-interpretacao-ingles-portugues',
  );

  assert.equal(source.course.mecBadgeLabel, 'Nota 5 ★ no Mec');
});

const administracaoSource = buildEnrollmentSource(
  sheetSnapshot,
  'administracao',
);
const administracaoOffers = administracaoSource.cardOffers;

run('starts blocked until modalidade and polo are selected', () => {
  const model = buildCardModel(administracaoOffers);
  const state = getCardState(model, {});

  assert.equal(state.isReady, false);
  assert.equal(state.cta.disabled, true);
  assert.equal(state.price.isFromLabel, true);
  assert.equal(state.price.prefix, 'A partir de');
  assert.equal(state.price.value, 'R$ 198,00');
  assert.equal(state.summary.modalidade, null);
  assert.equal(state.summary.polo, null);
  assert.equal(state.badges.mecBadgeLabel, null);
  assert.equal(state.badges.turmaLabel, 'Turma 2026.1');
  assert.deepEqual(
    state.modalidades.map((item) => item.value),
    ['ead', 'presencial'],
  );
  assert.deepEqual(state.polos.map((item) => item.value), []);
  assert.equal(state.flow.showPoloStep, false);
});

run('keeps all modalidades visible after selecting one', () => {
  const model = buildCardModel(administracaoOffers);
  const state = getCardState(model, { modalidade: 'ead' });

  assert.deepEqual(
    state.modalidades.map((item) => item.value),
    ['ead', 'presencial'],
  );
  assert.deepEqual(
    state.polos.map((item) => item.value),
    ['polo-bela-vista'],
  );
  assert.equal(state.flow.showPoloStep, true);
  assert.equal(state.selection.polo, null);
  assert.equal(state.cta.label, 'Selecione modalidade e polo');
  assert.equal(state.isReady, false);
  assert.equal(state.price.prefix, 'A partir de');
  assert.equal(state.price.value, 'R$ 198,00');
});

run('keeps all modalidades visible after selecting polo first in state input', () => {
  const model = buildCardModel(administracaoOffers);
  const state = getCardState(model, { polo: 'polo-lapa' });

  assert.deepEqual(
    state.modalidades.map((item) => item.value),
    ['ead', 'presencial'],
  );
  assert.deepEqual(state.polos.map((item) => item.value), []);
  assert.equal(state.flow.showPoloStep, false);
});

run('hides incompatible polos after selecting modalidade first', () => {
  const model = buildCardModel(administracaoOffers);
  const state = getCardState(model, { modalidade: 'presencial' });

  assert.deepEqual(
    state.polos.map((item) => item.value),
    ['polo-lapa'],
  );
});

run('resolves valid modalidade and polo into price, popup and form payload', () => {
  const model = buildCardModel(administracaoOffers);
  const state = getCardState(model, {
    modalidade: 'presencial',
    polo: 'polo-lapa',
  });

  assert.equal(state.isReady, true);
  assert.equal(state.cta.disabled, false);
  assert.equal(state.price.prefix, 'A partir de');
  assert.equal(state.price.value, 'R$ 198,00');
  assert.equal(state.summary.modalidade, 'Presencial');
  assert.equal(state.summary.polo, 'Polo Lapa');
  assert.equal(state.badges.mecBadgeLabel, null);
  assert.equal(state.badges.turmaLabel, 'Turma 2026.1');
  assert.equal(state.popupId, 'popup-administracao-presencial');
  assert.deepEqual(state.formPayload, {
    curso: 'Administração',
    modalidade: 'Presencial',
    polo: 'Polo Lapa',
    popupId: 'popup-administracao-presencial',
  });
});

run('keeps card blocked for incomplete combination', () => {
  const model = buildCardModel(administracaoOffers);
  const state = getCardState(model, {
    modalidade: 'ead',
  });

  assert.equal(state.isReady, false);
  assert.equal(state.cta.disabled, true);
  assert.equal(state.price.prefix, 'A partir de');
  assert.equal(state.price.value, 'R$ 198,00');
  assert.equal(state.selection.modalidade, 'ead');
  assert.equal(state.selection.polo, null);
});

run('builds unified interest options filtered by selected modalidade', () => {
  const choices = buildInterestChoices(
    administracaoSource.interestCatalogByModalidade,
    {
      curso: 'Administração',
      modalidade: 'EAD',
    },
  );

  assert.deepEqual(
    choices.map((item) => item.label),
    ['Administração EAD', 'Recursos Humanos EAD', 'Processos Gerenciais EAD', 'Marketing EAD'],
  );
  assert.equal(choices[0].selected, true);
});

run('falls back to current course when modalidade has no configured catalog', () => {
  const choices = buildInterestChoices(
    {
      ead: ['Administração'],
    },
    {
      curso: 'Administração',
      modalidade: 'Presencial',
    },
  );

  assert.deepEqual(choices, [
    {
      selected: true,
      curso: 'Administração',
      label: 'Administração Presencial',
      modalidade: 'Presencial',
      value: 'administracao::presencial',
    },
  ]);
});

run('marks the current course as selected when modalidade catalog has multiple options', () => {
  const choices = buildInterestChoices(
    administracaoSource.interestCatalogByModalidade,
    {
      curso: 'Processos Gerenciais',
      modalidade: 'Presencial',
    },
  );

  assert.deepEqual(
    choices.map((item) => ({ label: item.label, selected: item.selected })),
    [
      { label: 'Administração Presencial', selected: false },
      { label: 'Processos Gerenciais Presencial', selected: true },
    ],
  );
});

run('resolves selected unified choice into hidden rdstation fields', () => {
  const choice = resolveInterestChoice(
    [
      {
        selected: true,
        curso: 'Administração',
        label: 'Administração EAD',
        modalidade: 'EAD',
        value: 'administracao::ead',
      },
      {
        selected: false,
        curso: 'Marketing',
        label: 'Marketing EAD',
        modalidade: 'EAD',
        value: 'marketing::ead',
      },
    ],
    'marketing::ead',
  );

  assert.deepEqual(choice, {
    selected: false,
    curso: 'Marketing',
    label: 'Marketing EAD',
    modalidade: 'EAD',
    value: 'marketing::ead',
  });
});
