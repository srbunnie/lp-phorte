(() => {
  function initTranslationPage() {
    const root = document.querySelector('.phorte-traducao-interpretacao-2027-1');
    if (!root || root.dataset.ready === 'true') return;
    root.dataset.ready = 'true';

    const form = root.querySelector('[data-demo-form]');
    const success = root.querySelector('[data-form-success]');

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (success) success.hidden = false;
        form.reset();
        success?.focus({ preventScroll: true });
      });
    }

    root.querySelectorAll('[data-expand-all]').forEach((button) => {
      button.addEventListener('click', () => {
        const open = button.dataset.expandAll === 'open';
        root.querySelectorAll('[data-curriculum-item]').forEach((item) => {
          item.open = !open;
        });
        button.dataset.expandAll = open ? 'closed' : 'open';
        button.textContent = open ? 'Ver grade completa' : 'Recolher grade';
      });
    });

    root.querySelectorAll('[data-faculty-carousel]').forEach((carousel) => {
      const viewport = carousel.querySelector('[data-faculty-viewport]');
      const track = carousel.querySelector('[data-faculty-track]');
      const cards = [...(track?.querySelectorAll('.ti-faculty-card') || [])];
      const previous = carousel.querySelector('[data-faculty-prev]');
      const next = carousel.querySelector('[data-faculty-next]');

      if (!viewport || !track || !cards.length || !previous || !next) return;

      let updateFrame;

      const getGap = () => Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      const getVisibleCount = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const step = cardWidth + getGap();

        return Math.max(1, Math.min(cards.length, Math.floor((viewport.clientWidth + getGap()) / step + .01)));
      };
      const getCurrentIndex = () => {
        const scrollLeft = viewport.scrollLeft;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        return closestIndex;
      };
      const updateViewportHeight = (currentIndex, visibleCount) => {
        const visibleCards = cards.slice(currentIndex, currentIndex + visibleCount);
        const tallestCard = Math.max(...visibleCards.map((card) => card.offsetHeight));

        if (Number.isFinite(tallestCard)) viewport.style.height = `${tallestCard + 4}px`;
      };
      const scheduleUpdate = () => {
        cancelAnimationFrame(updateFrame);
        updateFrame = requestAnimationFrame(update);
      };

      const setupDescriptionToggle = (card) => {
        const description = card.querySelector('p');
        if (!description || card.querySelector('.ti-faculty-more')) return;

        const more = document.createElement('button');
        more.className = 'ti-faculty-more';
        more.type = 'button';
        more.hidden = true;
        more.setAttribute('aria-expanded', 'false');
        more.textContent = 'Ver mais';
        description.insertAdjacentElement('afterend', more);

        const syncMoreButton = () => {
          const expanded = card.classList.contains('is-expanded');
          more.hidden = !expanded && description.scrollHeight <= description.clientHeight + 1;
        };

        more.addEventListener('click', () => {
          const expanded = card.classList.toggle('is-expanded');
          more.setAttribute('aria-expanded', String(expanded));
          more.textContent = expanded ? 'Ver menos' : 'Ver mais';
          syncMoreButton();
          scheduleUpdate();
        });

        requestAnimationFrame(syncMoreButton);
        document.fonts?.ready.then(syncMoreButton);
      };

      cards.forEach(setupDescriptionToggle);

      const update = () => {
        const visibleCount = getVisibleCount();
        const lastIndex = Math.max(0, cards.length - visibleCount);
        const currentIndex = Math.min(lastIndex, getCurrentIndex());

        updateViewportHeight(currentIndex, visibleCount);

        cards.forEach((card) => {
          card.setAttribute('role', 'group');
          card.setAttribute('aria-roledescription', 'slide');
          const name = card.querySelector('h3')?.textContent?.trim();
          card.setAttribute('aria-label', name || 'Docente');
        });
      };

      const move = (direction) => {
        const visibleCount = getVisibleCount();
        const lastIndex = Math.max(0, cards.length - visibleCount);
        const currentIndex = Math.min(lastIndex, getCurrentIndex());
        let targetIndex = currentIndex + direction * visibleCount;

        if (direction > 0 && currentIndex >= lastIndex) targetIndex = 0;
        if (direction < 0 && currentIndex <= 0) targetIndex = lastIndex;
        targetIndex = Math.min(lastIndex, Math.max(0, targetIndex));
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

        viewport.scrollTo({ left: cards[targetIndex].offsetLeft, behavior });
      };

      previous.addEventListener('click', () => move(-1));
      next.addEventListener('click', () => move(1));
      viewport.addEventListener('scroll', scheduleUpdate, { passive: true });
      viewport.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;

        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          move(-1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          move(1);
        }
        if (event.key === 'Home') {
          event.preventDefault();
          viewport.scrollTo({ left: cards[0].offsetLeft, behavior: 'auto' });
          scheduleUpdate();
        }
        if (event.key === 'End') {
          event.preventDefault();
          viewport.scrollTo({ left: cards[cards.length - 1].offsetLeft, behavior: 'auto' });
          scheduleUpdate();
        }
      });

      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(viewport);
        resizeObserver.observe(track);
      } else {
        window.addEventListener('resize', scheduleUpdate, { passive: true });
      }

      document.fonts?.ready.then(scheduleUpdate);
      update();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslationPage, { once: true });
  } else {
    initTranslationPage();
  }
})();
