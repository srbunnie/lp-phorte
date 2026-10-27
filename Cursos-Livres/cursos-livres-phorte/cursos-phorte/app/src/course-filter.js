const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR');

const inRange = (value, min, max) => Number.isFinite(value)
  && value >= (Number.isFinite(min) ? min : Number.NEGATIVE_INFINITY)
  && value <= (Number.isFinite(max) ? max : Number.POSITIVE_INFINITY);

export function filterCourses(courses, filters) {
  const query = normalize(filters.query).trim();
  const formats = new Set(filters.formats ?? []);
  const selectedArea = filters.area ?? '';
  const selectedModality = filters.modality ?? '';

  const matches = courses.map((course, index) => ({ course, index })).filter(({ course }) => {
    if (query && !normalize(course.title).includes(query)) return false;
    if (formats.size > 0 && !formats.has(course.format)) return false;
    if (selectedArea && course.area !== selectedArea) return false;
    if (selectedModality && course.modality !== selectedModality) return false;
    if (!inRange(course.hours, filters.minHours, filters.maxHours)) return false;
    if (!inRange(course.price, filters.minPrice, filters.maxPrice)) return false;
    return true;
  });

  const comparators = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }),
    'name-desc': (a, b) => b.title.localeCompare(a.title, 'pt-BR', { sensitivity: 'base' }),
  };
  const compare = comparators[filters.sortBy];

  if (compare) matches.sort((a, b) => compare(a.course, b.course) || a.index - b.index);
  return matches.map(({ course }) => course);
}
