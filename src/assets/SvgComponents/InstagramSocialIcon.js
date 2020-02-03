import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function InstagramSocialIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect width="16.6" height="16.6" rx="4" fill="url(#paint0_linear)"/>
      <circle cx="8.3" cy="8.3" r="4.3" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5263 3.16544C14.5118 2.50388 14.0387 2 13.2705 2C12.5022 2 12 2.50388 12 3.16544C12 3.8133 12.4874 4.33169 13.2413 4.33169H13.2557C14.0387 4.33169 14.5263 3.8133 14.5263 3.16544Z" fill="white"/>
      <defs>
        <linearGradient id="paint0_linear" x1="-3.5" y1="17" x2="8" y2="-3.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6C36C"/>
          <stop offset="0.322913" stopColor="#DC5B50"/>
          <stop offset="0.604168" stopColor="#C44287"/>
          <stop offset="1" stopColor="#4D68CF"/>
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}