import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { Button, Typography, Grid, CircularProgress } from '@material-ui/core';

import {
  selectWizardOrgidJson,
  selectWizardOrgidHash,
  selectWizardOrgidUri,
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
  selectPendingState,
  selectError
} from '../ducks/wizard';
import {
  selectSignInAddress,
  selectWeb3
} from '../ducks/signIn';
import {
  getBalance,
  estimateGas,
  ApiGetGasPrice,
  signTransaction
} from '../ducks/utils/ethereum';
import {
  fetchPrice
} from '../ducks/utils/coingecko';
import { styles } from './WizardStep';

// Component for a Wizard Step
const WizardStep = (props) => {
  // Gather context
  const inheritClasses = styles();
  const {
    index, orgidJson, orgidHash, orgidUri, address, parent, solt, web3,
    data: { longName, description, cta },
    action, stepTitle = true,
    sendChangeOrgidUriAndHashRequest,
    sendCreateLegalEntityRequest,
    sendCreateOrganizationalUnitRequest,
    pendingTransaction,
    error
  } = props;
  const [started, setStarted] = useState(false);
  const [isBalanceFetching, setBalanceFetching] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);

  const getOptions = useCallback(() => {
    const hash = web3.utils.soliditySha3(JSON.stringify(orgidJson, null, 2));
    const orgidId = orgidJson.id.replace('did:orgid:', '');
    let method;
    let args;
    if (action === 'edit') {
      method = 'setOrgJson';
      args = [
        orgidId,
        hash,
        orgidUri,
        '',
        ''
      ];
    } else if(typeof orgidJson.legalEntity === 'object') {
      method = 'createOrganization';
      args = [
        solt,
        hash,
        orgidUri,
        '',
        ''
      ];
    } else if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      method = 'createUnit';
      args = [
        solt,
        parent.orgid,
        address,
        hash,
        orgidUri,
        '',
        ''
      ];
    }

    return {
      method,
      args
    };
  }, [web3, address, action, orgidUri, solt, orgidJson, parent]);

  const checkBalance = useCallback(async () => {
    try {
      if (web3 && address && orgidUri) {
        setBalanceFetching(true);
        const balance = await getBalance(web3, address);
        const { method, args } = getOptions();
        if (method) {
          const gas = await estimateGas(web3, address, method, args);
          const gasPrice = await ApiGetGasPrice(web3);
          const gasCost = gas.mul(web3.utils.toBN(gasPrice));

          if (gasCost.gt(balance)) {
            const priceResult = await fetchPrice('ethereum', 'usd');
            const price = await priceResult.json();
            const gasCostEther = web3.utils.fromWei(gasCost, 'ether');
            const gasUsd = (Number(gasCostEther) * price.ethereum.usd * 1.1).toFixed(2);
            console.log('Gas (USD):', gasUsd);
            setInsufficientBalance(`${gasCostEther}:${gasUsd}`);
          }
        } else {
          throw new Error('Unknown transaction method');
        }
      }
    } catch (error) {
      setInsufficientBalance(false);
      console.log(error);
    }
    setBalanceFetching(false);
  }, [web3, address, orgidUri, getOptions]);

  useEffect(() => {
    checkBalance();
  }, [checkBalance]);

  useEffect(() => {
    if (error) {
      setStarted(false);
    }
  }, [error]);

  const sendSignedTransaction = async () => {
    try {
      const { method, args } = getOptions();
      const tx = await signTransaction(
        web3,
        address,
        '5000000',
        method,
        args//,
        //true // personal_sign method
      );
      console.log('>>>', tx);
    } catch (error) {}
  };

  // Define the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStarted(true);

    if (action === 'edit') {
      sendChangeOrgidUriAndHashRequest({orgidUri, orgidHash, address, orgidJson});
    } else if(typeof orgidJson.legalEntity === 'object') {
      sendCreateLegalEntityRequest({orgidJson, orgidHash, orgidUri, address, solt});
    } else if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      sendCreateOrganizationalUnitRequest({orgidJson, orgidHash, orgidUri, address, parent, solt});
    } else {
      setStarted(false);
      console.error('Something going wrong with request', {orgidJson, orgidHash, orgidUri, address, solt, parent});
      console.log(typeof orgidJson.legalEntity, typeof orgidJson.organizationalUnit, parent.orgid);
    }
  };

  const gasFee = insufficientBalance ? insufficientBalance.split(':') : [0, 0];

  // The Wizard Step React component
  return (
    <form onSubmit={handleSubmit}>
      {isBalanceFetching &&
        <>
          <Typography variant={'h3'} className={inheritClasses.stepTitle}>
            Fetching your wallet balance
          </Typography>
          <div className={inheritClasses.subtitleWrapper}>
            <CircularProgress width="40" />
          </div>
        </>
      }
      {!isBalanceFetching &&
        <div key={index}>
          {insufficientBalance &&
            <>
              <Typography variant={'h3'} className={inheritClasses.stepTitle}>
                Insufficient ETH balance
              </Typography>
              <div className={inheritClasses.subtitleWrapper}>
                <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
                  In order to save your company data, a blockchain transaction is required. Creation of transaction costs about {gasFee[0]} ETH (${gasFee[1]}).
                </Typography>
                <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
                  Please, top up your wallet with required amount of ETH or pay gas fee with a credit card.
                </Typography>
              </div>
              <div className={inheritClasses.buttonWrapper}>
                <Grid container alignItems="center">
                  <Grid item style={{marginRight: '20px'}}>
                    <Button
                      className={inheritClasses.buttonRefresh}
                      onClick={checkBalance}
                    >
                      <Typography
                        variant={'caption'}
                        className={inheritClasses.buttonLabel}
                      >
                        Refresh balance
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={inheritClasses.button}
                      onClick={sendSignedTransaction}
                    >
                      <Typography
                        variant={'caption'}
                        className={inheritClasses.buttonLabel}
                      >
                        Pay for gas by CC
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </>
          }
          {!insufficientBalance &&
            <>
              <Typography variant={'h3'} className={inheritClasses.stepTitle}>
                {stepTitle && `Step ${index+1}. `}
                {action === 'edit' ? 'Saving to blockchain...' : longName}
              </Typography>
              <div className={inheritClasses.subtitleWrapper}>
                <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
                  { action === 'edit' ? 'In order to save your company data, a blockchain transaction is required. Please confirm it in your wallet.' : description}
                </Typography>
              </div>
              <div className={inheritClasses.buttonWrapper}>
                <Button
                  type="submit"
                  className={inheritClasses.button}
                  disabled={pendingTransaction || started}
                >
                  <Typography
                    variant={'caption'}
                    className={inheritClasses.buttonLabel}
                  >
                    {action === 'edit' ? 'Generate Transaction' : cta}
                  </Typography>
                </Button>
              </div>
            </>
          }
          {error &&
            <div className={inheritClasses.errorWrapper}>
              <Typography className={inheritClasses.error}>
                {error.message ? error.message : 'Unknown error'}
              </Typography>
            </div>
          }
        </div>
      }
    </form>
  )
};

const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state),
    orgidHash: selectWizardOrgidHash(state),
    orgidUri: selectWizardOrgidUri(state),
    address: selectSignInAddress(state),
    web3: selectWeb3(state),
    pendingTransaction: selectPendingState(state),
    error: selectError(state)
  }
};

const mapDispatchToProps = {
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
