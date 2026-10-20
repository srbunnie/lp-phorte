# Pacotes Elementor — Pós Phorte

A home foi separada em **três peças publicadas de forma independente**:

| Peça | Pasta | Conteúdo |
| --- | --- | --- |
| Cabeçalho | [cabecalho/](cabecalho/) | Barra utilitária, marca, menu e submenus. Um widget HTML com CSS e JavaScript próprios. |
| Home | [home/](home/) | Hero, busca e seções. Três widgets em sequência: HTML, Shortcode e HTML. |
| Rodapé | [rodape/](rodape/) | Rodapé completo. Um widget HTML com CSS próprio, sem JavaScript. |

Cada pasta tem os fragmentos para colar manualmente e um `template-elementor.json` para importar em **Elementor > Modelos > Importar modelos**. Os ZIPs `pacote-*.zip` reúnem a pasta da peça, este guia e o mapeamento de assets (as imagens já estão no site).

Todos os arquivos são **gerados** por `scripts/gerar.mjs`. Não editar diretamente.

## 1. Imagens e fontes

As 43 imagens estão publicadas pela biblioteca de mídia do WordPress (conferidas em 15/10/2026, todas com resposta 200 e o mesmo tamanho dos arquivos locais):

~~~text
https://posphorte.com.br/wp-content/uploads/2026/10/
~~~

Os widgets já apontam para essa pasta. A lista de imagens de cada peça está em `pecas` de [assets-publicacao.json](assets-publicacao.json). Não renomear nem substituir esses arquivos na biblioteca; se o WordPress gerar outro nome (por exemplo, `-1.webp`), as URLs precisam ser ajustadas.

As fontes `.woff2` **não foram publicadas** (a biblioteca de mídia bloqueia esse tipo por padrão). Os widgets omitem `@font-face` e usam a Poppins que o site já carrega pelo Google Fonts (pesos 200 a 900). Se essa Poppins deixar de ser carregada pelo tema ou pelo kit do Elementor, os textos caem para Arial.

Para usar as fontes próprias, publicar `assets/fonts/` por SFTP ou gerenciador de arquivos e regenerar informando a pasta:

~~~powershell
node Pos/home-posphorte/scripts/gerar.mjs --fontes=https://posphorte.com.br/wp-content/uploads/home-posphorte/fonts/
node Pos/home-posphorte/scripts/verificar.mjs
node Pos/home-posphorte/scripts/empacotar.mjs
~~~

Se as imagens forem para outra pasta, informar a URL como primeiro argumento de `gerar.mjs`.

**Tamanhos responsivos.** Os destaques, as miniaturas do slide 2, a imagem do hero e a arte do Dia dos Professores usam `srcset` com as versões menores que o WordPress gerou no upload (por exemplo, `destaque-1-768x943.webp`). A lista vem de `assets/tamanhos-wp.json`, lido da API de mídia por `node Pos/home-posphorte/scripts/tamanhos-wp.mjs`; rodar de novo se as imagens forem reenviadas. Não apagar essas versões na biblioteca.

Todas as imagens dos widgets têm a classe `no-lazyload`. O lazy load do plugin Smush, ativo no site, troca `src` por `data-src` e descartava o `srcset` e o `sizes` (conferido na home publicada em 16/10/2026). Com a classe, o Smush ignora essas imagens e vale o `loading="lazy"` nativo, que já está nelas.

**Fallback da Poppins.** Enquanto a Poppins do Google Fonts carrega, o texto usa `PhortePoppinsFallback`: Arial do aparelho ajustada (`size-adjust` e métricas) para ocupar o mesmo espaço. Isso evita que hero e busca mudem de posição quando a fonte chega (CLS). Não usa arquivo de fonte.

## 2. Cabeçalho

Com Elementor Pro (Theme Builder):

1. Importar `cabecalho/template-elementor.json`. Ele entra na biblioteca como modelo de **seção**.
2. Em **Modelos > Theme Builder > Cabeçalho**, criar o cabeçalho, inserir o modelo importado pela biblioteca (ícone de pasta) e publicar com a condição desejada (por exemplo, todo o site).

Sem o Theme Builder: inserir o modelo de seção, ou um widget HTML com o conteúdo de `cabecalho/widget-html.html`, no topo de cada página com modelo **Elementor Canvas**.

O modelo usa um contêiner de largura total, sem padding e sem espaçamento. Ao montar manualmente, reproduzir essas configurações.

Comportamento fora da home:

- Marca e links apontam para URLs absolutas; o cabeçalho não depende de âncoras da home.
- "Pular para o conteúdo" vai para `#hp-main` na home e, nas demais páginas, para o primeiro `main`, `[role="main"]` ou `#content` do tema.
- O cabeçalho fica em camada própria (`z-index: 50`) para os submenus abrirem por cima do conteúdo.

## 3. Rodapé

Mesmo procedimento do cabeçalho com `rodape/template-elementor.json`, em **Theme Builder > Rodapé**, ou `rodape/widget-html.html` em um widget HTML. Os atalhos "Conheça as áreas", "Coordenadores", "Depoimentos" e "Notícias" apontam para `https://posphorte.com.br/#…` e só funcionam depois que a nova home estiver publicada nesse endereço.

## 4. Home

Importar `home/template-elementor.json` e aplicá-lo à página da home, ou montar manualmente **um contêiner** com estes três widgets, nesta ordem:

| Ordem | Widget | Conteúdo |
| --- | --- | --- |
| 1 | HTML | `home/1-hero-widget-html.html` (inclui CSS e JavaScript de toda a home) |
| 2 | Shortcode | `home/2-busca-widget-shortcode.txt` |
| 3 | HTML | `home/3-secoes-widget-html.html` |

Configuração do contêiner: largura total, padding 0, margem 0, **espaçamento entre elementos 0** e tag HTML `main`. O template já traz esses valores e o ID `hp-main`.

Região principal: o ideal é o contêiner ter **Layout > Tag HTML = main** e **Avançado > ID CSS = hp-main**. Se não tiver, o script da home marca esse contêiner com `role="main"`, `id="hp-main"` e `tabindex="-1"`, que é o destino do atalho "Pular para o conteúdo" do cabeçalho.

Quebra de linha dos contêineres: com **Layout > Quebra = Quebrar** (flex-wrap), o Elementor media a altura dos widgets numa largura menor e deixava faixas vazias no celular (29 px abaixo do cabeçalho e 110 px abaixo do rodapé). Os widgets agora fixam a própria largura e não dependem disso. Mesmo assim, **Sem quebra** é a configuração indicada para os contêineres de cabeçalho, home e rodapé.

O widget Shortcode recebe exatamente:

~~~html
<div id="hp-busca" class="hp-search-slot">[phorte_pos_search]</div>
~~~

O invólucro fornece a âncora `#hp-busca` dos botões do hero, a largura de 1200 px e a sobreposição de 55 px sobre o hero (38 px no celular). Se o widget Shortcode tiver só `[phorte_pos_search]`, o mesmo resultado vale para o elemento do Elementor **imediatamente depois** do widget do hero (widget Shortcode ou contêiner com ele), que recebe a âncora pelo script da home.

O shortcode é processado pelo widget Shortcode; **não colar o shortcode dentro de um widget HTML**. O WordPress expande shortcodes em todo o conteúdo da página, inclusive dentro de `<style>`, `<script>` e comentários dos widgets HTML: um `[phorte_pos_search]` escrito ali despeja o componente no meio do CSS/JS, deixando a busca sem estilo e o hero e os carrosséis parados. O gerador interrompe a geração se encontrar esse texto fora do widget Shortcode.

Depois de colar uma nova versão, limpar o cache do Elementor (**Elementor > Ferramentas > Regenerar arquivos e dados**) e o cache de página do site.

Pré-requisito: o snippet Angie [Busca de Pós Phorte](../angie-busca-posphorte/README.md) instalado e ativo no mesmo ambiente, para que `[phorte_pos_search]` e a rota `/wp-json/phorte-pos-search/v1/` existam. O shortcode antigo `[category_dropdown]` não é usado nem alterado.

Página da home: modelo **Elementor Largura Total** (`elementor_header_footer`), para exibir cabeçalho e rodapé do Theme Builder. Se cabeçalho e rodapé forem inseridos na própria página, usar **Elementor Canvas** e colocar o cabeçalho antes e o rodapé depois do contêiner da home.

Os widgets 1 e 3 compartilham CSS e JavaScript do widget 1; manter os três na mesma página e não duplicar a home.

## 5. Conferir antes de publicar

- Imagens e Poppins carregando em desktop e celular.
- Cabeçalho e rodapé em uma página interna e na home; submenus por cima do hero e do conteúdo.
- Menu recolhível abaixo de 1200 px e Escape.
- Busca: modalidades, áreas, cursos, texto, resultados e permalink, em ambiente com o snippet carregado.
- Botões "Encontrar minha pós" do hero levando à busca.
- Três slides do hero, carrosséis, relatos e vídeos.
- Ausência de cabeçalho, rodapé ou busca duplicados por tema ou plugins.
- Importação de modelos com `<script>` exige usuário com permissão `unfiltered_html`; sem ela, o WordPress pode remover o JavaScript.

Se scripts forem removidos, permanecem conteúdo, links, primeiro slide do hero e rolagem horizontal dos cursos; troca de slides, menu recolhível e player sob demanda exigem JavaScript.

SEO, cookies e rastreamento são configurados no WordPress. Nenhuma publicação, importação ou configuração de servidor foi realizada.
