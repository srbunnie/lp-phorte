import {
  buildInterestChoices,
  resolveInterestChoice,
} from './popup-interest-options.js';

function slugify(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function setFieldValue(field, value) {
  if (!field) return;
  field.value = value ?? '';
  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

function renderInterestSelect(field, choices, selectedValue, onChange) {
  if (!field) return;

  field.innerHTML = '';

  choices.forEach((choice) => {
    const option = document.createElement('option');
    option.value = choice.value;
    option.textContent = choice.label;
    option.selected = selectedValue ? choice.value === selectedValue : choice.selected;
    field.appendChild(option);
  });

  field.value = selectedValue ?? choices.find((choice) => choice.selected)?.value ?? choices[0]?.value ?? '';

  field.onchange = () => {
    onChange(field.value);
  };
}

function renderPoloSelect(field, poloOptions, selectedValue) {
  if (!field) return;

  field.innerHTML = '';

  poloOptions.forEach((poloName) => {
    const option = document.createElement('option');
    option.value = poloName;
    option.textContent = poloName;
    field.appendChild(option);
  });

  field.value = poloOptions.includes(selectedValue) ? selectedValue : (poloOptions[0] ?? '');
  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

export function bindPhortePopupForm(config) {
  const {
    root = document,
    eventTarget = document,
    popupSelector = '[data-phorte-popup]',
    courseFieldSelector = '[name="curso_de_interesse"]',
    modalityFieldSelector = '[name="modalidade"]',
    interestChoicesSelector = '[data-phorte-interest-select]',
    interestCatalogByModalidade = {},
    poloCatalogByCourseAndModalidade = {},
    poloFieldSelector = '[name="polo"]',
    summarySelector = '[data-phorte-popup-summary]',
  } = config ?? {};

  eventTarget.addEventListener('phorte:open-enrollment-popup', (event) => {
    const payload = event.detail ?? window.__PHORTE_ENROLLMENT_CONTEXT;
    if (!payload) return;

    const popup = root.querySelector(popupSelector);
    if (!popup) return;

    const choices = buildInterestChoices(interestCatalogByModalidade, payload);
    const interestSelect = popup.querySelector(interestChoicesSelector);
    const selectedChoice = choices.find((choice) => choice.selected) ?? choices[0] ?? null;
    const poloField = popup.querySelector(poloFieldSelector);

    const resolvePoloOptions = (choice) => {
      const modalidadeKey = slugify(choice?.modalidade);
      const courseKey = slugify(choice?.curso);

      return poloCatalogByCourseAndModalidade?.[modalidadeKey]?.[courseKey] ?? [payload.polo];
    };

    const applyChoice = (selectedValue) => {
      const choice = resolveInterestChoice(choices, selectedValue);
      if (!choice) return;

      setFieldValue(popup.querySelector(courseFieldSelector), choice.curso);
      setFieldValue(popup.querySelector(modalityFieldSelector), choice.modalidade);
      renderPoloSelect(poloField, resolvePoloOptions(choice), payload.polo);
    };

    renderInterestSelect(
      interestSelect,
      choices,
      selectedChoice?.value,
      applyChoice,
    );

    applyChoice(selectedChoice?.value);

    const summary = popup.querySelector(summarySelector);
    if (summary) {
      summary.textContent = `${payload.curso} • ${payload.modalidade} • ${payload.polo}`;
    }

    popup.dataset.popupId = payload.popupId ?? '';
    popup.classList.add('is-open');
  });
}
