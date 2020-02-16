import React from 'react';
import { Container } from "@material-ui/core";
import _ from 'lodash';

import { WizardStep, WizardStepHosting, WizardStepMetaMask } from "./Components";
import { wizardConfig as legalEntity } from './config/legalEntity'
import { wizardConfig as entity} from './config/entity'

const WizardGeneral = (props) => {
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
    <div>
      <h1>WizardGeneral</h1>

      <Container maxWidth="sm">
        {steps}
      </Container>
    </div>
  )
};

export default WizardGeneral;
