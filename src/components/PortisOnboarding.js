import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Typography
} from '@material-ui/core';
import {
  openPortis,
  selectSignInStatus
} from '../ducks/signIn';

const OnboardingButton = (props) => {
  const {
    className,
    buttonLabel,
    loggedIn,
    openPortis
  } = props;

  const onClick = () => {
    openPortis();
  };

  return (
    <Button className={className} onClick={onClick}>
      <Typography className={buttonLabel}>
        {loggedIn ? 'Show Portis Wallet' : 'Connect Portis'}
      </Typography>
    </Button>
  );
};

const mapStoreToProps = store => ({
  loggedIn: selectSignInStatus(store)
});

const mapDispatchToProps = {
  openPortis
};

export default connect(mapStoreToProps, mapDispatchToProps)(OnboardingButton);
