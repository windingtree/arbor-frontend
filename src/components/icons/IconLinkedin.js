import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default props => {
    return (
        <SvgIcon
            {...props}
        >
            <path d="M8 11V17M11.2 11V13M11.2 17V13M11.2 13C11.6 12.25 12.976 11 14 11C15.28 11 16 11.875 16 13V17" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8Z" fill="none" stroke="black"/>
            <rect fill="none" x="3" y="3" width="18" height="18" rx="3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </SvgIcon>
    );
};
