# Mecânica na Musculação

Protótipo estático para revisão. Preserva a assinatura condensada do evento, a paleta preta e vermelha e a imagem dos professores.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/`: logo do evento e imagem otimizada dos professores.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. No Elementor, crie um Container de largura total, cole `elementor/widget.html` em um widget HTML e aplique `elementor/widget.css` ao Container. Envie as imagens do evento e o logo Phorte de `assets/images/phorte-logo.svg` para a Biblioteca de Mídia e substitua os caminhos relativos pelos URLs.

Fonte visual: https://mecanicadamusculacao.com.br/. A imagem de professores e o logo foram reaproveitados do snapshot; a fotografia foi redimensionada e exportada em WebP.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg). A versão clara foi adaptada do SVG oficial para manter contraste no fundo escuro.

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.
