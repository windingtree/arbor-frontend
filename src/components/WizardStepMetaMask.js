import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';

import { selectWizardOrgidJson, selectWizardOrgidHash, selectWizardOrgidUri, sendCreateLegalEntityRequest, sendCreateOrganizationalUnitRequest, setPendingStateToTransaction, fetchTransactionState } from '../ducks/wizard';
import { selectSignInAddress } from '../ducks/signIn';
import { styles } from './WizardStep';

const WizardStep = (props) => {
  const inheritClasses = styles();
  const { index, orgidJson, orgidHash, orgidUri, address, parent, data: { longName, description, cta } } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(typeof orgidJson.legalEntity === 'object') {
      props.sendCreateLegalEntityRequest({orgidJson, orgidHash, orgidUri, address});
    } if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      props.sendCreateOrganizationalUnitRequest({orgidJson, orgidHash, orgidUri, address, parent});
    } else {
      console.error('Something going wrong with MetaMask request', {orgidJson, orgidHash, orgidUri, address, parent})
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
  setPendingStateToTransaction,
  fetchTransactionState
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
