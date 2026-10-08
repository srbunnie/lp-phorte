# Revisão visual das LPs de eventos

Revisão em 8 de outubro de 2026. Os arquivos foram atualizados no checkout local em `Cursos-Livres/`.

## Alterações

- Hierarquia: “Em breve” em tamanho de apoio; “divulgaremos novas datas” recebe o destaque principal. Entrelinha 1,08 e peso 700 nas páginas esportivas.
- Tipografia: Poppins para texto e CTA. Pikler recupera o título em Georgia, com caráter editorial.
- Composição: conteúdo e imagens em duas colunas no desktop; uma coluna até 960 px, evitando compressão no tablet.
- CTA: vermelho Phorte, peso 600, altura mínima de 56 px, largura total até 540 px e foco visível.
- Corrida: marinho, verde e fotografia com moldura deslocada.
- Futebol/Futsal: preto, branco e azul; retrato com apoio retangular azul e logo preservado.
- Mecânica: preto e vermelho; logo preservado e imagem dos profissionais com moldura simples.
- Pikler: creme, rosa e amarelo; retrato com recorte em arco.
- Phorte: escuro e ciano; composição de palestrantes com acento vermelho.

## Entrega Elementor

Cada projeto mantém `elementor/elementor-ready.html`, com CSS isolado e HTML em um arquivo. `widget.html` e `widget.css` foram sincronizados. O novo `elementor/preview.html` permite conferir o mesmo bloco usando os assets locais.

Para WordPress, os cinco pacotes usam os URLs de `https://DOMINIO-DO-EVENTO/wp-content/uploads/2026/10/`, mantendo os nomes dos assets locais. Os arquivos passam a carregar conforme são enviados à Biblioteca de Mídia. A revisão local não confirma a aparência dentro do tema de cada site; essa conferência deve ocorrer após inserir o bloco no Elementor.

## Verificação

- Cinco previews abertos em 320, 390, 768, 1024 e 1440 px: 25 verificações, sem rolagem horizontal, com imagens carregadas e CTA para `https://phorte.com/`.
- Cinco previews dos pacotes Elementor conferidos em 390 px: assets carregados, título correto, CTA com 56 px e sem rolagem horizontal.
- Conferência visual em desktop e celular, mantendo as cores e os elementos de marca de cada evento.
- Copy principal e destino do briefing mantidos; sem datas, valores ou inscrições novas.
- Capturas usadas somente para inspeção, sem salvar arquivos de imagem.

O script `scripts/refine-event-lps.cjs` permite regenerar os estilos e os pacotes desta revisão. Ele contém os estilos de origem; ajustes futuros nesses estilos devem ser feitos nele para não serem substituídos por uma nova execução.
