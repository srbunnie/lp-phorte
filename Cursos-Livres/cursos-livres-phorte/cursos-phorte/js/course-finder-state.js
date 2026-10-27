const preferredFormats = ['Curso', 'Curso + Livro', 'Formação'];
const durationBuckets = [
  { id: 'ate-10', label: 'Até 10 h', max: 10 },
  { id: '11-50', label: 'De 11 a 50 h', min: 11, max: 50 },
  { id: 'acima-50', label: 'Acima de 50 h', min: 51 },
];

function matchesDuration(hours, bucketIds) {
  if (!bucketIds || bucketIds.length === 0) return true;
  return durationBuckets.some((bucket) => bucketIds.includes(bucket.id)
    && Number.isFinite(hours)
    && hours >= (bucket.min ?? Number.NEGATIVE_INFINITY)
    && hours <= (bucket.max ?? Number.POSITIVE_INFINITY));
}

function uniqueValues(courses, field) {
  return [...new Set(courses
    .map((course) => course[field])
    .filter((value) => typeof value === 'string' && value.trim()))];
}

// Valores de campos-lista (areas, topics), do mais frequente para o menos frequente.
function listValuesByCount(courses, field) {
  const counts = new Map();
  courses.forEach((course) => (course[field] ?? []).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1)));
  return [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
}

function numericBounds(courses, field) {
  const values = courses.map((course) => course[field]).filter(Number.isFinite);
  return values.length
    ? { min: Math.min(...values), max: Math.max(...values) }
    : { min: 0, max: 0 };
}

function getCourseFilterOptions(courses) {
  const formatOrder = new Map(preferredFormats.map((format, index) => [format, index]));
  const formats = uniqueValues(courses, 'format').sort((a, b) => {
    const aIndex = formatOrder.get(a);
    const bIndex = formatOrder.get(b);
    if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;
    return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
  });
  const prices = numericBounds(courses, 'price');

  return {
    formats,
    areas: listValuesByCount(courses, 'areas'),
    topics: listValuesByCount(courses, 'topics'),
    modalities: uniqueValues(courses, 'modality'),
    durations: durationBuckets.filter((bucket) => courses.some((course) => matchesDuration(course.hours, [bucket.id]))),
    minPrice: prices.min,
    maxPrice: prices.max,
  };
}

function createInitialFilters(options) {
  return {
    query: '',
    formats: [],
    area: '',
    topics: [],
    modality: '',
    durations: [],
    minPrice: options.minPrice,
    maxPrice: options.maxPrice,
    sortBy: 'featured',
  };
}

function clampRangePair(currentRange, handle, nextValue, bounds) {
  const [currentMin, currentMax] = currentRange;
  const [boundMin, boundMax] = bounds;
  const value = Number(nextValue);
  if (!Number.isFinite(value) || !['min', 'max'].includes(handle)) return currentRange;

  const clampedMin = Math.max(boundMin, Math.min(boundMax, currentMin));
  const clampedMax = Math.max(clampedMin, Math.min(boundMax, currentMax));
  const clampedValue = Math.max(boundMin, Math.min(boundMax, value));

  if (handle === 'min') return [Math.min(clampedValue, clampedMax), clampedMax];
  return [clampedMin, Math.max(clampedValue, clampedMin)];
}

function getRangeThumbZIndex(handle, activeHandle, isCollapsed) {
  if (!isCollapsed) return handle === 'min' ? 2 : 3;
  return handle === activeHandle ? 4 : 3;
}

function paginateCourses(courses, requestedPage, pageSize = 8) {
  const safePageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 8;
  const pageCount = Math.max(1, Math.ceil(courses.length / safePageSize));
  const requestedPageNumber = Number(requestedPage);
  const page = Number.isFinite(requestedPageNumber)
    ? Math.min(pageCount, Math.max(1, Math.floor(requestedPageNumber)))
    : 1;
  const startIndex = (page - 1) * safePageSize;
  const endIndex = Math.min(startIndex + safePageSize, courses.length);

  return {
    items: courses.slice(startIndex, endIndex),
    page,
    pageCount,
    startIndex,
    endIndex,
  };
}

function getPageNumbers(requestedPage, requestedPageCount, maxVisible = 8) {
  const pageCount = Number.isInteger(requestedPageCount) && requestedPageCount > 0 ? requestedPageCount : 1;
  const visibleLimit = Number.isInteger(maxVisible) && maxVisible > 0 ? maxVisible : 8;
  const visibleCount = Math.min(pageCount, visibleLimit);
  const requestedPageNumber = Number(requestedPage);
  const page = Number.isFinite(requestedPageNumber)
    ? Math.min(pageCount, Math.max(1, Math.floor(requestedPageNumber)))
    : 1;
  const start = Math.min(Math.max(1, page - Math.floor(visibleCount / 2)), pageCount - visibleCount + 1);

  return Array.from({ length: visibleCount }, (_, index) => start + index);
}

export {
  clampRangePair,
  durationBuckets,
  matchesDuration,
  createInitialFilters,
  getCourseFilterOptions,
  getPageNumbers,
  getRangeThumbZIndex,
  paginateCourses,
};
