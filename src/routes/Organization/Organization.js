import React, { useEffect, useRef } from "react";
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
  const { organization, subs, assertions, fetchOrganizationSubsInfo, fetchOrganizationInfo } = props;
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

  const proofsRef = useRef(null);

  useEffect(() => {
    fetchOrganizationInfo({ id });
  }, [id, fetchOrganizationInfo]);

  useEffect(() => {
    subsidiaries && subsidiaries.length && fetchOrganizationSubsInfo({ id });
  }, [id, subsidiaries, fetchOrganizationSubsInfo]);

  return (
    <div>
      <TopNavigation
        organization={organization}
        canManage={canManage}
        scrollToRef={() => proofsRef.current.scrollIntoView({behavior: 'smooth'})}
      />
      <Info organization={organization} canManage={canManage}/>
      {subsidiaries && subsidiaries.length > 0 && <SubOrganizations organization={organization} subs={subs} canManage={canManage} />}
      {canManage && <Agents owner={owner} agents={agents}/>}
      <div ref={proofsRef} />
      <ProofsList
        canManage={canManage}
        title='Trust proofs'
        orgid={id}
        assertions={assertions}
        verifications={verifications}
      />
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
