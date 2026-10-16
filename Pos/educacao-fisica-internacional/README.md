# Pós-graduações em Educação Física Internacional · Phorte + FitnessLink

Página-vitrine dos três lançamentos de pós-graduação da Faculdade Phorte em parceria com a FitnessLink. É o destino do QR Code do flyer A5 e pode ser usada em campanhas digitais. O visitante vê as três opções e a condição de pré-inscrição. Não há formulário nem conteúdo programático.

- **Endereço:** <https://posphorte.com.br/pos-graduacao-educacao-fisica-internacional/>
- **Pedido:** tarefa "Site unificado FITNESSLINK" no ClickUp (brief em `output/site-unificado-fitnesslink.md`).
- **Referência visual:** flyer A5 Phorte + FitnessLink (`output/flyer phorte e fitnesslink (1).png` e `(2).png`) e a LP de campanha aprovada do Congreso de Punta (`Cursos-Livres/congresso-punta/`).

## Cursos

Os três cards incluem o botão **Fazer pré-venda**, que leva ao formulário único de pré-venda. As páginas específicas dos cursos são:

| Curso | Página |
| --- | --- |
| MBA Internacional em Gestão, Liderança e Negócios Fitness & Wellness | <https://posphorte.com.br/mba-internacional-em-gestao/> |
| Personal Trainer Internacional (NASM, Modelo OPT™) | <https://posphorte.com.br/personal-internacional/> |
| Biomecânica e Treinamento de Força para Mulheres | <https://posphorte.com.br/biomecanica-e-treinamento-de-forca-para-mulheres/> |

Os três cards mostram **360h** e **Ao vivo / Online com demonstrações práticas**. A duração (12 meses, que aparece no flyer) ficou fora de propósito: o brief não pede, e a página do Personal Trainer Internacional esconde a duração até ela ser confirmada.

## Estrutura

`index.html` + `styles.css`: preto, vermelho e branco, Barlow Condensed (títulos em maiúsculas e itálico) + Poppins.

1. Cabeçalho fixo. Na entrada mostra só as duas marcas, grandes, como no topo do flyer; ao rolar vira uma barra compacta com o menu (rótulos do flyer).
2. Banner principal: "Escolha o seu **próximo passo.**" (caixa vermelha inclinada, como no flyer), subtítulo e foto do casal do flyer, sobre um fundo limpo (só brilho vermelho). A chamada complementar abre a lista das 3 opções com os ícones do flyer ("Gestão & Negócios", "Personal Internacional + NASM", "Treinamento Feminino"), que levam ao card de cada curso. No celular e no tablet a foto fica no alto e o texto entra logo abaixo dos rostos; entre 1024 e 1439px o título encolhe com a tela para não cobrir a foto.
3. Duas faixas cruzadas em movimento (decorativas).
4. "Escolha a sua pós.": três banners empilhados (foto, título, descrição, 360h, modalidade e botão Fazer pré-venda).
   - MBA: bandeiras do Brasil, da Espanha e da Colômbia (nacionalidades dos docentes).
   - Personal: logotipo NASM, bandeiras dos EUA e do Brasil, selo "Metodologia OPT™".
   - Biomecânica: selo "Especialização em treinamento feminino".
5. Fechamento vermelho (texto do marketing, 15/10/2026): título "Garanta sua pré-inscrição com condição exclusiva!", descrição com o valor de **R$ 100,00**, botão Fazer pré-venda e, abaixo de um fio, a observação sobre pré-inscrição em mais de um curso.
6. Rodapé com os dois logotipos ("Realização").

## Publicar no WordPress (Elementor)

A página já existe no posphorte.com.br com o modelo **Elementor Canvas**, o mesmo das páginas dos três cursos.

1. **Imagens:** suba na biblioteca de mídia do posphorte.com.br os 7 arquivos de `assets/images/`, **com o mesmo nome**:
   `hero-phorte-fitnesslink.webp`, `mba-gestao-fitness-wellness.webp`, `personal-trainer-internacional.webp`, `biomecanica-forca-mulheres.webp`, `phorte-logo.webp`, `fitnesslink-logo.webp`, `nasm-logo.webp`.
   O widget aponta para `https://posphorte.com.br/wp-content/uploads/2026/10/`. Se o WordPress gravar em outra pasta (outro mês) ou renomear algum arquivo, gere de novo com a pasta certa:
   ```
   node elementor/generar.js https://posphorte.com.br/wp-content/uploads/AAAA/MM/
   ```
2. **Widget:** no Elementor, dentro de um contêiner de **largura total**, adicione um widget **HTML**, cole todo o `elementor/widget-html.html` e atualize. O padding do contêiner é anulado pelo próprio código. Não cole `index.html`: os caminhos relativos não existem no WordPress.
3. **SEO (Yoast):**
   - Título: `Pós-graduações em Educação Física Internacional | Faculdade Phorte e FitnessLink`
   - Meta descrição: `MBA em Gestão Fitness & Wellness, Personal Trainer Internacional (NASM) e Biomecânica e Treinamento de Força para Mulheres. 360h, ao vivo e online.`

O widget isola os estilos com `#lp-pos-ef`: o tema não altera a página e a página não altera o resto do site. Depois de qualquer mudança em `index.html`, `styles.css` ou `script.js`, rode `node elementor/generar.js` e cole o resultado de novo.

## Rastreamento (GTM / GA4)

Os botões Fazer pré-venda direcionam ao formulário externo de pré-venda. Configure o rastreamento desses cliques no GTM/GA4 conforme necessário.

## Imagens e logotipos

Todas em WebP com até 200 KB, para subir direto no WordPress.

- **Fotos** (recortes do flyer, ampliados por IA em 15/10/2026 com instrução de preservar enquadramento, rostos, roupas, cores e luz, sem acrescentar nem remover nada):
  - `hero-phorte-fitnesslink.webp` (964×1632, 183 KB): casal do flyer 2, sem os textos.
  - `mba-gestao-fitness-wellness.webp` e `biomecanica-forca-mulheres.webp` (1433×1098): fotos dos cursos do flyer 1.
  - `personal-trainer-internacional.webp` (1296×1214): imagem atualizada do curso Personal Trainer Internacional.
- `phorte-logo.webp` (1200×528): logotipo oficial a cores, exibido em branco com filtro CSS.
- `fitnesslink-logo.webp`: logotipo usado na página do MBA, convertido para branco.
- `nasm-logo.webp`: logotipo NASM recortado do flyer, em branco com transparência. **Confirmar com o marketing a permissão de uso** e, se houver, trocar pela versão oficial.
- Bandeiras: SVG simplificados dentro do HTML.

## Arquivos

- `index.html`: a landing page.
- `styles.css`: estilos da página (prefixo `lp-`, cores em `:root`).
- `phorte.css`: kit oficial do Design System (copiado sem mudanças). Usado só como base: reset, contêiner e ícones. Não editar.
- `script.js`: cabeçalho ao rolar e animações de entrada.
- `elementor/generar.js` → `elementor/widget-html.html`: versão para o widget HTML do Elementor (ver acima).
- `assets/images/`: imagens e logotipos.

Abra `index.html` com um servidor HTTP local (por exemplo `npx http-server` na raiz do repositório) para ver a página.
