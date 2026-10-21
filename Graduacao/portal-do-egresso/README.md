# Portal do Egresso — Faculdade Phorte

**Status:** prévia estática para revisão institucional. Não é um serviço de produção.

## Objetivo

Landing page enxuta para apresentar a comunidade de egressos da Faculdade Phorte e mostrar uma proposta de atualização cadastral. A página prioriza a identidade visual da graduação e mantém um caminho para formulário externo em Google Forms.

## Visualizar

Abra [index.html](./index.html) diretamente no navegador. Os estilos, fontes e o menu usam arquivos locais; não há dependências de instalação.

## Versões

- **V2 — atual:** [abrir a versão atual](./index.html).
- **V1 — versão anterior:** [abrir o arquivo histórico](./v1/index.html). A V1 foi preservada como snapshot da versão anterior para comparação.

## Referência visual

A página acompanha os componentes e tokens da [Graduação Phorte](https://graduacao-phorte.vercel.app/): Poppins em toda a interface, faixa superior escura para os sites da Phorte, navegação clara, CTA vermelho em formato de pílula, superfícies neutras e o vermelho escuro reservado para texto e ações com contraste. Os arquivos de fonte e as versões colorida/branca do logo estão locais em assets/; a licença SIL Open Font License está em assets/fonts/OFL.txt.

## Limites e formulário

- O formulário dentro da página é demonstrativo: não envia nem armazena respostas. Não digite dados pessoais reais.
- O link do Google Forms abre um serviço externo, fora do controle desta página. O formulário atualmente informado inclui perguntas específicas sobre Direito na UnB e precisa ser revisado e aprovado pela Faculdade antes de ser divulgado para egressos Phorte.
- A página está marcada para não ser indexada e sinalizada como prévia.
- Não há backend, analytics, CRM, integração acadêmica ou envio de e-mails.
- Benefícios, oportunidades, depoimentos, resultados e serviços não são anunciados como disponíveis.

## Arquivos

- index.html: conteúdo, formulário demonstrativo e navegação.
- styles.css: identidade visual e layout responsivo.
- script.js: menu móvel e retorno demonstrativo do formulário, sem envio de dados.
- [COMUNICACAO_POS_INSCRICAO.md](./COMUNICACAO_POS_INSCRICAO.md): jornada pós-cadastro, modelos de e-mail, responsabilidades e fluxograma Mermaid.
- [DOCUMENTACAO_DO_PROJETO.md](./DOCUMENTACAO_DO_PROJETO.md): contexto regulatório, referências e proposta de evolução.
