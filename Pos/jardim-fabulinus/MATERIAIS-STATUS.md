# Materiais — Jardim Fabulinus

Status: protótipo local para revisão, sem publicação ou integração de dados. Implementação da Task 3 em 26/10/2026, a partir do cadastro aprovado em `992b4da`.

## Implementação

- Ordem: header, confirmação, quatro aulas, depoimento sob demanda, CTA da pós, cursos bônus e footer.
- Hero com as três imagens locais dos docentes, dimensões intrínsecas, descrições e carregamento explícito. Copy original integral preservada; os links comerciais receberam rótulos humanos.
- `materiais.css` usa os tokens e componentes de `styles.css`, com adaptação em 320, 375, 390, 768, 1024 e 1440 px. O CTA da pós tem faixa verde e botão claro; os bônus usam links secundários.
- `materiais.js` contém a função local `setupLazyVideo()`. O botão nativo só é habilitado quando o comportamento está pronto; sua ativação cria um único iframe com `https://www.youtube-nocookie.com/embed/AeRvxB_ybvY?rel=0`, sem autoplay. O foco vai ao player e o fallback externo permanece disponível.
- Sem JavaScript, o espaço vazio do player e seu botão ficam ocultos; o link externo segue disponível. Não há formulário, rastreamento, leitura de dados, armazenamento ou envio de dados pela implementação local.
- Quatro URLs de aula mantidas integralmente, incluindo playlist, índices e parâmetro `pp` da quarta aula. Acessibilidade dos links complementada pelos títulos das aulas.

## Destinos que exigem validação editorial antes de produção

Os três destinos abaixo são provisórios: a normalização sintática não confirma o curso, conteúdo, processo de inscrição ou aprovação comercial do destino. Não foram inventados novos endereços.

1. Pós: `https://posphorte.com.br/pos-graduacao/jardim-fabulinus/?utm_source=materiaisgratuitos&utm_medium=paginademateriaisdefabulinusmanychat&utm_campaign=posemfabulinus&utm_id=posemfabulinus&utm_term=paginademateriaisdefabulinusmanychat&utm_content=paginademateriaisdefabulinusmanychat` — removida somente a barra duplicada no path; UTMs preservadas.
2. Neurociência: `https://inscricao.posphorte.com.br/inscricao/pre-cadastro/contribuicoes-de-neurociencia-para-o-desenvolvimento-entre-0-e-3-anos/701/1` — removidas a barra duplicada após o host e a interrogação final.
3. Psicomotricidade: `https://inscricao.posphorte.com.br/inscricao/pre-cadastro/aplicacao-da-psicomotricidade-na-pratica-educacional/1166/1` — removidas a barra duplicada após o host e a interrogação final.

## Verificação

Executar da raiz do repositório:

```powershell
node Pos/jardim-fabulinus/tests/validate-materiais.mjs
node Pos/jardim-fabulinus/tests/validate-cadastro.mjs
node --check Pos/jardim-fabulinus/materiais.js
python -m http.server 4173
```

Prévia: `http://127.0.0.1:4173/Pos/jardim-fabulinus/materiais.html`.

Validador escrito antes da implementação: RED com 3/11 verificações aprovadas, falhando no iframe imediato, botão, fallback, CTAs, imports, imagens e ordem. GREEN final com 11/11; cadastro mantém 8/8. Comparação de HTML com `992b4da` confirmou os 19 blocos originais de títulos/parágrafos e os sete arquivos protegidos sem alteração. O novo título do depoimento reutiliza o título já existente no iframe original.

QA via Chromium e Playwright CLI:

- Sem overflow em 1440 × 900, 1024 × 768, 768 × 1024, 390 × 844, 375 × 812 e 320 × 568; todas as imagens carregadas e quatro aulas presentes.
- Nenhum iframe e nenhum request de YouTube, ytimg ou googlevideo antes da ativação, medidos em contexto limpo, inclusive após percorrer a página inteira.
- Enter e Espaço criam um player; segunda ativação do botão original não duplica o iframe. URL exata, título acessível, sem parâmetro ou permissão de autoplay. O player real apresentou a capa e o botão de reprodução.
- Tab percorre skip link, header, quatro aulas, botão de vídeo e fallback. Fallback com foco visível de 3 px, abertura por Enter e destino correto.
- Contexto com JavaScript desativado: sem botão inoperante, iframe ou request de YouTube; fallback visível. Falha forçada da requisição do embed: fallback continua visível e focalizável.
- Console e `pageerror` sem erros nos cenários normais. O primeiro carregamento de QA identificou um favicon ausente, corrigido com favicon vazio local à página. Removida uma permissão redundante de fullscreen que gerava aviso. O player externo pode emitir aviso do Chromium sobre `powerPreference` no Windows; isso não é erro da página. A falha de rede induzida pertence apenas ao teste de fallback.

Evidências locais, ignoradas pelo Git, em `output/playwright/`: `materiais-{1440,1024,768,390,375,320}-full.png`, `materiais-390-hero.png`, `materiais-390-conversao.png`, `materiais-390-player.png`, `materiais-320-sem-js.png`, `materiais-320-player-falha.png`, `materiais-layout-network.txt`, `materiais-player-keyboard.txt`, `materiais-fallback-failure.txt` e `materiais-copy-integrity.json`. Scripts reproduzíveis de QA: `qa-materiais-layout.cjs`, `qa-materiais-player.cjs`, `qa-materiais-fallback.cjs`.

## Arquivos e limites

Alterado: `materiais.html`. Criados: `materiais.css`, `materiais.js`, `tests/validate-materiais.mjs` e este documento.

Preservados: `cadastro.html`, `cadastro.css`, `cadastro.js`, `README.md`, `styles.css`, `script.js` e `depoimentos.html`. Sem push, merge, publicação ou alterações no ClickUp.

Pendências: validação editorial dos três destinos comerciais e aprovação final do protótipo. Fontes externas já existentes em `styles.css` permanecem uma dependência compartilhada; o YouTube só é acessado após ativação explícita do vídeo ou do link externo. Reprodução integral e disponibilidade futura dos vídeos dependem da plataforma; o QA verificou carregamento real e ausência de autoplay, sem reproduzir o vídeo inteiro.
