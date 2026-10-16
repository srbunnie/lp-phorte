<?php
/**
 * Busca de Pós Phorte — widget Elementor independente.
 * Copie os quatro arquivos deste pacote para um snippet Angie Code Snippets.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const PHORTE_POS_SEARCH_ASSETS_VERSION = '1.0.1';

function phorte_pos_search_register_widget( $widgets_manager ) {
	if ( ! class_exists( '\Elementor\Widget_Base' ) ) {
		return;
	}

	require_once __DIR__ . '/widget-phorte-pos-search.php';
	if ( class_exists( '\AngieSnippets\Phorte_Pos_Search' ) ) {
		$widgets_manager->register( new \AngieSnippets\Phorte_Pos_Search() );
	}
}
add_action( 'elementor/widgets/register', 'phorte_pos_search_register_widget' );

function phorte_pos_search_register_assets() {
	if ( ! function_exists( 'angie_cs_get_snippet_asset_url' ) ) {
		return;
	}

	wp_register_style( 'phorte-pos-search', angie_cs_get_snippet_asset_url( __FILE__, 'style.css' ), [], PHORTE_POS_SEARCH_ASSETS_VERSION );
	wp_register_script( 'phorte-pos-search', angie_cs_get_snippet_asset_url( __FILE__, 'script.js' ), [ 'jquery' ], PHORTE_POS_SEARCH_ASSETS_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'phorte_pos_search_register_assets' );

/** Alias independente: nunca registra nem substitui category_dropdown. */
function phorte_pos_search_register_shortcode() {
	if ( ! shortcode_exists( 'phorte_pos_search' ) ) {
		add_shortcode( 'phorte_pos_search', 'phorte_pos_search_shortcode' );
	}
}
add_action( 'init', 'phorte_pos_search_register_shortcode' );

function phorte_pos_search_shortcode() {
	if ( ! class_exists( '\Elementor\Widget_Base' ) ) {
		return '<p>' . esc_html__( 'A busca de pós-graduação requer o Elementor ativo.', 'angie-snippets' ) . '</p>';
	}

	require_once __DIR__ . '/widget-phorte-pos-search.php';
	phorte_pos_search_register_assets();
	$widget = new \AngieSnippets\Phorte_Pos_Search(
		[
			'id'         => wp_unique_id( 'possearch' ),
			'elType'     => 'widget',
			'widgetType' => 'phorte_pos_search',
			'settings'   => [],
		],
		[]
	);

	// A mesma renderização do widget conserva os defaults e suas dependências.
	ob_start();
	$widget->print_element();
	$content = ob_get_clean();
	if ( did_action( 'wp_head' ) ) {
		// Shortcodes podem ser renderizados depois de o tema imprimir o head.
		ob_start();
		wp_print_styles( 'phorte-pos-search' );
		$content = ob_get_clean() . $content;
	}
	return $content;
}

/** Public, read-only catalogue API for the published postgraduate catalogue. */
function phorte_pos_search_register_rest_routes() {
	register_rest_route(
		'phorte-pos-search/v1',
		'/(?P<resource>modalities|areas|courses|search)',
		[
			'methods'             => \WP_REST_Server::READABLE,
			'callback'            => 'phorte_pos_search_rest_callback',
			'permission_callback' => '__return_true',
			'args'                => [
				'modality' => [ 'validate_callback' => 'phorte_pos_search_validate_nonnegative_integer', 'sanitize_callback' => 'absint', 'default' => 0 ],
				'area'     => [ 'validate_callback' => 'phorte_pos_search_validate_nonnegative_integer', 'sanitize_callback' => 'absint', 'default' => 0 ],
				'course'   => [ 'validate_callback' => 'phorte_pos_search_validate_nonnegative_integer', 'sanitize_callback' => 'absint', 'default' => 0 ],
				'q'        => [ 'validate_callback' => 'phorte_pos_search_validate_text_query', 'sanitize_callback' => 'sanitize_text_field', 'default' => '' ],
				'page'     => [ 'validate_callback' => 'phorte_pos_search_validate_positive_integer', 'sanitize_callback' => 'absint', 'default' => 1 ],
				'per_page'=> [ 'validate_callback' => 'phorte_pos_search_validate_positive_integer', 'sanitize_callback' => 'absint', 'default' => 100 ],
			],
		]
	);
}
add_action( 'rest_api_init', 'phorte_pos_search_register_rest_routes' );

function phorte_pos_search_validate_nonnegative_integer( $value ) {
	return is_scalar( $value ) && preg_match( '/^(0|[1-9][0-9]*)$/', (string) $value ) && (float) $value <= PHP_INT_MAX;
}

function phorte_pos_search_validate_positive_integer( $value ) {
	return phorte_pos_search_validate_nonnegative_integer( $value ) && (int) $value > 0 && (int) $value <= 1000;
}

function phorte_pos_search_validate_text_query( $value ) {
	return is_scalar( $value );
}

function phorte_pos_search_allowed_modality_ids() {
	return [ 37, 157, 119, 35 ];
}

function phorte_pos_search_term( $term_id ) {
	$term_id = absint( $term_id );
	if ( ! $term_id ) {
		return null;
	}
	$term = get_term( $term_id, 'pos_graduacao' );
	return ( $term instanceof \WP_Term ) ? $term : null;
}

function phorte_pos_search_valid_modality( $term_id ) {
	$term = phorte_pos_search_term( $term_id );
	return $term && 0 === (int) $term->parent && in_array( (int) $term->term_id, phorte_pos_search_allowed_modality_ids(), true ) ? $term : null;
}

function phorte_pos_search_valid_area( $area_id, $modality_id ) {
	$area = phorte_pos_search_term( $area_id );
	$modality = phorte_pos_search_valid_modality( $modality_id );
	return $area && $modality && (int) $area->parent === (int) $modality->term_id ? $area : null;
}

function phorte_pos_search_query_args( $params ) {
	$args = [
		'post_type'              => 'pos-graduacao',
		'post_status'            => 'publish',
		'has_password'           => false,
		'posts_per_page'         => min( 100, max( 1, absint( $params['per_page'] ?? 100 ) ) ),
		'paged'                  => min( 1000, max( 1, absint( $params['page'] ?? 1 ) ) ),
		'orderby'                => 'title',
		'order'                  => 'ASC',
		'no_found_rows'          => false,
		'ignore_sticky_posts'    => true,
		'update_post_meta_cache' => false,
		'update_post_term_cache' => false,
	];
	$q = trim( sanitize_text_field( (string) ( $params['q'] ?? '' ) ) );
	if ( '' !== $q ) {
		$args['s'] = mb_substr( $q, 0, 120 );
	}

	$modality_id = absint( $params['modality'] ?? 0 );
	$area_id = absint( $params['area'] ?? 0 );
	$course_id = absint( $params['course'] ?? 0 );
	$tax_query = [];
	if ( $area_id ) {
		$area = phorte_pos_search_valid_area( $area_id, $modality_id );
		if ( ! $area ) {
			return new \WP_Error( 'invalid_area', 'A área não pertence à modalidade selecionada.', [ 'status' => 400 ] );
		}
		$tax_query[] = [ 'taxonomy' => 'pos_graduacao', 'field' => 'term_id', 'terms' => [ (int) $area->term_id ], 'include_children' => false ];
	} elseif ( $modality_id ) {
		$modality = phorte_pos_search_valid_modality( $modality_id );
		if ( ! $modality ) {
			return new \WP_Error( 'invalid_modality', 'Modalidade inválida.', [ 'status' => 400 ] );
		}
		// WP_Tax_Query includes all descendant terms, even if the root term has count 0.
		$tax_query[] = [ 'taxonomy' => 'pos_graduacao', 'field' => 'term_id', 'terms' => [ (int) $modality->term_id ], 'include_children' => true ];
	}
	if ( $tax_query ) {
		$args['tax_query'] = $tax_query;
	}
	if ( $course_id ) {
		$post = get_post( $course_id );
		if ( ! $post || 'pos-graduacao' !== $post->post_type || 'publish' !== $post->post_status || ! empty( $post->post_password ) ) {
			return new \WP_Error( 'invalid_course', 'Curso indisponível.', [ 'status' => 400 ] );
		}
		$args['post__in'] = [ $course_id ];
	}
	return $args;
}

// A API entrega texto puro: o script.js usa textContent e Option, que não decodificam entidades.
// get_the_title() passa por wptexturize, que troca " - " por &#8211;; termos guardam & como &amp;.
function phorte_pos_search_plain_text( $value ) {
	return html_entity_decode( (string) $value, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
}

function phorte_pos_search_course_payload( $post ) {
	return [ 'id' => (int) $post->ID, 'title' => phorte_pos_search_plain_text( get_the_title( $post ) ), 'url' => get_permalink( $post ) ];
}

function phorte_pos_search_rest_callback( \WP_REST_Request $request ) {
	$resource = $request->get_param( 'resource' );
	$modality_id = absint( $request->get_param( 'modality' ) );
	$area_id = absint( $request->get_param( 'area' ) );
	$page = min( 1000, max( 1, absint( $request->get_param( 'page' ) ) ) );
	$per_page = min( 100, max( 1, absint( $request->get_param( 'per_page' ) ) ) );

	if ( 'modalities' === $resource ) {
		$terms = get_terms( [ 'taxonomy' => 'pos_graduacao', 'include' => phorte_pos_search_allowed_modality_ids(), 'hide_empty' => false, 'orderby' => 'include' ] );
		if ( is_wp_error( $terms ) ) { return $terms; }
		$items = [];
		foreach ( $terms as $term ) {
			if ( 0 === (int) $term->parent ) { $items[] = [ 'id' => (int) $term->term_id, 'name' => phorte_pos_search_plain_text( $term->name ) ]; }
		}
		return rest_ensure_response( $items );
	}

	if ( 'areas' === $resource ) {
		if ( ! phorte_pos_search_valid_modality( $modality_id ) ) { return new \WP_Error( 'invalid_modality', 'Selecione uma modalidade válida.', [ 'status' => 400 ] ); }
		$terms = get_terms( [ 'taxonomy' => 'pos_graduacao', 'parent' => $modality_id, 'hide_empty' => false, 'orderby' => 'name', 'order' => 'ASC' ] );
		if ( is_wp_error( $terms ) ) { return $terms; }
		return rest_ensure_response( array_map( static function ( $term ) { return [ 'id' => (int) $term->term_id, 'name' => phorte_pos_search_plain_text( $term->name ) ]; }, $terms ) );
	}

	if ( 'courses' === $resource ) {
		if ( ! phorte_pos_search_valid_area( $area_id, $modality_id ) ) { return new \WP_Error( 'invalid_area', 'Selecione uma área válida para a modalidade.', [ 'status' => 400 ] ); }
		$params = [ 'modality' => $modality_id, 'area' => $area_id, 'page' => $page, 'per_page' => $per_page ];
	} elseif ( 'search' === $resource ) {
		$course_id = absint( $request->get_param( 'course' ) );
		$params = [ 'modality' => $modality_id, 'area' => $area_id, 'course' => $course_id, 'q' => $request->get_param( 'q' ), 'page' => $page, 'per_page' => $per_page ];
	} else {
		return new \WP_Error( 'invalid_resource', 'Consulta inválida.', [ 'status' => 404 ] );
	}

	$args = phorte_pos_search_query_args( $params );
	if ( is_wp_error( $args ) ) { return $args; }
	$query = new \WP_Query( $args );
	$items = array_map( 'phorte_pos_search_course_payload', $query->posts );
	if ( 'courses' === $resource ) {
		return rest_ensure_response( [ 'items' => $items, 'total' => (int) $query->found_posts, 'pages' => (int) $query->max_num_pages, 'page' => $page ] );
	}
	return rest_ensure_response( [ 'items' => $items, 'total' => (int) $query->found_posts, 'pages' => (int) $query->max_num_pages, 'page' => $page ] );
}
