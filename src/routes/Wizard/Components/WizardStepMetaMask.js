import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';
import { ORGID_PROXY_ADDRESS, ORGID_ABI } from "../../../utils/constants";

import { selectWizardOrgidJson, selectWizardOrgidHash, selectWizardOrgidUri, setPendingStateToTransaction, fetchTransactionState } from '../../../ducks/wizard';
import { selectSignInAddress } from '../../../ducks/signIn';
import { styles } from './WizardStep';

const WizardStep = (props) => {
  const inheritClasses = styles();
  const { index, orgidJson, orgidHash, orgidUri, address, data: { longName, description, cta } } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const web3 = window.web3; // we signed in - so it should be already loaded
    const orgidAbi = web3.eth.contract(ORGID_ABI); // todo: load ABI on this step only from backend to optimize react size
    const orgidContract = orgidAbi.at(ORGID_PROXY_ADDRESS); // todo: can be loaded from back-end as well
    const orgidId = orgidJson.id.replace('did:orgid:', '');

    console.log(`orgidContract.createOrganization( ${orgidId}, ${orgidUri}, ${orgidHash}, {from: ${address}`); // todo: remove debug lines
    Object.assign(window, { orgidAbi, orgidContract, orgidId, address }); // for in-browser debug purposes // todo: remove debug lines

    orgidContract.createOrganization(
      orgidId,
      orgidUri,
      orgidHash,
      {
        from: address,
        gas: 500000,
        gasPrice: web3.toWei("10", "gwei"), // todo: calculate gwei
      },
      (err, data) => {
        // todo: set waiting state => maybe redirect to next screen
        props.setPendingStateToTransaction(data);
        console.log(err, data);
        setTimeout(() => {
          props.fetchTransactionState(data);
        }, 4000);
      }
    )

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
  setPendingStateToTransaction,
  fetchTransactionState
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
