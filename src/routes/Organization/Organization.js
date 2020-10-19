import React, { useEffect, useRef } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchOrganizationInfo,
  fetchOrganizationSubsInfo,
  selectItem,
  selectSubs,
  selectAssertions
} from '../../ducks/fetchOrganizationInfo';
import {
  setOrgId,
  resetOrgId
} from '../../ducks/directories';
import history from '../../redux/history';
import TopNavigation from "./Components/TopNavigation";
import Directories from './Components/Directories';
import PublicDirectories from './Components/PublicDirectories';
import Agents from "./Components/Agents";
import Services from "./Components/Services";
import Payments from "./Components/Payments";
import Info from "./Components/Info";
import SubOrganizations from './Components/SubOrganizations';
import ProofsList from '../../components/ProofsList';
import SimardAccounts from './Components/SimardAccounts';

function Organization (props) {
  const { orgId } = useParams();
  // const orgId = history.location.state ? history.location.state.orgId : history.location.pathname.split('/')[2];
  const canManage = history.location.pathname !== `/organization/${orgId}`;
  const {
    organization,
    subs,
    assertions,
    fetchOrganizationSubsInfo,
    fetchOrganizationInfo,
    setOrgId,
    resetOrgId
  } = props;
  const subsidiaries = _.get(organization, 'subsidiaries', []);
  const agents = _.get(organization, 'jsonContent.publicKey', []);
  const services = _.get(organization, 'jsonContent.service', []);
  const payments = _.get(organization, 'jsonContent.payment', []);
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
  // const classes = styles();

  const proofsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0)
}, []);

  useEffect(() => {
    fetchOrganizationInfo({ id: orgId });
  }, [orgId, fetchOrganizationInfo]);

  useEffect(() => {
    if (orgId) {
      setOrgId(orgId);
    }

    return () => {
      resetOrgId();
    };
  }, [setOrgId, resetOrgId, orgId]);

  useEffect(() => {
    subsidiaries && subsidiaries.length && fetchOrganizationSubsInfo({ id: orgId });
  }, [orgId, subsidiaries, fetchOrganizationSubsInfo]);

  return (
    <div>
      <TopNavigation
        organization={organization}
        canManage={canManage}
        scrollToRef={() => proofsRef.current.scrollIntoView({behavior: 'smooth'})}
      />
      <Info organization={organization} canManage={canManage}/>
      {subsidiaries && subsidiaries.length > 0 &&
        <div style={{ marginBottom: '30px' }}>
          <SubOrganizations organization={organization} subs={subs} canManage={canManage} />
        </div>
      }
      {canManage &&
        <Directories />
      }
      {!canManage &&
        <PublicDirectories />
      }
      {canManage &&
        <Agents
          orgid={orgId}
          owner={owner}
          agents={agents}
        />
      }
      {canManage &&
        <Services
          orgid={orgId}
          owner={owner}
          services={services}
        />
      }
      {canManage &&
        <SimardAccounts
          orgid={orgId}
        />
      }
      {canManage &&
        <Payments
          orgid={orgId}
          owner={owner}
          payments={payments}
        />
      }
      <div ref={proofsRef} />
      <ProofsList
        canManage={canManage}
        title='Get Verified'
        orgid={orgId}
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
  fetchOrganizationSubsInfo,
  setOrgId,
  resetOrgId
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
