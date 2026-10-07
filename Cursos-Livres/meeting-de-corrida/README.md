# Meeting de Corrida de Rua

Protótipo estático para informar que novas datas serão divulgadas. Mantém marinho, verde neon e fotografia de corrida sem dados da edição anterior.

## Arquivos

- `index.html` e `styles.css`: preview independente, sem JavaScript ou integração.
- `assets/images/corrida-performance.webp`: imagem local otimizada da referência.
- `copy/briefing.md`: copy e CTA aprovados.
- `elementor/`: bloco HTML e CSS para montagem manual no Elementor.

Abra `index.html` ou sirva a pasta com um servidor HTTP local. Para montar no Elementor, crie um Container de largura total, cole `elementor/widget.html` em um widget HTML e aplique `elementor/widget.css` ao Container. Envie a imagem do evento e o logo Phorte de `assets/images/phorte-logo.svg` para a Biblioteca de Mídia e substitua os caminhos relativos pelos URLs antes da montagem.

Fonte visual: https://meetingdecorrida.com.br/. A referência não apresenta um arquivo de logo independente; o nome do evento foi composto como assinatura tipográfica. A foto foi redimensionada e exportada em WebP; detalhes da imagem original não foram usados como texto da página.
Marca institucional: `assets/images/phorte-logo.svg`, obtida do site oficial (https://phorte.com/wp-content/uploads/2026/10/Logo-Phorte.svg). A versão clara foi adaptada do SVG oficial para manter contraste no fundo escuro.

## Alinhamento ao design system Cursos Phorte

Os elementos compartilhados seguem o exemplo atual da Phorte: tipografia Poppins, CTA vermelho `#F23D43` com texto branco e cantos de 8 px. A identidade de cada evento permanece nas cores, imagens e assinatura visual. O preview carrega Poppins pelo Google Fonts; `elementor/widget.css` inclui a importação para a montagem no Elementor.
