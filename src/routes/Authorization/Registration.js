import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import RegisterIllustration from '../../assets/SvgComponents/registration-illustration.svg';
import ButtonCommon from '../../components/Button';

import colors from '../../styles/colors';

const styles = makeStyles({
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
    fontFamily: 'Inter',
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
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  buttonWrapper: {
    marginTop: '70px'
  },
  button: {
    backgroundImage: 'linear-gradient(35.28deg, #EC6F95 0%, #FCB871 100%)',
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px'
  },
  buttonLabel: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.2,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px'
  },
  linkWrapper: {
    marginTop: '80px'
  },
  link: {
    fontFamily: 'Inter',
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

const  Registration = ({props}) => {
  const classes = styles();

  return (
    <Container>
      <Grid container justify={'space-between'} alignItems={'center'}>
        <Grid item className={classes.itemContainer}>
          <img src={RegisterIllustration} alt={'Register-illustration'} className={classes.illustration}/>
        </Grid>
        <Grid item className={classes.itemContainer}>
          <Box>
            <div className={classes.screenTitleWrapper}>
              <Typography variant={'h1'} className={classes.screenTitle}>Welcome to Arbor</Typography>
              <div className={classes.line}/>
            </div>
            <div className={classes.subtitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.subtitle}>To start off, register with MetaMask - a browser extension that lets you create and manage your company profile in Arbor database.</Typography>
            </div>
            <div className={classes.buttonWrapper}>
              <ButtonCommon onClick={() => console.log('metamask')} className={classes.button}>
                <Typography variant={'caption'} className={classes.buttonLabel}>Register with MetaMask</Typography>
              </ButtonCommon>
            </div>
            <div className={classes.linkWrapper}>
              <Link
                to={'/'}
                className={classes.link}
              >
                More about MetaMask <ArrowForward className={classes.linkIcon}/>
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Registration;