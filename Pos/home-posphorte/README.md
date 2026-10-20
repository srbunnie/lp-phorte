# Home Pós Phorte — protótipo HTML

Para continuar o trabalho em outra sessão ou com outro agente, começar por HANDOFF.md (não versionado): histórico consolidado, decisões, mapa de arquivos, comandos, testes e pendências.

Prévia completa da home. **Cabeçalho, home e rodapé são peças separadas**, publicadas de forma independente no Elementor; a busca da home usa o shortcode `[phorte_pos_search]`. Conteúdo coletado de <https://posphorte.com.br/> em **15/10/2026**. A sequência da página original foi preservada; o visual usa Poppins e os tokens atuais do site da Graduação Phorte.

## Visualizar

Na raiz de lp-phorte:

~~~powershell
npx --yes http-server . -p 4177 -a 127.0.0.1 -c-1
~~~

Abra <http://127.0.0.1:4177/Pos/home-posphorte/>.

## Editar e gerar

- conteudo/home.json: conteúdo, destinos e correspondência de imagens.
- styles/base.css: fontes locais (só na prévia), tokens e componentes compartilhados pelas três peças. Nos widgets, cada peça recebe uma cópia da base restrita ao próprio escopo.
- styles/cabecalho.css, styles/home.css e styles/rodape.css: estilos isolados em #hp-cabecalho, #hp-home-hero/#hp-home-secoes e #hp-rodape.
- js/cabecalho.js: menu recolhível e submenus.
- js/home.js: hero, carrosséis e players sob demanda.
- scripts/gerar.mjs: composição semântica; gera a prévia e as três peças do Elementor da mesma fonte.
- scripts/empacotar.mjs: gera um ZIP por peça com fragmentos, template, assets e guia.
- scripts/tamanhos-wp.mjs: lê da API de mídia do WordPress as versões menores de cada imagem publicada e grava assets/tamanhos-wp.json, usado no srcset dos widgets.
- index.html e tudo em elementor/cabecalho, elementor/home e elementor/rodape: **arquivos gerados**, não editar diretamente.
- assets/manifest.json: origem pública, caminho local e dimensões dos assets.
- referencias/: inventário original, comparação e decisões editoriais.

Após editar as fontes:

~~~powershell
node Pos/home-posphorte/scripts/gerar.mjs
node Pos/home-posphorte/scripts/verificar.mjs
node Pos/home-posphorte/scripts/empacotar.mjs
~~~

O build e o verificador exigem somente Node.js. Não há dependências de React, Next.js, Tailwind, jQuery, API ou banco de dados.

## Comportamento

- Hero com três slides: apresentação original da Pós, apresentação dos cursos e arte do Dia dos Professores fornecida no projeto da Graduação. Copy e imagens são configuradas em conteudo/home.json; marcação em scripts/gerar.mjs.
- Hero avança a cada cinco segundos, com setas, indicadores, pausa/retomada e gesto horizontal. Navegação manual e foco de teclado pausam a rotação; movimento reduzido inicia pausado. Setas do teclado atuam nos controles do hero, preservando o foco.
- Seis destaques em grade de 3/2/1 colunas.
- Catálogo original: Educação Física 13 entradas, Tradução 9, Saúde 6. Trilhos com três cards a partir de 1024 px, dois entre 768–1023 px e um abaixo de 768 px.
- Carrosséis com botões, paginação, teclado (setas/Home/End), rolagem por toque e arraste com mouse.
- Menu recolhível abaixo de 1200 px, submenus nativos e fechamento por Escape. Cabeçalho e rodapé usam somente URLs absolutas e funcionam em qualquer página.
- Busca entre o hero e os destaques: widget Shortcode com `[phorte_pos_search]`, do componente [angie-busca-posphorte/](angie-busca-posphorte/README.md). Na prévia local aparece a marcação de teste do componente, sem consultar o catálogo.
- Três vídeos de depoimentos e um institucional: pôster local; iframe YouTube carregado somente após clique. Link alternativo disponível antes da ativação.
- Relatos longos expansíveis, com texto original preservado e sem imagens de preenchimento.
- Notícias estáticas da coleta; cards abrem as publicações originais.
- Links de cursos, modalidades, portais e contato usam os serviços existentes. O protótipo não realiza matrícula.
- Sem analytics, pixels ou integrações de captação. A prévia tem noindex,nofollow.

## Instalar no Elementor

Leia [o guia dos pacotes](elementor/INSTALACAO.md). São três peças:

| Peça | Arquivos | Elementor |
| --- | --- | --- |
| Cabeçalho | elementor/cabecalho/ | Um widget HTML; template de seção para o Theme Builder |
| Home | elementor/home/ | Widget HTML (hero) + widget Shortcode (busca) + widget HTML (seções), em um contêiner |
| Rodapé | elementor/rodape/ | Um widget HTML; template de seção para o Theme Builder |

Cada pasta tem os fragmentos para colar e um template-elementor.json importável; elementor/pacote-*.zip reúne cada peça. As imagens apontam para https://posphorte.com.br/wp-content/uploads/2026/10/, onde já estão publicadas; as fontes usam a Poppins carregada pelo site. Nada foi importado no WordPress.

A busca depende do snippet [angie-busca-posphorte/](angie-busca-posphorte/README.md) instalado no mesmo ambiente; ele registra [phorte_pos_search] e preserva [category_dropdown]. Diagnóstico da estrutura WordPress em [BUSCA-ANGIE.md](elementor/BUSCA-ANGIE.md).

## Verificação

~~~powershell
node Pos/home-posphorte/scripts/verificar.mjs
npx --yes html-validate Pos/home-posphorte/index.html
npx --yes --package @playwright/cli playwright-cli -s=home-posphorte open http://127.0.0.1:4177/Pos/home-posphorte/
npx --yes --package @playwright/cli playwright-cli -s=home-posphorte --raw run-code --filename=Pos/home-posphorte/scripts/qa-navegador.cjs
npx --yes --package @playwright/cli playwright-cli -s=home-posphorte --raw run-code --filename=Pos/home-posphorte/scripts/qa-hero.cjs
~~~

O roteiro pressupõe servidor na porta 4177; não é teste de produção. Capturas e relatórios ficam em output/playwright/home-posphorte/, ignorado pelo Git. Consulte VALIDACAO.md (não versionado) para resultados e limites.

Poppins acompanha a licença [SIL Open Font License](assets/fonts/OFL.txt).
