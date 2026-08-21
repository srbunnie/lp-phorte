# Design: Planilha de Cursos, Modalidades e Polos

**Objetivo**

Estruturar a planilha para suportar crescimento sem multiplicar colunas por modalidade e polo. O modelo escolhido separa o cadastro do curso da lista de ofertas validas.

**Estrutura aprovada**

1. Aba `Cursos`
   - Uma linha por curso.
   - Guarda os dados base do curso.

2. Aba `Ofertas`
   - Uma linha por combinacao valida de `curso + modalidade + polo`.
   - Guarda valor, disponibilidade e observacoes.

**Motivacao**

O formato horizontal ficaria largo demais e ruim de manter conforme novas modalidades, polos e variacoes de preco fossem adicionados. O formato vertical evita criar novas colunas a cada mudanca e facilita filtros, importacao e automacao futura.

**Campos propostos**

`Cursos`
- `curso_id`
- `curso_nome`
- `ativo`
- `observacoes`

`Ofertas`
- `curso_id`
- `curso_nome`
- `modalidade`
- `polo_codigo`
- `polo_nome`
- `valor`
- `disponivel`
- `popup_id`
- `observacao_preco`

**Regra operacional**

Cada linha da aba `Ofertas` representa uma oferta real. Se um mesmo curso existir em duas modalidades e dois polos, ele tera quatro linhas distintas.

**Compatibilidade com o projeto**

Essa estrutura conversa bem com o contrato ja usado no projeto para gerar a matriz `curso + modalidade + polo + preco`, facilitando exportacao para JSON depois.
