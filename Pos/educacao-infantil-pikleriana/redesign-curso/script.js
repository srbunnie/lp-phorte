const interestForm = document.querySelector('#interest-form');
const formMessage = document.querySelector('#form-message');

if (interestForm && formMessage) {
  interestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!interestForm.reportValidity()) return;

    formMessage.textContent = 'Demonstração validada. Nenhum dado foi enviado ou armazenado.';
    interestForm.reset();
  });
}
