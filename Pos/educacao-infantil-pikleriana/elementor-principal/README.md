# Pacote para Elementor — Live Educação Infantil numa Perspectiva Pikleriana

Separação da landing page principal em **3 partes principais**:

## Estrutura dos Arquivos

1. **`01-header.html` (Parte 1: Cima)**
   - Topo da página: Header com logo/links, Hero com título, chamada, data/horário, resumo e meta-dados, e faixa de contagem/destaques (14 de setembro, 19h30, 100% gratuita, 1 certificado).

2. **`02-formulario.html` (Parte 2: Meio / Formulário)**
   - Seção de inscrição completa (`section.signup`) com imagem de apoio na esquerda e card com formulário na direita.
   - **Módulos avulsos (opcional para divisão em colunas no Elementor)**:
     - `02.1-foto-formulario.html`: Apenas a coluna esquerda com imagem de apoio e legenda.
     - `02.2-formulario.html`: Apenas o card e o formulário de inscrição.

3. **`03-principal-conteudo-final.html` (Parte 3: Final)**
   - Conteúdo pós-formulário e rodapé:
     - Seção 01: Sobre a live (contexto pedagógico e imagem de apoio).
     - Seção 02: Sobre as professoras (cards da Profª. Esp. Luanna Nascimento e da Profª. Ma. Valéria Pasetchny).
     - Seção 03: Para quem é + Certificado de participação + CTA.
     - Rodapé oficial da Faculdade Phorte.

4. **`styles-principal.css`**
   - CSS unificado com todas as fontes (Poppins), variáveis, cores institucionais, responsividade (desktop, tablet, mobile) e estilização de todos os componentes.

5. **`script.js`**
   - Script de validação e redirecionamento local para `obrigado.html`.

---

## Como aplicar no Elementor

1. **Configuração da Página**:
   - Layout da página: **Elementor Canvas** nas configurações da página.

2. **CSS Global da Página**:
   - Copie o conteúdo de `styles-principal.css` e cole em **Configurações da Página → Avançado → CSS Personalizado** (ou via widget HTML com `<style>...</style>`).

3. **Estrutura dos 3 Contêineres**:
   - **Contêiner 1 (Cima)**: Widget HTML com o código de `01-header.html`.
   - **Contêiner 2 (Meio / Formulário)**:
     - *Opção A (HTML puro)*: Widget HTML com o código de `02-formulario.html`.
     - *Opção B (2 Colunas Elementor)*:
       - Coluna Esquerda: Widget HTML com `02.1-foto-formulario.html`.
       - Coluna Direita: Widget HTML com `02.2-formulario.html` (ou widget de formulário nativo do Elementor Pro configurado).
   - **Contêiner 3 (Final)**: Widget HTML com o código de `03-principal-conteudo-final.html`.
