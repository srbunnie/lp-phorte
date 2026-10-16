# Referências comparadas — conteúdo, visual e arquitetura

Leitura em 16/10/2026. Foram abertas as cinco páginas públicas solicitadas e a home local da pós. Todas responderam HTTP 200 no navegador. O leitor web não conseguiu abrir algumas referências Vercel; isso foi contornado pela navegação real, sem usar páginas presumidas.

Capturas desktop/mobile: `output/playwright/home-graduacao-phorte/`, na raiz do repositório. JSONs de conteúdo e estilos: esta pasta. Trata-se de inspeção e comparação, não de certificação funcional ou de acessibilidade desses sites.

## 1. Papel de cada referência

| Referência | Características observadas | Aproveitar nas novas homes | Cuidados |
| --- | --- | --- | --- |
| [Graduação atual](https://faculdadephorte.edu.br/) | Campanha 2027 em vermelho/amarelo, sete abas, institucional com vídeo, infraestrutura, relatos, consultoria, parceiros, notícias, rodapé de serviços | Conteúdo real, destinos, acervo e identidade da campanha | Duas navegações no desktop; conteúdo legado oculto; listas em carregamento; endereços divergentes; claims a conferir |
| [Pós atual](https://posphorte.com.br/) | Cabeçalho branco, barra escura, hero escuro, pesquisa sobreposta, grade de destaques, catálogo em fundo escuro, docentes, relatos, institucional, notícias e rodapé escuro | Continuidade de família visual; Poppins; ritmo, clareza dos cards, menus e ícones; distribuição modular no Elementor | Conteúdo e taxonomias são de pós; não transferir cursos, números ou backend para graduação |
| [SIG Pós](https://sig-sites-nextjs-posphorte.vercel.app/) | Hero fotográfico, campo de texto em linha inteira e filtros abaixo, áreas, cards em faixa escura, unidades, diferenciais e blog | Pesquisa fácil de ler, metadados de curso bem agrupados, alternância de superfícies e CTAs visíveis | Quatro unidades, claims, áreas, valores e conteúdos não estão validados para graduação; repositório exato não confirmado |
| [Phorte Pós](https://phorte-pos.vercel.app/) | Hero vermelho, pesquisa, áreas, catálogo escuro, unidades, diferenciais, depoimentos, FAQ, blog e newsletter | Hierarquia, contrastes, componentes repetidos e progressão entre descoberta/prova/ação | Código contém campanha 2024, avatares de pravatar e conteúdos demonstrativos. Não copiar pessoas, ofertas, preços ou afirmações para graduação |
| [Graduação Next](https://graduacao-phorte.vercel.app/) | Campanha 2027, busca, modalidades, sete cursos, trajetória, sede, ingresso, vídeos, notícias, FAQ e serviços | Referência mais próxima para cursos, modalidades e jornada de ingresso; organização do conteúdo e serviços | Rotas, filtros e blog têm backend/roteamento Next próprio; não serão automaticamente funcionais no WordPress. Prévia tem decisões ainda não homologadas |
| [Pós local](http://127.0.0.1:4177/Pos/home-posphorte/) | HTML/CSS/JS sem framework; cabeçalho, home e rodapé separados; home com slot de busca Shortcode | Referência técnica para a entrega Elementor, geração de arquivos, isolamento e pacotes por peça | Ler as fontes atuais: o projeto foi reorganizado desde as primeiras etapas. A busca local é fixture, não consulta real |

## 2. Referência principal recomendada

Combinar três fontes com funções diferentes:

1. **Conteúdo:** home WordPress da graduação e seu cadastro público, com proveniência por item.
2. **Família visual e entrega:** home da pós finalizada, especialmente cabeçalho/rodapé, Poppins, cards e arquitetura de pacotes Elementor.
3. **Organização da jornada:** protótipo Next da graduação para a opção A; sequência do WordPress para a opção B.

As demais referências ajudam a resolver detalhes de busca, contraste e navegação. Não são fontes de confirmação acadêmica ou comercial.

## 3. Código consultado no GitHub

Consultado pelo conector GitHub selecionado pelo usuário. Repositórios e arquivos:

| Repositório / arquivo | O que foi confirmado |
| --- | --- |
| [Site-Phorte · Graduação/site/app/page.tsx](https://github.com/srbunnie/Site-Phorte/blob/main/Gradua%C3%A7%C3%A3o/site/app/page.tsx) | Ordem e composição da home Next: cabeçalho, hero/busca, modalidades, catálogo, faculdade, unidade, ingresso, depoimentos, blog, FAQ, rodapé |
| [Site-Phorte · Graduação/site/conteudo/pagina-inicial.ts](https://github.com/srbunnie/Site-Phorte/blob/main/Gradua%C3%A7%C3%A3o/site/conteudo/pagina-inicial.ts) | Conteúdo de slides, ingresso, modalidades, vídeos e pendências editoriais; diferencia grupo/Editora e Faculdade |
| [Site-Phorte · Graduação/conteudo/home.ts](https://github.com/srbunnie/Site-Phorte/blob/main/Gradua%C3%A7%C3%A3o/conteudo/home.ts) | Sete cursos, descrições, destinos, ingresso e FAQs; preços nulos. Base editorial anterior, não confirmação de oferta atual |
| [Site-Phorte · Graduação/site/app/design-system.css](https://github.com/srbunnie/Site-Phorte/blob/main/Gradua%C3%A7%C3%A3o/site/app/design-system.css) | Poppins local, tokens atuais de ação com contraste e distinção das cores decorativas da marca |
| [Site-Phorte · Graduação/site/package.json](https://github.com/srbunnie/Site-Phorte/blob/main/Gradua%C3%A7%C3%A3o/site/package.json) | Stack Next/React, HeroUI, Tailwind e Motion: referência visual/componentização, não runtime para os widgets HTML |
| [PhortePosnewsite · app/page.tsx](https://github.com/srbunnie/PhortePosnewsite/blob/main/app/page.tsx) | Composição do protótipo da pós por organismos: Hero, áreas, cursos, unidades, diferenciais, depoimentos, FAQ, blog, newsletter |
| [PhortePosnewsite · Hero.tsx](https://github.com/srbunnie/PhortePosnewsite/blob/main/app/components/organisms/Hero.tsx) | Busca redireciona para `/cursos` e o hero contém conteúdo demonstrativo/antigo; não portar a lógica literalmente |

SHAs dos blobs lidos estão em [fontes-github-2026-10-16.json](fontes-github-2026-10-16.json). Leitura da branch padrão não comprova qual commit está implantado no Vercel.

Foi consultado também o `package.json` de `srbunnie/Pos-Phorte-Design-System`; isso confirmou o pacote de design system, **não o vínculo com a implantação SIG**. Busca por nome/domínio não confirmou esse vínculo. Não apresentar o pacote como repositório do SIG.

## 4. Projetos locais inspecionados

### Home da pós neste repositório

Estado atual consultado diretamente nos arquivos, sem regenerar ou modificar a pós:

~~~text
Pos/home-posphorte/
  conteudo/home.json
  styles/base.css
  styles/cabecalho.css
  styles/home.css
  styles/rodape.css
  js/cabecalho.js
  js/home.js
  scripts/gerar.mjs
  scripts/verificar.mjs
  scripts/empacotar.mjs
  scripts/tamanhos-wp.mjs
  elementor/cabecalho/
  elementor/home/
  elementor/rodape/
  angie-busca-posphorte/
~~~

`index.html` e pacotes são gerados. A home Elementor se divide em HTML do hero, Shortcode da busca e HTML das seções. Cabeçalho e rodapé têm widgets e templates próprios. A instalação contempla Largura Total com Theme Builder ou Canvas com as peças dentro da página.

Lições a transportar:

- CSS e JS próprios por peça, para não depender de alterações globais no tema.
- URLs absolutas de navegação para cabeçalho/rodapé funcionarem em outras páginas.
- Um único ponto de geração para prévia e pacotes.
- Fonte carregada explicitamente ou herdada de modo documentado; fallback de métricas para reduzir deslocamentos.
- Assets publicados podem ter sufixos e versões de tamanho diferentes; usar manifest e mapeamento real do WordPress.
- Não escrever a tag literal de shortcode no CSS/JS/comentários do widget HTML: o WordPress pode expandi-la no lugar errado. Shortcode funcional pertence ao widget Shortcode.
- Modelos sem padding/margens/gap extras; conferir largura e `flex-wrap` no Elementor.
- Na prévia local, comportamento de fixture deve estar identificado e não ser confundido com integração ativa.

Fontes para detalhes: [README da pós](../../../Pos/home-posphorte/README.md), [guia Elementor](../../../Pos/home-posphorte/elementor/INSTALACAO.md), [componente Angie](../../../Pos/home-posphorte/angie-busca-posphorte/README.md).

### Site Next da graduação no projeto vizinho

Pasta local: `C:/Users/Marcelo.vignola/Desktop/Git Projects/Site Phorte/Graduação/site`.

Foram lidos `README.md`, `app/page.tsx`, `conteudo/pagina-inicial.ts`, `../conteudo/home.ts`, `app/_site/BuscaDeCursos.tsx`, `app/globals.css` e `app/design-system.css`. Commit local observado no repositório pai: `4104e58`. Sem modificações nesses três arquivos principais consultados no `git status` restrito.

O README identifica `graduacao-phorte.vercel.app` como prévia, sem aceite visual/editorial/jurídico. O catálogo da busca usa `/graduacao/` com parâmetros controlados pela aplicação Next. As notícias vêm do WordPress com renovação periódica. Nenhum desses serviços será obtido apenas copiando JSX para Elementor.

O projeto vizinho `Phorte` também foi lido pontualmente; sua configuração Git tem remotos históricos e o código se parece com o protótipo da pós. A semelhança não foi usada para afirmar correspondência de implantação.

## 5. Direção visual comum às duas opções

Recomendação, sujeita à revisão dos protótipos:

| Elemento | Decisão proposta |
| --- | --- |
| Fonte | Poppins real, sem compressão por tracking negativo; pesos 400/500/600/700 e 800 se necessário para a campanha |
| Texto e base | `#1A1A1A`, `#595959`, `#FAFAFA`, branco e `#F4F6F9` |
| Ação principal | `#D42B2B`, hover `#A81E1E`, seguindo a pós local e o CSS atual da graduação Next |
| Ação secundária verde | Se necessária, `#0B8434`, hover `#0D6B2E`; não copiar o verde decorativo como fundo de texto pequeno |
| Campanha 2027 | Preservar vermelho/amarelo/contorno da arte aprovada, isolados no hero |
| Navegação e rodapé | Mesma família da pós, conteúdos e serviços da graduação |
| Cards | Imagem consistente, nome legível, modalidade cadastrada, um CTA claro; sem preço/duração não confirmados |
| Movimento | Controles visíveis, pausa, teclado/toque e respeito a movimento reduzido |
| Celular | Conteúdo empilhado; cursos fáceis de encontrar; nenhum serviço acessível apenas por hover |

O CSS de referência atual diferencia `--brand-red: #E64242` e `--brand-green: #13B241` das cores de ação. As instruções antigas que sugerem essas duas cores para todos os botões estão desatualizadas em relação ao arquivo inspecionado. Adotar os tokens atuais, sem alterar o design system neste trabalho.

## 6. O que a inspeção não comprovou

- Não foi verificada toda rota externa, formulário, vídeo ou fluxo de matrícula.
- Não foi homologado nenhum snippet da graduação no WordPress.
- Não foi aferido desempenho de produção ou realizado teste de conversão.
- Não houve autorização ou ação de publicação, troca de home ou ajuste de condições do Theme Builder.
- Conteúdo oculto, placeholder e dados de outra marca/curso não foram elevados a informação institucional válida.
