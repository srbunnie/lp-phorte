/* Escopo por raiz. Nenhum envio, armazenamento ou integração de dados. */
(() => {
  'use strict';
  const forms = new WeakSet();
  const roots = new WeakMap();

  function initGestaoPage(root) {
    const form = root.querySelector('[data-preview-form]');
    if (form && !forms.has(form)) {
      forms.add(form);
      const button = form.querySelector('[data-preview-submit]');
      const feedback = form.querySelector('[data-preview-feedback]');
      form.addEventListener('submit', (event) => event.preventDefault());
      if (button && feedback) {
        button.disabled = false;
        button.addEventListener('click', () => {
          if (!form.reportValidity()) return;
          feedback.hidden = false;
          feedback.textContent = form.dataset.previewMessage;
          feedback.focus();
        });
        form.addEventListener('input', () => {
          feedback.hidden = true;
          feedback.textContent = '';
        });
      }
    }

    const sticky = root.querySelector('[data-mobile-cta]');
    const hero = root.querySelector('.gestao-hero');
    const contact = root.querySelector('.gestao-enrollment');
    const finalCta = root.querySelector('.gestao-final-cta');
    if (!sticky || !hero || !contact || !finalCta || !('IntersectionObserver' in window)) {
      roots.get(root)?.cleanup();
      roots.delete(root);
      if (sticky) sticky.hidden = true;
      root.style.setProperty('--gestao-sticky-height', '0px');
      return;
    }

    const previous = roots.get(root);
    if (previous && previous.sticky === sticky && previous.hero === hero && previous.contact === contact && previous.finalCta === finalCta) return;
    previous?.cleanup();
    const listeners = new AbortController();

    const mobile = window.matchMedia('(max-width: 767px)');
    const state = { heroPassed: false, contactVisible: false, finalVisible: false };
    function updateSticky() {
      const editing = contact.contains(document.activeElement);
      const visible = mobile.matches && state.heroPassed && !state.contactVisible && !state.finalVisible && !editing;
      sticky.hidden = !visible;
      root.style.setProperty('--gestao-sticky-height', visible ? `${sticky.getBoundingClientRect().height}px` : '0px');
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) state.heroPassed = entry.boundingClientRect.bottom <= 0;
        if (entry.target === contact) state.contactVisible = entry.isIntersecting;
        if (entry.target === finalCta) state.finalVisible = entry.isIntersecting;
      });
      updateSticky();
    }, { threshold: 0 });
    [hero, contact, finalCta].forEach((element) => observer.observe(element));
    const resize = 'ResizeObserver' in window ? new ResizeObserver(updateSticky) : null;
    resize?.observe(sticky);
    mobile.addEventListener('change', updateSticky, { signal: listeners.signal });
    contact.addEventListener('focusin', updateSticky, { signal: listeners.signal });
    contact.addEventListener('focusout', () => window.requestAnimationFrame(updateSticky), { signal: listeners.signal });
    roots.set(root, { sticky, hero, contact, finalCta, cleanup() { observer.disconnect(); resize?.disconnect(); listeners.abort(); } });
    updateSticky();
  }

  const scan = () => document.querySelectorAll('.phorte-lp-gestao').forEach(initGestaoPage);
  function start() {
    scan();
    // Detectar inserção/substituição de raízes e fragmentos sem observar estilos.
    new MutationObserver((records) => {
      const relevant = records.some((record) => [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === 1 && (node.matches?.('.phorte-lp-gestao, [data-mobile-cta], .gestao-enrollment, .gestao-hero, .gestao-final-cta, [data-preview-form]') || node.querySelector?.('.phorte-lp-gestao, [data-mobile-cta], .gestao-enrollment, .gestao-hero, .gestao-final-cta, [data-preview-form]'))));
      if (!relevant) return;
      records.forEach((record) => record.removedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const removedRoots = node.matches?.('.phorte-lp-gestao') ? [node] : node.querySelectorAll?.('.phorte-lp-gestao') || [];
        removedRoots.forEach((removed) => {
          if (!removed.isConnected) { roots.get(removed)?.cleanup(); roots.delete(removed); }
        });
      }));
      scan();
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  // O editor pode inserir widgets depois do carregamento inicial.
  if (window.elementorFrontend?.hooks) window.elementorFrontend.hooks.addAction('frontend/element_ready/html.default', scan);
  window.addEventListener('elementor/frontend/init', () => {
    window.elementorFrontend?.hooks?.addAction('frontend/element_ready/html.default', scan);
    scan();
  }, { once: true });
})();
