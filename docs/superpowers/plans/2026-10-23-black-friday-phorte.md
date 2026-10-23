# Plano de Implementação — Landing Page Black Friday Phorte

> **Para agentes de execução:** use a subskill `superpowers:subagent-driven-development` (recomendada) ou `superpowers:executing-plans` para executar este plano tarefa por tarefa. As etapas usam caixas de seleção (`- [ ]`) para acompanhamento.

**Objetivo:** transformar o protótipo local da Black Friday Phorte em uma landing page estática, clara e visualmente marcante, com dois modelos de campanha e caminhos de conversão coerentes com as ofertas aprovadas.

**Arquitetura:** manter uma página estática em HTML, CSS e JavaScript, com os modelos Educação Física e Educação acessíveis pela navegação por abas que já existe. O mesmo sistema visual serve aos dois modelos; conteúdo, cursos e combinações variam conforme o modelo. Não haverá captura de dados nem integração de produção.

**Stack:** HTML, CSS e JavaScript nativos; assets locais aprovados.

**Especificação:** [Card ClickUp 17tjca24qak](https://app.clickup.com/t/9013299512/17tjca24qak) e `Cursos-Livres/black-friday-extensao/README.md`.

## Restrições globais

- Manter o projeto como protótipo local estático, sem backend, formulário de captura, CRM, analytics, credenciais ou dados reais.
- No modelo Educação Física, preservar a copy e a estrutura existentes; alterar a apresentação visual e ocultar Veterinária, Psicomotricidade, Dança e cursos/eventos presenciais ativos conforme o card.
- No modelo Educação, manter a copy aprovada, ajustar a categoria e apresentar estes combos: Reggio Emilia na Prática Educacional + *Arte e criatividade em Reggio Emilia*; Escuta na Educação Infantil + *Abrir-se à escuta das vozes infantis*; A Organização dos Ambientes: inspirações Reggio e Pikler + *Espaços em Harmonia*.
- Não reutilizar valores, descontos, prazos ou promessas das artes de Black Friday 2025. Só exibir condições comerciais após confirmação atual.
- Não publicar, fazer deploy nem alterar status ou responsáveis no ClickUp durante a execução deste plano.

---

## Mapa de arquivos

- Modificar `Cursos-Livres/black-friday-extensao/index.html`: conteúdo dos dois modelos, hierarquia da oferta, cards e destinos de CTA.
- Modificar `Cursos-Livres/black-friday-extensao/styles.css`: identidade visual, tipografia, composições, estados de interação e responsividade.
- Modificar `Cursos-Livres/black-friday-extensao/script.js`: seleção acessível entre os modelos e comportamentos locais, sem chamadas de rede.
- Modificar `Cursos-Livres/black-friday-extensao/README.md`: registrar fontes aprovadas, condições confirmadas ou pendentes e limites do protótipo.
- Adicionar apenas assets autorizados em `Cursos-Livres/black-friday-extensao/assets/`; não criar capas ou fotos que pareçam oficiais.

## Tarefa 1: fechar o conteúdo da oferta

**Arquivos:** nenhum arquivo de produção; atualizar o README somente após receber os dados confirmados.

- [ ] Reunir com o responsável da campanha o nome final dos cursos elegíveis, oferta por curso, preço regular e promocional, parcelamento, datas e horários de validade, condições de elegibilidade, destino de matrícula e imagens finais de livros/cursos.
- [ ] Confirmar por escrito quais cursos presenciais/eventos devem ficar ocultos no modelo Educação Física, incluindo Vet, Psicomotricidade e Dança.
- [ ] Se algum dado continuar sem confirmação, mantê-lo marcado como pendente no README e não escrever desconto, preço, prazo, estoque ou urgência correspondente na página.
- [ ] Registrar no README a fonte e a data da validação recebida.

**Entrega verificável:** existe uma lista de dados aprovados vinculada a uma fonte identificável; os itens ausentes permanecem explicitamente pendentes.

## Tarefa 2: aplicar a direção visual comum

**Arquivos:** `index.html`, `styles.css`.

- [ ] Manter uma base escura em preto/grafite e superfícies em papel claro; reservar o vermelho Phorte para o CTA principal, destaque de oferta confirmado e pequenos elementos de tensão visual.
- [ ] Criar impacto de pôster editorial com tipografia ampla, recortes geométricos e composição assimétrica, preservando leitura e hierarquia em telas pequenas.
- [ ] Substituir a arte genérica por materiais autênticos autorizados: cursos e capas aprovadas. Enquanto não existirem imagens finais, usar formas tipográficas abstratas sem imitar uma capa real.
- [ ] Deixar no topo uma única mensagem principal, um subtítulo curto e um CTA primário que leve às ofertas da própria página.

**Entrega verificável:** o primeiro bloco identifica a campanha e a ação principal em desktop e mobile, sem depender de preço ou promessa não aprovados.

## Tarefa 3: finalizar o modelo Educação Física

**Arquivos:** `index.html`, `styles.css`, `README.md`.

- [ ] Preservar os textos e a sequência de conteúdo já existentes para Educação Física; não reescrever a copy como parte do redesign visual.
- [ ] Aplicar a direção escura/vermelha com um visual ligado a esporte e movimento usando apenas assets aprovados ou composições abstratas.
- [ ] Filtrar Veterinária, Psicomotricidade, Dança e os cursos/eventos presenciais ativos identificados na Tarefa 1.
- [ ] Garantir que os cards restantes mostrem título, modalidade, condição validada (quando houver) e ação correspondente sem misturar cursos de outra modalidade.

**Entrega verificável:** modelo não apresenta cursos excluídos nem altera a copy aprovada; cada oferta visível tem destino válido ou permanece sem CTA de matrícula.

## Tarefa 4: finalizar o modelo Educação e os três combos

**Arquivos:** `index.html`, `styles.css`, `README.md`, assets aprovados em `assets/`.

- [ ] Manter a copy aprovada e trocar apenas a categoria/modelo para Educação.
- [ ] Apresentar os três combos curso + livro listados nas restrições globais em cards distintos e fáceis de comparar.
- [ ] Usar capas finais fornecidas e aprovadas. Se não houver capas aprovadas, mostrar título e identificação textual do livro em um tratamento editorial neutro, sem gerar arte que se passe por capa.
- [ ] Mostrar preço comparativo, economia, prazo e condições somente quando confirmados na Tarefa 1.

**Entrega verificável:** os três cursos e livros aparecem com seus títulos corretos; nenhum preço ou imagem de capa é inventado.

## Tarefa 5: conectar os CTAs e reduzir dúvidas

**Arquivos:** `index.html`, `script.js`, `styles.css`, `README.md`.

- [ ] Fazer o CTA do hero levar diretamente à seção do modelo selecionado.
- [ ] Trocar os links atuais “Conferir oferta” que levam a `#pendencias` por destino de matrícula aprovado para aquele curso. Enquanto o destino não for fornecido, usar uma ação local identificada como “Ver detalhes do combo” que leve ao conteúdo da oferta, sem simular matrícula.
- [ ] Se houver respostas aprovadas, incluir uma seção curta de dúvidas cobrindo validade da campanha, o que está incluído no combo e como concluir a matrícula; não preencher respostas por inferência.
- [ ] Manter navegação por teclado nas abas (setas, Home e End), estado selecionado acessível e links funcionais sem requisições de rede.

**Entrega verificável:** todo CTA leva a conteúdo ou destino real aprovado; nenhum botão aparenta concluir uma inscrição que o protótipo não executa.

## Tarefa 6: revisar o protótipo e registrar o resultado

**Arquivos:** `index.html`, `styles.css`, `script.js`, `README.md`.

- [ ] Abrir a página localmente em viewport desktop (1440 × 900) e mobile (390 × 844); revisar os dois modelos, a troca de abas, foco de teclado, leitura dos cards e ausência de rolagem horizontal.
- [ ] Conferir manualmente links internos, URLs aprovadas, nomes de cursos e livros, filtros de cursos, estados sem preço e cópia dos avisos de protótipo.
- [ ] Confirmar que o código não envia formulários, não armazena dados e não adiciona serviços externos ou novos scripts remotos.
- [ ] Atualizar o README com como abrir a página, fontes consultadas, decisões visuais e pendências restantes.
- [ ] Revisar `git diff --check` e resumir no card do ClickUp o que foi feito, o que falta e qualquer bloqueio, sem mover status ou responsáveis.

**Entrega verificável:** checklist manual concluído, README reflete o estado observado e card tem registro claro da revisão. A página continua local e não publicada.

## Referências de pesquisa

- [Kind Laundry — estudo de caso com imagens antes/depois](https://lightsout.studio/blogs/case-study/kind-laundry): hierarquia da oferta, prova social e conteúdo próximo do CTA. Os resultados são divulgados pelo estúdio.
- [Exemplos de landing pages de Black Friday](https://www.hostinger.com/in/tutorials/black-friday-landing-page-examples/): ofertas claras, navegação por categoria e FAQ de campanha.
- [Unbounce — princípios e exemplos de landing pages de conversão](https://unbounce.com/landing-page-examples/high-converting-landing-pages/): proposta de valor, hero contextual, CTA focado e prova social.
- [Conceito editorial em preto/vermelho no Dribbble](https://dribbble.com/shots/25718600-E-commerce-Fashion-Landing-Page): referência de composição e cor, não evidência de conversão.
