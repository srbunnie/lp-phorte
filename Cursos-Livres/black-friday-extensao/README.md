# Black Friday Phorte — Cursos de Extensão

Prévia estática de dois modelos visuais para a campanha da Black Friday. A navegação entre Educação Física e Educação funciona no navegador; nenhum formulário coleta ou envia dados.

## Links de revisão no GitHub Pages

- Direção 02: https://srbunnie.github.io/lp-phorte/Cursos-Livres/black-friday-extensao/direcao-02/
- Primeira proposta: https://srbunnie.github.io/lp-phorte/Cursos-Livres/black-friday-extensao/

O usuário autorizou commit, push e disponibilização da prévia no GitHub Pages em 23/10/2026. Esses links apresentam protótipos para revisão; a campanha comercial continua dependendo da confirmação de condições e destinos.

## Fonte e decisões

- O card ClickUp 17tjca24qak pede dois modelos visuais, preservar a comunicação de Educação Física e apresentar três cursos de Educação com seus livros.
- As artes anexadas indicam os combos Reggio Emilia na Prática Educacional + *Arte e criatividade em Reggio Emilia*; Escuta na Educação Infantil + *Abrir-se à escuta das vozes infantis*; A Organização dos Ambientes: inspirações Reggio e Pikler + *Espaços em Harmonia*.
- As artes anexadas incluem referências de Black Friday 2025 e valores/benefícios antigos. Eles foram omitidos para não reapresentar condições vencidas como atuais.
- As condições vigentes, preços, descontos, período, cursos elegíveis e destinos de matrícula aguardam confirmação. As capas reais foram obtidas nas páginas institucionais dos cursos.
- As referências visuais vieram dos anexos do card. A página pública de cursos foi consultada apenas como referência de conteúdo e navegação; nenhuma alteração foi feita no site.

## Visualização

Abra `index.html` em um navegador moderno. Os controles de área também aceitam as setas esquerda/direita, Home e End.

### Direção 02 — identidade Phorte e campanha fotográfica (versão atual)

- Nova proposta local: [direcao-02/index.html](direcao-02/index.html).
- Kit oficial `phorte.css`, fontes locais Poppins, cores de ação do Design System e botões com raio de 8px.
- Mantém a copy principal dos modelos e os três pares curso + livro. Curso e livro ficam visíveis sem exigir um clique adicional.
- Hero fotográfico criado com GPT, fotos de apoio, imagens dos materiais dos cursos e capas oficiais dos três livros. A imagem de campanha também é exibida no mobile.
- A proposta não exige Google Fonts nem scripts remotos.
- Fontes dos materiais, modo de geração e prompt final estão em [ASSETS-E-DESIGN-SYSTEM.md](direcao-02/ASSETS-E-DESIGN-SYSTEM.md).
- Os três botões “Conhecer o curso” abrem as páginas institucionais específicas. Não simulam matrícula ou preço de Black Friday.
- O CTA de Educação Física abre o catálogo institucional conhecido, sem indicar matrícula ou elegibilidade na campanha. Preços, condições e links de matrícula continuam sujeitos à validação.
- A revisão estrutural dos arquivos pode ser feita localmente; a conferência visual em navegador permanece necessária antes de aprovar o layout.

### Histórico: correções da revisão — 23/10/2026

Este histórico registra a etapa anterior. A nova composição fotográfica descrita acima substitui o hero gráfico, a ausência de imagens no mobile e as capas apenas textuais.

- Os combos pertencem ao painel Educação e ficam ocultos ao selecionar Educação Física.
- O link “Cursos + livros” seleciona Educação antes de rolar. Links diretos `direcao-02/index.html#combos` e `#panel-educacao` também abrem a área correta; as abas continuam oferecendo setas, Home e End.
- O hero apresenta a área e a ação antes da decoração. A arte foi retirada do layout mobile para dar prioridade à mensagem e à seleção.
- Vermelho de botões e abas foi separado do vermelho decorativo; texto secundário ficou mais escuro e o foco usa duas cores para contrastar com superfícies claras e escuras.
- Os títulos dos livros passaram para 15–16px, e as informações de participação para 13px.
- Removidos os expansores que apenas repetiam títulos. O fechamento aponta para o catálogo geral com identificação explícita, sem simular uma matrícula da campanha.
- A promessa genérica “resultado imediato” foi substituída por uma descrição objetiva das áreas e o superlativo “A maior” foi retirado dos dois modelos, conforme a aplicação da revisão solicitada pelo usuário. O restante da copy base foi preservado.
- Condições comerciais e destinos específicos de matrícula continuam pendentes. A revisão visual renderizada permanece necessária; o relatório de revisão registra a situação anterior às correções.

## Status

Protótipo para revisão via GitHub Pages. Não usar como página de matrícula até validar as condições e destinos da campanha.
