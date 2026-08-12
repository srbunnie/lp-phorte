function slugify(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildInterestChoices(catalogByModalidade = {}, payload = {}) {
  const modalidade = String(payload.modalidade ?? '').trim();
  const curso = String(payload.curso ?? '').trim();
  const modalidadeKey = slugify(modalidade);
  const currentCourseKey = slugify(curso);

  const catalog = catalogByModalidade[modalidadeKey];
  const cursos = Array.isArray(catalog) && catalog.length ? catalog : [curso];
  const hasCurrentCourse = cursos.some((item) => slugify(item) === currentCourseKey);

  return cursos.map((item, index) => {
    const currentCurso = String(item ?? '').trim();
    const currentItemKey = slugify(currentCurso);
    return {
      value: `${slugify(currentCurso)}::${modalidadeKey}`,
      label: `${currentCurso} ${modalidade}`.trim(),
      curso: currentCurso,
      modalidade,
      selected: hasCurrentCourse ? currentItemKey === currentCourseKey : index === 0,
    };
  });
}

export function resolveInterestChoice(choices = [], selectedValue) {
  return choices.find((choice) => choice.value === selectedValue) ?? choices[0] ?? null;
}
