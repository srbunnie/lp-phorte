import { cleanDigits } from './masks';

/**
 * Validação algorítmica real de CPF (cálculo de 1º e 2º dígitos verificadores)
 */
export function isValidCPF(value: string): boolean {
  const cpf = cleanDigits(value);

  if (cpf.length !== 11) return false;

  // Rejeita sequências conhecidas de números repetidos (111.111.111-11, etc.)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Validação do 1º dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let firstRemainder = (sum * 10) % 11;
  if (firstRemainder === 10 || firstRemainder === 11) firstRemainder = 0;
  if (firstRemainder !== parseInt(cpf.charAt(9), 10)) return false;

  // Validação do 2º dígito verificador
  sum = 0;
  for (let j = 0; j < 10; j++) {
    sum += parseInt(cpf.charAt(j), 10) * (11 - j);
  }
  let secondRemainder = (sum * 10) % 11;
  if (secondRemainder === 10 || secondRemainder === 11) secondRemainder = 0;
  if (secondRemainder !== parseInt(cpf.charAt(10), 10)) return false;

  return true;
}

/**
 * Validação de E-mail
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validação de Telefone / Celular (mínimo 10 ou 11 dígitos)
 */
export function isValidPhone(phone: string): boolean {
  const digits = cleanDigits(phone);
  return digits.length === 10 || digits.length === 11;
}

/**
 * Validação de CEP (exatamente 8 dígitos)
 */
export function isValidCEP(cep: string): boolean {
  const digits = cleanDigits(cep);
  return digits.length === 8;
}

/**
 * Gera um protocolo único legível para o aluno
 */
export function generateProtocol(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(100000 + Math.random() * 900000);
  return `PK-${year}${month}-${random}`;
}
