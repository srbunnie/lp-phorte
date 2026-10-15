<?php

namespace AngieSnippets;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Phorte_Pos_Search extends \Elementor\Widget_Base {
	public function get_name() { return 'phorte_pos_search'; }
	public function get_title() { return esc_html__( 'Busca de Pós Phorte', 'angie-snippets' ); }
	public function get_icon() { return 'eicon-search'; }
	public function get_categories() { return [ 'angie-widgets', 'general' ]; }
	public function get_style_depends() { return [ 'phorte-pos-search' ]; }
	public function get_script_depends() { return [ 'phorte-pos-search' ]; }

	protected function register_controls() {
		$this->start_controls_section( 'content', [ 'label' => esc_html__( 'Conteúdo', 'angie-snippets' ), 'tab' => \Elementor\Controls_Manager::TAB_CONTENT ] );
		$texts = [
			'eyebrow' => [ 'Eyebrow', 'PÓS-GRADUAÇÃO PHORTE' ],
			'title' => [ 'Título', 'Qual pós combina com você?' ],
			'search_label' => [ 'Label da pesquisa', 'O que você busca?' ],
			'search_placeholder' => [ 'Placeholder da pesquisa', 'Ex.: educação, saúde, gestão...' ],
			'modality_label' => [ 'Label da modalidade', 'Modalidade' ],
			'modality_placeholder' => [ 'Placeholder da modalidade', 'Selecione a modalidade' ],
			'area_label' => [ 'Label da área', 'Área de conhecimento' ],
			'area_placeholder' => [ 'Placeholder da área', 'Escolha primeiro a modalidade' ],
			'course_label' => [ 'Label do curso', 'Curso' ],
			'course_placeholder' => [ 'Placeholder do curso', 'Escolha primeiro a área' ],
			'button_text' => [ 'Texto do botão', 'Pesquisar' ],
			'help_text' => [ 'Texto de ajuda', 'Encontre uma especialização para o próximo passo da sua carreira.' ],
			'loading_text' => [ 'Texto de carregamento', 'Carregando opções…' ],
			'empty_text' => [ 'Texto sem resultados', 'Não encontramos cursos com esses critérios.' ],
		];
		foreach ( $texts as $key => $field ) {
			$this->add_control( $key, [ 'label' => esc_html__( $field[0], 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::TEXT, 'default' => $field[1], 'label_block' => true ] );
		}
		$this->add_control( 'show_text_search', [ 'label' => esc_html__( 'Mostrar campo de pesquisa textual', 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::SWITCHER, 'return_value' => 'yes', 'default' => 'yes' ] );
		$this->add_control( 'show_course', [ 'label' => esc_html__( 'Mostrar seletor de curso', 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::SWITCHER, 'return_value' => 'yes', 'default' => 'yes' ] );
		$this->end_controls_section();

		$this->start_controls_section( 'style_typography', [ 'label' => esc_html__( 'Tipografia', 'angie-snippets' ), 'tab' => \Elementor\Controls_Manager::TAB_STYLE ] );
		foreach ( [ 'title' => [ 'Título', '.phorte-pos-search__title' ], 'eyebrow' => [ 'Eyebrow', '.phorte-pos-search__eyebrow' ], 'labels' => [ 'Labels', '.phorte-pos-search__label' ], 'fields' => [ 'Campos', '.phorte-pos-search__control' ], 'button' => [ 'Botão', '.phorte-pos-search__submit' ], 'results' => [ 'Resultados', '.phorte-pos-search__results' ] ] as $key => $item ) {
			$this->add_group_control( \Elementor\Group_Control_Typography::get_type(), [ 'name' => $key . '_typography', 'label' => esc_html__( $item[0], 'angie-snippets' ), 'selector' => '{{WRAPPER}} ' . $item[1] ] );
		}
		$this->end_controls_section();

		$this->start_controls_section( 'style_colors', [ 'label' => esc_html__( 'Cores e campos', 'angie-snippets' ), 'tab' => \Elementor\Controls_Manager::TAB_STYLE ] );
		$colors = [ 'title_color' => [ 'Título', '.phorte-pos-search__title' ], 'eyebrow_color' => [ 'Eyebrow', '.phorte-pos-search__eyebrow' ], 'label_color' => [ 'Labels', '.phorte-pos-search__label' ], 'text_color' => [ 'Texto dos campos', '.phorte-pos-search__control' ], 'field_background' => [ 'Fundo dos campos', '.phorte-pos-search__control' ], 'field_border_color' => [ 'Borda dos campos', '.phorte-pos-search__control' ], 'button_color' => [ 'Texto do botão', '.phorte-pos-search__submit' ], 'button_background' => [ 'Fundo do botão', '.phorte-pos-search__submit' ], 'button_hover_background' => [ 'Fundo do botão ao passar o cursor', '.phorte-pos-search__submit:hover' ], 'button_hover_color' => [ 'Texto do botão ao passar o cursor', '.phorte-pos-search__submit:hover' ] ];
		foreach ( $colors as $key => $item ) {
			$this->add_control( $key, [ 'label' => esc_html__( $item[0], 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::COLOR, 'selectors' => [ '{{WRAPPER}} ' . $item[1] => 'color: {{VALUE}};' ] ] );
		}
		// Use dedicated custom properties for backgrounds and borders to avoid overriding field text colors.
		foreach ( [ 'field_background' => [ '.phorte-pos-search__control', 'background-color' ], 'field_border_color' => [ '.phorte-pos-search__control', 'border-color' ], 'button_background' => [ '.phorte-pos-search__submit', 'background-color' ], 'button_hover_background' => [ '.phorte-pos-search__submit:hover', 'background-color' ], 'button_hover_color' => [ '.phorte-pos-search__submit:hover', 'color' ] ] as $key => $item ) {
			$this->update_control( $key, [ 'selectors' => [ '{{WRAPPER}} ' . $item[0] => $item[1] . ': {{VALUE}};' ] ] );
		}
		$this->add_responsive_control( 'field_radius', [ 'label' => esc_html__( 'Raio dos campos', 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::SLIDER, 'size_units' => [ 'px' ], 'range' => [ 'px' => [ 'min' => 0, 'max' => 30 ] ], 'default' => [ 'unit' => 'px', 'size' => 9 ], 'selectors' => [ '{{WRAPPER}} .phorte-pos-search__control' => 'border-radius: {{SIZE}}{{UNIT}};' ] ] );
		$this->add_group_control( \Elementor\Group_Control_Border::get_type(), [ 'name' => 'panel_border', 'label' => esc_html__( 'Borda do painel', 'angie-snippets' ), 'selector' => '{{WRAPPER}} .phorte-pos-search__panel' ] );
		$this->add_group_control( \Elementor\Group_Control_Box_Shadow::get_type(), [ 'name' => 'panel_shadow', 'label' => esc_html__( 'Sombra do painel', 'angie-snippets' ), 'selector' => '{{WRAPPER}} .phorte-pos-search__panel' ] );
		$this->add_responsive_control( 'panel_padding', [ 'label' => esc_html__( 'Espaçamento interno', 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::DIMENSIONS, 'size_units' => [ 'px', 'em', '%' ], 'default' => [ 'top' => 30, 'right' => 34, 'bottom' => 30, 'left' => 34, 'unit' => 'px', 'isLinked' => false ], 'selectors' => [ '{{WRAPPER}} .phorte-pos-search__panel' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};' ] ] );
		$this->add_responsive_control( 'field_gap', [ 'label' => esc_html__( 'Espaçamento entre campos', 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::SLIDER, 'size_units' => [ 'px' ], 'range' => [ 'px' => [ 'min' => 4, 'max' => 48 ] ], 'default' => [ 'unit' => 'px', 'size' => 16 ], 'selectors' => [ '{{WRAPPER}} .phorte-pos-search__fields' => 'gap: {{SIZE}}{{UNIT}};' ] ] );
		$this->add_control( 'panel_background', [ 'label' => esc_html__( 'Fundo do painel', 'angie-snippets' ), 'type' => \Elementor\Controls_Manager::COLOR, 'default' => '#FFFFFF', 'selectors' => [ '{{WRAPPER}} .phorte-pos-search__panel' => 'background-color: {{VALUE}};' ] ] );
		$this->end_controls_section();
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$id = 'phorte-pos-search-' . $this->get_id();
		$show_text = 'yes' === ( $s['show_text_search'] ?? 'yes' );
		$show_course = 'yes' === ( $s['show_course'] ?? 'yes' );
		$endpoint = esc_url( rest_url( 'phorte-pos-search/v1/' ) );
		?>
		<section id="<?php echo esc_attr( $id ); ?>" class="phorte-pos-search<?php echo $show_course ? '' : ' phorte-pos-search--no-course'; ?>" data-phorte-pos-search data-endpoint="<?php echo $endpoint; ?>" data-loading="<?php echo esc_attr( $s['loading_text'] ?? 'Carregando opções…' ); ?>" data-empty="<?php echo esc_attr( $s['empty_text'] ?? 'Não encontramos cursos com esses critérios.' ); ?>">
			<div class="phorte-pos-search__panel">
				<?php if ( ! empty( $s['eyebrow'] ) ) : ?><p class="phorte-pos-search__eyebrow"><?php echo esc_html( $s['eyebrow'] ); ?></p><?php endif; ?>
				<?php if ( ! empty( $s['title'] ) ) : ?><h2 class="phorte-pos-search__title"><?php echo esc_html( $s['title'] ); ?></h2><?php endif; ?>
				<form class="phorte-pos-search__form" data-search-form>
					<?php if ( $show_text ) : ?><div class="phorte-pos-search__field phorte-pos-search__field--query"><label class="phorte-pos-search__label" for="<?php echo esc_attr( $id ); ?>-query"><?php echo esc_html( $s['search_label'] ?? '' ); ?></label><span class="phorte-pos-search__query-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><input id="<?php echo esc_attr( $id ); ?>-query" class="phorte-pos-search__control" type="search" name="q" placeholder="<?php echo esc_attr( $s['search_placeholder'] ?? '' ); ?>" maxlength="120" autocomplete="off" data-search-query></div><?php endif; ?>
					<div class="phorte-pos-search__fields">
						<div class="phorte-pos-search__field"><label class="phorte-pos-search__label" for="<?php echo esc_attr( $id ); ?>-modality"><?php echo esc_html( $s['modality_label'] ?? '' ); ?></label><select id="<?php echo esc_attr( $id ); ?>-modality" class="phorte-pos-search__control" data-modality><option value=""><?php echo esc_html( $s['modality_placeholder'] ?? '' ); ?></option></select></div>
						<div class="phorte-pos-search__field"><label class="phorte-pos-search__label" for="<?php echo esc_attr( $id ); ?>-area"><?php echo esc_html( $s['area_label'] ?? '' ); ?></label><select id="<?php echo esc_attr( $id ); ?>-area" class="phorte-pos-search__control" data-area disabled><option value=""><?php echo esc_html( $s['area_placeholder'] ?? '' ); ?></option></select></div>
						<?php if ( $show_course ) : ?><div class="phorte-pos-search__field"><label class="phorte-pos-search__label" for="<?php echo esc_attr( $id ); ?>-course"><?php echo esc_html( $s['course_label'] ?? '' ); ?></label><select id="<?php echo esc_attr( $id ); ?>-course" class="phorte-pos-search__control" data-course disabled><option value=""><?php echo esc_html( $s['course_placeholder'] ?? '' ); ?></option></select><button class="phorte-pos-search__load-more" type="button" data-load-more hidden>Carregar mais cursos</button></div><?php endif; ?>
						<button class="phorte-pos-search__submit" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><?php echo esc_html( $s['button_text'] ?? 'Pesquisar' ); ?></button>
					</div>
				</form>
				<?php if ( ! empty( $s['help_text'] ) ) : ?><p class="phorte-pos-search__help"><?php echo esc_html( $s['help_text'] ); ?></p><?php endif; ?>
				<div class="phorte-pos-search__status" role="status" aria-live="polite" data-status></div>
				<div class="phorte-pos-search__results" data-results></div>
			</div>
		</section>
		<?php
	}
}
