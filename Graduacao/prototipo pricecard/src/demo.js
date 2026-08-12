import { initEnrollmentCard } from './card-controller.js';
import { buildEnrollmentSource, listAvailableCourses } from './course-catalog.js';
import { bindPhortePopupForm } from './popup-form-sync.js';

const CURRENT_COURSE_ID = 'administracao';

async function loadCatalog() {
  const response = await fetch('./data/modelo-cursos-ofertas.json');

  if (!response.ok) {
    throw new Error(`Failed to load course catalog: ${response.status}`);
  }

  return response.json();
}

function bindDemoPopupClose() {
  document.querySelectorAll('[data-phorte-popup-close]').forEach((button) => {
    button.addEventListener('click', () => {
      button.closest('[data-phorte-popup]')?.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('[data-phorte-popup].is-open')) {
      target.classList.remove('is-open');
    }
  });
}

function bindDemoSubmit() {
  const form = document.querySelector('#phorte-demo-form');
  const feedback = document.querySelector('[data-phorte-demo-feedback]');

  if (!form || !feedback) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    feedback.textContent = `Lead pronto para RD Station: ${JSON.stringify(payload, null, 2)}`;
  });
}

function closeDemoPopup() {
  document.querySelector('#phorte-demo-popup')?.classList.remove('is-open');
}

function clearDemoFeedback() {
  const feedback = document.querySelector('[data-phorte-demo-feedback]');
  if (feedback) {
    feedback.textContent = '';
  }
}

function buildDemoSource(catalog, courseId) {
  return buildEnrollmentSource(catalog, courseId);
}

async function bootstrap() {
  const catalog = await loadCatalog();
  const courseOptions = listAvailableCourses(catalog);
  const cardRoot = document.querySelector('#phorte-card-demo');
  const courseSelect = document.querySelector('#demo-course-select');
  let currentCourseId = CURRENT_COURSE_ID;
  const initialSource = buildDemoSource(catalog, currentCourseId);

  if (!cardRoot || !courseSelect) {
    throw new Error('Demo root or course selector not found.');
  }

  courseSelect.innerHTML = '';
  courseOptions.forEach((course) => {
    const option = document.createElement('option');
    option.value = course.courseId;
    option.textContent = course.courseLabel;
    option.selected = course.courseId === currentCourseId;
    courseSelect.appendChild(option);
  });

  const renderCourse = (courseId) => {
    currentCourseId = courseId;
    const source = buildDemoSource(catalog, courseId);

    initEnrollmentCard(cardRoot, source.cardOffers, {
      courseFieldSelector: '#rd-course',
      modalityFieldSelector: '#rd-modality',
      poloFieldSelector: '#rd-polo',
    });
  };

  renderCourse(currentCourseId);

  bindPhortePopupForm({
    popupSelector: '#phorte-demo-popup',
    courseFieldSelector: '#rd-course',
    modalityFieldSelector: '#rd-modality',
    interestChoicesSelector: '[data-phorte-interest-select]',
    interestCatalogByModalidade: initialSource.interestCatalogByModalidade,
    poloCatalogByCourseAndModalidade: initialSource.poloCatalogByCourseAndModalidade,
    poloFieldSelector: '#rd-polo',
    summarySelector: '[data-phorte-popup-summary]',
  });

  courseSelect.addEventListener('change', () => {
    renderCourse(courseSelect.value);
    clearDemoFeedback();
    closeDemoPopup();
  });

  bindDemoPopupClose();
  bindDemoSubmit();
}

bootstrap().catch((error) => {
  const errorNode = document.querySelector('[data-phorte-demo-error]');
  if (errorNode) {
    errorNode.textContent = error.message;
    errorNode.hidden = false;
  }
  throw error;
});
