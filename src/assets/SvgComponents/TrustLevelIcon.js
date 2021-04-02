import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function TrustLevelIcon(props) {
  return (
    <SvgIcon viewBox={'0 0 16 16'} {...props}>
      <path d="M7.54545 16C3.18182 14.0561 1 12.1167 1 10.1818V2.90909C1 2.18182 1.36364 2.18182 2.45455 1.45455C2.57221 1.3761 5.04597 0 7.54545 0C9.72382 0 11.5455 0.727273 12.6364 1.45455C13.7273 2.18182 14.0909 2.18182 14.0909 2.90909C14.1101 3.12096 14.0909 9.09091 14.0909 10.1818C14.0909 12.1212 11.9091 14.0606 7.54545 16Z"/>
      <path d="M11 5.81051L7.56717 10L5 7.91132L5.98049 6.90169L7.34886 8.01501L9.81934 5L11 5.81051Z" fill="white"/>
    </SvgIcon>
  )
}

//Badge with checkmark displayed next to social/website links (only if it was verified)
export function TrustBadgeChecked(props) {
    return (
        <SvgIcon viewBox={'0 0 16 16'} {...props}>
            <path d="M7.54545 16C3.18182 14.0561 1 12.1167 1 10.1818V2.90909C1 2.18182 1.36364 2.18182 2.45455 1.45455C2.57221 1.3761 5.04597 0 7.54545 0C9.72382 0 11.5455 0.727273 12.6364 1.45455C13.7273 2.18182 14.0909 2.18182 14.0909 2.90909C14.1101 3.12096 14.0909 9.09091 14.0909 10.1818C14.0909 12.1212 11.9091 14.0606 7.54545 16Z"/>
            <path d="M11 5.81051L7.56717 10L5 7.91132L5.98049 6.90169L7.34886 8.01501L9.81934 5L11 5.81051Z" fill="#42424F"/>
        </SvgIcon>
    )
}


//badge with number inside (level of trust assertions) - displayed in Info section of organization
export function TrustLevelNumericIcon(props) {
    const {level} = props;
    return (
            <SvgIcon viewBox={'0 0 16 16'} {...props}>
                <path d="M7.54545 16C3.18182 14.0561 1 12.1167 1 10.1818V2.90909C1 2.18182 1.36364 2.18182 2.45455 1.45455C2.57221 1.3761 5.04597 0 7.54545 0C9.72382 0 11.5455 0.727273 12.6364 1.45455C13.7273 2.18182 14.0909 2.18182 14.0909 2.90909C14.1101 3.12096 14.0909 9.09091 14.0909 10.1818C14.0909 12.1212 11.9091 14.0606 7.54545 16Z"/>
                <text x="7" y="12" textAnchor="middle" fontSize="12" fill="black">
                    {level}
                </text>
            </SvgIcon>
    )
}
