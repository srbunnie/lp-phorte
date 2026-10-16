# Busca da Pós Phorte no WordPress e Elementor

## Resposta prática

É possível usar o Angie para criar um widget nativo com esse layout e controles no painel do Elementor. O widget HTML também consegue exibir a interface, mas não executa PHP; sua busca dinâmica precisaria de código WordPress que consulte o catálogo.

Para esta home, a recomendação é um widget próprio chamado **Busca de Pós Phorte**, seguindo o registro e a organização do snippet 215 do e-commerce. O snippet 214, Phorte Search Chips, é outra referência útil para a separação entre apresentação e consulta, mas busca produtos de Cursos Livres e não deve ser copiado como fonte de dados da Pós.

O protótipo permanece demonstrativo. Este documento é o briefing para a futura implementação funcional; nenhum widget PHP foi instalado ou ativado na Pós.

Implementação local disponível em [../angie-busca-posphorte/README.md](../angie-busca-posphorte/README.md), com quatro arquivos próprios para Angie. A versão implementada mostra resultados de texto/filtros dentro da própria instância, dispensando criar uma página externa de resultados; ao selecionar um curso, confirma os critérios no servidor e abre o permalink retornado. As orientações abaixo registram o diagnóstico que deu origem ao componente. Nenhum snippet foi ativado ou publicado no WordPress.

## O que foi confirmado na Pós

Leitura pública em 15/10/2026:

- Tipo de conteúdo: **pos-graduacao**.
- Taxonomia hierárquica: **pos_graduacao**, nome de exibição “Áreas”.
- A taxonomia reúne modalidades no primeiro nível e áreas abaixo delas.
- Modalidades existentes: Ao Vivo/Online (ID37), EAD (ID157), Presencial (ID119), Presencial Híbrido (ID35).
- Áreas com nomes iguais têm IDs distintos conforme a modalidade. Exemplo: Administração EAD é ID178, filha de ID157; Administração ao vivo é ID163, filha de ID37.
- A consulta pública de posts retornou 179 cursos no momento da coleta; essa quantidade não deve ser fixada na interface.
- A home atual já utiliza os handlers AJAX get_modalidades e get_courses. Os nomes das variáveis no JavaScript existente estão trocados em relação aos rótulos da interface; não reproduzir essa confusão no novo widget.

Fontes públicas:

- <https://posphorte.com.br/wp-json/wp/v2/types>
- <https://posphorte.com.br/wp-json/wp/v2/taxonomies/pos_graduacao>
- <https://posphorte.com.br/wp-json/wp/v2/pos_graduacao?per_page=100>
- <https://posphorte.com.br/wp-json/wp/v2/pos-graduacao?per_page=1>

## Organização recomendada no Angie

Seguir o formato dos arquivos do snippet 215:

| Arquivo | Responsabilidade |
| --- | --- |
| main.php | Registrar widget, estilos, scripts e leitura dos dados necessários |
| widget-phorte-pos-search.php | Classe Elementor Widget_Base, controles do editor e HTML |
| style.css | Layout fiel à busca do protótipo, responsividade e foco |
| script.js | Seletores dependentes, estados da busca e inicialização no editor |

Controles do Elementor:

- Conteúdo: eyebrow, título, labels, placeholders, texto do botão e texto de ajuda.
- Exibição: mostrar/ocultar campo textual e seletor de curso.
- Estilo: tipografia nativa por grupo, cores, bordas, raio, sombra, espaçamento e tamanho responsivo dos campos/botão.
- Dados: origem fixa nos cursos da Pós; seleção das modalidades permitidas a partir dos termos reais. Sem repeater para recadastrar cursos manualmente.

Layout aprovado: campo “O que você busca?” na largura inteira da primeira linha. Na segunda linha, Modalidade, Área de conhecimento, Curso e botão Pesquisar. No celular, empilhar os campos e o botão. Manter o vermelho e os demais estilos da home.

## Fluxo funcional

1. Renderizar modalidades a partir dos termos raiz permitidos.
2. Ao escolher modalidade, carregar as áreas filhas e limpar a seleção anterior de área e curso.
3. Ao escolher área, carregar os cursos publicados associados àquele ID de termo.
4. Usar IDs na consulta; não filtrar por nomes visíveis, pois se repetem entre modalidades.
5. Com curso escolhido, Pesquisar abre o permalink real retornado pelo WordPress.
6. Para pesquisa textual ou filtros sem curso específico, usar uma página real de resultados de Pós, consultando os mesmos posts e termos. Essa página e seu contrato de parâmetros precisam ser implementados junto com o widget; não basta enviar parâmetros para uma rota que ainda não os interpreta.

As opções de área e curso devem mostrar estados de carregamento, ausência de opções e erro com possibilidade de tentar novamente. A pesquisa deve combinar os critérios preenchidos. As consultas de modalidades precisam considerar os descendentes: um termo raiz com count zero pode conter cursos nas áreas filhas.

O PHP pode encapsular os handlers existentes após conferir suas implementações. Se eles não atenderem à pesquisa combinada, criar uma camada de leitura própria sobre WP_Query. Usar somente cursos publicados, IDs validados, texto sanitizado, saída escapada e o permalink do post; o widget não cria nem modifica cursos.

## Inicialização e montagem da página

- Inicializar pela instância do widget, inclusive pelo hook de frontend do Elementor e nas reedições do editor.
- Não depender apenas de DOMContentLoaded.
- Usar classes próprias e registros de assets exclusivos, sem reutilizar o identificador do snippet 215.
- No editor, manter todos os textos e estilos ajustáveis pelos controles nativos.
- Na página de produção, separar **Hero da Pós** e **Busca de Pós Phorte** em widgets distintos.
- Atualização de 15/10/2026: o pacote foi dividido em peças e a home já reserva um widget Shortcode para [phorte_pos_search]; o bloco demonstrativo foi removido. Ver INSTALACAO.md.

## Prompt para o Angie

> Crie um Elementor Widget chamado “Busca de Pós Phorte”, usando como referência de arquitetura o Phorte Home Hero do snippet 215: main.php, classe do widget, style.css e script.js. Reproduza o layout da seção de busca do protótipo HTML da Pós, com título, campo textual, modalidade, área, curso e botão Pesquisar. Exponha labels, placeholders e controles nativos de tipografia, cores, bordas, espaçamento e responsividade.
>
> A origem real é o post type pos-graduacao e a taxonomia hierárquica pos_graduacao. As modalidades são termos raiz e as áreas são suas filhas. Consulte os dados reais; não crie listas fictícias, produtos WooCommerce nem um cadastro paralelo. Atualize área e curso conforme as seleções anteriores, limpando valores incompatíveis. Use os IDs dos termos, pois áreas homônimas existem em modalidades diferentes.
>
> O curso escolhido deve abrir seu permalink. Pesquisa textual e filtros sem curso específico devem levar a uma página de resultados implementada e compatível com esses parâmetros. Primeiro confira os handlers get_modalidades e get_courses do site para avaliar reaproveitamento. Forneça estados acessíveis de carregamento, erro e ausência de resultados, navegação por teclado e suporte à atualização do widget dentro do editor Elementor. Gere em modo de teste para revisão antes de ativar.

## Documentação oficial

- [Criar widgets com Angie](https://elementor.com/help/how-to-create-custom-widgets-using-elementor-angie-ai/)
- [Controles de widgets Elementor](https://developers.elementor.com/docs/widgets/widget-controls/)
