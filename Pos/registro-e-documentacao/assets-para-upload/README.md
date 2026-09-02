# Assets para upload — Registro e Documentação

Esta pasta reúne os arquivos de imagem usados pelas duas páginas:

- `registro-e-documentacao-live/assets/` — logo Phorte, retrato do professor e imagens editoriais.
- `registro-e-documentacao-materiais/assets/videos/` — thumbnails das oito aulas.

A estrutura interna foi preservada para manter os caminhos relativos atuais. Para publicar, copie o conteúdo desta pasta para dentro da pasta que contém `registro-e-documentacao-live`, `registro-e-documentacao-materiais` e `registro-e-documentacao-inscricao`.

## Arquivos incluídos

### Marca e imagens editoriais

- `logograduacao-pos-mba.svg` — logo usado no header e footer.
- `vertical-03.webp` — professor usado no hero dos materiais e na seção de autoridade da inscrição.
- `quadrado-25.webp` — imagem da seção de contexto da inscrição.
- `quadrado-26.webp` — imagem editorial da página de materiais.
- `quadrado-27.webp` — imagem editorial da página de materiais.
- `quadrado-30.webp` — imagem da recomendação da página de materiais.

### Thumbnails das aulas

- `XyV21DrAKws.webp`
- `xq55HeGSACw.webp`
- `kf6Wq7iJ5u8.webp`
- `G_L1nB4mjMk.webp`
- `8b_ld0NZVyw.webp`
- `i3uFxXTsqEc.webp`
- `DIXLb0NZvno.webp`
- `q4nt1dSoeYo.webp`

Todas as imagens deste pacote foram convertidas para WebP e mantidas abaixo de 200 KB por arquivo.

## Dependências externas

- Poppins é carregada pelo Google Fonts dentro dos HTMLs.
- O formulário da inscrição carrega o script oficial do RD Station via CloudFront.

`materiais.html` e `inscricao.html` agora são páginas autocontidas: o CSS local está dentro de cada HTML e o JavaScript da inscrição também está inline. Os arquivos `styles.css`, `inscricao.css` e `inscricao.js` permanecem nas pastas originais apenas como fonte editável e não são necessários para o carregamento das páginas.
