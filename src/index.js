import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import { Panel, PanelBody, PanelRow } from '@wordpress/components';

/**
 * Internal dependencies
 * This file is used to render the settings page for the Unadorned Announcement Bar plugin.
 * It uses React to create a dynamic interface.
 * @since 1.0.0
 */
const SettingsPage = () => {
      return (
            <Panel>
                  <PanelBody>
                        <PanelRow>
                              <div>Placeholder for message control</div>
                        </PanelRow>
                        <PanelRow>
                              <div>Placeholder for display control</div>
                        </PanelRow>
                  </PanelBody>
                  <PanelBody
                        title={__('Appearance', 'unadorned-announcement-bar')}
                        initialOpen={false}
                  >
                        <PanelRow>
                              <div>Placeholder for size control</div>
                        </PanelRow>
                  </PanelBody>
            </Panel>
      );
}

// Render the settings page when the DOM is ready.
domReady(() => {
      const container = document.getElementById('unadorned-announcement-bar-settings');
      if (container) { // Check if the container exists
            const root = createRoot(container);
            root.render(<SettingsPage />);
      }
});