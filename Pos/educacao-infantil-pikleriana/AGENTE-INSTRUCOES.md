# Orientações para o agente — Live Educação Infantil numa Perspectiva Pikleriana

## Objetivo

Criar e preparar duas landing pages estáticas para a live **“A organização do tempo numa Perspectiva Pikleriana”**:

1. Página principal, com apresentação da live e formulário de inscrição.
2. Página de obrigado, exibida após o envio do formulário.

A tarefa correspondente no ClickUp é:

`https://app.clickup.com/t/9013299512/86ak1k0jb`

## Pasta de trabalho

Todo o trabalho deve ser feito nesta pasta:

`C:\Users\Marcelo.vignola\Desktop\Git Projects\lp-phorte\Pos\educação infantil numa perspectiva pikleriana`

Os materiais de referência estão em `docs e base/`.

## Referências obrigatórias

### 1. Página já concluída

Use como referência técnica e estrutural a página de Registro e Documentação:

`Pos/registro-e-documentacao/registro-e-documentacao-live/`

Também consulte, quando necessário, os pacotes preparados para Elementor:

`Pos/registro-e-documentacao/elementor-principal/`

`Pos/registro-e-documentacao/elementor-upload/`

Preserve o que já funciona nessa página: organização das seções, hierarquia visual, formulário nativo do Elementor, responsividade, tratamento das imagens, uso de Poppins, carregamento dos assets e fluxo para a página de obrigado.

### 2. Briefing e copy

Os textos principais estão em:

`docs e base/COPY LP I A organização do tempo numa Perspectiva Pikleriana.md`

`docs e base/COPY LP I A organização do tempo numa Perspectiva Pikleriana (1).md`

Os arquivos `.docx` dentro do pacote exportado também são referências de conteúdo. Em caso de divergência, priorize o briefing mais recente e não invente informações que não estejam no material aprovado.

### 3. Artes e recursos

Use os arquivos disponíveis em:

`docs e base/clickup-attachments-2026-08-18-11-28/`

e no pacote:

`docs e base/09 I A ORGANIZAÇÃO DO TEMPO NA ABORDAGEM PIKLERIANA-20260818T141848Z-1-001/`

Dentro do pacote, observe especialmente as pastas `REFERENCIAS A SEREM SEGUIDAS` e `RECURSOS A SEREM UTILIZADOS`.

Não substitua imagens aprovadas sem necessidade. Antes de alterar uma arte, compare a proporção, o enquadramento e a intenção visual com as referências.

## Diretrizes visuais

- Usar Poppins como fonte principal.
- Manter a identidade visual Phorte e o roxo da campanha como cor de destaque.
- Usar texto escuro com contraste suficiente sobre fundos claros.
- Aplicar o fundo com tratamento que não prejudique a leitura: overlay claro, opacidade adequada ou camada de cor quando necessário.
- Reaproveitar a lógica visual da página de Registro e Documentação, mas adaptar imagens, copy, datas e informações da live Pikleriana.
- Usar bordas, sombras e cantos arredondados com moderação e consistência.
- Evitar textos excessivamente quebrados em desktop e mobile.

## Estrutura sugerida da página principal

1. **Header/hero** — título, chamada da live, data/horário, imagem principal e CTA.
2. **Apresentação da live** — contexto da organização do tempo na abordagem Pikleriana.
3. **Formulário** — utilizar o widget nativo de Formulário do Elementor quando a versão Elementor for preparada; não replicar o formulário com HTML se o widget já estiver disponível.
4. **Para quem é** — público da live e benefícios.
5. **Sobre a convidada/o convidado ou instituição** — somente com base no briefing e nos recursos fornecidos.
6. **Conteúdo final/CTA** — reforço da inscrição, certificado, comunidade ou material complementar, conforme copy aprovada.
7. **Footer** — logo correto, direitos e links necessários.

## Estrutura sugerida da página de obrigado

- Confirmar a inscrição com clareza.
- Orientar o próximo passo: acesso à live, grupo, e-mail ou comunidade, conforme briefing.
- Usar as artes de obrigado fornecidas como referência.
- Manter o mesmo sistema visual da página principal.
- Garantir que o redirecionamento do formulário aponte para esta página.

## Regras técnicas

- Preferir HTML, CSS e JavaScript simples, sem dependências desnecessárias.
- Centralizar os estilos em um arquivo principal de CSS por página.
- Usar caminhos relativos nos arquivos locais e URLs públicas somente na versão preparada para hospedagem/Elementor.
- Otimizar imagens para WebP quando houver versão raster equivalente; preservar transparência quando necessária.
- Conferir `alt` text, dimensões, `loading="lazy"` para imagens fora do hero e `object-fit`/`object-position` em imagens responsivas.
- Não usar JavaScript para substituir funções que podem ser configuradas no Elementor.
- O Shield Security pode bloquear scripts inline ou snippets; manter o fluxo do formulário no Elementor.
- Não fazer commit, push ou publicação sem autorização explícita.
- Não apagar arquivos existentes. Criar uma estrutura nova e organizada para esta campanha.

## Responsividade obrigatória

Validar no mínimo:

- Desktop largo.
- Notebook/tablet.
- Mobile estreito.

No mobile:

- empilhar colunas;
- reduzir títulos com `clamp()` ou breakpoints coerentes;
- evitar palavras isoladas e quebras artificiais;
- manter CTA e campos do formulário confortáveis para toque;
- garantir que as imagens não estourem a viewport;
- revisar espaçamentos verticais e altura do hero;
- conferir que o logo e o footer continuam visíveis.

## Processo de trabalho do agente

1. Ler esta documentação e todo o briefing em `docs e base/`.
2. Inspecionar a implementação de Registro e Documentação antes de criar componentes.
3. Mapear os assets disponíveis e identificar quais são hero, fundo, professor/convidado, certificado, vídeo e comunidade.
4. Criar a estrutura inicial das duas páginas sem alterar a página de referência.
5. Implementar o desktop.
6. Implementar e testar a responsividade.
7. Verificar todos os caminhos de imagens, fontes, links, formulário e redirecionamento.
8. Comparar visualmente com as referências anexadas.
9. Registrar pendências, dúvidas e decisões em um README ou relatório da campanha.
10. Parar antes de commit/push/publicação e apresentar um resumo para aprovação.

## Critérios de aceite

- As duas páginas funcionam localmente.
- A página principal contém formulário e CTA funcional/configurável.
- O envio conduz corretamente à página de obrigado.
- Nenhuma imagem aparece quebrada.
- O logo carrega corretamente em fundo claro e escuro.
- A leitura permanece confortável sobre o fundo.
- O layout não apresenta overflow horizontal no mobile.
- Os títulos não ficam excessivamente fragmentados.
- A aparência mantém coerência com a página de Registro e Documentação.
- Os assets utilizados estão organizados e identificados.
- As alterações ficam restritas à pasta desta campanha até aprovação.
