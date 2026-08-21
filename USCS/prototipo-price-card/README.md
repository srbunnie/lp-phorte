# Componente Price Card USCS

Estrutura reorganizada para separar o pacote final do componente dos arquivos de apoio.

## Estrutura

- `site-final/PriceCardUscs`
  Arquivos que entram na integracao final do site.
- `workspace-support/demo`
  Playground React, fixtures e story de apoio.
- `workspace-support/tests`
  Testes locais do componente e dos adapters.
- `workspace-support/references`
  Referencias do Figma e componentes legados usados durante a construcao.
- `workspace-support/docs`
  Documentacao de integracao e campos dinamicos.

## Uso do componente final

Os arquivos principais para integracao ficam em:

- `site-final/PriceCardUscs/PriceCardUscs.jsx`
- `site-final/PriceCardUscs/price-card-uscs.model.js`
- `site-final/PriceCardUscs/price-card-uscs.mapper.js`
- `site-final/PriceCardUscs/price-card-uscs.tokens.js`

## Demo local

```powershell
cd "C:\Users\Marcelo.vignola\Desktop\Git Projects\Daily\Componente Price Card USCS\workspace-support\demo\preview-react-app"
npm install
npm run dev
```

## Observacao

A pasta antiga `preview-react-app` ainda pode aparecer na raiz se um processo local estiver usando esse diretorio. Assim que o processo for encerrado, ela pode ser removida, porque a versao organizada para continuidade do trabalho esta em `workspace-support/demo/preview-react-app`.
