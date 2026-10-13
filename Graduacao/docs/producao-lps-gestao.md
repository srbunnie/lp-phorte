# Produção das quatro LPs de gestão

**Início:** 2026-10-09. **Autorização:** pedido de produção após entrega das copys, arquitetura e revisão de UI. **Base:** [arquitetura aprovada para montagem](arquitetura-lps-gestao.md).

## Escopo de implementação

Produzir quatro previews estáticos independentes e respectivos fragmentos para Elementor. Preservar as quinze seções de cada copy e as matrizes publicadas. Usar o preset Montserrat/Inter, vermelho/vinho, amarelo e superfícies claras das LPs locais.

Decisões de montagem:

- Imagens de fundo temáticas já inventariadas são referências externas de hero; não usar a arte promocional com textos/selos embutidos. Não associar retratos a docentes sem confirmação.
- Docentes apresentados com nome, titulação e bio disponíveis. Coordenação, depoimentos e claims do MEC permanecem fora dos previews até validação específica. Salários incorporados posteriormente por solicitação do usuário; [registro e fontes](salarios-painel-claro.md).
- Não anunciar preço ou turma ainda pendentes. Oferta apresenta formação, duração, modalidades e próximo passo.
- Formulário exclusivamente demonstrativo, sem transmissão, persistência ou integrações. Inscrição oficial usa os destinos do dossiê.
- Implementação nesta sessão, sem publicar ou criar commits. Não acrescentar suíte de testes; o pedido atual é de produção.
- Markdown permanece a fonte editorial. Gerar HTML estático e pacotes Elementor com script local, sem runtime ou dependências de framework nas páginas.

## Sequência de trabalho

1. Criar fontes comuns de CSS/JavaScript e renderizador estático a partir dos quatro Markdowns.
2. Gerar páginas independentes, com hero responsivo, ficha, componentes editoriais, grade/FAQ nativos, contato e CTA final.
3. Gerar fragmentos antes/depois do formulário, CSS/JS e instruções para o widget nativo no Elementor.
4. Atualizar índice central, READMEs e estado do projeto; abrir os previews para revisão.

## Estado

Primeiras versões estáticas e pacotes Elementor gerados para os quatro cursos. A base comum utiliza copys Markdown, CSS/JavaScript isolados e um renderizador local. O índice central e os READMEs apontam para os previews.

Não foram executados testes automatizados ou testes de navegador nesta etapa de produção. Aprovação acadêmica/comercial, revisão do resultado visual e configuração de publicação permanecem etapas posteriores.
