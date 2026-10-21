# Design QA — Educação Física

**final result: passed**

## Referências e evidências

- Página de referência: https://faculdadephorte.edu.br/graduacao/educacao-fisica/
- Exportação Elementor fornecida: `elementor-45283-2026-10-21.json` (preservada em Downloads).
- Capturas da referência: `referencias/source-desktop.jpg` e `referencias/source-mobile.jpg`.
- Capturas da implementação: `referencias/implementacao-desktop.jpg` e `referencias/implementacao-mobile.jpg`.

## Revisão visual

- Navbar e rodapé omitidos a pedido; o conteúdo começa no hero e termina na seção de suporte.
- Desktop em **937 × 880**: hero, carrosséis, galeria, ofertas e formulário conferidos sem overflow horizontal.
- Mobile em **390 × 844**: chamadas empilhadas, galeria e cards redimensionados, formulário em coluna e botão de suporte ajustado; sem overflow horizontal.
- Imagens, fontes e ícones usados na página carregam de arquivos locais.

## Conteúdo Elementor incorporado

- Textos de apresentação e números institucionais.
- Quatro áreas de atuação, oito semestres com suas ementas e galeria de espaços de prática: piscina, campo, sala de lutas e professores.
- Benefícios da abertura, formulário, mensalidade de R$ 520, duração, modalidade, certificado, período e FAQ.
- Corrigidos três erros de digitação evidentes no conteúdo: “Pesonal”, “qui” e “tranforme”. O contador do Elementor foi omitido porque sua data de encerramento era 10/09/2025 e já passou.

## Interações e acessibilidade

- Hero, áreas de atuação, semestres e galeria avançam automaticamente; pausam durante hover, foco ou interação direta e respeitam movimento reduzido.
- Setas do hero ficam dentro dos limites da imagem. Os demais controles ficam abaixo dos cards; pontos e setas continuam disponíveis para navegação manual.
- A galeria atualiza a imagem principal pelas miniaturas e setas. O título da apresentação anima palavra por palavra, com texto integral para leitores de tela.
- A seção institucional usa a marca local da Phorte com a mensagem “30 anos de excelência em educação”; a foto antiga da unidade Nacional foi removida.
- FAQ expande pelo teclado ou clique; botão de suporte ganhou área de toque maior.
- Máscara de telefone aplicada localmente. O formulário apenas mostra uma mensagem de demonstração e não envia dados.
- Vídeo abre o YouTube em outra página; nenhum vídeo, fonte ou imagem é carregado por iframe ou hotlink.
- Uma tag `<h1>`, rótulos de formulário, nomes acessíveis nos controles, foco visível e suporte a movimento reduzido.
- Largura do documento confere com a largura disponível nos viewports revisados; console do navegador sem erros na revisão final.

## Limites e publicação

- Links institucionais externos mantêm seus destinos originais.
- A cópia é estática e local. Nada foi alterado no WordPress nem publicado.
