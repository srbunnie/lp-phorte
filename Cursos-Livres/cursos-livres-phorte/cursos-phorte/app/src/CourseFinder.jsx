import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Books,
  CaretLeft,
  CaretRight,
  Certificate,
  MagnifyingGlass,
  SlidersHorizontal,
  X,
} from '@phosphor-icons/react';
import { filterCourses } from './course-filter.js';
import { courseAreas } from './course-areas.js';
import {
  clampRangePair,
  createInitialFilters,
  getCourseFilterOptions,
  getPageNumbers,
  getRangeThumbZIndex,
  paginateCourses,
} from './course-finder-state.js';
import './CourseFinder.css';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const catalogUrl = 'https://faculdadephorte.edu.br/todos-os-cursos/';
const pageSize = 8;
const formatCategories = [
  {
    format: 'Curso',
    title: 'Curso',
    description: 'Cursos livres para ampliar seus conhecimentos.',
    Icon: BookOpen,
  },
  {
    format: 'Curso + Livro',
    title: 'Curso + Livro',
    description: 'Conteúdo do curso acompanhado de material em livro.',
    Icon: Books,
  },
  {
    format: 'Formação',
    title: 'Formação',
    description: 'Formações para aprofundar conhecimentos e práticas.',
    Icon: Certificate,
  },
];

function toControlId(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

function RangeFilter({ label, min, max, step, values, onChange, formatValue }) {
  const [activeHandle, setActiveHandle] = useState('max');
  const span = max - min || 1;
  const left = ((values[0] - min) / span) * 100;
  const width = ((values[1] - values[0]) / span) * 100;
  const bounds = [min, max];
  const isCollapsed = values[0] === values[1];

  return (
    <fieldset className="course-filter-group course-filter-range">
      <legend>{label}</legend>
      <div className="course-filter-range__track">
        <span className="course-filter-range__rail" aria-hidden="true" />
        <span
          className="course-filter-range__selection"
          aria-hidden="true"
          style={{ left: `${left}%`, width: `${width}%` }}
        />
        <input
          className="course-filter-range__input course-filter-range__input--min"
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[0]}
          style={{ zIndex: getRangeThumbZIndex('min', activeHandle, isCollapsed) }}
          aria-label={`${label} mínimo`}
          onFocus={() => setActiveHandle('min')}
          onPointerDown={() => setActiveHandle('min')}
          onChange={(event) => onChange(clampRangePair(values, 'min', Number(event.target.value), bounds))}
        />
        <input
          className="course-filter-range__input course-filter-range__input--max"
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[1]}
          style={{ zIndex: getRangeThumbZIndex('max', activeHandle, isCollapsed) }}
          aria-label={`${label} máximo`}
          onFocus={() => setActiveHandle('max')}
          onPointerDown={() => setActiveHandle('max')}
          onChange={(event) => onChange(clampRangePair(values, 'max', Number(event.target.value), bounds))}
        />
      </div>
      <output className="course-filter-range__value">
        {formatValue(values[0])} – {formatValue(values[1])}
      </output>
      <span className="sr-only">Intervalo de {label.toLocaleLowerCase('pt-BR')}</span>
    </fieldset>
  );
}

function CourseCard({ course }) {
  return (
    <article className="course-result-card">
      <div className="course-result-card__media">
        <img src={course.imageUrl} alt="" loading="lazy" />
        <div className="course-result-card__tags" aria-label="Categorias do curso">
          {course.format && <span className="course-result-card__tag course-result-card__tag--format">{course.format}</span>}
          {course.area && <span className="course-result-card__tag">{course.area}</span>}
        </div>
      </div>
      <div className="course-result-card__body">
        <h3>{course.title}</h3>
        <p className="course-result-card__metadata">
          <span>{course.hours} horas</span>
          {course.modality && <span>{course.modality}</span>}
        </p>
        <div className="course-result-card__price">
          <span className="course-result-card__price-label">Valor:</span>
          <strong>{currency.format(course.price)}</strong>
          {course.originalPrice > course.price && (
            <del>{currency.format(course.originalPrice)}</del>
          )}
        </div>
        <a href={course.enrollmentUrl} target="_blank" rel="noopener noreferrer">
          Inscreva-se Agora
        </a>
      </div>
    </article>
  );
}

function MoreCoursesCard({ hasNextPage, onNextPage }) {
  const content = (
    <>
      <span className="course-result-card__more-icon" aria-hidden="true">
        <ArrowRight size={25} weight="bold" />
      </span>
      <span className="course-result-card__more-title">Ver mais</span>
      <span className="course-result-card__more-caption">
        {hasNextPage ? 'Explore os próximos cursos' : 'Acesse o catálogo completo'}
      </span>
    </>
  );

  return (
    <article className="course-result-card course-result-card--more">
      {hasNextPage ? (
        <button className="course-result-card__more-action" type="button" onClick={onNextPage}>
          {content}
        </button>
      ) : (
        <a className="course-result-card__more-action" href={catalogUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )}
    </article>
  );
}

function CoursePagination({ page, pageCount, onPageChange }) {
  const pageNumbers = getPageNumbers(page, pageCount);

  return (
    <nav className="course-finder__pagination" aria-label="Paginação dos cursos">
      <button
        className="course-finder__page-button course-finder__page-button--arrow"
        type="button"
        aria-label="Página anterior"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <CaretLeft size={16} weight="bold" aria-hidden="true" />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          className="course-finder__page-button"
          type="button"
          aria-label={`Página ${pageNumber}`}
          aria-current={pageNumber === page ? 'page' : undefined}
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="course-finder__page-button course-finder__page-button--arrow"
        type="button"
        aria-label="Próxima página"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <CaretRight size={16} weight="bold" aria-hidden="true" />
      </button>
    </nav>
  );
}

function CourseFormatShortcuts({ selectedFormats, onSelect }) {
  return (
    <section className="courses-formats" aria-labelledby="courses-formats-title">
      <div className="courses-section-heading">
        <p className="courses-eyebrow">Conhecimento que transforma</p>
        <h2 id="courses-formats-title">Categorias de cursos</h2>
        <p>Escolha um formato para encontrar os cursos correspondentes.</p>
      </div>
      <div className="courses-format-grid">
        {formatCategories.map(({ format, title, description, Icon }) => (
          <button
            className="courses-format-card"
            type="button"
            aria-pressed={selectedFormats.includes(format)}
            key={format}
            onClick={() => onSelect(format)}
          >
            <span className="courses-format-card__icon" aria-hidden="true">
              <Icon size={25} weight="regular" />
            </span>
            <span className="courses-format-card__title">{title}</span>
            <span className="courses-format-card__description">{description}</span>
            <span className="courses-format-card__action">
              Ver cursos <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

const otherCourseAreas = [
  'Biomecânica',
  'Doenças Crônicas',
  'Emagrecimento',
  'Fisiologia do Exercício',
  'Educação Infantil',
  'Treinamento de Força',
];

function CourseAreasSection({ availableAreas, onSelectArea, onSearchTopic }) {
  const trackRef = useRef(null);

  const scrollTopics = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    track.scrollBy({ left: direction * Math.max(220, track.clientWidth * 0.7), behavior });
  };

  return (
    <section className="courses-areas" aria-labelledby="courses-areas-title">
      <div className="courses-section-heading">
        <p className="courses-eyebrow">Conhecimento que transforma</p>
        <h2 id="courses-areas-title">Nossas áreas de cursos</h2>
        <p>Formação prática e atual em diferentes áreas para acompanhar os seus planos.</p>
      </div>

      <div className="courses-areas__featured">
        {courseAreas.map(({ title, image, href, alt }) => {
          const isAvailableLocally = availableAreas.includes(title);
          const cardContent = (
            <>
              <img src={image} alt={alt} loading="lazy" />
              <span className="courses-area-card__label">
                <strong>{title}</strong>
                <ArrowRight size={19} weight="bold" aria-hidden="true" />
              </span>
            </>
          );

          return isAvailableLocally ? (
            <button className="courses-area-card" type="button" key={title} onClick={() => onSelectArea(title)}>
              {cardContent}
            </button>
          ) : (
            <a className="courses-area-card" href={href} key={title}>
              {cardContent}
            </a>
          );
        })}
      </div>

      <div className="courses-areas__other-heading">
        <div>
          <h3>Outras áreas de cursos</h3>
          <p>Deslize para conhecer mais temas disponíveis no catálogo.</p>
        </div>
        <div className="courses-areas__controls">
          <button type="button" aria-label="Mostrar áreas anteriores" onClick={() => scrollTopics(-1)}>
            <CaretLeft size={18} weight="bold" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Mostrar próximas áreas" onClick={() => scrollTopics(1)}>
            <CaretRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="courses-areas__topic-track" ref={trackRef} role="region" aria-label="Outras áreas de cursos">
        {otherCourseAreas.map((topic) => (
          <button className="courses-area-topic" type="button" key={topic} onClick={() => onSearchTopic(topic)}>
            <span>{topic}</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

function FilterControls({
  idPrefix,
  options,
  filters,
  hours,
  prices,
  onUpdateFilter,
  onToggleFormat,
  onResetFilters,
  searchRef,
}) {
  const getId = (group, value = 'all') => `course-${idPrefix}-${group}-${toControlId(value)}`;

  return (
    <div className="course-finder__filter-fields">
      <label className="course-finder__search">
        <span className="sr-only">Encontre seu curso</span>
        <input
          ref={searchRef}
          type="search"
          placeholder="Encontre seu curso..."
          value={filters.query}
          onChange={(event) => onUpdateFilter('query', event.target.value)}
        />
        <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
      </label>

      <fieldset className="course-filter-group">
        <legend>Formato do Curso</legend>
        <div className="course-filter-options">
          {options.formats.map((format) => {
            const id = getId('format', format);
            return (
              <label htmlFor={id} key={format}>
                <input
                  id={id}
                  type="checkbox"
                  checked={filters.formats.includes(format)}
                  onChange={(event) => onToggleFormat(format, event.target.checked)}
                />
                <span>{format}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="course-filter-group">
        <legend>Áreas</legend>
        <div className="course-filter-options">
          <label htmlFor={getId('area')}>
            <input
              id={getId('area')}
              type="radio"
              name={`course-area-${idPrefix}`}
              value=""
              checked={filters.area === ''}
              onChange={() => onUpdateFilter('area', '')}
            />
            <span>Todas</span>
          </label>
          {options.areas.map((area) => {
            const id = getId('area', area);
            return (
              <label htmlFor={id} key={area}>
                <input
                  id={id}
                  type="radio"
                  name={`course-area-${idPrefix}`}
                  value={area}
                  checked={filters.area === area}
                  onChange={() => onUpdateFilter('area', area)}
                />
                <span>{area}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {options.modalities.length > 0 && (
        <fieldset className="course-filter-group">
          <legend>Modalidade</legend>
          <div className="course-filter-options">
            <label htmlFor={getId('modality')}>
              <input
                id={getId('modality')}
                type="radio"
                name={`course-modality-${idPrefix}`}
                value=""
                checked={filters.modality === ''}
                onChange={() => onUpdateFilter('modality', '')}
              />
              <span>Todas</span>
            </label>
            {options.modalities.map((modality) => {
              const id = getId('modality', modality);
              return (
                <label htmlFor={id} key={modality}>
                  <input
                    id={id}
                    type="radio"
                    name={`course-modality-${idPrefix}`}
                    value={modality}
                    checked={filters.modality === modality}
                    onChange={() => onUpdateFilter('modality', modality)}
                  />
                  <span>{modality}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <RangeFilter
        label="Duração"
        min={options.minHours}
        max={options.maxHours}
        step={1}
        values={hours}
        onChange={([minHours, maxHours]) => onUpdateFilter('hours', [minHours, maxHours])}
        formatValue={(value) => `${value} h`}
      />

      <RangeFilter
        label="Preço"
        min={options.minPrice}
        max={options.maxPrice}
        step={0.1}
        values={prices}
        onChange={([minPrice, maxPrice]) => onUpdateFilter('prices', [minPrice, maxPrice])}
        formatValue={(value) => currency.format(value)}
      />

      <label className="course-finder__sort" htmlFor={getId('sort')}>
        <span>Ordem:</span>
        <select id={getId('sort')} value={filters.sortBy} onChange={(event) => onUpdateFilter('sortBy', event.target.value)}>
          <option value="featured">Ordem do catálogo</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="name-asc">Nome A-Z</option>
          <option value="name-desc">Nome Z-A</option>
        </select>
      </label>

      <button className="course-finder__clear" type="button" onClick={onResetFilters}>
        Limpar filtros
      </button>
    </div>
  );
}

export function CourseFinder({ courses }) {
  const options = useMemo(() => getCourseFilterOptions(courses), [courses]);
  const [filters, setFilters] = useState(() => createInitialFilters(options));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const mobileDialogRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const results = useMemo(() => filterCourses(courses, filters), [courses, filters]);
  const pagination = useMemo(() => paginateCourses(results, currentPage, pageSize), [results, currentPage]);

  useEffect(() => setCurrentPage(1), [filters, courses]);

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) return;

    if (mobileFiltersOpen && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => mobileSearchRef.current?.focus({ preventScroll: true }));
    } else if (!mobileFiltersOpen && dialog.open) {
      dialog.close();
    }
  }, [mobileFiltersOpen]);

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width: 760px)');
    const closeOnDesktop = (event) => {
      if (!event.matches) setMobileFiltersOpen(false);
    };
    mobileViewport.addEventListener('change', closeOnDesktop);
    return () => mobileViewport.removeEventListener('change', closeOnDesktop);
  }, []);

  const updateFilter = (name, value) => {
    setFilters((current) => {
      if (name === 'hours') return { ...current, minHours: value[0], maxHours: value[1] };
      if (name === 'prices') return { ...current, minPrice: value[0], maxPrice: value[1] };
      return { ...current, [name]: value };
    });
  };

  const toggleFormat = (format, checked) => {
    setFilters((current) => ({
      ...current,
      formats: checked
        ? [...current.formats, format]
        : current.formats.filter((selected) => selected !== format),
    }));
  };

  const resetFilters = () => setFilters(createInitialFilters(options));
  const closeMobileFilters = () => {
    if (mobileDialogRef.current?.open) mobileDialogRef.current.close();
    setMobileFiltersOpen(false);
  };
  const selectFormat = (format) => {
    setFilters((current) => ({
      ...current,
      formats: current.formats.length === 1 && current.formats[0] === format ? [] : [format],
    }));
    setCurrentPage(1);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.requestAnimationFrame(() => document.getElementById('course-finder')?.scrollIntoView({ behavior, block: 'start' }));
  };

  const selectArea = (area) => {
    setFilters((current) => ({ ...current, area, query: '' }));
    setCurrentPage(1);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.requestAnimationFrame(() => document.getElementById('course-finder')?.scrollIntoView({ behavior, block: 'start' }));
  };

  const searchTopic = (topic) => {
    setFilters((current) => ({ ...current, area: '', query: topic }));
    setCurrentPage(1);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.requestAnimationFrame(() => document.getElementById('course-finder')?.scrollIntoView({ behavior, block: 'start' }));
  };

  const hours = [filters.minHours, filters.maxHours];
  const prices = [filters.minPrice, filters.maxPrice];
  const filterControlProps = {
    options,
    filters,
    hours,
    prices,
    onUpdateFilter: updateFilter,
    onToggleFormat: toggleFormat,
    onResetFilters: resetFilters,
  };

  return (
    <>
      <CourseFormatShortcuts selectedFormats={filters.formats} onSelect={selectFormat} />

      <section id="course-finder" className="course-finder" aria-labelledby="course-finder-title">
        <header className="course-finder__heading">
          <div>
            <p className="courses-eyebrow">Cursos Livres Phorte</p>
            <h2 id="course-finder-title">Encontre seu curso</h2>
          </div>
          <button
            className="course-finder__toggle"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={mobileFiltersOpen}
            aria-controls="course-finder-mobile-dialog"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            Filtros
          </button>
        </header>

        <div className="course-finder__layout">
          <aside className="course-finder__filters course-finder__filters--desktop" aria-label="Filtros de cursos">
            <FilterControls {...filterControlProps} idPrefix="desktop" />
          </aside>

          <div className="course-finder__results">
            <p className="course-finder__count" aria-live="polite" aria-atomic="true">
              {results.length} {results.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
              {results.length > 0 && (
                <span className="course-finder__page-summary">
                  {' '}· mostrando {pagination.startIndex + 1}–{pagination.endIndex}
                </span>
              )}
            </p>
            {results.length > 0 ? (
              <>
                <div className="course-finder__grid">
                  {pagination.items.map((course) => <CourseCard course={course} key={course.id} />)}
                  <MoreCoursesCard
                    hasNextPage={pagination.page < pagination.pageCount}
                    onNextPage={() => setCurrentPage((page) => Math.min(pagination.pageCount, page + 1))}
                  />
                </div>
                <CoursePagination
                  page={pagination.page}
                  pageCount={pagination.pageCount}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="course-finder__empty" role="status">
                <h3>Nenhum curso encontrado</h3>
                <p>Experimente ajustar os filtros para ver outras opções.</p>
                <button className="course-finder__clear" type="button" onClick={resetFilters}>
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>

        <dialog
          id="course-finder-mobile-dialog"
          ref={mobileDialogRef}
          className="course-finder__dialog"
          aria-labelledby="course-finder-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            setMobileFiltersOpen(false);
          }}
          onClose={() => setMobileFiltersOpen(false)}
        >
          <div className="course-finder__dialog-layout">
            <header className="course-finder__dialog-header">
              <h2 id="course-finder-dialog-title">Filtro</h2>
              <button className="course-finder__dialog-close" type="button" aria-label="Fechar filtros" onClick={closeMobileFilters}>
                <X size={22} weight="bold" aria-hidden="true" />
              </button>
            </header>
            <div className="course-finder__dialog-scroll">
              <div className="course-finder__filters course-finder__filters--dialog" aria-label="Filtros de cursos">
                <FilterControls {...filterControlProps} idPrefix="mobile" searchRef={mobileSearchRef} />
              </div>
            </div>
            <footer className="course-finder__dialog-footer">
              <button className="course-finder__apply" type="button" onClick={closeMobileFilters}>
                Aplicar
              </button>
            </footer>
          </div>
        </dialog>
      </section>

      <CourseAreasSection
        availableAreas={options.areas}
        onSelectArea={selectArea}
        onSearchTopic={searchTopic}
      />
    </>
  );
}
