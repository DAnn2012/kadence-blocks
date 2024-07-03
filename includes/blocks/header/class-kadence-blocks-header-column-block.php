<?php
/**
 * Class to Build the Header block.
 *
 * @package Kadence Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to Build the Headers container Block for desktop.
 *
 * @category class
 */
class Kadence_Blocks_Header_Column_Block extends Kadence_Blocks_Abstract_Block {

	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;


	/**
	 * Block name within this namespace.
	 *
	 * @var string
	 */
	protected $block_name = 'column';

	/**
	 * Block determines in scripts need to be loaded for block.
	 *
	 * @var string
	 */
	protected $has_script = false;
	/**
	 * Block determines in scripts need to be loaded for block.
	 *
	 * @var string
	 */
	protected $has_style = false;

	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * On init startup register the block.
	 */
	public function on_init() {
		register_block_type(
			KADENCE_BLOCKS_PATH . 'dist/blocks/header/children/' . $this->block_name . '/block.json',
			array(
				'render_callback' => array( $this, 'render_css' ),
			)
		);
	}


	/**
	 * Builds CSS for block.
	 *
	 * @param array              $attributes      the blocks attributes.
	 * @param Kadence_Blocks_CSS $css             the css class for blocks.
	 * @param string             $unique_id       the blocks attr ID.
	 * @param string             $unique_style_id the blocks alternate ID for queries.
	 */
	public function build_css( $attributes, $css, $unique_id, $unique_style_id ) {

		$css->set_style_id( 'kb-' . $this->block_name . $unique_style_id );

		$css->set_selector( '.wp-block-kadence-header-column' . $unique_id );


		return $css->css_output();
	}

	/**
	 * The innerblocks are stored on the $content variable. We just wrap with our data, if needed
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the block output.
	 */
	public function build_html( $attributes, $unique_id, $content, $block_instance ) {
		if ( ! empty( $attributes['location'] ) && ! in_array( $attributes['location'], array( 'tablet-left', 'tablet-right', 'center-left', 'center', 'center-right' ) ) ) {

			// If no center content, return empty div to keep layout consistent.
			if( $attributes['location'] === 'tablet-center' && empty( $content ) ) {
				return '<div></div>';
			}

			return $content;
		}

		$html = '';

		$classes = array(
			'wp-block-kadence-header-column'
		);

		if ( ! empty( $attributes['location'] ) ) {
			$classes[] = 'wp-block-kadence-header-column-' . esc_attr( $attributes['location'] );

			//append a fake column in tablet left and right for more consistent styling compared to desktop
			if ( $attributes['location'] == 'tablet-left' ) {
				$content .= '<div class="wp-block-kadence-header-column wp-block-kadence-header-column-center-left"></div>';
			}
			if ( $attributes['location'] == 'tablet-right' ) {
				$content = '<div class="wp-block-kadence-header-column wp-block-kadence-header-column-center-right"></div>' . $content;
			}
		}

		$html .= '<div class="' . esc_attr( implode( ' ', $classes ) ) . '">';
		$html .= $content;
		$html .= '</div>';

		return $html;

	}
}

Kadence_Blocks_Header_Column_Block::get_instance();
