<?php
namespace Elementor {
	class Widget_Base {
		protected $settings = [];
		public function get_settings_for_display() { return $this->settings; }
		public function get_id() { return 'fixture-01'; }
	}
}
namespace {
	define( 'ABSPATH', __DIR__ );
	function esc_html__( $text ) { return $text; }
	function esc_attr__( $text ) { return $text; }
	function esc_html( $text ) { return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' ); }
	function esc_attr( $text ) { return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' ); }
	function esc_url( $text ) { return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' ); }
	function rest_url( $path ) { return 'https://fixture.example/wp-json/' . $path; }
	require dirname( __DIR__ ) . '/widget-phorte-pos-search.php';
	class Fixture_Search_Widget extends \AngieSnippets\Phorte_Pos_Search {
		protected $settings = [ 'eyebrow' => 'PÓS-GRADUAÇÃO PHORTE', 'title' => 'Qual pós combina com você?', 'search_label' => 'O que você busca?', 'search_placeholder' => 'Ex.: educação, saúde, gestão...', 'modality_label' => 'Modalidade', 'modality_placeholder' => 'Selecione a modalidade', 'area_label' => 'Área de conhecimento', 'area_placeholder' => 'Escolha primeiro a modalidade', 'course_label' => 'Curso', 'course_placeholder' => 'Escolha primeiro a área', 'button_text' => 'Pesquisar', 'help_text' => 'Encontre uma especialização para o próximo passo da sua carreira.', 'loading_text' => 'Carregando opções…', 'empty_text' => 'Não encontramos cursos com esses critérios.', 'show_text_search' => 'yes', 'show_course' => 'yes' ];
		public function render_fixture() { $this->render(); }
	}
	$widget = new Fixture_Search_Widget();
	ob_start();
	$widget->render_fixture();
	$html = ob_get_clean();
	if ( false === strpos( $html, 'Qual pós combina com você?' ) || false === strpos( $html, 'data-phorte-pos-search' ) || false === strpos( $html, 'data-endpoint="https://fixture.example/wp-json/phorte-pos-search/v1/"' ) ) {
		fwrite( STDERR, "Widget markup fixture failed.\n" );
		exit( 1 );
	}
	echo $html;
}
