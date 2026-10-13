# Arquitetura das LPs de gestão

**Versão:** 2026-10-09. **Estado:** especificação de montagem aplicada às primeiras versões estáticas; revisão do resultado visual pendente. [Estado da produção](producao-lps-gestao.md).

## 1. Escopo e referências

Aplicar esta estrutura a Administração, Marketing, Processos Gerenciais e Recursos Humanos. As páginas usam HTML/CSS/JavaScript estáticos, com montagem portátil para Elementor. Os nomes de componentes abaixo são contratos de composição; não pressupõem uma biblioteca React. O [renderizador estático](../../scripts/build-lps-gestao.py) monta os Markdowns do formato editorial usado neste pacote.

Referências locais:

- [Pedagogia 2027.1 — página](../pedagogia/index-claro-2027-1.html) e [montagem no Elementor](../pedagogia/implementacao/elementor/2027-1/README.md).
- [Tradução — página](../traducao%20e%20interpretacao/index.html), [CSS](../traducao%20e%20interpretacao/styles.css), [JavaScript](../traducao%20e%20interpretacao/script.js) e [montagem no Elementor](../traducao%20e%20interpretacao/implementacao/elementor/README.md).
- [Revisão de UI](revisao-ui.md), com evidências que orientam as adaptações.

Usar a composição clara das referências. Conteúdo, fotos, provas e características acadêmicas pertencem a cada curso. A quantidade de cards depende do conteúdo disponível, sem preencher espaços com afirmações de outro curso.

## 2. Ordem dos blocos e associação da copy

| Seção da copy | Componente proposto | Conteúdo mínimo | Correspondência local |
|---|---|---|---|
| 01 — Hero | `gestao-hero` + `gestao-offer` | Identificador, um H1, proposta curta, apresentação breve, imagem, oferta validada e dois CTAs | Hero de Pedagogia; `.ti-hero` de Tradução |
| 02 — Ficha técnica | `gestao-facts` | Modalidade, duração, formação, campus, turno e ingresso | `.facts` de Pedagogia; faixa de informações de Tradução |
| 03 — Apresentação | `gestao-about` | Título, texto específico e imagem relacionada à formação | Seções editoriais de texto/imagem das referências |
| 04 — Modalidade | `gestao-modality` | Organização de cada modalidade, atividades presenciais e ação para orientação | Blocos de funcionamento das referências; conteúdo das fontes do curso |
| 05 — Competências | `gestao-competencies` | Título, competências e descrições derivadas da grade | Grids editoriais de cards |
| 06 — Vivência prática | `gestao-practice` | Gestão em Ação e experiências descritas na copy, com imagem correspondente | Blocos de experiência/prática; sem transferir laboratórios ou horas de outro curso |
| 07 — Diferenciais | `gestao-differences` | Título e descrição curta por diferencial comprovável | `.diff-grid` de Pedagogia; cards de Tradução |
| 08 — Atuação profissional | `gestao-careers` | Áreas relacionadas à formação, sem garantia de vaga ou remuneração | `.career-grid` de Pedagogia; cards de atuação de Tradução |
| 09 — Perfil do aluno | `gestao-profile` | Interesses e motivações, sem criar requisito de ingresso | Composição editorial com lista ou cards |
| 10 — Docentes | `gestao-faculty` | Nome, titulação e bio resumida; retrato quando validado | `.teacher-carousel` de Pedagogia; carrossel/bios de Tradução |
| 11 — Grade | `gestao-curriculum` | Módulos e disciplinas na ordem da fonte, CTA para orientação | Acordeões nativos `details/summary` de Tradução; adaptar o conteúdo de `.acc` de Pedagogia |
| 12 — Ingresso | `gestao-admission` | Vestibular e segunda graduação, com ações identificadas | Blocos de ingresso das referências |
| 13 — Formulário | `gestao-enrollment` | Copy de contato, labels, campos e orientação de envio | `.phorte-enrollment` de Pedagogia; `.ti-enrollment` de Tradução |
| 14 — FAQ | `gestao-faq` | Perguntas e respostas específicas da copy | `details/summary` de Tradução; conteúdo de `.faq-grid` de Pedagogia |
| 15 — CTA final | `gestao-final-cta` | Próximo passo explícito: inscrição ou informação | Encerramento das duas referências |

### Blocos opcionais

| Bloco | Posição quando aprovado | Condição de uso |
|---|---|---|
| Coordenação | Antes dos docentes | Nome, função, bio e retrato correspondentes ao curso e à oferta |
| Depoimentos | Após prática ou diferenciais | Relato, autoria, vínculo e permissão de uso disponíveis para o curso |
| Salários | Após atuação profissional | Painel claro incorporado aos previews por solicitação do usuário; confirmar fonte original, cargo, período, recorte, metodologia e data para publicação |
| Reconhecimento/nota do MEC | Oferta ou bloco institucional | Registro correspondente ao curso, modalidade e instituição conferido; arte legível e sem corte |

Os estados destes materiais estão nos quatro dossiês. Para coordenação, depoimentos e claims regulatórios, na falta de material aprovado, omitir o bloco; não renderizar avisos de pendência como conteúdo promocional. Para salários, a solicitação vigente inclui o painel do protótipo nos previews, conforme o [registro de incorporação](salarios-painel-claro.md). A grade não será convertida em um módulo por semestre por inferência.

## 3. Hierarquia visual e comportamento responsivo

Os pontos de quebra são uma proposta comum para a futura montagem: desktop a partir de 1024 px, tablet entre 768 e 1023 px e mobile abaixo de 768 px. Conferir também larguras intermediárias e conteúdo real.

| Componente | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero/oferta | Duas colunas, texto/oferta e imagem; ação na primeira dobra sempre que o conteúdo permitir | Ajustar proporções; empilhar se a leitura ficar estreita | Ordem no DOM: título, proposta, oferta/ações, imagem; texto longo segue em apresentação |
| Ficha técnica | Seis itens em uma linha quando houver espaço | Três colunas | Duas colunas, sem cortar rótulos ou valores |
| Texto e imagem | Duas colunas, alternância apenas visual | Duas colunas ou pilha conforme comprimento | Texto antes de imagem explicativa, sem inverter foco por CSS |
| Competências/diferenciais/atuação | Até três colunas | Duas colunas | Uma coluna; alturas livres conforme o texto |
| Docentes | Até três cards visíveis; grid ou carrossel conforme volume | Dois cards | Um card; controles acessíveis se houver carrossel |
| Grade/FAQ | Coluna de leitura confortável | Largura do container | Cabeçalho que quebra linha; disciplina sem truncamento |
| Contato | Copy e formulário em duas colunas | Duas colunas se os campos conservarem espaço | Copy, introdução, campos e aviso em uma coluna |
| CTA fixo | Dispensável quando ações permanecem visíveis | Decidir após revisão da composição | Exibir após o hero; ocultar com formulário ou CTA final visível; reservar área inferior |

Ficha técnica é resumo. Frequência de encontros, avaliações, polos, exceções e horários ficam em modalidade ou FAQ. A combinação escolhida deve ser confirmada no atendimento; campus de referência não representa disponibilidade de todos os polos.

### Preset visual das LPs

| Token | Base destas páginas | Observação |
|---|---|---|
| Títulos | Montserrat | Manter pesos e escala consistentes com as referências claras |
| Corpo | Inter | Usar fallback de sistema; evitar novo carregamento duplicado pelo Elementor |
| Texto principal | `#1f1f1f` | Conteúdo em superfícies claras |
| Texto secundário | `#626262` | Conferir contraste na superfície efetivamente usada |
| Vermelho | `#c92d2d` | Títulos, ícones e acentos |
| Vinho | `#8f1f1f` | Áreas de ênfase e variações de vermelho |
| CTA principal | `#f5c542` com texto escuro | Ação predominante; secundário com menor ênfase |
| Superfície | Branco e `#f7f5f2` | Alternância leve entre blocos |
| Linha | `#e8e4df` | Separadores e bordas |
| Raio | Referências: 18 px em Pedagogia, 20 px em Tradução | Adotar 20 px como proposta comum para cards; não confundir com regra já aplicada |
| Container | Até 1180 px | Padding lateral fluido, sugerido 20 px no mobile |

O Design System geral Phorte documenta vermelho `#E64242`, verde `#13B241`, texto `#1A1A1A`, muted `#595959` e raio de 8 px, além de Poppins na documentação e Inter no runtime. Estes valores diferem do preset das LPs locais. A família de gestão seguirá Montserrat/Inter, vermelho/vinho, CTA amarelo e cards arredondados das referências. Uma migração para o preset geral precisa de decisão própria e revisão de toda a família.

## 4. Contratos de conteúdo e mídia

- **Hero:** um H1 com nome do curso; proposta em uma frase; apresentação curta. Detalhes acadêmicos vão para os blocos seguintes. Sem preço ou turma até a validação indicada no dossiê.
- **Oferta:** formação, duração e ações podem ser montadas agora. Preço, desconto, condições, período e confirmação de turma exigem dados aprovados em conjunto. Não mostrar preço anterior sem base comercial.
- **Cards:** título claro e descrição curta da própria copy; sem ícones que prometam certificação, emprego ou parceria não documentados.
- **Docentes:** não associar retrato por ordem de arquivo. Validar identidade e equipe vigente. Bio longa pode ter expansão; botão deve informar estado com `aria-expanded` e `aria-controls`.
- **Grade:** preservar cada módulo e disciplina, inclusive repetições. Usar lista dentro de cada acordeão, sem alterar títulos para resolver aparentes inconsistências.
- **Imagens:** URLs inventariadas nos dossiês são referências. Confirmar uso e correspondência na Biblioteca de Mídia antes de montar a versão pública; não usar imagem de Pedagogia como evidência da infraestrutura de gestão.
- **Corte:** fotos com proporção reservada e `object-fit: cover`; selos/logos com `object-fit: contain`, largura máxima de 100% e espaço dentro do card. Não posicionar selos para fora do container no mobile.
- **Texto alternativo:** descrever o conteúdo relevante; imagem apenas decorativa usa `alt=""`. Retrato usa identificação verificada. Texto essencial de oferta deve existir em HTML, independentemente da imagem.

## 5. HTML e CSS estáticos

Wrapper proposto: `.phorte-lp-gestao`, acrescido de `.phorte-lp-gestao--administracao`, `--marketing`, `--processos-gerenciais` ou `--recursos-humanos`. Cada raiz recebe `data-course` correspondente. IDs devem incluir o slug para evitar colisões no editor ou em páginas com mais de uma instância.

Padrão ilustrativo de acordeão; a disciplina é inserida a partir da copy do curso:

```html
<main class="phorte-lp-gestao phorte-lp-gestao--administracao"
      data-course="administracao">
  <section class="gestao-curriculum" aria-labelledby="administracao-grade-title">
    <h2 id="administracao-grade-title">Grade curricular</h2>
    <details class="gestao-accordion">
      <summary>Organização Empresarial</summary>
      <ul><!-- Disciplinas na ordem da copy aprovada --></ul>
    </details>
  </section>
</main>
```

Em Elementor, usar um container `div` com a mesma classe se o tema já fornecer o landmark `main`. Evitar dois landmarks principais aninhados. O exemplo não constitui um widget pronto para publicação.

```css
.phorte-lp-gestao {
  --gestao-red: #c92d2d;
  --gestao-yellow: #f5c542;
  --gestao-radius: 20px;
  color: #1f1f1f;
  font-family: Inter, sans-serif;
}
.phorte-lp-gestao .gestao-container {
  width: min(100% - 40px, 1180px);
  margin-inline: auto;
}
.phorte-lp-gestao .gestao-card {
  border-radius: var(--gestao-radius);
}
.phorte-lp-gestao :focus-visible {
  outline: 3px solid var(--gestao-red);
  outline-offset: 4px;
}
```

Regras de isolamento:

1. Declarar tokens no wrapper e prefixar todas as regras, incluindo títulos, links, botões, listas e regras do formulário nativo. Não criar reset global de `body`, `h1`, `button` ou `.elementor-*`.
2. Prefixar animações com `gestao-`; limitar media queries ao wrapper. Respeitar `prefers-reduced-motion`.
3. Evitar altura fixa em texto, oferta e cards. Não esconder overflow da página para mascarar conteúdo cortado.
4. Usar grid/flex, propriedades lógicas e mídia responsiva. Garantir leitura a 390 px e depois conferir 320 px, tablet e desktop.
5. Área de toque sugerida de pelo menos 44 × 44 px; foco visível e ordem de tabulação seguem o DOM. Usar links para navegação e botões para alteração de estado.
6. Manter `summary` nativo. Não recriar o acordeão com uma `div` clicável nem interceptar Enter/Espaço sem necessidade. Permitir vários módulos abertos, salvo decisão editorial posterior.

## 6. JavaScript por página

Inicializar cada raiz uma vez, após existir no DOM. O padrão de idempotência de Tradução orienta a implementação:

```js
function initGestaoPage(root) {
  if (root.dataset.gestaoReady === "true") return;
  root.dataset.gestaoReady = "true";
  // Consultar elementos e anexar comportamentos somente dentro desta raiz.
}
document.querySelectorAll(".phorte-lp-gestao").forEach(initGestaoPage);
```

O carregador futuro deve esperar `DOMContentLoaded` se necessário. No Elementor, integrar o inicializador ao carregamento dos widgets pelo mecanismo permitido no projeto; não presumir que cada inserção de HTML executará o script novamente. Se o editor substituir uma raiz, inicializar a nova instância e liberar observers/listeners da anterior.

| Comportamento | Contrato |
|---|---|
| Grade e FAQ | Funcionam nativamente sem JavaScript |
| Carrossel docente, se adotado | Botões anterior/próximo com nomes acessíveis; navegação por teclado e estado dos controles; não exigir arrastar; conteúdo disponível sem autoplay |
| Bio expandida | Botão com estado, alvo e rótulo coerentes; não perder foco ao recolher |
| CTA fixo mobile | `IntersectionObserver` acompanha hero, seção de contato e CTA final. Mostrar somente após o hero e quando os dois destinos finais estiverem fora da tela. O estado oculto remove também a ação da tabulação |
| Área inferior | Reservar altura real do CTA + `env(safe-area-inset-bottom)` quando visível. Recalcular se o texto quebrar linha; ocultar durante foco nos campos para evitar conflito com teclado virtual |
| Âncoras | Usar IDs do curso e `scroll-margin-top` compatível com header do site |
| Formulário de preview | Bloquear envio real e apresentar mensagem demonstrativa; não disparar CRM/e-mail nem afirmar inscrição concluída |
| Formulário publicado | Usar ações nativas do Elementor e configuração oficial, sem duplicar submit no script da LP |

## 7. CTAs e destinos

Padronizar a intenção em todos os pontos. O ingresso oficial e o pedido de informações são ações distintas.

| Texto/ação | Destino | Aplicação |
|---|---|---|
| Fazer inscrição | Rota oficial do curso indicada abaixo | Hero e CTA final |
| Conheça o curso | `#{slug}-sobre` | CTA secundário do hero |
| Receber informações / orientação | `#{slug}-inscricao` | Modalidade, grade e dúvidas comerciais |
| Quero receber informações | Submit do formulário nativo | Solicitação de contato, sem promessa de matrícula automática |
| Ingressar pela segunda graduação | Rota oficial específica abaixo | Bloco de ingresso |

| Curso | Inscrição oficial | Segunda graduação |
|---|---|---|
| Administração | [phorte-administracao](https://typechat.phorte.org.br/phorte-administracao) | [phorte-adm-segunda](https://typechat.phorte.org.br/phorte-adm-segunda) |
| Marketing | [phorte-marketing](https://typechat.phorte.org.br/phorte-marketing) | [phorte-mkt-segunda](https://typechat.phorte.org.br/phorte-mkt-segunda) |
| Processos Gerenciais | [phorte-processos-gerenciais](https://typechat.phorte.org.br/phorte-processos-gerenciais) | [phorte-pg-segunda](https://typechat.phorte.org.br/phorte-pg-segunda) |
| Recursos Humanos | [phorte-recursos-humanos](https://typechat.phorte.org.br/phorte-recursos-humanos) | [phorte-rh-segunda](https://typechat.phorte.org.br/phorte-rh-segunda) |

Links observados nas páginas oficiais em 2026-10-09; conferir operação e campanha na montagem, sem enviar dados para realizar a conferência. A rota geral [vestibular-simplificado](https://typechat.phorte.org.br/vestibular-simplificado) também aparece nas fontes, mas não deve substituir silenciosamente uma rota específica. Se abrir nova aba, comunicar a navegação e usar `rel="noopener"`.

## 8. Montagem no Elementor

Adaptar o padrão antes/depois do formulário utilizado nas duas referências:

```text
Container principal — phorte-lp-gestao phorte-lp-gestao--{slug}
├── HTML — widget-before-form.html
│   └── Hero → ficha → apresentação → modalidade → competências
│       → prática → diferenciais → atuação → perfil → docentes → grade → ingresso
├── Container — gestao-enrollment (ID: {slug}-inscricao)
│   └── Container — gestao-enrollment-grid
│       ├── HTML — enrollment-copy.html
│       └── Container — gestao-enrollment-form
│           ├── HTML — form-intro.html
│           ├── Form widget nativo do Elementor
│           └── HTML — form-disclaimer.html
└── HTML — widget-after-form.html
    └── FAQ → CTA final → CTA fixo mobile
```

### Regras de montagem

1. O container principal pertence ao Elementor; os widgets HTML contêm fragmentos, sem `html`, `head`, `body` ou wrapper duplicado. O preview local futuro pode ter documento completo, usando os mesmos blocos.
2. Aplicar a classe do wrapper ao container principal e os IDs únicos aos destinos. Se `data-course` não for configurável, o inicializador pode obter o slug da classe específica.
3. Colar o CSS isolado no local permitido pelo projeto e carregar o JavaScript uma única vez. Validar que o header, footer e outros widgets não recebem estilos da LP.
4. Manter o formulário como widget nativo dentro de `gestao-enrollment-form`. O CSS pode ajustar labels, campos e mensagens dentro deste container; não converter o formulário em HTML estático na publicação.
5. Preparar imagens na Biblioteca de Mídia e atualizar os caminhos dos fragmentos. Preservar proporção, texto alternativo e identidade da pessoa fotografada.
6. Revisar em preview e na página publicada, pois fontes, header do tema e estilos do Elementor podem mudar a composição.

### Contrato do formulário

| Campo | Tipo e orientação |
|---|---|
| `nome` | Texto; label visível, autocomplete de nome |
| `email` | E-mail; label visível e validação coerente |
| `whatsapp` | Telefone; label visível e exemplo que não substitui o label |
| `ingresso` | Seleção: Vestibular, Segunda graduação, Quero orientação |
| `curso` | Oculto; valor específico do curso |

Nome sugerido do formulário: `gestao_{slug}_{periodo-aprovado}`. O período só entra após validação. A necessidade e obrigatoriedade dos campos devem ser confirmadas com o atendimento; não coletar dados adicionais apenas para preencher o layout.

Configurar Collect Submissions e Email conforme a operação vigente e conectar o CRM oficial quando definido. Consentimento, aviso de privacidade e política institucional usam a configuração aprovada do site. Vincular erros aos campos, manter mensagens visíveis e conferir navegação por teclado.

O botão e as mensagens estão na seção 13 de cada copy. Preview confirma apenas a demonstração, sem envio. A publicação confirma a recepção do pedido de contato somente após sucesso real do widget; não anuncia matrícula ou vaga garantida. Não copiar a mensagem de Tradução que fala em sequência à inscrição sem revisar essa finalidade.

## 9. Organização futura dos arquivos

```text
Graduacao/{slug}/
├── README.md
├── copy/copy.md
├── referencias/fontes-e-pendencias.md
├── index.html                  [próxima etapa]
├── styles.css                  [próxima etapa]
├── script.js                   [próxima etapa, se necessário]
├── assets/                     [mídia aprovada]
└── implementacao/elementor/    [fragmentos e instruções futuros]
```

Os três arquivos editoriais preparados são a base de cada curso. A conversão de Markdown para HTML é feita pelo renderizador local, sem carregamento de Markdown no navegador. Manter copy e página sincronizadas ao regenerar os arquivos; atualizar também o dossiê quando uma fonte mudar. As fontes comuns de CSS/JavaScript ficam em [componentes de gestão](../_shared/gestao/README.md).

## 10. Critérios para a próxima montagem

- Um H1 por página, sequência clara de H2/H3 e quinze seções associadas à copy.
- Hero mobile com título/proposta/ação antes da imagem; oferta legível sem duplicação de chamadas.
- Ficha técnica de seis itens, com contexto acadêmico no bloco de modalidade.
- Grade preservada: Administração 8 módulos/40 entradas; demais cursos 4/20, sem deduplicar disciplinas.
- CTA fixo sem sobreposição de campos, mensagens, conteúdo final ou teclado virtual.
- Acordeões com clique e teclado; controles com foco visível e texto sem corte.
- Destinos de inscrição e informação alinhados ao rótulo; formulário oficial configurado separadamente do preview.
- Fotos, docentes, provas e dados comerciais aprovados para o curso; claims regulatórios conferidos.
- Revisão visual em desktop, tablet e mobile, incluindo ausência de overflow e integridade dos selos.
- Aprovação editorial e configuração operacional registradas antes da publicação.

Voltar ao [índice dos quatro pacotes](README.md).
