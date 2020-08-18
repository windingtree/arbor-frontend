import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';

import {
  selectWizardOrgidJson,
  selectWizardOrgidHash,
  selectWizardOrgidUri,
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
  selectPendingState,
  selectError
} from '../ducks/wizard';
import { selectSignInAddress } from '../ducks/signIn';
import { styles } from './WizardStep';

// Component for a Wizard Step
const WizardStep = (props) => {
  // Gather context
  const inheritClasses = styles();
  const {
    index, orgidJson, orgidHash, orgidUri, address, parent, solt,
    data: { longName, description, cta },
    action, stepTitle = true,
    sendChangeOrgidUriAndHashRequest,
    sendCreateLegalEntityRequest,
    sendCreateOrganizationalUnitRequest,
    pendingTransaction,
    error
  } = props;
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (error) {
      setStarted(false);
    }
  }, [error]);

  // Define the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStarted(true);

    if (action === 'edit') {
      sendChangeOrgidUriAndHashRequest({orgidUri, orgidHash, address, orgidJson});
    } else if(typeof orgidJson.legalEntity === 'object') {
      sendCreateLegalEntityRequest({orgidJson, orgidHash, orgidUri, address, solt});
    } else if (typeof orgidJson.organizationalUnit === 'object' && parent.orgid) {
      sendCreateOrganizationalUnitRequest({orgidJson, orgidHash, orgidUri, address, parent, solt});
    } else {
      setStarted(false);
      console.error('Something going wrong with request', {orgidJson, orgidHash, orgidUri, address, solt, parent});
      console.log(typeof orgidJson.legalEntity, typeof orgidJson.organizationalUnit, parent.orgid);
    }
  };

  // The Wizard Step React component
  return (
    <form onSubmit={handleSubmit}>
      <div key={index}>
        <Typography variant={'h3'} className={inheritClasses.stepTitle}>
          {stepTitle && `Step ${index+1}. `}
          {action === 'edit' ? 'Saving to blockchain...' : longName}
        </Typography>
        <div className={inheritClasses.subtitleWrapper}>
          <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>
            { action === 'edit' ? 'In order to save your company data, a blockchain transaction is required. Please confirm it in your wallet.' : description}
          </Typography>
        </div>
        <div className={inheritClasses.buttonWrapper}>
          <Button
            type="submit"
            className={inheritClasses.button}
            disabled={pendingTransaction || started}
          >
            <Typography
              variant={'caption'}
              className={inheritClasses.buttonLabel}
            >
              {action === 'edit' ? 'Generate Transaction' : cta}
            </Typography>
          </Button>
        </div>
        {error &&
          <div className={inheritClasses.errorWrapper}>
            <Typography className={inheritClasses.error}>
              {error.message ? error.message : 'Unknown error'}
            </Typography>
          </div>
        }
      </div>
    </form>
  )
};

const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state),
    orgidHash: selectWizardOrgidHash(state),
    orgidUri: selectWizardOrgidUri(state),
    address: selectSignInAddress(state),
    pendingTransaction: selectPendingState(state),
    error: selectError(state)
  }
};

const mapDispatchToProps = {
  sendChangeOrgidUriAndHashRequest,
  sendCreateLegalEntityRequest,
  sendCreateOrganizationalUnitRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
