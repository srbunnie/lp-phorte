# Validação local e pendências de homologação

## Verificações executadas

Execute na raiz do projeto:

```powershell
C:\php\php.exe -l Pos\home-posphorte\angie-busca-posphorte\main.php
C:\php\php.exe -l Pos\home-posphorte\angie-busca-posphorte\widget-phorte-pos-search.php
C:\php\php.exe Pos\home-posphorte\angie-busca-posphorte\tests\backend-contract.php
C:\php\php.exe Pos\home-posphorte\angie-busca-posphorte\tests\shortcode-contract.php
C:\php\php.exe Pos\home-posphorte\angie-busca-posphorte\tests\render-fixture.php
node --check Pos\home-posphorte\angie-busca-posphorte\script.js
```

O teste de backend usa stubs PHP pequenos para verificar que a consulta só aceita as quatro modalidades aprovadas, exige relação pai/filho entre modalidade e área, limita resultados a `pos-graduacao` publicado sem senha e mantém curso, área, modalidade e texto combinados. O fixture de renderização dá markup com dados padrão ao widget para inspeção visual; não é uma instância real de Elementor.

## Títulos com entidades HTML — 15/10/2026

No site publicado, seis cursos apareciam com `&#8211;` no título (por exemplo, "AEE &#8211; Atendimento Educacional Especializado"). O `get_the_title()` passa por `wptexturize`, que troca " - " por `&#8211;`; o `script.js` mostra o título com `textContent` e `Option`, que não decodificam entidades.

Correção: `phorte_pos_search_plain_text()` em `main.php` decodifica títulos de curso e nomes de modalidade e área antes da resposta REST. O texto continua sendo inserido como texto no navegador, sem risco de HTML. O teste de backend cobre travessão, `&amp;` e acento, e falha com o código anterior.

Para valer no site, o snippet 61861 precisa ser republicado com o novo `main.php`. Depois disso, `GET /wp-json/phorte-pos-search/v1/search?q=AEE` deve devolver o título com o travessão real.

## QA de interface

O browser QA local passou nos seletores dependentes e seus resets, na invalidação de cursos e respostas antigas, em `q` combinado com curso, nos resultados inline, no hook Elementor já iniciado e em duas instâncias na página. As larguras verificadas foram 1440, 1024, 768, 390 e 320 px, sem overflow; a auditoria axe reportou zero violações. A regressão de desmontagem também passou: removendo a instância enquanto a busca de curso estava em voo, uma resposta posterior com permalink válido não causou navegação. As respostas REST foram simuladas no browser. Esse resultado não comprova conexão com WordPress nem substitui a homologação de dados reais descrita abaixo.

## Homologação necessária no WordPress

Shortcode exclusivo: [phorte_pos_search]. O teste local de registro verifica preservação de [category_dropdown], retorno do HTML, IDs diferentes por ocorrência, dependência do script e impressão do CSS após o head. A inicialização JavaScript também acompanha as reedições do widget Shortcode do Elementor. A renderização real com Elementor continua sujeita à homologação abaixo.

- Confirmar que o Angie carrega os assets pelo helper `angie_cs_get_snippet_asset_url()` e que o snippet publicado no ambiente de teste registra `/wp-json/phorte-pos-search/v1/`.
- Conferir no frontend os quatro termos raiz, áreas filhas, cursos por área, paginação e links de permalink.
- Confirmar que o termo Presencial (ID 119), mesmo com contagem própria zero, encontra posts associados a descendentes.
- Testar combinações modalidade + área + texto + curso, incluindo texto que não corresponde ao curso selecionado.
- Verificar erro/repetição, ausência de resultados, duas instâncias na mesma página e rerender no editor Elementor.
- Revisar largura e controles no desktop, tablet e celular; confirmar a família Poppins globalmente no site.

Nenhuma chamada a um WordPress de produção, instalação/ativação do snippet ou publicação da Home foi realizada nesta implementação local.
