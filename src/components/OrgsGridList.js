import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

export default function OrgsGridList(props) {
  const { children, spacing } = props;

  return (
    <Grid container spacing={spacing} {...props}>
      {children}
    </Grid>
  )
}

OrgsGridList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  spacing: PropTypes.number
};