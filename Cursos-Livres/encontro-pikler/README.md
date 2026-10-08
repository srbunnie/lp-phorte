# Encontro Internacional Pikler

Protótipo estático para revisão. Mantém o tom editorial em creme, coral e amarelo, com colagem documental da referência.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/myrtha-chokler.webp`: retrato de Myrtha Chokler, redimensionado e otimizado em WebP; evita reproduzir chamadas da edição anterior presentes na colagem original.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. Para inserir a página no Elementor, cole o conteúdo completo de `elementor/elementor-ready.html` em um widget HTML. Os URLs dos assets já estão configurados para o domínio do evento. Envie os arquivos de `assets/images/` à Biblioteca de Mídia mantendo os nomes.

Fonte visual: https://encontropikler.com.br/. O retrato foi redimensionado e exportado em WebP; nenhuma data ou programação da edição anterior foi mantida.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg).

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.

## Elementor: bloco pronto para colar

`elementor/elementor-ready.html` reúne HTML e CSS isolados em um arquivo. `widget.html` e `widget.css` oferecem a opção separada. As duas versões usam os URLs de uploads do respectivo site. Os previews locais usam os assets do projeto.

## Revisão visual — 8 de outubro de 2026

Hierarquia com “Em breve” em tamanho de apoio, entrelinha mais aberta e peso 700 para o título. CTA Poppins 600, altura mínima de 56 px e largura total no celular. Layout passa para uma coluna até 960 px. Imagens e acabamento foram ajustados à identidade do evento; Pikler usa Georgia no título para preservar o caráter editorial. Preview, CSS isolado e bloco único Elementor foram sincronizados.

## URLs dos assets no WordPress

Base configurada: `https://encontropikler.com.br/wp-content/uploads/2026/10/`. Envie os assets com os mesmos nomes de arquivo. Os uploads estão sendo realizados pelo responsável pelos sites; os URLs passam a carregar conforme cada arquivo é enviado.
