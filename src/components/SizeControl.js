
import { __ } from '@wordpress/i18n';
import { FontSizePicker } from '@wordpress/components';

const SizeControl = ({ value, onChange }) => {
    return (
        <FontSizePicker
            fontSizes={[
                {
                    name: __('Small', 'unadorned-announcement-bar'),
                    size: 'small',
                    slug: 'small',
                },
                {
                    name: __('Medium', 'unadorned-announcement-bar'),
                    size: 'medium',
                    slug: 'medium',
                },
                {
                    name: __('Large', 'unadorned-announcement-bar'),
                    size: 'large',
                    slug: 'large',
                },
                {
                    name: __('Extra Large', 'unadorned-announcement-bar'),
                    size: 'x-large',
                    slug: 'x-large',
                },
            ]}
            value={value}
            onChange={onChange}
            disableCustomFontSizes={true}
            __nextHasNoMarginBottom
        />
    );
};
export default SizeControl;
