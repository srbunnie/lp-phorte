<?php
/**
 * LPs de eventos: manter apenas a homepage na navegação pública.
 * Para Code Snippets, copie o código abaixo sem a abertura <?php.
 * Configure a landing page como página inicial em Configurações > Leitura.
 */
add_action('template_redirect', function () {
    // Preservar as requisições internas do WordPress.
    if (is_admin() || wp_doing_ajax() || wp_doing_cron()
        || (defined('REST_REQUEST') && REST_REQUEST)) {
        return;
    }

    // Preservar robots.txt e o favicon próprio de cada site.
    if (is_robots() || (function_exists('is_favicon') && is_favicon())) {
        return;
    }

    // Permitir prévias apenas para usuários que podem editar páginas.
    if (current_user_can('edit_pages')
        && (is_preview() || isset($_GET['elementor-preview']))) {
        return;
    }

    // A homepage é a única página pública permitida.
    if (is_front_page() && !is_paged() && !is_feed()) {
        return;
    }

    nocache_headers();
    if (wp_safe_redirect(home_url('/'), 302, 'Phorte Event LP')) {
        exit;
    }
}, 0);
