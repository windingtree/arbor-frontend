import React from 'react';
import { Container } from "@material-ui/core";

import { WizardStep, WizardStepHosting, WizardStepMetaMask } from "./Components";
import { wizardConfig } from './config/legalEntity'

const WizardGeneral = () => {
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
