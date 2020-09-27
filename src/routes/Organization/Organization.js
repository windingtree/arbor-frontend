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
  startPolling,
  stopPolling,
  isPolling,
  orgDirectoriesFetched,
  orgDirectories
} from '../../ducks/directories';
import history from '../../redux/history';
import TopNavigation from "./Components/TopNavigation";
import Directories from './Components/Directories';
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
    startPolling,
    stopPolling,
    isPolling,
    orgDirectoriesFetched,
    orgDirectories
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
      startPolling(orgId);
    } else if (!orgId && isPolling) {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling, isPolling, orgId]);

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
      {/* {canManage &&
        <div className={classes.greyDiv}>
          <Container className={classes.lifContent}>
            <Grid container alignItems={'center'}>
              <Grid item xs={6}>
                <Typography className={classes.grayTitle} variant={'h1'}>
                  Submit your Líf deposit
                </Typography>
                <Typography className={classes.topSectionText}>
                  Líf deposit is a small amount of cryptocurrency that is staked when you register your organization profile on Winding Tree Marketplace.
                  This action minimizes spam registrations and proves your commitment to the cause.
                </Typography>
                <div style={{ marginTop: '30px'}}>
                  <SaveButton onClick={() => history.push({
                      pathname: '/trust/lif-stake',
                      state: {
                        orgid: orgId
                      }
                    })}>
                    Submit Líf
                  </SaveButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <img src={trustLifDeposit} alt={'Lif Deposit'} />
              </Grid>
            </Grid>
          </Container>
        </div>
      } */}
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
    assertions: selectAssertions(state),
    isPolling: isPolling(state)
  }
};

const mapDispatchToProps = {
  fetchOrganizationInfo,
  fetchOrganizationSubsInfo,
  startPolling,
  stopPolling
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
