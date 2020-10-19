import React from 'react';
import NumberFormat from 'react-number-format';

export default props => {
    const {
        inputRef,
        onChange,
        prefix,
        ...other
    } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={
                values => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }
            }
            thousandSeparator
            isNumericString
            prefix={prefix}
        />
    );
}