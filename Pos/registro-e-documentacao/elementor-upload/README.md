# Pacote para Elementor

## Conteúdo

- `principal.html` — estrutura da landing page principal.
- `obrigado.html` — estrutura da página de agradecimento.
- `styles-principal.css` — estilos da página principal.
- `styles-obrigado.css` — estilos da página de agradecimento.
- `script.js` — validação e comportamento do formulário da página principal.
- `assets/` — todas as imagens necessárias para as duas páginas.
- `principal-html-1-texto-formulario.html` — primeiro bloco da página principal, incluindo o texto e a imagem de apoio do formulário.
- `principal-formulario.html` — bloco independente somente com o formulário.
- `principal-html-2.html` — segundo bloco da página principal, após o formulário.

## Uso no Elementor

1. Criar uma página para a landing page principal e outra para a página de agradecimento.
2. Inserir um widget **HTML** em cada página.
3. Copiar o conteúdo de `principal.html` ou `obrigado.html` para o widget correspondente.
4. Inserir o CSS no CSS personalizado da página ou no CSS global do Elementor.
5. Para a página principal, usar os três blocos na ordem: HTML 1, formulário e HTML 2.
6. Inserir o conteúdo de `principal-formulario.html` dentro do container/coluna do formulário.
7. As imagens já estão configuradas com as URLs públicas do WordPress fornecidas no briefing.
8. Conectar o formulário ao formulário/CRM utilizado no projeto.
9. Configurar o redirecionamento do formulário para a página de agradecimento.

## Observação

Os HTMLs deste pacote preservam a estrutura visual aprovada e já apontam para as URLs públicas da mídia no WordPress. A pasta `assets/` continua incluída como backup local.

## Ordem de inserção da página principal

1. `01-header.html` — header, hero e faixa de informações.
2. `02.1-texto-formulario.html` — imagem e texto de apoio do formulário.
3. `02.2-formulario.html` — título, campos, consentimento e botão.
4. `03-principal-conteudo-final.html` — seções sobre a live, professor, público, certificado e rodapé.
