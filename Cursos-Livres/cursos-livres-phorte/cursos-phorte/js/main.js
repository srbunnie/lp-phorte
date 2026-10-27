import { courses } from './courses.js';
import { categorySlugs, courseAreaImages, filterPageUrl, topicsArea } from './course-areas.js';
import { filterCourses } from './course-filter.js';
import {
  clampRangePair,
  createInitialFilters,
  getCourseFilterOptions,
  getRangeThumbZIndex,
} from './course-finder-state.js';

// O catálogo da landing é uma prévia; a lista completa fica na página de filtros do site.
const previewSize = 5;
const popularTopicLimit = 4;
const visibleTopicOptions = 6;
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatCategories = [
  { format: 'Curso', title: 'Curso', description: 'Conteúdo direto ao ponto para ampliar seus conhecimentos.', icon: 'book' },
  { format: 'Curso + Livro', title: 'Curso + Livro', description: 'O curso acompanhado de material complementar em livro.', icon: 'books' },
  { format: 'Formação', title: 'Formação', description: 'Percurso mais completo para aprofundar conhecimentos e práticas.', icon: 'certificate' },
];
const icons = {
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>',
  close: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>',
  book: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"></path><path d="M4 4.5v17M8 6h8M8 10h8"></path></svg>',
  books: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h7v18H5zM14 4l5-1 3 17-5 1zM7 7h3M7 11h3M7 15h3M16 7l2-.3M17 12l2-.3"></path></svg>',
  certificate: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M7 8h8M7 12h5m5 3 2 1.5 2-1.5v6l-2-1.3-2 1.3z"></path></svg>',
  moreArrow: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>',
};

const options = getCourseFilterOptions(courses);
let filters = createInitialFilters(options);
const activeRangeHandle = { prices: 'max' };
const resultsCount = document.getElementById('course-results-count');
const resultsGrid = document.getElementById('course-results-grid');
const activeFiltersList = document.getElementById('course-active-filters');
const filterCountBadge = document.getElementById('course-filter-count');
const formatGrid = document.getElementById('course-format-grid');
const featuredAreas = document.getElementById('course-featured-areas');
const dialog = document.getElementById('course-finder-mobile-dialog');
const filterToggle = document.querySelector('.course-finder__toggle');
const heroSearch = document.getElementById('course-hero-search');
const searchBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function controlId(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

function courseCountLabel(count) {
  return count + (count === 1 ? ' curso' : ' cursos');
}

function countCourses(partialFilters) {
  return filterCourses(courses, { ...createInitialFilters(options), ...partialFilters }).length;
}

function rangePercent(value, min, max) {
  const span = max - min || 1;
  return Math.max(0, Math.min(100, ((value - min) / span) * 100));
}

function hasPriceFilter() {
  return filters.minPrice > options.minPrice || filters.maxPrice < options.maxPrice;
}

function renderPriceFilter(prefix) {
  const min = options.minPrice;
  const max = options.maxPrice;
  const minPercent = rangePercent(filters.minPrice, min, max);
  const maxPercent = rangePercent(filters.maxPrice, min, max);
  const collapsed = filters.minPrice === filters.maxPrice;

  return '<fieldset class="course-filter-group course-filter-range">' +
    '<legend>Preço</legend>' +
    '<div class="course-filter-range__track">' +
      '<span class="course-filter-range__rail" aria-hidden="true"></span>' +
      '<span class="course-filter-range__selection" data-range-selection="prices" style="left:' + minPercent + '%;width:' + (maxPercent - minPercent) + '%" aria-hidden="true"></span>' +
      '<input id="course-' + prefix + '-price-min" class="course-filter-range__input course-filter-range__input--min" type="range" min="' + min + '" max="' + max + '" step="0.1" value="' + filters.minPrice + '" data-range-key="prices" data-range-handle="min" aria-label="Preço mínimo" style="z-index:' + getRangeThumbZIndex('min', activeRangeHandle.prices, collapsed) + '">' +
      '<input id="course-' + prefix + '-price-max" class="course-filter-range__input course-filter-range__input--max" type="range" min="' + min + '" max="' + max + '" step="0.1" value="' + filters.maxPrice + '" data-range-key="prices" data-range-handle="max" aria-label="Preço máximo" style="z-index:' + getRangeThumbZIndex('max', activeRangeHandle.prices, collapsed) + '">' +
    '</div>' +
    '<output class="course-filter-range__value" data-range-output="prices">' + currency.format(filters.minPrice) + ' – ' + currency.format(filters.maxPrice) + '</output>' +
  '</fieldset>';
}

// Quantos cursos o resultado teria se esta opção fosse escolhida, mantendo os demais filtros.
function facetCount(facet, value) {
  const facetFilters = {
    area: { area: value },
    topic: { topics: [value] },
    format: { formats: [value] },
    duration: { durations: [value] },
    modality: { modality: value },
  };
  return filterCourses(courses, { ...filters, ...facetFilters[facet] }).length;
}

function renderOption(prefix, type, inputType, value, label) {
  const id = 'course-' + prefix + '-' + type + '-' + (controlId(value) || 'all');
  const name = inputType === 'radio' ? ' name="course-' + type + '-' + prefix + '"' : '';
  return '<label for="' + id + '" data-facet="' + type + '"><input id="' + id + '" type="' + inputType + '"' + name + ' data-filter="' + type + '" value="' + escapeHtml(value) + '">' +
    '<span>' + escapeHtml(label) + '</span>' +
    '<span class="course-filter-options__count" data-facet-count></span>' +
  '</label>';
}

function renderFilterControls(prefix) {
  const areaOptions = renderOption(prefix, 'area', 'radio', '', 'Todas') +
    options.areas.map((area) => renderOption(prefix, 'area', 'radio', area, area)).join('');
  const topicOptions = options.topics.map((topic) => renderOption(prefix, 'topic', 'checkbox', topic, topic)).join('');
  const hasHiddenTopics = options.topics.length > visibleTopicOptions;
  const formatOptions = options.formats.map((format) => renderOption(prefix, 'format', 'checkbox', format, format)).join('');
  const durationOptions = options.durations.map((bucket) => renderOption(prefix, 'duration', 'checkbox', bucket.id, bucket.label)).join('');
  const modalityOptions = options.modalities.length > 1
    ? '<fieldset class="course-filter-group"><legend>Modalidade</legend><div class="course-filter-options">' +
      renderOption(prefix, 'modality', 'radio', '', 'Todas') +
      options.modalities.map((modality) => renderOption(prefix, 'modality', 'radio', modality, modality)).join('') +
      '</div></fieldset>'
    : '';
  const topicsGroup = options.topics.length
    ? '<fieldset class="course-filter-group" data-topics-group>' +
        '<legend>Tema</legend>' +
        '<div class="course-filter-options' + (hasHiddenTopics ? ' is-collapsed' : '') + '" id="course-' + prefix + '-topic-options">' + topicOptions + '</div>' +
        (hasHiddenTopics ? '<button class="course-filter-group__more" type="button" data-toggle-topics aria-expanded="false" aria-controls="course-' + prefix + '-topic-options">Ver todos os temas (' + options.topics.length + ')</button>' : '') +
      '</fieldset>'
    : '';

  return '<fieldset class="course-filter-group"><legend>Área</legend><div class="course-filter-options">' + areaOptions + '</div></fieldset>' +
    topicsGroup +
    '<fieldset class="course-filter-group"><legend>Formato</legend><div class="course-filter-options">' + formatOptions + '</div></fieldset>' +
    '<fieldset class="course-filter-group"><legend>Duração</legend><div class="course-filter-options">' + durationOptions + '</div></fieldset>' +
    modalityOptions +
    renderPriceFilter(prefix);
}

function renderFormatCards() {
  formatGrid.innerHTML = formatCategories.map((item) => {
    const selected = filters.formats.length === 1 && filters.formats[0] === item.format;
    return '<button class="courses-format-card" type="button" data-select-format="' + escapeHtml(item.format) + '" aria-pressed="' + selected + '">' +
      '<span class="courses-format-card__icon" aria-hidden="true">' + icons[item.icon] + '</span>' +
      '<span class="courses-format-card__text">' +
        '<span class="courses-format-card__title">' + escapeHtml(item.title) + '</span>' +
        '<span class="courses-format-card__description">' + escapeHtml(item.description) + '</span>' +
      '</span>' +
      '<span class="courses-format-card__action">' + courseCountLabel(countCourses({ formats: [item.format] })) + ' ' + icons.arrow + '</span>' +
    '</button>';
  }).join('');
}

function renderCourseAreas() {
  const card = (area) => {
    const photo = courseAreaImages[area];
    return '<button class="courses-area-card' + (photo ? '' : ' courses-area-card--compact') + '" type="button" data-select-area="' + escapeHtml(area) + '" aria-pressed="' + (filters.area === area) + '">' +
      (photo ? '<img src="' + escapeHtml(photo.image) + '" alt="' + escapeHtml(photo.alt) + '" loading="lazy">' : '') +
      '<span class="courses-area-card__label"><span><strong>' + escapeHtml(area) + '</strong><small>' + courseCountLabel(countCourses({ area })) + '</small></span>' + icons.arrow + '</span>' +
    '</button>';
  };
  const featured = options.areas.filter((area) => courseAreaImages[area]);
  const compact = options.areas.filter((area) => !courseAreaImages[area]);
  featuredAreas.innerHTML = featured.map(card).join('') +
    (compact.length ? '<div class="courses-areas__compact">' + compact.map(card).join('') + '</div>' : '');
}

function areaTopics() {
  return options.topics.filter((topic) => countCourses({ area: topicsArea, topics: [topic] }) > 0);
}

function renderTopicChips() {
  document.getElementById('course-topic-chips').innerHTML = areaTopics().map((topic) =>
    '<button class="courses-topic-chip" type="button" data-select-topic="' + escapeHtml(topic) + '">' + escapeHtml(topic) + '<span>' + countCourses({ topics: [topic] }) + '</span></button>'
  ).join('');
}

function renderPopularTopics() {
  const container = document.getElementById('course-popular-topics');
  const topics = areaTopics().slice(0, popularTopicLimit);
  if (!topics.length) {
    container.hidden = true;
    return;
  }
  container.insertAdjacentHTML('beforeend', topics.map((topic) =>
    '<button class="courses-hero__topic" type="button" data-select-topic="' + escapeHtml(topic) + '">' + escapeHtml(topic) + '</button>'
  ).join(''));
}

function activeFilterChips() {
  const chips = [];
  if (filters.query.trim()) chips.push({ key: 'query', label: '“' + filters.query.trim() + '”' });
  if (filters.area) chips.push({ key: 'area', label: filters.area });
  filters.topics.forEach((topic) => chips.push({ key: 'topic', value: topic, label: topic }));
  filters.formats.forEach((format) => chips.push({ key: 'format', value: format, label: format }));
  filters.durations.forEach((id) => {
    const bucket = options.durations.find((item) => item.id === id);
    if (bucket) chips.push({ key: 'duration', value: id, label: bucket.label });
  });
  if (filters.modality) chips.push({ key: 'modality', label: filters.modality });
  if (hasPriceFilter()) chips.push({ key: 'price', label: currency.format(filters.minPrice) + ' – ' + currency.format(filters.maxPrice) });
  return chips;
}

function renderActiveFilters() {
  const chips = activeFilterChips();
  const facetCount = chips.filter((chip) => chip.key !== 'query').length;
  filterCountBadge.hidden = facetCount === 0;
  filterCountBadge.textContent = String(facetCount);
  filterToggle.setAttribute('aria-label', facetCount ? 'Filtros (' + facetCount + ' ativos)' : 'Filtros');

  activeFiltersList.innerHTML = chips.length
    ? chips.map((chip) =>
        '<button class="course-finder__chip" type="button" data-remove-filter="' + chip.key + '" data-remove-value="' + escapeHtml(chip.value ?? '') + '" aria-label="Remover filtro ' + escapeHtml(chip.label) + '">' +
          '<span>' + escapeHtml(chip.label) + '</span>' + icons.close +
        '</button>'
      ).join('') + (chips.length > 1 ? '<button class="course-finder__clear-link" type="button" data-action="reset">Limpar tudo</button>' : '')
    : '';
}

function syncFilterControls() {
  document.querySelectorAll('[data-filter="query"], #course-hero-query').forEach((input) => {
    if (input.value !== filters.query) input.value = filters.query;
  });
  document.querySelectorAll('[data-filter="format"]').forEach((input) => {
    input.checked = filters.formats.includes(input.value);
  });
  document.querySelectorAll('[data-filter="duration"]').forEach((input) => {
    input.checked = filters.durations.includes(input.value);
  });
  document.querySelectorAll('[data-filter="area"]').forEach((input) => {
    input.checked = filters.area === input.value;
  });
  document.querySelectorAll('[data-filter="topic"]').forEach((input) => {
    input.checked = filters.topics.includes(input.value);
  });
  document.querySelectorAll('[data-facet]').forEach((label) => {
    const input = label.querySelector('input');
    const count = facetCount(label.dataset.facet, input.value);
    label.querySelector('[data-facet-count]').textContent = String(count);
    label.classList.toggle('is-empty', count === 0 && !input.checked);
  });
  // Os temas pertencem a uma área; o grupo some quando nenhum se aplica à seleção atual.
  document.querySelectorAll('[data-topics-group]').forEach((group) => {
    group.hidden = !group.querySelector('[data-facet]:not(.is-empty)');
  });
  document.querySelectorAll('[data-filter="modality"]').forEach((input) => {
    input.checked = filters.modality === input.value;
  });
  document.querySelectorAll('[data-filter="sortBy"]').forEach((input) => {
    input.value = filters.sortBy;
  });

  const low = rangePercent(filters.minPrice, options.minPrice, options.maxPrice);
  const high = rangePercent(filters.maxPrice, options.minPrice, options.maxPrice);
  const collapsed = filters.minPrice === filters.maxPrice;
  document.querySelectorAll('[data-range-key="prices"]').forEach((input) => {
    const handle = input.dataset.rangeHandle;
    input.value = String(handle === 'min' ? filters.minPrice : filters.maxPrice);
    input.style.zIndex = String(getRangeThumbZIndex(handle, activeRangeHandle.prices, collapsed));
  });
  document.querySelectorAll('[data-range-selection="prices"]').forEach((selection) => {
    selection.style.left = low + '%';
    selection.style.width = Math.max(0, high - low) + '%';
  });
  document.querySelectorAll('[data-range-output="prices"]').forEach((output) => {
    output.value = currency.format(filters.minPrice) + ' – ' + currency.format(filters.maxPrice);
    output.textContent = output.value;
  });

  document.querySelectorAll('[data-select-format]').forEach((button) => {
    const selected = filters.formats.length === 1 && filters.formats[0] === button.dataset.selectFormat;
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-select-area]').forEach((button) => {
    button.setAttribute('aria-pressed', String(filters.area === button.dataset.selectArea));
  });
}

function renderCourseCard(course) {
  const tags = [
    course.format ? '<span class="course-result-card__tag course-result-card__tag--format">' + escapeHtml(course.format) + '</span>' : '',
    course.areas?.length ? '<span class="course-result-card__tag">' + escapeHtml(course.areas[0]) + '</span>' : '',
  ].join('');
  const discount = course.originalPrice > course.price ? Math.round((1 - course.price / course.originalPrice) * 100) : 0;

  return '<article class="course-result-card">' +
    '<div class="course-result-card__media">' +
      '<img src="' + escapeHtml(course.imageUrl) + '" alt="" loading="lazy">' +
      '<div class="course-result-card__tags" aria-label="Categorias do curso">' + tags + '</div>' +
    '</div>' +
    '<div class="course-result-card__body">' +
      '<h3>' + escapeHtml(course.title) + '</h3>' +
      '<p class="course-result-card__metadata"><span>' + escapeHtml(course.hours) + ' horas</span>' +
        (course.modality ? '<span>' + escapeHtml(course.modality) + '</span>' : '') +
      '</p>' +
      '<div class="course-result-card__price">' +
        (discount ? '<del><span class="sr-only">De </span>' + currency.format(course.originalPrice) + '</del>' : '') +
        '<strong><span class="sr-only">Por </span>' + currency.format(course.price) + '</strong>' +
        (discount ? '<span class="course-result-card__discount">-' + discount + '%</span>' : '') +
      '</div>' +
      '<a href="' + escapeHtml(course.enrollmentUrl) + '" target="_blank" rel="noopener noreferrer">Inscreva-se agora<span class="sr-only"> em ' + escapeHtml(course.title) + '</span></a>' +
    '</div>' +
  '</article>';
}

// Leva à página de filtros do site com a área ou o tema escolhido (a página aceita uma categoria por vez).
function moreCoursesLink() {
  const category = filters.topics.length === 1 ? filters.topics[0] : filters.area;
  return { url: filterPageUrl(categorySlugs[category]), label: categorySlugs[category] ? category : '' };
}

function renderMoreCard(remaining) {
  const link = remaining > 0 ? moreCoursesLink() : { url: filterPageUrl(), label: '' };
  const caption = remaining > 0
    ? 'Mais ' + courseCountLabel(remaining) + (link.label ? ' em ' + link.label : '')
    : 'Explore o catálogo completo';
  return '<a class="course-result-card course-result-card--more" href="' + escapeHtml(link.url) + '">' +
    '<span class="course-result-card__more-icon" aria-hidden="true">' + icons.moreArrow + '</span>' +
    '<span class="course-result-card__more-title">Ver mais</span>' +
    '<span class="course-result-card__more-caption">' + escapeHtml(caption) + '</span>' +
  '</a>';
}

function renderResults() {
  const results = filterCourses(courses, filters);
  const preview = results.slice(0, previewSize);
  const countLabel = results.length === 1 ? 'curso encontrado' : 'cursos encontrados';
  resultsCount.innerHTML = '<strong>' + results.length + '</strong> ' + countLabel +
    (results.length > previewSize ? '<span class="course-finder__page-summary"> · mostrando ' + previewSize + '</span>' : '');

  if (!results.length) {
    resultsGrid.innerHTML = '<div class="course-finder__empty" role="status"><h3>Nenhum curso encontrado</h3><p>Tente outro termo de busca ou remova alguns filtros.</p><button class="course-finder__clear" type="button" data-action="reset">Limpar filtros</button></div>';
    return;
  }

  resultsGrid.innerHTML = preview.map(renderCourseCard).join('') + renderMoreCard(results.length - preview.length);
}

function render() {
  syncFilterControls();
  renderFormatCards();
  renderActiveFilters();
  renderResults();
}

function applyFilters(changes) {
  Object.assign(filters, changes);
  // Ao trocar de área, descarta temas que não existem nela.
  if ('area' in changes && filters.area && !('topics' in changes)) {
    filters.topics = filters.topics.filter((topic) => countCourses({ area: filters.area, topics: [topic] }) > 0);
  }
  render();
}

function updateRange(input) {
  const next = clampRangePair([filters.minPrice, filters.maxPrice], input.dataset.rangeHandle, Number(input.value), [options.minPrice, options.maxPrice]);
  applyFilters({ minPrice: next[0], maxPrice: next[1] });
}

function removeFilter(key, value) {
  if (key === 'query') applyFilters({ query: '' });
  else if (key === 'area') applyFilters({ area: '' });
  else if (key === 'topic') applyFilters({ topics: filters.topics.filter((item) => item !== value) });
  else if (key === 'modality') applyFilters({ modality: '' });
  else if (key === 'format') applyFilters({ formats: filters.formats.filter((item) => item !== value) });
  else if (key === 'duration') applyFilters({ durations: filters.durations.filter((item) => item !== value) });
  else if (key === 'price') applyFilters({ minPrice: options.minPrice, maxPrice: options.maxPrice });
}

function scrollToFinder() {
  document.getElementById('course-finder').scrollIntoView({ behavior: searchBehavior, block: 'start' });
}

function closeMobileDialog() {
  if (dialog.open) dialog.close();
  filterToggle.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('[data-filter-prefix]').forEach((container) => {
  container.innerHTML = renderFilterControls(container.dataset.filterPrefix);
});
renderCourseAreas();
renderTopicChips();
renderPopularTopics();
render();

heroSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = new FormData(heroSearch).get('q');
  applyFilters({ query: String(query ?? '').trim() });
  scrollToFinder();
});

document.addEventListener('input', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.dataset.filter === 'query') applyFilters({ query: input.value });
  else if (input.dataset.rangeKey) updateRange(input);
});

document.addEventListener('change', (event) => {
  const input = event.target;
  if (input instanceof HTMLInputElement && input.dataset.rangeKey) {
    updateRange(input);
    return;
  }
  if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement)) return;

  const filter = input.dataset.filter;
  if (filter === 'format' || filter === 'duration' || filter === 'topic') {
    const key = { format: 'formats', duration: 'durations', topic: 'topics' }[filter];
    applyFilters({
      [key]: input.checked
        ? Array.from(new Set(filters[key].concat(input.value)))
        : filters[key].filter((item) => item !== input.value),
    });
  } else if (filter === 'area' || filter === 'modality' || filter === 'sortBy') {
    applyFilters({ [filter]: input.value });
  }
});

document.addEventListener('focusin', (event) => {
  const input = event.target;
  if (input instanceof HTMLInputElement && input.dataset.rangeKey) activeRangeHandle[input.dataset.rangeKey] = input.dataset.rangeHandle;
});
document.addEventListener('pointerdown', (event) => {
  const input = event.target;
  if (input instanceof HTMLInputElement && input.dataset.rangeKey) activeRangeHandle[input.dataset.rangeKey] = input.dataset.rangeHandle;
});

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest('button, a') : null;
  if (!target) return;

  if (target.matches('.site-header__menu-toggle')) {
    const nav = document.getElementById('primary-navigation');
    const open = target.getAttribute('aria-expanded') !== 'true';
    target.setAttribute('aria-expanded', String(open));
    target.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    target.innerHTML = open
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    nav.classList.toggle('site-nav--open', open);
    return;
  }

  if (target.closest('#primary-navigation a')) {
    document.querySelector('.site-header__menu-toggle').setAttribute('aria-expanded', 'false');
    document.querySelector('.site-header__menu-toggle').setAttribute('aria-label', 'Abrir menu');
    document.getElementById('primary-navigation').classList.remove('site-nav--open');
    return;
  }

  if (target.matches('.course-finder__toggle')) {
    if (!dialog.open) {
      dialog.showModal();
      filterToggle.setAttribute('aria-expanded', 'true');
    }
    return;
  }
  if (target.matches('.course-finder__dialog-close, .course-finder__apply')) {
    closeMobileDialog();
    return;
  }

  if (target.matches('[data-action="reset"]')) {
    filters = createInitialFilters(options);
    render();
    return;
  }
  if (target.matches('[data-remove-filter]')) {
    removeFilter(target.dataset.removeFilter, target.dataset.removeValue);
    return;
  }
  if (target.matches('[data-select-format]')) {
    const format = target.dataset.selectFormat;
    applyFilters({ formats: filters.formats.length === 1 && filters.formats[0] === format ? [] : [format] });
    scrollToFinder();
    return;
  }
  if (target.matches('[data-select-area]')) {
    const area = target.dataset.selectArea;
    applyFilters({ area: filters.area === area ? '' : area, query: '' });
    scrollToFinder();
    return;
  }
  if (target.matches('[data-select-topic]')) {
    applyFilters({ area: topicsArea, topics: [target.dataset.selectTopic], query: '' });
    scrollToFinder();
    return;
  }
  if (target.matches('[data-toggle-topics]')) {
    const list = document.getElementById(target.getAttribute('aria-controls'));
    const expanded = target.getAttribute('aria-expanded') !== 'true';
    list.classList.toggle('is-collapsed', !expanded);
    target.setAttribute('aria-expanded', String(expanded));
    target.textContent = expanded ? 'Mostrar menos temas' : 'Ver todos os temas (' + options.topics.length + ')';
    return;
  }
});

dialog.addEventListener('close', () => filterToggle.setAttribute('aria-expanded', 'false'));
window.matchMedia('(max-width: 760px)').addEventListener('change', (event) => {
  if (!event.matches && dialog.open) closeMobileDialog();
});
