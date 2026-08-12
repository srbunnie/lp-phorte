# Projetos de Landing Pages — Phorte e USCS

Este repositório reúne objetos estáticos de landing pages desenvolvidos para apresentação e compartilhamento com stakeholders da Phorte e da USCS. A pasta centraliza protótipos navegáveis, layouts, imagens, textos, referências e materiais de demonstração utilizados pela equipe de quatro pessoas.

O conteúdo é demonstrativo. Não devem ser adicionados backends, bancos de dados, integrações de produção, credenciais ou dados reais de usuários.

Cada landing page deve ser organizada como um projeto independente. Dessa forma, é possível trabalhar em várias páginas simultaneamente sem misturar arquivos, imagens, códigos ou versões.

## Organização das pastas

Use uma pasta principal para cada projeto ou campanha:

```text
lp-phorte/
├── README.md
├── index.html             # Índice de navegação entre os projetos
├── SECURITY.md            # Checklist de revisão antes do commit
├── scripts/                # Verificações locais de segurança
├── Graduacao/
│   └── nome-da-campanha/
│       ├── README.md
│       ├── pagina/
│       ├── assets/
│       │   ├── images/
│       │   ├── icons/
│       │   └── videos/
│       ├── copy/
│       └── referencias/
├── Pos/
│   └── nome-da-campanha/
└── skills/
```

### Categorias principais

- `Graduacao/`: páginas e campanhas relacionadas à graduação.
- `Pos/`: páginas e campanhas relacionadas à pós-graduação, especializações e MBA.
- `USCS/`: páginas e protótipos relacionados à USCS.
- `skills/`: orientações, referências e ferramentas de apoio ao trabalho de design, conteúdo e desenvolvimento.

Se surgir uma nova frente de trabalho, crie uma nova categoria na raiz somente quando ela representar um grupo permanente de projetos. Para uma campanha específica, crie uma subpasta dentro da categoria correspondente.

## Organização de cada projeto

O nome da pasta deve ser curto, descritivo e escrito em minúsculas, usando hífens no lugar de espaços. Inclua, quando necessário, o curso, a campanha ou o período.

Exemplos:

```text
Graduacao/administracao-2026-2/
Pos/psicopedagogia-turma-agosto/
```

Dentro de cada projeto, separe os materiais por finalidade:

- `pagina/`: HTML, CSS, JavaScript client-side e demais arquivos estáticos da página.
- `assets/images/`: fotos, banners, logos e imagens usadas na página.
- `assets/icons/`: ícones, SVGs e elementos gráficos pequenos.
- `assets/videos/`: vídeos locais ou arquivos relacionados a vídeos.
- `copy/`: textos, títulos, chamadas, argumentos, FAQs e versões aprovadas da copy.
- `referencias/`: briefing, layouts, links, prints e materiais de referência.

Caso o projeto utilize um framework para gerar uma demonstração estática, mantenha apenas o resultado necessário para compartilhamento e registre no README do projeto como visualizar a página.

## Escopo dos arquivos

São permitidos HTML, CSS, JavaScript client-side, imagens, ícones, vídeos, fontes licenciadas, textos, wireframes, layouts e referências. Formulários podem existir apenas como demonstração visual, sem envio real de dados.

Não são permitidos APIs, servidores, bancos de dados, chaves, senhas, tokens, dados pessoais reais ou integrações reais com CRM, analytics, pagamentos e serviços externos.

Antes de cada commit ou push, a equipe deve executar a revisão definida em [`SECURITY.md`](./SECURITY.md). A verificação de arquivos `.env` e valores hardcoded é uma etapa obrigatória para evitar vazamentos acidentais.

## README de cada projeto

Projetos que não forem triviais devem ter seu próprio `README.md`, contendo:

1. Nome da campanha e instituição.
2. Objetivo da landing page.
3. Público e oferta principal.
4. Status atual: briefing, design, desenvolvimento, revisão ou publicado.
5. Link de protótipo e link da página publicada, quando existirem.
6. Responsáveis pela copy, design e desenvolvimento.
7. Instruções para executar ou editar a página.
8. Observações sobre integrações, formulários, pixels e analytics.

## Convenções de arquivos

- Use nomes em minúsculas e sem espaços: `hero-graduacao.webp`.
- Prefira nomes que expliquem o uso do arquivo: `logo-phorte-branca.svg`.
- Evite nomes genéricos como `final-final.png`, `banner novo.jpg` ou `img123.png`.
- Não duplique arquivos sem necessidade; mantenha uma única versão oficial.
- Otimize imagens antes de adicioná-las ao projeto.
- Não armazene senhas, tokens, chaves de API ou dados pessoais no repositório.
- Arquivos temporários, exports de teste e rascunhos devem ficar fora da pasta do projeto ou em uma subpasta claramente identificada como `rascunhos/`.

## Fluxo de trabalho com Git

Como várias pessoas trabalham no mesmo repositório:

1. Antes de começar, atualize sua cópia local:

   ```bash
   git pull origin main
   ```

2. Crie uma branch para cada tarefa:

   ```bash
   git checkout -b nome-da-tarefa
   ```

3. Faça commits pequenos e descritivos:

   ```bash
   git add .
   git commit -m "feat: adiciona landing page de administracao"
   ```

4. Envie sua branch para o GitHub:

   ```bash
   git push -u origin nome-da-tarefa
   ```

5. Abra um Pull Request para revisão antes de juntar as alterações na `main`.

Antes de iniciar uma nova tarefa, sempre verifique se não existem alterações locais não salvas. Evite trabalhar diretamente na `main` e evite modificar arquivos de outro projeto sem combinar com a pessoa responsável.

## Status dos projetos

O status pode ser indicado no README de cada projeto usando uma destas etapas:

`Briefing` → `Copy` → `Design` → `Desenvolvimento` → `Revisão` → `Aprovado` → `Publicado`

O objetivo deste repositório é manter os materiais estáticos organizados, facilitar a colaboração e preservar o histórico de decisões e versões das apresentações de landing pages da Phorte e da USCS.

## Índice de navegação

O arquivo `index.html` na raiz é a porta de entrada do repositório. Ele deve apresentar links para as categorias e projetos disponíveis, funcionando como um mapa visual das páginas.

Sempre que uma nova categoria principal for criada, adicione um card e um link para ela no `index.html`. Quando um projeto tiver uma página própria, inclua também seu link na categoria correspondente. Mantenha o índice simples e atualizado; informações detalhadas devem ficar no README de cada projeto.
