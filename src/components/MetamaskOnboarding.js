import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { fetchSignInRequest } from '../ducks/signIn';

const ONBOARD_TEXT = 'Install MetaMask';
const CONNECT_TEXT = 'Connect MetaMask';
const CONNECTED_TEXT = 'Connected to MetaMask';

const OnboardingButton = ({ className, buttonLabel, fetchSignInRequest }) => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    const handleNewAccounts = newAccounts => {
      setAccounts(newAccounts);
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum.request) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    } else if (window.ethereum) {
      window.ethereum.enable().then(handleNewAccounts);
    }
  }, []);

  const onConnect = () => {
    // Ethereum user detected
    let web3;

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.autoRefreshOnNetworkChange = false;
      web3 = new Web3(window.ethereum);
      console.log('Ethereum provider detected.');
    }

    // Given Provider (eg: Mist)
    else if(Web3.givenProvider) {
      web3 = new Web3(Web3.givenProvider);
      console.log('Given provider detected.');
    }

    // Check for injected web3 (old browsers or extensions)
    else if (typeof window.web3 !== undefined) {
      web3 = window.web3;
      console.log('Injected web3 detected.');
    }

    fetchSignInRequest({
      address: accounts[0],
      web3
    })
  };

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(newAccounts => {
          setAccounts(newAccounts);
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
      <>
        {accounts.length > 0 &&
          <button className={className} onClick={onConnect}>
            <Typography variant={'caption'} className={buttonLabel}>
                {CONNECT_TEXT}
            </Typography>
          </button>
        }
        {(!accounts || accounts.length === 0) &&
          <button className={className} disabled={isDisabled} onClick={onClick}>
            <Typography variant={'caption'} className={buttonLabel}>
                {buttonText}
            </Typography>
          </button>
        }
      </>
  );
}

const mapDispatchToProps = {
  fetchSignInRequest
};

export default connect(null, mapDispatchToProps)(OnboardingButton);
