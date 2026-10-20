# Duas propostas para a home da graduação

Proposta para revisão, 16/10/2026. O usuário solicitou as duas versões: reorganizar a jornada e preservar a ordem das seções. Base comum: [inventário](referencias/INVENTARIO.md) e [comparativo](referencias/COMPARATIVO.md).

**Situação atual:** a direção escolhida passou a ser a estrutura editorial (prévias B e C); ver [README](README.md). A descrição da B abaixo é histórica.

**Atualização de execução:** após o pedido “prossiga”, as duas prévias foram implementadas conforme as estruturas abaixo. Ver [README](README.md), validação (VALIDACAO.md, não versionado) e registro de execução (PROGRESSO.md, não versionado). Este documento preserva a descrição original do desenho; revisão visual/editorial e homologação WordPress continuam posteriores.

## 1. Objetivo e limite desta etapa

Atualizar a home WordPress/Elementor por meio de um protótipo HTML, CSS e JS, facilitando a escolha da graduação e o próximo passo de ingresso/atendimento. Entregar futuramente duas prévias comparáveis e pacotes compatíveis com Elementor.

Esta entrega contém pesquisa e planejamento. As estruturas abaixo são **propostas**; a conversa não estabeleceu aceite do desenho detalhado ou das novas copies.

As duas versões devem compartilhar conteúdo, imagens, nomes e destinos. As diferenças são a ordem, o destaque e a apresentação de cada bloco. Não favorecer uma opção com informações melhores enquanto a outra fica com conteúdo incompleto.

## 2. Comparação rápida

| | A — Jornada reorganizada | B — Ordem atual preservada |
| --- | --- | --- |
| Prioridade | Encontrar curso, entender a rotina e escolher o ingresso | Modernizar a experiência conhecida, preservando a sequência editorial |
| Cursos | Sete cards em grade, logo após hero/apresentação curta | Sete abas/painéis dentro do bloco de apresentação, como na posição atual |
| Modalidades | Bloco explicativo próprio depois dos cursos | Explicação no banner de modalidades já existente |
| Ingresso e bolsas | Bloco próprio, antes das provas institucionais | Atalhos contextuais dentro do bloco de atendimento, sem nova seção deslocando a ordem |
| Prova | Depoimentos antes de institucional/infraestrutura | Institucional e infraestrutura antes dos depoimentos |
| Atendimento | Depois das provas, seguido por FAQ e notícias | Depois dos depoimentos, antes de parceiros/notícias |
| Vantagem | Caminho mais direto para quem chega procurando uma graduação | Menor mudança de organização e comparação direta com o WordPress atual |
| Custo editorial | Exige revisar textos de ingresso, modalidades e FAQ | Exige menos seções novas; mantém repetição da chamada de cursos |

Recomendação inicial: A para avaliar clareza de escolha e progressão de decisão; B como alternativa conservadora de estrutura. Isso é uma hipótese de UX, não um resultado de teste ou de conversão.

## 3. Opção A — jornada reorganizada

Fluxo: **campanha → curso → rotina → ingresso → experiências reais → instituição → orientação → dúvidas → conteúdo**.

| Posição | Seção | Conteúdo e ação | Origem / mudança |
| --- | --- | --- | --- |
| 1 | Cabeçalho único | Marca, Cursos de graduação, Pós, Cursos Phorte, instituição/serviços, Portal e CTA de inscrição | Consolida os menus atuais; portais utilitários separados dos CTAs comerciais |
| 2 | Hero de campanha | Campanha 2027 e segundo slide atual; CTA contextual para catálogo ou inscrição com texto coerente | Reaproveita o banner existente. Não acrescentar campanhas ou slide genérico do protótipo da pós |
| 3 | Encontrar minha graduação | Apresentação curta e filtros por nome/modalidade; resultado nos sete cards da própria página | Reorganiza o bloco de sete abas; busca é proposta nova para a graduação HTML |
| 4 | Sete cursos | Grade 3/2/1, com todos os cursos acessíveis, modalidade e link real | O banner posterior de Conheça nossos cursos vira introdução deste bloco, reduzindo repetição |
| 5 | Como estudar | Presencial, Semipresencial, EAD, Online ao vivo; explicações curtas e condicionadas à oferta de cada curso | Desdobra as modalidades já citadas na home, com apoio do protótipo Next |
| 6 | Como ingressar | Vestibular, ENEM, transferência, segunda graduação; link de bolsas e condições nos serviços existentes | Seção adicionada à home; conferir as páginas públicas antes de finalizar copy |
| 7 | Quem estuda aqui | Relatos/vídeos reais da home, com nome e curso; sem pessoas demonstrativas | Move os depoimentos para antes do institucional |
| 8 | Conheça a Faculdade | Vídeo institucional e apresentação revisada | Não publicar nota máxima sem escopo e prova; não atribuir toda a história do grupo à Faculdade |
| 9 | Infraestrutura | Sede e, após validação, demais endereços e fotos | Evita transformar quatro cartões do protótipo da pós em quatro unidades confirmadas |
| 10 | Parceiros | Oito logos sem descrição de benefício inventada | Move antes do atendimento; formato pode ser faixa estática/quebrável no mobile |
| 11 | Orientação para sua escolha | Mesmo convite aos consultores e campos da fonte; no Elementor, slot para formulário nativo | Integração real preservada em widget próprio; alternativa WhatsApp existente |
| 12 | Dúvidas principais | Escolha do curso, formatos, ingresso e bolsas; links para páginas reais | Seção nova, com redação a validar; sem inventar equivalências, regras ou valores |
| 13 | Notícias | Três cards estáticos da coleta, com link para blog | Mesma seleção da opção B; revisão antes da publicação |
| 14 | Rodapé | Serviços, transparência, cursos, contato, redes, políticas e e-MEC | Família visual da pós; dados da graduação |

Para apenas sete cursos, a grade é mais fácil de varrer que vários carrosséis por área. Não propor áreas complexas ou um backend de busca só para reproduzir a estrutura da pós. No celular, filtros ficam empilhados, contagem de resultados e limpar filtros ficam acessíveis, e os links funcionam mesmo sem JavaScript.

## 4. Opção B — ordem atual preservada

Fluxo mantido: **campanha → apresentação/cursos → chamada de cursos → institucional → infraestrutura → depoimentos → atendimento → parceiros → notícias**.

| Posição | Seção | Atualização proposta | Correspondência atual |
| --- | --- | --- | --- |
| 1 | Cabeçalho | Um sistema de navegação, com submenus e acesso mobile claro | Cabeçalho `51556` |
| 2 | Hero | Mesmo conteúdo de campanha de A, com responsividade e controles revisados | `11a76e2` |
| 3 | Apresentação + cursos | Título e apresentação revisados; sete abas acessíveis; painel de cada curso com modalidade e CTA real | `2c7cd9fa` |
| 4 | Banner de cursos/modalidades | Mantém a seção e a imagem, refaz hierarquia e explica formatos com mais clareza | `638b7cb3` |
| 5 | Institucional | Texto revisado, vídeo por clique, CTA sobre nós | `d2a0c` |
| 6 | Infraestrutura | Fotos, navegação e informações legíveis; mesmos critérios editoriais de A | `5d5350ff` |
| 7 | Depoimentos | Relatos e vídeos reais, carrossel/grade acessível e conteúdo no HTML | `73bd0488` |
| 8 | Atendimento | Convite à orientação; campos atuais em slot nativo; links de ingresso/bolsas como apoio neste bloco | `53b5f972` |
| 9 | Parceiros | Oito logos, com alternativas textuais e sem repetição de clones | `527a0cda` |
| 10 | Notícias | Mesmos três artigos da opção A | `7cdcdce9` |
| 11 | Rodapé | Serviços e transparência preservados, no visual comum | Rodapé `31347` |

Esta versão não ganha uma seção de FAQ ou de ingresso em outra posição. Isso alteraria a comparação de preservar a sequência. Abas podem quebrar em linhas ou se tornar uma seleção acessível no celular; os cursos não devem depender de hover ou carregamento remoto para aparecer.

Conteúdo antigo oculto e contêineres vazios não fazem parte da sequência editorial a preservar. O bloco oculto Phorte na mídia continua catalogado como evidência e não entra automaticamente em nenhuma versão.

## 5. Decisões comuns de conteúdo

- Mesmos sete cursos, slugs e modalidades cadastradas; excluir o registro de teste.
- Mesma coleção editorial de depoimentos, deduplicada por pessoa/vídeo, com rotação manual acessível. A amostra varia na origem; fixar a seleção no arquivo de conteúdo para permitir revisão.
- Mesmo hero e assets de campanha nas duas prévias. O CTA atual aponta ao catálogo; sugerir Conhecer as graduações para esse destino e Iniciar inscrição para o chatbot. Redação proposta, não alteração já executada.
- Notícias como fotografia estática do dia; consultas em tempo real poderão ser uma etapa posterior.
- Sem preços, promessas de bolsa, nota MEC geral, empregabilidade garantida ou números de formados não validados.
- Nomes de cursos, pessoas, instituições e citações preservados. Correções de texto institucional e rótulos podem ser propostas, sem reescrever depoimentos como falas diferentes.
- Endereços divergentes permanecem como pendência no material de revisão. Para uma prévia apresentável antes da confirmação, a opção mais segura é mostrar a sede Rui Barbosa e o contato geral em ambas; demais locais não podem ser anunciados como oferta acadêmica confirmada.

## 6. Arquitetura HTML/CSS/JS para Elementor

Um único conteúdo estruturado e componentes compartilhados. Gerar duas páginas HTML independentes por ordem/padrão de catálogo, com o mesmo CSS base e módulos de comportamento.

Separar três peças: **cabeçalho, home e rodapé**. Cabeçalho e rodapé comuns às duas propostas; home A e B empacotadas separadamente. Na implementação, os arquivos de geração, estilos e scripts são fonte; widgets e páginas resultantes são gerados.

Para o formulário de atendimento, gerar os trechos antes/depois e reservar um widget Elementor Form entre eles. O protótipo exibe a composição visual sem enviar dados, com indicação curta de prévia. Não transportar tokens, IDs ocultos de envio ou AJAX do formulário atual para HTML estático.

Busca/filtro inicial: JS local sobre os sete cursos, sem API em runtime e sem enviar parâmetros a uma rota WordPress não verificada. No caminho B, a seleção dos cursos é feita pelas sete abas; no A, por busca/modalidade e grade. Uma integração Angie de graduação, se pedida posteriormente, terá pasta e nome próprios; `[phorte_pos_search]` e `[category_dropdown]` permanecem intactos.

Os IDs da graduação usam prefixo `hg-`, por exemplo `hg-cabecalho`, `hg-main`, `hg-cursos`, `hg-rodape`; classes também `hg-`. Isso evita colisão com a pós (`hp-`) e com o banner existente (`phorte-`). Ao reaproveitar o banner, manter seus seletores próprios e garantir uma única instância por página.

## 7. Critérios de comparação e aceite

1. Em desktop e celular, localizar qualquer um dos sete cursos e abrir seu destino.
2. Distinguir curso/modalidade de turma/preço/matrícula confirmada.
3. Encontrar inscrição, atendimento e serviços de aluno sem ambiguidade de destino.
4. Ler e operar menu, filtros/abas, hero e vídeos por teclado/toque.
5. Nenhum bloco relevante fica vazio esperando plugin externo.
6. Sem overflow horizontal, mídia quebrada ou mudança abrupta quando Poppins carrega.
7. A ordem B coincide com o inventário; A segue a jornada descrita e documenta as seções novas.
8. A e B usam o mesmo inventário, sem diferenças de informação que prejudiquem a avaliação da estrutura.

A comparação inicial será editorial e de usabilidade. Não declarar uma vencedora por conversão sem teste com visitantes e mensuração própria.

## Refinamento aprovado por solicitação direta — 16/10/2026

O usuário escolheu B e solicitou: opções de curso em faixa contínua com progresso, duas unidades, depoimentos com texto real visível truncado em duas linhas e expansão por clique, contato compacto conforme referência e parceiros em marquee contínuo. Essas alterações foram aplicadas em B, mantendo A como composição alternativa. Os nomes e endereços das duas unidades vieram do inventário da home; o usuário confirmou a existência de duas unidades.
