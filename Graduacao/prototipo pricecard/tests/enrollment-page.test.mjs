import assert from 'node:assert/strict';

import {
  buildEnrollmentPageModel,
  getEnrollmentPageState,
  updateEnrollmentSelection,
} from '../src/enrollment-page.js';

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
      turma_ativa: 'Turma 2026.2',
    },
    {
      curso_id: 'administracao',
      curso_nome: 'Administração',
      modalidade: 'EAD',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.2',
    },
    {
      curso_id: 'administracao',
      curso_nome: 'Administração',
      modalidade: 'EAD',
      polo_nome: 'Polo Lapa',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.2',
    },
    {
      curso_id: 'administracao',
      curso_nome: 'Administração',
      modalidade: 'Presencial',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 198,00',
      disponivel: 'TRUE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.2',
    },
    {
      curso_id: 'traducao-interpretacao-ingles-portugues',
      curso_nome: 'Tradução e Interpretação Inglês / Português',
      modalidade: 'EAD Ao Vivo',
      polo_nome: 'Polo Bela Vista',
      valor: 'R$ 529,00',
      disponivel: 'TRUE',
      turma_confirmada: 'TRUE',
      turma_ativa: 'Turma 2026.2',
    },
    {
      curso_id: 'traducao-interpretacao-ingles-portugues',
      curso_nome: 'Tradução e Interpretação Inglês / Português',
      modalidade: 'EAD Ao Vivo',
      polo_nome: 'Polo Lapa',
      valor: 'R$ 529,00',
      disponivel: 'FALSE',
      turma_confirmada: 'FALSE',
      turma_ativa: 'Turma 2026.2',
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

run('hydrates the enrollment page from a valid card selection', () => {
  const model = buildEnrollmentPageModel(sheetSnapshot);
  const state = getEnrollmentPageState(model, {
    formation: 'graduacao',
    course: 'administracao',
    modality: 'ead',
    campus: 'polo-bela-vista',
  });

  assert.equal(state.selection.formation, 'graduacao');
  assert.equal(state.selection.course, 'administracao');
  assert.equal(state.selection.modality, 'ead');
  assert.equal(state.selection.campus, 'polo-bela-vista');
  assert.equal(state.steps.current, 'form');
  assert.equal(state.offer.offerId, 'graduacao__administracao__ead__polo-bela-vista');
  assert.equal(state.offer.courseLabel, 'Administração');
  assert.equal(state.offer.modalityLabel, 'EAD');
  assert.equal(state.offer.campusLabel, 'Polo Bela Vista');
  assert.equal(state.offer.priceLabel, 'R$ 198,00');
});

run('filters modalities and campuses from the selected course only', () => {
  const model = buildEnrollmentPageModel(sheetSnapshot);
  const state = getEnrollmentPageState(model, {
    formation: 'graduacao',
    course: 'administracao',
  });

  assert.deepEqual(
    state.options.modalities.map((item) => item.value),
    ['ead', 'presencial'],
  );
  assert.deepEqual(state.options.campuses, []);
  assert.equal(state.steps.current, 'modality');
});

run('changing course clears dependent fields and rebuilds valid options', () => {
  const model = buildEnrollmentPageModel(sheetSnapshot);
  const nextSelection = updateEnrollmentSelection(model, {
    formation: 'graduacao',
    course: 'administracao',
    modality: 'ead',
    campus: 'polo-lapa',
  }, {
    course: 'pedagogia',
  });
  const state = getEnrollmentPageState(model, nextSelection);

  assert.deepEqual(nextSelection, {
    formation: 'graduacao',
    course: 'pedagogia',
    modality: null,
    campus: null,
  });
  assert.deepEqual(
    state.options.modalities.map((item) => item.value),
    ['semipresencial'],
  );
  assert.equal(state.offer, null);
});

run('does not expose unavailable offers as selectable campuses', () => {
  const model = buildEnrollmentPageModel(sheetSnapshot);
  const state = getEnrollmentPageState(model, {
    formation: 'graduacao',
    course: 'traducao-interpretacao-ingles-portugues',
    modality: 'ead-ao-vivo',
  });

  assert.deepEqual(
    state.options.campuses.map((item) => item.value),
    ['polo-bela-vista'],
  );
});
