import { courses } from './courses.js';
import { courseAreas, otherCourseAreas } from './course-areas.js';
import { filterCourses } from './course-filter.js';
import {
  clampRangePair,
  createInitialFilters,
  getCourseFilterOptions,
  getPageNumbers,
  getRangeThumbZIndex,
  paginateCourses,
} from './course-finder-state.js';

const catalogUrl = 'https://faculdadephorte.edu.br/todos-os-cursos/';
const pageSize = 8;
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatCategories = [
  { format: 'Curso', title: 'Curso', description: 'Cursos livres para ampliar seus conhecimentos.', icon: 'book' },
  { format: 'Curso + Livro', title: 'Curso + Livro', description: 'Conteúdo do curso acompanhado de material em livro.', icon: 'books' },
  { format: 'Formação', title: 'Formação', description: 'Formações para aprofundar conhecimentos e práticas.', icon: 'certificate' },
];
const icons = {
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>',
  moreArrow: '<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>',
  book: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"></path><path d="M4 4.5v17M8 6h8M8 10h8"></path></svg>',
  books: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h7v18H5zM14 4l5-1 3 17-5 1zM7 7h3M7 11h3M7 15h3M16 7l2-.3M17 12l2-.3"></path></svg>',
  certificate: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M7 8h8M7 12h5m5 3 2 1.5 2-1.5v6l-2-1.3-2 1.3z"></path></svg>',
  caretLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>',
  caretRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>',
};

const options = getCourseFilterOptions(courses);
let filters = createInitialFilters(options);
let currentPage = 1;
const activeRangeHandle = { hours: 'max', prices: 'max' };
const resultsCount = document.getElementById('course-results-count');
const resultsGrid = document.getElementById('course-results-grid');
const paginationNav = document.getElementById('course-pagination');
const formatGrid = document.getElementById('course-format-grid');
const dialog = document.getElementById('course-finder-mobile-dialog');
const filterToggle = document.querySelector('.course-finder__toggle');
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
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

function formatRangeValue(key, value) {
  return key === 'prices' ? currency.format(value) : value + ' h';
}

function rangePercent(value, min, max) {
  const span = max - min || 1;
  return Math.max(0, Math.min(100, ((value - min) / span) * 100));
}

function renderRangeFilter(prefix, label, key, min, max, step, valueMin, valueMax) {
  const minPercent = rangePercent(valueMin, min, max);
  const maxPercent = rangePercent(valueMax, min, max);
  const collapsed = valueMin === valueMax;
  const minZ = getRangeThumbZIndex('min', activeRangeHandle[key], collapsed);
  const maxZ = getRangeThumbZIndex('max', activeRangeHandle[key], collapsed);

  return '<fieldset class="course-filter-group course-filter-range">' +
    '<legend>' + label + '</legend>' +
    '<div class="course-filter-range__track">' +
      '<span class="course-filter-range__rail" aria-hidden="true"></span>' +
      '<span class="course-filter-range__selection" data-range-selection="' + key + '" style="left:' + minPercent + '%;width:' + (maxPercent - minPercent) + '%" aria-hidden="true"></span>' +
      '<input class="course-filter-range__input course-filter-range__input--min" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + valueMin + '" data-range-key="' + key + '" data-range-handle="min" aria-label="' + label + ' mínimo" style="z-index:' + minZ + '">' +
      '<input class="course-filter-range__input course-filter-range__input--max" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + valueMax + '" data-range-key="' + key + '" data-range-handle="max" aria-label="' + label + ' máximo" style="z-index:' + maxZ + '">' +
    '</div>' +
    '<output class="course-filter-range__value" data-range-output="' + key + '">' + formatRangeValue(key, valueMin) + ' – ' + formatRangeValue(key, valueMax) + '</output>' +
    '<span class="sr-only">Intervalo de ' + label.toLocaleLowerCase('pt-BR') + '</span>' +
  '</fieldset>';
}

function renderFilterControls(prefix) {
  const formatOptions = options.formats.map((format) => {
    const id = 'course-' + prefix + '-format-' + controlId(format);
    return '<label for="' + id + '"><input id="' + id + '" type="checkbox" data-filter="format" value="' + escapeHtml(format) + '"><span>' + escapeHtml(format) + '</span></label>';
  }).join('');

  const areaOptions = '<label for="course-' + prefix + '-area-all"><input id="course-' + prefix + '-area-all" type="radio" name="course-area-' + prefix + '" data-filter="area" value=""><span>Todas</span></label>' +
    options.areas.map((area) => {
      const id = 'course-' + prefix + '-area-' + controlId(area);
      return '<label for="' + id + '"><input id="' + id + '" type="radio" name="course-area-' + prefix + '" data-filter="area" value="' + escapeHtml(area) + '"><span>' + escapeHtml(area) + '</span></label>';
    }).join('');

  const modalityOptions = options.modalities.length ? '<fieldset class="course-filter-group"><legend>Modalidade</legend><div class="course-filter-options">' +
    '<label for="course-' + prefix + '-modality-all"><input id="course-' + prefix + '-modality-all" type="radio" name="course-modality-' + prefix + '" data-filter="modality" value=""><span>Todas</span></label>' +
    options.modalities.map((modality) => {
      const id = 'course-' + prefix + '-modality-' + controlId(modality);
      return '<label for="' + id + '"><input id="' + id + '" type="radio" name="course-modality-' + prefix + '" data-filter="modality" value="' + escapeHtml(modality) + '"><span>' + escapeHtml(modality) + '</span></label>';
    }).join('') + '</div></fieldset>' : '';

  const sortId = 'course-' + prefix + '-sort';

  return '<label class="course-finder__search">' +
      '<span class="sr-only">Encontre seu curso</span>' +
      '<input type="search" placeholder="Encontre seu curso..." data-filter="query" autocomplete="off">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>' +
    '</label>' +
    '<fieldset class="course-filter-group"><legend>Formato do Curso</legend><div class="course-filter-options">' + formatOptions + '</div></fieldset>' +
    '<fieldset class="course-filter-group"><legend>Áreas</legend><div class="course-filter-options">' + areaOptions + '</div></fieldset>' +
    modalityOptions +
    renderRangeFilter(prefix, 'Duração', 'hours', options.minHours, options.maxHours, 1, filters.minHours, filters.maxHours) +
    renderRangeFilter(prefix, 'Preço', 'prices', options.minPrice, options.maxPrice, 0.1, filters.minPrice, filters.maxPrice) +
    '<label class="course-finder__sort" for="' + sortId + '"><span>Ordem:</span><select id="' + sortId + '" data-filter="sortBy">' +
      '<option value="featured">Ordem do catálogo</option>' +
      '<option value="price-asc">Menor preço</option>' +
      '<option value="price-desc">Maior preço</option>' +
      '<option value="name-asc">Nome A-Z</option>' +
      '<option value="name-desc">Nome Z-A</option>' +
    '</select></label>' +
    '<button class="course-finder__clear" type="button" data-action="reset">Limpar filtros</button>';
}

function renderFormatCards() {
  formatGrid.innerHTML = formatCategories.map((item) => {
    const selected = filters.formats.length === 1 && filters.formats[0] === item.format;
    return '<button class="courses-format-card" type="button" data-select-format="' + escapeHtml(item.format) + '" aria-pressed="' + selected + '">' +
      '<span class="courses-format-card__icon" aria-hidden="true">' + icons[item.icon] + '</span>' +
      '<span class="courses-format-card__title">' + escapeHtml(item.title) + '</span>' +
      '<span class="courses-format-card__description">' + escapeHtml(item.description) + '</span>' +
      '<span class="courses-format-card__action">Ver cursos ' + icons.arrow + '</span>' +
    '</button>';
  }).join('');
}

function renderCourseAreas() {
  const featured = document.getElementById('course-featured-areas');
  const topics = document.getElementById('course-topic-track');

  featured.innerHTML = courseAreas.map((area) => {
    const available = options.areas.includes(area.title);
    const contents = '<img src="' + escapeHtml(area.image) + '" alt="' + escapeHtml(area.alt) + '" loading="lazy">' +
      '<span class="courses-area-card__label"><strong>' + escapeHtml(area.title) + '</strong>' + icons.arrow + '</span>';
    return available
      ? '<button class="courses-area-card" type="button" data-select-area="' + escapeHtml(area.title) + '">' + contents + '</button>'
      : '<a class="courses-area-card" href="' + escapeHtml(area.href) + '">' + contents + '</a>';
  }).join('');

  topics.innerHTML = otherCourseAreas.map((area) =>
    '<button class="courses-area-topic" type="button" data-search-topic="' + escapeHtml(area) + '"><span>' + escapeHtml(area) + '</span>' + icons.arrow + '</button>'
  ).join('');
}

function syncFilterControls() {
  document.querySelectorAll('[data-filter="query"]').forEach((input) => {
    if (input.value !== filters.query) input.value = filters.query;
  });
  document.querySelectorAll('[data-filter="format"]').forEach((input) => {
    input.checked = filters.formats.includes(input.value);
  });
  document.querySelectorAll('[data-filter="area"]').forEach((input) => {
    input.checked = filters.area === input.value;
  });
  document.querySelectorAll('[data-filter="modality"]').forEach((input) => {
    input.checked = filters.modality === input.value;
  });
  document.querySelectorAll('[data-filter="sortBy"]').forEach((input) => {
    input.value = filters.sortBy;
  });

  const values = {
    hours: [filters.minHours, filters.maxHours],
    prices: [filters.minPrice, filters.maxPrice],
  };
  const bounds = {
    hours: [options.minHours, options.maxHours],
    prices: [options.minPrice, options.maxPrice],
  };
  Object.entries(values).forEach(([key, pair]) => {
    const [minimum, maximum] = pair;
    const [boundMin, boundMax] = bounds[key];
    const low = rangePercent(minimum, boundMin, boundMax);
    const high = rangePercent(maximum, boundMin, boundMax);
    const collapsed = minimum === maximum;
    document.querySelectorAll('[data-range-key="' + key + '"]').forEach((input) => {
      const handle = input.dataset.rangeHandle;
      input.value = String(handle === 'min' ? minimum : maximum);
      input.style.zIndex = String(getRangeThumbZIndex(handle, activeRangeHandle[key], collapsed));
    });
    document.querySelectorAll('[data-range-selection="' + key + '"]').forEach((selection) => {
      selection.style.left = low + '%';
      selection.style.width = Math.max(0, high - low) + '%';
    });
    document.querySelectorAll('[data-range-output="' + key + '"]').forEach((output) => {
      output.value = formatRangeValue(key, minimum) + ' – ' + formatRangeValue(key, maximum);
      output.textContent = output.value;
    });
  });

  document.querySelectorAll('[data-select-format]').forEach((button) => {
    const selected = filters.formats.length === 1 && filters.formats[0] === button.dataset.selectFormat;
    button.setAttribute('aria-pressed', String(selected));
  });
}

function renderCourseCard(course) {
  const tags = [
    course.format ? '<span class="course-result-card__tag course-result-card__tag--format">' + escapeHtml(course.format) + '</span>' : '',
    course.area ? '<span class="course-result-card__tag">' + escapeHtml(course.area) + '</span>' : '',
  ].join('');

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
      '<div class="course-result-card__price"><span class="course-result-card__price-label">Valor:</span>' +
        '<strong>' + currency.format(course.price) + '</strong>' +
        (course.originalPrice > course.price ? '<del>' + currency.format(course.originalPrice) + '</del>' : '') +
      '</div>' +
      '<a href="' + escapeHtml(course.enrollmentUrl) + '" target="_blank" rel="noopener noreferrer">Inscreva-se Agora</a>' +
    '</div>' +
  '</article>';
}

function renderMoreCard(hasNextPage) {
  const content = '<span class="course-result-card__more-icon" aria-hidden="true">' + icons.moreArrow + '</span>' +
    '<span class="course-result-card__more-title">Ver mais</span>' +
    '<span class="course-result-card__more-caption">' + (hasNextPage ? 'Explore os próximos cursos' : 'Acesse o catálogo completo') + '</span>';
  return '<article class="course-result-card course-result-card--more">' +
    (hasNextPage
      ? '<button class="course-result-card__more-action" type="button" data-action="more">' + content + '</button>'
      : '<a class="course-result-card__more-action" href="' + catalogUrl + '" target="_blank" rel="noopener noreferrer">' + content + '</a>') +
  '</article>';
}

function renderPagination(page, pageCount) {
  const numbers = getPageNumbers(page, pageCount);
  const previousDisabled = page === 1 ? ' disabled' : '';
  const nextDisabled = page === pageCount ? ' disabled' : '';
  return '<button class="course-finder__page-button course-finder__page-button--arrow" type="button" data-page-step="-1" aria-label="Página anterior"' + previousDisabled + '>' + icons.caretLeft + '</button>' +
    numbers.map((number) => '<button class="course-finder__page-button" type="button" data-page="' + number + '" aria-label="Página ' + number + '"' + (number === page ? ' aria-current="page"' : '') + '>' + number + '</button>').join('') +
    '<button class="course-finder__page-button course-finder__page-button--arrow" type="button" data-page-step="1" aria-label="Próxima página"' + nextDisabled + '>' + icons.caretRight + '</button>';
}

function renderResults() {
  const results = filterCourses(courses, filters);
  const page = paginateCourses(results, currentPage, pageSize);
  const countLabel = results.length === 1 ? 'curso encontrado' : 'cursos encontrados';
  resultsCount.innerHTML = results.length + ' ' + countLabel +
    (results.length ? '<span class="course-finder__page-summary"> · mostrando ' + (page.startIndex + 1) + '–' + page.endIndex + '</span>' : '');

  if (!results.length) {
    resultsGrid.innerHTML = '<div class="course-finder__empty" role="status"><h3>Nenhum curso encontrado</h3><p>Experimente ajustar os filtros para ver outras opções.</p><button class="course-finder__clear" type="button" data-action="reset">Limpar filtros</button></div>';
    paginationNav.innerHTML = '';
    return;
  }

  resultsGrid.innerHTML = page.items.map(renderCourseCard).join('') + renderMoreCard(page.page < page.pageCount);
  paginationNav.innerHTML = renderPagination(page.page, page.pageCount);
}

function render() {
  syncFilterControls();
  renderFormatCards();
  renderResults();
}

function updateRange(input) {
  const key = input.dataset.rangeKey;
  const handle = input.dataset.rangeHandle;
  const isHours = key === 'hours';
  const minimumKey = isHours ? 'minHours' : 'minPrice';
  const maximumKey = isHours ? 'maxHours' : 'maxPrice';
  const bounds = isHours ? [options.minHours, options.maxHours] : [options.minPrice, options.maxPrice];
  const next = clampRangePair([filters[minimumKey], filters[maximumKey]], handle, Number(input.value), bounds);
  filters[minimumKey] = next[0];
  filters[maximumKey] = next[1];
  currentPage = 1;
  render();
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
render();

document.addEventListener('input', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.dataset.filter === 'query') {
    filters.query = input.value;
    currentPage = 1;
    render();
  } else if (input.dataset.rangeKey) {
    updateRange(input);
  }
});

document.addEventListener('change', (event) => {
  const input = event.target;
  if (input instanceof HTMLInputElement && input.dataset.rangeKey) {
    updateRange(input);
    return;
  }
  if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement)) return;

  const filter = input.dataset.filter;
  if (filter === 'format') {
    filters.formats = input.checked
      ? Array.from(new Set(filters.formats.concat(input.value)))
      : filters.formats.filter((format) => format !== input.value);
  } else if (filter === 'area' || filter === 'modality' || filter === 'sortBy') {
    filters[filter] = input.value;
  } else {
    return;
  }
  currentPage = 1;
  render();
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
      window.requestAnimationFrame(() => dialog.querySelector('[data-filter="query"]').focus({ preventScroll: true }));
    }
    return;
  }
  if (target.matches('.course-finder__dialog-close, .course-finder__apply')) {
    closeMobileDialog();
    return;
  }

  if (target.matches('[data-action="reset"]')) {
    filters = createInitialFilters(options);
    currentPage = 1;
    render();
    return;
  }
  if (target.matches('[data-select-format]')) {
    const format = target.dataset.selectFormat;
    filters.formats = filters.formats.length === 1 && filters.formats[0] === format ? [] : [format];
    currentPage = 1;
    render();
    scrollToFinder();
    return;
  }
  if (target.matches('[data-select-area]')) {
    filters.area = target.dataset.selectArea;
    filters.query = '';
    currentPage = 1;
    render();
    scrollToFinder();
    return;
  }
  if (target.matches('[data-search-topic]')) {
    filters.area = '';
    filters.query = target.dataset.searchTopic;
    currentPage = 1;
    render();
    scrollToFinder();
    return;
  }
  if (target.matches('[data-scroll-topics]')) {
    const track = document.getElementById('course-topic-track');
    const direction = Number(target.dataset.scrollTopics);
    track.scrollBy({ left: direction * Math.max(220, track.clientWidth * 0.7), behavior: searchBehavior });
    return;
  }
  if (target.matches('[data-action="more"]')) {
    const pageCount = Math.max(1, Math.ceil(filterCourses(courses, filters).length / pageSize));
    currentPage = Math.min(pageCount, currentPage + 1);
    render();
    return;
  }
  if (target.matches('[data-page]')) {
    currentPage = Number(target.dataset.page);
    render();
    return;
  }
  if (target.matches('[data-page-step]') && !target.disabled) {
    const pageCount = Math.max(1, Math.ceil(filterCourses(courses, filters).length / pageSize));
    currentPage = Math.max(1, Math.min(pageCount, currentPage + Number(target.dataset.pageStep)));
    render();
  }
});

dialog.addEventListener('close', () => filterToggle.setAttribute('aria-expanded', 'false'));
window.matchMedia('(max-width: 760px)').addEventListener('change', (event) => {
  if (!event.matches && dialog.open) closeMobileDialog();
});