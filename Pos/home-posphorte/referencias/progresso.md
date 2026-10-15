# Execução — Home Pós Phorte

Plano: aprovado por Marcelo no chat em 15/10/2026.

- [x] Preservar alterações preexistentes e criar branch `codex/home-posphorte`.
- [x] Extrair conteúdos, destinos e mídia da home pública.
- [x] Criar prévia estática e interações.
- [x] Gerar pacote Elementor da mesma fonte.
- [x] Verificar conteúdo, responsividade, acessibilidade e interações.
- [x] Revisão final independente e documentação de instalação.

Decisões: trabalhar na pasta independente aprovada, sem alterar os demais projetos; sem commit, push ou publicação. Revisão dos relatos apenas para apresentação: texto integral preservado e expansível. Atribuições conflitantes de Adriana/Carla ficam fora da prévia. Os dois destinos de Fisiologia permanecem, por não haver confirmação de equivalência.

Verificação final: estrutura e equivalência aprovadas, HTML Validate sem erros, roteiro de navegador passou em 1440/1024/768/390, fixture de tema aprovada e axe sem violações em cinco larguras. Revisão independente concluída, achados corrigidos. Ver VALIDACAO.md.

Revisão da prévia solicitada pelo usuário:

- [x] Corrigir chevrons e espaçamento da Poppins; confirmar fonte renderizada.
- [x] Remover rótulos numéricos das áreas.
- [x] Criar hero com três slides e controles conforme referência da Graduação.
- [x] Documentar busca nativa no Angie com estrutura real da Pós e briefing de implementação.
- [x] Testar hero em quatro larguras, autoplay, pausa, teclado e toque; repetir axe e fixture Elementor.
- [x] Revisar preservação de foco após achado independente e adicionar verificação de regressão.
- [x] Separação em peças (15/10/2026): cabeçalho e rodapé em widgets próprios, home em hero + Shortcode [phorte_pos_search] + seções; CSS/JS divididos, templates JSON e ZIP por peça. Verificador, HTML Validate, qa-navegador e qa-hero aprovados; cabeçalho e rodapé testados isolados em página simulada de tema.
- [x] Segunda revisão: CTAs de cabeçalho/rodapé para /pos/, busca em duas linhas, ícones sociais e remoção dos eventos do rodapé; conferência visual, layout em cinco larguras e axe/fixture repetidos sem violações.
