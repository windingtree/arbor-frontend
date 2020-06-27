import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';

import { getWeb3 } from '../web3/w3';
import history from '../redux/history';
import colors from '../styles/colors';

export const styles = makeStyles(theme => ({
  mainContainer: {
    padding: '100px 0'
  },
  pageTitle: {
    fontSize: '40px',
    lineHeight: '52px',
    fontWeight: 500,
    paddingBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
      lineHeight: '44px',
    }
  },
  devider: {
    width: '100px',
    height: '2px',
    background: colors.secondary.peach,
    position: 'absolute',
    borderRadius: '2px'
  },
  infoContainer: {
    padding: '40px 0 60px',
    lineHeight: '28px'
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

const EmailSent = props => {
  const classes = styles();
  const userEmail = sessionStorage.getItem('email');

  const handleSignInRedirect = () => {
    let w3 = getWeb3();
    if(w3 !== undefined) {
      history.push('/authorization/signin');
    }
    else {
      history.push('/authorization/register')
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Container className={classes.mainContent}>
        <Typography variant={'h2'} className={classes.pageTitle}>Email Sent</Typography>
        <div className={classes.devider} />
        <div className={classes.infoContainer}>
          <Typography>
            The organization has been created and we’ve sent you an email to 
            <span className={classes.email}>{' '}{userEmail}</span>
          </Typography>
          <Typography>Further instructions are there. You would need a computer to continue</Typography>
        </div>
        <Button className={classes.button} onClick={handleSignInRedirect}>
          Go to My Organizations
        </Button>
      </Container>
    </div>
  );
}

export default EmailSent;
