import {
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalHeading as Heading,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SettingsTitle = () => {
    return (
        <Heading level={1}>
            {__('Unadorned Announcement Bar', 'unadorned-announcement-bar')}
        </Heading>
    );
};

export default SettingsTitle;