import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Container,
  Button,
  Typography,
  Stepper,
  StepConnector,
  Step,
  StepLabel,
  Grid,
  CircularProgress
} from "@material-ui/core";

import history from '../redux/history';
import { rewriteOrgidJson, selectPendingState, selectSuccessState } from "../ducks/wizard";
import { selectSignInAddress } from '../ducks/signIn';

import { WizardStep, WizardStepHosting, WizardStepMetaMask } from "../components";
import { wizardConfig as legalEntity } from '../utils/legalEntity'
import { wizardConfig as organizationalUnit} from '../utils/organizationalUnit'

import { generateSolt, createIdWithSolt } from "../utils/helpers";

import BgPattern from '../assets/SvgComponents/wizard-pattern.svg';
import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import PendingTransactionIllustration from '../assets/SvgComponents/org-creation-illustration.svg';
import SuccessTransactionIllustration from '../assets/SvgComponents/detailsIllustration.svg';
import colors from '../styles/colors';


const styles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: colors.greyScale.moreLighter,
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
  mainContent: {
    background: `top no-repeat url(${BgPattern})`,
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
  pendingContentWrapper: {
    padding: '46px 80px 80px'
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
  progress: {
    marginLeft: '20px',
  }
});

const StepperStyles = withStyles({
  alternativeLabel: {
    color: colors.greyScale.common,
  },
  active: {
    color: colors.primary.white
  },
  completed: {
    color: colors.primary.white
  },
  line: {
    display: 'none'
  }
})(StepConnector);

const useStepStyles = makeStyles({
  root: {
    color: colors.greyScale.common
  },
  stepIcon: {
    width: '22px',
    height: '22px',
    fontSize: 'inherit'
  },
  active: {
    color: colors.primary.white
  },
  completed: {
    color: colors.primary.white
  },
});

const skeletons = {
  'legalEntity': {
    'contacts': [],
    'locations': []
  },
  'organizationalUnit': {
    'address': {},
    'media': {'logo':''},
    'type': [],
    'contacts': [],
    'description': ''
  }
};

const WizardGeneral = (props) => {
  const {
    pendingTransaction,
    successTransaction,
    address,
    rewriteOrgidJson
  } = props;
  const classes = styles();
  const [activeStep, setActiveStep] = useState(0);
  const [solt, setSolt] = useState();
  const wizardType = _.get(history, 'location.state.type', 'legalEntity');
  const action = _.get(history, 'location.state.action', 'create');
  const jsonContent = _.get(history, 'location.state.jsonContent', {});
  const id = _.get(history, 'location.state.id', null);
  const parent =  _.get(history, 'location.state.parent', {});
  const actionLabel = (action === 'create') ? 'Create' : 'Edit';
  const types = { legalEntity, organizationalUnit };
  const wizardConfig = types[wizardType];

  useEffect(() => {
    if(id) {
      rewriteOrgidJson(jsonContent)
    }
  }, [id, rewriteOrgidJson, jsonContent]);

  useEffect(() => {
    const idSolt = generateSolt();
    setSolt(idSolt);
    rewriteOrgidJson({
      id: createIdWithSolt(address, idSolt),
      created: new Date().toJSON(),
      [wizardType]: skeletons[wizardType]
    })
  }, [wizardType, address, rewriteOrgidJson]);

  // console.log('@@@@@@@@@@@@@@@', solt);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const stepsContent = (stepIndex, parent) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    switch (type) {
      // One of the initial steps
      case 'step':
        return (
          <WizardStep
            data={content}
            action={action}
            handleNext={handleNext}
            key={stepIndex}
            index={stepIndex}/>
        );

      // Hosting step
      case 'step_hosting':
        return (
          <WizardStepHosting
            data={content}
            action={action}
            handleNext={handleNext}
            key={stepIndex}
            index={stepIndex}/>
        );

      // Transaction sending step
      case 'step_metamask':
        return (
          <WizardStepMetaMask
            data={content}
            action={action}
            handleNext={handleNext}
            key={stepIndex}
            index={stepIndex}
            parent={parent}
            solt={solt}
          />
        );

      // Default Step - Should not happen
      default: return (
        <div key={stepIndex}>Step <pre>${content.name}</pre> has unknown type: <pre>{content.type}</pre></div>
      );
    }
  };

  function StepStyle(props) {
    const icons = {};
    const classes = useStepStyles();
    const { active, completed } = props;

    wizardConfig.forEach((stepsContent, stepIndex) => {
      icons[stepIndex+1] = stepsContent.icon;
    });

    return (
      <div className={[classes.root, active ? classes.active: null, completed ? classes.completed : null].join(' ')}>
        {icons[String(props.icon)]({})}
      </div>
    )
  }

  const steps = wizardConfig.map(step => step.name);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className={classes.mainContainer}>
      <Container>
        <div className={classes.screenHeading}>
          <div className={classes.buttonWrapper}>
            <Button onClick={activeStep === 0 ? history.goBack : handleBack}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                {
                  activeStep === 0 ? 'My Companies' : 'Previous Step'
                }
              </Typography>
            </Button>
          </div>
        </div>
      </Container>
      <Container className={classes.mainContent}>
        <Container maxWidth="sm" className={classes.formContainer}>
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
            ) : (
              <div className={classes.formContentWrapper}>
                <div>
                  <Typography variant={'h2'} className={classes.formTitle}>
                    {
                      `${actionLabel} ${wizardType === 'legalEntity' ? 'Company Account' : 'a sub-organization'}`
                    }
                  </Typography>
                  {
                    wizardType !== 'legalEntity' ? (
                      <Typography variant={'caption'} className={classes.formSubtitle}>Operated by: {parent.name}</Typography>
                    ) : null
                  }
                </div>
                <Stepper alternativeLabel activeStep={activeStep} connector={<StepperStyles/>}>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel StepIconComponent={StepStyle}><p>{`${index + 1}.`}</p>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {stepsContent(activeStep, parent)}
              </div>
            )
          }
        </Container>
      </Container>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {
  rewriteOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardGeneral);
