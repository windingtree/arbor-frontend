import React, { useEffect, useRef } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
// import { Container, Typography, Grid } from '@material-ui/core';
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
// import SaveButton from '../../components/buttons/Save';
// import { makeStyles } from '@material-ui/core/styles';
// import trustLifDeposit from '../../assets/SvgComponents/trust-lif-deposit.svg';

// const styles = makeStyles({
//   greyDiv: {
//     width: '100%',
//     backgroundColor: '#FAFBFC',
//     paddingTop: '80px',
//     paddingBottom: '80px',
//     marginBottom: '50px',
//     ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
//       paddingBottom: '30px'
//     }
//   },
//   lifContent: {
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'space-between'
//   },
//   grayTitle: {
//     fontSize: '40px',
//     fontWeight: 500,
//     lineHeight: 1.14,
//     color: '#42424F',
//     margin: '0 0 20px 0'
//   },
//   topSectionText: {
//     color: '#5E666A',
//     marginBottom: '19px',
//     lineHeight: '28px'
//   }
// });

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
  // const classes = styles();

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
      {subsidiaries && subsidiaries.length > 0 &&
        <div style={{ marginBottom: '30px' }}>
          <SubOrganizations organization={organization} subs={subs} canManage={canManage} />
        </div>
      }
      {canManage && 
        <Agents
          orgid={id}
          owner={owner}
          agents={agents}
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
                  Líf deposit is a small amount of cryptocurrency that is staked when you register your organization profile on Arbor. 
                  This action minimizes spam registrations and proves your commitment to the cause.
                </Typography>
                <div style={{ marginTop: '30px'}}>
                  <SaveButton onClick={() => history.push({
                      pathname: '/trust/lif-stake',
                      state: {
                        orgid: id
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
