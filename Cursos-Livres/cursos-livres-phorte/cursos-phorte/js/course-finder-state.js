const preferredFormats = ['Curso', 'Curso + Livro', 'Formação'];

function uniqueValues(courses, field) {
  return [...new Set(courses
    .map((course) => course[field])
    .filter((value) => typeof value === 'string' && value.trim()))];
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
  const hours = numericBounds(courses, 'hours');
  const prices = numericBounds(courses, 'price');

  return {
    formats,
    areas: uniqueValues(courses, 'area'),
    modalities: uniqueValues(courses, 'modality'),
    minHours: hours.min,
    maxHours: hours.max,
    minPrice: prices.min,
    maxPrice: prices.max,
  };
}

function createInitialFilters(options) {
  return {
    query: '',
    formats: [],
    area: '',
    modality: '',
    minHours: options.minHours,
    maxHours: options.maxHours,
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
  createInitialFilters,
  getCourseFilterOptions,
  getPageNumbers,
  getRangeThumbZIndex,
  paginateCourses,
};
