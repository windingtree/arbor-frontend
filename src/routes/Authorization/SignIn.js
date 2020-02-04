import React from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import LoginIllustration from '../../assets/SvgComponents/login-illustration.svg';
import ButtonCommon from '../../components/Button';

import colors from '../../styles/colors';

const styles = makeStyles({
  container: {
    position: 'relative',
    top: '60px'
  },
  itemContainer: {
    width: '50%'
  },
  illustration: {
    width: '100%',
    height: '100%'
  },
  screenTitleWrapper: {
    position: 'relative',
    paddingBottom: '20px'
  },
  screenTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.primary.black
  },
  line: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '16%',
    height: '2px',
    background: colors.primary.accent
  },
  subtitleWrapper: {
    paddingTop: '20px'
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  buttonWrapper: {
    marginTop: '68px'
  },
  button: {
    backgroundImage: 'linear-gradient(35.28deg, #EC6F95 0%, #FCB871 100%)',
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px'
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.2,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px'
  }
});

const SignIn = ({props}) => {
  const classes = styles();

  return (
    <Container className={classes.container}>
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Grid item className={classes.itemContainer}>
          <img src={LoginIllustration} alt={'Login illustration'} className={classes.illustration}/>
        </Grid>
        <Grid item className={classes.itemContainer}>
          <Box>
            <div className={classes.screenTitleWrapper}>
              <Typography variant={'h1'} className={classes.screenTitle}>Sign in with MetaMask</Typography>
              <div className={classes.line}/>
            </div>
            <div className={classes.subtitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.subtitle}>Welcome back! Let’s get back to business. </Typography>
            </div>
            <div className={classes.buttonWrapper}>
              <ButtonCommon onClick={() => console.log('metamask')} className={classes.button}>
                <Typography variant={'caption'} className={classes.buttonLabel}>Sign in</Typography>
              </ButtonCommon>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
};

export default SignIn;