# Validação — 15/10/2026

## Resultado

Prévia HTML e fragmento Elementor gerados e verificados. Nada foi publicado ou alterado no WordPress.

| Verificação | Resultado |
| --- | --- |
| Conteúdo | 6 destaques, 28 entradas de catálogo (13/9/6), 5 coordenadores, 3 vídeos de depoimento, 3 relatos escritos, 1 vídeo institucional e 3 notícias |
| Estrutura | Um H1, hierarquia de títulos, IDs únicos, âncoras existentes e ausência de links vazios |
| Arquivos | Imagens e quatro fontes locais presentes; 47 assets no manifesto, aproximadamente 1,26 MB incluindo licença e manifesto |
| HTML Validate | Sem erros |
| JavaScript | Sintaxe válida; sem erros de página no roteiro de navegador |
| Layout 1440 × 900 | Sem overflow; 3 cards por trilho; imagens carregadas |
| Layout 1024 × 900 | Sem overflow; 3 cards por trilho; imagens carregadas |
| Layout 768 × 900 | Sem overflow; 2 cards por trilho; imagens carregadas |
| Layout 390 × 844 | Sem overflow; 1 card por trilho; imagens carregadas |
| Sem script em 390 px | Sem overflow e sem envio/navegação ao clicar em Pesquisar ou apertar Enter |
| Carrosséis | Primeiro/meio/último estado dos três trilhos; paginação, limites dos botões, teclado, arraste sem navegação e resize com posição válida |
| Menu | Abertura, submenu e Escape em tablet/celular |
| Hero | Três slides em 1440/1024/768/390 px; arte desktop/mobile correta; setas, indicadores, autoplay de 5 s, pausa/retomada, gesto horizontal e slides inativos inertes |
| Tipografia e navegação | Poppins SemiBold efetivamente renderizada, confirmada por CDP; espaçamento natural, sem síntese de pesos; quatro chevrons SVG; rótulos Área 01/02/03 removidos |
| Depoimentos | Expansão do texto integral |
| Vídeos | Nenhum iframe inicial; clique cria o player correto e remove o link que poderia cobrir seus controles |
| Equivalência | Mesma marcação na prévia e no widget; URLs absolutas; verificador também passou com base HTTPS alternativa |
| Tema simulado | Fontes/cores/controles internos mantidos; estilos externos de sentinela preservados; nenhum asset quebrado |
| Revisão da busca e rodapé | Campo textual na largura inteira; três seletores e botão na linha seguinte em 1440/1024/768 px; campos empilhados em 390/320 px, sem overflow. CTAs do cabeçalho/rodapé para /pos/, eventos removidos somente do rodapé e três ícones sociais com nome acessível |

## Separação em peças — 15/10/2026

Cabeçalho, home e rodapé passaram a ser gerados como peças independentes; a busca demonstrativa foi substituída pelo widget Shortcode [phorte_pos_search].

| Verificação | Resultado |
| --- | --- |
| verificar.mjs | Aprovado com a base padrão e com base HTTPS alternativa: equivalência de cada peça com a prévia, URLs absolutas, templates JSON, IDs únicos e âncoras |
| HTML Validate | Sem erros |
| qa-navegador.cjs | Aprovado em 1440/1024/768/390 px; busca entre hero e seções; submenu do cabeçalho acima do hero; sem erros de página |
| qa-hero.cjs | Aprovado; controles do hero livres da busca nas quatro larguras |
| Peças isoladas | Cabeçalho e rodapé em página com main do tema e estilos externos: menu, Escape, atalho de conteúdo para #content e estilos preservados |
| Fontes na prévia | Quatro pesos da Poppins carregados; nenhum recurso com erro |

Não reexecutados nesta etapa: axe-core e a fixture de tema da home completa. Importação dos templates JSON e execução real do shortcode no WordPress não foram testadas.

### Imagens publicadas e escopo da base

- 43 URLs de imagem dos widgets conferidas em https://posphorte.com.br/wp-content/uploads/2026/10/: todas com resposta 200.
- Widgets montados em sequência numa página de teste com Poppins do Google Fonts: 51 imagens carregadas, Poppins 400/500/600/700 renderizada, sem recursos com erro.
- Achado e corrigido: a base CSS repetida no widget do rodapé redefinia --hp-columns da home (um card por vez no desktop). Após restringir a base de cada widget ao próprio escopo: 3/3/2/1 cards em 1440/1024/768/390 px, sem overflow, submenu acima do hero e menu móvel acima do conteúdo.

### Otimizações após o PageSpeed — 15/10/2026

PageSpeed desktop da home publicada: Desempenho 65, Acessibilidade 97, Práticas recomendadas 96, SEO 92; LCP 1,0 s, TBT 1.000 ms, CLS 0,07. O TBT vem sobretudo de scripts de terceiros carregados em todas as páginas (dois contêineres do Google Tag Manager, cinco IDs de Analytics/Ads, Pixel do Facebook, Google Maps, Clarity, RD Station), iguais na home, em /pos/ e numa página de curso. A parte da home foi tratada nos widgets:

| Item | Antes | Depois (página publicada reconstruída com os widgets novos) |
| --- | --- | --- |
| Faixa vazia no celular | 29 px abaixo do cabeçalho e 110 px abaixo do rodapé (contêiner com flex-wrap) | Widget com largura definida: 119/119 px e 1043/1043 px |
| Imagens dos destaques | Original de 1000 px (~31 KB) | srcset do WordPress; 768 px (~21 KB) em celular DPR 2 |
| Arte do Dia dos Professores | 203 KB (desktop) e 195 KB (celular) | srcset: 1536 px (114 KB) ou menor; celular 768 px (92 KB) |
| Miniaturas do slide 2 (92 px) | Original de 1000 px | Versão de 244 px (~5 KB) |
| Troca de fonte (CLS) | Arial simples: texto até 28 px mais baixo que Poppins no hero | Fallback ajustado: altura igual à Poppins em 7 de 8 medições (1440/1024/768/390 px, dois slides) |
| Região principal | Sem main; atalho "Pular para o conteúdo" sem destino | Contêiner da home com role="main" e id="hp-main" pelo script, quando o Elementor não define a tag |

Não medido: nova nota do PageSpeed. A cota pública da API estava esgotada e a análise pela interface não concluiu; repetir depois de colar os widgets.

## Acessibilidade

axe-core 4.11.1 executado nas larguras 1440, 1024, 768, 390 e 320 px, com regras WCAG 2 A/AA, 2.1 A/AA, 2.2 AA e boas práticas: **zero violações automáticas**; 41 regras aprovadas em cada largura.

A ferramenta deixou contraste para inspeção manual em símbolos decorativos e no hero com pseudo-elemento/gradiente. A inspeção visual e o cálculo dos pares de cores verificaram:

- Branco sobre vermelho primário: 5,02:1.
- Rosa do título sobre o limite mais claro do gradiente: 6,49:1.
- Texto de apoio sobre esse mesmo limite: 8,79:1.
- Branco sobre o fundo composto do pequeno cartão do hero: 14,56:1.

Foco de teclado nos cards e no botão de vídeo usa contorno interno, preservado pelo recorte dos contêineres. Movimento reduzido testado. Os controles alternativos dos vídeos têm alvo mínimo de 32 px.

## Revisão independente e correções

Um segundo agente revisou a implementação e confirmou duas colunas em 768 px, arraste sem navegação e menu desktop. Foram corrigidos os achados:

1. Submissão GET da busca quando o script era bloqueado: retirado o formulário nativo. O cenário falhou antes da correção e passou depois.
2. Contorno de foco recortado pelos cards: indicador desenhado dentro dos limites e verificado no navegador.
3. Link alternativo sobre os controles do iframe: removido após ativar o vídeo.
4. Verificador que aceitava apenas a base padrão: passa a ler o manifesto de publicação; base alternativa testada.
5. Alvo pequeno dos links alternativos: ampliado após identificação pelo axe; auditoria repetida sem violações.

Nenhum achado dessa revisão ficou pendente.

Na revisão adicional do hero, foi identificado que usar setas enquanto um link do slide tinha foco o tornava inerte e deslocava o foco para o documento. O atalho foi restrito aos controles estáveis. O roteiro qa-hero.cjs verifica tanto a preservação do foco nos links quanto nos controles após trocar o slide.

## Evidências e limites

Roteiros reproduzíveis: scripts/qa-navegador.cjs e scripts/qa-hero.cjs. Relatórios JSON e capturas em output/playwright/home-posphorte/ na raiz do repositório, ignorados pelo Git.

A integração foi verificada em uma fixture local com estilos de tema e roteamento das URLs de mídia para os assets locais. Não foi testada dentro de uma instalação autenticada do Elementor. A pasta de mídia de destino precisa ser carregada antes de instalar o widget.

O teste de vídeos verificou criação do iframe, ID e ausência de sobreposição, interceptando a navegação externa do player. Reprodução real e disponibilidade dos vídeos devem ser verificadas na prévia WordPress; não foram inferidas desse teste.

A rolagem por toque usa o comportamento nativo do navegador. Não houve ensaio em aparelho físico. Links institucionais preservam os destinos da coleta, sem auditoria dos sistemas de matrícula externos.

As pendências de autoria, URLs de Fisiologia e indicadores institucionais estão em referencias/LEVANTAMENTO.md.
