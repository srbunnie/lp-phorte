const form = document.getElementById('signup-form');

if (form) {
  const consent = form.querySelector('#consentimento');
  if (consent) consent.name = 'consentimento';
  const fields = [...form.querySelectorAll('input, select')];
  const status = form.querySelector('.form-status');

  fields.forEach((field) => {
    const error = form.querySelector(`[data-error-for="${field.name || field.id}"]`);
    if (error) {
      error.id = `${field.id || field.name}-error`;
      field.setAttribute('aria-describedby', error.id);
    }
    field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
    field.addEventListener('change', () => field.removeAttribute('aria-invalid'));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = form.checkValidity();
    fields.forEach((field) => field.toggleAttribute('aria-invalid', !field.checkValidity()));

    if (!valid) {
      status.textContent = 'Revise os campos destacados para concluir sua inscrição.';
      status.setAttribute('role', 'alert');
      form.querySelector(':invalid')?.focus();
      return;
    }

    status.textContent = 'Inscrição validada. Redirecionando…';
    window.location.href = 'obrigado.html';
  });
}
