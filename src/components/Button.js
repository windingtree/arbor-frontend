import React from 'react';
import { Button } from '@material-ui/core';

export default function ButtonCommon(props) {
  const { children, onClick } = props;
  return (
    <Button
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}