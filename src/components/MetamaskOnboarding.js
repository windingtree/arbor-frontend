import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { fetchSignInRequest } from '../ducks/signIn';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

const OnboardingButton = ({ className, buttonLabel, fetchSignInRequest }) => {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
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
    } else {
      window.ethereum.enable().then(handleNewAccounts);
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
      <>
        {accounts.length > 0 &&
            <button className={className} onClick={() => fetchSignInRequest(accounts)}>
                <Typography variant={'caption'} className={buttonLabel}>
                    Sign In
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
