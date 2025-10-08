import { ColorPalette, BaseControl } from '@wordpress/components';

/**
 * Reusable color picker control.
 *
 * @param {Object} props
 * @param {string} props.label - The label/title for the control.
 * @param {Array} props.colors - Array of color presets { color, name, slug }.
 * @param {string} props.value - Currently selected color.
 * @param {Function} props.onChange - Callback when color is changed.
 */
const ColorControl = ({ label, colors, value, onChange }) => {
    return (
        <BaseControl label={label}>
            <ColorPalette
                colors={colors}
                value={value}
                onChange={onChange}
            />
        </BaseControl>
    );
};

export default ColorControl;
