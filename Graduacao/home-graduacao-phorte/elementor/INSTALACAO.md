# Elementor — três versões da home de graduação

Pacotes locais para revisão, gerados por `scripts/empacotar.mjs`; os ZIPs não são versionados. **Nada foi importado ou publicado no WordPress por esta implementação.** O formulário presente nos templates é uma prévia visual sem envio; deve ser substituído pelo Form nativo com suas ações verificadas antes de uso público.

## Peças

| Peça | Pacote | Conteúdo |
| --- | --- | --- |
| Cabeçalho | `pacote-cabecalho.zip` | Widget HTML e template de seção comuns |
| Home A | `pacote-home-a.zip` | Jornada reorganizada: busca, grade de sete cursos, modalidades, ingresso e demais blocos |
| Home B | `pacote-home-b.zip` | Estrutura editorial da C abrindo com o carrossel de campanha 2027 (dois slides); usar com `pacote-cabecalho-c.zip` |
| Home C | `pacote-home-c.zip` | Editorial: abertura tipográfica com os sete cursos em pílulas, dois caminhos de entrada, catálogo com busca e grau/área/duração, formatos de estudo, instituição com linha do tempo, duas unidades, relatos, contato, parceiros, blog e FAQ. No celular, catálogo, formatos e blog viram faixas com deslize |
| Cabeçalho C | `pacote-cabecalho-c.zip` | Mesmo cabeçalho em cápsula clara, sem barra utilitária, para acompanhar a Home C |
| Rodapé | `pacote-rodape.zip` | Widget HTML e template de seção comuns às três homes |

Escolher **uma home por página**. As versões compartilham IDs; não colocar duas homes no mesmo documento. Home A usa `pacote-cabecalho.zip`; Homes B e C usam `pacote-cabecalho-c.zip` (instalar só um cabeçalho). O rodapé é comum. Cabeçalho e rodapé não devem ser duplicados pelo tema e pela página.

A Home C não inclui o banner de campanha 2027: a abertura é tipográfica e anuncia as matrículas 2027.1. Para campanhas sazonais, inserir o banner como seção própria acima de `hg-main` ou usar A/B.

## 1. Imagens e fonte

Os widgets usam URLs HTTPS. Mídias já publicadas na graduação conservam seus endereços originais. As sete imagens de cursos e os dois logos reutilizados do protótipo têm cópias locais novas e **uploads pendentes**.

A pasta `assets-para-upload/` de cada ZIP contém somente os arquivos novos necessários àquela peça. Fontes Poppins estão incorporadas no CSS dos widgets; a licença está em `OFL.txt`. Não há dependência do Google Fonts para esses cinco pesos.

O destino padrão dos novos assets é:

~~~text
https://faculdadephorte.edu.br/wp-content/uploads/home-graduacao-phorte/
~~~

Essa pasta **não foi criada remotamente**. Antes de instalar, enviar os arquivos para o destino escolhido e conferir as URLs. Se usar a biblioteca de mídia normal, ela poderá criar um caminho com ano/mês e renomear duplicados. Não supor que o arquivo recebeu o nome original.

Para outra pasta de upload, regenerar da raiz do repositório:

~~~powershell
node Graduacao/home-graduacao-phorte/scripts/gerar.mjs https://faculdadephorte.edu.br/wp-content/uploads/2026/10/
node Graduacao/home-graduacao-phorte/scripts/verificar.mjs
node Graduacao/home-graduacao-phorte/scripts/empacotar.mjs
~~~

Se algum nome mudar, registrar sua URL exata em `publishedUrl` no **arquivo-fonte** `assets/manifest.json` e regenerar. `elementor/assets-publicacao.json` e o manifest dentro do ZIP são saídas geradas; não corrigi-los isoladamente.

As imagens locais da prévia foram otimizadas; quando um widget aponta para um arquivo existente do WordPress, esse original pode ter mais bytes que a cópia local. Uma rodada posterior pode publicar também as cópias otimizadas e atualizar `publishedUrl`, sem alterar a composição.

## 2. Cabeçalho e rodapé

Com Elementor Pro/Theme Builder:

1. Importar o `template-elementor.json` da peça em **Modelos → Importar modelos**.
2. Inserir o modelo no template de Cabeçalho ou Rodapé escolhido.
3. Conferir condições de exibição e substituição do template atual em ambiente de homologação, antes de qualquer publicação.

Sem Theme Builder: usar Elementor Canvas e inserir cabeçalho antes e rodapé depois da home. Cada um pode ser montado com um widget HTML contendo `widget-html.html`.

Links de navegação usam destinos públicos absolutos. O script do cabeçalho resolve o atalho de conteúdo na home ou na região principal da página hospedeira.

## 3. Home A, B ou C

Cada pasta tem:

~~~text
1-antes-atendimento.html     HTML completo do início até o convite de atendimento; CSS e JS da home
2-formulario-previa.html    Composição visual SEM envio para comparar o desenho
2-formulario.txt            Instrução de substituição pelo widget Form
3-depois-atendimento.html   Trecho completo após o formulário, com fechamento editorial da página
template-elementor.json    Template com os três widgets HTML para revisar a composição
~~~

Os fragmentos são HTMLs independentes: nenhuma tag é aberta em um widget e fechada em outro.

Configuração do contêiner externo da home:

- Tag HTML `main`, ID CSS `hg-main`, classe CSS `hg-scope`.
- Largura total, direção vertical, sem quebra de linha.
- Padding, margens e gap em **0** nos três dispositivos.
- Widgets com largura 100%.

O template já propõe essa estrutura. Montagem manual: colocar os três widgets, na ordem acima, dentro desse mesmo contêiner. O script tem fallback para reconhecer o contêiner Elementor, mas configurar `main` e o ID explicitamente é preferível.

Página com Theme Builder: **Elementor Largura Total**, para usar o cabeçalho/rodapé do site. Página com todas as peças inseridas nela: **Elementor Canvas**.

## 4. Formulário real

O template importado tem somente uma composição visual: o botão Enviar fica desabilitado e a interface informa que não envia dados. Não remover essa identificação para fazer a prévia parecer funcional.

Para configurar a integração real, substituir o widget 2 por:

~~~text
Contêiner: ID hg-formulario · classes hg-scope hg-form-block (acrescentar hg-form-compact na versão B)
  Contêiner: classe hg-container
    Contêiner: classe hg-form-panel
      Widget Form do Elementor
~~~

Zerar padding/margem/gap desses contêineres; a folha da home fornece os espaçamentos. O último painel tem o fundo vermelho e os cantos inferiores, completando o convite do widget 1.

Reaproveitar os campos Nome, E-mail, Telefone e o aceite da página atual. Conferir **no editor** destinatários, ações após envio, integrações, antispam, mensagens, regras de aceite e política. O DOM público não revelou essas configurações; o pacote não inventa destinatário ou endpoint.

O CSS já contempla as classes usuais do Form do Elementor. A montagem foi testada com markup simulado; o widget e suas ações ainda precisam ser homologados no WordPress real. Testar recebimento de lead é uma ação posterior, com destino autorizado.

Na versão B, manter a classe `hg-form-compact` no contêiner externo do formulário: ela organiza três campos e Enviar na mesma linha no desktop, com aceite abaixo. Usar labels acessíveis e placeholders Nome/E-mail/Telefone. O prefixo Brasil +55 da prévia é visual e fixo; no Form real, configurar a entrada/validação brasileira de acordo com o widget disponível, sem presumir que o prefixo já foi incluído no valor enviado.

## 5. Scripts e isolamento

- CSS/classes novos usam `hg-`; banner aprovado mantém `phorte-header-2027`, uma instância por página.
- Pesquisa de A filtra sete cursos localmente. B usa sete abas em uma faixa horizontal contínua, com indicador de posição, arraste e controles. Não há consulta ao catálogo da pós.
- Na versão B, cursos, relatos e parceiros circulam reutilizando os nós originais, sem clones de IDs/players. O movimento para fora da tela, com foco/hover e durante arraste; também pode ser pausado pelo botão e começa pausado com movimento reduzido. O curso muda apenas ao selecionar uma opção. Durante um vídeo aberto ou um relato expandido, a faixa de depoimentos fica parada; avançar, arrastar ou levar o card para fora da faixa restaura o pôster antes de reciclar o nó. O controle Fechar vídeo também restaura o pôster, evitando reinícios/autoplay por movimentação de iframe.
- Inicialização suporta repetição e inserção de trechos pelo editor; hero tem um conjunto de controles.
- Vídeos só recebem iframe após clique. Link alternativo do YouTube disponível antes e depois da ativação.
- Os pacotes não registram shortcodes e não alteram `[phorte_pos_search]` ou `[category_dropdown]`.
- O HTML de publicação não tem tags `html/head/body`, metadados SEO, analytics ou pixels. Configurar SEO da página no WordPress, sem duplicar schemas/metatags existentes.

Após instalar uma revisão, limpar o cache do Elementor e o cache da página e conferir a página pública deslogada e o editor. Não considerar o resultado local como prova de homologação do tema ou das ações do formulário.

## 6. Revisão editorial antes de publicar

- Manter ou retirar a homenagem de 15/10/2026 e conferir a vigência da campanha 2027.
- Revisar a copy proposta dos cards, institucional, ingresso e FAQ.
- B inclui as duas unidades confirmadas pelo usuário: Rui Barbosa, 422, e Martiniano de Carvalho, 170. O telefone geral foi mantido; horários e finalidade de atendimento não foram presumidos. A mantém a composição anterior com Rui Barbosa.
- Arte de Pedagogia adaptada no protótipo Next é provisória; aprovar a imagem final.
- Conferir atualização dos três artigos do blog e seleção dos seis depoimentos.
- Não adicionar preço, duração, titulação ou claim MEC sem validar o dado específico.

O relatório `elementor/pacotes.json`, externo aos ZIPs, registra os hashes e o resultado da extração/comparação dos arquivos. O empacotador deve ser executado depois de cada geração para evitar distribuir uma revisão antiga.
