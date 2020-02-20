import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';

import { selectWizardOrgidJson } from '../../../ducks/wizard'
import { styles } from './WizardStep';

const WizardStep = (props) => {
  const inheritClasses = styles();
  const { index, /*orgidJson,*/ data: { longName, description, cta } } = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }

  return (
    <div  key={index}>
      <Typography variant={'h3'} className={inheritClasses.stepTitle}>Step {index+1}: {longName}</Typography>
      <div className={inheritClasses.subtitleWrapper}>
        <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>{description}</Typography>
      </div>
      <div className={inheritClasses.buttonWrapper}>
        <Button type="submit" className={inheritClasses.button}>
          <Typography variant={'caption'} className={inheritClasses.buttonLabel}>{cta}</Typography>
        </Button>
      </div>
    </div>
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
