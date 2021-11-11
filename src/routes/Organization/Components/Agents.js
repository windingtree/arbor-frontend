import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {
  extendOrgidJson,
  addAgentKey,
  removeAgentKey,
  resetTransactionStatus,
  selectPendingState,
  selectSuccessState
} from '../../../ducks/wizard';
import {
  fetchOrganizationInfo
} from '../../../ducks/fetchOrganizationInfo';
import { Formik } from 'formik';
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
  Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";

import { copyStrToClipboard, strCenterEllipsis } from '../../../utils/helpers';
import { wizardConfig } from '../../../utils/legalEntity';

import { WizardStepHosting, WizardStepMetaMask } from '../../../components';
import DialogComponent from '../../../components/Dialog';
// import CopyIdComponent from "../../../components/CopyIdComponent";
import CopyTextComponent from "../../../components/CopyTextComponent";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CopyIcon from '../../../assets/SvgComponents/CopyIcon';
import SelectField from '../../../components/Fields/SelectField';

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
    marginRight: '5px'
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
    marginBottom: '40px'
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
  deleteButton: {
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
  personLine: {
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
        marginLeft: 0
      }
    }
  },
  lineTitle: {
    display: 'none',
    marginRight: '5px',
    textTransform: 'none',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      display: 'inline'
    }
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
  const [agentIndexToRemove, setAgentIndexToRemove] = useState(null);
  const {
    orgid,
    owner,
    agents = [],
    pendingTransaction,
    successTransaction,
    fetchOrganizationInfo,
    resetTransactionStatus,
    canManage
  } = props;

  const fragments = agents.reduce(
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

    const deleteAgent = () => {
      props.removeAgentKey(agentIndexToRemove);
      handleNext();
    };

    switch (type) {
      case 'step_hosting': return <WizardStepHosting data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      default: return (
        <>
          <Typography variant={'caption'} className={classes.dialogTitle}>{ agentIndexToRemove !== null ? 'Remove' : 'Add' } Public Key</Typography>
          <div className={classes.dialogSubtitleWrapper}>
            <Typography variant={'subtitle2'} className={classes.dialogSubtitle}>
            Please&nbsp;
            <Link
              target='_blank'
              href={'https://github.com/windingtree/arbor-frontend/blob/develop/docs/keys.md'}
            >generate keys</Link>
            &nbsp;first
            </Typography>
          </div>
          {
            agentIndexToRemove !== null ? (
              <div className={classes.dialogButtonWrapper}>
                <Button className={classes.dialogButton} onClick={deleteAgent}>
                  <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                    Save Changes
                  </Typography>
                </Button>
              </div>
            ) : (
              <Formik
                initialValues={{ type: '', fragment: '', key: '', note: '' }}
                validate={values => {
                  const errors = {};

                  Object.keys(values).forEach(
                    key => {
                      const value = values[key];
                      switch (key) {
                        case 'type':
                          if (!value) {
                            errors[key] = 'Choose key type';
                          }
                          break;
                        case 'key':
                          if (!values['type']) {
                            errors[key] = 'Unable to validate the key. Please choose key type';
                            break;
                          }
                          // if (values['type'] === 'ETH' && !value.match(/^0x[a-fA-F0-9]{40}$/)) {
                          //   errors[key] = `Wrong key format: "${values['type']}"`;
                          //   break;
                          // }
                          if (values['type'] === 'X25519' && !value.match(/^M[a-zA-Z0-9/]+=$/)) {
                            errors[key] = `Wrong key format: "${values['type']}"`;
                            break;
                          }
                          if (values['type'] === 'secp256k1' && !value.match(/^MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE[a-zA-Z0-9+/]{86}==$/)) {
                            errors[key] = `Wrong key format: "${values['type']}"`;
                            break;
                          }
                          break;
                        case 'fragment':
                          if (!value) {
                            errors[key] = 'Please specify unique key ID';
                            break;
                          }
                          if (fragments.includes(value)) {
                            errors[key] = 'Key ID already in use';
                            break;
                          }
                          if (!value.match(/^[a-zA-Z0-9]+$/)) {
                            errors[key] = 'Please use only letters and numbers';
                            break;
                          }
                          break;
                        case 'note':
                          break;
                        default:
                      }
                    }
                  );

                  return errors;
                }}
                onSubmit={values => {
                  props.addAgentKey({
                    id: `did:orgid:${orgid}#${values.fragment}`,
                    type: values.type,
                    controller: `did:orgid:${orgid}`,
                    publicKeyPem: values.key,
                    note: values.note
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
                      <SelectField
                        name={'type'}
                        variant={'filled'}
                        label={'Key type'}
                        fullWidth
                        required
                        options={['X25519','secp256k1']}
                        values={values.type}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        helperText={errors.type && touched.type ? errors.type : null}
                      />
                    </div>
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                        name={'key'}
                        autoComplete={'none'}
                        variant={'filled'}
                        label={'Key in PEM format'}
                        fullWidth
                        required
                        error={errors.key && touched.key}
                        values={values.key}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.key && touched.key ? errors.key : null}
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
                        name={'fragment'}
                        autoComplete={'none'}
                        variant={'filled'}
                        label={'Unique key ID'}
                        fullWidth
                        required
                        error={errors.fragment && touched.fragment}
                        values={values.fragment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.fragment && touched.fragment ? errors.fragment : null}
                      />
                    </div>
                    <div className={classes.inputFieldWrapper}>
                      <TextField
                        name={'note'}
                        autoComplete={'none'}
                        variant={'filled'}
                        label={'Note'}
                        fullWidth
                        error={errors.note && touched.note}
                        values={values.note}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.note && touched.note ? errors.note : null}
                      />
                    </div>
                    <div className={classes.dialogButtonWrapper}>
                      <Button type={'submit'} disabled={isSubmitting || Object.keys(touched).length === 0} className={classes.dialogButton}>
                        <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                          Save
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
                    Transaction in progress
                  </Typography>
                  <div className={classes.dialogSubtitleWrapper}>
                    <CircularProgress/>
                  </div>
                </div>
              ) : !successTransaction ? (
                dialogStepsContent(activeStep)
              ) : (
                <>
                  <Typography variant={'caption'} className={classes.dialogTitle}>Public Key { agentIndexToRemove !== null ? 'Removed' : 'Added' }</Typography>
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
      <div className={classes.agentsContent}>

        <div className={classes.agentsTitleWrapper}>
          <Typography variant={'inherit'}>Public Keys</Typography>
        </div>
        <div className={classes.agentsListContainer}>
          {canManage &&
            <div className={classes.buttonWrapper}>
              <Button onClick={() => handleAdd()} className={classes.button}>
                <Typography variant={'inherit'}>Add Public Key</Typography>
              </Button>
              {addAgentKeyDialog()}
            </div>
          }
          {
            agents.length !== 0 && (
              <div>
                <ul>
                  {
                    agents.map((agent, index) => {
                      return (
                        <li key={index.toString()} className={classes.agentItemWrapper}>
                          <Grid container justify={'space-between'} alignItems={'center'}>
                            <Grid item xs={12} sm={4} className={classes.personLine}>
                              <Typography>{agent.note}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2} className={classes.personLine}>
                              <Typography noWrap>
                                <span className={classes.lineTitle}>
                                  Key type:
                                </span>
                                {agent.type}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} className={classes.personLine}>
                              {/* <CopyIdComponent
                                id={agent.publicKeyPem}
                                leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                                fontSize={'14px'}
                                color={colors.greyScale.dark}
                                width={12}
                              /> */}
                              <VpnKeyIcon className={classes.keyIcon}/>
                              <CopyTextComponent
                                title='Public key is copied to clipboard'
                                text={agent.publicKeyPem}
                                label={strCenterEllipsis(agent.publicKeyPem, 11)}
                                color='rgb(94, 102, 106)'
                                fontWeight='500'
                                fontSize='14px'
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} className={classes.actionBlock}>
                              {canManage &&
                                <Button onClick={() => handleDeleteAgent(index)} className={classes.deleteButton}>
                                  <Typography variant={'inherit'}>Remove key</Typography>
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
  addAgentKey,
  removeAgentKey,
  resetTransactionStatus,
  fetchOrganizationInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Agents);
