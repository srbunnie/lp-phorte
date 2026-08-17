# Pacote para Elementor

## Conteúdo

- `01-header.html` — header, hero e faixa de informações (contador).
- `02.1-texto-formulario.html` — imagem e texto de apoio da coluna esquerda do formulário.
- `02.2-formulario.html` — formulário completo em HTML (caso use HTML puro).
- `03-principal-conteudo-final.html` — seções sobre a live, professor, público, certificado e rodapé.
- `styles-principal.css` — **CSS UNIFICADO**: contém todos os estilos da landing page, tipografia Poppins, Hero, Contador, Seções, Rodapé e o estilo do formulário (compatível tanto com HTML puro quanto com o widget Formulário do Elementor Pro com a classe `phorte-formulario`).
- `02.2-formulario-custom-css.css` / `02.2-formulario-custom-css-corrigido.css` — CSS avulso do formulário (opcional, já incluído dentro de `styles-principal.css`).
- `script.js` — validação e comportamento demonstrativo em JS (para uso em testes locais).

---

## Como usar no Elementor

1. **Configuração da Página**:
   - Defina o layout da página como **Elementor Canvas** nas configurações da página (ícone de engrenagem).
2. **CSS Unificado**:
   - Copie todo o conteúdo de `styles-principal.css`.
   - Cole em **Configurações da Página → Avançado → CSS Personalizado** (ou dentro de uma tag `<style>...</style>` em um widget HTML).
3. **Estrutura dos Blocos**:
   - **Contêiner 1 (Header/Hero)**: Widget HTML com `01-header.html`.
   - **Contêiner 2 (Formulário)**:
     - Contêiner pai com classe `formulario-container` e ID `inscricao`.
     - Coluna esquerda (`formulario-texto`): Widget HTML com `02.1-texto-formulario.html`.
     - Coluna direita (`formulario-coluna`): Título + Widget Formulário do Elementor Pro (com a classe `phorte-formulario`).
   - **Contêiner 3 (Conteúdo Final/Rodapé)**: Widget HTML com `03-principal-conteudo-final.html`.
