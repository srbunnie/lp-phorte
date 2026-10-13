# Painel claro de salários

Componente estático incorporado por solicitação do usuário às quatro LPs de gestão, Pedagogia 2027.1 e Tradução. Educação Física está excluída.

## Conteúdo e visual

- Origem: [protótipo de salários](../../prototipo-salarios/index.html), variante `clean` / Painel claro.
- Copy independente em `copy/salarios.md` na pasta de cada curso: título, apresentação, três ocupações/valores e fonte exibida.
- Montagem após atuação profissional, antes do perfil do aluno.
- Painel branco com borda e raio de 12 px; cards cinza com raio de 8 px; primeiro card em vermelho tênue. Três colunas no desktop e uma no mobile.
- O bloco conserva os tokens próprios do protótipo e herda a tipografia da LP. Todos os estilos usam o escopo `data-phorte-salary-section`, sem alterar o preset geral das páginas.
- Sem alternador de cursos, alternador de versões ou JavaScript do protótipo dentro das LPs.

## Gerar e editar

Executar `python scripts/build-salary-panels.py` na raiz para atualizar as seis páginas e os respectivos fragmentos Elementor. O [módulo de montagem](../../../scripts/salary_panels.py) cria os seis Markdowns a partir dos dados locais apenas quando ainda não existem; nas próximas gerações, os Markdowns são a fonte editorial. O protótipo não é alterado.

O gerador de gestão também incorpora os salários ao regenerar suas quatro páginas. Editar os Markdowns ou [styles.css](styles.css), depois regenerar. `salary-panel.html` é um fragmento isolado disponível em cada pacote; não duplicar sua inserção quando `widget-before-form.html` já o contém.

## Estado das fontes

Os valores e os recortes reproduzem o briefing do protótipo, sem atualização estatística. Administração mantém o período genérico de últimos 12 meses disponíveis; Processos Gerenciais mantém a fonte combinada Portal Salário/Novo CAGED-MTE e Indeed, sem período individualizado. As demais fontes mantêm ago/2025–jul/2026.

A inclusão nos previews foi autorizada; confirmação das fontes e períodos para publicação continua pendente. [Registro da incorporação](../../docs/salarios-painel-claro.md).
