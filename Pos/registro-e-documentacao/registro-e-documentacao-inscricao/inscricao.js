(() => {
  const formRoot = document.querySelector('#educacao-i-materiais-gratuitos-de-registro-i-formulario-base-e02720cacdd00cd91016');
  const status = document.querySelector('#form-status');
  const redirectUrl = new URL('../registro-e-documentacao-materiais/materiais.html', window.location.href).href;

  if (!formRoot) return;

  const enhanceForm = () => {
    const form = formRoot.querySelector('form');
    if (!form || form.dataset.phorteEnhanced === 'true') return;

    form.dataset.phorteEnhanced = 'true';
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
      const fields = [...form.querySelectorAll('input[required], select[required], textarea[required]')];
      const firstEmptyField = fields.find((field) => field.type !== 'radio' && !field.value.trim());
      const requiredRadioGroups = [...new Set(fields.filter((field) => field.type === 'radio').map((field) => field.name))];
      const missingRadioGroup = requiredRadioGroups.find((name) => !form.querySelector(`input[type="radio"][name="${CSS.escape(name)}"]:checked`));

      if (firstEmptyField || missingRadioGroup) return;

      event.preventDefault();
      sessionStorage.setItem('phorte-registration-complete', 'true');

      if (submitButton) submitButton.disabled = true;
      if (status) status.textContent = 'Tudo certo! Abrindo seus conteúdos…';

      window.setTimeout(() => {
        window.location.href = redirectUrl;
      }, 900);
    });
  };

  const observer = new MutationObserver(enhanceForm);
  observer.observe(formRoot, { childList: true, subtree: true });
  enhanceForm();
})();
