import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default props => {
    return (
        <SvgIcon
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M6 20V7H18V20H6ZM10 11C10.5523 11 11 11.4477 11 12V16.5C11 17.0523 10.5523 17.5 10 17.5C9.44772 17.5 9 17.0523 9 16.5V12C9 11.4477 9.44772 11 10 11ZM14 11C14.5523 11 15 11.4477 15 12V16.5C15 17.0523 14.5523 17.5 14 17.5C13.4477 17.5 13 17.0523 13 16.5V12C13 11.4477 13.4477 11 14 11Z" fill="#F79A8B"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H8V3ZM6 7V20H18V7H6ZM14 5H10V4H14V5Z" fill="#F79A8B"/>
        </SvgIcon>
    );
};
