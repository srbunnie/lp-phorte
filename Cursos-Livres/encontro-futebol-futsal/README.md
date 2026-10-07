# Encontro Nacional de Futebol e Futsal

Protótipo estático para revisão. A marca azul e branca, o cabeçalho escuro e o retrato monocromático preservam a linguagem do evento com contraste reforçado.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/`: marca oficial convertida para WebP e retrato otimizado da referência.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. No Elementor, crie um Container de largura total, cole `elementor/widget.html` em um widget HTML e aplique `elementor/widget.css` ao Container. Envie a marca do evento, o retrato e o logo Phorte de `assets/images/phorte-logo.svg` para a Biblioteca de Mídia e substitua os caminhos relativos pelos URLs.

Fonte visual: https://futebolefutsal.com.br/. O retrato foi convertido para escala de cinza e WebP para combinar com a direção monocromática. A página existente da formação USCS não é alterada.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg).

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.
