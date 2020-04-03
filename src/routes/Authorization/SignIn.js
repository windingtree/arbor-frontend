import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import history from '../../redux/history';
import {connect} from 'react-redux';
import { fetchSignInRequest } from '../../ducks/signIn';
import {Container, Grid, Typography, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {MAINTENANCE} from "../../utils/constants";

import LoginIllustration from '../../assets/SvgComponents/login-illustration.svg';

import colors from '../../styles/colors';

const styles = makeStyles({
  container: {
    position: 'relative',
    padding: '74px 0 60px 0'
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
    backgroundImage: colors.gradients.green,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.secondary.cyan}`,
    borderRadius: '6px'
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px'
  }
});

// A Box for the Sign-in Action
const SignInActionBox = (classes, props) => {
  // A maintenance action is ongoing
  if(MAINTENANCE && MAINTENANCE.active) {
    // Return maintenance message
    return (
      <Box style={{width: '80%', margin: '0 auto'}}>
        <div className={classes.screenTitleWrapper}>
          <Typography variant={'h1'} className={classes.screenTitle}>{MAINTENANCE.title}</Typography>
            <div className={classes.line}/>
        </div>
        <div className={classes.subtitleWrapper}>
          <Typography variant={'subtitle2'} className={classes.subtitle}>{MAINTENANCE.text}</Typography>
        </div>
        <div className={classes.buttonWrapper}>
          <Button onClick={() => window.location = MAINTENANCE.link} className={classes.button}>
            <Typography variant={'caption'} className={classes.buttonLabel}>{MAINTENANCE.button}</Typography>
          </Button>
        </div>
      </Box>
    );
  }
  
  // No maintenance
  else {
    // Return normal Sign-In Action
    return (
      <Box style={{width: '80%', margin: '0 auto'}}>
        <div className={classes.screenTitleWrapper}>
          <Typography variant={'h1'} className={classes.screenTitle}>Welcome to Arbor</Typography>
            <div className={classes.line}/>
        </div>
        <div className={classes.subtitleWrapper}>
          <Typography variant={'subtitle2'} className={classes.subtitle}>MetaMask is a browser extension that allows
            you to hold Ether and tokens as well as create and manage your organization profile on
            Arbor.</Typography>
        </div>
        <div className={classes.buttonWrapper}>
          <Button onClick={props.fetchSignInRequest} className={classes.button}>
            <Typography variant={'caption'} className={classes.buttonLabel}>Sign in with MetaMask</Typography>
          </Button>
        </div>
      </Box>
    );
  }
};

const SignIn = (props) => {
  const classes = styles();
  const [isUploaded, setUploaded] = useState(false);
  const isInstalled = _.get(history, 'location.state.installed', false);

  useEffect(() => {
    if(isInstalled) {
      setTimeout(() => setUploaded(true), 2000);
      if(isUploaded) {
        alert('If you have already installed MetaMask - please,  reload this page')
      }
    }
  });

  return (
    <Container className={classes.container}>
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Grid item className={classes.itemContainer}>
          <img src={LoginIllustration} alt={'Login illustration'} className={classes.illustration}/>
        </Grid>
        <Grid item className={classes.itemContainer}>
          {SignInActionBox(classes, props)}
        </Grid>
      </Grid>
    </Container>
)
};

const mapDispatchToProps = {
  fetchSignInRequest
};

export default connect(null, mapDispatchToProps)(SignIn);