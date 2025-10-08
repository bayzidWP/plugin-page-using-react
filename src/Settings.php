<?php
/**
 * Settings page for the Unadorned Announcement Bar plugin.
 *
 * Sets up the default values and schema for the settings.
 */
function announcement_bar_settings() {
	// Register the settings for the Unadorned Announcement Bar plugin.
	$defaults = array(
		'display'        => true,
		'message'        => __( 'Hello, WordPress!', 'unadorned-announcement-bar' ),
		'alignment'      => 'left',
		'size'           => 'x-large',
		'bg_color'       => '#1a4548',
		'text_color'     => '#ffffff',
		'banner_padding' => array(
			'top'    => 22,
			'right'  => 22,
			'bottom' => 22,
			'left'   => 22,
		),
	);

	$schema = array(
		'type'       => 'object',
		'properties' => array(
			'message'        => array(
				'type' => 'string',
			),
			'display'        => array(
				'type' => 'boolean',
			),
			'alignment'      => array(
				'type' => 'string',
				'enum' => array(
					'left',
					'center',
					'right',
				),
			),
			'size'           => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'x-large',
				),
			),
			'bg_color'       => array( 'type' => 'string' ),
			'text_color'     => array( 'type' => 'string' ),
			'banner_padding' => array(
				'type'       => 'object',
				'properties' => array(
					'top'    => array(
						'type'    => 'integer',
						'minimum' => 0,
						'maximum' => 100,
					),
					'right'  => array(
						'type'    => 'integer',
						'minimum' => 0,
						'maximum' => 100,
					),
					'bottom' => array(
						'type'    => 'integer',
						'minimum' => 0,
						'maximum' => 100,
					),
					'left'   => array(
						'type'    => 'integer',
						'minimum' => 0,
						'maximum' => 100,
					),
				),
			),
		),
	);

	register_setting(
		'options',
		'announcement_bar',
		array(
			'type'         => 'object',
			'default'      => $defaults,
			'show_in_rest' => array(
				'schema' => $schema,
			),
		)
	);
}

add_action( 'init', 'announcement_bar_settings' );
