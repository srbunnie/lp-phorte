# Consulta Pública de Diplomas — Faculdade Phorte

Página estática da Graduação Phorte para o estado provisório **Consulta em implementação**.

Também há uma versão funcional demonstrativa em `index-funcional.html`, simulando o sistema de cadastro e consulta pública.

## Escopo atual

- Não há consulta real, formulário, API, banco, autenticação ou dados de diploma.
- O CTA de secretaria reutiliza o contato institucional de Graduação já presente no projeto: `graduacao@faculdadephorte.edu.br`.
- A estrutura deixa o card central pronto para substituir o estado provisório por um módulo de consulta quando a integração com o Perseus for definida.

## Versão funcional demonstrativa

- `index-funcional.html` apresenta os três métodos previstos: CPF + data de nascimento, número de registro + RG e código de validação.
- O preenchimento é processado somente no navegador e exibe um resultado fictício.
- Para visualizar o estado “não encontrado”, preencha qualquer campo com `NAO-ENCONTRADO`.
- O botão “Visualizar documento” também permanece simulado até existir uma integração documental real.

## Como visualizar

Abra `index.html` diretamente no navegador ou sirva a raiz do repositório com um servidor estático. A página também está vinculada no índice central do projeto.

## Próxima fase

Substituir o estado atual por um módulo com estados `idle`, `loading`, `success`, `not-found` e `error`, após a definição da fonte de dados e dos critérios de consulta.
