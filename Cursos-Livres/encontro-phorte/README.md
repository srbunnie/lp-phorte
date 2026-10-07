# Encontro Internacional Phorte

Protótipo estático para revisão. Preserva a identidade carvão, ciano e vermelho e a composição monocromática de palestrantes.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/phorte-palestrantes.webp`: composição otimizada da referência.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. No Elementor, crie um Container de largura total, cole `elementor/widget.html` em um widget HTML e aplique `elementor/widget.css` ao Container. Envie a composição de palestrantes e o logo Phorte de `assets/images/phorte-logo.svg` para a Biblioteca de Mídia e substitua os caminhos relativos pelos URLs.

Fonte visual: https://encontrophorte.com.br/. O retrato coletivo foi redimensionado e exportado em WebP. A referência exibe uma composição antiga; nomes individuais, datas, lotes e preços foram omitidos.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg). A versão clara foi adaptada do SVG oficial para manter contraste no fundo escuro.

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.
