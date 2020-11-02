import React, { useState, useEffect } from 'react';
import history from '../redux/history';
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Switch
} from "@material-ui/core";
import { Formik } from "formik";

import colors from '../styles/colors';

import { config as legalEntity } from '../utils/legalEntityEdit';
import { config as organizationalUnit} from '../utils/organizationalUnitEdit';
import { wizardConfig } from '../utils/legalEntity';

import {
  rewriteOrgidJson,
  selectPendingState,
  selectSuccessState,
  selectWizardOrgidJson,
  extendOrgidJson,
  sendChangeOrgidUriAndHashRequest,
  selectWizardOrgidUri,
  saveOrgidUri,
  saveOrgidJsonToArbor,
  resetTransactionStatus
} from '../ducks/wizard';

import { selectItem } from '../ducks/fetchOrganizationInfo';

import SaveStateDialog from '../components/SaveStateDialog';
import { Section, WizardStepMetaMask, WizardStepHosting } from "../components";
import ArrowLeftIcon from "../assets/SvgComponents/ArrowLeftIcon";
import DialogComponent from '../components/Dialog';
import { selectSignInAddress } from '../ducks/signIn';
import PendingTransactionIllustration from '../assets/SvgComponents/org-creation-illustration.svg';
import SuccessTransactionIllustration from '../assets/SvgComponents/detailsIllustration.svg';

const styles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  form: {
    paddingBottom: '60px'
  },
  screenHeading: {
    paddingTop: '16px',
  },
  buttonWrapper: {
    marginLeft: '-8px'
  },
  buttonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
  editHeaderContainer: {
    paddingTop: '20px',
  },
  editHeaderTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest
  },
  editHeaderSubtitleContainer: {
    padding: '20px 0 10px'
  },
  editHeaderSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.common
  },
  editButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  editButton: {
    height: '44px',
    textTransform: 'none',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    padding: '6px 20px',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'none'
    }
  },
  editStatusButton: {
    height: '44px',
    textTransform: 'none',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    padding: '6px 20px',
    marginTop: '20px'
  },
  editButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  mainContent: {
    marginTop: '40px',
    paddingBottom: '160px'
  },
  formContainer: {
    border: `1px solid ${colors.greyScale.lighter}`,
    borderRadius: '8px',
    boxShadow: ' 0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    backgroundColor: colors.primary.white,
  },
  formContentWrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: '80px 80px 60px'
  },
  formTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest
  },
  formSubtitle: {
    position: 'relative',
    top: '10px',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.common,
  },
  dropzoneContent: {
    '& > div > p + div': {
      marginTop: '0'
    }
  },
  pendingIllustration: {
    width: '100%'
  },
  pendingTextContainer: {
    marginBottom: '10px',
  },
  pendingTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  pendingSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.greyScale.common,
    padding: '16px 0'
  },
  pendingButtonWrapper: {
    display: 'table',
    margin: '0 auto',
  },
  pendingButton: {
    textTransform: 'none',
  },
  pendingButtonLabel: {
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '.005em',
    color: colors.secondary.cyan
  },
  pendingButtonIcon: {
    width: '12px',
    height: '12px',
    color: colors.secondary.cyan,
    transform: 'rotate(180deg)',
    marginLeft: '14px'
  },
  successButton: {
    height: '44px',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    padding: '6px 20px',
  },
  successButtonLabel: {
    color: colors.primary.white
  },
  editDialogContent: {
    width: '440px',
  },
  progress: {
    marginLeft: '20px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.45,
    color: colors.greyScale.darkest,
    paddingTop: '32px',
    paddingBottom: '16px',
  }
});

const OrgSwitch = withStyles({
  switchBase: {
    color: '#e1f4e9',
    '&$checked': {
      color: 'rgb(152,204,176)',
    },
    // '&$checked + $track': {
    //   backgroundColor: '#d1ffe6',
    // },
  },
  checked: {},
  track: {},
})(Switch);

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  )
};

const Edit = (props) => {
  const orgid = history.location.pathname.split('/')[2];
  const classes = styles();
  const { orgInfo, pendingTransaction, successTransaction, rewriteOrgidJson, resetTransactionStatus } = props;
  const [activeStatus, setAciveStatus] = useState(orgInfo.state);
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const [isStateModalOpen, setStateModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const wizardType = _.get(history, 'location.state.type', 'legalEntity');
  const jsonContent = _.get(history, 'location.state.jsonContent', {});
  const types = { legalEntity, organizationalUnit };
  const editConfig = types[wizardType];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    setAciveStatus(orgInfo.state);
  }, [orgInfo]);

  useEffect(() => {
    if(orgid) {
      rewriteOrgidJson(jsonContent)
    }
  }, [orgid, rewriteOrgidJson, jsonContent]);

  useEffect(() => {
    resetTransactionStatus();
  }, [isModalOpen, resetTransactionStatus]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

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
        <div key={stepIndex}>Step <pre>${content.name}</pre> has unknown type: <pre>{content.type}</pre></div>
      );
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const hadleSaveActiveStatus = () => {
    setStateModalOpen(true);
  };

  const handleCLoseStatusModal = () => {
    setStateModalOpen(false);
  };

  const setDialog = () => {
    return (
      <DialogComponent
        handleClose={handleCloseModal}
        isOpen={isModalOpen}
        children={(
          <div className={classes.editDialogContent}>
            {
              !!pendingTransaction ? (
                <div className={classes.pendingContentWrapper}>
                  <img src={PendingTransactionIllustration} alt={'illustration'} className={classes.pendingIllustration}/>
                  <div className={classes.pendingTextContainer}>
                    <Grid container alignItems={'center'}>
                      <Grid item>
                        <Typography variant={'h3'} className={classes.pendingTitle}>Almost there!</Typography>
                      </Grid>
                      <Grid item>
                        <CircularProgress
                          className={classes.progress}
                          variant='indeterminate'
                          size={20}
                          thickness={4}
                        />
                      </Grid>
                    </Grid>
                    <Typography variant={'subtitle2'} className={classes.pendingSubtitle}>Editing your organization profile might take some time. You can wait here, edit or add another organization in the meantime. We will let you know once everything is ready. </Typography>
                  </div>
                  <div className={classes.pendingButtonWrapper}>
                    <Button className={classes.pendingButton} onClick={() => history.push('/my-organizations')}>
                      <Typography variant={'caption'} className={classes.pendingButtonLabel}>Go to my organizations <ArrowLeftIcon viewBox={'0 0 12 12'} className={classes.pendingButtonIcon}/></Typography>
                    </Button>
                  </div>
                </div>
              ) : !!successTransaction ? (
                <div className={classes.pendingContentWrapper}>
                  <img src={SuccessTransactionIllustration} alt={'illustration'} className={classes.pendingIllustration}/>
                  <div className={classes.pendingTextContainer}>
                    <Typography variant={'h3'} className={classes.pendingTitle}>Your organization profile successfully updated!</Typography>
                    <Typography variant={'subtitle2'} className={classes.pendingSubtitle}>Your organization is already updated and can be discovered by other community members.</Typography>
                  </div>
                  <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item lg={7}>
                      <Button className={classes.pendingButton} onClick={() => history.push('/my-organizations')}>
                        <Typography variant={'caption'} className={classes.pendingButtonLabel} noWrap>Go to my organizations <ArrowLeftIcon viewBox={'0 0 12 12'} className={classes.pendingButtonIcon}/></Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ) : dialogStepsContent(activeStep)
            }
          </div>
        )}
      />
    )
  };

  // Validate the form
  const validateForm = (values) => {
    const errors = {};
    const validators = editConfig
      ? editConfig
          .reduce(
            (a, v) => {
              let left = [];
              let right = [];

              if (v.sections && v.sections.left) {
                left = v.sections.left.reduce(
                  (al, vl) => {
                    const fields = vl.fields.map(
                      f => ({
                        orgidJsonPath: f.orgidJsonPath,
                        validate: f.validate
                      })
                    );
                    return [
                      ...al,
                      ...fields
                    ];
                  },
                  []
                );
              }

              if (v.sections && v.sections.right) {
                right = v.sections.right.reduce(
                  (ar, vr) => {
                    const fields = vr.fields.map(
                      f => ({
                        orgidJsonPath: f.orgidJsonPath,
                        validate: f.validate
                      })
                    );
                    return [
                      ...ar,
                      ...fields
                    ];
                  },
                  []
                );
              }

              return [
                ...a,
                ...left,
                ...right
              ];
            },
            []
          )
      : [];
    // console.log('@@@', validators);
    validators.forEach(v => {
      const value = _.get(values, v.orgidJsonPath, undefined);
      if (v.validate) {
        const error = v.validate(value);
        if (error) {
          errors[v.orgidJsonPath] = error;
        }
      }
    });

    // Return errors
    console.log('ERRORS', errors)
    return errors;
  };

  return (
    <div className={classes.mainContainer}>
      <div>
        <Formik
          initialValues={Object.assign({}, props.orgidJson)}
          enableReinitialize={true}
          validate={validateForm}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(false);
            console.log('++++', values);
            props.extendOrgidJson(values);
            handleOpenModal();
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
            <form onSubmit={handleSubmit} className={classes.form}>

              <Container>
                <div className={classes.screenHeading}>
                  <div className={classes.buttonWrapper}>
                    <Button onClick={history.goBack}>
                      <Typography variant={'caption'} className={classes.buttonLabel}>
                        <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                        Back to organization
                      </Typography>
                    </Button>
                  </div>
                </div>
              </Container>

              <Container>
                <Grid container spacing={5} justify={'space-between'} alignItems={'center'} className={classes.editHeaderContainer}>
                  <Grid item sm={9}>
                    <Typography variant={'h4'} className={classes.editHeaderTitle}>
                      Editing organization profile
                    </Typography>
                    <div className={classes.editHeaderSubtitleContainer}>
                      <Typography variant={'subtitle2'} className={classes.editHeaderSubtitle}>
                        Every profile change requires an Ethereum transaction. Make sure to have at least 0.1 Ether in your wallet before you save your changes and update your profile.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm={3} className={classes.editButtonContainer}>
                    <Button type="submit" disabled={isSubmitting} className={classes.editButton}>
                      <Typography variant={'caption'} className={classes.editButtonLabel}>{'Save and Update'}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Container>

              <Container>
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  variant='fullWidth'
                  indicatorColor='primary'
                  textColor="primary"
                >
                  {_.map(editConfig, (tab, index) => <Tab key={index} label={tab.name}/>)}
                  <Tab key={'statusTab'} label={'Active status'}/>
                </Tabs>
              </Container>
              {_.map(editConfig, (tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                  <Container>
                    <Grid container spacing={5}>
                      <Grid item xs={12} lg={5}>
                        {
                          tab.sections.left.map((section, index) => {
                            return (
                              <Section
                                key={index}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                data={section}
                              />
                            )
                          })
                        }
                      </Grid>
                      <Grid item xs={12} lg={1}/>
                      <Grid item xs={12} lg={5} className={classes.dropzoneContent}>
                        {
                          tab.sections.right.map((section, index) => {
                            return (
                              <Section
                                key={index}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                data={section}
                              />
                            )
                          })
                        }
                      </Grid>
                      <Grid item xs={12} lg={1}/>
                    </Grid>
                  </Container>
                </TabPanel>
              ))}
              <TabPanel key={'statusTab'} value={value} index={editConfig.length}>
                <Container>
                  <Typography className={classes.sectionTitle}>Organization status</Typography>
                  <Grid container spacing={5} alignItems="center">
                    <Grid item>
                      <OrgSwitch
                        checked={activeStatus}
                        onChange={(_, value) => {
                          setAciveStatus(value);
                        }}
                        name="activeStatus"
                        color="primary"
                      />
                    </Grid>
                    <Grid item>
                      <Typography>
                        {activeStatus ? 'Enabled' : 'Disabled'}
                      </Typography>
                    </Grid>
                  </Grid>
                  {activeStatus !== orgInfo.state &&
                    <Grid container>
                      <Button
                        onClick={() => hadleSaveActiveStatus(activeStatus)}
                        disabled={false}
                        className={classes.editStatusButton}
                      >
                        <Typography variant={'caption'} className={classes.editButtonLabel}>
                          {'Save Status'}
                        </Typography>
                      </Button>
                    </Grid>
                  }
                </Container>
              </TabPanel>
              {setDialog()}
              <SaveStateDialog
                isModalOpen={isStateModalOpen}
                handleCloseModal={() => handleCLoseStatusModal()}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
    orgidJson: selectWizardOrgidJson(state),
    orgidUri: selectWizardOrgidUri(state),
    address: selectSignInAddress(state),
    orgInfo: selectItem(state)
  }
};

const mapDispatchToProps = {
  rewriteOrgidJson,
  sendChangeOrgidUriAndHashRequest,
  extendOrgidJson,
  saveOrgidUri,
  saveOrgidJsonToArbor,
  resetTransactionStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
