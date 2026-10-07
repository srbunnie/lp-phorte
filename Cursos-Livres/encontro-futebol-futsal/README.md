# Encontro Nacional de Futebol e Futsal

Protótipo estático para revisão. A marca azul e branca, o cabeçalho escuro e o retrato monocromático preservam a linguagem do evento com contraste reforçado.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/`: marca oficial convertida para WebP e retrato otimizado da referência.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. Para inserir a página no Elementor, use `elementor/elementor-ready.html`: envie as imagens de `assets/images/` à Biblioteca de Mídia, substitua no arquivo cada marcador `COLE_AQUI_URL_DA_MIDIA__...` pelo URL correspondente e cole o conteúdo completo em um widget HTML. `elementor/widget.html` e `elementor/widget.css` também ficam disponíveis como opção separada.

Fonte visual: https://futebolefutsal.com.br/. O retrato foi convertido para escala de cinza e WebP para combinar com a direção monocromática. A página existente da formação USCS não é alterada.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg).

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.

## Elementor: bloco pronto para colar

`elementor/elementor-ready.html` contém o HTML e o CSS responsivo isolados em um único arquivo. Envie as imagens da pasta `assets/images/` à Biblioteca de Mídia e substitua, no arquivo, cada marcador `COLE_AQUI_URL_DA_MIDIA__...` pelo URL do arquivo correspondente. Depois cole o conteúdo completo em um widget **HTML** do Elementor. O arquivo `widget.html` + `widget.css` continua disponível como opção separada.