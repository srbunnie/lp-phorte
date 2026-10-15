# Busca de Pós Phorte — Angie Code Snippets

Widget Elementor nativo com shortcode próprio **[phorte_pos_search]**. O shortcode **[category_dropdown]** e sua implementação atual permanecem intactos. O Hero e o restante do cabeçalho continuam sendo elementos separados.

## Arquivos do snippet

- `main.php` registra o widget, os assets e a API REST pública somente de leitura.
- `widget-phorte-pos-search.php` contém os controles nativos e o markup.
- `style.css` contém o painel, os campos e os resultados responsivos.
- `script.js` conecta os campos ao catálogo e oferece resultados dentro da instância.
- `.env.example` registra `ANGIE_SNIPPET_ID=61861` como referência de implantação; o arquivo não contém credenciais e não é carregado pelo PHP.

## Instalação no Angie

1. Crie um Code Snippet do tipo **Elementor Widget**.
2. Adicione os quatro arquivos listados acima, mantendo os nomes e a estrutura no mesmo diretório.
3. Configure `main.php` como arquivo principal e salve/publice o snippet para teste.
4. Na página de prévia do Elementor, adicione um widget **Shortcode** contendo **[phorte_pos_search]**, ou use o widget nativo **Busca de Pós Phorte**.
5. Mantenha a busca atual com **[category_dropdown]** durante a comparação. O novo snippet não altera o registro nem o comportamento do shortcode antigo.
6. Ajuste os textos, tipografia, cores, bordas, sombra, espaçamento e exibição de campo nos controles do widget.
7. Revise desktop, tablet e celular; limpe os caches do Elementor e do site após a publicação aprovada.

O snippet precisa estar carregado no ambiente em que a prévia é renderizada para que a rota `/wp-json/phorte-pos-search/v1/` exista. A chamada REST consulta somente posts `pos-graduacao` publicados e sem senha e termos da taxonomia `pos_graduacao`. O navegador não escreve nem altera conteúdo.

O shortcode usa os valores padrão do componente e IDs exclusivos para cada ocorrência. Para editar seus textos e estilos pelos controles nativos, prefira inserir o widget Busca de Pós Phorte diretamente. Se outro código já registrar phorte_pos_search, este pacote preserva esse registro em vez de sobrescrevê-lo.

## Fontes e comportamento

- Modalidades: raízes permitidas 37, 157, 119 e 35. O servidor confere que o ID é raiz na taxonomia.
- Áreas: filhos diretos da modalidade selecionada. O servidor confere a relação pai/filho por ID.
- Cursos: associados à área selecionada, paginados até 100 por requisição.
- A pesquisa combina texto, modalidade e área. Os cursos encontrados aparecem abaixo dos campos; ao escolher um curso, o widget confirma a consulta combinada e navega para o permalink real.
- Se os campos de modalidade e área forem usados sem curso específico, os resultados continuam na própria instância. Não há dependência de uma página externa de busca.
- Respostas de erro oferecem repetição da consulta. Os seletores de área/curso são limpos ao trocar o filtro superior.
- Os termos usam IDs; nomes de áreas podem se repetir entre modalidades.

## Tipografia Poppins

O widget oferece os controles nativos de tipografia do Elementor. Para exibir Poppins, configure a fonte global em **Elementor > Configurações do site > Tipografia** ou no controle **Estilo > Tipografia** deste widget, se a instalação disponibilizar a família. O CSS usa a família herdada e não baixa fontes nem altera o carregamento global.

## Prompt de instalação/teste no Angie

> Instale em modo de teste o pacote independente Busca de Pós Phorte, com main.php como entrada e os arquivos widget-phorte-pos-search.php, style.css e script.js no mesmo diretório. Preserve o widget nativo e o shortcode exclusivo [phorte_pos_search]. Não registre, remova nem sobrescreva [category_dropdown] ou qualquer código da busca atual. Insira [phorte_pos_search] em um novo widget Shortcode na página de prévia, mantendo o original durante a comparação. Não altere o Hero nem publique a página. Confira a rota REST do snippet no ambiente de teste, os filtros combinados e os links de cursos. Mostre a prévia para revisão.

## Limites da validação local

Os fixtures desta pasta verificam o contrato do PHP e permitem renderizar markup para revisão local, mas não simulam Elementor, Angie, tema, autenticação ou os dados reais do WordPress. A API e o visual precisam ser conferidos em uma prévia de WordPress que tenha o snippet carregado.
