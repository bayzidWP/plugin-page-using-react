<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @since             1.0.0
 * @package           Announce_Bar
 *
 * @wordpress-plugin
 * Plugin Name:       Announce Bar
 * Plugin URI:        http://announce-bar.com/
 * Description:       A WordPress plugin for a customizable announcement bar displayed above the website header. Easily manage the message, visibility, color, size, and more from a modern React-powered settings page
 * Author:            Bayzid Miah
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       announce-bar
 * Domain Path:       /Languages
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . 'src/settings.php';
/**
 * Registers the block using metadata loaded from the `blocks.json` file.
 */
function announcement_bar_settings_page() {
	add_options_page(
		__( 'Announcement Bar Settings', 'unadorned-announcement-bar' ),
		__( 'Announcement Bar Settings', 'unadorned-announcement-bar' ),
		'manage_options',
		'announcement-bar',
		'bar_settings_page_html'
	);
}

add_action( 'admin_menu', 'announcement_bar_settings_page' );


/**
 * Render the settings page for the Unadorned Announcement Bar plugin.
 *
 * This function outputs the HTML for the settings page, which is a React application
 * that will be loaded asynchronously.
 *
 * @since 1.0.0
 */
function bar_settings_page_html() {
	printf(
		'<div class="wrap" id="unadorned-announcement-bar-settings">%s</div>',
		esc_html__( 'Loading…', 'unadorned-announcement-bar' )
	);
}


/*
 * This function checks if the current admin page is the settings page for the plugin,
 * @param $admin_page string The current admin page slug.
 */
function announcement_bar_settings_page_enqueue_style_script( $admin_page ) {
	if ( 'settings_page_announcement-bar' !== $admin_page ) {
		return;
	}

	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;
	// Check if the asset file is valid and contains the necessary keys.
	// If not, return early to avoid errors.
	if ( ! is_array( $asset ) || ! isset( $asset['dependencies'], $asset['version'] ) ) {
		return;
	}

	wp_enqueue_style(
		'unadorned-announcement-bar-style',
		plugins_url( 'build/index.css', __FILE__ ),
		array_filter(
			$asset['dependencies'],
			function ( $style ) {
				return wp_style_is( $style, 'registered' );
			}
		),
		$asset['version'],
	);

	wp_enqueue_script(
		'unadorned-announcement-bar-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		array(
			'in_footer' => true,
		)
	);
}

add_action( 'admin_enqueue_scripts', 'announcement_bar_settings_page_enqueue_style_script' );

/**
 * Undocumented function
 *
 * @return void
 */
function announcement_bar_front_page() {
	$options = get_option( 'announcement_bar' );
	$padding = isset( $options['banner_padding'] ) ? $options['banner_padding'] : array(
		'top'    => 20,
		'right'  => 20,
		'bottom' => 20,
		'left'   => 20,
	);

	$style   = sprintf(
		'%dpx %dpx %dpx %dpx',
		intval( $padding['top'] ),
		intval( $padding['right'] ),
		intval( $padding['bottom'] ),
		intval( $padding['left'] )
	);
	$css   = WP_Style_Engine::compile_css(
		array(
			'background' => $options['bg_color'],
			'color'      => $options['text_color'],
			'padding'    => $style,
			'text-align' => $options['alignment'],
			'font-size'  => $options['size'],
		),
		''
	);

	if ( ! $options['display'] ) {
		return;
	}

	printf(
		'<div style="%s">%s</div>',
		esc_attr( $css ),
		esc_html( $options['message'] )
	);
}

add_action( 'wp_body_open', 'announcement_bar_front_page' );
