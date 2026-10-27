# Cursos Livres Phorte

Landing page responsiva de cursos livres da Faculdade Phorte, construída com HTML, CSS e JavaScript nativos. Não usa React, Vite ou etapa de compilação.

## Preview

- [Abrir a landing page](./index.html)
- GitHub Pages: https://srbunnie.github.io/lp-phorte/Cursos-Livres/cursos-livres-phorte/cursos-phorte/

## Arquivos

- index.html: estrutura e conteúdo da página.
- css/: estilos do header, landing page, catálogo e breakpoints responsivos.
- js/: catálogo de demonstração, filtros, paginação e interações.
- images/: logo e imagens locais do hero e das áreas de cursos.

O catálogo local tem 16 cursos demonstrativos. Cada página mostra até oito cursos e um card extra “Ver mais”. Busca, formato, área, modalidade, duração, preço e ordenação funcionam no navegador. A integração com WordPress/JetEngine poderá substituir os dados de js/courses.js depois.

## Abrir localmente

Como a página usa módulos JavaScript nativos, sirva esta pasta por HTTP:

    python -m http.server 5175 --bind 127.0.0.1

Depois abra http://127.0.0.1:5175/.