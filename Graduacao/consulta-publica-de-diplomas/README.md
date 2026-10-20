# Consulta Pública de Diplomas — Faculdade Phorte

Página estática da Graduação Phorte para apresentar a consulta pública de diplomas. O índice principal aponta para a versão funcional demonstrativa em `index-funcional.html`.

## Escopo atual

- Não há consulta real, API, banco, autenticação ou dados de diploma armazenados nesta página.
- As consultas por CPF e por registro acadêmico são simuladas localmente.
- O método **Código de validação** encaminha diretamente para o serviço de diploma digital do Perseus.
- O CTA de secretaria reutiliza o contato institucional de Graduação já presente no projeto: `graduacao@faculdadephorte.edu.br`.

## Versão funcional demonstrativa

- `index-funcional.html` apresenta CPF + data de nascimento, número de registro + RG e um link para o serviço de validação de código do Perseus.
- Os métodos de CPF e registro são processados somente no navegador e exibem um resultado fictício.
- Para visualizar o estado “não encontrado”, preencha qualquer campo com `NAO-ENCONTRADO`.
- O botão “Visualizar documento” também permanece simulado até existir uma integração documental real.

## Como visualizar

Abra `index-funcional.html` diretamente no navegador ou sirva a raiz do repositório com um servidor estático. A versão principal também está vinculada no índice central do projeto.

## Próxima fase

Integrar as consultas por CPF e registro após definir a fonte de dados, critérios de acesso e integração com o Perseus.
