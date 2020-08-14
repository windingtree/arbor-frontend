import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Grid, Tooltip, Typography, ClickAwayListener } from '@material-ui/core';
import {
  openPortis,
  selectProvider,
  selectSignInAddress,
  selectSignInStatus
} from '../../ducks/signIn';
import { strCenterEllipsis, copyStrToClipboard } from '../../utils/helpers';

import colors from '../../styles/colors';
import metamaskIcon from '../../assets/images/metamask.png';
import portisIcon from '../../assets/images/portis.png';

const LightTooltip = withStyles({
  tooltip: {
    maxWidth: '240px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.secondary.cyan,
    fontSize: '12px',
    fontWeight: 400,
    padding: '10px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap'
  }
})(Tooltip);

const styles = makeStyles({
  wrapper: {
    marginRight: '30px',
    width: '140px'
  },
  addressLabel: {
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#2E2E31',
    paddingTop: '3px'
  },
  addressIcon: {
    cursor: 'pointer'
  }
});

const WalletIcon = ({ className, provider }) => {
  let component;

  switch (provider) {
    case 'metamask':
      component = (
        <img className={className} src={metamaskIcon} height='24' alt={provider} />
      );
      break;
    case 'portis':
      component = (
        <img className={className} src={portisIcon} height='24' alt={provider} />
      );
      break;
    default:
      component = null;
  }

  return component;
};

const Address = props => {
  const {
    provider,
    address,
    loggedIn,
    openPortis
  } = props;
  const classes = styles();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onIconClick = () => {
    if (provider === 'portis') {
      openPortis();
    }
  };

  const onAddressClick = () => {
    copyStrToClipboard(address);
    setTooltipOpen(true);
    setTimeout(() => setTooltipOpen(false), 3000);

    if (provider === 'portis') {
      openPortis();
    }
  };

  if (!loggedIn || !address) {
    return null;
  }

  return (
    <Grid container className={classes.wrapper}>
      <Grid item onClick={onIconClick}>
        <WalletIcon
          className={classes.addressIcon}
          provider={provider}
        />
      </Grid>
      <Grid item>
        <ClickAwayListener
          onClickAway={() => setTooltipOpen(false)}
        >
          <LightTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => setTooltipOpen(false)}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={'Copied to clipboard'}
            placement={'top-start'}
          >
            <Typography
              className={classes.addressLabel}
              onClick={onAddressClick}
            >
              {strCenterEllipsis(address.split('x')[1])}
            </Typography>
          </LightTooltip>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
};

const mapStoreToProps = store => ({
  address: selectSignInAddress(store),
  loggedIn: selectSignInStatus(store),
  provider: selectProvider(store)
});

const mapDispatchToProps = {
  openPortis
};

export default connect(mapStoreToProps, mapDispatchToProps)(Address);
