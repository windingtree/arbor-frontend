import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default props => {
    return (
        <SvgIcon
            {...props}
        >
            <path d="M10 1C7.23857 1 5 5.02944 5 10C5 14.9706 7.23858 19 10 19M10 1C12.7614 1 15 5.02944 15 10C15 14.9706 12.7614 19 10 19M10 1L10 19M10 1C7.23857 1 0.999999 3 0.999999 10M10 1C12.7614 1 19 3 19 10M10 19C7.23858 19 1 17 0.999999 10M10 19C12.7614 19 19 17 19 10M19 10L0.999999 10" fill="none" stroke="black" strokeWidth="2"/>
        </SvgIcon>
    );
};
