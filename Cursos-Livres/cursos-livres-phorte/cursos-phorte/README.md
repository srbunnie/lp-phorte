# Cursos Livres Phorte

**Status:** protótipo para revisão.

Landing page responsiva dos cursos livres da Faculdade Phorte, migrada do protótipo local. O header fica em uma faixa própria, com divisor entre a marca e a navegação, seguindo a referência de Cursos Livres.

## Preview

- [Abrir landing page](./index.html)
- No GitHub Pages: `https://srbunnie.github.io/lp-phorte/Cursos-Livres/cursos-livres-phorte/cursos-phorte/`

## Estrutura

- `app/src/`: código React da home, header, catálogo e filtros.
- `app/images/` e `app/public/images/`: imagens-fonte locais usadas pela landing page e logo institucional.
- `app/scripts/publish-static.mjs`: publica os arquivos de build na raiz deste projeto para o GitHub Pages.
- `index.html`, `assets/` e `images/`: versão estática que o GitHub Pages serve.

## Executar localmente

```powershell
cd Cursos-Livres/cursos-phorte/app
npm ci
npm run dev
```

Para atualizar os arquivos estáticos servidos pelo GitHub Pages:

```powershell
npm run build:static
```

O filtro usa dados demonstrativos locais e não envia informações. As imagens e os links de cursos permanecem apontados para os endereços públicos da Faculdade Phorte.
