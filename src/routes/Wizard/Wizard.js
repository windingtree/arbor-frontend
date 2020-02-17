import React from 'react';
import history from '../../redux/history';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Typography } from "@material-ui/core";

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
    padding: '80px'
  },
  formTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest
  }
});

const WizardGeneral = (props) => {
  const classes = styles();
  const currentStep = history.location.pathname;
  const locationType = history.location.state;
  const types = { legalEntity, entity };
  const wizardConfig = types[_.get(props, 'location.state.type', 'legalEntity')];

  const steps = wizardConfig.map((step, index) => {
    switch (step.type) {
      case 'step': return (
        <WizardStep data={step} key={index}/>
      );
      case 'step_hosting': return (
        <WizardStepHosting data={step} key={index}/>
      );
      case "step_metamask": return (
        <WizardStepMetaMask data={step} key={index}/>
      );
      default: return (
        <div key={index}>Step <pre>${step.name}</pre> has unknown type: <pre>{step.type}</pre></div>
      );
    }
  });

  return (
    <div className={classes.mainContainer}>
      <Container>
        <div className={classes.screenHeading}>
          <div className={classes.buttonWrapper}>
            <Button onClick={history.goBack}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                {
                  currentStep !== '/my-organizations/wizard' ? (
                    'Back to previous step'
                  ) : (
                    'Back to all organizations'
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

            {steps}

          </div>
        </Container>
      </Container>
    </div>
  )
};

export default WizardGeneral;
