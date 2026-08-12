import {
  buildEnrollmentPageModel,
  getEnrollmentPageState,
  updateEnrollmentSelection,
} from './enrollment-page.js';

async function loadCatalog() {
  const response = await fetch('./data/modelo-cursos-ofertas.json');

  if (!response.ok) {
    throw new Error(`Falha ao carregar catálogo: ${response.status}`);
  }

  return response.json();
}

function readSelectionFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return {
    formation: params.get('formation'),
    course: params.get('course'),
    modality: params.get('modality'),
    campus: params.get('campus'),
  };
}

function writeSelectionToUrl(selection) {
  const url = new URL(window.location.href);

  for (const [key, value] of Object.entries(selection)) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }

  window.history.replaceState({}, '', url);
}

function createButton({ label, value, selected = false, className = 'pill-button' }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.dataset.value = value;
  button.textContent = label;
  if (selected) {
    button.classList.add('is-selected');
  }
  return button;
}

function createQuickLink(offer, selected) {
  const button = createButton({
    label: '',
    value: offer.offerId,
    selected,
    className: 'quick-link',
  });

  button.innerHTML = `<div><strong>${offer.courseLabel}</strong><small>${offer.modalityLabel} • ${offer.campusLabel}</small></div>`;
  return button;
}

function renderEmptyState(container, text) {
  container.innerHTML = '';
  const node = document.createElement('div');
  node.className = 'empty-state';
  node.textContent = text;
  container.appendChild(node);
}

function syncHiddenFields(form, offer) {
  const fields = {
    offer_id: offer.offerId,
    offer_label: `${offer.courseLabel} • ${offer.modalityLabel} • ${offer.campusLabel}`,
    curso_id: offer.courseId,
    curso_nome: offer.courseLabel,
    modalidade_id: offer.modalityId,
    modalidade_nome: offer.modalityLabel,
    polo_id: offer.campusId,
    polo_nome: offer.campusLabel,
    turma_label: offer.turmaLabel,
  };

  for (const [name, value] of Object.entries(fields)) {
    const input = form.elements.namedItem(name);
    if (input) {
      input.value = value;
    }
  }
}

function bootstrapDefaultSelection(model) {
  const offer =
    model.offers.find((item) => item.courseId === 'administracao' && item.modalityId === 'ead') ||
    model.offers[0];

  if (!offer) {
    return {
      formation: null,
      course: null,
      modality: null,
      campus: null,
    };
  }

  return {
    formation: offer.formationId,
    course: offer.courseId,
    modality: offer.modalityId,
    campus: offer.campusId,
  };
}

function initDemo(model) {
  const sections = {
    formation: document.querySelector('[data-step-section="formation"]'),
    course: document.querySelector('[data-step-section="course"]'),
    modality: document.querySelector('[data-step-section="modality"]'),
    campus: document.querySelector('[data-step-section="campus"]'),
    form: document.querySelector('[data-step-section="form"]'),
  };
  const nodes = {
    formationOptions: document.querySelector('[data-formation-options]'),
    courseSelect: document.querySelector('[data-course-options]'),
    modalitySelect: document.querySelector('[data-modality-options]'),
    campusOptions: document.querySelector('[data-campus-options]'),
    summary: document.querySelector('[data-offer-summary]'),
    form: document.querySelector('#enrollment-demo-form'),
    feedback: document.querySelector('[data-form-feedback]'),
    essay: document.querySelector('#essay-field'),
    essayCounter: document.querySelector('[data-essay-counter]'),
    submit: document.querySelector('.demo-form__submit'),
  };

  let selection = readSelectionFromUrl();
  const hasIncomingSelection = Object.values(selection).some(Boolean);
  if (!hasIncomingSelection) {
    selection = bootstrapDefaultSelection(model);
  }

  function applySelection(patch) {
    selection = updateEnrollmentSelection(model, selection, patch);
    writeSelectionToUrl(selection);
    render();
  }

  function renderForm(offer) {
    syncHiddenFields(nodes.form, offer);
    nodes.summary.innerHTML = `
      <p class="offer-summary__eyebrow">Oferta validada</p>
      <h3 class="offer-summary__title">${offer.courseLabel}</h3>
      <p class="offer-summary__meta">
        <span>${offer.modalityLabel}</span>
        <span>${offer.campusLabel}</span>
        <span>${offer.turmaLabel}</span>
      </p>
      <div class="offer-summary__price">
        <strong>${offer.priceLabel}</strong>
        <span>/mês</span>
      </div>
      <p class="offer-summary__hint">
        Você pode voltar a qualquer etapa acima para trocar sua seleção antes de enviar.
      </p>
    `;
    sections.form.hidden = false;
    updateFormState();
  }

  function getEssayLength() {
    return String(nodes.essay?.value ?? '').trim().length;
  }

  function isFormReady() {
    if (!nodes.form || !nodes.submit) return false;
    const essayReady = getEssayLength() >= 1000;
    return nodes.form.checkValidity() && essayReady;
  }

  function updateEssayCounter() {
    if (!nodes.essayCounter) return;
    const length = getEssayLength();
    nodes.essayCounter.textContent = `${length} / 1000 caracteres mínimos`;
    nodes.essayCounter.classList.toggle('is-valid', length >= 1000);
  }

  function updateFormState() {
    updateEssayCounter();
    if (nodes.submit) {
      nodes.submit.disabled = !isFormReady();
    }
  }

  function render() {
    const state = getEnrollmentPageState(model, selection);
    for (const [step, section] of Object.entries(sections)) {
      const order = ['formation', 'course', 'modality', 'campus', 'form'];
      const currentIndex = order.indexOf(state.steps.current);
      const sectionIndex = order.indexOf(step);
      section.classList.toggle('is-active', step === state.steps.current || (step === 'form' && !!state.offer));
      section.classList.toggle('is-disabled', sectionIndex > currentIndex && !(step === 'form' && state.offer));
    }

    nodes.formationOptions.innerHTML = '';
    state.options.formations.forEach((item) => {
      const button = createButton({
        label: item.label,
        value: item.value,
        selected: state.selection.formation === item.value,
      });
      button.addEventListener('click', () => applySelection({ formation: item.value }));
      nodes.formationOptions.appendChild(button);
    });

    nodes.courseSelect.innerHTML = '';
    {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Selecione um curso';
      nodes.courseSelect.appendChild(placeholder);

      state.options.courses.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.label;
        option.selected = state.selection.course === item.value;
        nodes.courseSelect.appendChild(option);
      });
      nodes.courseSelect.value = state.selection.course || '';
    }

    nodes.modalitySelect.innerHTML = '';
    {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = state.selection.course
        ? 'Selecione uma modalidade'
        : 'Escolha um curso antes';
      nodes.modalitySelect.appendChild(placeholder);

      state.options.modalities.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.label;
        option.selected = state.selection.modality === item.value;
        nodes.modalitySelect.appendChild(option);
      });
      nodes.modalitySelect.value = state.selection.modality || '';
      nodes.modalitySelect.disabled = !state.selection.course;
    }

    nodes.campusOptions.innerHTML = '';
    if (!state.selection.modality) {
      renderEmptyState(nodes.campusOptions, 'Escolha a modalidade para ver os polos válidos.');
    } else {
      state.options.campuses.forEach((item) => {
        const button = createButton({
          label: item.label,
          value: item.value,
          selected: state.selection.campus === item.value,
        });
        button.addEventListener('click', () => applySelection({ campus: item.value }));
        nodes.campusOptions.appendChild(button);
      });
    }

    if (state.offer) {
      renderForm(state.offer);
    } else {
      sections.form.hidden = true;
      nodes.summary.innerHTML = '';
      if (nodes.submit) {
        nodes.submit.disabled = true;
      }
    }
  }

  nodes.courseSelect.addEventListener('change', () => {
    applySelection({ course: nodes.courseSelect.value || null });
  });

  nodes.modalitySelect.addEventListener('change', () => {
    applySelection({ modality: nodes.modalitySelect.value || null });
  });

  nodes.form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isFormReady()) {
      updateFormState();
      return;
    }
    const data = new FormData(nodes.form);
    nodes.feedback.hidden = false;
    nodes.feedback.textContent = JSON.stringify(Object.fromEntries(data.entries()), null, 2);
  });

  nodes.form.addEventListener('input', () => updateFormState());
  nodes.form.addEventListener('change', () => updateFormState());

  render();
}

loadCatalog()
  .then(buildEnrollmentPageModel)
  .then(initDemo)
  .catch((error) => {
    const fallback = document.createElement('pre');
    fallback.className = 'demo-form__feedback';
    fallback.hidden = false;
    fallback.textContent = error.stack || error.message;
    document.body.appendChild(fallback);
  });
