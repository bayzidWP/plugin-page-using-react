import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const MessageControl = ({ value, onChange }) => {
    return (
        <TextareaControl
            label={__('Message', 'unadorned-announcement-bar')}
            value={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    )
}

export default MessageControl;