import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  buttonWrapper: {
    padding: '16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #EFEFEF',
    boxSizing: 'border-box',
    boxShadow: '0px 6px 24px #F3F3F6',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  buttonLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    color: '#3E9693',
    textTransform: 'none'
  }
});

export default props => {
  const classes = styles();
  const {
    children,
    ...restProps
  } = props;

  return (
    <Grid container
      className={classes.buttonWrapper}
      direction='column'
      justify='center'
      alignItems='center'
    >
      <Grid item>
        <Button {...restProps}>
          <Typography className={classes.buttonLabel}>
            {children}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};