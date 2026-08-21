# Modelo de planilha

Arquivo principal:

- `cursos-ofertas-template.xml`

Abra esse arquivo no Excel. Ele possui duas abas:

1. `Cursos`
   - Uma linha por curso.
   - Preencha `curso_id` com um identificador curto e sem espacos.
   - Preencha `curso_nome` com o nome exibido para o usuario.

2. `Ofertas`
   - Uma linha por oferta valida.
   - Repita o `curso_id` e o `curso_nome`.
   - Defina `modalidade`, `polo_codigo`, `polo_nome` e `valor`.

Exemplo:

- Se `Administracao` existir em `EAD` no `Polo X` por `199`, isso vira uma linha.
- Se o mesmo curso existir em `EAD` no `Polo Y` por `249`, isso vira outra linha.
- Se tambem existir em `Presencial` no `Polo X`, isso vira uma terceira linha.

Campos sugeridos:

- `polo_codigo`: usar `1` para Polo X e `2` para Polo Y
- `disponivel`: usar `SIM` ou `NAO`
- `popup_id`: opcional, caso o card use popups diferentes por modalidade
