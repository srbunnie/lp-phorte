(() => {
  const carousel = document.querySelector('[data-testimonial-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-carousel-go]')];
  const count = carousel.querySelector('.carousel-count');
  let activeIndex = 0;

  const show = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === activeIndex;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
      const frame = slide.querySelector('iframe');
      if (frame && active && frame.dataset.src && frame.src !== frame.dataset.src) {
        frame.src = frame.dataset.src;
      }
      if (frame && !active) frame.src = 'about:blank';
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === activeIndex)));
    if (count) count.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(activeIndex - 1));
  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(activeIndex + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.carouselGo))));
})();
