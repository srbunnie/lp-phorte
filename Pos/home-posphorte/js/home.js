/* Home Pós Phorte: hero, carrosséis e vídeos sob demanda. Nenhum dado é enviado para serviços externos. */
(() => {
  'use strict';
  function initializeHero(root, reducedMotion) {
    const carousel = root.querySelector('[data-hero-carousel]');
    if (!carousel) return;
    const track = carousel.querySelector('.hp-hero-track');
    const slides = [...carousel.querySelectorAll('[data-hero-slide]')];
    const controls = carousel.querySelector('.hp-hero-controls');
    const pagination = carousel.querySelector('.hp-hero-pagination');
    const rotation = carousel.querySelector('[data-hero-rotation]');
    const status = carousel.querySelector('.hp-hero-status');
    if (slides.length < 2) return;
    let active = 0, enabled = !reducedMotion.matches, pointerPaused = false;
    let inView = true, timer = 0, resizeFrame = 0;
    const updateHeight = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        track.style.height = slides[active].offsetHeight + 'px';
      });
    };
    const resize = new ResizeObserver(updateHeight);
    function updateRotation() {
      rotation.setAttribute('aria-pressed', String(enabled));
      rotation.setAttribute('aria-label', enabled ? 'Pausar troca automática' : 'Ativar troca automática');
    }
    function render(announce = false) {
      slides.forEach((slide, i) => {
        const isActive = i === active;
        slide.dataset.active = String(isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        slide.inert = !isActive;
      });
      [...pagination.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
      resize.disconnect();
      resize.observe(slides[active]);
      updateHeight();
      if (announce) status.textContent = 'Destaque ' + (active + 1) + ' de ' + slides.length;
    }
    function schedule() {
      clearTimeout(timer);
      const running = enabled && !pointerPaused && inView && !document.hidden;
      carousel.dataset.rotationRunning = String(running);
      if (!running) return;
      const dot = pagination.children[active];
      dot.classList.remove('is-progressing');
      void dot.offsetWidth;
      dot.classList.add('is-progressing');
      timer = setTimeout(() => { active = (active + 1) % slides.length; render(); schedule(); }, 5000);
    }
    function pause() {
      enabled = false;
      updateRotation();
      schedule();
    }
    function show(index) {
      active = (index + slides.length) % slides.length;
      pagination.querySelectorAll('.is-progressing').forEach(dot => dot.classList.remove('is-progressing'));
      pause();
      render(true);
    }
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hp-hero-dot';
      dot.setAttribute('aria-label', 'Exibir destaque ' + (i + 1) + ' de ' + slides.length);
      const id = 'hp-hero-slide-' + (i + 1);
      slides[i].id = id;
      dot.setAttribute('aria-controls', id);
      dot.innerHTML = '<span><span class="hp-hero-progress"></span></span>';
      dot.addEventListener('click', () => show(i));
      pagination.append(dot);
    });
    carousel.querySelector('[data-hero-prev]').addEventListener('click', () => show(active - 1));
    carousel.querySelector('[data-hero-next]').addEventListener('click', () => show(active + 1));
    rotation.addEventListener('click', () => { enabled = !enabled; updateRotation(); schedule(); });
    carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { pointerPaused = true; schedule(); } });
    carousel.addEventListener('pointerleave', () => { pointerPaused = false; schedule(); });
    carousel.addEventListener('focusin', event => {
      // O clique no botão de pausa precisa alternar o estado anterior ao foco.
      if (event.target === rotation && !rotation.matches(':focus-visible')) return;
      pause();
    });
    carousel.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      // Os controles permanecem visíveis ao trocar slides e conservam o foco.
      if (!controls.contains(event.target)) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(active + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    // A busca é renderizada pelo shortcode phorte_pos_search, fora deste widget (sem colchetes: o WordPress expande shortcodes até em comentários).
    // Sem o invólucro #hp-busca, a busca é o elemento do Elementor logo após o hero; ele recebe a âncora dos botões.
    let searchSlot = document.getElementById('hp-busca');
    const nextElement = root.closest('.elementor-element')?.nextElementSibling;
    if (!searchSlot && nextElement?.querySelector('.phorte-pos-search')) {
      searchSlot = nextElement;
      if (!searchSlot.id) searchSlot.id = 'hp-busca';
      else root.querySelectorAll('a[href="#hp-busca"]').forEach(link => { link.href = '#' + searchSlot.id; });
    }
    if (searchSlot) {
      searchSlot.addEventListener('focusin', pause);
      searchSlot.addEventListener('pointerenter', () => { pointerPaused = true; schedule(); });
      searchSlot.addEventListener('pointerleave', () => { pointerPaused = false; schedule(); });
    }
    let touch = null;
    track.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' || event.target.closest('a,button')) return;
      touch = { x: event.clientX, y: event.clientY };
    });
    track.addEventListener('pointerup', event => {
      if (!touch) return;
      const dx = event.clientX - touch.x, dy = event.clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy)) show(active + (dx < 0 ? 1 : -1));
    });
    track.addEventListener('pointercancel', () => { touch = null; });
    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) pause(); });
    document.addEventListener('visibilitychange', schedule);
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, { threshold: 0 }).observe(carousel);
    carousel.querySelectorAll('img').forEach(img => img.addEventListener('load', updateHeight));
    document.fonts?.ready.then(updateHeight);
    controls.hidden = false;
    render();
    updateRotation();
    schedule();
  }
  function initializeSections(root, reducedMotion) {
    root.querySelectorAll('[data-video]').forEach(shell => {
      const play = shell.querySelector('.hp-video-play');
      play.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.title = play.getAttribute('aria-label');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + shell.dataset.video + '?autoplay=1&rel=0&playsinline=1';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        shell.querySelector('img').remove();
        shell.querySelector('.hp-video-fallback').remove();
        play.remove();
        shell.prepend(frame);
        frame.focus();
      }, { once: true });
    });
    root.querySelectorAll('[data-carousel]').forEach(shell => {
      const track = shell.querySelector('.hp-track');
      const items = [...track.children];
      const previous = shell.querySelector('[data-prev]');
      const next = shell.querySelector('[data-next]');
      const dots = shell.querySelector('.hp-carousel-dots');
      const status = shell.querySelector('.hp-carousel-status');
      shell.querySelector('.hp-carousel-arrows').hidden = false;
      shell.querySelector('.hp-carousel-bottom').hidden = false;
      let stops = [], pageIndex = 0, visible = 1, oldStep = 0, frame = 0;
      const step = () => items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth;
      const move = index => {
        index = Math.max(0, Math.min(stops.length - 1, index));
        track.scrollTo({ left: stops[index], behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      };
      function update() {
        const left = track.scrollLeft;
        pageIndex = stops.reduce((best, stop, index) => Math.abs(stop - left) < Math.abs(stops[best] - left) ? index : best, 0);
        previous.disabled = left < 2;
        next.disabled = left >= track.scrollWidth - track.clientWidth - 2;
        [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === pageIndex)));
        const first = Math.max(0, Math.min(items.length - 1, Math.round(left / step())));
        status.textContent = 'Cursos ' + (first + 1) + '–' + Math.min(first + visible, items.length) + ' de ' + items.length;
      }
      function measure() {
        const firstBeforeResize = oldStep ? Math.round(track.scrollLeft / oldStep) : 0;
        visible = Number(getComputedStyle(root).getPropertyValue('--hp-columns').trim()) || 1;
        oldStep = step();
        const last = Math.max(0, track.scrollWidth - track.clientWidth);
        stops = Array.from({ length: Math.ceil(items.length / visible) }, (_, i) => Math.min(i * visible * oldStep, last));
        dots.replaceChildren(...stops.map((_, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Página ' + (i + 1) + ' de ' + stops.length);
          dot.setAttribute('aria-controls', track.id);
          dot.addEventListener('click', () => move(i));
          return dot;
        }));
        const target = Math.min(Math.floor(firstBeforeResize / visible), stops.length - 1);
        track.scrollTo({ left: stops[target], behavior: 'instant' });
        update();
      }
      previous.addEventListener('click', () => move(pageIndex - 1));
      next.addEventListener('click', () => move(pageIndex + 1));
      track.addEventListener('scroll', () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      }, { passive: true });
      track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        const index = ({ ArrowLeft: pageIndex - 1, ArrowRight: pageIndex + 1, Home: 0, End: stops.length - 1 })[event.key];
        if (index !== undefined) { event.preventDefault(); move(index); }
      });
      // Arraste com mouse; toque usa a rolagem nativa do navegador.
      let drag = null, suppressClick = false;
      track.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        drag = { x: event.clientX, left: track.scrollLeft, moved: false };
        suppressClick = false;
      });
      track.addEventListener('pointermove', event => {
        if (!drag) return;
        const delta = event.clientX - drag.x;
        if (Math.abs(delta) > 7 && !drag.moved) {
          drag.moved = true;
          track.setPointerCapture(event.pointerId);
          track.classList.add('hp-dragging');
        }
        if (drag.moved) { event.preventDefault(); track.scrollLeft = drag.left - delta; }
      });
      const endDrag = () => {
        if (drag?.moved) suppressClick = true;
        track.classList.remove('hp-dragging');
        drag = null;
      };
      track.addEventListener('pointerup', endDrag);
      track.addEventListener('pointercancel', endDrag);
      track.addEventListener('lostpointercapture', endDrag);
      track.addEventListener('pointerleave', () => { if (drag && !drag.moved) drag = null; });
      track.addEventListener('click', event => {
        if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
      }, true);
      track.addEventListener('dragstart', event => event.preventDefault());
      new ResizeObserver(measure).observe(track);
      measure();
    });
  }
  // A página precisa de uma região principal e de um destino para "Pular para o conteúdo" do cabeçalho.
  // O ideal é o contêiner do Elementor com tag HTML main e ID hp-main; sem isso, o contêiner da home assume o papel.
  function markMainRegion(root) {
    if (document.querySelector('main, [role="main"]')) return;
    const region = root.closest('.e-con.e-parent') || root.closest('.elementor-element') || root;
    region.setAttribute('role', 'main');
    if (!document.getElementById('hp-main') && !region.id) region.id = 'hp-main';
    if (!region.hasAttribute('tabindex')) region.setAttribute('tabindex', '-1');
  }
  function initialize(root) {
    if (root.dataset.hpInitialized) return;
    root.dataset.hpInitialized = 'true';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (root.id === 'hp-home-hero') markMainRegion(root);
    if (root.id === 'hp-home-hero') initializeHero(root, reducedMotion);
    else initializeSections(root, reducedMotion);
  }
  const start = () => document.querySelectorAll('#hp-home-hero, #hp-home-secoes').forEach(initialize);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
