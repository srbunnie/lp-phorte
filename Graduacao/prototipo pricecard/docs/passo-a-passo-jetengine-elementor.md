# Passo a Passo: Integração com JetEngine e Elementor

Este guia prático detalha como implementar o componente de Inscrição da Phorte no WordPress usando **JetEngine** (para dados) e **Elementor** (para interface).

A ideia principal é que o WordPress alimentará os *dados* (JSON), e o nosso componente Javascript fará toda a *lógica* de interatividade sem depender de widgets amarrados do Elementor.

---

## Passo 1: Preparando a Origem de Dados (JetEngine)

O nosso componente precisa de um Array de Objetos JSON contendo todas as ofertas válidas de um curso. Exemplo:

```json
[
  {
    "curso": "Administracao",
    "cursoLabel": "Administração",
    "modalidade": "Presencial",
    "modalidadeLabel": "Presencial",
    "polo": "Polo Lapa",
    "poloLabel": "Polo Lapa",
    "preco": 249,
    "disponivel": true,
    "popupId": "popup-inscricao-geral",
    "observacaoPreco": "Valores promocionais"
  }
]
```

### 1.1 Criando a Estrutura (CCT ou CPT)
1. Vá em **JetEngine > Custom Content Types (CCT)** (Recomendado para melhor performance com dados puros) ou Custom Post Types (CPT).
2. Crie os campos meta necessários (`curso`, `cursoLabel`, `modalidade`, `modalidadeLabel`, `polo`, `poloLabel`, `preco`, etc.).

### 1.2 Criando a Query (Query Builder)
1. Vá em **JetEngine > Query Builder** e crie uma nova query buscando as suas ofertas filtradas pelo curso atual.
2. Certifique-se de que a Query retorne as ofertas disponíveis correspondentes a esse curso.

---

## Passo 2: Montando a Interface no Elementor (O Card)

O Elementor precisará apenas renderizar o "osso" (HTML) do componente e chamar nossos scripts.

1. Vá em **Elementor > Modelos (Templates) > Single Post** (ou na página do Curso).
2. Adicione um **Widget de HTML** (ou use um *Listing Grid* se for renderizar vários cards usando Dynamic Attributes, mas o widget de HTML puro é mais direto).
3. **Cole a estrutura base** de HTML do arquivo `src/card-template.html` dentro do widget de HTML.
4. **Insira o CSS**: Você pode adicionar o arquivo `card-styles.css` no Custom CSS do tema, no Elementor Global Settings, ou usando a aba de Advanced > Custom CSS do próprio widget de HTML do Elementor.

---

## Passo 3: Injetando os Dados na Tela (JSON)

Logo abaixo do seu HTML dentro do Elementor, você precisa imprimir as ofertas vindas do JetEngine no formato JSON, para o Javascript conseguir ler.

Você pode fazer isso usando uma **Dynamic Tag** com Advanced Settings (ou um Shortcode customizado criado no `functions.php`). 

Usando shortcode (recomendado para entregar JSON unificado):
```html
<script>
  // O PHP fará o output do json_encode() das queries do JetEngine aqui
  window.phorteOfertas_Administracao = [JetEngine_Shortcode_Aqui];
</script>
```

Se preferir usar Macros do JetEngine direto no bloco HTML:
```html
<script>
  window.phorteOfertas_Atual = %current_course_offers_json%; 
</script>
```
*(Você precisará criar essa macro no JetEngine > Macros para ele converter os resultados da Query numa string JSON).*

---

## Passo 4: O Popup de Inscrição (Elementor Pro Popups)

1. Vá para **Modelos > Popups > Adicionar Novo**.
2. Crie o popup e coloque um **Widget de Formulário** (Form do Elementor ou RD Station, dependendo do que estiver usando. Recomendamos um widget de HTML com os campos se a customização visual for estrita igual do nosso Demo).
3. Caso use o Formulário do Elementor, dê **IDs específicos** para os campos gerados nas configurações avançadas do campo. (ex: `rd-nome`, `rd-email`, `rd-curso`, `rd-polo`, `rd-modalidade`).
4. Os campos críticos (`curso`, `polo`, `modalidade`) podem ser campos de texto **Ocultos (Hidden)**.

---

## Passo 5: Inicializando os Scripts

Agora você precisa conectar o Componente local (arquivos JS) com o HTML renderizado. Suba os arquivos da pasta `/src/` para o seu tema (ex: `/wp-content/themes/seu-tema/assets/js/`).

No Elementor, coloque um widget de HTML no rodapé do Elementor (ou inclua no formulário do Popup / `functions.php`):

```html
<script type="module">
  // 1. Importa os scripts do seu servidor/tema WP
  import { initEnrollmentCard } from '/wp-content/themes/seu-tema/assets/js/card-controller.js';
  import { bindPhortePopupForm } from '/wp-content/themes/seu-tema/assets/js/popup-form-sync.js';

  document.addEventListener('DOMContentLoaded', () => {
      // 2. Busca o card e as ofertas (Passo 3)
      const cardRoot = document.querySelector('#phorte-card-demo'); // ID configurado no widget HTML
      const offers = window.phorteOfertas_Atual || [];

      if(cardRoot && offers.length > 0) {
          // 3. Inicia o Card
          initEnrollmentCard(cardRoot, offers, {
             courseFieldSelector: '#rd-course',
             modalityFieldSelector: '#rd-modality',
             poloFieldSelector: '#rd-polo'
          });
      }

      // 4. Inicia a Sincronização do Popup
      bindPhortePopupForm({
          popupSelector: '#popup-elementor-id', // ID ou Classe do seu popup
          courseFieldSelector: '#rd-course',    // ID do campo do form
          modalityFieldSelector: '#rd-modality',// ID do campo do form
          poloFieldSelector: '#rd-polo',        // ID do campo do form
          summarySelector: '[data-phorte-popup-summary]' // Opcional, onde mostrará o resumo
      });
  });
</script>
```

### Resumo dos Eventos e Classes
* Ao selecionar um botão no Card, nosso script já gerencia as classes, exibe o preço real, e desbloqueia o botão `<button data-phorte-cta>`.
* Clicando no CTA bloqueado, o Elementor vai tentar abrir o Popup (defina isso nas configurações do `<button>` com a action de abrir popup do Elementor, ex: `href="#elementor-action:action=popup..."`);
* Ao abrir o Popup, o script `bindPhortePopupForm` vai capturar o contexto que estava preenchido no componente de Card e jogar automaticamente nos inputs ocultos do formulário.

## Cheklist Final:
- [ ] O JetEngine gera o payload limpo no formato JSON exigido.
- [ ] O CSS do componente subiu.
- [ ] O HTML base está na página.
- [ ] Os `.js` estão acessíveis no servidor e carregando como `type="module"`.
- [ ] O Elementor form tem os Hidden IDs e os seletores do JS estão de acordo com eles.
