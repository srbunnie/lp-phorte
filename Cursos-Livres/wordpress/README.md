# Redirecionamento das páginas de eventos

O mesmo snippet `redirecionar-para-home.php` serve para os cinco sites. O destino é a raiz do site em que ele está instalado, obtida por `home_url('/')`.

## Instalação

1. Publique a LP de cada evento e selecione-a em **Configurações > Leitura > Uma página estática > Página inicial**.
2. No Code Snippets, crie um snippet PHP com o conteúdo do arquivo, sem a primeira linha `<?php`.
3. Configure para executar apenas no front-end, quando essa opção estiver disponível, e ative. Substitua o snippet anterior por este; evite manter duas versões ativas.
4. Limpe o cache do WordPress e da CDN, se houver.
5. Em janela anônima, abra a raiz e uma URL de página antiga. A raiz deve mostrar a LP; a URL antiga deve retornar 302 para a raiz. Confira também uma URL inexistente e a edição da LP no Elementor.

## Comportamento

- A homepage permanece acessível. Demais páginas, posts, arquivos, pesquisas, feeds e URLs inexistentes processados pelo WordPress redirecionam para ela.
- O redirecionamento usa 302, acompanhando a etapa temporária dos eventos.
- Administração, AJAX, cron, REST, robots.txt e o favicon próprio do site são preservados.
- Prévias do WordPress e do Elementor são permitidas para usuários com capacidade de editar páginas.
- Arquivos físicos, como imagens, CSS, PDFs e HTML servido diretamente pelo servidor, não passam pelo hook e continuam acessíveis.
- Para reabrir as páginas, desative o snippet e limpe o cache.

O arquivo foi preparado localmente; não foi instalado ou validado nos cinco ambientes WordPress.

Referências: [template_redirect](https://developer.wordpress.org/reference/hooks/template_redirect/), [wp_safe_redirect](https://developer.wordpress.org/reference/functions/wp_safe_redirect/) e [is_front_page](https://developer.wordpress.org/reference/functions/is_front_page/).
