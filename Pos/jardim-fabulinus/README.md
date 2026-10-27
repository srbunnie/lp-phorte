# Jardim Fabulinus — materiais e depoimentos

- **Instituição/frente:** Pós-Graduação Phorte
- **Objetivo:** prototipar as páginas de cadastro e entrega das aulas gratuitas e a atualização do espaço de depoimentos.
- **Público:** profissionais da Educação Infantil interessados no Jardim Fabulinus.
- **Oferta principal:** Série Formativa “Jardim Fabulinus: do conceito à prática”.
- **Status:** protótipo local para revisão; não publicado.
- **Copy:** transcrita do briefing aprovado em `BRIEFING DA LP`; preservar a redação original.
- **Design:** identidade verde da jornada, com organização editorial e responsiva.
- **Responsáveis por copy, design e aprovação:** conforme cards ClickUp 17tjca20qe2 e 17tjca23xfw; aprovação final pendente.
- **Integrações:** nenhuma. O formulário de cadastro é apenas ilustrativo e não envia nem armazena dados. Vídeos são incorporados de fontes públicas/Drive.

## Versões

| Versão | Pasta | Estilo |
|---|---|---|
| v3 (recomendada) | `v3-curso/` | Página do curso em posphorte.com.br: fundo creme, título rosa, cartões pastéis, botão vinho, fotos com moldura orgânica |
| v2 | `v2-marca/` | Home de pós: hero escuro, vermelho `#E64242`, Poppins |
| v1 | raiz (`cadastro.html`, `materiais.html`, `depoimentos.html`) | Protótipo original, verde editorial, com logo oficial no cabeçalho |

Pendências comuns à v2 e v3: link oficial de consulta do selo e-MEC, vídeo do Drive com permissão pública e uso das bandeiras nas fotos das docentes (v3).

## Visualizar

Abra `cadastro.html`, `materiais.html` ou `depoimentos.html` no navegador. O carrossel requer JavaScript do navegador. Os vídeos dependem de conexão com a internet e de permissão de visualização nas plataformas de origem.

Status da página de materiais, QA e destinos comerciais pendentes de validação editorial: [MATERIAIS-STATUS.md](MATERIAIS-STATUS.md).

## Cadastro

`cadastro.html` preserva a copy aprovada e organiza header, resumo, CTA para `#formulario`, formulário demonstrativo, contexto, docentes, próximo passo e footer. O hero desktop combina as três fotos locais dos docentes e o formulário; no mobile o formulário vem imediatamente após o resumo e seu CTA. Um CTA fixo aparece após a primeira dobra quando o formulário está fora da tela.

Estilos próprios em `cadastro.css` consomem os tokens de `styles.css`. `cadastro.js` contém `setupDemoForm()` e `setupMobileFormCta()`: a demonstração impede submissão, não lê os valores preenchidos, não envia requisições e não persiste dados. Marcar o consentimento ilustrativo habilita o botão de teste; a resposta só confirma a demonstração. O link para as aulas é uma navegação explícita, independente do formulário. Sem JavaScript o botão permanece desabilitado e as âncoras continuam utilizáveis.

Validação estática: `node Pos/jardim-fabulinus/tests/validate-cadastro.mjs` (executar da raiz do repositório). Prévia: `python -m http.server 4173`, depois abrir `http://localhost:4173/Pos/jardim-fabulinus/cadastro.html`.

Checklist executado em Chromium via Playwright CLI:

- Validador em RED antes da implementação e GREEN com 8/8 verificações.
- Sem overflow em 320, 375, 390, 768, 1024 e 1440 px; formulário completo no desktop de 1440 × 900.
- CTA na primeira dobra de 320 × 568 e 390 × 844; formulário antes das bios.
- Tab, consentimento e links com foco visível; CTA devolve foco ao título e a próxima tabulação entra no formulário.
- Enter no formulário sem navegação ou nova requisição; feedback demonstrativo acessível.
- CTA fixo após a primeira dobra; `prefers-reduced-motion: reduce` com scroll imediato e transições/animações removidas.
- Console sem erros após correção do favicon; imagens com dimensões e descrições, lazy loading fora do hero.

Evidências locais em `output/playwright/cadastro/` (diretório ignorado pelo Git). A página segue como protótipo demonstrativo sem integração de cadastro real.
