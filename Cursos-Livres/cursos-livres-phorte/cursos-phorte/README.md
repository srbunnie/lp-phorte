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

Estrutura da página: hero com busca → Escolha o formato ideal → catálogo com filtros → Explore por área (áreas e temas de Educação Física) → Por que a Phorte → CTA de atendimento.

O catálogo em js/courses.js tem os 44 cursos de https://faculdadephorte.edu.br/cursos-phorte/ (extraídos em 27/10/2026 da Store API do WooCommerce, do REST da taxonomia product_cursoslivres_categorias e da carga horária exibida na listagem). Cada curso tem areas (categorias de primeiro nível) e topics (subcategorias). Os filtros são área, tema, formato, duração (faixas), preço e ordenação; as contagens de cada opção acompanham os filtros ativos e os temas além dos seis primeiros ficam recolhidos. O catálogo mostra até cinco cursos e um card "Ver mais" que abre https://faculdadephorte.edu.br/cursos-phorte/ já filtrada pela área ou pelo tema escolhido (slugs em js/course-areas.js). A modalidade só aparece quando houver mais de uma. A integração com WordPress/JetEngine poderá substituir js/courses.js depois.

## Abrir localmente

Como a página usa módulos JavaScript nativos, sirva esta pasta por HTTP:

    python -m http.server 5175 --bind 127.0.0.1

Depois abra http://127.0.0.1:5175/.