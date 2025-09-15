import { Flex, FlexBlock, ToggleControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const PaddingControlAdvanced = ({ value, onChange }) => {
    const [linked, setLinked] = useState(true);

    const updateSide = (side, newValue) => {
        const numericValue = parseInt(newValue, 10) || 0; // Ensure numeric
        if (linked) {
            onChange({ top: numericValue, right: numericValue, bottom: numericValue, left: numericValue });
        } else {
            onChange({ ...value, [side]: numericValue });
        }
    };

    return (
        <div>
            <ToggleControl
                label="Link all sides"
                checked={linked}
                onChange={() => setLinked(!linked)}
            />
            <Flex>
                <FlexBlock>
                    <TextControl
                        label="Top"
                        type="number"
                        value={value.top}
                        onChange={(v) => updateSide('top', v)}
                        min={0}
                        max={100}
                    />
                </FlexBlock>
                <FlexBlock>
                    <TextControl
                        label="Right"
                        type="number"
                        value={value.right}
                        onChange={(v) => updateSide('right', v)}
                        min={0}
                        max={100}
                    />
                </FlexBlock>
                <FlexBlock>
                    <TextControl
                        label="Bottom"
                        type="number"
                        value={value.bottom}
                        onChange={(v) => updateSide('bottom', v)}
                        min={0}
                        max={100}
                    />
                </FlexBlock>
                <FlexBlock>
                    <TextControl
                        label="Left"
                        type="number"
                        value={value.left}
                        onChange={(v) => updateSide('left', v)}
                        min={0}
                        max={100}
                    />
                </FlexBlock>
            </Flex>
        </div>
    );
};

export default PaddingControlAdvanced;
