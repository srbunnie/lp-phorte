<?php
namespace Elementor {
	class Widget_Base {
		private $data;
		public function __construct( $data, $args ) { $this->data = $data; }
		public function get_id() { return $this->data['id']; }
		public function get_settings_for_display() { return []; }
		public function print_element() {
			$this->render();
			$GLOBALS['script_handles'] = array_merge( $GLOBALS['script_handles'], $this->get_script_depends() );
		}
	}
}
namespace {
	define( 'ABSPATH', __DIR__ );
	$GLOBALS['shortcode_tags'] = [ 'category_dropdown' => 'original_callback' ];
	$GLOBALS['script_handles'] = [];
	function add_action() {}
	function shortcode_exists( $tag ) { return isset( $GLOBALS['shortcode_tags'][ $tag ] ); }
	function add_shortcode( $tag, $callback ) { $GLOBALS['shortcode_tags'][ $tag ] = $callback; }
	function wp_unique_id( $prefix ) { static $id = 0; return $prefix . ++$id; }
	function angie_cs_get_snippet_asset_url( $file, $asset ) { return 'https://fixture.example/' . $asset; }
	function wp_register_style() {}
	function wp_register_script() {}
	function did_action() { return 1; }
	function wp_print_styles( $handle ) {
		static $printed = false;
		if ( ! $printed ) { echo '<link rel="stylesheet" href="https://fixture.example/style.css">'; $printed = true; }
	}
	function esc_html__( $text ) { return $text; }
	function esc_attr( $text ) { return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' ); }
	function esc_html( $text ) { return esc_attr( $text ); }
	function esc_url( $text ) { return esc_attr( $text ); }
	function rest_url( $path ) { return 'https://fixture.example/wp-json/' . $path; }
	require dirname( __DIR__ ) . '/main.php';
	function check_shortcode( $ok, $message ) {
		if ( ! $ok ) { fwrite( STDERR, "FAIL: {$message}\n" ); exit( 1 ); }
	}
	phorte_pos_search_register_shortcode();
	check_shortcode( $GLOBALS['shortcode_tags']['category_dropdown'] === 'original_callback', 'shortcode original preservado' );
	check_shortcode( $GLOBALS['shortcode_tags']['phorte_pos_search'] === 'phorte_pos_search_shortcode', 'nome exclusivo registrado' );
	ob_start();
	$first = call_user_func( $GLOBALS['shortcode_tags']['phorte_pos_search'] );
	$second = call_user_func( $GLOBALS['shortcode_tags']['phorte_pos_search'] );
	$unexpected_output = ob_get_clean();
	check_shortcode( $unexpected_output === '', 'callback retorna HTML sem saída fora do buffer' );
	preg_match( '/<section id="([^"]+)"/', $first, $first_id );
	preg_match( '/<section id="([^"]+)"/', $second, $second_id );
	check_shortcode( isset( $first_id[1], $second_id[1] ) && $first_id[1] !== $second_id[1], 'IDs exclusivos entre ocorrências' );
	check_shortcode( strpos( $first, 'data-phorte-pos-search' ) !== false && strpos( $first, 'data-search-form' ) !== false, 'mesma renderização do componente' );
	check_shortcode( strpos( $first, 'rel="stylesheet"' ) !== false, 'estilo impresso para renderização após head' );
	check_shortcode( in_array( 'phorte-pos-search', $GLOBALS['script_handles'], true ), 'script do componente requerido' );
	$GLOBALS['shortcode_tags']['phorte_pos_search'] = 'another_callback';
	phorte_pos_search_register_shortcode();
	check_shortcode( $GLOBALS['shortcode_tags']['phorte_pos_search'] === 'another_callback', 'registro existente do novo nome também preservado' );
	echo "Shortcode contract checks passed.\n";
}
