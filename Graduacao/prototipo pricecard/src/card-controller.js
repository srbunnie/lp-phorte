const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function slugify(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeOffer(offer) {
  const modalidade = slugify(offer.modalidade);
  const polo = slugify(offer.polo);
  const curso = String(offer.curso ?? '').trim();

  if (!curso || !modalidade || !polo) {
    throw new Error('Each offer must include curso, modalidade and polo.');
  }

  return {
    curso,
    cursoLabel: offer.cursoLabel ?? curso,
    mecBadgeLabel: offer.mecBadgeLabel ?? '',
    modalidade,
    modalidadeLabel: offer.modalidadeLabel ?? String(offer.modalidade ?? ''),
    polo,
    poloLabel: offer.poloLabel ?? String(offer.polo ?? ''),
    preco: Number(offer.preco),
    valorBase: Number(offer.valorBase),
    disponivel: offer.disponivel !== false,
    popupId: offer.popupId ?? '',
    observacaoPreco: offer.observacaoPreco ?? '',
    ctaLabel: offer.ctaLabel ?? 'Fazer Inscrição',
    turmaAtiva: offer.turmaAtiva ?? '',
    turmaConfirmada: offer.turmaConfirmada === true,
  };
}

function buildOptionMap(items, key, labelKey) {
  const map = new Map();

  for (const item of items) {
    if (!map.has(item[key])) {
      map.set(item[key], {
        value: item[key],
        label: item[labelKey],
      });
    }
  }

  return map;
}

export function buildCardModel(rawOffers) {
  const offers = rawOffers.map(normalizeOffer).filter((offer) => offer.disponivel);

  if (!offers.length) {
    throw new Error('At least one available offer is required.');
  }

  const modalidades = buildOptionMap(offers, 'modalidade', 'modalidadeLabel');
  const polos = buildOptionMap(offers, 'polo', 'poloLabel');

  return {
    curso: offers[0].curso,
    cursoLabel: offers[0].cursoLabel,
    valorBase: Number.isFinite(offers[0].valorBase) ? offers[0].valorBase : null,
    mecBadgeLabel: offers.find((offer) => offer.mecBadgeLabel)?.mecBadgeLabel ?? '',
    offers,
    modalidades: [...modalidades.values()],
    polos: [...polos.values()],
  };
}

function isOptionCompatible(offers, selection, type, value) {
  return offers.some((offer) => {
    if (offer[type] !== value) return false;
    if (selection.modalidade && type !== 'modalidade' && offer.modalidade !== selection.modalidade) {
      return false;
    }
    if (selection.polo && type !== 'polo' && offer.polo !== selection.polo) {
      return false;
    }
    return true;
  });
}

function resolveOffer(offers, selection) {
  if (!selection.modalidade || !selection.polo) {
    return null;
  }

  return offers.find((offer) => offer.modalidade === selection.modalidade && offer.polo === selection.polo) ?? null;
}

function resolveFallbackOffer(offers, selection) {
  const candidates = offers.filter((offer) => {
    if (selection.modalidade && offer.modalidade !== selection.modalidade) {
      return false;
    }
    if (selection.polo && offer.polo !== selection.polo) {
      return false;
    }
    return true;
  });

  if (!candidates.length) {
    return null;
  }

  return candidates.reduce((lowest, offer) => {
    if (!lowest || offer.preco < lowest.preco) {
      return offer;
    }

    return lowest;
  }, null);
}

function formatPrice(value) {
  return currencyFormatter.format(value).replace(/\u00a0/g, ' ');
}

function formatTurmaLabel(offer) {
  if (!offer?.turmaAtiva) {
    return null;
  }

  return offer.turmaConfirmada ? `${offer.turmaAtiva} Confirmada` : offer.turmaAtiva;
}

export function getCardState(model, selection = {}) {
  const normalizedSelection = {
    modalidade: selection.modalidade ? slugify(selection.modalidade) : null,
    polo: selection.modalidade && selection.polo ? slugify(selection.polo) : null,
  };

  const selectedOffer = resolveOffer(model.offers, normalizedSelection);
  const fallbackOffer = selectedOffer ?? resolveFallbackOffer(model.offers, normalizedSelection);
  const isReady = Boolean(selectedOffer);
  const displayOffer = selectedOffer ?? fallbackOffer;
  const displayPrice = selectedOffer?.preco ?? model.valorBase ?? fallbackOffer?.preco ?? null;

  const modalidades = model.modalidades.map((item) => ({
    ...item,
    active: normalizedSelection.modalidade === item.value,
    disabled: false,
  }));

  const polos = normalizedSelection.modalidade
    ? model.polos
        .filter((item) => isOptionCompatible(model.offers, normalizedSelection, 'polo', item.value))
        .map((item) => ({
          ...item,
          active: normalizedSelection.polo === item.value,
          disabled: false,
        }))
    : [];

  return {
    curso: model.cursoLabel,
    selection: normalizedSelection,
    isReady,
    badges: {
      mecBadgeLabel: model.mecBadgeLabel || null,
      turmaLabel: formatTurmaLabel(displayOffer),
    },
    flow: {
      showPoloStep: Boolean(normalizedSelection.modalidade),
    },
    modalidades,
    polos,
    summary: {
      modalidade: selectedOffer?.modalidadeLabel ?? null,
      polo: selectedOffer?.poloLabel ?? null,
    },
    price: {
      isFromLabel: !isReady,
      prefix: 'A partir de',
      value: Number.isFinite(displayPrice) ? formatPrice(displayPrice) : null,
      suffix: '/mês',
      note:
        selectedOffer?.observacaoPreco ??
        fallbackOffer?.observacaoPreco ??
        'Preços podem variar de acordo com a forma de entrega e a localidade.',
    },
    cta: {
      disabled: !isReady,
      label: isReady ? selectedOffer.ctaLabel : 'Selecione modalidade e polo',
    },
    popupId: selectedOffer?.popupId ?? null,
    formPayload: selectedOffer
      ? {
          curso: model.cursoLabel,
          modalidade: selectedOffer.modalidadeLabel,
          polo: selectedOffer.poloLabel,
          popupId: selectedOffer.popupId,
        }
      : null,
  };
}

function renderChipGroup(container, items, selectionType, onSelect) {
  container.innerHTML = '';

  for (const item of items) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'phorte-card__chip';
    button.dataset.value = item.value;
    button.dataset.type = selectionType;
    button.textContent = item.label;
    button.setAttribute('aria-pressed', String(item.active));

    if (item.active) {
      button.classList.add('is-active');
    }

    if (item.disabled) {
      button.disabled = true;
      button.classList.add('is-disabled');
    }

    button.addEventListener('click', () => onSelect(item.value));
    container.appendChild(button);
  }
}

function setText(element, value) {
  if (element) {
    element.textContent = value ?? '';
  }
}

function setHiddenField(root, selector, value) {
  if (!selector) return;

  const field = root.querySelector(selector);
  if (!field) return;

  field.value = value ?? '';
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

function dispatchPopupEvent(root, state) {
  const detail = {
    ...state.formPayload,
    popupId: state.popupId,
  };

  window.__PHORTE_ENROLLMENT_CONTEXT = detail;
  root.dispatchEvent(
    new CustomEvent('phorte:open-enrollment-popup', {
      bubbles: true,
      detail,
    }),
  );
}

export function initEnrollmentCard(root, offers, options = {}) {
  const model = buildCardModel(offers);
  const selection = {
    modalidade: null,
    polo: null,
  };

  const refs = {
    title: root.querySelector('[data-phorte-course-title]'),
    modalidades: root.querySelector('[data-phorte-modalidades]'),
    polos: root.querySelector('[data-phorte-polos]'),
    poloPlaceholder: root.querySelector('[data-phorte-polo-placeholder]'),
    mecBadge: root.querySelector('[data-phorte-badge-mec]'),
    turmaBadge: root.querySelector('[data-phorte-badge-turma]'),
    precoPrefixo: root.querySelector('[data-phorte-preco-prefixo]'),
    precoValor: root.querySelector('[data-phorte-preco-valor]'),
    precoSufixo: root.querySelector('[data-phorte-preco-sufixo]'),
    cta: root.querySelector('[data-phorte-cta]'),
    popupId: root.querySelector('[data-phorte-popup-id]'),
  };

  const syncFormFields = (payload) => {
    if (!payload) return;

    setHiddenField(document, options.courseFieldSelector, payload.curso);
    setHiddenField(document, options.modalityFieldSelector, payload.modalidade);
    setHiddenField(document, options.poloFieldSelector, payload.polo);
  };

  const update = () => {
    const state = getCardState(model, selection);

    setText(refs.title, state.curso);

    renderChipGroup(refs.modalidades, state.modalidades, 'modalidade', (value) => {
      const nextValue = selection.modalidade === value ? null : value;
      selection.modalidade = nextValue;

      if (
        selection.polo &&
        nextValue &&
        !isOptionCompatible(
          model.offers,
          {
            modalidade: nextValue,
            polo: selection.polo,
          },
          'polo',
          selection.polo,
        )
      ) {
        selection.polo = null;
      }

      update();
    });

    renderChipGroup(refs.polos, state.polos, 'polo', (value) => {
      selection.polo = selection.polo === value ? null : value;
      update();
    });

    if (refs.poloPlaceholder) {
      refs.poloPlaceholder.hidden = state.flow.showPoloStep;
    }

    if (refs.polos) {
      refs.polos.hidden = !state.flow.showPoloStep;
    }

    if (refs.mecBadge) {
      refs.mecBadge.hidden = !state.badges.mecBadgeLabel;
      setText(refs.mecBadge, state.badges.mecBadgeLabel ?? '');
    }

    if (refs.turmaBadge) {
      refs.turmaBadge.hidden = !state.badges.turmaLabel;
      setText(refs.turmaBadge, state.badges.turmaLabel ?? '');
    }

    setText(refs.precoPrefixo, state.price.prefix ?? '');
    setText(refs.precoValor, state.price.value ?? '--');
    setText(refs.precoSufixo, state.price.suffix);
    setText(refs.popupId, state.popupId ?? '');

    refs.cta.disabled = state.cta.disabled;
    refs.cta.textContent = state.cta.label;
    refs.cta.dataset.popupId = state.popupId ?? '';

    refs.cta.onclick = () => {
      if (!state.isReady) return;

      syncFormFields(state.formPayload);
      dispatchPopupEvent(root, state);
    };
  };

  update();

  return {
    getState: () => getCardState(model, selection),
  };
}
