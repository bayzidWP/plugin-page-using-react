
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Panel, PanelBody, PanelRow, NoticeList } from '@wordpress/components';

import { useState } from '@wordpress/element';
import MessageControl from './components/MessageControl.js';
import DisplayControl from './components/DisplayControl.js';
import SizeControl from './components/SizeControl.js';
import TextAlignment from './components/TextAlignmentControl.js';
import ColorControl from './components/ColorControl';

import SaveButton from './components/SaveButton.js';
import SettingsTitle from './components/SettingsTitle.js';
import { useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import './index.scss';

/**
 * Notices component that displays a list of notices using the WordPress Notices API.
 * @returns {JSX.Element|null} A list of notices or null if there are no notices.
 */
const Notices = () => {
    const { removeNotice } = useDispatch(noticesStore);

    const notices = useSelect((select) =>
        select(noticesStore).getNotices()
    );

    if (notices.length === 0) {
        return null;
    }
    return <NoticeList notices={notices} onRemove={removeNotice} />;
};

/**
 * Custom hook to manage the settings state for the Unadorned Announcement Bar plugin.
 * This hook encapsulates the logic for handling the announcement message, display state, and size of the announcement bar.
 * @since 1.0.0
* @returns {Object} An object containing the current settings and functions to update them.
 */
const useSettings = () => {
    const [message, setMessage] = useState('Hello, World!');
    const [display, setDisplay] = useState(true);
    const [size, setSize] = useState('medium');
    const [alignment, setAlignment] = useState('left');
    const [controlledColors, setControlledColors] = useState();

    // This effect is used to show a success notice when the settings are saved.
    const { createSuccessNotice } = useDispatch(noticesStore);


    // This hook is used to manage the settings state.
    useEffect(() => {
        // Fetch initial settings from the server.
        apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
            setMessage(settings.unadorned_announcement_bar.message);
            setDisplay(settings.unadorned_announcement_bar.display);
            setAlignment(settings.unadorned_announcement_bar.alignment);
            setSize(settings.unadorned_announcement_bar.size);
        });
    }, [])

    // Function to save the settings to the server.
    const saveSettings = () => {
        apiFetch({
            path: '/wp/v2/settings',
            method: 'POST',
            data: {
                unadorned_announcement_bar: {
                    message,
                    display,
                    alignment,
                    size,
                },
            },
        }).then(() => {
            // Show a success notice when settings are saved.
            createSuccessNotice(__('Settings saved successfully!', 'unadorned-announcement-bar'));
        });
    };

    return {
        message,
        setMessage,
        display,
        setDisplay,
        alignment,
        setAlignment,
        size,
        setSize,
        controlledColors,
        setControlledColors,
        // Function to save the settings.
        saveSettings,
    };
}

/**
 * SettingsPage component that renders the settings interface for the Unadorned Announcement Bar plugin.
 * It includes controls for the announcement message, display state, and size, along with a save button.
 * @since 1.0.0
 * @returns {JSX.Element} The rendered settings page.
 */
const SettingsPage = () => {
    const {
        message,
        setMessage,
        display,
        setDisplay,
        size,
        setSize,
        alignment,
        setAlignment,
        controlledColors,
        setControlledColors,
        // Function to save the settings.
        saveSettings,
    } = useSettings();

    return (
        <>
            <SettingsTitle />
            <Notices />
            <Panel>
                <PanelBody>
                    <PanelRow>
                        <MessageControl
                            value={message}
                            onChange={(value) => setMessage(value)}
                        />
                    </PanelRow>
                    <PanelRow>
                        <DisplayControl
                            value={display}
                            onChange={(value) => setDisplay(value)}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextAlignment
                            value={alignment}
                            onChange={(value) => setAlignment(value)}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ColorControl
                            value={controlledColors}
                            onChange={(value) => setControlledColors(value)}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody
                    title={__('Appearance', 'unadorned-announcement-bar')}
                    initialOpen={false}>
                    <PanelRow>
                        <SizeControl
                            value={size}
                            onChange={(value) => setSize(value)} />
                    </PanelRow>
                </PanelBody>
            </Panel>
            <SaveButton onClick={saveSettings} />
        </>
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