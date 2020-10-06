import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function InfoIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" stroke={props.stroke} fill={props.fill}/>
      <path d="M12.5 8C12.5 8.27614 12.2761 8.5 12 8.5C11.7239 8.5 11.5 8.27614 11.5 8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8Z" stroke={props.stroke} fill={props.fill} />
      <path d="M12 16L12 11" stroke={props.stroke} fill={props.fill} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}