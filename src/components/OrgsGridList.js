import React from 'react';
import { Grid } from '@material-ui/core';

export default function OrgsGridList(props) {
  return (
    <Grid container spacing={3}>
      {props.children}
    </Grid>
  )
}