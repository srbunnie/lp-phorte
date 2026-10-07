# Encontro Internacional Pikler

Protótipo estático para revisão. Mantém o tom editorial em creme, coral e amarelo, com colagem documental da referência.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/myrtha-chokler.webp`: retrato de Myrtha Chokler, redimensionado e otimizado em WebP; evita reproduzir chamadas da edição anterior presentes na colagem original.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. No Elementor, crie um Container de largura total, cole `elementor/widget.html` em um widget HTML e aplique `elementor/widget.css` ao Container. Envie o retrato e o logo Phorte de `assets/images/phorte-logo.svg` para a Biblioteca de Mídia e substitua os caminhos relativos pelos URLs.

Fonte visual: https://encontropikler.com.br/. O retrato foi redimensionado e exportado em WebP; nenhuma data ou programação da edição anterior foi mantida.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg).

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.
