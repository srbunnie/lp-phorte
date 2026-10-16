# Validação — prévias da Graduação Phorte

## Estado atual — 16/10/2026 (fechamento)

| Verificação | Resultado |
| --- | --- |
| `scripts/verificar.mjs` (conteúdo, ordens A/B/C, assets, fragmentos) | 147 verificações aprovadas |
| `html-validate` nas três prévias | sem erros |
| `scripts/qa-editorial.cjs b` | 46 verificações aprovadas, axe sem violações |
| `scripts/qa-editorial.cjs c` | 51 verificações aprovadas, axe sem violações |
| `scripts/qa-navegador.cjs` (A) | 30 verificações aprovadas |
| `scripts/qa-integracao.cjs` (A, fragmentos com Form entre widgets) | 18 verificações aprovadas |
| `scripts/empacotar.mjs` | seis ZIPs reextraídos e comparados byte a byte |

Limites permanecem os descritos abaixo: sem importação real no Elementor, sem envio de leads, sem reprodução real do YouTube, uploads pendentes e direitos das imagens geradas a conferir. O histórico a seguir registra as rodadas anteriores; números antigos referem-se à B anterior, hoje substituída pela estrutura editorial.

## Histórico

16/10/2026. Escopo: prévias HTML A/B e montagem local dos fragmentos Elementor. Nenhuma publicação/importação remota ou envio de formulário.

## Resultados

| Verificação | Evidência |
| --- | --- |
| Conteúdo, URLs, IDs, ordens, assets e fragmentos | `scripts/verificar.mjs`: 110 verificações aprovadas |
| HTML semântico | `html-validate`: A e B sem erros |
| Navegação e acessibilidade de browser | `scripts/qa-navegador.cjs`: 64 verificações aprovadas |
| Larguras | 320, 390, 768, 1024, 1440 px, em A/B: sem overflow de página e sem imagem quebrada |
| axe-core | Nenhuma violação em cada versão, na execução em 390 px |
| Sem JavaScript | Sete cursos visíveis e seus links disponíveis em A/B |
| Filtros A | Busca sem acento, modalidade, interseção vazia, mensagem e limpar |
| Abas B | Sete abas; End e seta de retorno; painel inativo removido da navegação |
| Hero | Dois slides, pausa inicial com movimento reduzido, setas, estado inativo inert, controles sem duplicação |
| Vídeos | Zero iframes antes do clique; inserção após clique; link alternativo preservado abaixo do player mesmo com falha; iframe simulado no teste |
| Formulário de prévia | Enter não realiza POST; botão desabilitado; identificação de prévia |
| Integração local Elementor | `scripts/qa-integracao.cjs`: 33 verificações aprovadas |
| Tema/peças separadas | Tipografia da graduação preservada; elemento externo em Georgia não muda; larguras 390/1440; painel do formulário sem faixa vazia |
| Falhas de mídia/fonte | Links de cursos continuam acessíveis, fallback legível sem overflow |
| Hero com movimento permitido | Avança automaticamente, foco pausa e botão retoma |

As capturas e JSONs estão em `output/playwright/home-graduacao-phorte/implementacao/`, ignorado pelo Git. Os roteiros usam o Playwright/axe já instalados no projeto vizinho `Phorte/node_modules`; isso é dependência da QA, não do HTML entregue.

## Comandos

Da raiz do repositório, com servidor local na porta 4177:

~~~powershell
node Graduacao/home-graduacao-phorte/scripts/gerar.mjs
node Graduacao/home-graduacao-phorte/scripts/verificar.mjs
npx --yes html-validate Graduacao/home-graduacao-phorte/previa-a/index.html Graduacao/home-graduacao-phorte/previa-b/index.html
node Graduacao/home-graduacao-phorte/scripts/qa-navegador.cjs
node Graduacao/home-graduacao-phorte/scripts/qa-integracao.cjs
node Graduacao/home-graduacao-phorte/scripts/empacotar.mjs
~~~

`HG_PREVIEW_BASE` permite informar outra URL base aos roteiros de navegador.

## Correções verificadas durante a execução

- A base editorial e as prévias foram verificadas antes de existir: os testes falharam por ausência do conteúdo e HTTP 404 e passaram após a implementação.
- Elementos do banner que tinham papel de grupo passaram de `article` para `div`; painéis das abas também usam `div` para o papel `tabpanel`. O axe identificou a incompatibilidade antes da correção.
- Repetição da base CSS no rodapé restabelecia padding nas seções especiais. Teste reproduziu a faixa vazia entre atendimento e formulário; a especificidade dessas seções foi ajustada e a prévia usa uma base única.
- O formulário é uma região independente entre fragmentos fechados; o teste passou a consultar essa região, em vez de pressupor um formulário dentro do widget anterior.

- A revisão independente identificou que o link alternativo do YouTube desaparecia ao ativar o player. Um teste com bloqueio de `youtube-nocookie.com` reproduziu a falha; a correção conserva o link abaixo do iframe, sem cobrir seus controles. O teste passou após a correção.
- O cabeçalho separado foi testado com uma região `main` da página hospedeira e também sem região principal; o menu continuou operante e sem erro.

## Revisão independente

A revisão final encontrou um achado material, corrigido acima. O revisor também executou o verificador de 109 itens. Não avaliou importação real no Elementor, compatibilidade com plugins/tema em produção, recebimento de leads, reprodução real dos vídeos, validade comercial/editorial, publicação dos nove assets ou superioridade de conversão entre A/B. Esses pontos permanecem fora das conclusões desta validação local.

## Limites

- A montagem nativa de Form foi simulada com classes usuais do Elementor. Ações, CRM, antispam, consentimento e recebimento de leads não foram testados no WordPress.
- Teste de iframe confirma criação/URL e ausência de carregamento antecipado; não comprova reprodução no YouTube nem direitos de uso.
- Viewports simulam tamanhos; não substituem teste em aparelhos físicos.
- axe automático não certifica acessibilidade integral. Contrastes sobre imagens e uso completo com tecnologia assistiva exigem revisão complementar.
- URLs de upload pendente são destinos de instalação; não foi afirmado que já respondem no WordPress. A fixture de integração interceptou essas imagens com os arquivos locais.
- Dados editoriais pendentes permanecem documentados, sem preços ou claims acadêmicos inventados.

## Refinamento da versão B — 16/10/2026

O usuário escolheu B. `scripts/qa-editorial.cjs b` verificou 38 condições: três faixas contínuas, progresso, conservação dos sete cursos e seis relatos ao circular, teclado, arraste sem seleção acidental, duas unidades e expansão de Martiniano, relato visível em duas linhas/expansão, contato compacto, cinco larguras, inicialização idempotente, movimento e pausa, preferência por movimento reduzido e fallback sem JS. Axe sem violações nesse roteiro.

A revisão independente exercitou 45 movimentos por faixa em 320/768/1440 px sem extremidades vazias. Identificou um P2: reciclar um card com iframe reiniciava o player. Um novo teste reproduziu o problema; a correção pausa a faixa enquanto há player e fecha/restaura o pôster antes da reciclagem. O teste confirmou uma única requisição de embed ao avançar oito vezes, fechamento explícito e reabertura do pôster restaurado. A disponibilidade/reprodução real do YouTube segue fora dessa simulação.

Capturas atualizadas: `b-refined-*.png`, desktop e mobile, na pasta de evidências indicada acima. Usar também `node Graduacao/home-graduacao-phorte/scripts/qa-editorial.cjs b` para verificar futuras alterações de B.

### Segunda rodada — 16/10/2026

`qa-editorial.cjs b` passou a conferir também a faixa de cursos na largura total com transbordo, detalhes de unidade inertes quando fechados, abertura ao lado da foto no desktop e retorno do foco ao fechar. Axe apontou contraste do número da opção selecionada; corrigido. html-validate pediu `section` para a região de detalhes; corrigido. Todas as suítes passaram após a rodada.
