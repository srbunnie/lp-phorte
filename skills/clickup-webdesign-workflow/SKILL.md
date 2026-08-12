---
name: clickup-webdesign-workflow
description: Acessa e organiza o ambiente WebDesign no ClickUp, localiza tarefas por link ou texto, consulta detalhes e comentários, cria tarefas na lista correta e inicia o trabalho atualizando o status. Use quando o usuário pedir para acessar o ClickUp, procurar ou criar uma tarefa no WebDesign, continuar uma tarefa existente, iniciar uma tarefa ou registrar o início do trabalho.
---

# Fluxo ClickUp WebDesign

Usar o conector do ClickUp para navegar pela hierarquia real do workspace, confirmar o ambiente WebDesign e operar somente na tarefa ou lista indicada. Trabalhar com IDs retornados pelas ferramentas; não inventar IDs, não presumir a lista e não duplicar tarefas existentes.

## Ferramentas principais

Usar as ferramentas MCP do ClickUp com o prefixo `mcp__codex_apps__clickup_clickup_`:

- `get_workspace_hierarchy`: descobrir espaços, pastas e listas.
- `get_list`: confirmar uma lista pelo ID ou nome.
- `search`: localizar tarefas por nome, descrição, link ou palavras-chave.
- `get_task`: consultar uma tarefa conhecida.
- `get_task_comments`: ler o histórico de comentários.
- `create_task`: criar uma nova tarefa.
- `resolve_assignees`: converter nomes/e-mails em IDs de usuários.
- `update_task`: alterar status, responsáveis, descrição, prioridade ou datas.
- `create_task_comment`: registrar uma atualização quando solicitado.
- `get_current_time_entry` e `start_time_tracking`: consultar e iniciar cronômetro, somente quando o usuário pedir controle de tempo.

O workspace autenticado é preenchido automaticamente quando `workspace_id` é omitido. Informar esse campo apenas se o usuário fornecer explicitamente outro workspace.

## 1. Verificar acesso e localizar WebDesign

1. Fazer uma leitura inicial com `get_workspace_hierarchy(max_depth=0)` para confirmar que o conector está autenticado.
2. Em seguida, consultar `get_workspace_hierarchy(max_depth=2, limit=50)`.
3. Procurar correspondência exata, ignorando maiúsculas/minúsculas, para `WebDesign` entre espaços, pastas e listas. Registrar o tipo e o ID encontrado.
4. Se houver mais de uma correspondência, comparar o contexto pai e pedir confirmação antes de criar ou mover qualquer item.
5. Se WebDesign não aparecer, paginar usando `cursor` antes de concluir que o ambiente não existe. Se ainda não for encontrado, informar que não foi possível confirmar o ambiente; não criar um novo espaço, pasta ou lista sem autorização.

Quando o usuário disser apenas "no WebDesign", interpretar como localização do projeto, não como nome de lista. A criação exige uma `list_id`; se o espaço WebDesign contiver várias listas e o usuário não indicar uma, perguntar qual lista deve receber a tarefa.

## 2. Consultar uma tarefa

### Quando o usuário fornece um link

1. Extrair o identificador da tarefa do último segmento do link. Em links no formato `https://app.clickup.com/t/<workspace>/<task_id>`, usar `<task_id>` no parâmetro `task_id`; o primeiro número é o workspace, não a tarefa.
2. Chamar `get_task(task_id=..., detail_level="detailed")`.
3. Conferir nome, status, responsáveis, lista, pasta, espaço, descrição, subtarefas e URL retornada.
4. Chamar `get_task_comments(task_id=...)` para obter o contexto mais recente quando a tarefa envolver alterações, continuidade ou comentários da equipe. Paginar se houver `start`/`start_id` na resposta.

### Quando o usuário fornece nome ou assunto

1. Usar `search` com `keywords` específicos e `filters.asset_types=["task"]`.
2. Depois de localizar WebDesign, restringir a busca por localização quando os IDs estiverem disponíveis: `location.projects` para espaço, `location.categories` para pasta e `location.subcategories` para lista.
3. Conferir os candidatos por nome completo, descrição e URL. Não escolher por semelhança parcial quando houver mais de um candidato plausível.
4. Consultar a tarefa escolhida com `get_task` e, quando necessário, ler seus comentários.

Entregar ao usuário um resumo objetivo: tarefa, link, localização no ClickUp, status atual, responsáveis e próximos itens relevantes.

## 3. Criar uma tarefa no WebDesign

1. Confirmar o título e a lista de destino. Se o usuário não informar a lista, localizar uma lista única dentro de WebDesign; se houver ambiguidade, pedir confirmação.
2. Fazer uma busca pelo título exato ou por termos distintivos antes de criar. Se já existir uma tarefa equivalente, apresentar o link e perguntar se deve atualizar essa tarefa em vez de duplicá-la.
3. Resolver responsáveis com `resolve_assignees(assignees=[...])`. Não enviar nomes diretamente como IDs. Se algum nome não for resolvido, informar qual ficou pendente.
4. Chamar `create_task` com `list_id`, `name` e apenas os campos fornecidos ou claramente autorizados. Usar `markdown_description` para descrições estruturadas. Só definir status se ele for válido para a lista.
5. Consultar a tarefa recém-criada com `get_task` para confirmar ID, localização, responsáveis e link.
6. Se o usuário também pediu para iniciar, seguir a seção 4 depois da confirmação da criação.

Não criar uma pasta, lista ou espaço como substituto de uma tarefa sem pedido explícito. Não preencher datas, prioridade, tags ou responsáveis por inferência não confirmada.

## 4. Iniciar o trabalho da tarefa

Interpretar "iniciar a tarefa" como colocar a tarefa em andamento, salvo se o usuário mencionar explicitamente cronômetro, horas ou time tracking.

1. Consultar a tarefa e identificar o status atual e a lista.
2. Consultar `get_list` para confirmar os status disponíveis, quando a resposta trouxer essa informação.
3. Se a tarefa já estiver em um status ativo ou em andamento, não fazer alteração redundante.
4. Se houver um status ativo claramente válido na lista, chamar `update_task` passando somente `task_id` e `status`. Usar o nome exato do status retornado pela lista; não presumir que seja `in progress`, `em andamento` ou `active`.
5. Se não for possível identificar um status válido, não tentar combinações aleatórias. Informar o bloqueio e pedir o status desejado.
6. Criar comentário de início somente se o usuário pedir registro ou comunicação no ClickUp. Nesse caso, usar `create_task_comment` e manter o texto factual, por exemplo: "Iniciei a execução da tarefa. Próximo foco: ...".

### Cronômetro

Só iniciar o time tracking quando o pedido mencionar explicitamente "iniciar cronômetro", "registrar horas" ou equivalente.

1. Chamar `get_current_time_entry` antes de iniciar.
2. Se já existir um cronômetro ativo, informar a tarefa associada e não interrompê-lo nem trocá-lo sem autorização.
3. Se não existir cronômetro ativo, chamar `start_time_tracking(task_id=...)`. Definir `billable` ou tags somente se o usuário fornecer essa orientação.
4. Confirmar o resultado e informar se o status da tarefa foi alterado separadamente; iniciar cronômetro não muda automaticamente o status.

## 5. Atualizar uma tarefa existente com segurança

- Usar `update_task` somente com os campos que precisam mudar; os campos omitidos devem permanecer intactos.
- Antes de substituir uma descrição, preservar o conteúdo atual ou usar a instrução explícita do usuário para substituir.
- Resolver e confirmar IDs de responsáveis antes de alterar assignees.
- Não alterar, fechar, arquivar, apagar ou mover tarefas como efeito colateral de uma consulta.
- Após qualquer mutação, chamar `get_task` novamente e reportar o antes/depois relevante.

## Critérios de conclusão

Considerar o fluxo concluído somente quando houver evidência de:

- acesso autenticado ao workspace;
- localização confirmada de WebDesign;
- tarefa consultada ou criada com ID e link;
- lista, status e responsáveis conferidos;
- status alterado para um valor válido quando o trabalho foi iniciado;
- cronômetro iniciado apenas quando explicitamente solicitado;
- ambiguidades, falhas de acesso ou nomes não resolvidos comunicados claramente.

Responder em português claro, com o link da tarefa e um resumo curto das alterações feitas. Não afirmar que o trabalho foi iniciado se apenas a tarefa foi consultada ou criada.
