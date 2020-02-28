import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';

import {
  selectWizardOrgidJson,
  selectWizardOrgidHash,
  selectWizardOrgidUri,
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest
} from '../ducks/wizard';
import { selectSignInAddress } from '../ducks/signIn';
import { styles } from './WizardStep';

const WizardStep = (props) => {
  const inheritClasses = styles();
  const { index, orgidJson, orgidHash, orgidUri, address, parent, data: { longName, description, cta }, action, stepTitle = true } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === 'edit') {
      props.sendChangeOrgidUriAndHashRequest({orgidUri, orgidHash, address, orgidJson});
    } else if(typeof orgidJson.legalEntity === 'object') {
      props.sendCreateLegalEntityRequest({orgidJson, orgidHash, orgidUri, address});
    } else if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      props.sendCreateOrganizationalUnitRequest({orgidJson, orgidHash, orgidUri, address, parent});
    } else {
      console.error('Something going wrong with MetaMask request', {orgidJson, orgidHash, orgidUri, address, parent});
      console.log(typeof orgidJson.legalEntity, typeof orgidJson.organizationalUnit, parent.orgid);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div  key={index}>
        <Typography variant={'h3'} className={inheritClasses.stepTitle}>
          {stepTitle && `Step ${index+1}:`}
          {action === 'edit' ? 'Submit transaction fee' : longName}
        </Typography>
        <div className={inheritClasses.subtitleWrapper}>
          <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>{description}</Typography>
        </div>
        <div className={inheritClasses.buttonWrapper}>
          <Button type="submit" className={inheritClasses.button}>
            <Typography variant={'caption'} className={inheritClasses.buttonLabel}>{action === 'edit' ? 'Confirm' : cta}</Typography>
          </Button>
        </div>
      </div>
    </form>
  )
};

const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state),
    orgidHash: selectWizardOrgidHash(state),
    orgidUri: selectWizardOrgidUri(state),
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
