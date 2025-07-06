import { AlignmentControl } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';



const TextAlignment = ({ value, onChange }) => {
    return (
        <AlignmentControl
            value={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    );
}

export default TextAlignment;