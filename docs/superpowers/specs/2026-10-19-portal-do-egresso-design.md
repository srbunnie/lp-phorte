# Portal do Egresso — landing page estática

**Data:** 2026-10-19  
**Status:** Design aprovado; aguardando revisão desta especificação.  
**Projeto:** Faculdade Phorte — protótipo navegável no repositório `lp-phorte`.

## Objetivo

Criar uma página pública de apresentação e relacionamento com ex-alunos da Faculdade Phorte, com tom acolhedor e chamadas para atualização cadastral e participação na avaliação institucional. O resultado é um protótipo front-end estático para revisão de Marketing, TI e CPA; não é um serviço de produção nem uma implementação do Portal do Egresso completo.

## Público e tarefa principal

Ex-alunos de cursos da Faculdade Phorte. Ao chegar à página, a pessoa deve reconhecer que continua fazendo parte da comunidade e encontrar um caminho claro para atualizar seus dados ou conhecer as iniciativas para egressos.

## Experiência e conteúdo

A página será uma sequência responsiva com navegação por âncoras e estas seções:

1. **Cabeçalho e hero:** identidade da Faculdade Phorte, mensagem “Sua história com a Faculdade continua aqui” e CTA principal para a área demonstrativa de atualização cadastral.
2. **Conexão com a comunidade:** explica, em linguagem simples, por que manter contato ajuda a Faculdade a acompanhar trajetórias e aprimorar os cursos.
3. **Benefícios:** apresenta a ideia de benefícios para egressos. Cada item ainda não confirmado pela Faculdade deve aparecer claramente como proposta/estruturação ou ficar fora da publicação final.
4. **Oportunidades:** espaço demonstrativo para divulgar vagas e desenvolvimento profissional. Não inventar empresas, vagas ou parcerias; conteúdo fictício deve estar identificado como exemplo.
5. **Escuta da CPA:** explica o convite para compartilhar a experiência de formação e como essa escuta pode informar melhorias. Resultados, dados e ações implementadas só entram com evidência aprovada pela CPA.
6. **Histórias de egressos:** espaço editorial para relatos, sem nomes, fotos, cargos ou depoimentos fictícios. Na ausência de materiais aprovados, apresentar convite para participar ou sinalizar conteúdo em preparação.
7. **Atualização cadastral demonstrativa:** formulário visual para ilustrar o fluxo e os campos previstos. Deve informar junto ao formulário que os dados não são enviados nem armazenados neste protótipo; a interação não pode simular envio bem-sucedido.
8. **Rodapé:** identificação institucional e links aprovados e existentes. Política específica de privacidade para egressos e demais destinos ainda precisam de validação institucional antes de aparecer como links ativos.

A ordem pode ser refinada na implementação para sustentar a narrativa e priorizar o CTA, mantendo cada seção com conteúdo distinto.

## Direção visual

- Seguir a identidade já usada nas landing pages Phorte do repositório: vermelho institucional, amarelo como acento de ação, tons claros e tipografia legível.
- Transmitir pertencimento, continuidade e valorização da trajetória, sem aparência de formulário administrativo ou painel de sistema.
- Usar imagem de comunidade/formação apenas se houver material licenciado e aprovado; caso contrário, trabalhar composição tipográfica e formas gráficas da identidade.
- Garantir layout fluido em celular e desktop, foco visível, navegação por teclado, rótulos associados aos campos e contraste legível.

## Limites técnicos

O README do repositório define todas as páginas como protótipos estáticos: HTML, CSS e JavaScript client-side. Formulários podem existir somente como demonstração visual.

- Sem backend, banco de dados, analytics, CRM, APIs ou integração externa.
- Sem submissão, persistência, envio de e-mail ou armazenamento local do formulário.
- Não usar dados pessoais reais nem credenciais.
- A página e suas instruções devem identificar o formulário como não funcional para coleta real.
- Organizar o projeto como uma landing page independente em `Graduacao/portal-do-egresso/`, incluindo `README.md`, página, estilos, script e materiais locais necessários conforme a convenção do repositório.

## Integridade do conteúdo e regulação

O DOCX e a conversa do Gmail são briefing, não fonte normativa nem autorização para publicar afirmações como fato. O texto público não deverá afirmar que um portal/página específico é requisito legal, nem atribuir notas, resultados, taxas de empregabilidade ou benefícios vigentes sem validação institucional. O INEP publica instrumentos para credenciamento e recredenciamento, e a Lei nº 10.861/2004 estabelece o SINAES e a CPA; a interpretação aplicável à Faculdade deve ser validada pela CPA/área institucional antes de qualquer alegação regulatória pública ([Lei nº 10.861/2004](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.861.htm); [Instrumentos de avaliação do INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/avaliacao-in-loco/instrumentos-de-avaliacao)).

## Fora de escopo

- Portal funcional, login, atualização cadastral de produção ou tratamento de dados pessoais.
- Painel administrativo, exportação CSV/Excel, banco de dados ou integração com sistemas acadêmicos.
- Publicação de vagas, vantagens, indicadores, depoimentos ou devolutivas sem conteúdo fornecido e aprovado.
- Orientação jurídica ou certificação de conformidade regulatória/LGPD.
- Publicação no site institucional ou deploy.

## Critérios de aceite

- A página tem uma narrativa completa, CTA primário claro e navegação funcional entre seções.
- O layout funciona em larguras móveis e desktop sem perda de conteúdo ou ação essencial.
- O formulário é visualmente acessível, não submete nem persiste dados e explica isso junto ao formulário.
- Conteúdo demonstrativo fica identificado e nenhum fato institucional, história, vaga, benefício ou resultado é inventado.
- A página mantém consistência com a identidade Phorte e segue a organização de landing pages prevista no README.
- O conteúdo e os limites do protótipo ficam documentados no README do projeto.
