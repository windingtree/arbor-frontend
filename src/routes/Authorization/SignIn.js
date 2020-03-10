import React from 'react';
import {connect} from 'react-redux';
import { fetchSignInRequest, selectSignInError } from '../../ducks/signIn';
import {Container, Grid, Typography, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

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

const SignIn = (props) => {
  const classes = styles();
  const { error } = props;

  if(!!error) {
    alert('Please, install MetaMask plugin at your browser extensions store and return to us');
  }

  return (
    <Container className={classes.container}>
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Grid item className={classes.itemContainer}>
          <img src={LoginIllustration} alt={'Login illustration'} className={classes.illustration}/>
        </Grid>
        <Grid item className={classes.itemContainer}>
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
        </Grid>
      </Grid>
    </Container>
)
};

const mapStateToProps = state => {
  return {
    error: selectSignInError(state)
  }
};

const mapDispatchToProps = {
  fetchSignInRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);