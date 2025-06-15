import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Panel, PanelBody, PanelRow, Path } from '@wordpress/components';
import { useState } from '@wordpress/element';
import MessageControl from './components/MessageControl.js';
import DisplayControl from './components/DisplayControl.js';
import SizeControl from './components/SizeControl.js';
import SaveButton from './components/SaveButton.js';
import SettingsTitle from './components/SettingsTitle.js';
import { useEffect } from 'react';


const useSettings = () => {
    const [message, setMessage] = useState('Hello, World!');
    const [display, setDisplay] = useState(true);
    const [size, setSize] = useState('medium');

    return {
        message,
        setMessage,
        display,
        setDisplay,
        size,
        setSize
    };


    useEffect(() => {
        // This effect runs once when the component mounts.
        // You can fetch initial settings from the server or perform any setup here.
        apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
            setMessage(settings.unadorned_announcement_bar.message);
            setDisplay(settings.unadorned_announcement_bar.display);
            setSize(settings.unadorned_announcement_bar.size);
        });
    }, [])







}

/**
 * Internal dependencies
 * This file is used to render the settings page for the Unadorned Announcement Bar plugin.
 * It uses React to create a dynamic interface.
 * @since 1.0.0
 */
const SettingsPage = () => {

    const {
        message,
        setMessage,
        display,
        setDisplay,
        size,
        setSize,
    } = useSettings();

    return (
        <>
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
            <SaveButton onClick={() => { }} />
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