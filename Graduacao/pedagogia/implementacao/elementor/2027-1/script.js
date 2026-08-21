function initPedagogiaPage() {
  document.documentElement.classList.add('js-ready');

  document.querySelectorAll('.acc-button').forEach((btn) => {
    if (btn.dataset.accReady === 'true') return;
    btn.dataset.accReady = 'true';

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

  function setupCarousel(carouselId, prevId, nextId, itemSelector, visibleStep = 1, dotsId = null) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!carousel || !prevBtn || !nextBtn || carousel.dataset.carouselReady === 'true') return;

    carousel.dataset.carouselReady = 'true';
    const dotsWrap = dotsId ? document.getElementById(dotsId) : null;
    const items = Array.from(carousel.querySelectorAll(itemSelector));

    function cardStep() {
      const card = carousel.querySelector(itemSelector);
      if (!card) return carousel.clientWidth;

      const style = getComputedStyle(carousel);
      const gap = parseFloat(style.gap || style.columnGap || '22') || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function updateNavState() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth - 2;
      prevBtn.disabled = carousel.scrollLeft <= 2;
      nextBtn.disabled = carousel.scrollLeft >= maxScroll;

      if (dotsWrap && items.length) {
        const activeIndex = Math.round(carousel.scrollLeft / cardStep());
        dotsWrap.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
          dot.classList.toggle('is-active', index === activeIndex);
        });
      }
    }

    if (dotsWrap && items.length) {
      dotsWrap.innerHTML = '';
      items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `testimonial-dot${index === 0 ? ' is-active' : ''}`;
        dot.setAttribute('aria-label', `Ir para o depoimento ${index + 1}`);
        dot.addEventListener('click', () => {
          carousel.scrollTo({ left: cardStep() * index, behavior: 'smooth' });
        });
        dotsWrap.appendChild(dot);
      });
    }

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -cardStep() * visibleStep, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: cardStep() * visibleStep, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
    updateNavState();
    setTimeout(updateNavState, 300);
  }

  setupCarousel('teacher-carousel', 'teacher-prev', 'teacher-next', '.teacher', 1);
  setupCarousel('testimonial-carousel', 'testimonial-prev', 'testimonial-next', '.testimonial-slide', 1, 'testimonial-dots');

  // Vídeos: reproduzir em modal, sem abrir outra página.
  const videoModal = document.getElementById('video-modal');
  const videoFrame = document.getElementById('video-modal-frame');
  const videoTitle = document.getElementById('video-modal-title');
  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.hidden = true;
    if (videoFrame) videoFrame.src = '';
  };

  document.querySelectorAll('[data-video-id]:not(.testimonial-video-slot)').forEach((trigger) => {
    if (trigger.dataset.videoReady === 'true') return;
    trigger.dataset.videoReady = 'true';
    trigger.addEventListener('click', () => {
      if (!videoModal || !videoFrame) return;
      const videoId = trigger.dataset.videoId;
      if (!videoId) return;
      videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      const title = trigger.dataset.videoTitle || 'Vídeo da Faculdade Phorte';
      videoFrame.title = title;
      if (videoTitle) videoTitle.textContent = title;
      videoModal.hidden = false;
    });
  });
  const videoCloseButton = document.querySelector('[data-video-close]');
  if (videoCloseButton?.dataset.ready !== 'true') {
    videoCloseButton.dataset.ready = 'true';
    videoCloseButton.addEventListener('click', closeVideoModal);
    videoModal?.addEventListener('click', (event) => {
      if (event.target === videoModal) closeVideoModal();
    });
  }

  // Depoimentos: reproduzir o vídeo direto no card, sem modal.
  document.querySelectorAll('.testimonial-video-slot').forEach((slot) => {
    if (slot.dataset.videoReady === 'true') return;
    slot.dataset.videoReady = 'true';
    slot.addEventListener('click', () => {
      const videoId = slot.dataset.videoId;
      if (!videoId) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&playsinline=1`;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      slot.innerHTML = '';
      slot.appendChild(iframe);
    });
  });

  // Formulário de inscrição inline.
  const enrollmentSuccess = document.getElementById('enrollment-success');
  const leadForm = document.getElementById('lead-form');
  if (leadForm && leadForm.dataset.formReady !== 'true') {
    leadForm.dataset.formReady = 'true';
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (enrollmentSuccess) enrollmentSuccess.hidden = false;
      leadForm.reset();
    });
  }

  if (document.documentElement.dataset.modalKeysReady !== 'true') {
    document.documentElement.dataset.modalKeysReady = 'true';
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeVideoModal();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPedagogiaPage);
} else {
  initPedagogiaPage();
}

window.addEventListener('load', initPedagogiaPage);
setTimeout(initPedagogiaPage, 800);
