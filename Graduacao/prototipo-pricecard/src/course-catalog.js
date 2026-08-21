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

export function buildInterestCatalogByModalidade(offers = []) {
  const catalog = {};

  for (const offer of offers) {
    if (!parseBoolean(offer.disponivel)) {
      continue;
    }

    const modalidadeKey = slugify(offer.modalidade);
    const courseName = String(offer.curso_nome ?? '').trim();

    if (!modalidadeKey || !courseName) {
      continue;
    }

    catalog[modalidadeKey] ??= [];

    if (!catalog[modalidadeKey].includes(courseName)) {
      catalog[modalidadeKey].push(courseName);
    }
  }

  return catalog;
}

export function buildPoloCatalogByModalidade(offers = []) {
  const catalog = {};

  for (const offer of offers) {
    if (!parseBoolean(offer.disponivel)) {
      continue;
    }

    const modalidadeKey = slugify(offer.modalidade);
    const poloName = String(offer.polo_nome ?? '').trim();

    if (!modalidadeKey || !poloName) {
      continue;
    }

    catalog[modalidadeKey] ??= [];

    if (!catalog[modalidadeKey].includes(poloName)) {
      catalog[modalidadeKey].push(poloName);
    }
  }

  return catalog;
}

export function buildPoloCatalogByCourseAndModalidade(offers = []) {
  const catalog = {};

  for (const offer of offers) {
    if (!parseBoolean(offer.disponivel)) {
      continue;
    }

    const modalidadeKey = slugify(offer.modalidade);
    const courseKey = slugify(offer.curso_nome);
    const poloName = String(offer.polo_nome ?? '').trim();

    if (!modalidadeKey || !courseKey || !poloName) {
      continue;
    }

    catalog[modalidadeKey] ??= {};
    catalog[modalidadeKey][courseKey] ??= [];

    if (!catalog[modalidadeKey][courseKey].includes(poloName)) {
      catalog[modalidadeKey][courseKey].push(poloName);
    }
  }

  return catalog;
}

export function buildEnrollmentSource(snapshot, courseId) {
  const normalizedCourseId = slugify(courseId);
  const courses = Array.isArray(snapshot?.courses) ? snapshot.courses : [];
  const offers = Array.isArray(snapshot?.offers) ? snapshot.offers : [];

  const course = courses.find((item) => slugify(item.curso_id) === normalizedCourseId);

  if (!course) {
    throw new Error(`Course not found in catalog: ${courseId}`);
  }

  const valorBase = parseCurrency(course.valor_base);
  const mecBadgeLabel = parseBoolean(course.nota_5_mec) ? 'Nota 5 ★ no Mec' : '';
  const interestCatalogByModalidade = buildInterestCatalogByModalidade(offers);
  const poloCatalogByModalidade = buildPoloCatalogByModalidade(offers);
  const poloCatalogByCourseAndModalidade = buildPoloCatalogByCourseAndModalidade(offers);

  const cardOffers = offers
    .filter(
      (offer) =>
        slugify(offer.curso_id) === normalizedCourseId &&
        parseBoolean(offer.disponivel),
    )
    .map((offer) => ({
      curso: course.curso_id,
      cursoLabel: course.curso_nome,
      mecBadgeLabel,
      modalidade: offer.modalidade,
      modalidadeLabel: offer.modalidade,
      polo: offer.polo_nome,
      poloLabel: offer.polo_nome,
      preco: parseCurrency(offer.valor),
      valorBase,
      disponivel: true,
      popupId: `popup-${normalizedCourseId}-${slugify(offer.modalidade)}`,
      turmaAtiva: offer.turma_ativa,
      turmaConfirmada: parseBoolean(offer.turma_confirmada),
    }));

  if (!cardOffers.length) {
    throw new Error(`No available offers found for course: ${courseId}`);
  }

  return {
    course: {
      courseId: course.curso_id,
      courseLabel: course.curso_nome,
      valorBase,
      mecBadgeLabel,
      aprovadoMec: parseBoolean(course.aprovado_mec),
    },
    cardOffers,
    interestCatalogByModalidade,
    poloCatalogByModalidade,
    poloCatalogByCourseAndModalidade,
  };
}

export function listAvailableCourses(snapshot) {
  const courses = Array.isArray(snapshot?.courses) ? snapshot.courses : [];
  const offers = Array.isArray(snapshot?.offers) ? snapshot.offers : [];
  const availableCourseIds = new Set(
    offers
      .filter((offer) => parseBoolean(offer.disponivel))
      .map((offer) => slugify(offer.curso_id)),
  );

  return courses
    .filter((course) => availableCourseIds.has(slugify(course.curso_id)))
    .map((course) => ({
      courseId: course.curso_id,
      courseLabel: course.curso_nome,
    }));
}
