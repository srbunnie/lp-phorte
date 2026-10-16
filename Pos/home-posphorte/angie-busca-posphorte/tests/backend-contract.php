<?php
define( 'ABSPATH', __DIR__ );

class WP_Error { public $code; public function __construct( $code ) { $this->code = $code; } }
class WP_Term { public $term_id; public $parent; public function __construct( $id, $parent ) { $this->term_id = $id; $this->parent = $parent; } }
class WP_REST_Server { const READABLE = 'GET'; }
class WP_REST_Request { public function get_param( $key ) { return null; } }
function add_action() {}
function register_rest_route() {}
function wp_register_style() {}
function wp_register_script() {}
function angie_cs_get_snippet_asset_url() { return ''; }
function absint( $value ) { return abs( (int) $value ); }
function sanitize_text_field( $value ) { return trim( strip_tags( (string) $value ) ); }
function esc_html__( $value ) { return $value; }
function is_wp_error( $value ) { return $value instanceof WP_Error; }
function rest_ensure_response( $value ) { return $value; }
function get_term( $id, $taxonomy ) {
	$terms = [ 37 => [ 0 ], 157 => [ 0 ], 119 => [ 0 ], 35 => [ 0 ], 163 => [ 37 ], 178 => [ 157 ], 190 => [ 119 ] ];
	return isset( $terms[ $id ] ) ? new WP_Term( $id, $terms[ $id ][0] ) : null;
}
function get_post( $id ) {
	$posts = [ 501 => (object) [ 'ID' => 501, 'post_type' => 'pos-graduacao', 'post_status' => 'publish', 'post_password' => '' ], 502 => (object) [ 'ID' => 502, 'post_type' => 'pos-graduacao', 'post_status' => 'publish', 'post_password' => 'segredo' ] ];
	return $posts[ $id ] ?? null;
}
class WP_Query { public $posts = []; public $found_posts = 0; public $max_num_pages = 0; public function __construct( $args ) {} }
// Como no WordPress real: the_title/wptexturize troca " - " por &#8211; e mantém & escapado.
function get_the_title( $post ) { return 'AEE &#8211; Atendimento &amp; Inclus&atilde;o'; }
function get_permalink( $post ) { return 'https://posphorte.com.br/pos-graduacao/aee/'; }

require dirname( __DIR__ ) . '/main.php';

function check( $condition, $message ) { if ( ! $condition ) { fwrite( STDERR, "FAIL: {$message}\n" ); exit( 1 ); } }
check( phorte_pos_search_validate_nonnegative_integer( '37' ), 'positive numeric ID accepted' );
check( ! phorte_pos_search_validate_nonnegative_integer( 'abc' ), 'nonnumeric ID rejected' );
check( ! phorte_pos_search_validate_nonnegative_integer( '-37' ), 'negative ID rejected before absint' );
check( ! phorte_pos_search_validate_nonnegative_integer( [ 37 ] ), 'array ID rejected' );
check( ! phorte_pos_search_validate_positive_integer( '1001' ), 'out-of-range page rejected' );
check( ! phorte_pos_search_validate_text_query( [ 'q' => 'saúde' ] ), 'array search text rejected' );

$bad_modality = phorte_pos_search_query_args( [ 'modality' => 999 ] );
check( is_wp_error( $bad_modality ) && 'invalid_modality' === $bad_modality->code, 'unknown modality fails instead of widening search' );
$bad_area = phorte_pos_search_query_args( [ 'modality' => 37, 'area' => 178 ] );
check( is_wp_error( $bad_area ) && 'invalid_area' === $bad_area->code, 'area from another root is rejected' );
$presencial_args = phorte_pos_search_query_args( [ 'modality' => 119 ] );
check( ! is_wp_error( $presencial_args ) && [ 119 ] === $presencial_args['tax_query'][0]['terms'] && true === $presencial_args['tax_query'][0]['include_children'], 'root 119 searches descendants even when its own count is zero' );

$args = phorte_pos_search_query_args( [ 'modality' => 37, 'area' => 163, 'course' => 501, 'q' => '  Saúde  ' ] );
check( ! is_wp_error( $args ), 'valid combined filters accepted' );
check( 'pos-graduacao' === $args['post_type'] && 'publish' === $args['post_status'] && false === $args['has_password'], 'query restricts post type, publication status, and passwords' );
check( [ 501 ] === $args['post__in'], 'course selection remains in the WP_Query contract' );
check( 'Saúde' === $args['s'], 'text remains combined with course selection' );
check( $args['tax_query'][0]['terms'] === [ 163 ], 'area term ID remains in the query' );

$password_course = phorte_pos_search_query_args( [ 'course' => 502 ] );
check( is_wp_error( $password_course ) && 'invalid_course' === $password_course->code, 'password-protected course rejected' );

// script.js mostra títulos com textContent/Option: a API precisa entregar texto puro, sem entidades HTML.
$payload = phorte_pos_search_course_payload( (object) [ 'ID' => 43474 ] );
check( 'AEE – Atendimento & Inclusão' === $payload['title'], 'course title decoded to plain text (en dash, ampersand, accent)' );
check( 43474 === $payload['id'] && 'https://posphorte.com.br/pos-graduacao/aee/' === $payload['url'], 'course payload keeps id and permalink' );
check( 'Saúde & Bem-estar' === phorte_pos_search_plain_text( 'Saúde &amp; Bem-estar' ), 'term names decoded to plain text' );
check( '<b>x</b>' === phorte_pos_search_plain_text( '&lt;b&gt;x&lt;/b&gt;' ), 'decoded text is data for textContent, never HTML' );
echo "Backend contract checks passed.\n";
