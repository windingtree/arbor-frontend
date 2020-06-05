import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default props => {
    const { fill, stroke } = props;
    return (
        <SvgIcon
            {...props}
        >
            <path
                d="M14 6C13.2968 4.66667 11.3333 2 8 2C4.66667 2 2 4.68629 2 8C2 11.3137 4.66667 14 8 14C11.3333 14 13 12 14 10M14 6H11.3333M14 6V3.33333"
                fill={fill ? fill : 'none'} 
                stroke={stroke ? stroke : 'white'} 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
        </SvgIcon>
    );
};
