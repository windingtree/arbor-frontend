import React, { useState, useEffect } from 'react';
import history from '../redux/history';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Button
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
  selectWizardOrgidUri, saveOrgidUri, saveOrgidJsonToArbor
} from "../ducks/wizard";

import { Section, WizardStepMetaMask } from "../components";
import ArrowLeftIcon from "../assets/SvgComponents/ArrowLeftIcon";
import DialogComponent from '../components/Dialog';
import WizardStepHosting from '../components/WizardStepHosting';
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
});

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
  const { pendingTransaction, successTransaction } = props;
  const [isModalOpen, toggleModalOpenState] = useState(false);
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
    if(orgid) {
      props.rewriteOrgidJson(jsonContent)
    }
  }, [orgid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const validators = {};

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
                    <Typography variant={'h3'} className={classes.pendingTitle}>Almost there!</Typography>
                    <Typography variant={'subtitle2'} className={classes.pendingSubtitle}>Creating your organization profile might take some time. You can wait here or add another organization in the meantime. We will let you know once everything is ready. </Typography>
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
                    <Typography variant={'h3'} className={classes.pendingTitle}>Your organization profile is live!</Typography>
                    <Typography variant={'subtitle2'} className={classes.pendingSubtitle}>Your organization is already in our registry and can be discovered by other community members. Now you can create another organization profile or go ahead and  improve your trust level.</Typography>
                  </div>
                  <Grid container justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
                    <Grid item lg={6}>
                      <Button className={[classes.pendingButton, classes.successButton].join(' ')} onClick={() => history.push('/trust/general')}>
                        <Typography variant={'caption'} className={[classes.pendingButtonLabel, classes.successButtonLabel].join(' ')}>Improve trust level</Typography>
                      </Button>
                    </Grid>
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

  return (
    <div className={classes.mainContainer}>
      <div>
        <Formik
          initialValues={Object.assign({}, props.orgidJson)}
          enableReinitialize={true}
          validate={values => {
            const errors = {};
            _.each(validators, (validator, orgidJsonPath) => {
              const value = _.get(values, orgidJsonPath, false);
              if (value !== false) {
                const {error} = validator.validate(value);
                if (error) {
                  _.set(errors, orgidJsonPath, error.toString());
                }
              }
            });
            if (!_.isEmpty(errors)) console.log('ERRORS', errors);
            return errors;
          }}
          onSubmit={(values) => {
            console.log('onSubmit', values);
            props.extendOrgidJson(values);
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
                        Every profile change requires an Ethereum transaction. Make sure to have at least 0.1 Ether in your MetaMask account before you save your changes and update your profile.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm={3} className={classes.editButtonContainer}>
                    <Button type="submit" disabled={isSubmitting} onClick={handleOpenModal} className={classes.editButton}>
                      <Typography variant={'caption'} className={classes.editButtonLabel}>{'Save and Update'}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Container>

              <Container>
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  indicatorColor='primary'
                  textColor="primary"
                >
                  {_.map(editConfig, (tab, index) => <Tab key={index} label={tab.name}/>)}
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
              {setDialog()}
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
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {
  rewriteOrgidJson,
  sendChangeOrgidUriAndHashRequest,
  extendOrgidJson,
  saveOrgidUri,
  saveOrgidJsonToArbor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
