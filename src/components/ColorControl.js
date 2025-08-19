import { ColorPalette } from '@wordpress/components';

const ColorControl = ({ value, onChange }) => {
    return (
        <ColorPalette
            colors={[
                { color: '#1a4548', name: 'Primary', slug: 'primary' },
                { color: '#0000ff', name: 'Secondary', slug: 'secondary' },
                { color: '#fb326b', name: 'Tertiary', slug: 'tertiary' }
            ]}
            value={value}
            onChange={onChange}
        />
    );
};

export default ColorControl;
