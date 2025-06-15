
// Import Toggle control component
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DisplayControl = ({ value, onChange }) => {
    return (
        <ToggleControl
            label={__('Display', 'unadorned-announcement-bar')}
            checked={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    )
}

export default DisplayControl;