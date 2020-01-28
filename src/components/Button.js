import React from 'react';
import PropTypes from 'prop-types';
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

ButtonCommon.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired
};