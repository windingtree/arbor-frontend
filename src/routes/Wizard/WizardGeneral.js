import React from 'react';
import { Container } from "@material-ui/core";

import { WizardStep } from "./Components";
import { wizardConfig } from './config/legalEntity'

const WizardGeneral = () => {
  const steps = wizardConfig.map((step, index) => {
    return (
      <WizardStep data={step} key={index}/>
    )
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
