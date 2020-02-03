import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function MaximizeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 10V2H10H18V10V18H10V20H20V10V0H10H0V10H2ZM7 20V18H3.41421L7.70711 13.7071L6.29289 12.2929L2 16.5858V13H0V20H7Z" fill={props.color}/>
    </SvgIcon>
  )
}