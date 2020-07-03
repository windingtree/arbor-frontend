import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import history from '../../redux/history';
import {connect} from 'react-redux';
import { fetchSignInRequest } from '../../ducks/signIn';
import {Container, Grid, Typography, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {MAINTENANCE, CHAIN_ID} from "../../utils/constants";
import {getWeb3, onChainChanged} from "../../web3/w3"

import LoginIllustration from '../../assets/SvgComponents/login-illustration.svg';

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
    marginTop: '68px'
  },
  button: {
    backgroundImage: colors.gradients.green,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.secondary.cyan}`,
    borderRadius: '6px',
    cursor: 'pointer'
  },
  buttonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.primary.white,
    textTransform: 'none',
    padding: '10px 20px'
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
const ChainMistmatchInfo = (props) => {
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
        Winding Tree Marketplace requires a connection to the <b>{chainName(CHAIN_ID)}</b>, 
        but you are connected to the <b>{chainName(props.chainId)}</b>.
        Please change the Network in your Wallet.
      </Typography>
    </div>
  );
};


// A Box for the Sign-in Action
const SignInActionBox = (classes, props) => {
  // Define the chain ID state
  const [chainId, setChainId] = useState(0);
  const [currentWeb3, setWeb3] = useState(getWeb3());

  // Callback when the chain changes
  const handleChainChange = (newChainId) => {
    setChainId(newChainId);
  };

  // Register to Web3 provider chain change events
  onChainChanged(handleChainChange);

  // Update the Chain ID
  useEffect(() => {
    const web3 = getWeb3();
    if (web3 && web3.eth) {
      setWeb3(web3);
      getWeb3().eth.getChainId()
      .then(handleChainChange);
    }
  }, [chainId]);

  // Check if we should disable login
  let chainMistmatch = (chainId !== 0 && chainId !== Number(CHAIN_ID));
  // let loginDisabled = (chainId === 0 || chainMistmatch);

  return (
    <Box style={{width: '80%', margin: '0 auto'}}>
      <div className={classes.screenTitleWrapper}>
        <Typography variant={'h1'} className={classes.screenTitle}>Step in</Typography>
          <div className={classes.line}/>
      </div>
      <div className={classes.subtitleWrapper}>
        <Typography variant={'subtitle2'} className={classes.subtitle}>
          MetaMask is a browser extension that allows you to hold Ether and tokens as well as create and manage your organization profile on Winding Tree Marketplace.
        </Typography>
      </div>
      { chainMistmatch ? <ChainMistmatchInfo classes={classes} chainId={chainId}/> : null}
      <div className={classes.buttonWrapper}>
        <Button onClick={props.fetchSignInRequest} className={classes.button} disabled={chainMistmatch}>
          <Typography variant={'caption'} className={classes.buttonLabel}>Sign in{ currentWeb3 && currentWeb3.currentProvider.isMetaMask ? ' with Metamask': '' }</Typography>
        </Button>
      </div>
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

const SignIn = (props) => {
  const classes = styles();
  const [isUploaded, setUploaded] = useState(false);
  const isInstalled = _.get(history, 'location.state.installed', false);

  useEffect(() => {
    if(isInstalled) {
      setTimeout(() => setUploaded(true), 2000);
      if(isUploaded) {
        alert('If you have already installed MetaMask - please,  reload this page')
      }
    }
  });

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

const mapDispatchToProps = {
  fetchSignInRequest
};

export default connect(null, mapDispatchToProps)(SignIn);