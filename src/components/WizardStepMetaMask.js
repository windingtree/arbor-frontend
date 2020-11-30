import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { Button, Typography, Grid, CircularProgress } from '@material-ui/core';
import CheckoutForm from './CheckoutForm';

import {
  PORTIS_DEFAULT_NETWORK
} from '../utils/constants';
import {
  selectWizardOrgidJson,
  selectWizardOrgidHash,
  selectWizardOrgidUri,
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
  selectPendingState,
  selectError,
  ApiGetTxStatus
} from '../ducks/wizard';
import {
  selectSignInAddress,
  selectWeb3
} from '../ducks/signIn';
import {
  getBalance
} from '../ducks/utils/ethereum';
import {
  estimateGas,
  getPaymentIntentStatus
} from '../ducks/utils/stripe';
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
    error: wizardError
  } = props;
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const [isBalanceFetching, setBalanceFetching] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [estimation, setEstimation] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [depositTransaction, setDepositTransaction] = useState(false);

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
      if (web3 && address && orgidUri && !isBalanceFetching && !started) {
        setBalanceFetching(true);
        setEstimation(null);
        const { method, args } = getOptions();
        if (method) {
          const balance = await getBalance(web3, address);
          const estimationResult = await estimateGas(address, method, args);
          setEstimation(estimationResult);
          const gasCost = web3.utils.toBN(estimationResult.value);
          const gasCostEther = web3.utils.fromWei(estimationResult.value, 'ether');

          if (gasCost.gt(balance)) {
            console.log('Gas (USD):', estimationResult.amount);
            setInsufficientBalance(`${gasCostEther}:${estimationResult.amount}`);
          }
        } else {
          throw new Error('Unknown transaction method');
        }
      }
    } catch (error) {
      setInsufficientBalance(false);
      setEstimation(null);
      console.log(error);
    }
    setBalanceFetching(false);
  }, [web3, address, orgidUri, getOptions]);

  useEffect(() => {
    setError(null);
    checkBalance();
  }, [checkBalance]);

  useEffect(() => {
    if (error) {
      setStarted(false);
    }
  }, [error]);

  useEffect(() => {
    if (wizardError) {
      setError(wizardError);
      setStarted(false);
    }
  }, [wizardError]);

  const onStartPayment = async () => {
    try {
      setPaymentOptions({
        estimationId: estimation.id
      });

    } catch (error) {
      setPaymentOptions(null);
      setError(error.message);
      console.log(error);
    }
  };

  const onPaymentFailure = payload => {
    // handle payment failure
  };

  const watchTransaction = async txHash => {
    setError(null);

    try {
      await ApiGetTxStatus(web3, txHash);
      setDepositTransaction(null);
      setInsufficientBalance(false);
      setShowPaymentSuccess(false);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const onPaymentSuccess = async ({ paymentIntent }) => {
    setError(null);
    setPaymentOptions(null);
    setDepositTransaction(null);
    setShowPaymentSuccess(true);

    try {
      let paymentStatus;
      let count = 0;

      do {
        paymentStatus = await getPaymentIntentStatus(paymentIntent.id);

        if (!paymentStatus || !paymentStatus.transactionHash) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        count++;
      } while (!paymentStatus.transactionHash && count <= 100);

      if (!paymentStatus || !paymentStatus.transactionHash) {
        throw new Error(
          'Something goes wrong. Cannot get your payment information'
        );
      }

      setDepositTransaction(paymentStatus.transactionHash);
      watchTransaction(paymentStatus.transactionHash);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  // Define the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStarted(true);
    let gasPrice;

    if (estimation) {
      gasPrice = estimation.gasPrice;
    }

    if (action === 'edit') {
      sendChangeOrgidUriAndHashRequest({orgidUri, orgidHash, address, orgidJson, gasPrice});
    } else if(typeof orgidJson.legalEntity === 'object') {
      sendCreateLegalEntityRequest({orgidJson, orgidHash, orgidUri, address, solt, gasPrice});
    } else if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      sendCreateOrganizationalUnitRequest({orgidJson, orgidHash, orgidUri, address, parent, solt, gasPrice});
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
      {(isBalanceFetching && !showPaymentSuccess) &&
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
          {(insufficientBalance && !paymentOptions && !showPaymentSuccess) &&
            <>
              <Typography variant={'h3'} className={inheritClasses.stepTitle}>
                Insufficient Balance
              </Typography>
              <div className={inheritClasses.subtitleWrapper}>
                <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
                A transaction must be submitted to the Ethereum blockchain in order to register your company information. The cost of this action is estimated to {gasFee[0]} ETH (${gasFee[1]}).
                </Typography>
                <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
                Please, top up your wallet with enough ETH or pay the transaction fee with your Payment Card.
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
                        Refresh Balance
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={inheritClasses.button}
                      onClick={onStartPayment}
                    >
                      <Typography
                        variant={'caption'}
                        className={inheritClasses.buttonLabel}
                      >
                        Use Payment Card
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </>
          }
          {(insufficientBalance && paymentOptions) &&
            <CheckoutForm
              options={paymentOptions}
              onPaymentFailure={onPaymentFailure}
              onPaymentSuccess={onPaymentSuccess}
            />
          }
          {(!insufficientBalance && !showPaymentSuccess) &&
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
          {showPaymentSuccess &&
            <>
              <Typography variant={'h3'} className={inheritClasses.stepTitle}>
                Balance Deposit
              </Typography>
              <div className={inheritClasses.subtitleWrapper}>
                {!depositTransaction &&
                  <Typography className={inheritClasses.txSubtitle}>
                    Please wait while we process your payment card
                  </Typography>
                }
                {depositTransaction &&
                  <Typography className={inheritClasses.txSubtitle}>
                    Your payment is accepted, please wait while we setup your wallet.&nbsp;
                    Deposit&nbsp;
                    <a
                      href={`https://${PORTIS_DEFAULT_NETWORK}.etherscan.io/tx/${depositTransaction}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      transaction
                    </a> is pending
                  </Typography>
                }
              </div>
              <CircularProgress width="40" />
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
