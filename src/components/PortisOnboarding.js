import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  openPortis,
  selectSignInStatus
} from '../ducks/signIn';

import portisIcon from '../assets/images/portis.png';

const styles = makeStyles({
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2E2E31',
    textTransform: 'none'
  },
  walletButton: {
    width: '308px',
    height: '72px',
    border: '1px solid #6CB3DB',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginBottom: '20px',
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
      width: '256px',
    }
  },
  walletButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    color: '#2E2E31'
  },
  walletSpinner: {
    marginLeft: '10px',
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
      position: 'absolute',
      marginLeft: '-45%',
      marginTop: '20px'
    }
  }
});

const OnboardingButton = props => {
  const {
    disabled,
    loggedIn,
    openPortis
  } = props;
  const classes = styles();
  const [portisStarted, setPortisStart] = useState(false);

  const onClick = () => {
    setPortisStart(true);
    openPortis();
  };

  const isPortisConnecting = !loggedIn && portisStarted;

  return (
    <>
      <Button className={classes.walletButton} onClick={onClick} disabled={disabled}>
        <img src={portisIcon} alt='Portis Wallet' />
        <Typography className={classes.buttonLabel}>
          {loggedIn ? 'Show Portis Wallet' : 'Connect Portis'}
        </Typography>
      </Button>
      {isPortisConnecting &&
        <CircularProgress size='30px' className={classes.walletSpinner} />
      }
    </>
  );
};

const mapStoreToProps = store => ({
  loggedIn: selectSignInStatus(store)
});

const mapDispatchToProps = {
  openPortis
};

export default connect(mapStoreToProps, mapDispatchToProps)(OnboardingButton);
