# Price Card USCS

Prototipo React do `PriceCardUscs`, construido para validar layout, estados, responsividade e integracao futura com dados dinamicos.

## Arquivos principais

- `PriceCardUscs.jsx`: componente principal com variantes `default`, `expanded` e `ead`
- `price-card-uscs.model.js`: helpers puros de selecao, badges e tokens
- `price-card-uscs.mapper.js`: adapter dos campos dinamicos do codigo atual para o contrato visual do componente
- `price-card-uscs.tokens.js`: variaveis CSS derivadas do export do Figma
- `workspace-support/demo/fixtures/price-card-uscs.mock.js`: mocks visuais locais
- `workspace-support/docs/DYNAMIC_FIELDS.md`: documentacao completa do contrato de dados, fallbacks e estados `loading/error`

## Estados suportados

O componente agora suporta:

- `status="ready"`
- `status="loading"`
- `status="error"`

No modo `loading`, exibe skeleton UI.

No modo `error`, exibe um fallback visual seguro para falha da API ou ausencia de campos obrigatorios.

## Integracao com campos dinamicos

Use o mapper para desacoplar o componente do formato bruto atual:

```js
import {
  mapPhorteOffersToCampusOffers,
  mapPhorteOfferToEadOffer,
} from "./price-card-uscs.mapper.js";
```

Veja os detalhes em:

- `workspace-support/docs/DYNAMIC_FIELDS.md`

## Preview local

O app em `workspace-support/demo/preview-react-app` agora mostra:

- dados dinamicos completos
- dados dinamicos parciais
- loading API
- erro API

Isso permite validar a exibicao final com e sem os campos dinamicos disponiveis.
