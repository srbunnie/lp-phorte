const form = document.querySelector('#registration-form');
const message = document.querySelector('.form-message');
const whatsapp = document.querySelector('#whatsapp');

whatsapp.addEventListener('input', (event) => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
  event.target.value = digits.length > 10
    ? digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    : digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    message.textContent = 'Confira os campos e tente novamente.';
    message.classList.add('error');
    form.reportValidity();
    return;
  }
  message.classList.remove('error');
  message.textContent = 'Inscrição recebida! Em breve enviaremos a confirmação.';
  form.reset();
});
