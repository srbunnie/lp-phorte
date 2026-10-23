# Consulta Pública de Diplomas — Faculdade Phorte

Página estática da Graduação Phorte para apresentar a consulta pública de diplomas. O índice principal aponta para a página interativa em `index-funcional.html`.

## Escopo atual

- Não há consulta real, API, banco, autenticação ou dados de diploma armazenados nesta página.
- A consulta acadêmica não está conectada a uma fonte de dados; o formulário não envia nem armazena os dados digitados.
- A validação do diploma digital é uma ação separada que abre diretamente a página de validação externa.
- O CTA de secretaria reutiliza o contato institucional de Graduação já presente no projeto: `graduacao@faculdadephorte.edu.br`.

## Página interativa

- `index-funcional.html` apresenta três opções: CPF + data de nascimento, número de registro + RG e validação de diploma digital.
- O envio do formulário informa que a consulta não está disponível nesta página e encaminha a pessoa à secretaria; não há respostas de sucesso ou erro simuladas.
- A terceira opção, **Validar diploma digital**, abre a página de validação externa em nova aba. Ela valida o diploma digital e não consulta os dados públicos do registro acadêmico.
- A visualização do documento digital depende de uma integração futura.

## Como visualizar

Abra `index-funcional.html` diretamente no navegador ou sirva a raiz do repositório com um servidor estático. A versão principal também está vinculada no índice central do projeto.

## Próxima fase

Integrar a consulta de dados do registro após definir a fonte de dados e os critérios de acesso. A validação do diploma digital permanece no Perseus, sujeita às definições de integração correspondentes.
