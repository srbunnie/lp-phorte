# Auditoria de responsividade — Registro e Documentação

## Escopo

Verificação visual e estrutural das páginas de materiais desbloqueados e inscrição, com foco em mobile, tablet, rolagem do navbar, reflow, imagens, formulário, grade de aulas e overflow horizontal.

## Viewports observados

- Mobile: 390 × 844 CSS px — área capturada 375 × 812 px.
- Tablet: 820 × 1024 CSS px — área capturada 805 × 1009 px.
- Mobile pequeno: 320 × 800 CSS px — usado para checagem adicional de overflow.

## Evidências capturadas

- `output/registro-redesign/audit-mobile/01-materiais-top.png` — materiais, topo mobile.
- `output/registro-redesign/audit-mobile/02-materiais-aulas.png` — materiais, prova strip e início da biblioteca.
- `output/registro-redesign/audit-mobile/03-inscricao-top.png` — inscrição, topo mobile.
- `output/registro-redesign/audit-mobile/04-inscricao-formulario.png` — inscrição, início do formulário mobile.
- `output/registro-redesign/audit-mobile/05-materiais-tablet.png` — materiais, composição tablet.
- `output/registro-redesign/audit-mobile/06-inscricao-tablet.png` — inscrição, composição tablet.
- `output/registro-redesign/audit-mobile/07-materiais-card-crop.png` — evidência do thumbnail mobile cortado.
- `output/registro-redesign/audit-mobile/08-inscricao-formulario-cta.png` — inscrição, campos e CTA do formulário.
- `output/registro-redesign/audit-mobile/09-materiais-card-fixed.png` — materiais após a correção da largura dos thumbnails.
- `output/registro-redesign/audit-mobile/10-inscricao-mobile-fixed.png` — inscrição após a checagem final em mobile.
- `output/registro-redesign/audit-mobile/11-inscricao-anchor-fixed.png` — seção interna posicionada abaixo do navbar sticky.

## Fluxo auditado

1. Página de materiais no topo mobile — saúde geral: boa. Header sólido e legível, CTA visível, hero refluído para uma coluna e sem overflow horizontal do documento.
2. Biblioteca de aulas no mobile — saúde geral: boa após correção. A grade passa para uma coluna, os cards são links completos e os thumbnails respeitam a largura interna do card, preservando a capa sem recortes laterais inesperados. Evidência: `09-materiais-card-fixed.png`.
3. Página de inscrição no topo mobile — saúde geral: boa. Editorial, benefícios e card form stacked corretamente; a primeira ação é clara e a tipografia permanece legível. Evidência: `03-inscricao-top.png`.
4. Formulário RD Station no mobile — saúde geral: boa com ressalva. Campos, seletor de país, radios, consentimento e CTA permanecem dentro do card e sem overflow. O formulário ocupa uma área longa, portanto o CTA só aparece após rolagem. Evidências: `04-inscricao-formulario.png` e `08-inscricao-formulario-cta.png`.
5. Ambas as páginas em tablet — saúde geral: boa. A navegação cabe no header; materiais usa duas colunas de cards e a inscrição mantém duas colunas para editorial e formulário. Evidências: `05-materiais-tablet.png` e `06-inscricao-tablet.png`.

## Pontos positivos

- Navbar com fundo branco sólido durante a rolagem nas duas páginas, mantendo contraste e leitura.
- Reflow mobile coerente: hero e formulário da inscrição empilham; biblioteca de materiais fica em uma coluna.
- Formulário oficial do RD Station preservado com campos visíveis, controles dimensionados e CTA alcançável.
- Em 390px, 820px e 320px não foi detectado overflow horizontal no documento; os elementos fora da viewport observados em 320px são campos técnicos ocultos do embed RD Station.
- Imagens principais carregaram corretamente nos estados capturados.

## Correções aplicadas e validação

### P1 — thumbnail dos cards corrigido no mobile

O `min-height: 100%` herdado pelo `.lesson-media` foi zerado no breakpoint de até 480px, com `width: 100%` e proporção `16 / 10` preservada. Na rechecagem, em 390px os cards medem 343px e as mídias 341px; em 320px os cards medem 273px e as mídias 271px. Não houve thumbnail mais largo que o card.

### P2 — âncoras internas ajustadas para o navbar sticky

Foi aplicado `scroll-padding-top: 72px` no desktop e `68px` no mobile. Os saltos para `#sobre` e `#aulas` foram testados em 390px: o conteúdo-alvo permaneceu abaixo do header, sem sobreposição.

### Rechecagem estrutural

- Em 390px e 320px, o documento permaneceu sem overflow horizontal relevante.
- O formulário RD Station continuou dentro do card e os campos visíveis permaneceram dentro dos limites do formulário.
- O navbar permaneceu com fundo branco sólido e posição sticky nas duas páginas.

## Limites da verificação

Esta auditoria cobre o comportamento visual em uma sessão local do navegador. Não confirma acessibilidade completa por leitor de tela, teclado em dispositivo real, zoom do sistema, performance de rede móvel, submissão de lead em produção ou variações entre Safari, Firefox e navegadores móveis nativos.
