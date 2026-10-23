# Revisão de Design, UX, UI e usabilidade — Direção 02

Data: 23/10/2026. Página: `direcao-02/index.html`. Card: `17tjca24qak`.

## Correções aplicadas após a revisão

As alterações abaixo foram autorizadas pelo usuário e aplicadas em 23/10/2026. Os achados originais foram preservados neste documento como histórico.

| Item | Situação após correção |
|---|---|
| 1 — Seleção de área | Corrigido: combos estão dentro do painel Educação; links diretos e navegação por teclado mantêm a seleção coerente. |
| 2 — Contrastes | Corrigido nos pares identificados: CTA/abas em 5,67:1; texto secundário claro em 5,19:1. Foco com contorno branco e anel preto oferece contraste nas superfícies claras, escuras e vermelhas. |
| 3 — Expansores redundantes | Removidos; curso e livro permanecem visíveis, sem interação desnecessária. |
| 4 — Hero mobile | Corrigido na estrutura: mensagem e CTA precedem a arte no DOM; decoração ocultada até 760px. |
| 5 — Ambientação das áreas | Academia substituída no hero por composição gráfica neutra com as duas áreas. Capas finais continuam dependendo dos materiais aprovados. |
| 6 — Leitura de produto | Títulos de livros em 15–16px; notas de participação em 13px. |
| 7 — Caminho de conversão | Retorno circular substituído por catálogo institucional identificado como geral. Matrícula específica permanece dependente das condições e URLs aprovadas. |
| 8 — Promessas amplas | “Resultado imediato” substituído por descrição das áreas; “A maior” retirado dos dois modelos conforme a revisão solicitada. |

Verificações executadas: sintaxe de JavaScript, balanceamento de HTML/CSS, assets e âncoras locais, pertencimento dos combos ao painel correto e cálculo dos contrastes. Em DOM simulado, conferi seleção/retorno das áreas, setas com retorno ao início/fim, Home/End, link de navegação para os combos, abertura por hash e seleção ao receber `hashchange`. Esses resultados não substituem a conferência renderizada em desktop/mobile, ainda pendente.

## Escopo e limite da revisão

Revisão heurística do HTML, CSS, JavaScript, fluxo de conteúdo e cores declaradas. Os contrastes foram calculados pela luminância relativa sRGB. Não houve sessão com usuários, inspeção renderizada, medição de conversão ou auditoria completa de acessibilidade. A ferramenta de navegador havia bloqueado a inspeção de arquivos locais; não contornei essa restrição. Por isso, cortes, sobreposições e posição exata dos elementos na tela ainda precisam de conferência visual.

Nenhum arquivo de implementação foi alterado durante o diagnóstico inicial. As alterações posteriores constam do registro de correções acima.

## Avaliação geral

A composição tem uma linguagem definida: tipografia condensada, alternância entre preto e papel claro, vermelho como destaque e navegação por áreas. A evolução deve concentrar essa linguagem nos produtos e na escolha do visitante. Hoje, a página exige rolagem e cliques que acrescentam pouca informação à decisão.

Os três pontos prioritários são a coerência entre a área selecionada e os cursos exibidos, a legibilidade dos controles e a continuidade dos CTAs. A ausência de valores, datas e links finais é uma dependência de conteúdo já conhecida; não deve ser resolvida com dados inventados.

## Achados priorizados

### 1. Alta — seleção de área não controla a oferta exibida

**Evidência:** `index.html:47–61` e `script.js:5–11`. O JavaScript alterna somente os dois painéis. A seção `#combos` está fora deles e permanece visível com Educação Física selecionada.

**Impacto:** o visitante escolhe Educação Física e continua encontrando produtos de Educação. A interface promete um filtro que o conteúdo não acompanha.

**Recomendação:** associar o conjunto de cursos à área selecionada. Ao entrar pelo link de Educação, selecionar Educação e apresentar os combos correspondentes. Para campanhas segmentadas, permitir acesso direto à área adequada. No modelo Educação Física, mostrar apenas o conjunto confirmado daquela área; enquanto ele não existir, identificar o acesso como catálogo geral.

### 2. Alta — contraste insuficiente em texto e foco

**Evidência:** cores declaradas em `styles.css:1`, `:50`, `:68` e `:72`.

| Aplicação | Cores | Contraste calculado | Referência |
|---|---|---:|---|
| Texto do CTA vermelho | `#ffffff` sobre `#ed2835` | 4,24:1 | Texto normal: mínimo 4,5:1 |
| Texto da aba vermelha no mobile | `#ffffff` sobre `#ed2835`, 15px em negrito | 4,24:1 | Texto normal: mínimo 4,5:1 |
| Texto secundário da seção clara | `#716e66` sobre `#f3f0e8`, 12–14px | 4,47:1 | Texto normal: mínimo 4,5:1 |
| Contorno de foco dos detalhes | `#9a1120` sobre `#111110` | 2,23:1 | Indicador de estado: mínimo 3:1 |
| Contorno de foco da aba ativa | `#9a1120` sobre `#ed2835` | 2,00:1 | Indicador de estado: mínimo 3:1 |

**Impacto:** dificulta leitura e localização do foco para pessoas com baixa visão ou que usam teclado. A aba desktop tem texto de 20px em negrito, que pode usar a exceção de texto grande; o problema do texto da aba se aplica ao estilo mobile de 15px.

**Recomendação:** separar o vermelho decorativo do vermelho usado sob texto pequeno, escurecer o texto secundário claro e definir foco conforme a superfície. Um contorno com duas cores permite manter o foco perceptível em superfícies claras, escuras e vermelhas.

Referências: [WCAG 2.2 — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [contraste de componentes e estados](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Os cálculos não constituem uma declaração de conformidade da página inteira.

### 3. Média — os expansores não acrescentam informação útil

**Evidência:** `index.html:64–66`. “Ver combinação” repete os nomes de curso e livro que estão imediatamente ao lado, seguido do aviso de condições pendentes.

**Impacto:** cria uma expectativa de detalhes e exige um clique com pouco retorno. Os três controles também têm o mesmo nome, o que dificulta distingui-los fora do contexto visual.

**Recomendação:** deixar curso + livro inteiramente visíveis. Usar o expansor somente para informações adicionais confirmadas, como programa, duração, modalidade e conteúdo do combo. Identificar cada controle pelo curso. Se não houver informação adicional, remover a interação redundante.

### 4. Média — a arte precede a proposta de valor no mobile

**Evidência:** no DOM, o bloco `.hero-art` vem antes de `.hero-bottom`, que contém a mensagem de benefício e a ação principal. Em `styles.css:189–204`, o layout vira uma coluna e mantém uma arte com altura mínima de 194px antes da mensagem.

**Impacto esperado:** mais rolagem até compreender o benefício e chegar ao CTA do hero. Existe um CTA no cabeçalho, mas ele usa o rótulo genérico “Ver formações”. O posicionamento exato na primeira tela não foi medido em navegador.

**Recomendação:** ordenar o mobile como campanha → proposta de valor → escolha da área/CTA → arte complementar. Reservar a escala mais expressiva da tipografia para desktop e reduzir a altura decorativa em telas estreitas.

### 5. Média — a imagem de academia representa apenas uma das áreas

**Evidência:** `.hero-art` usa `assets/academia.webp` antes de qualquer seleção de área; o painel de Educação usa somente tipografia e os combos não mostram os livros.

**Impacto esperado:** a primeira impressão favorece Educação Física, mesmo para visitantes interessados em Educação. Os livros ficam menos reconhecíveis sem as capas reais.

**Recomendação:** usar uma abertura neutra entre as áreas ou trocar a ambientação conforme a entrada/seleção do visitante. Quando forem fornecidas capas finais autorizadas, incorporá-las aos combos. Até lá, manter os títulos como identificação, sem fabricar capas oficiais.

### 6. Média — informações de produto ficam pequenas no celular

**Evidência:** `styles.css:235` define o título do livro em 11px; condições de participação usam 10px em `.area-copy small`; legendas variam entre 8px e 12px.

**Impacto esperado:** nomes de livros e ressalvas relevantes exigem mais esforço de leitura. Não há um tamanho mínimo de fonte universal estabelecido pela WCAG; esta é uma recomendação de legibilidade.

**Recomendação:** usar 14–16px para informação de produto e 12–14px para notas úteis. Reservar tamanhos menores para decoração sem conteúdo necessário. Conferir a página com zoom de 200%, telas de 320px, 390px e 768px e os nomes mais longos.

### 7. Dependência de conteúdo — o caminho de conversão ainda não tem conclusão definida

**Evidência:** o CTA de Educação Física abre o catálogo institucional geral em outra aba (`index.html:51`); os combos não têm destino de matrícula; o CTA final retorna à seleção de área (`index.html:70`).

**Impacto:** o protótipo permite explorar a composição, mas ainda não permite avaliar a jornada completa até uma matrícula, atendimento ou outra conversão acordada. O catálogo geral exige nova busca e pode exibir produtos não participantes.

**Recomendação:** confirmar qual é a ação principal da campanha e definir os destinos específicos por curso. Depois, alinhar hero, cards e fechamento a essa ação. Não apontar o visitante a um checkout genérico ou inventar descontos e condições para completar a tela.

### 8. Conteúdo para validação — promessas amplas sem sustentação apresentada

**Evidência:** “resultado imediato” no hero e “A maior Black Friday” nos dois painéis.

**Impacto esperado:** o visitante não recebe explicação concreta do resultado prometido ou do critério de comparação. A copy veio do material de trabalho, portanto qualquer revisão editorial precisa respeitar o processo de aprovação do card.

**Recomendação:** pedir validação ao responsável pela copy. Com os dados corretos, priorizar benefício específico, o que está incluído e público da formação. Não adicionar avaliações, selos ou números de alunos sem fonte e autorização.

## Recursos que vale preservar

- Uma única família de tratamento visual, com variações claras entre áreas.
- Navegação por abas com setas, Home e End, `aria-selected` e associações entre controles e painéis.
- Link para pular ao conteúdo e respeito a movimento reduzido.
- Controles nativos de expansão, sem bibliotecas adicionais.
- Identificação do protótipo e ausência de preços antigos, captura de dados ou matrícula simulada.

## Ordem sugerida para a próxima iteração

1. Corrigir a associação entre área selecionada e ofertas.
2. Ajustar contrastes de texto e foco.
3. Reordenar o hero mobile e aumentar a leitura dos dados de produto.
4. Remover os expansores redundantes ou preenchê-los com informação adicional aprovada.
5. Confirmar a ação de conversão, condições e destinos de cada oferta.
6. Adicionar os assets finais aprovados e conferir o percurso nos dois modelos em desktop/mobile, com teclado e zoom.

Aceite visual posterior: não haver texto cortado ou sobreposto, rolagem horizontal inesperada, controles indistinguíveis ou conteúdo de outra área após a seleção. Essa conferência segue pendente; o relatório identifica o que foi demonstrado pelo código e o que ainda é uma hipótese de uso.
## Iteração de identidade e imagens — 23/10/2026

A pedido do usuário, a composição com Impact foi substituída pelo kit oficial Phorte e fontes Poppins locais. A página passa a usar hero fotográfico gerado com GPT, fotografias de apoio, imagens dos materiais dos cursos e capas oficiais dos três livros. As imagens permanecem visíveis no mobile. Os combos mantêm a seleção de Educação e seus links apontam às páginas institucionais específicas.

Conferência de fonte realizada: referências locais e âncoras existentes; IDs únicos; imagens com `alt`; aninhamento HTML e delimitadores CSS; JavaScript aceito por `node --check`; kit CSS idêntico ao original. São 11 arquivos distintos de imagem referenciados, aproximadamente 2,83 MB no total (incluindo os recursos dos painéis ocultos). Isso não é uma medição de desempenho em navegador.

A conferência visual renderizada continua pendente por limitação de acesso ao arquivo local na ferramenta de navegador desta sessão. Preços, descontos, elegibilidade, prazo e checkout da campanha dependem de confirmação. Não houve publicação nem alteração de status/responsável.

Fontes dos assets e prompt da geração: [ASSETS-E-DESIGN-SYSTEM.md](ASSETS-E-DESIGN-SYSTEM.md).
