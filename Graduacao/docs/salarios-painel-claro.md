# Incorporação do painel claro de salários

**Data:** 2026-10-09. **Direção:** incluir a variante Painel claro do protótipo em cada LP produzida, excluindo apenas Educação Física.

## Páginas e conteúdo

| Curso | Página atualizada | Copy salarial |
|---|---|---|
| Administração | [LP](../administracao/index.html#administracao-salarios) | [Markdown](../administracao/copy/salarios.md) |
| Marketing | [LP](../marketing/index.html#marketing-salarios) | [Markdown](../marketing/copy/salarios.md) |
| Processos Gerenciais | [LP](../processos-gerenciais/index.html#processos-gerenciais-salarios) | [Markdown](../processos-gerenciais/copy/salarios.md) |
| Recursos Humanos | [LP](../recursos-humanos/index.html#recursos-humanos-salarios) | [Markdown](../recursos-humanos/copy/salarios.md) |
| Pedagogia | [LP 2027.1](../pedagogia/index-claro-2027-1.html#pedagogia-salarios) | [Markdown](../pedagogia/copy/salarios.md) |
| Tradução e Interpretação | [LP](../traducao%20e%20interpretacao/index.html#traducao-e-interpretacao-ingles-portugues-salarios) | [Markdown](../traducao%20e%20interpretacao/copy/salarios.md) |

Os blocos entram após atuação profissional. O título, a apresentação, os três cargos/valores e a fonte de cada curso são os registrados no [protótipo local](../prototipo-salarios/index.html). Os dados não foram atualizados por pesquisa nesta etapa. A incorporação substitui a decisão anterior de manter salários fora dos previews; confirmação das fontes e períodos antes da publicação permanece pendente.

## Montagem

Painel branco com borda, três cards em cinza claro e primeiro card destacado em vermelho tênue. Em mobile, cards em uma coluna. Tipografia herdada de cada LP; tokens do componente isolados em `data-phorte-salary-section` para reproduzir a variante solicitada sem alterar o restante da página.

Os pacotes Elementor contêm o painel em `widget-before-form.html` e também disponibilizam `salary-panel.html` para montagem isolada. Usar apenas uma dessas formas. Em Pedagogia 2027.1, carregar adicionalmente `implementacao/elementor/2027-1/salarios.css`; Tradução e os quatro cursos de gestão têm os estilos incorporados ao CSS do pacote.

A FAQ de Tradução deixou de citar uma média de R$ 3 mil sem fonte identificada no texto. A resposta mantém que a remuneração inicial varia e distingue médias por ocupação de salário inicial garantido, evitando conflito com o painel de referência.

## Manutenção

Editar a copy salarial do curso ou as [fontes comuns do painel](../_shared/salarios/README.md), depois executar `python scripts/build-salary-panels.py`. As quatro LPs de gestão continuam sendo geradas pelo mesmo renderizador de conteúdo acadêmico.

Nenhum formulário, integração ou publicação foi acionado. Não foram executados testes automatizados ou de navegador nesta incorporação.
