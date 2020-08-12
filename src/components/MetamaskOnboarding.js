import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { fetchSignInRequest } from '../ducks/signIn';

const ONBOARD_TEXT = 'Install MetaMask';
const CONNECT_TEXT = 'Connect MetaMask';
// const CONNECTED_TEXT = 'Connected to MetaMask';

const OnboardingButton = ({ className, buttonLabel, fetchSignInRequest }) => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
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

  return (
    <Button className={className} onClick={onClick}>
      <Typography variant={'caption'} className={buttonLabel}>
          {buttonText}
      </Typography>
    </Button>
  );
}

const mapDispatchToProps = {
  fetchSignInRequest
};

export default connect(null, mapDispatchToProps)(OnboardingButton);
