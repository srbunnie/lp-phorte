# Phorte Enrollment Card

Implementacao portatil do card de inscricao com selecao obrigatoria de `modalidade` e `polo`, atualizacao de preco por combinacao e abertura de popup com contexto para RD Station.

## Arquivos

- `src/card-controller.js`
  - logica da matriz `curso + modalidade + polo`
  - renderizacao dos chips
  - atualizacao do card
  - disparo do evento `phorte:open-enrollment-popup`
- `src/popup-form-sync.js`
  - sincroniza curso, modalidade, polo e preco no formulario do popup
- `src/card-styles.css`
  - estilos do card
- `src/card-template.html`
  - exemplo pronto para adaptar no Elementor
- `data/administracao.offers.json`
  - exemplo do contrato de dados vindo do JetEngine

## Contrato de dados

Cada oferta precisa representar uma combinacao valida:

```json
{
  "curso": "Administracao",
  "cursoLabel": "Administração",
  "modalidade": "Presencial",
  "modalidadeLabel": "Presencial",
  "polo": "Polo Lapa",
  "poloLabel": "Polo Lapa",
  "preco": 249,
  "disponivel": true,
  "popupId": "popup-presencial",
  "observacaoPreco": "Valores podem mudar conforme modalidade e polo."
}
```

## Integracao no Elementor / JetEngine

1. Entregar o array de ofertas validas do curso no HTML do card.
2. Inserir o markup de `src/card-template.html` em um widget HTML ou shortcode customizado.
3. Substituir o array inline de exemplo pelo JSON real do JetEngine.
4. Inicializar `initEnrollmentCard(root, offers, selectors)`.
5. No popup, usar `bindPhortePopupForm(...)` para preencher:
   - `curso`
   - `modalidade`
   - `polo`
   - `preco`

### Exemplo de bootstrap do popup

```html
<script type="module">
  import { bindPhortePopupForm } from './popup-form-sync.js';

  bindPhortePopupForm({
    popupSelector: '#popup-rdstation',
    courseFieldSelector: '[name="curso_de_interesse"]',
    modalityFieldSelector: '[name="modalidade"]',
    poloFieldSelector: '[name="polo"]',
    priceFieldSelector: '[name="preco"]',
    summarySelector: '[data-phorte-popup-summary]'
  });
</script>
```

## Comportamento implementado

- nenhuma selecao inicial
- CTA bloqueado ate escolher `modalidade` e `polo`
- preco so aparece quando a combinacao e valida
- opcoes invalidas ficam visiveis e desabilitadas
- o CTA envia o contexto atual para o popup

## Testes

Rodar:

```bash
npm test
```

## Demo ao vivo

Para apresentar a interface em um navegador local:

```bash
npm run demo
```

Depois abra:

```text
http://127.0.0.1:4173
```
