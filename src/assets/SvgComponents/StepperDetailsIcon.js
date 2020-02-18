import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function StepperDetailsIcon(props) {
  return (
    <SvgIcon  viewBox={'0 0 20 18'} style={{width: '22px', height: '22px', fontSize: 'inherit'}}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 0H12C13.1046 0 14 0.89543 14 2V3H18C19.1046 3 20 3.89543 20 5V16C20 17.1046 19.1046 18 18 18H2C0.89543 18 0 17.1046 0 16V5C0 3.89543 0.89543 3 2 3H6V2C6 0.89543 6.89543 0 8 0ZM2 5H6H14H18V10H11H9H2V5ZM2 16V12H9V13H11V12H18V16H2ZM12 2V3H8V2H12Z" fill={props.color}/>
    </SvgIcon>
  )
}
