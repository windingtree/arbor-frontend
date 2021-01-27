import React, { useState, useEffect } from 'react';
// import _ from 'lodash';
// import history from '../../redux/history';
import { connect } from 'react-redux';
import { Container, Grid, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MAINTENANCE, CHAIN_ID } from "../../utils/constants";
import {
  selectWeb3
} from '../../ducks/signIn';

import MetamaskOnboarding from '../../components/MetamaskOnboarding';
import PortisOnboarding from '../../components/PortisOnboarding';

import LoginIllustration from '../../assets/SvgComponents/connectWallet.svg';
import colors from '../../styles/colors';

const styles = makeStyles({
  container: {
    position: 'relative',
    padding: '74px 0 60px 0',
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
      padding: '30px 0 60px 0',
    }
  },
  mainContent: {
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column'
    }
  },
  itemContainer: {
    width: '50%',
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    }
  },
  illustration: {
    width: '100%',
    height: '100%',
    ['@media (max-width: 540px)']: { // eslint-disable-line no-useless-computed-key
      width: '80%',
      height: 'auto',
      marginBottom: '30px',
    }
  },
  screenTitleWrapper: {
    position: 'relative',
    paddingBottom: '20px'
  },
  screenTitle: {
    fontSize: '40px',
    fontWeight: 500,
    color: colors.primary.black
  },
  line: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '16%',
    height: '2px',
    background: colors.primary.accent
  },
  subtitleWrapper: {
    paddingTop: '20px'
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  danger: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.primary.accent
  },
  buttonWrapper: {
    marginTop: '50px'
  },
  button: {
    backgroundImage: colors.gradients.green,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.secondary.cyan}`,
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '10px 20px'
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.primary.white,
    textTransform: 'none'
  },
  walletSpinner: {
    marginLeft: '10px'
  }
});

// A Maintenance box to show during maintenance
const MaintenanceBox = (classes) => {
  return (
    <Box style={{width: '80%', margin: '0 auto'}}>
    <div className={classes.screenTitleWrapper}>
      <Typography variant={'h1'} className={classes.screenTitle}>{MAINTENANCE.title}</Typography>
        <div className={classes.line}/>
    </div>
    <div className={classes.subtitleWrapper}>
      <Typography variant={'subtitle2'} className={classes.subtitle}>{MAINTENANCE.text}</Typography>
    </div>
    <div className={classes.buttonWrapper}>
      <Button onClick={() => window.open(MAINTENANCE.link, '_blank').focus()} className={classes.button}>
        <Typography variant={'caption'} className={classes.buttonLabel}>{MAINTENANCE.button}</Typography>
      </Button>
    </div>
  </Box>
  );
}

// A Warning displayed when chain mistmatches
const ChainMismatchInfo = (props) => {
  let chains = {
    1: 'Ethereum Mainnet',
    2: 'Morden Test network',
    3: 'Ropsten Test Network',
    4: 'Rinkeby Test Network',
    5: 'Goerli Test Network',
    42: 'Kovan Test Network'
  };

  const chainName = (chainId) => {
    if(chainId in chains) {
      return chains[chainId];
    }
    return `Chain #${chainId}`;
  };

  return(
    <div className={props.classes.subtitleWrapper}>
      <Typography variant={'subtitle2'} className={props.classes.danger}>
        This is a test environment that requires you to be connected to  <strong>{chainName(CHAIN_ID)}</strong> instead of <strong>{chainName(props.chainId)}</strong>. Please change the network in your wallet.
      </Typography>
    </div>
  );
};

// A Box for the Sign-in Action
const SignInActionBox = (classes, props) => {
  // Define the chain ID state
  const [chainId, setChainId] = useState(0);

  // Update the Chain ID
  useEffect(() => {
    const onChainChange = chainId => {
      setChainId(parseInt(chainId, 16));
    };

    const handleChainId = async () => {
      if (window.ethereum) {
        onChainChange(window.ethereum.chainId);
        window.ethereum.once('chainChanged', onChainChange);
      }
    };

    try {
      handleChainId();
    } catch (error) {
      console.log(error);
    }
  }, [chainId]);

  // Check if we should disable login
  const chainMismatch = (chainId !== 0 && chainId !== Number(CHAIN_ID));

  return (
    <Box style={{width: '80%', margin: '0 auto'}}>
      <div className={classes.screenTitleWrapper}>
        <Typography variant={'h1'} className={classes.screenTitle}>Connect your&nbsp;wallet</Typography>
          <div className={classes.line}/>
      </div>
      <div className={classes.subtitleWrapper}>
        <Typography variant={'subtitle2'} className={classes.subtitle}>
         You need to have an Ethereum wallet to sign in
        </Typography>
      </div>
      {chainMismatch
        ? <ChainMismatchInfo classes={classes} chainId={chainId}/>
        : <Grid container className={classes.buttonWrapper} alignItems='flex-start' direction='column'>
            <Grid item>
              <MetamaskOnboarding className={classes.walletButton} buttonLabel={classes.walletButtonLabel} disabled={chainMismatch} />
            </Grid>
            <Grid item>
              <PortisOnboarding className={`${classes.walletButton} ${classes.portisButton}`} buttonLabel={classes.walletButtonLabel} disabled={chainMismatch} />
            </Grid>
          </Grid>
      }
    </Box>
  );
};

const SignInBox = (classes, props) => {
  // A maintenance action is ongoing
  if(MAINTENANCE && MAINTENANCE.active) {
    return MaintenanceBox(classes);
  }

  // No maintenance
  else {
    return SignInActionBox(classes, props);
  }
}

const SignIn = props => {
  const classes = styles();
  // const [isUploaded, setUploaded] = useState(false);
  // const isInstalled = _.get(history, 'location.state.installed', false);

  // useEffect(() => {
  //   if(isInstalled) {
  //     setTimeout(() => setUploaded(true), 2000);
  //     if(isUploaded) {
  //       alert('Reload page after you have MetaMask installed')
  //     }
  //   }
  // });

  return (
    <Container className={classes.container}>
      <Grid container justify={'space-between'} className={classes.mainContent}>
        <Grid item className={classes.itemContainer}>
          <img src={LoginIllustration} alt={'Login illustration'} className={classes.illustration}/>
        </Grid>
        <Grid item className={classes.itemContainer}>
          { SignInBox(classes, props) }
        </Grid>
      </Grid>
    </Container>
)
};

const mapStateToProps = state => ({
  web3: selectWeb3(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
