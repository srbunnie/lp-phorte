(() => {
  function setupDemoForm() {
    const form = document.querySelector('.demo-form');
    if (!form) return;
    const consent = form.querySelector('#consentimento');
    const button = form.querySelector('.demo-submit');
    const status = form.querySelector('.demo-status');
    consent.addEventListener('change', () => {
      button.disabled = !consent.checked;
      status.textContent = '';
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!consent.checked) return;
      status.textContent = 'Demonstração concluída. Nenhum dado foi enviado ou armazenado.';
    });
  }

  function setupMobileFormCta() {
    const title = document.querySelector('#titulo-formulario');
    const form = document.querySelector('#formulario');
    const sticky = document.querySelector('.mobile-cta');
    if (!title || !form || !sticky) return;
    const mobile = window.matchMedia('(max-width: 780px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.querySelectorAll('[data-form-cta]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        title.focus({ preventScroll: true });
        title.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      });
    });
    const updateSticky = () => {
      const bounds = form.getBoundingClientRect();
      const formVisible = bounds.top < window.innerHeight && bounds.bottom > 0;
      const pastFirstFold = window.scrollY >= window.innerHeight;
      sticky.hidden = !mobile.matches || !pastFirstFold || formVisible;
    };
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    updateSticky();
  }

  setupDemoForm();
  setupMobileFormCta();
})();
