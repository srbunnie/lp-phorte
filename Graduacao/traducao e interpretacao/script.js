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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslationPage, { once: true });
  } else {
    initTranslationPage();
  }
})();
