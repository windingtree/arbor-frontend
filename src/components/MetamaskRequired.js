import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';

import history from '../redux/history';
import colors from '../styles/colors';
import LoginIllustration from '../assets/SvgComponents/login-illustration.svg';

export const styles = makeStyles(theme => ({
  mainContainer: {
    padding: '30px 0 70px 0'
  },
  illustration: {
    width: '100%',
    height: '100%',
    marginBottom: '30px',
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
        width: '80%',
        height: 'auto',
      }
  },
  pageTitle: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '44px',
    color: '#42424F'
  },
  devider: {
    width: '100px',
    height: '2px',
    background: colors.secondary.peach,
    position: 'absolute',
    borderRadius: '2px'
  },
  infoContainer: {
    padding: '40px 0 60px 0'
  },
  email: {
    color: colors.secondary.peach
  },
  button: {
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    padding: '10px 29px',
    backgroundImage: colors.gradients.orange,
    color: colors.primary.white,
    textTransform: 'capitalize'
  }
}));

const MetamaskRequired = props => {
  const classes = styles();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleHomeRedirect = () => {
    history.push(`/`);
  };

  return (
    <div className={classes.mainContainer}>
      <Container className={classes.mainContent}>
        <img src={LoginIllustration} alt={'Login illustration'} className={classes.illustration}/>
        <Typography variant={'h2'} className={classes.pageTitle}>Metamask required</Typography>
        <div className={classes.infoContainer}>
          <Typography>
            in order to proceed with creating the ORGiD you have to have desktop browser with installed metamask extention
          </Typography>
        </div>
        <Button className={classes.button} onClick={handleHomeRedirect}>
            To Winding Tree Home
        </Button>
      </Container>
    </div>
  );
}

export default MetamaskRequired;
