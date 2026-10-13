# Fontes e pendências — Recursos Humanos

**Data de consulta:** 2026-10-09 (America/Sao_Paulo). **Estado:** levantamento e rascunho editorial; aprovação acadêmica/comercial pendente.

## 1. Fontes e função de cada uma

| ID | Fonte | Uso |
|---|---|---|
| F1 | [Página oficial de Recursos Humanos](https://faculdadephorte.edu.br/graduacao/recursos-humanos/) | Oferta apresentada, formação, duração, modalidades, rotina, matriz e nomes/bios exibidos |
| F2 | [Catálogo local de ofertas](../../prototipo-pricecard/data/modelo-cursos-ofertas.json) | Combinações de modalidade/polo, valores e flags de protótipo |
| F3 | [Protótipo local de salários](../../prototipo-salarios/index.html) e [notas do protótipo](../../prototipo-salarios/README.md) | Dados de briefing disponíveis, ainda sujeitos à verificação das fontes originais |
| F4 | [Pedagogia 2027.1](../../pedagogia/index-claro-2027-1.html) e [Tradução](../../traducao%20e%20interpretacao/index.html) | Referência de componentes e hierarquia; conteúdo de outro curso não é evidência acadêmica para este |
| F5 | [e-MEC](https://emec.mec.gov.br/) | Destino para futura verificação regulatória; não consultado nesta entrega |

F1 é evidência do que a página pública apresenta na data de consulta, não aprovação definitiva da próxima turma. F2 é um catálogo de protótipo, não um sistema de matrícula. Na ausência de validação formal, diferenças entre fontes permanecem registradas aqui.

## 2. Rastreabilidade da copy

| Seções da copy | Base e tratamento |
|---|---|
| 01 e 03 — Hero/apresentação | Redação editorial nova a partir do campo de formação e das disciplinas de F1; sem promessa de emprego, salário ou promoção |
| 02 — Ficha técnica | F1, blocos de oferta e Conheça o curso; F2 para contraste entre campus e polos |
| 04 — Modalidade | F1, bloco Aula; números e horários conflitantes foram retirados da copy e registrados abaixo |
| 05 a 09 — Competências/prática/diferenciais/atuação/perfil | Síntese editorial das disciplinas de F1; Gestão em Ação conserva a presença em todos os módulos. Áreas de atuação são possibilidades relacionadas aos estudos, não atribuições regulamentares nem vagas garantidas |
| 10 — Docentes | F1, Conheça nosso corpo docente; perfis resumidos, sem acrescentar titulação, nome completo ou disciplina lecionada |
| 11 — Grade | F1, O que você irá aprender; 4 módulos e 20 entradas de disciplina, inclusive repetições de Gestão em Ação |
| 12 — Ingresso | Links oficiais observados em F1; ENEM e transferência não foram adicionados como ofertas confirmadas deste curso |
| 13 — Formulário | Proposta editorial baseada na finalidade de contato e no padrão estrutural de F4; mensagens distinguem preview e envio oficial |
| 14 — FAQ | Respostas sobre dados presentes em F1 e orientação de consulta para as condições ainda variáveis |
| 15 — CTA final | Redação editorial nova; a inscrição oficial é distinta de um pedido de contato |

A ordem dos módulos segue a página pública. Ela não foi convertida em cronograma de um módulo por semestre, nem em carga horária ou matriz aprovada para 2027.1.

## 3. Dados comerciais observados

O hero de F1 mostra **Turma 2027.1**, **R$ 198,00/mês** e referência anterior de **R$ 330,00/mês** no texto da página. O mesmo documento contém chamadas de **2026.1** e **2026.2**. Esses períodos não foram normalizados silenciosamente. Preço, preço anterior e semestre ficam fora da copy até confirmação da oferta.

F2 possui as seguintes combinações para `recursos-humanos`:

| Modalidade | Polo | Valor no protótipo | Disponível no JSON | Turma confirmada no JSON |
|---|---|---|---|---|
| EAD | Polo Lapa | R$ 198,00 | Sim | Não |
| EAD | Polo Bela Vista | R$ 198,00 | Sim | Não |

Todas as flags `turma_confirmada` acima são falsas. Não usar a chamada de turma confirmada de Pedagogia para este curso. Um preço-base coincidente entre F1 e F2 não valida campanha, desconto, prazo, taxa ou reajuste.

## 4. Rotina acadêmica e divergências

- **Duração/formação:** F1 apresenta 4 semestres (2 anos), tecnólogo. Confirmar a matriz e a oferta do período de ingresso antes da publicação.
- **EAD:** F1 menciona 50 horas por semestre, 25 encontros de duas horas e dois encontros por semana, das 19h30 às 21h30. Validar a distribuição pelo calendário antes de transformar essas informações em promessa de frequência.
- **Presencial:** não consta como modalidade disponível no hero ou em F2 para este curso. O texto genérico de jornada 3×2 da página não autoriza acrescentar uma oferta presencial.
- **Avaliações/local:** F1 indica comparecimento uma vez por semestre para provas no endereço Rua Rui Barbosa, 422, Bela Vista. F2 também oferece EAD em Polo Lapa. Validar onde acontecem as atividades de cada combinação antes de associar endereço ou campus a todo aluno.
- **Reconhecimento/nota:** O texto anuncia curso reconhecido. O JSON local registra `aprovado_mec: true` e `nota_5_mec: false`. Não foi feita consulta de ato regulatório ou nota no e-MEC; a copy revisada orienta a consulta sem antecipar um selo. `nota_5_mec: false` não é prova de nota baixa ou ausência de reconhecimento.
- **Bolsas e incentivos:** biblioteca com número de títulos, programa de indicação, prêmios, bolsas, turmas reduzidas e parcerias aparecem como argumentos genéricos. As condições e a aplicabilidade a esta oferta não foram comprovadas; não foram repetidas como benefícios garantidos.
- **Prática:** Gestão em Ação consta em todos os módulos. Não foram encontrados projetos específicos, estágio garantido, número de horas práticas ou empresas parceiras associados individualmente à próxima turma deste curso.

## 5. Docentes e materiais opcionais

| Conteúdo | Estado nesta entrega | Tratamento |
|---|---|---|
| Efren; Luiza Correia Hruschka; Marcos Antonio; Karine Teresa; Roberto Luis | Nomes e bios individuais disponíveis em F1 | Cinco perfis editoriais preparados; validar nomes completos, títulos atuais, vínculo com a turma e retratos |
| Raul Fonseca e Marcelo Martinovic | Nomes disponíveis, biografia extensa repetida sob ambos | Perfis excluídos da copy até corrigir a atribuição. Não concluir que a biografia pertence a um deles por suposição |
| Coordenação | Nome, mensagem e vídeo específicos não localizados nas fontes consultadas | Pendente; não criar depoimento, cargo, citação ou bloco vazio |
| Depoimentos de alunos deste curso | Material individual identificável não localizado nas fontes consultadas | Pendente; não reutilizar alunos de Pedagogia ou vídeos de outro curso |
| Indicadores de satisfação | Página possui contadores genéricos; amostra/período/metodologia não identificados | Não usar percentuais como prova |
| Salários | Dados do protótipo incorporados ao preview em [copy própria](../copy/salarios.md) por solicitação do usuário | Fontes e recortes preservados; confirmação para publicação permanece pendente |

### Referência salarial disponível em F3

O protótipo local cita Analista de Recursos Humanos (R$ 4.416,46), Business Partner — HRBP (R$ 5.760,03) e Gerente de Recursos Humanos (R$ 10.029,54), com referência a ago/2025–jul/2026. Validar as ocupações, amostras, jornadas e URLs diretas; não apresentar as funções como progressão garantida após o diploma.

Os valores acima são registros de briefing, não uma atualização estatística feita nesta entrega. Salário depende de ocupação, regime, jornada, local e experiência. Não representa remuneração garantida de um recém-formado.

## 6. Inventário de imagens

URLs observadas no HTML público; não houve download de mídias do site nem alteração na Biblioteca de Mídia.

| Uso proposto | Referência | Condição |
|---|---|---|
| Imagem temática do curso | [Arte do curso](https://faculdadephorte.edu.br/wp-content/uploads/2024/12/curso-phorte-recursos-humanos-rh.webp) | Contém composição e textos embutidos; avaliar legibilidade, recorte e correspondência com a modalidade |
| Fundo do hero atual | [Fundo temático](https://faculdadephorte.edu.br/wp-content/uploads/2024/12/RECURSOS-HUMANOS-RH-BG.webp) | Referência histórica, não obrigatório no novo hero claro |
| Apoio institucional | [Imagem institucional](https://faculdadephorte.edu.br/wp-content/uploads/2025/06/ratio11-2025-faculdade-phorte-final.webp) | Imagem encontrada na página; validar enquadramento e uso |
| Marca | [Logo](https://faculdadephorte.edu.br/wp-content/uploads/2024/12/logo-faculdade-phorte-unificado-1.svg) | Preferir header/footer institucionais na montagem no WordPress |

### Arquivos de retratos encontrados na página

- [Arquivo 1](https://faculdadephorte.edu.br/wp-content/uploads/2026/01/ChatGPT-Image-10_08_2026-18_17_35.png) — associação entre retrato e pessoa a validar na montagem.
- [Arquivo 2](https://faculdadephorte.edu.br/wp-content/uploads/2026/01/Profa-Luiza-Correia-Hruschka.webp) — associação entre retrato e pessoa a validar na montagem.
- [Arquivo 3](https://faculdadephorte.edu.br/wp-content/uploads/2025/02/PROF-MSc-MARCOS-A-FERREIRA.webp) — associação entre retrato e pessoa a validar na montagem.
- [Arquivo 4](https://faculdadephorte.edu.br/wp-content/uploads/2025/02/ChatGPT-Image-10_08_2026-18_44_38.png) — associação entre retrato e pessoa a validar na montagem.
- [Arquivo 5](https://faculdadephorte.edu.br/wp-content/uploads/2025/02/ChatGPT-Image-10_08_2026-18_48_04.png) — associação entre retrato e pessoa a validar na montagem.
- [Arquivo 6](https://faculdadephorte.edu.br/wp-content/uploads/2024/12/Captura-de-tela-2026-08-11-121439.png) — associação entre retrato e pessoa a validar na montagem.
- [Arquivo 7](https://faculdadephorte.edu.br/wp-content/uploads/2024/12/Roberto-Luis-Mendonca-Garcia.webp) — associação entre retrato e pessoa a validar na montagem.

Não inferir identidade, autoria ou autorização de uso pelo nome de arquivo. Selos de MEC e vestibular com semestre embutido não serão usados sem validação dos claims e da campanha.

## 7. Destinos de inscrição observados

| Ação | Destino |
|---|---|
| Vestibular geral | [URL publicada](https://typechat.phorte.org.br/vestibular-simplificado) |
| Inscrição do curso | [URL publicada](https://typechat.phorte.org.br/phorte-recursos-humanos) |
| Segunda graduação | [URL publicada](https://typechat.phorte.org.br/phorte-rh-segunda) |

Os links foram identificados na página, sem iniciar processos, enviar formulário ou verificar o atendimento do destino. Na futura LP, usar o destino específico do curso para inscrição e o destino próprio para segunda graduação. Os links de contato interno apontarão para `#inscricao`.

## 8. Pendências de liberação

1. Acadêmico: modalidade, matriz, duração, local de provas, rotina e docentes da turma.
2. Comercial: período, preço, condições, polos disponíveis e formas de ingresso efetivamente aceitas.
3. Institucional: reconhecimento, nota e uso de selo associados ao curso/modalidade.
4. Conteúdo: nomes e bios corretas, mapeamento/autorização de retratos, materiais opcionais específicos.
5. Operação: destinos finais, política institucional e configuração do formulário nativo; validações de envio só no ambiente autorizado.

## 9. Documentos relacionados

- [Copy revisada](../copy/copy.md)
- [Visão do projeto](../README.md)
- [Arquitetura das quatro LPs](../../docs/arquitetura-lps-gestao.md)
- [Revisão de UI](../../docs/revisao-ui.md)
