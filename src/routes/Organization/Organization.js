import React, { useEffect } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  fetchOrganizationInfo,
  fetchOrganizationSubsInfo,
  selectItem,
  selectSubs,
  selectAssertions
} from '../../ducks/fetchOrganizationInfo';
import history from '../../redux/history';
import TopNavigation from "./Components/TopNavigation";
import Agents from "./Components/Agents";
import Info from "./Components/Info";
import SubOrganizations from './Components/SubOrganizations';
import ProofsList from '../../components/ProofsList';

function Organization (props) {
  const id = history.location.state ? history.location.state.id : history.location.pathname.split('/')[2];
  const canManage = history.location.pathname !== `/organization/${id}`;
  const { organization, subs, assertions } = props;
  const subsidiaries = _.get(organization, 'subsidiaries', []);
  const agents = _.get(organization, 'jsonContent.publicKey', []);
  const {
    owner,
    isLifProved,
    isSocialFBProved,
    isSocialIGProved,
    isSocialLNProved,
    isSocialTWProved,
    isSslProved,
    isWebsiteProved
  } = organization;
  const verifications = {
    domain: isWebsiteProved,
    ssl: isSslProved,
    lif: isLifProved,
    social: {
      facebook: isSocialFBProved,
      twitter: isSocialTWProved,
      linkedin: isSocialLNProved,
      instagram: isSocialIGProved
    }
  };

  useEffect(() => {
    props.fetchOrganizationInfo({ id });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    subsidiaries && subsidiaries.length && props.fetchOrganizationSubsInfo({ id });
  }, [id, subsidiaries]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log('@@@', id, assertions, verifications);

  return (
    <div>
      <TopNavigation organization={organization} canManage={canManage} />
      <Info organization={organization} canManage={canManage}/>
      <ProofsList
        title='Trust proofs'
        orgid={id}
        assertions={assertions}
        verifications={verifications}
      />
      {subsidiaries && subsidiaries.length > 0 && <SubOrganizations organization={organization} subs={subs} canManage={canManage} />}
      {canManage && <Agents owner={owner} agents={agents}/>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    organization: selectItem(state),
    subs: selectSubs(state),
    assertions: selectAssertions(state)
  }
};

const mapDispatchToProps = {
  fetchOrganizationInfo,
  fetchOrganizationSubsInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
