import React from 'react';
import history from '../../redux/history';
import {Container, Grid, Typography, Box, Button} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';

import RegisterIllustration from '../../assets/SvgComponents/registration-illustration.svg';

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
    marginTop: '70px'
  },
  button: {
    height: '56px',
    backgroundImage: colors.gradients.green,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.secondary.cyan}`,
    borderRadius: '6px'
  },
  redirectLink: {
    textDecoration: 'none',
    color: colors.primary.white,
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px'
  },
  linkWrapper: {
    marginTop: '80px'
  },
  link: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1,
    color: colors.greyScale.common,
    textDecoration: 'none',
  },
  linkIcon: {
    position: 'relative',
    width: '14px',
    height: '14px',
    color: colors.greyScale.common,
    verticalAlign: 'middle',
    transition: 'transform .5s ease',
  },
});

const Registration = () => {
  const classes = styles();

  return (
    <Container className={classes.container}>
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Grid item className={classes.itemContainer}>
          <img src={RegisterIllustration} alt={'Register-illustration'} className={classes.illustration}/>
        </Grid>
        <Grid item className={classes.itemContainer}>
          <Box style={{width: '80%', margin: '0 auto'}}>
            <div className={classes.screenTitleWrapper}>
              <Typography variant={'h1'} className={classes.screenTitle}>Welcome to Arbor</Typography>
              <div className={classes.line}/>
            </div>
            <div className={classes.subtitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.subtitle}>To start off, you need to install MetaMask
                — a browser extension that allows you to hold Ether and tokens as well as create and manage your
                organization profile on Arbor. </Typography>
            </div>
            <div className={classes.buttonWrapper}>
              <a href={'https://metamask.io/download.html'} target={'_blank'} className={classes.redirectLink}>
                <Button className={classes.button} onClick={() => history.push({pathname: '/authorization/signin', state: { installed: true }})}>
                  <Typography variant={'caption'} className={classes.buttonLabel}>Install MetaMask</Typography>
                </Button>
              </a>
            </div>
            <div className={classes.linkWrapper}>
              <a
                href="https://metamask.io/" target="_blank" rel="noopener noreferrer"
                className={classes.link}
              >
                More about MetaMask <ArrowForward className={classes.linkIcon}/>
              </a>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Registration;
