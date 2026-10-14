# Pós-graduações em Educação Física Internacional · Phorte + FitnessLink

Página-vitrine dos três lançamentos de pós-graduação da Faculdade Phorte em parceria com a FitnessLink. É o destino do QR Code do flyer A5 e pode ser usada em campanhas digitais. O visitante vê as três opções e segue para a página do curso escolhido. Não há formulário nem conteúdo programático: isso fica nas páginas de cada curso.

- **Endereço:** <https://posphorte.com.br/pos-graduacao-educacao-fisica-internacional/>
- **Pedido:** tarefa "Site unificado FITNESSLINK" no ClickUp (brief em `output/site-unificado-fitnesslink.md`).
- **Referência visual:** flyer A5 Phorte + FitnessLink (`output/flyer phorte e fitnesslink (1).png` e `(2).png`) e a LP de campanha aprovada do Congreso de Punta (`Cursos-Livres/congresso-punta/`).

## Cursos e destinos

| Curso | Destino do botão | `data-curso` |
| --- | --- | --- |
| MBA Internacional em Gestão, Liderança e Negócios Fitness & Wellness | <https://posphorte.com.br/mba-internacional-em-gestao/> | `mba-gestao` |
| Personal Trainer Internacional (NASM, Modelo OPT™) | <https://posphorte.com.br/personal-internacional/> | `personal-internacional` |
| Biomecânica e Treinamento de Força para Mulheres | <https://posphorte.com.br/biomecanica-e-treinamento-de-forca-para-mulheres/> | `biomecanica-mulheres` |

Os três cards mostram **360h** e **Ao vivo / Online com demonstrações práticas**. A duração (12 meses, que aparece no flyer) ficou fora de propósito: o brief não pede, e a página do Personal Trainer Internacional esconde a duração até ela ser confirmada.

## Estrutura

`index.html` + `styles.css`: preto, vermelho e branco, Barlow Condensed (títulos em maiúsculas e itálico) + Poppins.

1. Cabeçalho fixo com os logotipos Phorte e FitnessLink e atalhos para os cursos.
2. Banner principal: "Escolha o seu **próximo passo.**" (caixa vermelha inclinada, como no flyer), subtítulo, chamada complementar e foto do casal do flyer. Abaixo, os três atalhos com os ícones do flyer.
3. Duas faixas cruzadas em movimento (decorativas).
4. "Escolha a sua pós.": três banners empilhados (foto, título, descrição, 360h, modalidade e botão "Conheça a pós-graduação"). O card inteiro é clicável.
   - MBA: bandeiras do Brasil, da Espanha e da Colômbia (nacionalidades dos docentes).
   - Personal: logotipo NASM, bandeiras dos EUA e do Brasil, selo "Metodologia OPT™".
   - Biomecânica: selo "Especialização em treinamento feminino".
5. Fechamento vermelho: "Garanta sua condição especial!" e um botão para cada curso.
6. Rodapé com os dois logotipos ("Realização").

## Publicar no WordPress (Elementor)

A página já existe no posphorte.com.br com o modelo **Elementor Canvas**, o mesmo das páginas dos três cursos.

1. **Imagens:** suba na biblioteca de mídia do posphorte.com.br os arquivos de `assets/images/`, **com o mesmo nome**, exceto `phorte-logo.svg`:
   `hero-phorte-fitnesslink.webp`, `mba-gestao-fitness-wellness.webp`, `personal-trainer-internacional.webp`, `biomecanica-forca-mulheres.webp`, `fitnesslink-logo.png`, `nasm-logo.png`.
   O widget aponta para `https://posphorte.com.br/wp-content/uploads/2026/10/`. Se o WordPress gravar em outra pasta (outro mês) ou renomear algum arquivo, gere de novo com a pasta certa:
   ```
   node elementor/generar.js https://posphorte.com.br/wp-content/uploads/AAAA/MM/
   ```
   O logotipo Phorte não precisa subir: o widget usa o que o site já tem (`uploads/2024/08/logo-faculdade.webp`).
2. **Widget:** no Elementor, dentro de um contêiner de **largura total**, adicione um widget **HTML**, cole todo o `elementor/widget-html.html` e atualize. O padding do contêiner é anulado pelo próprio código. Não cole `index.html`: os caminhos relativos não existem no WordPress.
3. **SEO (Yoast):**
   - Título: `Pós-graduações em Educação Física Internacional | Faculdade Phorte e FitnessLink`
   - Meta descrição: `MBA em Gestão Fitness & Wellness, Personal Trainer Internacional (NASM) e Biomecânica e Treinamento de Força para Mulheres. 360h, ao vivo e online.`
4. Teste os três botões dos cards e os três do fechamento.

O widget isola os estilos com `#lp-pos-ef`: o tema não altera a página e a página não altera o resto do site. Depois de qualquer mudança em `index.html`, `styles.css` ou `script.js`, rode `node elementor/generar.js` e cole o resultado de novo.

## Rastreamento de cliques (GTM / GA4)

As páginas dos cursos não têm um padrão de eventos próprio (só as configurações de `gtag`), então a LP envia um evento novo ao `dataLayer` a cada clique em um curso:

```js
dataLayer.push({
  event: "clique_pos_graduacao",
  curso: "mba-gestao" | "personal-internacional" | "biomecanica-mulheres",
  posicao: "card" | "fechamento",
  destino: "https://posphorte.com.br/…/"
});
```

Configuração no GTM (o site carrega os contêineres `GTM-59LC9J72` e `GTM-MPBB9Z7`; use o que tem a tag GA4 do posphorte):

1. **Variáveis** → Variável da camada de dados: `curso`, `posicao` e `destino` (nomeie como `DLV - curso` etc.).
2. **Acionador** → Evento personalizado, nome do evento `clique_pos_graduacao`.
3. **Tag** → Google Analytics: evento GA4, nome do evento `clique_pos_graduacao`, parâmetros `curso`, `posicao` e `destino` com as variáveis acima, disparada pelo acionador.
4. No GA4, registre `curso` e `posicao` como **dimensões personalizadas** (escopo de evento) para comparar o interesse por curso nos relatórios.
5. Valide no modo Visualização do GTM antes de publicar o contêiner.

## Imagens e logotipos

Todas as imagens vêm do flyer (recortes otimizados com ffmpeg):

- `hero-phorte-fitnesslink.webp` (649×1100, 52 KB): casal do flyer 2, sem os textos.
- Fotos dos cursos (384×294, ~10 KB cada): recortes do flyer 1. São a maior resolução disponível. Em telas retina ficam um pouco suaves; se o marketing tiver os originais, basta trocar os arquivos mantendo os nomes.
- `nasm-logo.png`: logotipo NASM recortado do flyer, em branco com transparência. **Confirmar com o marketing a permissão de uso** e, se houver, trocar pela versão oficial.
- `fitnesslink-logo.png`: logotipo usado na página do MBA, convertido para branco.
- `phorte-logo.svg`: logotipo oficial (a cores, exibido em branco com filtro CSS). Só na versão local.
- Bandeiras: SVG simplificados dentro do HTML.

## Arquivos

- `index.html`: a landing page.
- `styles.css`: estilos da página (prefixo `lp-`, cores em `:root`).
- `phorte.css`: kit oficial do Design System (copiado sem mudanças). Usado só como base: reset, contêiner e ícones. Não editar.
- `script.js`: cabeçalho ao rolar, animações de entrada e evento de clique para o GTM.
- `elementor/generar.js` → `elementor/widget-html.html`: versão para o widget HTML do Elementor (ver acima).
- `assets/images/`: imagens e logotipos.

Abra `index.html` com um servidor HTTP local (por exemplo `npx http-server` na raiz do repositório) para ver a página.
