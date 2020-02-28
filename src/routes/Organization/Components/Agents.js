import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { extendOrgidJson, resetTransactionStatus, selectPendingState, selectSuccessState } from '../../../ducks/wizard';
import {Formik} from 'formik';
import _ from "lodash";
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Tooltip,
  ClickAwayListener,
  InputAdornment,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";

import { copyStrToClipboard } from '../../../utils/helpers';
import { wizardConfig } from '../../../utils/legalEntity';

import { WizardStepHosting, WizardStepMetaMask } from '../../../components';
import DialogComponent from '../../../components/Dialog';
import CopyIdComponent from "../../../components/CopyIdComponent";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CopyIcon from '../../../assets/SvgComponents/CopyIcon';

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
  agentsContent: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    padding: '40px 0'
  },
  agentsTitleWrapper: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  agentsSubtitle: {
    fontSize: '16px',
    lineHeight: 1.4
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
    padding: '6px 20px'
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
  }
});

const LightTooltip = withStyles({
  tooltip: {
    maxWidth: '240px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.greyScale.common,
    fontSize: '12px',
    fontWeight: 400,
    padding: '12px',
    boxSizing: 'border-box'
  }
})(Tooltip);

function Agents(props) {
  const classes = styles();
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { organization , pendingTransaction, successTransaction } = props;
  const { owner } = organization;
  const agents = _.get(organization, `jsonContent.publicKey`, []);

  useEffect(() => {
    props.resetTransactionStatus();
    setActiveStep(0);
  }, [isModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  function copyIdWithFeedback(str) {
    handleTooltipOpen();
    return copyStrToClipboard(str)
  }

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  const dialogStepsContent = (stepIndex) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    switch (type) {
      case 'step_hosting': return <WizardStepHosting data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      default: return (
        <>
          <Typography variant={'caption'} className={classes.dialogTitle}>Add agent key</Typography>
          <div className={classes.dialogSubtitleWrapper}>
            <Typography variant={'subtitle2'} className={classes.dialogSubtitle}>To add an agent, enter its key and  write a comment, then confirm the transaction in MetaMask. </Typography>
          </div>
          <Formik
            initialValues={{ key: '', comment: '' }}
            onSubmit={(values) => {
              props.extendOrgidJson(values); //TODO add and replace action to push values to publicKey ?
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
                    name={'key'}
                    autoComplete={'none'}
                    variant={'filled'}
                    label={'Enter Agent Key'}
                    fullWidth
                    values={values.key}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors && touched && errors.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={'end'}>
                          <ClickAwayListener
                            onClickAway={handleTooltipClose}
                          >
                            <div>
                              <LightTooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={isTooltipOpen}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={'Key copied to clipboard'}
                                placement={'top'}
                              >
                                <Button onClick={() => copyIdWithFeedback(values.key)} className={classes.inputCopyKeyButton}>
                                  <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
                                </Button>
                              </LightTooltip>
                            </div>
                          </ClickAwayListener>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className={classes.inputFieldWrapper}>
                  <TextField
                    name={'comment'}
                    autoComplete={'none'}
                    variant={'filled'}
                    label={'Write a comment for this agent'}
                    fullWidth
                    values={values.comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors && touched && errors.message}
                  />
                </div>
                <div className={classes.dialogButtonWrapper}>
                  <Button type={'submit'} onClick={handleNext} disabled={isSubmitting} className={classes.dialogButton}>
                    <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                      Confirm in MetaMask
                    </Typography>
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </>
      );
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
                  <CircularProgress/>
                </div>
              ) : !successTransaction ? (
                dialogStepsContent(activeStep)
              ) : (
                <>
                  <Typography variant={'caption'} className={classes.dialogTitle}>Agent successfully created</Typography>
                  <div className={classes.dialogSubtitleWrapper}>
                    <Typography variant={'subtitle2'} className={classes.dialogSubtitle}>You new agent now has the rights to act on behalf of your organization. You can add more agents or delete agent keys.</Typography>
                  </div>
                  <div className={classes.dialogButtonWrapper}>
                    <Button onClick={handleCloseModal} className={classes.dialogButton}>
                      <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                        Manage your agents
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
      <div className={classes.agentsContent}>
        <div className={classes.agentsTitleWrapper}>
          <Typography variant={'inherit'}>Owner and agent management</Typography>
        </div>
        <div>
          <Typography variant={'inherit'} className={classes.agentsSubtitle}>
            Assign agents that could act as your representatives. Add public keys of your employees (or devices) that
            will be able to sign and encrypt communication on behalf of your organization.</Typography>
        </div>
        <div className={classes.ownerInfoWrapper}>
          <Typography variant={'inherit'} className={classes.agentTitle}>Owner</Typography>
          <div className={classes.ownerInfo}>
            <CopyIdComponent
              id={owner || '0xLOADING'}
              leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
              fontSize={'14px'}
              color={colors.greyScale.dark}
            />
          </div>
        </div>
        <div className={classes.agentsListContainer}>
          <div className={classes.agentInfoWrapper}>
            <Typography variant={'inherit'} className={classes.agentTitle}>Agents</Typography>
          </div>
          <div className={classes.buttonWrapper}>
            <Button onClick={handleOpenModal} className={classes.button}>
              <Typography variant={'inherit'}>+ Add agent key</Typography>
            </Button>
            {addAgentKeyDialog()}
          </div>
          {
            agents.length !== 0 ? (
              <div>
                <ul>
                  {
                    agents.map((agent, index) => {
                      return (
                        <li key={index.toString()} className={classes.agentItemWrapper}>
                          <Grid container justify={'space-between'} alignItems={'center'}>
                            <Grid item xs={2}>
                              <CopyIdComponent
                                id={agent.id}
                                leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                                fontSize={'14px'}
                                color={colors.greyScale.dark}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography>{agent.comment}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Button onClick={() => console.log('delete agent')} className={classes.deleteAgentButton}>
                                <Typography variant={'inherit'}>Delete agent key</Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            ) : (
              <div>
                <Typography>You have no agents</Typography>
              </div>
            )
          }
        </div>
      </div>
    </Container>
  )
}

Agents.defaultProps = {
  success: false,
  isFetched: false,
  isFetching: false
};

const mapStateToProps = state => {
  return {
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
  }
};

const mapDispatchToProps = {
  extendOrgidJson,
  resetTransactionStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Agents);