import Web3 from 'web3';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, CircularProgress, TextField } from '@material-ui/core';
import colors from "../../../styles/colors";
import { Formik } from 'formik';
import DialogComponent from '../../../components/Dialog';
import SelectField from '../../../components/Fields/SelectField';
import NumberFormat from '../../../components/Fields/NumberFormat';
import {
  fetchBalances,
  toBN,
  amountToWei,
  amountFromWei,
  isWinner,
  isLoserPeriod,
  loserDeadline
} from '../../../utils/directories';
import {
  getArbDirContract,
  sendMethod,
  calculateAppealCost
} from '../../../ducks/utils/ethereum';

const styles = makeStyles({
  dialogContent: {
    // width: '600px',
    // ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
    //     width: '100%'
    // }
  },
  dialogTitleWrapper: {
      fontSize: '24px',
      fontWeight: 500,
      color: colors.greyScale.darkest,
      marginBottom: '20px',
      textAlign: 'center',
      '&.noMargin': {
          marginBottom: 0
      }
  },
  dialogButtonWrapper: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  timeoutTitle: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 400
  },
  dialogSelectorWrapper: {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column'
  },
  dialogButton: {
      backgroundImage: colors.gradients.green,
      borderRadius: '6px',
      textTransform: 'none',
      color: colors.primary.white,
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
      padding: '14px 26px',
      marginTop: '16px'
  },
  depositNote: {
    textAlign: 'center',
    padding: '18px',
    border: `1px solid ${colors.secondary.green}`,
    borderRadius: '6px',
    marginTop: '28px',
    marginBottom: '28px',
    '&.insufficient': {
        border: `1px solid ${colors.primary.accent}`
    }
  },
  depositNoteSubtitle: {
      fontWeight: 500,
      fontSize: '14px',
      color: colors.primary.green
  },
  depositNoteTitle: {
      fontWeight: 500,
      fontSize: '28px',
      textTransform: 'capitalize',
      color: colors.primary.green
  },
  inputFieldWrapper: {
    position: 'relative',
    marginBottom: '28px',
    '&:last-child': {
        marginBottom: '0'
    }
  },
  errorWrapper: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  errorMessage: {
      fontSize: '16px',
      color: '#F0806E'
  },
  inButtonProgress: {
    marginLeft: '10px'
  },
  inlineComponentTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#3E9693',
    marginBottom: '24px'
  }
});

const DialogTitle = props => {
  const classes = styles();
  const {
      inline,
      noMargin,
      children
  } = props;
  const titleClass = inline ? 'inlineComponentTitle' : 'dialogTitleWrapper';

  return (
      <div className={classes[titleClass] + (noMargin ? ' noMargin' : '')}>
          <Typography variant={'inherit'}>
              {children}
          </Typography>
      </div>
  );
};

const InlineComponent = props => {
  const classes = styles();
  const {
      isOpen
  } = props;

  if (!isOpen) {
      return null;
  }

  return (
      <div className={classes.inlineComponentWrapper}>
          {props.children}
      </div>
  );
};

export default props => {
  const classes = styles();
  const {
      web3,
      walletAddress,
      organization,
      directory,
      challenge,
      isOpened,
      isDisabled,
      handleClose,
      inline,
      timeoutTitle,
      setOrgId
  } = props;
  const WrapperComponent = inline
    ? InlineComponent
    : DialogComponent;
  const [error, setError] = useState(null);

  // Storage
  const [isLoading, setIsLoading] = useState(false);
  const [ethBalance, setEthBalance] = useState(0);
  const [selectOptions, setSelectOptions] = useState({});
  const [partySelected, setPartySelected] = useState(false);
  const [appealCost, setAppealCost] = useState(null);
  const [isAppealSending, setIsAppealSending] = useState(false);
  const [appealAmount, setAppealAmount] = useState(0);

  useEffect(() => {
      let pollingInterval;
      if (directory && walletAddress) {
          pollingInterval = setInterval(() => {
              fetchBalances(web3, walletAddress, directory.address)
                  .then(balances => {
                      setEthBalance(Number(balances.ethBalance));
                  })
                  .catch(setError)
          }, 1500);
      } else {
          clearInterval(pollingInterval);
      }
      return () => clearInterval(pollingInterval);
  }, [web3, walletAddress, organization, directory]);

  const updateAppealCost = useCallback(party => {
      if (challenge) {
          setError(null);
          if (isLoserPeriod(challenge.currentRuling, party, challenge.appealPeriod)) {
              setError(new Error(
                  `The loser must contribute during the first half of the period.
                  No later than ${loserDeadline(challenge.appealPeriod)}`
              ));
          }
          setIsLoading(true);
          calculateAppealCost(
              web3,
              directory.address,
              organization.orgid,
              party,
              challenge.challengeId,
              challenge
          )
              .then(({ totalCost, gasCost, gasPrice }) => {
                  setAppealCost({
                      rawValue: totalCost,
                      value: Web3.utils.fromWei(totalCost, 'ether'),
                      gasCost,
                      gasPrice
                  });
                  setIsLoading(false);
              })
              .catch(error => {
                  setError(error);
                  setIsLoading(false);
              });
      }
  }, [web3, directory, organization, challenge]);

  useEffect(() => {
      if (challenge && challenge.currentRuling) {
          setIsLoading(false);
          setIsAppealSending(false);
          setPartySelected(false);
          setEthBalance(0);
          setAppealAmount(0);
          setAppealCost(null);
          setSelectOptions({
              0: `None${isWinner(Number(challenge.currentRuling), 0) ? ' (win)' : ''}`,
              1: `Requester${isWinner(Number(challenge.currentRuling), 1) ? ' (winner)' : ''}`,
              2: `Challenger${isWinner(Number(challenge.currentRuling), 2) ? ' (winner)' : ''}`
          });
      }
  }, [challenge]);

  const onDialogClose = () => {
      handleClose();
  };

  const fundAppealAction = async (party, amount, setSubmitting, resetForm ) => {
      try {
          setError(null);
          if (!appealCost) {
              throw new Error(
                  'Please select a party fo funding to get the appeal cost'
              );
          }
          setIsAppealSending(true);
          await sendMethod(
              web3,
              walletAddress,
              directory.address,
              getArbDirContract,
              'fundAppeal',
              [
                organization.orgid,
                party
              ],
              amountToWei(amount),
              appealCost.gasPrice
          );
          setOrgId(organization.orgid);
          setIsAppealSending(false);
          setSubmitting(false);
          resetForm({ party: '', amount: 0 });
          handleClose();
      } catch (error) {
          setError(error);
          setIsAppealSending(false);
      }
  };

  const isAmountOk = ethBalance && appealCost &&
      toBN(amountToWei(ethBalance)).gte(toBN(amountToWei(appealCost.value))) &&
      toBN(amountToWei(appealAmount)).gt(toBN(0));

  return (
    <WrapperComponent
      isOpen={isOpened}
      handleClose={onDialogClose}
      children={(
          <div className={classes.dialogContent}>
              {isLoading &&
                  <DialogTitle>
                      <CircularProgress />
                  </DialogTitle>
              }
              {(partySelected && !isLoading && appealCost && Number(appealCost.value) === 0) &&
                  <div className={classes.depositNote}>
                      <Typography className={classes.depositNoteSubtitle}>
                          The selected party is
                      </Typography>
                      <Typography className={classes.depositNoteTitle}>
                          Fully Funded
                      </Typography>
                  </div>
              }
              {(partySelected && !isLoading && appealCost && Number(appealCost.value) > 0) &&
                  <div className={classes.depositNote + (isAmountOk ? '' : ' insufficient')}>
                      <Typography className={classes.depositNoteSubtitle}>
                          Total Appeal Cost
                      </Typography>
                      <Typography className={classes.depositNoteTitle}>
                          {appealCost.value} ETH
                      </Typography>
                      <Typography>
                          Estimated gas cost: {amountFromWei(appealCost.gasCost)} ETH
                      </Typography>
                      <Typography>
                          You can fund less than required total cost.
                      </Typography>
                      <Typography>
                          If you send more than required amount then the rest value will be returned to your account during the transaction
                      </Typography>
                  </div>
              }
              <div className={classes.dialogSelectorWrapper}>
                  <Formik
                      initialValues={{ party: '', amount: 0 }}
                      validate={values => {
                          const errors = {};
                          return errors;
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                          console.log('@@@', values);
                          fundAppealAction(
                              values.party,
                              parseFloat(values.amount).toFixed(18),
                              setSubmitting,
                              resetForm
                          );
                      }}
                  >
                      {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit
                      }) => (
                          <form onSubmit={handleSubmit}>
                              <div className={classes.inputFieldWrapper}>
                                  <SelectField
                                      name='party'
                                      variant='filled'
                                      label='Challenge Party'
                                      fullWidth
                                      required
                                      options={selectOptions}
                                      values={values.party}
                                      handleChange={evt => {
                                          updateAppealCost(evt.target.value);
                                          setPartySelected(!!evt.target.value);
                                          handleChange(evt);
                                      }}
                                      handleBlur={handleBlur}
                                      helperText={errors.party && touched.party ? errors.party : null}
                                      disabled={isDisabled}
                                  />
                              </div>
                              <div className={classes.inputFieldWrapper}>
                                  <TextField
                                      InputProps={{
                                          inputComponent: NumberFormat,
                                      }}
                                      name='amount'
                                      autoComplete='none'
                                      variant='filled'
                                      label='Amount ETH'
                                      fullWidth
                                      required
                                      value={values.amount}
                                      onChange={evt => {
                                          setAppealAmount(evt.target.value || 0);
                                          handleChange(evt);
                                      }}
                                      onBlur={handleBlur}
                                      helperText={errors.amount && touched.amount ? errors.amount : null}
                                      disabled={isDisabled}
                                  />
                              </div>
                              {error &&
                                  <div className={classes.errorWrapper}>
                                      <Typography className={classes.errorMessage}>
                                          {error.message}
                                      </Typography>
                                  </div>
                              }
                              <div className={classes.dialogButtonWrapper}>
                                {timeoutTitle &&
                                  <Typography className={classes.timeoutTitle}>
                                    {timeoutTitle}
                                  </Typography>
                                }
                                <Button
                                  className={classes.dialogButton}
                                  disabled={isDisabled || !appealCost || isAppealSending || isLoading}
                                  type='submit'
                                >
                                  Fund Appeal
                                  {(isAppealSending) &&
                                      <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                  }
                                </Button>
                              </div>
                          </form>
                      )}
                  </Formik>
              </div>
          </div>
    )} />
  );
};
