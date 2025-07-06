
import { PaletteEdit } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ColorControl = ({ value, onChange }) => {
    return (
        <PaletteEdit
            colors={[
                {
                    color: '#1a4548',
                    name: 'Primary',
                    slug: 'primary'
                },
                {
                    color: '#0000ff',
                    name: 'Secondary',
                    slug: 'secondary'
                },
                {
                    color: '#fb326b',
                    name: 'Tertiary',
                    slug: 'tertiary'
                }
            ]}
            // emptyMessage="Colors are empty"
            // paletteLabel="Colors"
            // popoverProps={{
            //     offset: 8,
            //     placement: 'bottom-start'
            // }}
            // label={__('Color', 'unadorned-announcement-bar')}
            value={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    );
}

export default ColorControl;
