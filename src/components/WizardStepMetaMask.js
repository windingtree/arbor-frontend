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

// Component for a Wizard Step
const WizardStep = (props) => {
  // Gather context
  const inheritClasses = styles();
  const { index, orgidJson, orgidHash, orgidUri, address, parent, solt,
    data: { longName, description, cta }, 
    action, stepTitle = true } = props;
  console.log(`props: ${JSON.stringify(props)}`);

  // Define the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === 'edit') {
      props.sendChangeOrgidUriAndHashRequest({orgidUri, orgidHash, address, orgidJson});
    } else if(typeof orgidJson.legalEntity === 'object') {
      props.sendCreateLegalEntityRequest({orgidJson, orgidHash, orgidUri, address, solt});
    } else if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      props.sendCreateOrganizationalUnitRequest({orgidJson, orgidHash, orgidUri, address, parent, solt});
    } else {
      console.error('Something going wrong with MetaMask request', {orgidJson, orgidHash, orgidUri, address, solt, parent});
      console.log(typeof orgidJson.legalEntity, typeof orgidJson.organizationalUnit, parent.orgid);
    }
  };

  // The Wizard Step React component
  return (
    <form onSubmit={handleSubmit}>
      <div  key={index}>
        <Typography variant={'h3'} className={inheritClasses.stepTitle}>
          {stepTitle && `Step ${index+1}. `}
          {action === 'edit' ? 'Submit transaction fee' : longName}
        </Typography>
        <div className={inheritClasses.subtitleWrapper}>
          <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
            { action === 'edit' ? 'You need to submit an Ethereum transaction to pay the miners’ fee for every profile update or verification.' : description}
          </Typography>
          <Typography  className={inheritClasses.subtitle}>
            You can adjust the fee using gas fee's "edit" feature, which is available in Metamask popup window.
          </Typography>
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
