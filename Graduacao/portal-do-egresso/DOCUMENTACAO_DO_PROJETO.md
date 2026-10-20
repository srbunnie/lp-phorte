# Portal do Egresso da Faculdade Phorte

**Documentação do projeto e proposta de evolução**  
**Versão:** 1.0 · **Data:** 20 de outubro de 2026  
**Status:** protótipo visual estático; operação institucional e sistema de produção ainda precisam ser definidos.

## Resumo executivo

O projeto começou como uma página de apresentação e atualização cadastral para egressos, relacionada ao processo de recredenciamento institucional previsto para 2027 no briefing recebido. A página atual é uma prévia estática: não envia nem armazena dados, não dispara e-mails e não possui área interna. Ela serve para validar linguagem, conteúdo e jornada com Marketing, TI e CPA.

A base regulatória que merece atenção é o **Indicador 3.7 do Instrumento de Avaliação Institucional Externa do Inep para recredenciamento**, que avalia a política institucional de acompanhamento de egressos. A Lei do SINAES estabelece dimensões de avaliação institucional, mas não determina que a Faculdade mantenha um portal ou formulário específico. Portanto, uma página sozinha não atende ao indicador: a instituição precisa de política, mecanismo recorrente, análise dos resultados e evidências de melhoria.

A recomendação é construir primeiro um processo simples, governado pela instituição e útil para o egresso: convite próximo à conclusão do curso, atualização de perfil/pesquisa breve, confirmação por e-mail e acompanhamentos periódicos. Uma área interna de análise deve ser planejada junto com a coleta real. Login e comunidade com benefícios só devem entrar quando houver serviços concretos que justifiquem essa complexidade.

## 1. Solicitação e contexto

O e-mail de projeto encaminhado por Marketing solicita uma página de egressos para apoiar o relacionamento com ex-alunos e o ciclo de recredenciamento de 2027. O DOCX anexo reúne ideias de cadastro, pesquisa de trajetória, comunicação, benefícios, oportunidades, histórias, relatórios e gestão. Esses itens são **propostas do briefing**, não requisitos legais nem autorização para divulgar benefícios, resultados ou serviços ainda não confirmados.

A solicitação institucional pode ser traduzida em duas frentes:

1. explicar ao egresso por que a Faculdade quer manter contato e oferecer um ponto de entrada claro;
2. definir um processo que permita acompanhar, de forma periódica, continuidade acadêmica, inserção profissional e relação entre formação e trabalho, usando os achados para melhorar a instituição.

## 2. Estado atual do projeto

O projeto está em `Graduacao/portal-do-egresso/` e contém uma landing page responsiva com navegação por seções, texto institucional, espaços editoriais em validação e campos demonstrativos para nome, e-mail pessoal, curso, ano de formação e situação profissional.

O protótipo não possui backend, banco de dados, autenticação, integração acadêmica, analytics, CRM, envio de formulário ou e-mail. A mensagem ao lado dos campos avisa que a página não coleta dados e orienta a não inserir dados pessoais reais. Benefícios, vagas, histórias e devolutivas da CPA estão sinalizados como conteúdo em preparação ou dependente de validação.

**Este código não deve ser usado para uma coleta real.** Antes de retirar o aviso de demonstração, é necessário aprovar finalidade, campos, base legal, aviso de privacidade, responsáveis, infraestrutura e fluxo de atendimento aos direitos dos titulares.

## 3. Base regulatória e o que ela significa

| Referência | O que estabelece | Implicação para o projeto |
| --- | --- | --- |
| Lei nº 10.861/2004, que institui o SINAES | A avaliação institucional considera dimensões como planejamento e autoavaliação, comunicação com a sociedade e políticas de atendimento aos estudantes (art. 3º). | A lei não exige uma página, um portal de login ou um formulário específico de egresso. A instituição deve organizar sua avaliação e demonstrar processos e resultados. |
| Instrumento de Avaliação Institucional Externa (IAIE) do Inep, recredenciamento, Indicador 3.7 | Avalia se a política institucional garante acompanhamento de egressos e atualização sistemática de informações sobre continuidade acadêmica ou inserção profissional. Nos conceitos mais altos, considera comparação entre atuação profissional e formação recebida e o uso dos achados para melhorias. | É necessário um mecanismo contínuo e evidências de análise e retorno institucional. O site pode ser uma parte do mecanismo, mas não o substitui. |
| Lei nº 13.709/2018 (LGPD) | Rege o tratamento de dados pessoais. Exige finalidade definida, necessidade, transparência, segurança e atendimento aos direitos dos titulares, entre outros princípios e deveres. | Antes de coletar dados, definir controlador, finalidade, base legal, aviso de privacidade, acesso, retenção, segurança e canal de direitos. Consentimento não é a única base legal possível; a escolha deve ser validada para cada finalidade. |

Na página oficial do Inep consultada em 20/10/2026, o instrumento de recredenciamento de 2017 aparece como **vigente**. A CPA e a área regulatória devem confirmar qual instrumento e quais evidências serão usados especificamente no processo da Faculdade em 2027.

O ponto central é a diferença entre **obrigação de avaliar uma política/processo** e **escolha de uma solução digital**. A documentação e o sistema devem tornar o processo demonstrável: calendário de contato, registros atualizados, análise por curso/coorte, comparação formação-trabalho quando possível, decisões e ações de melhoria acompanhadas.

## 4. Quando o egresso visita a página

A landing page é o ponto de entrada e de explicação da iniciativa, não necessariamente uma área que o egresso precisa visitar todo mês.

1. **Conclusão do curso / colação de grau:** a Faculdade apresenta o programa durante a comunicação de encerramento e envia um convite para o e-mail pessoal; QR code em evento ou material de conclusão pode levar à mesma página.
2. **Convite:** a mensagem explica a finalidade, o tempo estimado, como os dados serão usados e que a participação em comunicações promocionais, se houver, é separada.
3. **Página pública:** o egresso entende o propósito, consulta privacidade, decide participar e inicia a atualização ou pesquisa.
4. **Formulário de produção:** a pessoa confirma sua identidade por mecanismo proporcional (por exemplo, link de verificação por e-mail) e revisa curso/ano de formação, de preferência pré-preenchidos a partir do cadastro acadêmico.
5. **Confirmação:** o sistema acusa o recebimento e envia um comprovante transacional. Se houver conta ou link seguro de atualização, explica como corrigir os dados.
6. **Acompanhamento:** uma pesquisa curta pode ser enviada após 6–12 meses e depois em uma periodicidade definida pela CPA. A frequência precisa ser testada em piloto para evitar fadiga.
7. **Relacionamento contínuo:** quem optou separadamente por receber notícias pode receber newsletter, oportunidades confirmadas e atividades da comunidade. O egresso deve conseguir ajustar preferências e solicitar atendimento sobre seus dados.

A janela logo após a formação é recomendada porque o egresso ainda reconhece a comunicação da Faculdade e entende o contexto do pedido. Convites posteriores podem reativar o relacionamento, mas devem explicar por que o cadastro está sendo atualizado naquele momento.

## 5. Referências de outras instituições

| Instituição | Fluxo público observado | Aprendizado para a Phorte |
| --- | --- | --- |
| Alumni USP | Desde novembro de 2025, o serviço integra o Portal de Serviços da USP. A orientação diferencia novos cadastros de recadastros; parte dos usuários recebe instruções por e-mail, acessa com número USP e senha única, completa o formulário e salva os dados. Há serviços associados ao ambiente. | O modelo com login faz sentido quando há serviços reais para consultar depois. Exige suporte a recuperação e atualização de e-mail. |
| Sempre UFMG | A UFMG apresenta o programa como relacionamento contínuo com egressos, divulgação de educação continuada, conexão e oportunidades. A universidade mantém sistemas relacionados a perfil e rede de carreira. | O programa pode ser maior que um cadastro. Separar o relacionamento institucional da área de perfil profissional ajuda a explicar cada finalidade. |
| FGV | A página pública oferece atualização cadastral e mantém um formulário separado para receber a newsletter. | Cadastro de egresso e assinatura de notícias aparecem como ações distintas. A Phorte deve manter escolhas separadas também. |

Os fluxos podem mudar. As referências foram consultadas em outubro de 2026 e servem como exemplos de operação, não como padrões obrigatórios ou avaliação de conformidade.

## 6. Proposta de jornada e conteúdo

### Página pública

- explicar a comunidade e a finalidade do acompanhamento;
- indicar benefícios e serviços apenas quando aprovados, disponíveis e com responsável operacional;
- divulgar vagas somente com origem, prazo e processo de validação;
- apresentar pesquisa da CPA e devolutivas apoiadas por dados aprovados;
- publicar histórias apenas com autorização e revisão da pessoa retratada;
- deixar claro o que ocorre após o envio e oferecer contato para dúvidas e direitos de privacidade.

### Cadastro e pesquisa inicial

Começar com o mínimo necessário. Sugestão para desenho com CPA e encarregado de dados:

- identificar o egresso e confirmar um e-mail pessoal;
- usar curso e ano de conclusão vindos do sistema acadêmico, permitindo correção;
- perguntar se está trabalhando, estudando ou buscando oportunidade;
- perguntar se a atividade profissional tem relação com a formação e, em uma escala curta, como a formação contribuiu;
- incluir campo aberto opcional para comentário, com orientação para não inserir dados sensíveis;
- oferecer uma opção separada e desmarcada por padrão para receber newsletter e comunicações de relacionamento, conforme base legal aprovada.

CPF, salário, nome de empresa, telefone, endereço, perfil de rede social e currículo não devem ser pedidos por conveniência. Só incluir um campo quando houver finalidade, acesso, prazo de retenção e justificativa definidos. Evitar campos obrigatórios que não sejam essenciais para completar a finalidade declarada.

### E-mails

- **Convite:** explicar a iniciativa, motivo do contato, duração estimada e link oficial.
- **Confirmação do cadastro:** informar recebimento, finalidade e como pedir correção ou exercer direitos. Este e-mail não deve incluir propaganda sem autorização/base própria.
- **Lembrete:** no máximo uma tentativa planejada por ciclo, com opção simples de não receber novos lembretes.
- **Acompanhamento:** convidar para atualizar a trajetória em período definido pela CPA, com perguntas curtas e objetivo explícito.
- **Newsletter:** envio separado, conforme preferência registrada; guardar quando e como a escolha foi feita e disponibilizar descadastro.

## 7. Área interna e operação após o preenchimento

A instituição precisa de uma área restrita para operar o processo. Recomenda-se iniciar com quatro capacidades:

1. **Gestão de campanhas:** configurar coortes, períodos, convites, lembretes e textos aprovados.
2. **Gestão de registros:** consultar ou corrigir cadastro conforme perfil de acesso, registrar confirmação e processar solicitações do titular.
3. **Painel da CPA:** acompanhar taxa de resposta por curso e turma, continuidade de estudos, inserção profissional, aderência entre trabalho e formação e temas recorrentes.
4. **Evidências e melhoria:** exportar relatórios autorizados, registrar análise, decisão, ação implementada, responsável e data de revisão.

A CPA precisa acessar dados e relatórios compatíveis com sua finalidade analítica. Marketing pode administrar conteúdo e preferências de comunicação sem receber automaticamente respostas individuais de empregabilidade. TI opera segurança e disponibilidade; Registro Acadêmico valida a informação acadêmica; encarregado/área jurídica orienta privacidade e bases legais. A direção institucional designa formalmente o dono do programa e aprova a política.

O painel deve usar contas individuais, autenticação multifator para operadores, controle por função, trilha de auditoria, exportação restrita, transmissão criptografada e política de cópia de segurança. Relatórios de apresentação devem agregar ou anonimizar os resultados quando possível, com cuidado especial em turmas pequenas para reduzir reidentificação.

## 8. Arquitetura recomendada para uma fase de produção

A arquitetura abaixo é uma proposta conceitual, não uma decisão de tecnologia:

```text
Convite institucional -> landing page -> formulário/API segura -> base de egressos
Formulário/API -> serviço de e-mail transacional
Base de egressos -> painel autenticado (CPA / operação) -> relatórios e ações
Sistema acadêmico -> validação mínima de curso e conclusão
```

A página atual pode continuar como camada pública. Para dados reais, o envio precisa ir a um serviço no servidor com validação, proteção contra abuso e registro de consentimentos/preferências quando aplicável. O navegador não deve ser a base de armazenamento nem conter credenciais. Se o sistema acadêmico permitir, a confirmação de curso e conclusão deve ser feita por integração ou validação segura, evitando pedir mais identificadores do que o necessário.

Um login completo para egressos deve ser uma fase posterior e só se justifica se a instituição lançar serviços que exijam acesso recorrente. Para uma pesquisa pontual, confirmação por e-mail e link de atualização com prazo limitado podem ser suficientes, sujeitos à avaliação de segurança e privacidade.

## 9. Fases e critérios de sucesso

### Fase 0 — Governança

- nomear o dono institucional do programa e a relação entre CPA, Marketing, TI, Registro Acadêmico e encarregado;
- validar a política, os dados necessários, as finalidades, bases legais, aviso de privacidade, retenção e canal de direitos;
- definir a evidência que a CPA precisa apresentar no ciclo de avaliação.

### Fase 1 — Piloto funcional

- lançar formulário com confirmação, comunicação transacional e coleta mínima;
- pilotar em um grupo/coorte, medir conclusão, entregabilidade e dúvidas;
- revisar textos, tempo de preenchimento e perguntas antes de ampliar.

### Fase 2 — Acompanhamento e análise

- implantar painel restrito, relatórios por coorte/curso e registro das decisões;
- estabelecer calendário de atualização e retorno sobre melhorias;
- avaliar cobertura, taxa de resposta, consistência e utilidade dos dados.

### Fase 3 — Serviços à comunidade

- avaliar newsletter, educação continuada, oportunidades, eventos, rede profissional e benefícios;
- publicar cada serviço apenas quando houver operação, responsável, regras e conteúdo confirmados;
- decidir se serviços concretos justificam uma conta de egresso.

As métricas devem ser definidas com CPA e direção. Uma base inicial inclui percentual de contatos válidos, taxa de resposta por coorte, completude das respostas essenciais, distribuição de continuidade acadêmica e inserção profissional, relação percebida entre trabalho e formação, ações de melhoria registradas e percentual de ações concluídas. Métricas de marketing não substituem os indicadores acadêmicos e não devem ser usadas para inferir resultados a partir de amostras pequenas sem qualificação.

## 10. Decisões pendentes

- Quem será o responsável institucional pelo programa de egressos e quem aprova a política?
- Qual pergunta ou conjunto mínimo de perguntas a CPA precisa responder para o recredenciamento de 2027?
- Qual população e quais cursos entram no primeiro piloto? Como confirmar a conclusão acadêmica?
- Quem será controlador dos dados, qual base legal se aplica a cada finalidade e qual canal atenderá os titulares?
- Qual prazo de retenção e quais equipes terão acesso a dados identificáveis?
- A Faculdade oferecerá serviços reais que justifiquem uma área autenticada ou começará com pesquisa e atualização pontuais?
- Quais benefícios, oportunidades, histórias e comunicações estão aprovados e quem os mantém atualizados?

## Referências

- [Lei nº 10.861/2004 — SINAES, especialmente arts. 2º e 3º](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.861.htm)
- [Inep — Instrumentos de Avaliação de 2017, situação publicada dos instrumentos](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/avaliacao-in-loco/instrumentos-de-avaliacao/2017)
- [Inep — IAIE de recredenciamento, Indicador 3.7](https://download.inep.gov.br/educacao_superior/avaliacao_institucional/instrumentos/2017/IES_recredenciamento.pdf)
- [Lei nº 13.709/2018 — LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Alumni USP — como cadastrar ou recadastrar no Portal de Serviços](https://alumni.usp.br/como-se-cadastrar-ou-recadastrar-no-novo-servico-alumni-usp/)
- [Alumni USP — FAQ](https://alumni.usp.br/faq/)
- [UFMG — programa Sempre UFMG](https://www.ufmg.br/copi/sempreufmg/)
- [UFMG — informações para estudantes egressos](https://www.ufmg.br/a-universidade/informacoes-por-publicos/informacoes-para-estudantes-egressos/)
- [FGV — Ex-alunos](https://portal.fgv.br/ex-alunos)
