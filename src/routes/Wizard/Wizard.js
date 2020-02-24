import React, { useState, useEffect } from 'react';
import history from '../../redux/history';
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Button, Typography, Stepper, StepConnector, Step, StepLabel } from "@material-ui/core";

import BgPattern from '../../assets/SvgComponents/wizard-pattern.svg';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';
import colors from '../../styles/colors';

import { selectWizardOrgidJson } from '../../ducks/wizard'

import { WizardStep, WizardStepHosting, WizardStepMetaMask } from "./Components";
import { wizardConfig as legalEntity } from './config/legalEntity'
import { wizardConfig as organizationalUnit} from './config/organizationalUnit'
import { connect } from "react-redux";
import { rewriteOrgidJson } from "../../ducks/wizard";

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
  formSubtitle: {
    position: 'relative',
    top: '10px',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.common,
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

const WizardGeneral = (props) => {
  const { rewriteOrgidJson } = props;
  const legalName =  _.get(props, 'orgidJson.legalEntity.legalName', 'owner');
  const classes = styles();
  const [activeStep, setActiveStep] = useState(0);
  const wizardType = _.get(history, 'location.state.type', 'legalEntity');
  const action = _.get(history, 'location.state.action', 'create');
  const jsonContent = _.get(history, 'location.state.jsonContent', {});
  const id = _.get(history, 'location.state.id', null);
  const actionLabel = (action === 'create') ? 'Create' : 'Edit';
  const types = { legalEntity, organizationalUnit };
  const wizardConfig = types[wizardType];


  useEffect(() => {
    if(id) {
      rewriteOrgidJson(jsonContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const stepsContent = (stepIndex) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    switch (type) {
      case 'step': return <WizardStep data={content} action={action} handleNext={handleNext} key={stepIndex} index={stepIndex}/>;
      case 'step_hosting': return <WizardStepHosting data={content} action={action} handleNext={handleNext} key={stepIndex} index={stepIndex}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} action={action} handleNext={handleNext} key={stepIndex} index={stepIndex}/>;
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
                  `${actionLabel} ${wizardType === 'legalEntity' ? 'an organization' : 'a sub-organization'} profile`
                }
              </Typography>
              {
                wizardType !== 'legalEntity' ? (
                  <Typography variant={'caption'} className={classes.formSubtitle}>Operated by: {legalName}</Typography>
                ) : null
              }
            </div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<StepperStyles/>}>
              {steps.map((label, index) => (
                <Step key={index} className={classes.stepItem}>
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

const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state),
  }
};

const mapDispatchToProps = {
  rewriteOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardGeneral);
