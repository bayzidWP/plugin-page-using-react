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



 // https://developer.wordpress.org/news/2024/03/how-to-use-wordpress-react-components-for-plugin-pages/
 // https://wordpress.github.io/gutenberg/?path=/docs/components-paletteedit--docs



 

// If this file is called directly, abort.
if (!defined('ABSPATH')) exit;


function unadorned_announcement_bar_settings_page() {
    add_options_page(
        __( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ),
        __( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ),
        'manage_options',
        'unadorned-announcement-bar',
        'unadorned_announcement_bar_settings_page_html'
    );
}

add_action( 'admin_menu', 'unadorned_announcement_bar_settings_page' );


/**
 * Render the settings page for the Unadorned Announcement Bar plugin.
 *
 * This function outputs the HTML for the settings page, which is a React application
 * that will be loaded asynchronously.
 *
 * @since 1.0.0
 */
function unadorned_announcement_bar_settings_page_html() {
    printf(
        '<div class="wrap" id="unadorned-announcement-bar-settings">%s</div>',
        esc_html__( 'Loading…', 'unadorned-announcement-bar' )
    );
}




function unadorned_announcement_bar_settings_page_enqueue_style_script( $admin_page ) {
    if ( 'settings_page_unadorned-announcement-bar' !== $admin_page ) {
        return;
    }

    $asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    if ( ! file_exists( $asset_file ) ) {
        return;
    }

    $asset = include $asset_file;

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

add_action( 'admin_enqueue_scripts', 'unadorned_announcement_bar_settings_page_enqueue_style_script' );