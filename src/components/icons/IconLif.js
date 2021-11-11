import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const Icon = props => (
  <SvgIcon
    style={{
      height: '21px'
    }}
    {...props}
  >
    <path d="M3.33333 19.9998H0V0C1.86667 0 3.33333 1.46665 3.33333 3.33331V19.9998Z" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 20.0001H0V16.6667H16.6667C18.5333 16.6667 20 18.1334 20 20.0001Z" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66602 13.4666C6.66602 5.99995 12.666 0 19.9993 0V0.133333C19.9993 7.46661 13.9993 13.4666 6.66602 13.4666Z" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </SvgIcon>
);

export default Icon;
