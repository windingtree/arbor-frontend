import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function HomeIcon(props) {
  return (
    <SvgIcon
      {...props}
    >
      <path d="M6.16659 15.3333V11.6667C6.16659 10.6541 6.9874 9.83333 7.99992 9.83333C9.01244 9.83333 9.83325 10.6541 9.83325 11.6667V15.3333H14.4166V8H14.5606C15.4771 8 15.9108 6.8698 15.2296 6.2567L8.66888 0.352068C8.28858 0.0097937 7.71126 0.0097937 7.33095 0.352068L0.770245 6.25671C0.089028 6.8698 0.522726 8 1.43921 8H1.58325V15.3333H6.16659Z" fill={props.color}/>
    </SvgIcon>
  )
}