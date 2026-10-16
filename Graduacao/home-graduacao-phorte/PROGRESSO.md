# Execução — plano: docs/superpowers/plans/2026-10-16-home-graduacao-phorte.md

Autorização: usuário pediu “prossiga” em 16/10/2026 após receber as duas propostas e o plano.

## Preparação

- Escopo: somente nova pasta de graduação e seu plano. Pós e alterações de outras tarefas preservadas.
- Ruling: permanecer no checkout atual `codex/graduacao-header-elementor`, conforme plano aceito e continuidade do projeto local. Nenhuma troca de branch ou cópia de alterações de outras tarefas.
- Ruling: executar diretamente em PowerShell, com registro persistente neste arquivo; não criar commits nem publicar por iniciativa própria. Revisão final cobre os arquivos locais novos, não um intervalo de commits inexistente.
- Interfaces 1→2: conteúdo único fornece os sete IDs e URLs; renderização não inventa metadados ausentes.
- Interfaces 2→4: ordem/atributos das duas variantes e funções de renderização serão usados pelo JS e pelos testes.
- Interfaces 2/3/4→5: as peças precisam funcionar separadamente e com o widget de formulário entre fragmentos, sem depender de um wrapper que o Elementor não garante.
- Ruling: usar a sede Rui Barbosa e telefone geral; manter arte sazonal atual para comparação, identificando sua revisão editorial pendente no guia.

## Etapas

1. Conteúdo e assets: concluído; verificador passou 67 verificações após falhar pela ausência da base. 35 assets com origem/dimensões e cinco pesos da Poppins + OFL.
2. Composição estática A/B: gerada; verificador completo passou 109 verificações. HTML validator passou nas duas páginas após adequar semântica do banner importado.
3. Cabeçalho/rodapé: concluídos; menu mobile/Escape e isolamento conferidos.
4. Interações: concluídas; QA de navegador com 64 verificações, axe0 em A/B, sete cursos sem JS. Integração com 33 verificações, incluindo autoplay/foco e fallback.
5. Pacotes Elementor: concluídos localmente; quatro ZIPs extraídos e comparados com os arquivos-fonte gerados. Uploads pendentes: um logo no cabeçalho, sete cursos em cada home, um logo no rodapé.
6. QA, revisão e documentação: concluídos localmente. Revisão final independente identificou um P2 de fallback de vídeo; corrigido e validado. Prévias A/B e comparação disponíveis para revisão do usuário.

- Ruling: o formulário fica entre fragmentos HTML totalmente fechados; o slot não pode abrir tags no primeiro widget e fechá-las no último. Ajustado o seletor de QA para a região independente `hg-formulario`.
- Prévia RED: navegador retornou 404 antes da geração. Primeira execução sobre páginas geradas confirmou os layouts e filtros, depois apontou o seletor antigo do formulário; corrigido conforme a composição independente.
- Correções RED→GREEN: papéis ARIA do banner/painéis em elementos compatíveis; teste de faixa vazia entre widgets reproduziu a sobrescrita da base CSS pelo rodapé e passou após ajuste de especificidade. HTML validator sem erros.
- Ruling: templates importáveis usam um placeholder visual sem envio no widget central. A configuração real de ações/CRM/consentimento do Form não foi exposta pela leitura pública e não foi presumida. Custo/limite: requer substituir/homologar esse widget antes de publicar.
- Ruling: fonte incorporada nos widgets evita upload de WOFF2 e dependência da Poppins do tema; nove arquivos novos de imagem/logo têm upload pendente explícito. Custo/limite: estilos maiores e necessidade de publicar esses assets antes da instalação.

## Fechamento da implementação local

- Revisão independente: um achado material — o link alternativo sumia após abrir o player. O bloqueio do domínio de vídeo reproduziu a falha (RED); a correção mantém o link abaixo do iframe, sem sobrepor controles (GREEN). Nenhum outro achado material foi reportado nos cinco focos da revisão.
- Verificação final: 109 itens estáticos, HTML validator sem erros, 64 verificações de navegador e 33 de integração aprovadas; sintaxe dos JS/geradores válida. Quatro ZIPs reextraídos e comparados após a última geração. Capturas desktop/mobile conferidas, incluindo imagens decodificadas antes da captura.
- Ruling: importação real do Elementor, plugins/tema em produção, ações/recebimento do Form, disponibilidade/reprodução real dos vídeos e publicação dos nove assets não foram inferidos dos testes locais. Custo/limite: homologar esses pontos antes de colocar a nova home em produção.
- Ruling: copy nova e dados comerciais/editoriais ainda exigem validação do responsável; não alegar superioridade de conversão de A sobre B sem medição.
- Nenhuma publicação, importação remota, envio de leads, commit ou push realizado. Alterações da pós e outros trabalhos permaneceram fora desta entrega.

## Refinamento B por solicitação do usuário — 16/10/2026

- B escolhida como direção: opções de cursos em faixa contínua e progresso nativo; movimento de cursos/relatos/parceiros recicla nós sem clones. Setas, arraste, teclado e pausa; preferência por movimento reduzido respeitada. Painel de curso muda por seleção, sem troca automática durante leitura.
- Rui Barbosa e Martiniano confirmadas pelo usuário, com imagens/endereço do inventário público e cards expansíveis. Horários/funções não foram presumidos. A mantém a composição anterior com Rui Barbosa.
- Depoimentos: copy real visível em duas linhas, clique expande/recolhe, sem Ler relato. Sem JS, texto completo e endereços continuam disponíveis.
- Contato B compacto com três campos e Enviar na linha desktop, aceite abaixo e telefone com prefixo Brasil visual; Form continua sem envio até homologação da integração. Atualizado guia com classe hg-form-compact para o slot nativo.
- Revisão independente: P2 de iframe recarregando na reciclagem; teste reproduziu e foi corrigido pausando com vídeo aberto e restaurando pôster antes de navegar/reciclar. Teste comprova requisição única após oito avanços e reabertura após fechar. Nenhum outro achado material nessa revisão.
- QA do refinamento: 38 verificações aprovadas; verificador geral atualizado para 110 e duas unidades. Demais suítes e pacotes novamente conferidos após a alteração. Nenhuma publicação/importação/envio/commit/push.

- Leitura/reprodução estáveis: a faixa pausa também com relato expandido e durante toque/arraste, com pequena espera após soltar. Botões de movimento continuam disponíveis.

## Segunda rodada do refinamento B — 16/10/2026

- Revisão contra as referências do usuário: faixa de cursos ocupava ~60% da largura, unidades abriam para baixo e fotos tinham o selo “unidade 1/2” embutido (por isso eram mascaradas), contato não seguia a referência.
- Cursos: opções viraram mini-cards (miniatura, número e nome) em toda a largura do contêiner; o conteúdo transborda e a faixa circula de fato. Nome acessível continua só o nome do curso.
- Unidades: fotos paisagem sem selo do protótipo da pós (`wp-content/uploads/2026/02/UNIDADE-1/2-…webp`, já publicadas). Clique abre card branco **ao lado** no desktop (abaixo em tablet/celular) com Endereço, Contato e Como chegar, e botão “Unidade N ⊖” que fecha e devolve o foco. Horário/descrição só aparecem se `hours`/`text` forem informados em `conteudo/home.json` — não presumidos.
- Depoimentos: selo de aspas, curso em etiqueta, elevação ao passar o mouse; mantém duas linhas + expandir.
- Contato: título/linha conforme referência, gradiente magenta→coral da paleta Phorte, campos brancos, bandeira SVG com seta e divisória no telefone (o emoji 🇧🇷 virava “BR” no Windows), Enviar escuro, checkbox branco. Aceite segue desmarcado por padrão.
- QA: refinamento B ganhou 4 verificações (largura da faixa, detalhes inertes, abertura lateral, foco ao fechar). Verificador 112, HTML validator, navegador 64, integração e pacotes aprovados. Nenhuma publicação/importação/envio/commit/push.

## Componentes do protótipo Vercel na B — 16/10/2026

- Usuário pediu manter a ordem da B e trazer do protótipo: cards de curso com tipo/área/semestres, linha do tempo institucional, frase do polo EAD e blog com data/autor; manter as 2 unidades.
- Cursos: `degree`, `area`, `duration` em `conteudo/home.json`, com `metaSource`. Duração e grau conferidos nas páginas oficiais `faculdadephorte.edu.br/graduacao/*` (ex.: Marketing “Tecnólogo · 4 semestres”, Tradução “Bacharelado · 6 semestres”). Modalidades seguem o cadastro público (o protótipo descreve Educação Física como “atividades presenciais e online ao vivo”; não substituído). Mini-cards mostram o grau; painel mostra área, selo de grau, semestres e “Ver detalhes do curso”.
- A Faculdade: linha do tempo 1996 Editora · 2007 Instituto · 2018 Faculdade (texto do protótipo; validar com o institucional).
- Unidade Rui Barbosa: “Também é o polo das provas presenciais dos cursos EAD.” Martiniano sem texto adicional.
- Blog: título “Últimas publicações do Blog”, selo Artigo, data por extenso, resumo e autoria da API pública do WordPress (fotografia estática; no Elementor pode virar widget Posts nativo).
- Verificador ajustado: preço segue proibido; grau/duração exigem área e fonte. Teste de integração aceita o novo rótulo do botão. Verificador 119, HTML validator, refinamento B, navegador e integração aprovados; pacotes refeitos.

## Versão C editorial concluída — 16/10/2026

- Pedido: “mais uma versão para Elementor mais refinada”; usuário escolheu concluir a opção C editorial já iniciada (EBAC + identidade Phorte), em vez de nova C sobre a B ou de B com widgets nativos.
- Ligação: `variantes.json` ganhou `c` (hero, caminhos, catálogo, formatos, instituição, unidades, relatos, contato, parceiros, blog, FAQ). `gerar.mjs` usa `renderizar-c.mjs`, `editorial-c.css`, `editorial.js` e gera `previa-c/`, `elementor/home-c/` e `elementor/cabecalho-c/` (cabeçalho em cápsula). Empacotador e verificador cobrem as seis peças e três variantes.
- Conteúdo: catálogo C com grau, área e duração (mesma fonte da B); abertura anuncia “Matrículas abertas 2027.1” (post oficial de 09/10/2026). Sem banner de campanha na C.
- Refino: hover dos cards de curso/formatos, destaque da duração, foco visível; no celular catálogo, formatos e blog viram faixas com deslize e dica — página de ~16,7 mil px para ~11 mil px, sem rolagem lateral.
- QA: `qa-editorial-c.cjs` 38 verificações (incluindo faixas no celular e axe); corrigido `role=listitem` inválido em `article`. Verificador 148, html-validate nas três prévias, B/navegador/integração aprovados e seis ZIPs reextraídos e comparados. Nenhuma publicação/importação/envio/commit/push.

## Ajustes pedidos sobre a C — 16/10/2026

- Caminhos (“Cada história tem um começo”): duas imagens novas geradas no Magnific (colagem P&B com formas vermelho/amarelo): `caminho-primeira-graduacao.webp` (card vermelho #d92321) e `caminho-nova-trajetoria.webp` (card amarelo #fab000), imagem de ponta a ponta na base do card. Anéis decorativos fora da paleta removidos. Uploads pendentes; revisar direitos de uso.
- Unidades (compartilhado A/B/C): duas colunas de ponta a ponta; ao abrir, a foto divide o card com as informações (uma coluna abaixo de 1024 px; informações abaixo da foto abaixo de 600 px). Corrigido texto de leitor de tela do botão de fechar que criava 9 px de rolagem lateral.
- Depoimentos: “Mostrar mais/menos” só para leitor de tela; sem seta visível.
- Faixas infinitas: removidas barras de progresso e botões de pausa; cursos e relatos não andam sozinhos — repetem ao rolar/arrastar/setas (setas com deslize suave). Parceiros seguem como marquee contínuo, parando no hover/foco e com movimento reduzido.
- Parceiros sem borda/caixa. Rodapé com selo QR do e-MEC (imagem oficial publicada) e link para o cadastro no e-MEC.
- QA: B atualizado (sem pausa/progresso, sem animação em cursos/relatos, marquee e hover, leitor de tela); C com 5 checagens novas. Verificador 151, html-validate, B/navegador/integração/C aprovados, pacotes refeitos.
- Formatos de estudo (C): quatro cards só em tons de vermelho, do claro ao vermelho Phorte (Online ao vivo em #d92321 com texto branco). QA C e pacotes refeitos.
- Carrossel de banners 3:1 no topo da C (antes da abertura): três destaques em HTML editável (Matrículas 2027.1, Transferência/segunda graduação, Online ao vivo) sobre imagens geradas no Magnific e estendidas para 3:1. Setas, pontos, toque e teclado; volta do último ao primeiro; sem autoplay nem progresso. No celular o texto fica acima da imagem. QA C com 8 checagens novas; todas as suítes aprovadas, pacotes refeitos.

## B na estrutura editorial — 16/10/2026

- Pedido: atualizar a B com a estrutura da C, mantendo o carrossel de campanha no topo. B agora: campanha 2027 (dois slides) → caminhos → catálogo com busca → formatos → instituição/linha do tempo → unidades → relatos → contato → parceiros → blog → dúvidas, com cabeçalho editorial. A ordem anterior “preservada” deixa de existir; A segue como alternativa.
- Gerador: `variantes.json` b com `catalogMode: editorial` e `hero: campaign`; o renderizador editorial reaproveita o hero da campanha e o gerador inclui CSS/JS do carrossel 2027 nesse caso. Pacote B passa a usar `pacote-cabecalho-c.zip`.
- QA: `qa-editorial.cjs <b|c>` substitui `qa-editorial-c.cjs` e cobre B (campanha no topo, avanço, cabeçalho editorial, sem banner 3:1) e C. `qa-refinamento-b.cjs` aposentado (testava abas e banner de cursos da B antiga); navegador/integração passam a cobrir só A. Verificador 149, html-validate nas três prévias, pacotes refeitos.
- Slide do Dia do Professor removido do carrossel de campanha (campanha encerrada): o gerador descarta o slide de imagem do arquivo de origem (não alterado), imagens e entradas do manifest apagadas. Com um slide, o script do banner oculta os controles. Testes ajustados; todas as suítes aprovadas, pacotes refeitos. O artigo do blog sobre o Dia do Professor permanece (conteúdo editorial, não campanha).
- C: carrossel de banners 3:1 movido para logo após o catálogo de cursos (antes de Escolha como estudar), com o fundo cinza do catálogo; abertura tipográfica volta a ser o topo. Imagens do banner passam a carregar sob demanda.

## Fechamento da sessão — 16/10/2026

- Documentação consolidada: README reescrito com as três versões, estrutura editorial, decisões de interação, fontes de edição, testes e pendências de publicação; VALIDACAO com quadro do estado atual; PROPOSTAS marcada como histórica para a B.
- Verificação final: verificador 147, html-validate sem erros, qa-editorial B 46 e C 51, navegador 30, integração 18; seis ZIPs comparados. Commit apenas da pasta da home e do plano; alterações da pós, políticas e do header de campanha permanecem fora.
