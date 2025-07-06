<?php
/**
 * Settings page for the Unadorned Announcement Bar plugin.
 *
 * Sets up the default values and schema for the settings.
 */
function unadorned_announcement_bar_settings() {
	// Register the settings for the Unadorned Announcement Bar plugin.
	$defaults = array(
		'message'   => __( 'Hello World!', 'unadorned-announcement-bar' ),
		'display'   => true,
		'alignment' => 'left',
		'size'      => 'medium',
	);

	$schema = array(
		'type'       => 'object',
		'properties' => array(
			'message'   => array(
				'type' => 'string',
			),
			'display'   => array(
				'type' => 'boolean',
			),
			'alignment' => array(
				'type' => 'string',
				'enum' => array(
					'left',
					'center',
					'right',
				),
			),
			'size'      => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'x-large',
				),
			),
		),
	);

	register_setting(
		'options',
		'unadorned_announcement_bar',
		array(
			'type'         => 'object',
			'default'      => $defaults,
			'show_in_rest' => array(
				'schema' => $schema,
			),
		)
	);
}

add_action( 'init', 'unadorned_announcement_bar_settings' );
