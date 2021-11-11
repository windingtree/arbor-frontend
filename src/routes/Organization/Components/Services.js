import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {
  extendOrgidJson,
  addService,
  removeService,
  resetTransactionStatus,
  selectPendingState,
  selectSuccessState
} from '../../../ducks/wizard';
import {
  fetchOrganizationInfo
} from '../../../ducks/fetchOrganizationInfo';
import {Formik} from 'formik';
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";

import { wizardConfig } from '../../../utils/legalEntity';

import { WizardStepHosting, WizardStepMetaMask } from '../../../components';
import DialogComponent from '../../../components/Dialog';
// import CopyIdComponent from "../../../components/CopyIdComponent";
import { strCenterEllipsis } from '../../../utils/helpers';
import CopyTextComponent from "../../../components/CopyTextComponent";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

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
    margin: '0 0 40px 0'
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
    color: colors.secondary.peach,
    textTransform: 'none',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginLeft: '-8px'
    }
  },
  dialogContent: {
    width: '440px',
    paddingBottom: '40px'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'start',
    color: colors.greyScale.darkest,
    marginBottom: '20px',
    display: 'inline-block'
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
  serviceLine: {
    marginBottom: '5px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'flex-start',
      marginBottom: '10px',
    }
  },
  actionBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'flex-start',
      marginTop: 0,
      marginBottom: '10px',
      '&> .MuiButton-text': {
        padding: 0,
        marginTop: '5px',
        marginLeft: 0
      }
    }
  }
});

function Services(props) {
  const classes = styles();
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [serviceIndexToRemove, setAgentIndexToRemove] = useState(null);
  const {
    orgid,
    services = [],
    pendingTransaction,
    successTransaction,
    fetchOrganizationInfo,
    resetTransactionStatus,
    addService,
    removeService,
    canManage
  } = props;

  const fragments = services.reduce(
    (a, v) => {
      const fragment = v.id.split('#')[1];
      if (fragment) {
        a.push(fragment);
      }
      return a;
    },
    []
  );

  useEffect(() => {
    fetchOrganizationInfo({ id: orgid });
    resetTransactionStatus();
    setActiveStep(0);
  }, [isModalOpen, orgid, fetchOrganizationInfo, resetTransactionStatus]);

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  const dialogStepsContent = (stepIndex) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    const deleteAgent = () => {
      removeService(serviceIndexToRemove);
      handleNext();
    };

    switch (type) {
      case 'step_hosting': return <WizardStepHosting data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      default: return (
        <>
          <Typography
            variant={'caption'}
            className={classes.dialogTitle}>
                { serviceIndexToRemove !== null ? 'Remove' : 'Add' } API
          </Typography>
          {
            serviceIndexToRemove !== null ? (
              <div className={classes.dialogButtonWrapper}>
                <Button className={classes.dialogButton} onClick={deleteAgent}>
                  <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                    Save Changes
                  </Typography>
                </Button>
              </div>
            ) : (
              <Formik
                initialValues={{ type: '', fragment: '', serviceEndpoint: '', description: '' }}
                validate={values => {
                  const errors = {};

                  Object.keys(values).forEach(
                    key => {
                      const value = values[key];
                      switch (key) {
                        case 'type':
                            if (!value) {
                                errors[key] = 'You must enter a type of service';
                            }
                            break;
                        case 'fragment':
                            if (!value) {
                                errors[key] = 'You must enter a fragment (unique tag)';
                                break;
                            }
                            if (fragments.includes(value)) {
                                errors[key] = 'This fragment is already in use';
                                break;
                            }
                            if (!value.match(/^[a-zA-Z0-9]+$/)) {
                                errors[key] = 'There are only letters and numbers can be used in fragment';
                                break;
                            }
                        break;
                        case 'serviceEndpoint':
                          if (!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)) {
                            errors[key] = `Service endpoint has wrong URI format}"`;
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
                  addService({
                    id: `did:orgid:${orgid}#${values.fragment}`,
                    type: values.type,
                    serviceEndpoint: values.serviceEndpoint,
                    description: values.description
                  });
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
                      <TextField
                          name={'type'}
                          autoComplete={'none'}
                          variant={'filled'}
                          label={'API Type (HTNG, NDC, OTA, etc.)'}
                          fullWidth
                          required
                          error={errors.type && touched.type}
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.type && touched.type ? errors.type : null}
                      />
                    </div>
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                          name={'fragment'}
                          autoComplete={'none'}
                          variant={'filled'}
                          label={'Unique API ID'}
                          fullWidth
                          required
                          error={errors.fragment && touched.fragment}
                          value={values.fragment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.fragment && touched.fragment ? errors.fragment : null}
                      />
                    </div>
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                          name={'serviceEndpoint'}
                          autoComplete={'none'}
                          variant={'filled'}
                          label={'API Endpoint URI'}
                          fullWidth
                          required
                          error={errors.serviceEndpoint && touched.serviceEndpoint}
                          value={values.serviceEndpoint}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.serviceEndpoint && touched.serviceEndpoint ? errors.serviceEndpoint : null}
                      />
                    </div>
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                          name={'description'}
                          autoComplete={'none'}
                          variant={'filled'}
                          label={'Description'}
                          fullWidth
                          error={errors.description && touched.description}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.description && touched.description ? errors.description : null}
                      />
                    </div>
                    <div className={classes.dialogButtonWrapper}>
                      <Button type={'submit'} disabled={isSubmitting || Object.keys(touched).length === 0} className={classes.dialogButton}>
                        <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                          Next
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

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleAdd = () => {
    setAgentIndexToRemove(null);
    handleOpenModal();
  };

  const handleDeleteAgent = async (agentIndex) => {
    setAgentIndexToRemove(agentIndex);
    handleOpenModal();
  };

  const addAgentKeyDialog = () => {
    return (
      <DialogComponent
        handleClose={handleCloseModal}
        isOpen={isModalOpen}
        children={(
          <div className={classes.dialogContent}>
            {
              !!pendingTransaction ? (
                <div className={classes.progressWrapper}>
                  <Typography variant={'caption'} className={classes.dialogTitle}>
                    Uploading data to blockchain...
                  </Typography>
                  <div className={classes.dialogSubtitleWrapper}>
                    <CircularProgress/>
                  </div>
                </div>
              ) : !successTransaction ? (
                dialogStepsContent(activeStep)
              ) : (
                <>
                  <Typography variant={'caption'} className={classes.dialogTitle}>API { serviceIndexToRemove !== null ? 'removed' : 'added' }</Typography>
                  <div className={classes.dialogButtonWrapper}>
                    <Button onClick={handleCloseModal} className={classes.dialogButton}>
                      <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                        Close
                      </Typography>
                    </Button>
                  </div>
                </>
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
          <Typography variant={'inherit'}>APIs: Application Programming Interfaces</Typography>
        </div>
        {canManage &&
          <div>
            <Typography variant={'inherit'} className={classes.servicesSubtitle}>
              APIs that you would like to expose on Winding Tree Marketplace. E.g. a hotel booking API, NDC API, etc.
            </Typography>
          </div>
        }
        <div className={classes.servicesListContainer}>
          {canManage &&
            <div className={classes.buttonWrapper}>
              <Button onClick={() => handleAdd()} className={classes.button}>
                <Typography variant={'inherit'}>Add API</Typography>
              </Button>
              {addAgentKeyDialog()}
            </div>
          }
          {
            services.length !== 0 && (
              <div>
                <ul>
                  {
                    services.map((service, index) => {
                      return (
                        <li key={index.toString()} className={classes.agentItemWrapper}>
                          <Grid container justify={'space-between'} alignItems={'center'}>
                            <Grid item xs={12} sm={4} className={classes.serviceLine}>
                              <Typography>{service.description || service.type}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.serviceLine}>
                              {/* <CopyIdComponent
                                id={service.serviceEndpoint}
                                leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                                fontSize={'14px'}
                                width={18}
                                title='Copied to clipboard'
                                color={colors.greyScale.dark}
                              /> */}
                              <CopyTextComponent
                                title='Service endpoint is copied to clipboard'
                                text={service.serviceEndpoint}
                                label={strCenterEllipsis(service.serviceEndpoint, 16)}
                                color='rgb(94, 102, 106)'
                                fontWeight='500'
                                fontSize='14px'
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} className={classes.actionBlock}>
                              {canManage &&
                                <Button onClick={() => handleDeleteAgent(index)} className={classes.deleteAgentButton}>
                                  <Typography variant={'inherit'}>Delete API</Typography>
                                </Button>
                              }
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
}

const mapStateToProps = state => {
  return {
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
  }
};

const mapDispatchToProps = {
  extendOrgidJson,
  addService,
  removeService,
  resetTransactionStatus,
  fetchOrganizationInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
