(() => {
  if (window.PhorteGraduacao) { window.PhorteGraduacao.init(); return; }
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const videoClosers = new WeakMap();
  const closeVideos = container => container.querySelectorAll('[data-video]').forEach(wrapper => videoClosers.get(wrapper)?.());
  function filters(root) {
    const panel = root.querySelector('[data-search]');
    if (!panel || panel.dataset.ready) return;
    const grid = root.querySelector('[data-course-grid]');
    const query = panel.querySelector('[data-query]');
    const modality = panel.querySelector('[data-modality]');
    if (!grid || !query || !modality) return;
    panel.dataset.ready = 'true';
    const cards = [...grid.querySelectorAll('[data-course-id]')];
    const render = () => {
      const term = normalize(query.value);
      let count = 0;
      cards.forEach(card => {
        const matches = normalize(card.dataset.name).includes(term) && (!modality.value || card.dataset.modalities.split(',').includes(modality.value));
        card.hidden = !matches; if (matches) count++;
      });
      grid.dataset.all = String(count === cards.length);
      const status = panel.querySelector('[data-results-count]');
      if (status) status.textContent = count === 1 ? '1 curso encontrado' : count + ' cursos encontrados';
      const empty = root.querySelector('[data-empty]'); if (empty) empty.hidden = count > 0;
    };
    query.addEventListener('input', render);
    query.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); render(); } });
    modality.addEventListener('change', render);
    panel.querySelector('[data-search-button]')?.addEventListener('click', render);
    panel.querySelector('[data-clear]')?.addEventListener('click', () => { query.value = ''; modality.value = ''; render(); query.focus(); });
  }
  function tabs(root) {
    const list = root.querySelector('[data-tabs]');
    if (!list || list.dataset.ready) return;
    const buttons = [...list.querySelectorAll('[data-tab]')];
    const panels = buttons.map(tab => root.querySelector(tab.getAttribute('href')));
    if (!buttons.length || panels.some(p => !p)) return;
    list.dataset.ready = 'true';
    list.setAttribute('role', 'tablist');
    const select = (index, focus = false) => {
      buttons.forEach((tab, i) => { tab.setAttribute('aria-selected', String(index === i)); tab.tabIndex = index === i ? 0 : -1; panels[i].hidden = index !== i; panels[i].inert = index !== i; });
      if (focus) {
        buttons[index].focus({ preventScroll:true });
        const item = buttons[index].getBoundingClientRect(), viewport = list.getBoundingClientRect();
        if (item.left < viewport.left) list.scrollLeft += item.left - viewport.left - 8;
        else if (item.right > viewport.right) list.scrollLeft += item.right - viewport.right + 8;
      }
    };
    buttons.forEach((tab, index) => {
      tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', panels[index].id);
      panels[index].setAttribute('role', 'tabpanel'); panels[index].setAttribute('aria-labelledby', tab.id);
      tab.addEventListener('click', event => { event.preventDefault(); select(index); });
      tab.addEventListener('keydown', event => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else if (event.key === ' ') { event.preventDefault(); select(index); return; }
        else return;
        event.preventDefault(); select(next, true);
      });
    });
    select(0);
  }
  function videos(root) {
    root.querySelectorAll('[data-video-play]').forEach(button => {
      if (button.dataset.ready) return;
      button.dataset.ready = 'true';
      button.addEventListener('click', () => {
        const wrapper = button.closest('[data-video]');
        if (!wrapper || !/^[\w-]{11}$/.test(wrapper.dataset.video)) return;
        if (wrapper.querySelector('iframe')) return;
        const frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + wrapper.dataset.video + '?autoplay=1&rel=0';
        frame.title = button.getAttribute('aria-label').replace('Assistir ao vídeo: ', 'Vídeo: ');
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        wrapper.dataset.playing = 'true';
        button.replaceWith(frame); frame.focus({ preventScroll:true });
        const closeButton = document.createElement('button');
        closeButton.type = 'button'; closeButton.className = 'hg-video-close'; closeButton.textContent = 'Fechar vídeo';
        closeButton.setAttribute('aria-label', button.getAttribute('aria-label').replace('Assistir ao vídeo: ', 'Fechar vídeo: '));
        const close = (restoreFocus = false) => {
          frame.replaceWith(button); closeButton.remove(); delete wrapper.dataset.playing; videoClosers.delete(wrapper);
          if (restoreFocus) button.focus({ preventScroll:true });
        };
        closeButton.addEventListener('click', () => close(true));
        wrapper.append(closeButton); videoClosers.set(wrapper, close);
      });
    });
  }
  function carousels(root) {
    root.querySelectorAll('[data-testimonials]').forEach(track => {
      if (track.dataset.ready) return;
      const section = track.closest('section');
      const previous = section.querySelector('[data-prev]');
      const next = section.querySelector('[data-next]');
      if (!previous || !next) return;
      track.dataset.ready = 'true';
      const update = () => { previous.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; };
      const move = direction => { track.scrollBy({ left: direction * (track.clientWidth + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };
      previous.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
      track.addEventListener('scroll', update, { passive:true });
      track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
        else if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); track.scrollTo({ left:event.key === 'Home' ? 0 : track.scrollWidth, behavior:'instant' }); }
      });
      new ResizeObserver(update).observe(track); update();
    });
  }
  function quotesAndUnits(root) {
    root.querySelectorAll('[data-quote-toggle]').forEach(button => {
      if (button.dataset.ready) return;
      button.dataset.ready = 'true';
      button.setAttribute('aria-expanded','false');
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(expanded));
        const action = button.querySelector('[data-quote-action]');
        if (action) action.textContent = expanded ? 'Mostrar menos' : 'Mostrar mais';
      });
    });
    // Units open sideways: details stay in the DOM for the width transition, but inert while closed.
    root.querySelectorAll('[data-units]').forEach(units => {
      if (units.dataset.ready) return;
      units.dataset.ready = 'true';
      units.querySelectorAll('[data-unit-card]').forEach(card => {
        const toggle = card.querySelector('[data-unit-toggle]');
        const details = card.querySelector('.hg-campus-details');
        const set = open => {
          card.toggleAttribute('data-open', open);
          toggle.setAttribute('aria-expanded', String(open));
          details.inert = !open;
        };
        set(false);
        toggle.addEventListener('click', () => set(!card.hasAttribute('data-open')));
        card.querySelector('[data-unit-close]')?.addEventListener('click', () => { set(false); toggle.focus(); });
      });
    });
  }
  function loops(root) {
    root.querySelectorAll('[data-loop]').forEach(loop => {
      if (loop.dataset.loopReady) return;
      const track = loop.querySelector('[data-loop-track]');
      if (!track || track.children.length < 2) return;
      // Only the partner marquee moves by itself; the other strips repeat when scrolled sideways.
      const autoplay = loop.hasAttribute('data-autoplay');
      loop.dataset.loopReady = 'true';
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const observer = new ResizeObserver(() => measure());
      let userPaused = motion.matches, hovered = false, focused = false, dragging = false, visible = false;
      let phase = 0, lastLeft = 0, cycle = 1, lastTime = 0, frame = 0, fraction = 0, resumeAfter = 0;
      const gap = () => parseFloat(getComputedStyle(track).columnGap) || 0;
      const span = node => node.getBoundingClientRect().width + gap();
      const update = () => {
        const percent = ((phase % cycle) + cycle) % cycle / cycle * 100;
        loop.dataset.loopPhase = phase.toFixed(3);
        loop.dataset.loopPercent = percent.toFixed(1);
      };
      // Reuse the original nodes: no duplicate IDs, quotes, links or video players.
      const recycle = () => {
        if (track.scrollWidth <= track.clientWidth + 2) return;
        let first = track.firstElementChild, last = track.lastElementChild;
        if (track.scrollLeft < 1 && !last.contains(document.activeElement)) {
          closeVideos(last);
          const width = span(last);
          track.prepend(last); track.scrollLeft += width;
        } else if (track.scrollLeft > span(first) + 1 && !first.contains(document.activeElement)) {
          closeVideos(first);
          const width = span(first);
          track.append(first); track.scrollLeft -= width;
        }
        lastLeft = track.scrollLeft;
      };
      const measure = () => {
        cycle = [...track.children].reduce((sum,node) => sum + span(node), 0) || 1;
        recycle(); update();
      };
      const move = distance => {
        fraction += distance;
        distance = Math.trunc(fraction); fraction -= distance;
        if (!distance) return;
        // Small increments keep the recycle boundary seamless even for a full-card step.
        const direction = Math.sign(distance);
        let remaining = Math.abs(distance);
        while (remaining > 0) {
          const step = Math.min(remaining, 16);
          track.scrollLeft += direction * step;
          phase = (phase + track.scrollLeft - lastLeft + cycle) % cycle;
          recycle(); remaining -= step;
        }
        update();
      };
      // Arrows glide one item; reduced motion jumps directly.
      let glideFrame = 0;
      const glide = distance => {
        cancelAnimationFrame(glideFrame);
        if (motion.matches) { move(distance); return; }
        const start = performance.now(), duration = 380; let done = 0;
        const step = now => {
          const t = Math.min((now - start) / duration, 1), eased = 1 - Math.pow(1 - t, 3);
          move(distance * eased - done); done = distance * eased;
          if (t < 1) glideFrame = requestAnimationFrame(step);
        };
        glideFrame = requestAnimationFrame(step);
      };
      const onMotion = event => { userPaused = event.matches; };
      motion.addEventListener('change', onMotion);
      loop.addEventListener('mouseenter', () => { hovered = true; });
      loop.addEventListener('mouseleave', () => { hovered = false; });
      loop.addEventListener('focusin', () => { focused = true; });
      loop.addEventListener('focusout', () => { focused = loop.contains(document.activeElement); queueMicrotask(() => { focused = loop.contains(document.activeElement); }); });
      loop.querySelector('[data-loop-prev]')?.addEventListener('click', () => { closeVideos(track); glide(-span(track.firstElementChild)); });
      loop.querySelector('[data-loop-next]')?.addEventListener('click', () => { closeVideos(track); glide(span(track.firstElementChild)); });
      track.addEventListener('scroll', () => {
        phase = (phase + track.scrollLeft - lastLeft + cycle) % cycle;
        recycle(); update();
      }, { passive:true });
      track.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > 1 || (event.shiftKey && Math.abs(event.deltaY) > 1)) closeVideos(track); }, { passive:true });
      track.addEventListener('keydown', event => {
        if (event.target !== track || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
        event.preventDefault(); closeVideos(track); move((event.key === 'ArrowLeft' ? -1 : 1) * span(track.firstElementChild));
      });
      let startX = 0, pointerX = 0, didDrag = false, pointerId = null;
      track.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        startX = pointerX = event.clientX; pointerId = event.pointerId; didDrag = false; dragging = true;
      });
      track.addEventListener('pointermove', event => {
        if (!dragging || event.pointerId !== pointerId) return;
        if (event.pointerType !== 'mouse') return;
        if (!didDrag && Math.abs(event.clientX - startX) > 6) { didDrag = true; closeVideos(track); track.setPointerCapture(pointerId); }
        if (didDrag) { event.preventDefault(); move(pointerX - event.clientX); }
        pointerX = event.clientX;
      });
      const endDrag = () => { if (dragging) resumeAfter = performance.now() + 900; dragging = false; pointerId = null; };
      track.addEventListener('pointerup', endDrag); track.addEventListener('pointercancel', endDrag);
      track.addEventListener('lostpointercapture', endDrag);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
      window.addEventListener('blur', endDrag);
      track.addEventListener('dragstart', event => event.preventDefault());
      track.addEventListener('click', event => { if (didDrag) { event.preventDefault(); event.stopImmediatePropagation(); didDrag = false; } }, true);
      const viewport = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold:.15 });
      viewport.observe(loop); observer.observe(track);
      measure();
      const animate = time => {
        if (!loop.isConnected) {
          observer.disconnect(); viewport.disconnect(); motion.removeEventListener('change', onMotion);
          window.removeEventListener('pointerup', endDrag); window.removeEventListener('pointercancel', endDrag); window.removeEventListener('blur', endDrag);
          cancelAnimationFrame(frame); return;
        }
        const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0; lastTime = time;
        const running = autoplay && visible && !document.hidden && !userPaused && !hovered && !focused && !dragging && time > resumeAfter && !track.querySelector('iframe,[data-quote-toggle][aria-expanded="true"]');
        loop.dataset.loopRunning = String(running);
        if (running) move(Number(loop.dataset.speed || 24) * elapsed / 1000);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    });
  }
  const init = () => {
    document.querySelectorAll('[data-hg-before]').forEach(before => {
      let root = before.closest('#hg-main');
      if (!root) {
        root = before.closest('.e-con') || before.parentElement;
        if (!document.getElementById('hg-main')) { root.id = 'hg-main'; root.setAttribute('role','main'); root.tabIndex = -1; root.classList.add('hg-scope'); }
      }
      if (!root) return;
      filters(root); tabs(root); videos(root); carousels(root); quotesAndUnits(root); loops(root);
    });
    window.PhorteGraduacaoInitBanner?.();
  };
  window.PhorteGraduacao = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true }); else init();
  let pending = false;
  new MutationObserver(() => { if (pending) return; pending = true; requestAnimationFrame(() => { pending = false; init(); }); }).observe(document.documentElement, { childList:true, subtree:true });
})();
