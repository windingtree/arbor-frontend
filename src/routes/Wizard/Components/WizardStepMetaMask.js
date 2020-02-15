import React from 'react';
import { connect } from "react-redux";
import { Container, Typography } from '@material-ui/core';

import { selectWizardOrgidJson } from '../../../ducks/wizard'


const WizardStep = (props) => {
  const { index, /*orgidJson,*/ data: { longName, description, cta } } = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }

  return (
    <Container  key={index}>
      <Typography variant={'h3'}>Step: {longName}</Typography>
      <div>{description}</div>
      <button type="submit">{cta}</button>
    </Container>
  )
};

const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state)
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
