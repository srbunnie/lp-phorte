(() => {
  const form = document.querySelector('#signup-form');
  if (!form) return;

  const setError = (name, message) => {
    const target = form.querySelector(`[data-error-for="${name}"]`);
    if (target) target.textContent = message;
    const field = form.querySelector(`[name="${name}"]`);
    if (field && field.type !== 'radio') field.classList.toggle('invalid', Boolean(message));
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    let valid = true;
    const requiredText = ['nome', 'email', 'telefone', 'objetivo'];
    requiredText.forEach((name) => {
      const value = String(data.get(name) || '').trim();
      const message = value ? '' : 'Preencha este campo.';
      setError(name, message);
      if (message) valid = false;
    });
    if (data.get('email') && !/^\S+@\S+\.\S+$/.test(String(data.get('email')))) {
      setError('email', 'Digite um e-mail válido.');
      valid = false;
    }
    const educationMessage = data.get('educacao-infantil') ? '' : 'Selecione uma opção.';
    setError('educacao-infantil', educationMessage);
    if (educationMessage) valid = false;
    const consentMessage = data.get('consentimento') ? '' : 'É necessário aceitar as comunicações.';
    setError('consentimento', consentMessage);
    if (consentMessage) valid = false;
    const status = document.querySelector('#form-status');
    if (!valid) {
      status.textContent = 'Revise os campos destacados para continuar.';
      form.querySelector('.invalid, [aria-invalid="true"]')?.focus();
      return;
    }
    status.textContent = 'Inscrição registrada nesta prévia. Redirecionando…';
    localStorage.setItem('liveEducacaoCadastro', JSON.stringify({ nome: data.get('nome'), email: data.get('email') }));
    window.setTimeout(() => { window.location.href = '../registro-e-documentacao-agradecimento/registro-e-documentacao-agradecimento.html'; }, 500);
  });
})();
