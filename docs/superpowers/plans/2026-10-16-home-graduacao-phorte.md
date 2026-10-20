# Home Graduação Phorte — plano de implementação de duas versões

> **Para agentes:** usar `superpowers:executing-plans` para executar este plano por etapas na mesma sessão. Delegação somente se autorizada pelo usuário ou por instrução aplicável. Marcar os itens concluídos com `[x]`.

**Goal:** construir duas prévias HTML/CSS/JS da home de graduação, uma reorganizando a jornada e outra preservando a ordem atual, com pacotes independentes para Elementor.

**Architecture:** conteúdo editorial compartilhado, renderização estática em Node e componentes sem framework. Cabeçalho e rodapé comuns; cada variante define a ordem das seções e a interação do catálogo. Formulário de atendimento real permanece em widget nativo do Elementor, inserido em um slot entre fragmentos HTML.

**Tech Stack:** HTML semântico, CSS com escopo, JavaScript de navegador, Node.js para gerar/verificar/empacotar; Playwright e axe para validar. Sem React, Next, Tailwind ou jQuery como dependência do HTML entregue.

**Spec:** [propostas A e B](../../../Graduacao/home-graduacao-phorte/PROPOSTAS.md), apoiadas pelo [inventário](../../../Graduacao/home-graduacao-phorte/referencias/INVENTARIO.md) e [comparativo](../../../Graduacao/home-graduacao-phorte/referencias/COMPARATIVO.md).

**Status em 16/10/2026:** implementação local das duas versões concluída após o usuário pedir “prossiga”. Prévias, peças Elementor, ZIPs gerados localmente e documentação disponível (não versionada); verificações e limites registrados em `Graduacao/home-graduacao-phorte/VALIDACAO.md` (não versionado). Homologação/publicação no WordPress permanecem como etapa posterior.

## Global Constraints

- Trabalhar em `Graduacao/home-graduacao-phorte/`; preservar a pós finalizada e o banner de graduação existente.
- Mesmos sete cursos e destinos nas duas versões; excluir o post de teste `57540`.
- Não trocar slugs WordPress por rotas do protótipo Next.
- Fonte Poppins; ação principal `#D42B2B`, hover `#A81E1E`; texto `#1A1A1A`, apoio `#595959`; base `#FAFAFA` e `#F4F6F9`.
- Campanha 2027 mantém suas cores e escopo próprios. Não promover campanhas ocultas de 2026.
- Prefixo `hg-` para classes e IDs novos. Banner existente mantém seu próprio escopo, uma instância por página.
- Sem preços, duração, grau, claims MEC ou endereços não conferidos. A ausência de validação de um campo não autoriza inventá-lo.
- Consulta a conteúdo público permitida; publicação, importação, alteração de tema/WordPress e envio de leads não fazem parte desta implementação local.
- Formulário de prévia sem envio e sem falso sucesso. Ações reais ficam no widget nativo, após homologação própria.
- Preservar `[phorte_pos_search]` e `[category_dropdown]`. Não criar backend Angie de graduação por analogia ao da pós.
- Não copiar o shortcode literalmente para CSS/JS/comentários HTML.
- Prévia `noindex,nofollow`; arquivos de widgets sem documento HTML completo ou metatags globais.
- Conferir `git status --short` antes de editar. Não trocar branch nem limpar trabalho de outras tarefas automaticamente.

## Review Focus

1. Um post publicado de teste não deve aparecer como oitavo curso: conferir os sete IDs institucionais, além da contagem.
2. Curso com modalidade sem turma vigente: rótulo indica classificação, sem promessa de disponibilidade ou preço; campos comerciais ausentes continuam ausentes.
3. Script reinicializado no Elementor ou widget nativo colocado entre trechos: inicialização idempotente e isolamento por peça, sem handlers duplicados ou `querySelector` nulo interrompendo a home.
4. JavaScript, fonte ou mídia indisponíveis: cursos/links continuam acessíveis; a página não fica presa em spinner e o texto tem fallback legível.
5. Componentes da pós/tema no mesmo documento: CSS da graduação não altera elementos externos e os widgets não dependem de IDs `hp-`.

Cada condição está coberta pelas verificações das etapas abaixo.

## Estrutura prevista

Estrutura implementada, além das fontes de pesquisa:

~~~text
Graduacao/home-graduacao-phorte/
  conteudo/home.json                 Dados editoriais compartilhados e sua origem
  conteudo/variantes.json            Ordem e modo do catálogo de A/B
  assets/manifest.json               Origem, nome, dimensões e URL WP de cada asset
  assets/images/                    Cópias otimizadas necessárias
  assets/fonts/                     Poppins + OFL quando auto-hospedada
  styles/base.css                   Tokens, fonte, tipografia, resets com escopo
  styles/cabecalho.css               Navegação
  styles/home.css                    Seções e modos das duas variantes
  styles/rodape.css                  Serviços e contato
  js/cabecalho.js                    Menus e comportamento independente
  js/home.js                         Filtros/abas, hero, vídeo, carrosséis
  scripts/renderizar.mjs             Funções de marcação por bloco
  scripts/gerar.mjs                  Gera prévias, widgets, templates e manifest
  scripts/verificar.mjs              Confere contrato de conteúdo e pacotes
  scripts/empacotar.mjs              ZIPs por peça/variante
  scripts/qa-navegador.cjs            Roteiro de browser das duas variantes
  previa-a/index.html                Gerado: jornada reorganizada
  previa-b/index.html                Gerado: ordem preservada
  elementor/cabecalho/               Widget e template comuns, gerados
  elementor/home-a/                  Fragmentos da versão A, gerados
  elementor/home-b/                  Fragmentos da versão B, gerados
  elementor/rodape/                  Widget e template comuns, gerados
  elementor/INSTALACAO.md            Passos e limites por variante
  elementor/assets-publicacao.json   Mapeamento real/pending de URLs
  VALIDACAO.md (não versionado) Comandos, resultados e limites reais
~~~

Não editar diretamente `previa-*` ou os fragmentos gerados. A pasta `referencias/` conserva o levantamento; não usá-la como armazenamento de ofertas mutáveis sem atualização explícita.

## Task 1: consolidar a base editorial das duas versões

**Arquivos:** criar `conteudo/home.json`, `conteudo/variantes.json` e o núcleo de `scripts/verificar.mjs`; consultar `referencias/inventario-consolidado-2026-10-16.json`.

**Interfaces:**

- `home.json`: `courses[]` com `{id, slug, title, href, modalities[], description?, degree?, duration?, image?, source}`; `hero`, `institution`, `units[]`, `testimonials[]`, `partners[]`, `news[]`, `contact`, `navigation` e `form`.
- Cada dado acadêmico/comercial opcional precisa de fonte; usar ausência/`null` para campo não confirmado. Não usar texto provisório com aparência de oferta real.
- `variantes.json`: objetos `a` e `b`, cada um com `label`, `catalogMode` (`grid` ou `tabs`) e `sections[]` com IDs estáveis.
- Ordem A: `hero`, `catalog`, `modalities`, `admissions`, `testimonials`, `institution`, `units`, `partners`, `contact`, `faq`, `news`.
- Ordem B: `hero`, `catalog`, `course-banner`, `institution`, `units`, `testimonials`, `contact`, `partners`, `news`.
- Cabeçalho/rodapé são comuns e externos a `sections[]`.

- [x] Revisar com as fontes os dados opcionais de curso, unidades e contato de aluno; sem confirmação, limitar a prévia aos dados já comprovados e sede Rui Barbosa.
- [x] Fixar a seleção de depoimentos da home, preservando nome, curso, texto e URL de vídeo; não usar a amostra variável como sorteio no protótipo.
- [x] Reutilizar a mesma seleção de notícias e hero em A/B. Registrar a decisão sobre a arte sazonal do Dia dos Professores.
- [x] Escrever copy proposta de modalidades, ingresso e FAQ para A com apoio em páginas reais; registrar o que é redação nova para revisão.
- [x] Criar verificação que rejeita curso extra, ID de teste, duplicação de pessoa/vídeo, destino inválido e seção ausente nas ordens.
- [x] Rodar `node Graduacao/home-graduacao-phorte/scripts/verificar.mjs --conteudo`; resultado esperado: sete IDs corretos, duas ordens válidas, nenhuma informação comercial sem origem.

**Entrega verificável:** dados completos para revisão, sem dependência de browser ou WordPress em runtime.

## Task 2: construir a composição estática compartilhada e as duas páginas

**Arquivos:** criar `scripts/renderizar.mjs`, `scripts/gerar.mjs`, `styles/base.css`, `styles/home.css` e `assets/manifest.json`.

**Interfaces:** `renderSection(sectionId, data, variant): string`, `renderHeader(data): string`, `renderFooter(data): string`; renderização escapa texto/atributos. O gerador consome JSONs da Task 1 e produz `previa-a/index.html`, `previa-b/index.html` e um relatório de assets. Comportamento fica na Task 4.

- [x] Preparar assets reais da graduação e a Poppins com licença; registrar origem, dimensões e caminho. Reutilizar arquivos locais já existentes quando adequados, sem apagar originais.
- [x] Portar a aparência e o conteúdo do hero aprovado, mantendo o escopo e sem duplicar script do carrossel ao integrar a Task 4.
- [x] Implementar cards de sete cursos e as duas composições seguindo a tabela da proposta; A com grade 3/2/1, B com sete painéis e conteúdo acessível sem JS.
- [x] Criar slots de atendimento e mídia com reserva de espaço; sem loaders permanentes ou dependência de JetEngine para conteúdo estático.
- [x] Estilizar as peças com tokens comuns, espaçamento consistente e campanha isolada. Não importar uma folha Tailwind compilada para o widget.
- [x] Rodar `node Graduacao/home-graduacao-phorte/scripts/gerar.mjs` e `npx --yes html-validate Graduacao/home-graduacao-phorte/previa-a/index.html Graduacao/home-graduacao-phorte/previa-b/index.html`; esperado: geração das duas páginas e HTML sem erros.
- [x] Conferir ambos os HTMLs sem JavaScript: sete links de cursos presentes, textos reais e contatos acessíveis.

**Entrega verificável:** duas páginas estáticas completas com os mesmos dados e ordens diferentes.

## Task 3: cabeçalho e rodapé independentes

**Arquivos:** criar `styles/cabecalho.css`, `styles/rodape.css`, `js/cabecalho.js`; completar `renderHeader` e `renderFooter`.

**Interfaces:** raízes `#hg-cabecalho` e `#hg-rodape`; `initHeader(root: HTMLElement): void`, protegido por marcador de inicialização. Destinos de serviços/cursos em URLs absolutas; atalho principal vai para `#hg-main` quando presente ou para região principal válida da página hospedeira.

- [x] Consolidar navegação atual, separar inscrição e serviços de aluno e manter destinos institucionais/regulatórios.
- [x] Implementar mobile e submenus com teclado, Escape e foco visível. Não exigir hover para entrar em submenu.
- [x] Mostrar redes por ícones com nomes acessíveis e preservar consulta e-MEC, CNPJ, documentos e políticas.
- [x] Verificar navegação com home A/B e em fixture sem home: nenhum erro por âncora ausente, duplicação de cabeçalho ou seleção de elementos da pós.
- [x] Conferir links telefônicos e de aluno conforme decisão editorial da Task 1; não copiar o número divergente por acidente.

**Entrega verificável:** cabeçalho/rodapé funcionam como peças reutilizáveis e não dependem da variante.

## Task 4: interações do catálogo, hero e prova social

**Arquivos:** criar `js/home.js`, completar estados em `styles/home.css`, iniciar `scripts/qa-navegador.cjs`.

**Interfaces:** `initHome(root: HTMLElement): void`; raiz `#hg-main` com `data-variant="a"` ou `"b"`. Inicialização idempotente. Funções internas para filtros, abas, vídeos e carrosséis operam somente quando seus elementos existem.

- [x] Em A, filtrar localmente por nome e modalidade com contagem, limpar e estado sem resultado; busca ignora maiúsculas/acentos. Interseção dos filtros sem alterar links dos cards.
- [x] Em B, implementar sete abas com `tablist`, `tab`, `tabpanel`, seleção e teclado; manter alternativa de leitura dos cursos sem JS.
- [x] Reutilizar o comportamento do banner de maneira única: cinco segundos se rotação ativa, setas/dots/pausa, foco/manual pausam, preferência por movimento reduzido inicia pausado, slides inativos sem elementos focáveis.
- [x] Vídeos por clique, pôster e link alternativo; não ocultar controles do player com camada sobreposta. Não disparar o YouTube antes da ação prevista.
- [x] Evitar clones de conteúdo sem necessidade. Carrossel de depoimentos com botões/paginação, teclado/toque, sem rotação obrigatória de textos.
- [x] Browser: pesquisar `educacao`, selecionar modalidade incompatível, limpar e navegar ao curso; verificar contagem/estado vazio. Em B, selecionar primeira/última aba por teclado e verificar foco.
- [x] Browser: reinicializar duas vezes e retirar um bloco opcional; menus e demais seções continuam operando sem duplicação ou erro.

**Entrega verificável:** jornadas locais completas, sem backend e sem conteúdo preso em carregamento.

## Task 5: pacotes Elementor e formulário nativo

**Arquivos:** criar `elementor/INSTALACAO.md`, `scripts/empacotar.mjs`, saída `elementor/{cabecalho,home-a,home-b,rodape}/` e `elementor/assets-publicacao.json`; completar o gerador.

**Interfaces:** cada home gera `1-antes-atendimento.html` e `3-depois-atendimento.html`, além de uma instrução de slot `2-formulario.txt` para o widget nativo. Estilos/scripts ficam em uma posição única documentada, cobrindo todos os trechos. O template, se gerado, preserva um único contêiner principal com largura/gap coerentes.

- [x] Gerar peças sem tags `html/head/body`; confirmar um único `main`, `h1` e ID por página montada.
- [x] Configurar CSS/JS com escopo mesmo quando o formulário nativo estiver entre os dois HTMLs; JS de catálogo/hero não depende da presença de campos do formulário.
- [x] Documentar inserção do Form do Elementor existente, reaproveitando ações/configurações verificadas no editor em etapa de homologação. Não inferir essas ações a partir dos nomes de campos públicos.
- [x] Prévia local: interface do atendimento informa que não envia; não realizar POST, salvar leads ou mostrar confirmação enganosa.
- [x] Mapear imagens para URLs WP conhecidas; marcar uploads pendentes. Sem paths relativos locais em widgets de publicação.
- [x] Separar instruções para Theme Builder + Largura Total e Canvas + peças internas; contêiner sem padding/margem/gap extra, sem duplicar cabeçalho/rodapé.
- [x] Gerar quatro pacotes locais: cabeçalho, home A, home B, rodapé. O ZIP deve conter os arquivos recém-gerados, não uma versão anterior.
- [x] Inspecionar o conteúdo dos ZIPs e comparar seus arquivos com a saída de geração. Nenhuma importação ou publicação remota nesta etapa.

**Entrega verificável:** pacotes concretos e guia, com a integração real do formulário identificada como homologação pendente.

## Task 6: validação final e material de comparação

**Arquivos:** completar `scripts/verificar.mjs`, `scripts/qa-navegador.cjs`, `VALIDACAO.md`, `README.md` e material de continuidade.

**Interfaces:** verificador lê as duas prévias e saídas Elementor; QA aceita URLs A/B e grava evidência em `output/playwright/home-graduacao-phorte/`. Se testes usarem runtime de projeto vizinho, documentar o caminho e não acrescentar dependência implícita ao HTML entregue.

- [x] Verificar sete cursos e URLs corretas nas duas variantes, post de teste ausente, seleção editorial consistente, ordem B igual à fonte e ordem A igual ao plano.
- [x] Rodar `node --check` em ambos os scripts de browser e geradores; rodar geração, verificador, HTML validator e empacotamento na ordem documentada.
- [x] Browser nas larguras 320, 390, 768, 1024 e 1440: nenhuma rolagem horizontal de página, corte de CTA, mídia quebrada ou texto sobreposto.
- [x] Conferir teclado, mobile menu, abas/filtros, carrosséis, foco, movimento reduzido, links de vídeo e ausência de envio no formulário de prévia.
- [x] Rodar axe nas duas variantes; registrar e corrigir violações aplicáveis, distinguindo achados de limitações do ambiente.
- [x] Testar uma fixture com estilos de tema fortes e elemento externo à graduação: CSS da graduação não altera o elemento e a graduação permanece legível.
- [x] Simular falha de imagem/fonte e JS desligado: links de cursos, conteúdo e serviços continuam acessíveis; sem spinner infinito ou dependência de rede para catálogo.
- [x] Capturar desktop/mobile das duas versões, conferir visualmente e atualizar documentação com resultado real e pendências restantes.
- [x] Apresentar ambas as prévias para comparação. Não declarar desempenho/conversão superior sem mensuração.

**Entrega verificável:** duas prévias revisáveis, evidências e pacotes correspondentes; nenhum teste remoto fictício declarado como concluído.

## Execução e publicação

A implementação local desta rodada termina aqui. Publicar, alterar a home WordPress, ativar snippets, mudar condições do Theme Builder ou testar recebimento de leads são ações posteriores, que exigem um ambiente/destino concreto e a solicitação correspondente do usuário.

As duas prévias foram produzidas e revisadas localmente. A revisão visual/editorial do usuário e a homologação no WordPress devem avaliar ambas antes da escolha de publicação.
