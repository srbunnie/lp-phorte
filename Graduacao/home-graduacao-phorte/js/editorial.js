(() => {
  if (window.PhorteGraduacaoEditorial) { window.PhorteGraduacaoEditorial.init(); return; }
  const init = () => document.querySelectorAll('[data-hgc-home]').forEach(root => {
    if (root.dataset.editorialReady) return;
    root.dataset.editorialReady = 'true';
    root.querySelectorAll('[data-banner]').forEach(banner => {
      // Banner 3:1: setas, pontos, toque e teclado; ao fim volta ao primeiro. Sem autoplay.
      const track = banner.querySelector('[data-banner-track]');
      const slides = [...banner.querySelectorAll('[data-banner-slide]')];
      const dots = [...banner.querySelectorAll('[data-banner-dot]')];
      if (!track || slides.length < 2) return;
      const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let current = 0, settle = 0;
      const sync = () => {
        current = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
        slides.forEach((slide, i) => { slide.inert = i !== current; });
        dots.forEach((dot, i) => dot.toggleAttribute('aria-current', i === current));
        banner.dataset.bannerIndex = String(current);
      };
      const go = index => {
        const target = (index + slides.length) % slides.length;
        track.scrollTo({ left: target * track.clientWidth, behavior: reduce() ? 'instant' : 'smooth' });
        current = target; dots.forEach((dot, i) => dot.toggleAttribute('aria-current', i === target));
        clearTimeout(settle); settle = setTimeout(sync, reduce() ? 0 : 450);
      };
      banner.querySelector('[data-banner-prev]')?.addEventListener('click', () => go(current - 1));
      banner.querySelector('[data-banner-next]')?.addEventListener('click', () => go(current + 1));
      dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
      track.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(current + (event.key === 'ArrowRight' ? 1 : -1)); }
      });
      track.addEventListener('scroll', () => { clearTimeout(settle); settle = setTimeout(sync, 120); }, { passive:true });
      new ResizeObserver(() => { track.scrollLeft = current * track.clientWidth; }).observe(track);
      sync();
    });
    root.querySelectorAll('[data-reveal-course]').forEach(link => link.addEventListener('click', event => {
      const target = root.querySelector('#hgc-course-' + link.dataset.revealCourse);
      if (!target) return;
      event.preventDefault();
      const query = root.querySelector('[data-query]'), modality = root.querySelector('[data-modality]');
      if (query) { query.value = ''; query.dispatchEvent(new Event('input', { bubbles:true })); }
      if (modality) { modality.value = ''; modality.dispatchEvent(new Event('change', { bubbles:true })); }
      target.focus({ preventScroll:true });
      target.scrollIntoView({ block:'start', behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }));
  });
  window.PhorteGraduacaoEditorial = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true }); else init();
  let pending = false;
  new MutationObserver(() => { if (pending) return; pending = true; requestAnimationFrame(() => { pending = false; init(); }); }).observe(document.documentElement, { childList:true, subtree:true });
})();
