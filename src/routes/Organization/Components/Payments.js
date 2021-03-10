import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  extendOrgidJson,
  addPayment,
  removePayment,
  resetTransactionStatus,
  selectPendingState,
  selectSuccessState
} from '../../../ducks/wizard';
import { fetchOrganizationInfo } from '../../../ducks/fetchOrganizationInfo';
import { Formik } from 'formik';
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  CircularProgress
} from "@material-ui/core";
import {
  makeStyles
} from "@material-ui/core/styles";
import colors from "../../../styles/colors";

import { wizardConfig } from '../../../utils/legalEntity';
import {
  WizardStepHosting,
  WizardStepMetaMask
} from '../../../components';
import SelectField from '../../../components/Fields/SelectField';
import DialogComponent from '../../../components/Dialog';
import CopyIdComponent from "../../../components/CopyIdComponent";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";

const styles = makeStyles({
  buttonWrapper: {
    width: '100%',
    margin: '20px 0'
  },
  keyIcon: {
    fontSize: 'large',
    color: colors.greyScale.common,
    verticalAlign: 'sub',
    opacity: .5,
    marginRight: '14px'
  },
  button: {
    width: '100%',
    position: 'relative',
    fontSize: '16px',
    fontWeight: 500,
    color: colors.secondary.cyan,
    textTransform: 'none',
    boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
    backgroundColor: colors.primary.white,
    borderRadius: '8px',
    padding: '20px 0'
  },
  // agent
  servicesContent: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    padding: '40px 0'
  },
  servicesTitleWrapper: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  servicesSubtitle: {
    fontSize: '16px',
    lineHeight: 1.4
  },
  servicesInfoWrapper: {
    marginTop: '20px'
  },
  ownerInfoWrapper: {
    margin: '30px 0'
  },
  ownerInfo: {
    marginTop: '10px'
  },
  agentTitle: {
    fontWeight: 500,
    fontSize: '18px',
    color: colors.greyScale.darkest,
  },
  deleteAgentButton: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    float: 'right',
    color: colors.secondary.peach,
    textTransform: 'none',
  },
  dialogContent: {
    width: '440px'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'start',
    color: colors.greyScale.darkest
  },
  dialogSubtitleWrapper: {
    padding: '20px 0 32px 0'
  },
  dialogSubtitle: {
    fontSize: '16px',
    lineHeight: 1.45,
    fontWeight: 400,
    color: colors.greyScale.common
  },
  inputFieldWrapper: {
    position: 'relative',
    marginBottom: '28px',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  dialogButtonWrapper: {
    display: 'table',
    paddingTop: '10px',
    margin: '0 auto'
  },
  dialogButton: {
    height: '44px',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
    textTransform: 'none',
    padding: '6px 20px',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'none'
    }
  },
  dialogButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  inputCopyKeyButton: {
    minWidth: 'auto',
    borderRadius: '50%',
    padding: '8px'
  },
  iconCopy: {
    width: '20px',
    height: '20px',
    color: colors.secondary.green,
  },
  progressWrapper: {
    display: 'table',
    margin: '0 auto'
  },
  upperCase: {
    textTransform: 'uppercase'
  }
});

const Payments = props => {
  const classes = styles();
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentIndexToRemove, setPaymentIndexToRemove] = useState(null);
  const {
    orgid,
    payments = [],
    pendingTransaction,
    successTransaction,
    fetchOrganizationInfo,
    resetTransactionStatus,
    addPayment,
    removePayment
  } = props;

  useEffect(() => {
    setTimeout(() => {
      fetchOrganizationInfo({ id: orgid });
      resetTransactionStatus();
      setActiveStep(0);
    }, 1000);
  }, [isModalOpen, orgid, fetchOrganizationInfo, resetTransactionStatus]);

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleAdd = () => {
    setPaymentIndexToRemove(null);
    handleOpenModal();
  };

  const handleDelete = async (agentIndex) => {
    setPaymentIndexToRemove(agentIndex);
    handleOpenModal();
  };

  const dialogStepsContent = (stepIndex) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    const deletePayment = () => {
      removePayment(paymentIndexToRemove);
      handleNext();
    };

    const allowedPaymentTypes = [
      'crypto',
      'bank',
      'simard'
    ];

    switch (type) {
      case 'step_hosting': return <WizardStepHosting data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      default: return (
        <>
          <Typography
            variant={'caption'}
            className={classes.dialogTitle}>
              { paymentIndexToRemove !== null ? 'Remove' : 'Add' } Payment Option
          </Typography>
          {
            paymentIndexToRemove !== null ? (
              <div className={classes.dialogButtonWrapper}>
                <Button className={classes.dialogButton} onClick={deletePayment}>
                  <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                    Remove
                  </Typography>
                </Button>
              </div>
            ) : (
              <Formik
                initialValues={{
                  type: '',
                  currency: '',
                  address: '',
                  swift: '',
                  iban: '',
                  description: ''
                }}
                validate={values => {
                  const errors = {};
                  let currency = [];
                  let matching;

                  Object.keys(values).forEach(
                    key => {
                      const value = values[key];
                      switch (key) {
                        case 'type':
                          if (!value) {
                            errors[key] = 'You must enter a type of service';
                          }
                          if (!allowedPaymentTypes.includes(value)) {
                            errors[key] = 'Field "type" has wrong value';
                          }
                          break;

                        case 'currency':
                          currency = value.trim().split(' ').map(c => c.toLowerCase());
                          if ((currency.includes('btc') || currency.includes('bch')) &&
                              currency.includes('eth')) {
                            errors[key] = 'You cannot mix BTC and ETH currencies in one record';
                            break;
                          }
                          matching = currency
                            .map(c => String(c).match(/^[a-zA-Z]{2,}$/))
                            .filter(c => !c);
                          if (matching.length > 0) {
                            errors[key] = 'Wrong currency name';
                            break;
                          }
                          break;

                        case 'address':
                          if (values['type'] !== 'crypto') {
                            break;
                          }
                          matching = values['currency'].match(/btc|bch/ig);
                          if (matching && !value.match(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/)) {
                            errors[key] = `Bitcoin address has wrong format`;
                            break;
                          } else if (!matching && !value.match(/^0x[a-fA-F0-9]{40}$/)) {
                            errors[key] = `ETH address has wrong format`;
                            break;
                          }
                          break;

                        case 'swift':
                          if (values['type'] !== 'bank') {
                            break;
                          }
                          if (!value.match(/^[a-zA-Z]{4}[ -]{0,1}[a-zA-Z]{2}[ -]{0,1}[a-zA-Z0-9]{2}[ -]{0,1}[XXX0-9]{0,3}$/)) {
                            errors[key] = `Swift address has wrong format`;
                            break;
                          }
                          break;

                        case 'iban':
                          if (values['type'] !== 'bank') {
                            break;
                          }
                          if (!value.match(/^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/)) {
                            errors[key] = `IBAN address has wrong format`;
                            break;
                          }
                          break;

                        case 'description':
                          break;

                        default:
                      }
                    }
                  );

                  return errors;
                }}
                onSubmit={values => {
                  let payment = {};
                  switch (values.type) {
                    case 'crypto':
                      payment = {
                        type: values.type,
                        currency: values.currency.split(' ').map(c => c.toLowerCase().trim()),
                        address: values.address.trim(),
                        description: values.description.trim()
                      };
                      break;
                    case 'bank':
                      payment = {
                        type: values.type,
                        currency: values.currency.split(' ').map(c => c.toLowerCase().trim()),
                        swift: values.swift.trim(),
                        iban: values.iban.trim(),
                        description: values.description.trim()
                      };
                      break;
                    case 'simard':
                      payment = {
                        type: values.type,
                        currency: values.currency.split(' ').map(c => c.toLowerCase().trim()),
                        description: values.description.trim()
                      };
                      break;
                    default:
                  }
                  if (Object.keys(payment).length === 0) {
                    throw new Error('Wrong payment item');
                  }
                  addPayment(payment);
                  handleNext();
                }}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={classes.inputFieldWrapper}>
                      <SelectField
                        name={'type'}
                        variant={'filled'}
                        label={'Payment type'}
                        fullWidth
                        required
                        options={allowedPaymentTypes}
                        values={values.type}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        helperText={errors.type && touched.type ? errors.type : null}
                      />
                    </div>
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                          name={'currency'}
                          autoComplete={'none'}
                          variant={'filled'}
                          label={'Accepted currencies (e.g. "USD GBP EUR")'}
                          fullWidth
                          required
                          error={errors.currency && touched.currency}
                          value={values.currency}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.currency && touched.currency ? errors.currency : null}
                      />
                    </div>
                    {values.type === 'crypto' &&
                      <div className={classes.inputFieldWrapper}>
                        <TextField
                            name={'address'}
                            autoComplete={'none'}
                            variant={'filled'}
                            label={'Enter an address'}
                            fullWidth
                            required
                            error={errors.address && touched.address}
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.address && touched.address ? errors.address : null}
                        />
                    </div>
                    }
                    {values.type === 'bank' &&
                      <Fragment>
                        <div className={classes.inputFieldWrapper}>
                          <TextField
                            name={'swift'}
                            autoComplete={'none'}
                            variant={'filled'}
                            label={'Enter SWIFT address'}
                            fullWidth
                            required
                            error={errors.swift && touched.swift}
                            values={values.swift}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.swift && touched.swift ? errors.swift : null}
                          />
                        </div>
                        <div className={classes.inputFieldWrapper}>
                          <TextField
                            name={'iban'}
                            autoComplete={'none'}
                            variant={'filled'}
                            label={'Enter IBAN address'}
                            fullWidth
                            required
                            error={errors.iban && touched.iban}
                            value={values.iban}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.iban && touched.iban ? errors.iban : null}
                          />
                        </div>
                      </Fragment>
                    }
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                          name={'description'}
                          autoComplete={'none'}
                          variant={'filled'}
                          label={'Optional note'}
                          fullWidth
                          error={errors.description && touched.description}
                          values={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.description && touched.description ? errors.description : null}
                      />
                    </div>
                    <div className={classes.dialogButtonWrapper}>
                      <Button type={'submit'} disabled={isSubmitting || Object.keys(touched).length === 0} className={classes.dialogButton}>
                        <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                          Save Payment
                        </Typography>
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            )
          }
        </>
      );
    }
  };

  const addPaymentDialog = () => {
    return (
      <DialogComponent
        handleClose={handleCloseModal}
        isOpen={isModalOpen}
        children={(
          <div className={classes.dialogContent}>
            {
              !!pendingTransaction
              ? (
                <div className={classes.progressWrapper}>
                  <Typography variant={'caption'} className={classes.dialogTitle}>
                    Transaction pending...
                  </Typography>
                  <div className={classes.dialogSubtitleWrapper}>
                    <CircularProgress/>
                  </div>
                </div>
              )
              : !successTransaction
                ? dialogStepsContent(activeStep)
                : (
                  <Fragment>
                    <Typography variant={'caption'} className={classes.dialogTitle}>
                      Payment record successfully { paymentIndexToRemove !== null ? 'removed' : 'added' }
                    </Typography>
                    <div className={classes.dialogButtonWrapper}>
                      <Button onClick={handleCloseModal} className={classes.dialogButton}>
                        <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                          Close
                        </Typography>
                      </Button>
                    </div>
                  </Fragment>
                )
            }
          </div>
        )}
      />
    )
  };

  return (
    <Container>
      <div className={classes.servicesContent}>
        <div className={classes.servicesTitleWrapper}>
          <Typography variant={'inherit'}>Payment Options</Typography>
        </div>
        <div>
          <Typography variant={'inherit'} className={classes.servicesSubtitle}>
            If you would like to accept payments on Winding Tree, you may specify one or several payment options.
          </Typography>
        </div>
        <div className={classes.servicesListContainer}>
          <div className={classes.buttonWrapper}>
            <Button onClick={() => handleAdd()} className={classes.button}>
              <Typography variant={'inherit'}>Add Payment Option</Typography>
            </Button>
            {addPaymentDialog()}
          </div>
          {
            payments.length !== 0 && (
              <div>
                <ul>
                  {
                    payments.map((payment, index) => {
                      return (
                        <li key={index.toString()} className={classes.agentItemWrapper}>
                          <Grid container justify={'space-between'} alignItems={'center'}>
                            <Grid item xs={1}>
                              <Typography className={classes.upperCase}>{payment.type}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography className={classes.upperCase}>{payment.currency.join(', ')}</Typography>
                            </Grid>
                            {payment.type === 'crypto' &&
                              <Grid item xs={4}>
                                <CopyIdComponent
                                  id={payment.address}
                                  leftElement={(<Fragment/>)}
                                  fontSize={'14px'}
                                  width={18}
                                  title='Address copied to clipboard'
                                  color={colors.greyScale.dark}
                                />
                              </Grid>
                            }
                            {payment.type === 'bank' &&
                              <Grid item xs={4}>
                                <Grid container alignItems={'center'}>
                                  {(payment.swift && payment.swift !== '') &&
                                    <Grid>
                                      <CopyIdComponent
                                        id={payment.swift}
                                        leftElement={(<Typography variant='inherit'>SWIFT: </Typography>)}
                                        fontSize={'14px'}
                                        width={18}
                                        title='SWIFT address copied to clipboard'
                                        color={colors.greyScale.dark}
                                      />
                                    </Grid>
                                  }
                                  {(payment.iban && payment.iban !== '') &&
                                    <Grid>
                                      <CopyIdComponent
                                        id={payment.iban}
                                        leftElement={((<Typography variant='inherit'>IBAN: </Typography>))}
                                        fontSize={'14px'}
                                        width={18}
                                        title='IBAN address copied to clipboard'
                                        color={colors.greyScale.dark}
                                      />
                                    </Grid>
                                  }
                                </Grid>
                              </Grid>
                            }
                            {payment.type === 'simard' &&
                              <Grid item xs={4}>
                                <Typography>simard</Typography>
                              </Grid>
                            }
                            <Grid item xs={2}>
                              <Typography>{payment.description}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Button
                                onClick={() => handleDelete(index)}
                                className={classes.deleteAgentButton}
                              >
                                <Typography variant={'inherit'} noWrap>Delete record</Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </Container>
  )
};

const mapStateToProps = state => {
  return {
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
  }
};

const mapDispatchToProps = {
  extendOrgidJson,
  addPayment,
  removePayment,
  resetTransactionStatus,
  fetchOrganizationInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
