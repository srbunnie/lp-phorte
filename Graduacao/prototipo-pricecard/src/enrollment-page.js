function slugify(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseBoolean(value) {
  return String(value ?? '').trim().toUpperCase() === 'TRUE';
}

function parseCurrency(value) {
  const numeric = String(value ?? '')
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  return Number.parseFloat(numeric);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value).replace(/\u00a0/g, ' ');
}

function buildOfferId(formationId, courseId, modalityId, campusId) {
  return [formationId, courseId, modalityId, campusId].join('__');
}

function toOption(value, label) {
  return { value, label };
}

function pushUniqueOption(list, value, label) {
  if (!value || list.some((item) => item.value === value)) {
    return;
  }

  list.push(toOption(value, label));
}

function normalizeCourse(course) {
  return {
    courseId: slugify(course.curso_id),
    courseLabel: String(course.curso_nome ?? '').trim(),
    valorBase: parseCurrency(course.valor_base),
    mecApproved: parseBoolean(course.aprovado_mec),
    mecFiveStars: parseBoolean(course.nota_5_mec),
  };
}

function normalizeOffer(offer) {
  const courseId = slugify(offer.curso_id);
  const courseLabel = String(offer.curso_nome ?? '').trim();
  const formationId = slugify(offer.formacao_id || 'graduacao');
  const modalityLabel = String(offer.modalidade ?? '').trim();
  const modalityId = slugify(offer.modalidade_id || modalityLabel);
  const campusLabel = String(offer.polo_nome ?? '').trim();
  const campusId = slugify(offer.polo_id || campusLabel);
  const offerId = String(
    offer.offer_id || buildOfferId(formationId, courseId, modalityId, campusId),
  ).trim();

  return {
    offerId,
    formationId,
    formationLabel: formationId === 'graduacao' ? 'Graduação' : String(offer.formacao_id ?? '').trim(),
    courseId,
    courseLabel,
    modalityId,
    modalityLabel,
    campusId,
    campusLabel,
    priceValue: parseCurrency(offer.valor),
    priceLabel: formatCurrency(parseCurrency(offer.valor)),
    turmaLabel: String(offer.turma_label || offer.turma_ativa || '').trim(),
    turmaConfirmada: parseBoolean(offer.turma_confirmada),
    available: parseBoolean(offer.disponivel),
    courseActive: offer.curso_ativo == null ? true : parseBoolean(offer.curso_ativo),
  };
}

function sanitizeSelection(selection = {}) {
  return {
    formation: selection.formation ? slugify(selection.formation) : null,
    course: selection.course ? slugify(selection.course) : null,
    modality: selection.modality ? slugify(selection.modality) : null,
    campus: selection.campus ? slugify(selection.campus) : null,
  };
}

function isOfferSelectable(offer) {
  return offer.available && offer.courseActive;
}

export function buildEnrollmentPageModel(snapshot = {}) {
  const courses = Array.isArray(snapshot.courses)
    ? snapshot.courses.map(normalizeCourse)
    : [];
  const offers = Array.isArray(snapshot.offers)
    ? snapshot.offers.map(normalizeOffer).filter(isOfferSelectable)
    : [];

  return {
    courses,
    offers,
  };
}

export function updateEnrollmentSelection(model, currentSelection = {}, patch = {}) {
  const next = sanitizeSelection(currentSelection);

  for (const key of ['formation', 'course', 'modality', 'campus']) {
    if (Object.prototype.hasOwnProperty.call(patch, key)) {
      next[key] = patch[key] ? slugify(patch[key]) : null;
    }
  }

  if (Object.prototype.hasOwnProperty.call(patch, 'formation')) {
    next.course = null;
    next.modality = null;
    next.campus = null;
  }

  if (Object.prototype.hasOwnProperty.call(patch, 'course')) {
    next.modality = null;
    next.campus = null;
  }

  if (Object.prototype.hasOwnProperty.call(patch, 'modality')) {
    next.campus = null;
  }

  return next;
}

export function getEnrollmentPageState(model, rawSelection = {}) {
  const selection = sanitizeSelection(rawSelection);
  const formationOptions = [];
  const courseOptions = [];
  const modalityOptions = [];
  const campusOptions = [];

  for (const offer of model.offers) {
    pushUniqueOption(formationOptions, offer.formationId, offer.formationLabel);

    if (selection.formation && offer.formationId !== selection.formation) {
      continue;
    }

    pushUniqueOption(courseOptions, offer.courseId, offer.courseLabel);

    if (selection.course && offer.courseId !== selection.course) {
      continue;
    }

    pushUniqueOption(modalityOptions, offer.modalityId, offer.modalityLabel);

    if (selection.modality && offer.modalityId !== selection.modality) {
      continue;
    }

    pushUniqueOption(campusOptions, offer.campusId, offer.campusLabel);
  }

  const hasFormation = selection.formation && formationOptions.some((item) => item.value === selection.formation);
  const hasCourse = selection.course && courseOptions.some((item) => item.value === selection.course);
  const hasModality = selection.modality && modalityOptions.some((item) => item.value === selection.modality);
  const hasCampus = selection.campus && campusOptions.some((item) => item.value === selection.campus);

  const normalizedSelection = {
    formation: hasFormation ? selection.formation : null,
    course: hasCourse ? selection.course : null,
    modality: hasModality ? selection.modality : null,
    campus: hasCampus ? selection.campus : null,
  };

  const offer = model.offers.find(
    (item) =>
      item.formationId === normalizedSelection.formation &&
      item.courseId === normalizedSelection.course &&
      item.modalityId === normalizedSelection.modality &&
      item.campusId === normalizedSelection.campus,
  ) || null;

  let currentStep = 'formation';
  if (offer) {
    currentStep = 'form';
  } else if (normalizedSelection.campus) {
    currentStep = 'campus';
  } else if (normalizedSelection.modality) {
    currentStep = 'campus';
  } else if (normalizedSelection.course) {
    currentStep = 'modality';
  } else if (normalizedSelection.formation) {
    currentStep = 'course';
  }

  return {
    selection: normalizedSelection,
    steps: {
      current: currentStep,
    },
    options: {
      formations: formationOptions,
      courses: courseOptions,
      modalities: modalityOptions,
      campuses: normalizedSelection.modality ? campusOptions : [],
    },
    offer,
  };
}
