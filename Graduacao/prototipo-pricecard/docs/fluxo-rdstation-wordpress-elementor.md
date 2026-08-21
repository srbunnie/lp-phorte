# Fluxo Tecnico Final: WordPress, JetEngine, Pagina Dedicada e RD Station

## Objetivo

Este documento consolida a arquitetura final recomendada para o fluxo de inscricao.

O objetivo e manter:

- `WordPress principal` como backend e operacao editorial;
- `JetEngine` como base operacional das ofertas;
- `Elementor` como camada de entrada do card na landing;
- `pagina dedicada de inscricao` como experiencia critica de selecao e formulario;
- `RD Station` como destino final de captura, sem recalcular regra de negocio.

---

## 1. Decisao de arquitetura

### 1.1 O que foi descartado

Durante a avaliacao, as seguintes abordagens foram consideradas e descartadas como arquitetura principal:

- formulario dentro de `popup` do Elementor;
- formulario totalmente dependente de widgets nativos do Elementor;
- logica de combinacao montada dentro do `RD Station`;
- fluxo com multiplos formularios por curso, modalidade ou polo.

O principal motivo da troca foi operacional:

- o popup adiciona fragilidade de carregamento e sincronizacao;
- o Elementor nao e a melhor camada para controlar estado complexo entre etapas;
- o RD Station deve receber a oferta pronta, nao montar a regra.

### 1.2 Arquitetura escolhida

A arquitetura final recomendada e:

1. o usuario faz uma selecao inicial no `card` da landing em `WordPress + Elementor`;
2. o CTA envia o usuario para uma `pagina dedicada de inscricao`;
3. essa pagina recebe a selecao inicial via URL;
4. a pagina consulta o `WordPress principal` para validar a oferta;
5. o usuario pode revisar a selecao, voltar etapas e trocar combinacoes;
6. o formulario final so e exibido quando houver uma `oferta valida`;
7. o `RD Station` recebe somente os dados pessoais e o contexto estruturado da oferta.

Em termos praticos:

- o card inicia;
- a pagina dedicada resolve;
- o RD Station captura.

---

## 2. Fluxo funcional final

### 2.1 Fluxo na landing

Na landing principal:

1. o card carrega o catalogo de ofertas validas;
2. o usuario escolhe a combinacao inicial, por exemplo:
   - `curso = Administracao`
   - `modalidade = EAD`
   - `polo = Polo Bela Vista`
3. o sistema resolve a oferta correspondente;
4. o CTA fica habilitado apenas para combinacao valida;
5. ao clicar, o usuario e redirecionado para a pagina dedicada.

### 2.2 Fluxo na pagina dedicada

A pagina dedicada nao e apenas um formulario estatico.

Ela funciona como um fluxo validado de selecao e inscricao:

1. recebe os parametros iniciais do card;
2. valida os parametros no backend;
3. reconstroi o estado atual da oferta;
4. mostra os passos de selecao com valores predefinidos;
5. permite o usuario avancar e voltar entre as etapas;
6. recalcula apenas combinacoes validas a cada alteracao;
7. exibe o formulario apenas quando a oferta final estiver resolvida.

### 2.3 Comportamento esperado da pagina

Na pagina dedicada:

- a selecao inicial deve chegar predefinida;
- o usuario pode trocar `curso`, `modalidade` e `polo`;
- o sistema nunca deve permitir combinacao invalida;
- a interface deve recalcular o resumo da oferta em tempo real;
- a submissao so pode ocorrer com `offer_id` valido.

---

## 3. Papel de cada camada

### 3.1 WordPress principal

Responsabilidades:

- manter a base editorial e operacional;
- hospedar o `JetEngine`;
- servir os dados das ofertas para o card e para a pagina dedicada;
- expor endpoints de leitura do catalogo;
- permanecer como unica fonte de verdade.

### 3.2 JetEngine

Responsabilidades:

- armazenar as ofertas operacionais;
- permitir manutencao nativa pelo time;
- servir de ponte entre planilha e WordPress;
- organizar os dados que serao expostos pela API.

### 3.3 Elementor

Responsabilidades:

- renderizar a landing e o card de entrada;
- disparar o redirecionamento para a pagina dedicada;
- nao controlar a logica critica de estado da inscricao.

### 3.4 Pagina dedicada

Responsabilidades:

- receber a selecao inicial;
- validar a oferta;
- permitir revisao da selecao;
- exibir resumo, preco, turma e contexto;
- enviar o formulario final ao RD Station.

Essa pagina pode ser:

- uma rota custom no mesmo dominio; ou
- um subdominio dedicado consumindo o backend do WordPress principal.

### 3.5 RD Station

Responsabilidades:

- capturar os dados do lead;
- receber os dados estruturados da oferta;
- segmentar, rotear e acionar automacoes.

O RD Station nao deve:

- recalcular combinacoes;
- decidir disponibilidade;
- validar dependencias complexas entre campos.

---

## 4. Modelo de dados recomendado

### 4.1 Entidade operacional principal

A entidade operacional principal deve ser `Oferta`.

Cada linha da aba `Ofertas` representa uma combinacao valida.

Essa decisao foi mantida porque:

- simplifica o frontend;
- reduz relacoes complexas no WordPress;
- facilita a validacao da combinacao final;
- aproxima a fonte de verdade do que realmente sera vendido.

### 4.2 Estrutura atual da aba `Ofertas`

A aba `Ofertas` passa a ter, no minimo:

- `curso_id`
- `curso_nome`
- `modalidade`
- `polo_nome`
- `valor`
- `disponivel`
- `turma_confirmada`
- `turma_label`
- `curso_ativo`
- `formacao_id`
- `modalidade_id`
- `polo_id`
- `offer_label`
- `offer_id`

Exemplo:

- `offer_label = Administracao • EAD • Polo Bela Vista`
- `offer_id = graduacao__administracao__ead__polo-bela-vista`

### 4.3 Campos recomendados para a aba `Cursos`

A aba `Cursos` permanece como camada complementar para dados de exibicao:

- `curso_id`
- `curso_nome`
- `valor_base`
- `aprovado_mec`
- `nota_5_mec`

Ela deve ser usada para enriquecer a apresentacao, nao para resolver a oferta final.

### 4.4 Campos que ainda podem ser adicionados depois

Para uma evolucao futura da experiencia, estes campos podem ser adicionados:

- `estado_id`
- `estado_nome`
- `cidade_id`
- `cidade_nome`
- `admission_type_id`
- `admission_type_label`
- `curso_url`

Esses campos nao sao bloqueadores para a primeira versao da pagina dedicada, mas passam a ser necessarios se a UX incluir:

- selecao por estado e cidade;
- formas de ingresso no fluxo;
- link editorial de "Sobre o curso".

---

## 5. Regra de disponibilidade

### 5.1 Regra recomendada

Uma oferta deve ser considerada selecionavel apenas quando:

- `disponivel = true`
- `curso_ativo = true`

O campo `turma_confirmada` deve influenciar apenas a comunicacao visual e nao a existencia da oferta.

O campo `turma_label` deve ser tratado como informacao de exibicao.

### 5.2 Regra de validacao final

A validacao final da pagina dedicada deve sempre buscar uma linha de oferta que atenda a:

- `offer_id` valido; ou
- combinacao completa de filtros validos.

Se nenhuma linha valida for encontrada:

- o formulario nao deve ser exibido;
- a interface deve pedir ao usuario para revisar a selecao.

---

## 6. Contrato entre landing e pagina dedicada

### 6.1 Parametros de URL

O card da landing deve redirecionar com uma URL semelhante a:

```txt
https://inscricao.seudominio.com/?offer_id=graduacao__administracao__ead__polo-bela-vista&course=administracao&modality=ead&campus=polo-bela-vista&src=card-home
```

Campos recomendados na URL:

- `offer_id`
- `course`
- `modality`
- `campus`
- `src`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

### 6.2 Chave principal

A chave principal de validacao deve ser `offer_id`.

Os demais parametros devem ser tratados como:

- apoio para analytics;
- debugging;
- restauracao de estado;
- fallback visual.

### 6.3 Comportamento ao receber URL invalida

Se a pagina receber:

- `offer_id` inexistente;
- combinacao invalida;
- ou parametros incompletos;

ela deve:

1. consultar o catalogo;
2. tentar restaurar a melhor selecao possivel;
3. se nao houver restauracao segura, abrir o fluxo de selecao sem formulario liberado.

---

## 7. Contrato de API com o WordPress principal

### 7.1 Objetivo da API

A pagina dedicada deve consultar o `WordPress principal` para:

- validar a selecao inicial;
- obter o catalogo filtravel;
- resolver a oferta final;
- exibir os dados corretos do resumo.

### 7.2 Endpoints recomendados

#### Endpoint 1: catalogo resumido

Objetivo:

- inicializar os filtros e as dependencias entre etapas.

Resposta esperada:

- lista de cursos ativos;
- modalidades validas por curso;
- polos validos por combinacao;
- dados minimos para reconstruir o fluxo.

#### Endpoint 2: oferta por `offer_id`

Objetivo:

- validar a oferta inicial recebida pela URL;
- preencher o resumo final.

Resposta esperada:

- `offer_id`
- `offer_label`
- `curso_id`
- `curso_nome`
- `modalidade_id`
- `modalidade_label`
- `polo_id`
- `polo_nome`
- `valor`
- `turma_label`
- `disponivel`
- `curso_ativo`

#### Endpoint 3: resolver oferta por filtros

Objetivo:

- retornar a oferta final quando o usuario alterar a selecao.

Paramentros tipicos:

- `formacao_id`
- `curso_id`
- `modalidade_id`
- `polo_id`

### 7.3 Regras da API

A API deve:

- retornar apenas ofertas operacionais;
- nunca retornar oferta fora da regra de disponibilidade;
- manter `offer_id` estavel;
- preferir payload enxuto e previsivel;
- evitar expor dependencia direta de layout ou estrutura do Elementor.

---

## 8. Comportamento da pagina dedicada

### 8.1 Etapas de interface

A pagina dedicada deve ser dividida em duas camadas:

#### Camada 1: selecao

Mostra os passos do fluxo:

- formacao
- curso
- modalidade
- polo

No estado atual da planilha, `formacao` pode entrar fixo como `graduacao`.

#### Camada 2: formulario

So aparece quando a oferta estiver resolvida.

Campos visiveis recomendados:

- `nome`
- `email`
- `telefone`
- `redacao`

Resumo visivel:

- curso
- modalidade
- polo
- preco
- turma

### 8.2 Regras de navegacao

O usuario deve poder:

- voltar para uma etapa anterior;
- trocar curso, modalidade e polo;
- ver somente opcoes validas a cada etapa.

O sistema deve:

- limpar escolhas dependentes quando necessario;
- recalcular a oferta sempre que houver mudanca;
- bloquear o envio sem oferta valida.

### 8.3 Regra de resiliencia

Mesmo que a pagina chegue com dados predefinidos da landing, ela deve sempre:

- confiar no backend para validar;
- nunca confiar somente no valor vindo da URL;
- reidratar o estado a partir do catalogo do WordPress.

---

## 9. Payload recomendado para o RD Station

### 9.1 Campos pessoais

- `nome`
- `email`
- `telefone`
- `redacao`

### 9.2 Campos estruturados da oferta

- `offer_id`
- `offer_label`
- `formacao_id`
- `curso_id`
- `curso_nome`
- `modalidade_id`
- `modalidade_label`
- `polo_id`
- `polo_nome`
- `valor`
- `turma_label`

### 9.3 Campos de origem e rastreio

- `source_page`
- `src`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

### 9.4 Principio de envio

O RD Station deve receber a oferta como `contexto resolvido`.

Ele nao deve:

- recalcular a combinacao;
- inferir modalidade a partir de outro campo;
- aceitar a inscricao como se os campos fossem independentes.

---

## 10. O que mudou em relacao ao fluxo anterior

### Antes

- o card resolvia a oferta;
- o popup recebia a oferta;
- o formulario ainda deixava margem para inconsistencias.

### Agora

- o card inicia a selecao;
- a pagina dedicada valida e permite revisar;
- o formulario so aparece com oferta final valida;
- o RD Station recebe apenas o estado final resolvido.

---

## 11. O que falta para implementacao

Antes da implementacao da pagina dedicada, os seguintes pontos precisam estar fechados:

1. endpoint final que o WordPress vai expor para o catalogo;
2. endpoint final de validacao por `offer_id`;
3. definicao se a pagina dedicada ficara:
   - no mesmo dominio; ou
   - em subdominio;
4. definicao do mecanismo de envio ao RD Station:
   - embed/formulario nativo; ou
   - submissao custom;
5. definicao de como `utm_*` e `src` serao preservados;
6. validacao final da regra operacional de disponibilidade.

---

## 12. Resumo executivo

A arquitetura final recomendada substitui o popup por uma pagina dedicada de inscricao.

Essa pagina recebe a selecao inicial feita no card, valida a oferta no `WordPress principal`, permite revisao da selecao e so libera o formulario quando houver uma combinacao valida.

Com isso:

- o `WordPress` continua sendo o backend;
- o `JetEngine` continua sendo a base operacional das ofertas;
- o `Elementor` continua sendo a camada de entrada da landing;
- o `RD Station` continua sendo a camada de captura;
- a logica critica sai do popup e passa para uma pagina mais estavel, validavel e auditavel.

Essa abordagem reduz risco operacional, melhora rastreabilidade, simplifica manutencao e prepara o projeto para uma implementacao mais robusta sem abandonar o ecossistema atual.
