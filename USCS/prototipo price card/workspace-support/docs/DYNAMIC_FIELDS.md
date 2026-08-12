# Campos dinamicos do Price Card USCS

Esta documentacao descreve como os campos dinamicos do componente USCS sao derivados a partir da implementacao atual em `Componente Adriano Phorte/Ofertas.jsx`.

## Objetivo

Separar o componente visual do formato bruto recebido hoje pela logica existente.

Para isso, a integracao fica dividida em 2 camadas:

1. `raw data`: estrutura original usada em `Ofertas.jsx`
2. `normalized data`: estrutura esperada por `PriceCardUscs`

O arquivo responsavel pela normalizacao e:

- `price-card-uscs.mapper.js`

## Origem atual no codigo legado

O codigo atual em `Componente Adriano Phorte/Ofertas.jsx` usa estes campos principais:

### Turma

- `classId`
- `codeClass`
- `city`
- `state`
- `address` quando existir
- `date`
- `horario`, `schedule` ou `time`
- `confirmed` quando existir
- `remainingSeats` quando existir
- `payments[]`

### Pagamento

- `quantidadeParcela`
- `valorParcela`
- `valorInscricao`
- `valorMatricula`

## Contrato normalizado esperado pelo componente

### Oferta presencial

```js
{
  id: "101",
  locationLabel: "Sao Caetano do Sul - SP",
  modalityLabel: "Presencial",
  dateLabel: "12 de Marco de 2026",
  addressLabel: "R. Santo Antonio, 50 - Centro",
  confirmed: true,
  remainingSeats: 3,
  highlighted: false,
  payments: [
    {
      label: "Opcao 1",
      installments: 24,
      amount: 1734,
      enrollmentFee: 165,
      modalityLabel: "Presencial",
      startLabel: "12 de Marco de 2026"
    }
  ]
}
```

### Oferta EAD

```js
{
  id: "301",
  headline: "Quanto investir",
  description: "Invista no seu futuro...",
  infoItems: [
    { label: "Modalidade", value: "EAD - 100% online", icon: "monitor" },
    { label: "Proxima turma", value: "Inicio: 12 de Marco de 2026", icon: "calendar" },
    { label: "Carga horaria", value: "420h", icon: "clock" }
  ],
  compactCard: {
    confirmed: true,
    remainingSeats: 8,
    payments: [
      {
        label: "Opcao 1",
        installments: 24,
        amount: 900,
        enrollmentFee: 165,
        modalityLabel: "EAD - 100% online",
        startLabel: "Inicio imediato"
      }
    ]
  }
}
```

## Mapeamento de campos

### Turmas presenciais

- `classId` ou `codeClass` -> `id`
- `city + state` -> `locationLabel`
- `address` -> `addressLabel`
- `date` -> `dateLabel`
- `payments[].quantidadeParcela` -> `payments[].installments`
- `payments[].valorParcela` -> `payments[].amount`
- `payments[].valorInscricao` -> `payments[].enrollmentFee`
- `date` -> `payments[].startLabel`

### EAD

- `date` -> `infoItems[1].value`
- `workloadLabel` ou `workload` -> `infoItems[2].value`
- `payments[].valorParcela` -> `compactCard.payments[].amount`
- `payments[].valorInscricao` -> `compactCard.payments[].enrollmentFee`

## Fallbacks quando os campos dinamicos nao chegam

O mapper aplica valores seguros para evitar quebra visual:

### Oferta presencial

- `locationLabel`: `Local a confirmar`
- `dateLabel`: `A definir`
- `addressLabel`: `Endereco a confirmar`
- `payments`: cria uma opcao minima com valores `0`

### Oferta EAD

- `headline`: `Quanto investir`
- `description`: `As informacoes desta oferta ainda estao sendo preparadas.`
- `Proxima turma`: `Inicio: A definir`
- `Carga horaria`: `Carga horaria a confirmar`

## Estados de exibicao do componente

O componente principal agora suporta:

- `status="ready"`: dados carregados normalmente
- `status="loading"`: mostra skeleton UI
- `status="error"`: mostra fallback visual de erro

Props adicionais:

- `errorTitle`
- `errorMessage`
- `onRetry`

## Como usar

### Presencial

```js
import { mapPhorteOffersToCampusOffers } from "./price-card-uscs.mapper.js";

const offers = mapPhorteOffersToCampusOffers(rawOffers, {
  modality: "presencial",
});
```

### EAD

```js
import { mapPhorteOfferToEadOffer } from "./price-card-uscs.mapper.js";

const eadOffer = mapPhorteOfferToEadOffer(rawEadOffer, {
  description: "Invista no seu futuro com uma educacao de excelencia.",
  compactStartLabel: "Inicio imediato",
});
```

### Exibicao

```jsx
<PriceCardUscs
  offers={offers}
  eadOffer={eadOffer}
  variant="default"
  status="ready"
/>
```

### Loading

```jsx
<PriceCardUscs
  offers={offers}
  eadOffer={eadOffer}
  variant="default"
  status="loading"
/>
```

### Error fallback

```jsx
<PriceCardUscs
  offers={offers}
  eadOffer={eadOffer}
  variant="default"
  status="error"
  errorTitle="Nao foi possivel exibir a oferta"
  errorMessage="A API nao retornou os campos dinamicos esperados."
/>
```
