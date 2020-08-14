import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchSignInRequest, selectSignInStatus } from '../ducks/signIn';

import metamaskIcon from '../assets/images/metamask.png';

const ONBOARD_TEXT = 'Install MetaMask';
const CONNECT_TEXT = 'Connect MetaMask';

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
    border: '1px solid #F6851B',
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
  const { fetchSignInRequest, loggedIn } = props;
  const classes = styles();
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [loginStarted, setLoginStart] = useState(false);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setButtonText(CONNECT_TEXT);
    } else {
      setButtonText(ONBOARD_TEXT);
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setLoginStart(true);

      const connectMethod = window.ethereum.request
        ? window.ethereum.request({ method: 'eth_requestAccounts' })
        : window.ethereum.enable();

      connectMethod
        .then(accounts => {
          // Ethereum user detected
          let web3;

          if (typeof window.ethereum !== 'undefined') {
            window.ethereum.autoRefreshOnNetworkChange = false;
            web3 = new Web3(window.ethereum);
            console.log('Ethereum provider detected.');
          }

          // Check for injected web3 (old browsers or extensions)
          else if (typeof window.web3 !== 'undefined') {
            web3 = window.web3;
            console.log('Injected web3 detected.');
          }

          fetchSignInRequest({
            address: accounts[0],
            web3,
            provider: 'metamask'
          });
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const isMetamaskConnecting = !loggedIn && loginStarted;

  return (
    <>
      <Button className={classes.walletButton} onClick={onClick}>
        <img src={metamaskIcon} alt='MetaMask Wallet' />
        <Typography variant={'caption'} className={classes.buttonLabel}>
            {buttonText}
        </Typography>
      </Button>
      {isMetamaskConnecting &&
        <CircularProgress size='30px' className={classes.walletSpinner} />
      }
    </>
  );
}

const mapStateToProps = state => ({
  loggedIn: selectSignInStatus(state)
});

const mapDispatchToProps = {
  fetchSignInRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingButton);
