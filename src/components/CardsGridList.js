import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

export default function CardsGridList(props) {
  const { children, spacing } = props;

  return (
    <Grid container spacing={spacing} {...props}>
      {children}
    </Grid>
  )
}

CardsGridList.propTypes = {
  children: PropTypes.any,
  spacing: PropTypes.number
};