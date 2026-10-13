# Graduação em Administração — primeira versão visual

**Instituição:** Faculdade Phorte. **Estado da LP:** desenvolvimento — primeira montagem estática. **Entrega documental:** rascunho revisado, 2026-10-09. **Publicação:** preview local, não publicado.

## Preview e implementação

- [Abrir a landing page](index.html).
- [Fragmentos e instruções para Elementor](implementacao/elementor/README.md).
- [CSS](styles.css) e [JavaScript](script.js) independentes por página.

Abrir `index.html` no navegador; imagens e fontes públicas precisam de rede. O formulário é demonstrativo e não envia dados. Para editar, alterar a copy ou as [fontes comuns](../_shared/gestao/README.md) e executar `python scripts/build-lps-gestao.py` na raiz do repositório. Não editar os arquivos gerados sem atualizar sua fonte.

## Objetivo e público

Preparar uma página clara para pessoas que concluíram o Ensino Médio, consideram uma primeira formação superior ou procuram uma segunda graduação no campo de negócios, gestão e tomada de decisão. A página deverá apresentar o curso, ajudar a avaliar a rotina de estudo e conduzir à inscrição oficial ou à solicitação de contato.

## Oferta de referência

Bacharelado em Administração, duração publicada de 8 semestres (4 anos), modalidades EAD e presencial. Valores, semestre, polos e demais condições comerciais são variáveis documentadas no dossiê, não ofertas aprovadas por este pacote.

## Materiais

- [Copy completa e revisada](copy/copy.md)
- [Copy do painel claro de salários](copy/salarios.md)
- [Fontes, imagens e pendências](referencias/fontes-e-pendencias.md)
- [Guia comum de componentes e montagem](../docs/arquitetura-lps-gestao.md)
- [Relatório de revisão de UI](../docs/revisao-ui.md)
- [Índice dos quatro cursos](../docs/README.md)
- [Página oficial atual](https://faculdadephorte.edu.br/graduacao/administracao/) — fonte de conteúdo, não preview da futura atualização.

## Como trabalhar nesta pasta

1. Ler a copy e o dossiê em conjunto para reconhecer o que é redação editorial e o que está observado ou pendente.
2. Editar textos em `copy/copy.md`; fontes, condições e decisões técnicas ficam nos documentos próprios.
3. Na implementação futura, montar os componentes indicados no guia comum, com CSS e JavaScript isolados por página.
4. Exportar os blocos de antes/depois do formulário e montar o widget Form nativo no Elementor, segundo o guia.
5. Revisar desktop/mobile, destinos de CTA e aprovação de conteúdo antes da publicação.

O Markdown é a fonte editorial, convertido em HTML estático pelo renderizador local. Esta pasta contém documentação, preview e pacote Elementor; não há backend, integração de CRM ou formulário de produção implementado. Revisão visual e aprovação de conteúdo ainda pendentes.

## Responsabilidades e aceite

- Copy: proposta editorial preparada nesta entrega; responsável pela aprovação editorial a definir pela equipe.
- Acadêmico/comercial: validar os itens do dossiê com os responsáveis institucionais.
- Design/desenvolvimento: implementação futura conforme a arquitetura documentada.

Para liberar a publicação, confirmar os dados acadêmicos e definir quais condições comerciais e provas estarão visíveis. Coordenação e depoimentos permanecem opcionais até haver material verificável deste curso. Salários foram incorporados ao preview por solicitação do usuário, com os dados do protótipo e confirmação de fontes/períodos ainda pendente.
