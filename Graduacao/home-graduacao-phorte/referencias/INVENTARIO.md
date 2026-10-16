# Conteúdo da home atual — Graduação Phorte

Coleta de 16/10/2026. Origem principal: [home pública](https://faculdadephorte.edu.br/). Dados normalizados em [inventario-consolidado-2026-10-16.json](inventario-consolidado-2026-10-16.json).

## 1. Como o levantamento foi feito

Leitura da página em navegador Chromium, capturas de 1440 × 960 e 390 × 844, leitura do DOM antes e depois de espera e consulta GET à REST pública. Cabeçalho Elementor `51556`, home `7`, rodapé `31347`; o template de seção `31095` aparece nas sete abas de cursos.

O leitor web inicial não conseguiu abrir a graduação; o navegador abriu com HTTP 200. O conector Elementor recusou a leitura da estrutura do post 7, portanto **não houve acesso às configurações internas do documento, ações de formulário ou metadados privados**. Não foi alterado nenhum conteúdo remoto.

Na primeira captura houve quatro erros JavaScript de leitura de `opacity`. Catálogo, depoimentos e notícias apareceram com indicadores de carregamento. Uma nova leitura recuperou depoimentos no DOM, mas não todos os blocos visíveis. Isso descreve o ambiente e o momento de coleta, sem concluir que todos os visitantes enfrentam o mesmo problema. Não foi feita uma auditoria de produção.

## 2. Ordem observada

| Ordem | Bloco / ID Elementor | Conteúdo recuperado | Observação |
| --- | --- | --- | --- |
| 1 | Cabeçalho `51556` | Marca, Graduação, Pós-Graduação, Cursos+, Blog, contato; segundo menu com Cursos Graduação, Extensão, Eventos, Portal e inscrição | Dois níveis completos de navegação apareceram simultaneamente no desktop. Consolidar a apresentação sem perder destinos. |
| 2 | Hero `11a76e2` | Graduação 2027; matrículas para o 1º semestre; quatro modalidades; CTA Garantir minha vaga; condição de disponibilidade | Carrossel já criado no projeto do banner. Segundo slide tem arte do Dia dos Professores. |
| — | Campanhas ocultas `6474e066` | Graduação 2026, 2º semestre; Mês do EAD; inscrições até 13/04/2026 | Legado oculto. Arquivar como evidência; excluir do conteúdo vigente das duas versões. |
| 3 | Apresentação e cursos `2c7cd9fa` | Título Seja o protagonista do seu futuro com a Phorte; apresentação institucional; sete abas de cursos | Os cards da listagem JetEngine não renderizaram na coleta; nomes e destinos foram cruzados com menu e REST. |
| 4 | Chamada de cursos `638b7cb3` | Conheça nossos cursos de Graduação!; modalidades; imagem de estudantes | É um banner de reforço, distinto do catálogo. |
| 5 | Institucional `d2a0c` | Faculdade Phorte; Educação Conectada e Reconhecida; texto de trajetória; CTA sobre a instituição; vídeo | Texto menciona três décadas e nota máxima no MEC: registrar como alegações da fonte, ainda sem validação específica. |
| 6 | Infraestrutura `5d5350ff` | Infraestrutura Moderna e Ambiente Inovador; unidades I e II; fotos | Há ainda unidade III oculta e endereço diferente no rodapé. |
| 7 | Depoimentos `73bd0488` | Depoimentos de Alunos e Sucesso Profissional; listagem `4610d219` | Conjunto variável entre carregamentos. Não equivale a ausência de depoimentos. |
| — | Contêiner `1c9f1f42` | Sem conteúdo textual recuperado | Não tratar como seção editorial. |
| 8 | Atendimento `53b5f972` | Transformação da carreira; orientação por consultores; formulário Nome, E-mail, Telefone, checkbox e Enviar | Ações de envio/CRM não recuperadas. Nenhum envio foi realizado. |
| 9 | Parceiros `527a0cda` | Oito logos em carrossel | Duplicações no DOM são clones do carrossel. |
| 10 | Notícias `7cdcdce9` | Título Últimas Notícias | Listagem não renderizou; três posts recentes recuperados pela REST como candidatos. |
| — | Mídia `4dd08f8` | Três matérias sobre inclusão/Escola Aberta, em sites externos | Bloco oculto; não promover automaticamente a seção visível. |
| 11 | Rodapé `31347` | Institucional, projetos, cursos, contato, redes, e-MEC, endereços, políticas, CNPJ | Estruturar links preservando serviços reais; não copiar dados divergentes sem revisão. |

O texto de apresentação diz que os cursos unem teoria e prática, professores de referência e estrutura para a carreira. A redação poderá ser refinada nas duas opções; isso não autoriza acrescentar rankings, empregabilidade garantida ou indicadores numéricos.

## 3. Sete cursos institucionais

Fontes: menu e abas da home, [cadastro público de graduação](https://faculdadephorte.edu.br/wp-json/wp/v2/graduacao?per_page=100) e [taxonomia de cursos](https://faculdadephorte.edu.br/wp-json/wp/v2/cursos-graduacao-lista?per_page=100).

| Curso da home | ID do post | Modalidades cadastradas na REST | Destino |
| --- | --- | --- | --- |
| Administração | 32014 | EAD e Presencial | [Página do curso](https://faculdadephorte.edu.br/graduacao/administracao/) |
| Educação Física | 39176 | Presencial e Semipresencial | [Página do curso](https://faculdadephorte.edu.br/graduacao/educacao-fisica/) |
| Marketing | 31985 | EAD | [Página do curso](https://faculdadephorte.edu.br/graduacao/marketing/) |
| Pedagogia | 32006 | Semipresencial | [Página do curso](https://faculdadephorte.edu.br/graduacao/pedagogia/) |
| Processos Gerenciais | 32008 | EAD e Presencial | [Página do curso](https://faculdadephorte.edu.br/graduacao/processos-gerenciais/) |
| Recursos Humanos | 32010 | EAD | [Página do curso](https://faculdadephorte.edu.br/graduacao/recursos-humanos/) |
| Tradução e Interpretação | 32012 | EAD online ao vivo | [Página do curso](https://faculdadephorte.edu.br/graduacao/traducao-e-interpretacao-ingles-portugues/) |

A taxonomia de modalidades tem quatro termos: Presencial `91`, EAD online ao vivo `93`, Semipresencial `199`, EAD `241`. Classificação de post **não confirma turma aberta, horário, local de atividades ou condição comercial**.

O post 32012 tem título completo “Tradução e Interpretação Português / Inglês”; o nome curto da home foi preservado no inventário. Não corrigir o slug existente para acompanhar o título.

A REST retorna oito posts: o oitavo é **Curso Teste Administração**, ID `57540`, sem modalidades ou categoria de curso. Fica excluído das duas prévias. Não usar automaticamente todos os posts retornados como catálogo institucional.

Duração, titulação, área editorial, descrição curta, imagem de capa e valores não foram apresentados pelos cards da home nesta coleta. O protótipo Next e as páginas de cursos locais podem ajudar a preencher esses campos, com fonte por campo e conferência. Exemplo de divergência: a base editorial anterior do Next descreve Educação Física como atividades presenciais/online ao vivo, enquanto a taxonomia atual marca Presencial/Semipresencial. Não transformar uma descrição em outra sem revisão.

## 4. Hero e mídia institucional

- Campanha: Graduação 2027; matrículas abertas para o 1º semestre; modalidades Presencial, EAD, Semipresencial e Online / Ao vivo; condição de disponibilidade.
- CTA do banner: https://faculdadephorte.edu.br/graduacao/ — é um destino de catálogo, embora o texto diga Garantir minha vaga.
- CTA de inscrição no menu: https://typechat.phorte.org.br/vestibular-simplificado — distinguir as duas intenções no novo desenho.
- Segundo slide: homenagem de 15 de outubro de 2026; imagem desktop e versão mobile já previstas no pacote existente. Data de retirada da campanha não definida.
- Vídeo institucional: https://youtu.be/3sJF0DKhLOk; pôster `wp-content/uploads/2025/05/capa-video-home-phorte.webp`.
- Pacote local: `Graduacao/header graduacao/x-house-leandro-julio-duarte-setembro/outputs/header-phorte-2027-elementor-wordpress/`.

Principais imagens existentes: fundo `BANNER-SITE-background-scaled.webp`, `persona-masculina.webp`, `persona-feminina.webp`, `ICONE-MOUSE.webp`, arte Dia dos Professores, `personagraduacaophortestyled-768x565.webp`, fotos Rui Barbosa e Martiniano. URLs e dimensões observadas estão nos JSONs; imagens lazy com placeholder de 1 × 1 não têm dimensão real validada por essa medição.

## 5. Depoimentos

A [REST de depoimentos](https://faculdadephorte.edu.br/wp-json/wp/v2/depoimentos?per_page=100) tem **dez posts publicados**. Seu campo `content.rendered` não contém o relato; os dados foram recuperados da listagem renderizada na home. A seleção variou entre visitas. Na última coleta foram capturados seis relatos únicos, com pôster e vídeo:

| Nome na fonte | Curso informado | ID YouTube |
| --- | --- | --- |
| Debora | Administração | `y6Do2KmZsjo` |
| Luciana Gomes | Pedagogia | `F5N7LOW_U9s` |
| Yuri | Administração | `EVzmUlnkGWM` |
| Meire e Beatriz | Administração e Pedagogia | `WnghtJQdf9Y` |
| Rosângela Simões Silva | Pedagogia | `bJwRpDj-5hI` |
| Leticia | Administração | `I7HIJ_4HSmw` |

Em uma leitura anterior também apareceram Lilian Costa Zoubaref e Nicole Góes. Os outros nomes no cadastro são Paulo Sergio e Thayane Severo. Não completar citações dos registros não consolidados por inferência. As seis citações integrais da última amostra estão no inventário JSON, com nomes e grafia originais.

O protótipo `graduacao-phorte.vercel.app` usa outros quatro vídeos de Tradução: Geovana e Luana, Sofia, André e Gabriel. São uma referência alternativa, não os mesmos depoimentos da home atual. Priorizar o acervo da home para ambas as opções, sem trocar pessoas automaticamente nem duplicar clones do carrossel.

Alguns textos são narrativos na terceira pessoa, como o de Leticia. Não transformá-los em fala direta da aluna. Os vídeos foram identificados pelos links; a reprodução e a correspondência integral das falas não foram auditadas.

## 6. Unidades e contato

| Local da informação | Endereço | Tratamento proposto |
| --- | --- | --- |
| Infraestrutura / unidade I | Rua Rui Barbosa, 422 · Bela Vista · São Paulo – SP | Referência comum às fontes, incluir como sede |
| Infraestrutura / unidade II | Rua Martiniano de Carvalho, 170 · Bela Vista · São Paulo – SP | Preservar no inventário e confirmar função/atendimento para publicar |
| Rodapé | Rua 13 de Maio, 681 · Bela Vista – SP | Confirmar relação com as unidades e finalidade |
| Conteúdo oculto / unidade III | Av. Marquês de São Vicente, 2477 · Água Branca · São Paulo – SP | Não anunciar como unidade ativa a partir de conteúdo oculto |

Telefone geral: `(11) 2222-1222`; e-mail `graduacao@faculdadephorte.edu.br`. No rodapé desktop, atendimento de aluno aparece também como `(11) 2222-1222`; na versão mobile aparece `(11) 2730-0055`, enquanto um link telefônico oculto usa o número geral. Confirmar o contato de aluno antes de padronizar.

O formulário atual contém nome, e-mail, telefone e aceite de comunicações com link de privacidade. Preservar a intenção e os campos no planejamento. Endpoint de negócio, destinatários, integrações e regras de consentimento não estão confirmados. Na prévia, não simular entrega de lead com mensagem de sucesso.

## 7. Parceiros

Oito arquivos distintos, com rótulos originais: `mstc`, `cna`, `ciee`, `ABV`, `ass de amparo autista`, `rumo-ao-futuro`, `vidraria anchieta`, `projeto vida missoes`. Há imagens e clones repetidos no trilho; consolidar por logo, não por elemento DOM.

Não ampliar siglas ou inventar descrições do convênio. Os logos não comprovam vínculo atualizado ou benefício comercial específico.

## 8. Notícias

Últimos três posts publicados recuperados em 16/10 pela [REST do blog](https://faculdadephorte.edu.br/wp-json/wp/v2/posts?per_page=3). São **candidatos para o protótipo**, não confirmação do filtro do widget de notícias atual:

| Data da publicação | Título | Destino |
| --- | --- | --- |
| 15/10/2026 | Dia do Professor: o papel dos educadores na construção de novas trajetórias | [Artigo](https://faculdadephorte.edu.br/dia-do-professor-o-papel-dos-educadores-na-construcao-de-novas-trajetorias/) |
| 09/10/2026 | Matrículas abertas para 2027.1: comece sua graduação na Faculdade Phorte | [Artigo](https://faculdadephorte.edu.br/faculdade-phorte-matriculas-abertas-2027-1/) |
| 07/10/2026 | O que estudar para o Enem 2026? Veja como organizar a reta final em outubro | [Artigo](https://faculdadephorte.edu.br/o-que-estudar-para-o-enem-2026-veja-como-organizar-a-reta-final-em-outubro/) |

O protótipo Next mostrou uma seleção anterior, incluindo Dia Mundial dos Professores. Não congelar essa seleção como se fosse a mais recente em todas as fontes.

## 9. Navegação, serviços e rodapé

Manter acesso a graduação, pós, cursos livres, blog, contato, bolsas, sobre nós, vagas, unidades, ouvidoria, CPA, biblioteca, documentos oficiais e validação de diplomas.

Portais distintos:

- Aluno/SIG: https://sis.faculdadephorte.edu.br/login
- Secretaria: https://faculdadephorte.perseus.com.br/Servicos
- Diplomas: https://faculdadephorte.perseus.com.br/servicos/diplomadigital
- Biblioteca: https://biblioteca.phorteeducacional.com.br/

Redes: Facebook `faculdadephorte`, Instagram `faculdadephorte`, YouTube `@phortetv`, LinkedIn `faculdade-phorte`. Ícones com nome acessível, preservando as URLs do inventário.

e-MEC: manter o link de consulta cadastral da instituição. Sua presença no rodapé não confirma uma nota máxima para todo curso.

CNPJ da fonte: `42.098.615/0001-42`. O copyright mostra 2022; registrar como legado, sem usá-lo como data da nova versão. Os links de Cursos Livres divergem entre menu e rodapé, e o projeto Next tem destinos/redirecionamentos próprios: decidir URLs pela realidade do WordPress, não pelo ambiente Vercel.

## 10. Decisões editoriais ainda necessárias

1. Confirmar operação e finalidade de Martiniano e 13 de Maio; contato específico de aluno.
2. Confirmar duração, titulação e descrição comercial de cada curso antes de incluir esses dados nos cards.
3. Revisar a alegação de nota máxima por curso/ato/indicador e distinguir trajetória do grupo da história da Faculdade.
4. Definir se o segundo slide do Dia dos Professores continua e até quando.
5. Confirmar ações e consentimento do formulário antes da integração real.

Esses pontos não impedem o planejamento nem o HTML estrutural: usar somente dados confirmados e sinalizar pendências no material de revisão, sem expor anotações técnicas na interface pública.
