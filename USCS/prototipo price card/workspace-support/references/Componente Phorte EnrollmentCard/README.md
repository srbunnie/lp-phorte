# EnrollmentCard Component

O `EnrollmentCard` é um componente visual complexo para e-commerces educacionais. Ele foi extraído da página de curso (V2) e tem a função de exibir a seleção de turmas disponíveis de um curso e um resumo detalhado do investimento, facilitando o checkout do usuário.

## Estrutura de Arquivos

A base do componente foi extraída para facilitar a sua reutilização em outros projetos (como USCS):

- `EnrollmentCard.tsx`: O componente React principal. Contém as lógicas de formatação (moedas, datas, localidades), gerenciamento de estado interno (turma selecionada, expansão da lista, cópia de cupom) e o layout visual dividido em dois painéis.
- `Badge.tsx`: Um micro-componente de tipografia/status. Foi incluído na pasta para manter a independência, com estilização Tailwind padrão.
- `types.ts`: Definições TypeScript (DTOs) que representam as propriedades esperadas pelo componente. Contém as interfaces `SisCourseDTO` (dados da turma) e `CouponDTO` (dados do cupom).
- `enrollment-card.stories.tsx`: O arquivo de documentação interativa para o Storybook, demonstrando as diferentes variações de estado do componente com dados mockados.

## Dependências

Para que este componente funcione perfeitamente no novo projeto, certifique-se de ter as seguintes dependências instaladas:
- `react` e `react-dom`
- `lucide-react` (para os ícones como `Copy`, `MessageCircle`, `Tag`, `Users`)
- `tailwindcss` configurado no projeto (o componente depende inteiramente de classes utilitárias do Tailwind).

## Como Funciona

### Fluxo de Dados (Props)

O componente espera duas propriedades principais:
1. `cohorts` (`SisCourseDTO[]`): Um array de turmas ativas. Ele nunca deve ser vazio.
2. `coupon` (`CouponDTO | null`, opcional): Um objeto contendo dados de um cupom de desconto aplicado globalmente ao curso.

### Lógica de Visualização

O layout do componente se adapta à quantidade de turmas (`cohorts`):

- **Turma Única (1 opção):** 
  Se apenas uma turma for passada, o painel da esquerda exibe "Garanta sua vaga na próxima turma" e não mostra *radio buttons*. Em vez disso, destaca os benefícios do formato da aula, alerta de últimas vagas e um botão CTA para o WhatsApp com consultor.
- **Múltiplas Turmas (2 opções):** 
  O painel exibe uma lista limpa de *radio buttons* para o aluno escolher a turma (campus/modalidade). O resumo da direita se atualiza automaticamente conforme a seleção.
- **Múltiplas Turmas (3+ opções):** 
  Funciona como o cenário acima, mas oculta as opções além das duas primeiras, exibindo um botão "Ver Mais Turmas" para expandir a lista e não poluir a interface.

### Estados Especiais das Turmas

O componente reage às seguintes propriedades internas do objeto da turma (`SisCourseDTO`):
- `turmaConfirmada: true`: Exibe um *badge* verde de "Turma Confirmada".
- `turmaEmDestaqueNoSite: true`: Exibe um *badge* "Mais indicada".
- `remainingSeats` (<= 10): Exibe um alerta de escassez "Últimas X vagas" com estilo de urgência (vermelho/laranja).

### Painel Direito (Resumo)

O painel direito funciona como um recibo dinâmico. Ele exibe:
- Valor parcelado dinâmico (`cohort.parcelas` e `cohort.valorParcela`).
- Valor total (calculado internamente multiplicando as parcelas).
- Taxa de inscrição ou a tag "Isenta" caso seja nula ou zero.
- Destaque para o cupom de desconto, caso tenha sido passado via `props`, com um botão para copiar o código do cupom.
- Botão "Matricule-se agora", que direciona para a `checkoutUrl` da turma selecionada.

## Adaptação para o Projeto USCS

Ao integrar na USCS, lembre-se de:
1. **Design System**: Ajuste as cores Tailwind fixas. Atualmente, há uso de `emerald-600` e uma cor de marcação `primary`. Substitua pelas cores da USCS.
2. **DTOs**: Se a API da USCS retornar dados num formato diferente de `SisCourseDTO`, modifique o `types.ts` ou crie um mapeamento ("adapter") antes de passar as *props* para o `<EnrollmentCard>`.
