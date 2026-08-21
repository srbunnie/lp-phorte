# Pacotes Elementor — Pedagogia

Foram preparados dois pacotes independentes para publicação:

- `2026-2/` — turma 2026.2;
- `2027-1/` — turma 2027.1.

Cada pasta contém os blocos separados para a implementação com o widget Form nativo do Elementor: conteúdo antes da inscrição, coluna esquerda da oferta e conteúdo posterior. O CSS fica consolidado em um único arquivo, localizado em `2026-2/styles.css`, e atende às duas versões.

Todas as imagens locais e baixadas das referências estão reunidas em `assets/images/` como WebP otimizado, com até 200 KB por arquivo. Os originais foram preservados em `assets-originals/`.

O fluxo recomendado usa `widget-before-form.html`, `enrollment-copy.html` e `widget-after-form.html`, com um Container + widget Form entre os dois últimos blocos.

Antes de publicar, substitua os caminhos das fotos locais pelas URLs correspondentes da Biblioteca de Mídia do WordPress. O formulário é demonstrativo neste repositório e precisa ser conectado ao formulário/CRM oficial do Elementor em produção.
