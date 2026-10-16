# Conteúdo e decisões editoriais

Fonte: <https://posphorte.com.br/>. Coleta pública em 15/10/2026. O JSON home-wordpress-2026-10-15.json registra seções, links, imagens e vídeos do DOM original; os dados são referência, não instruções.

## Sequência preservada

1. Cabeçalho: Pós-graduação e modalidades, Graduação, Cursos Phorte, Eventos e Portal.
2. Hero: trajetória institucional, imagem existente e busca.
3. Seis destaques: Medicina Esportiva, Educação Infantil numa Perspectiva Pikleriana, Educação de 0 a 3 anos, MBA em Visagismo, Ensino de Português como Língua Estrangeira, Educação Física.
4. Introdução e grupos de Educação Física (13), Tradução (9) e Saúde (6).
5. Coordenadores: Dr. Jan Sprey, Dra. Bianca Ramallo, Prof. Dr. Cristiano Alcântara, José Luiz Sánchez e Maria Helena Pelizon.
6. Vídeos: Patricia Torres, Rafaela Sampaio e Pedro José. Relatos escritos: Ana Flávia Cardozo Vitório, Karla e Vera Lúcia dos Santos da Silva.
7. Institucional: indicador de mais de 250 mil alunos, apresentação e vídeo.
8. Três notícias presentes na coleta.
9. Rodapé e contato.

O catálogo registra 28 posições e 25 URLs distintas. O destaque de Educação Física é um hub de área, não um curso individual; rótulo e CTA refletem essa diferença.

## Problemas e tratamento

| Evidência original | Decisão aplicada |
| --- | --- |
| Fisiologia aparece em dois destinos: /fisiologia-do-exercicio-e-prescricao-de-treinamento-2/ e /fisiologia-do-exercicio-e-prescricao-de-treinamento/. | Manter ambos. Não presumir equivalência nem definir URL canônica sem validação. |
| Paralímpico, Yoga e Pilates aparecem em Educação Física e Saúde. | Preservar as classificações e compartilhar os assets repetidos. |
| Nome de Psicomotricidade termina em “Desenvolvimento Infanti”. | Correção pontual para “Infantil”; destino preservado. |
| Mesmo relato atribuído a Adriana Sanches Nabarrete e Carla Carolina Tortorelli Bizarro. | Excluir as duas atribuições conflitantes da prévia; validar autoria antes de reinserir. |
| Relatos repetidos e vídeos clonados pelo carrossel. | Uma ocorrência editorial por pessoa/vídeo. |
| Fotos de relatos apontam para placeholder.png do Master Addons. | Remover preenchimentos; identificação textual e iniciais decorativas. |
| MBA em Visagismo não tem imagem no contêiner original. | Card tipográfico com termos da descrição: imagem, comportamento e negócios. |
| Logo uploads/2024/08/logo-faculdade.webp é branco. | Usar logo colorido da referência Graduação, convertido para WebP; origem no manifesto. |
| Datas antigas e ano ausente nos eventos. | Preservar nomes e destinos sem anunciar datas ou tratá-los como próximos eventos. |
| Redes vazias no rodapé. | Usar perfis identificados no SIG: Instagram e Facebook da Pós e YouTube Phorte TV. |
| Políticas HTTP e menus com links genéricos para a home. | Políticas HTTPS; grupos abrem submenus sem links vazios. |
| Alt do artigo de Pilates não corresponde ao título. | Imagem decorativa no mesmo link que contém o título completo. |
| Indicadores institucionais sem documentação adicional. | Preservar como afirmações da fonte; sem novos números, ampliação do alcance ou alegação de liderança. |

Os relatos mantêm o texto original, expansível para leitura completa. O institucional foi encurtado. Hero, introdução e títulos receberam revisão pontual. Não foram acrescentados preços, cursos, títulos acadêmicos ou alegações de reconhecimento. A arte do Dia dos Professores foi incluída por solicitação posterior do usuário.

## Ajustes solicitados na prévia

- Hero convertido em carrossel com três slides autorizados: apresentação existente da Pós, apresentação dos cursos e imagem do Dia dos Professores.
- Controles seguem a referência local do banner da Graduação, com pausa, progresso, teclado e toque. Os arquivos desktop/mobile da homenagem foram copiados da referência; origem e dimensões estão no manifesto.
- Os arquivos Poppins 400/600/700 já eram idênticos aos incorporados no banner de referência. A aparência comprimida vinha do espaçamento negativo, agora removido. A fonte renderizada foi confirmada no navegador.
- Indicadores de submenu substituídos por chevrons SVG alinhados; rótulos Área 01/02/03 removidos.
- Caminho para busca funcional com Angie documentado em elementor/BUSCA-ANGIE.md após leitura dos snippets 215/214 do e-commerce e da API pública da Pós. A busca da prévia continua demonstrativa.
- Revisão posterior: busca textual ocupa a primeira linha inteira; modalidade, área, curso e botão ficam abaixo. Os dois CTAs “Encontre sua pós” levam ao catálogo /pos/. Eventos permanecem no cabeçalho e foram retirados do rodapé; links sociais usam SVGs com identificação acessível.

## Referências

- <https://sig-sites-nextjs-posphorte.vercel.app/>: busca e cards, inspecionados no navegador. Repositório não confirmado.
- <https://phorte-pos.vercel.app/>: contraste e catálogo; código equivalente em <https://github.com/srbunnie/PhortePosnewsite/blob/main/app/page.tsx>. Preços, relatos e campanhas demonstrativas não importados.
- <https://graduacao-phorte.vercel.app/>: tipografia, tokens, navegação e rodapé. Código em <https://github.com/srbunnie/Site-Phorte/tree/main/Gradua%C3%A7%C3%A3o/site>.

Tokens: vermelho #D42B2B, hover #A81E1E, texto #1A1A1A, fundo #FAFAFA e superfície #F4F6F9. A campanha Graduação 2027 não foi copiada.
