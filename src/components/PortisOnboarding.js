import React, { useEffect, useState } from 'react';
import {
  connect
} from 'react-redux';
import Portis from '@portis/web3';
import Web3 from 'web3';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import {
  fetchSignInRequest,
  accountChangeRequest,
  logOutRequest
} from '../ducks/signIn';

import {
  PORTIS_ID,
  PORTIS_DEFAULT_NETWORK
} from '../utils/constants';

const portis = new Portis(PORTIS_ID, PORTIS_DEFAULT_NETWORK);
const web3 = new Web3(portis.provider);

const OnboardingButton = (props) => {
  const {
    className,
    buttonLabel,
    fetchSignInRequest,
    accountChangeRequest,
    logOutRequest
  } = props;
  const [errorMessage, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    portis.onError(error => setError(error.message || 'Unknown Portis error'));
    portis.onLogin(address => {
      fetchSignInRequest({
        web3,
        address
      });
      setLoggedIn(true);
    });
    portis.onLogout(() => {
      logOutRequest();
      setLoggedIn(false);
    });
    portis.onActiveWalletChanged(address => accountChangeRequest(address));
  });

  const onClick = () => {
    portis.showPortis();
  };

  return (
    <Grid container>
      <Grid item>
        <Button className={className} onClick={onClick}>
          <Typography className={buttonLabel}>
            {isLoggedIn ? 'Show Portis Wallet' : 'Connect Portis'}
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        {errorMessage &&
          <Typography>
            {errorMessage}
          </Typography>
        }
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  fetchSignInRequest,
  accountChangeRequest,
  logOutRequest
};

export default connect(null, mapDispatchToProps)(OnboardingButton);
