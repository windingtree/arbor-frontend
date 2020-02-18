import React, { useState } from 'react';
import history from '../../redux/history';
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Button, Typography, Stepper, StepConnector, Step, StepLabel } from "@material-ui/core";

import BgPattern from '../../assets/SvgComponents/wizard-pattern.svg';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';
import colors from '../../styles/colors';

import { WizardStep, WizardStepHosting, WizardStepMetaMask } from "./Components";
import { wizardConfig as legalEntity } from './config/legalEntity'
import { wizardConfig as entity} from './config/entity'

const styles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: colors.greyScale.moreLighter,
    paddingBottom: '160px'
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

const WizardGeneral = (props) => {
  const classes = styles();
  const [activeStep, setActiveStep] = useState(0);
  const locationType = history.location.state.type;
  const types = { legalEntity, entity };
  const wizardConfig = types[_.get(props, 'location.state.type', 'legalEntity')];

  function getSteps() {
    const steps = [];
    wizardConfig.map(step => steps.push(step.name));
    return steps;
  }

  const stepsContent = (stepIndex) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    switch (type) {
      case 'step': return <WizardStep data={content} handleNext={handleNext} key={content.name}/>;
      case 'step_hosting': return <WizardStepHosting data={content} handleNext={handleNext} key={content.name}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} handleNext={handleNext} key={stepIndex.name}/>;
      default: return (
        <div key={stepIndex.type}>Step <pre>${stepIndex.name}</pre> has unknown type: <pre>{stepIndex.type}</pre></div>
      );
    }
  };

  function StepStyle(props) {
    const icons = {};

    wizardConfig.forEach((stepsContent, stepIndex) => {
      icons[stepIndex+1] = stepsContent.icon;
    });

    return (
      <div>
        {icons[String(props.icon)]}
      </div>
    )
  }

  const steps = getSteps();

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
                  activeStep === 0 ? 'Back to all organizations' : 'Back to previous step'
                }
              </Typography>
            </Button>
          </div>
        </div>
      </Container>
      <Container className={classes.mainContent}>
        <Container maxWidth="sm" className={classes.formContainer}>
          <div className={classes.formContentWrapper}>
            <div>
              <Typography variant={'h2'} className={classes.formTitle}>
                {
                  locationType === 'legalEntity' ? 'Organization creating' : 'Sub-organization creating'
                }
              </Typography>
            </div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<StepperStyles/>}>
              {steps.map((label, index) => (
                <Step key={label} className={classes.stepItem}>
                  <StepLabel StepIconComponent={StepStyle}><p>{`${index + 1}.`}</p>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {
              stepsContent(activeStep)
            }
          </div>
        </Container>
      </Container>
    </div>
  )
};

export default WizardGeneral;
