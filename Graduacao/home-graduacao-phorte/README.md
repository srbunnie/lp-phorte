# Home Graduação Phorte — três prévias HTML para Elementor

Redesign da home de https://faculdadephorte.edu.br/ em HTML, CSS e JavaScript, empacotado para widgets HTML do Elementor. Trabalho de **16/10/2026**.

**Estado:** três prévias locais com conteúdo compartilhado e sete pacotes Elementor. A direção atual é a **estrutura editorial** (B e C). Nada foi importado ou publicado no WordPress; o formulário é visual e não envia dados.

## Abrir as versões

O servidor serve a raiz do repositório: `npx --yes http-server . -p 4177 -a 127.0.0.1 -c-1` (conferir antes se a porta já está em uso).

- [Comparação](http://127.0.0.1:4177/Graduacao/home-graduacao-phorte/)
- [A — Jornada reorganizada](http://127.0.0.1:4177/Graduacao/home-graduacao-phorte/previa-a/)
- [B — Editorial com campanha](http://127.0.0.1:4177/Graduacao/home-graduacao-phorte/previa-b/)
- [C — Editorial](http://127.0.0.1:4177/Graduacao/home-graduacao-phorte/previa-c/)

| | Topo | Estrutura | Cabeçalho |
| --- | --- | --- | --- |
| A | Carrossel de campanha Graduação 2027 | Busca e grade de cursos, modalidades, ingresso, relatos, instituição, unidades, parceiros, contato, dúvidas, notícias | `cabecalho` (barra utilitária) |
| B | Carrossel de campanha Graduação 2027 | Editorial (abaixo) | `cabecalho-c` (cápsula) |
| C | Abertura tipográfica com os sete cursos em pílulas | Editorial, com banner 3:1 após o catálogo | `cabecalho-c` (cápsula) |

Estrutura editorial (B e C): caminhos (primeira graduação / nova trajetória) → catálogo com busca e cards com grau, área e semestres → *[C: carrossel de banners 3:1]* → formatos de estudo em tons de vermelho → instituição com linha do tempo → duas unidades → relatos → contato compacto → parceiros → blog → dúvidas. Rodapé comum com selo QR do e-MEC.

### Decisões de interação

- **Faixas infinitas** (cursos, relatos, parceiros): repetem ao rolar para o lado, reciclando os nós originais (sem clones). Sem barra de progresso nem botão de pausa. Só parceiros andam sozinhos (marquee), parando no hover/foco e com movimento reduzido. No celular, catálogo, formatos e blog viram faixas com deslize.
- **Relatos**: texto visível em duas linhas; o clique expande. “Mostrar mais/menos” existe só para leitor de tela.
- **Unidades**: Rui Barbosa e Martiniano, de ponta a ponta; ao abrir, a foto divide o card com endereço, contato e “Como chegar”. Horário só aparece se `hours` for preenchido em `conteudo/home.json`.
- **Banner 3:1 (C)**: setas, pontos, toque e teclado; volta do último ao primeiro; sem autoplay. No celular o texto fica acima da imagem.
- **Campanha 2027 (A/B)**: o slide do Dia do Professor é descartado pelo gerador (campanha encerrada); com um slide, o banner oculta os controles.
- **Paleta**: vermelho e amarelo Phorte, preto e branco. Imagens novas (caminhos e banners) em colagem P&B.

## Fontes de edição

~~~text
conteudo/home.json          Copy, links, cursos (grau/área/duração com fonte), unidades, banners, blog
conteudo/variantes.json     Ordem das seções, modo do catálogo e topo de cada versão
styles/base.css             Tokens e base com escopo .hg-scope
styles/home.css             Componentes comuns (cursos, faixas, unidades, relatos, contato…)
styles/editorial-c.css      Camada editorial de B/C
styles/cabecalho*.css       Cabeçalho comum e variação em cápsula
styles/rodape.css           Rodapé e selo e-MEC
js/home.js                  Busca, abas, vídeos sob demanda, relatos, unidades, faixas infinitas
js/editorial.js             Atalhos da abertura e banner 3:1
scripts/renderizar.mjs      Marcação comum
scripts/renderizar-c.mjs    Seções editoriais (reaproveita as comuns)
scripts/gerar.mjs           Prévias, comparação e peças Elementor
scripts/verificar.mjs       Contrato editorial, ordem das seções, assets e fragmentos
scripts/empacotar.mjs       ZIPs, extração e comparação de bytes
assets/manifest.json        Origem, dimensões e URL publicada de cada mídia
~~~

Arquivos **gerados** (não editar à mão): `index.html`, `previa-*/index.html` e tudo em `elementor/*/`. O gerador também lê o banner de campanha em `hero.sourceFile` (pasta `header graduacao`) sem alterá-lo.

~~~powershell
node Graduacao/home-graduacao-phorte/scripts/gerar.mjs
node Graduacao/home-graduacao-phorte/scripts/verificar.mjs
node Graduacao/home-graduacao-phorte/scripts/empacotar.mjs
~~~

`scripts/preparar-conteudo.mjs` recria a base editorial a partir do acervo vizinho `Site Phorte` e do Sharp do projeto `Phorte`; não faz parte do build de rotina.

## Testes

Com o servidor na porta 4177 e o Playwright/axe do projeto vizinho `Phorte`:

~~~powershell
node Graduacao/home-graduacao-phorte/scripts/qa-editorial.cjs b
node Graduacao/home-graduacao-phorte/scripts/qa-editorial.cjs c
node Graduacao/home-graduacao-phorte/scripts/qa-navegador.cjs
node Graduacao/home-graduacao-phorte/scripts/qa-integracao.cjs
npx --yes html-validate Graduacao/home-graduacao-phorte/previa-a/index.html Graduacao/home-graduacao-phorte/previa-b/index.html Graduacao/home-graduacao-phorte/previa-c/index.html
~~~

`qa-editorial` cobre B e C (5 larguras sem rolagem lateral, busca, unidades, relatos, banner, faixas no celular, menu, axe, sem JS). `qa-navegador` e `qa-integracao` cobrem A e a montagem com o formulário entre widgets. Detalhes em [VALIDACAO.md](VALIDACAO.md).

## Elementor

[Guia de instalação](elementor/INSTALACAO.md). Pacotes: `cabecalho`, `cabecalho-c`, `home-a`, `home-b`, `home-c`, `rodape`. Uma home por página; B e C usam `cabecalho-c`.

Antes de publicar:

- **Uploads pendentes** (pasta `assets-para-upload/` de cada ZIP): sete imagens de cursos e logo; na C também as duas imagens dos caminhos e as três dos banners.
- **Imagens geradas no Magnific** (caminhos e banners): conferir direitos de uso no plano da conta.
- **Formulário**: substituir a prévia pelo widget Form nativo com ações/CRM/consentimento verificados.
- **Dados a validar**: grau, área e duração dos cursos (conferidos nas páginas oficiais em 16/10/2026), linha do tempo institucional (texto do protótipo), frase do polo EAD, horários das unidades (ausentes).

## Histórico e referências

1. [Inventário da home atual](referencias/INVENTARIO.md) e [comparação das referências](referencias/COMPARATIVO.md).
2. [Propostas A e B originais](PROPOSTAS.md) — desenho inicial; a B foi depois substituída pela estrutura editorial.
3. [Plano de implementação](../../docs/superpowers/plans/2026-10-16-home-graduacao-phorte.md).
4. [Registro de execução](PROGRESSO.md): cada rodada de ajustes e suas decisões.

Fontes: home atual, pós atual (https://posphorte.com.br/), SIG Pós, protótipo da pós (https://phorte-pos.vercel.app/), protótipo da graduação (https://graduacao-phorte.vercel.app/) e referência editorial EBAC. Código da graduação no GitHub `srbunnie/Site-Phorte`; da pós em `srbunnie/PhortePosnewsite`. Capturas e scripts de pesquisa ficam em `output/playwright/home-graduacao-phorte/` (ignorado pelo Git).
