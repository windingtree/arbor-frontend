import React, { useState } from 'react';
import history from '../../redux/history';
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Button, Typography, Stepper, StepConnector, Step, StepLabel } from "@material-ui/core";

import BgPattern from '../../assets/SvgComponents/wizard-pattern.svg';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';
import StepperGeneralIcon from '../../assets/SvgComponents/StepperGeneralIcon';
import StepperDetailsIcon from '../../assets/SvgComponents/StepperDetailsIcon';
import StepperHostingIcon from '../../assets/SvgComponents/StepperHostingIcon';
import StepperMetaMaskIcon from '../../assets/SvgComponents/StepperMetaMaskIcon';
import colors from '../../styles/colors';

import { WizardStep, WizardStepDetails, WizardStepHosting, WizardStepMetaMask } from "./Components";
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

  const stepsContent = (step) => {
    let content;
    wizardConfig.map((item, index) => {
      if ( step === index ) return content = item;
    });

    switch (step) {
      case 0: return (
        <WizardStep data={content} handleNext={handleNext} key={content.name}/>
      );
      case 1:
        if(content.type === 'step') {
          return (
            <WizardStepDetails data={content} handleNext={handleNext} key={content.name}/>
          )
        } else {
          return (
            <WizardStepHosting data={content} handleNext={handleNext} key={content.name}/>
          );
        }
      case 2:
        if(content.type === 'step_hosting') {
          return (
            <WizardStepHosting data={content} handleNext={handleNext} key={content.name}/>
          )
        } else {
          return (
            <WizardStepMetaMask data={content} handleNext={handleNext} key={step.name}/>
          );
        }
      case 3: return (
        <WizardStepMetaMask data={content} handleNext={handleNext} key={step.name}/>
      );
      default: return (
        <div key={step.type}>Step <pre>${step.name}</pre> has unknown type: <pre>{step.type}</pre></div>
      );
    }
  };

  function StepStyle(props) {
    const classes = useStepStyles();
    const { active, completed } = props;

    let icons;
    if(wizardConfig.length === 3) {
      icons = {
        1: <StepperGeneralIcon viewBox={'0 0 22 20'} className={classes.stepIcon}/>,
        2: <StepperHostingIcon viewBox={'0 0 24 24'} className={classes.stepIcon}/>,
        3: <StepperMetaMaskIcon viewBox={'0 0 24 24'} className={classes.stepIcon}/>
      }
    } else {
      icons = {
        1: <StepperGeneralIcon viewBox={'0 0 22 20'} className={classes.stepIcon}/>,
        2: <StepperDetailsIcon viewBox={'0 0 20 18'} className={classes.stepIcon}/>,
        3: <StepperHostingIcon viewBox={'0 0 24 24'} className={classes.stepIcon}/>,
        4: <StepperMetaMaskIcon viewBox={'0 0 24 24'} className={classes.stepIcon}/>
      }
    }

    return (
      <div className={[classes.root, active ? classes.active: null, completed ? classes.completed : null].join(' ')}>
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
                  activeStep === 0 ? (
                    'Back to all organizations'

                  ) : (
                    'Back to previous step'
                  )
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
                  locationType === 'legalEntity' ? (
                    'Organization creating'
                  ) : (
                    'Sub-organization creating'
                  )
                }
              </Typography>
            </div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<StepperStyles/>}>
              {steps.map((label, index) => (
                <Step key={label}
                      className={classes.stepItem}
                >
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
