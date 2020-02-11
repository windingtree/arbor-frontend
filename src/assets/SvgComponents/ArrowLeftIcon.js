import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function EditIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.41436 4.99995H13.0002V6.99995H4.41436L7.70726 10.2928L6.29304 11.7071L0.585938 5.99995L6.29304 0.292847L7.70726 1.70706L4.41436 4.99995Z" fill={props.color}/>
    </SvgIcon>
  )
}