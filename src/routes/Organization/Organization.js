import React, { useEffect } from "react";
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
import { selectSignInAddress } from '../../ducks/signIn';
import history from '../../redux/history';
import TopNavigation from "./Components/TopNavigation";
import Directories from './Components/Directories';
import PublicDirectories from './Components/PublicDirectories';
import Agents from './Components/Agents';
import Owner from './Components/Owner';
import Personnel from './Components/Personnel';
import Services from "./Components/Services";
import Payments from "./Components/Payments";
import Info from "./Components/Info";
import SubOrganizations from './Components/SubOrganizations';
import ProofsList from '../../components/ProofsList';
import SimardAccounts from './Components/SimardAccounts';
import Gps from './Components/Gps';
import {
  DIRECTORIES_ENABLED, LIF_DEPOSIT_AMOUNT
} from '../../utils/constants';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import trustTopIllustration from '../../assets/SvgComponents/lif-deposit-illustration.svg';
import colors from "../../styles/colors";
import {selectLifDepositDataFetching, selectOrgIdLifDepositAmount} from "../../ducks/lifDeposit";

const styles = makeStyles({
  pageWrapper: {
    paddingBottom: '80px'
  },
  greyDiv: {
    width: '100%',
    backgroundColor: '#FAFBFC',
    paddingBottom: '80px',
    marginBottom: '50px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '30px'
    }
  },
  lifContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between'
  },
  grayTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: '#42424F',
    margin: '0 0 20px 0'
  },
  topSectionText: {
    color: '#5E666A',
    marginBottom: '19px',
    lineHeight: '28px'
  },
  topDiv: {
    backgroundColor: colors.greyScale.moreLighter
  },
  mainTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    margin: '107px 0 25px 0'
  },
  topText: {
    color: colors.greyScale.dark,
    marginBottom: '19px',
    lineHeight: '28px'
  },

  buttonWrapper: {
    marginRight: '20px',
    '&:last-child': {
      marginRight: '0'
    },
    marginBottom:'20px'
  },
  buttonStakeLif: {
    display: 'flex',
    alignContent: 'center',
    height: '44px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px'
  },
  buttonTitle: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    color: colors.primary.white,
    textTransform: 'none',
    padding: '4px 14px'
  },
});

export function Organization (props) {
  const classes = styles();
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
    resetOrgId,
    walletAddress,
    isFetchingDeposit,
    orgIdLifDepositAmount
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
  const showLifDepositSection = canManage && (isFetchingDeposit === false) && (orgIdLifDepositAmount < LIF_DEPOSIT_AMOUNT);

  // const classes = styles();

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
  }, [setOrgId, resetOrgId, orgId, walletAddress]);

  useEffect(() => {
    subsidiaries && subsidiaries.length && fetchOrganizationSubsInfo({ id: orgId });
  }, [orgId, subsidiaries, fetchOrganizationSubsInfo]);

  return (
    <div className={classes.pageWrapper}>
      <TopNavigation
        organization={organization}
        canManage={canManage}
      />
      <Info organization={organization} canManage={canManage} orgIdLifDepositAmount={orgIdLifDepositAmount}/>
      {subsidiaries && subsidiaries.length > 0 &&
        <div style={{ marginBottom: '30px' }}>
          <SubOrganizations organization={organization} subs={subs} canManage={canManage} />
        </div>
      }
      <ProofsList
        canManage={canManage}
        title='Trust assertions'
        orgid={orgId}
        assertions={assertions}
        verifications={verifications}
        organization={organization}
      />
      {showLifDepositSection &&
      <div className={classes.topDiv}>
        <Container className={classes.topDiv}>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.mainTitle} variant={'h1'}>Submit your Líf deposit</Typography>
              <Typography className={classes.topText}>Líf deposit is a small amount of cryptocurrency that
                is staked when you register your organization profile on Winding Tree Marketplace. This action minimizes
                spam registrations and proves the seriousness of your intentions.</Typography>
              <div className={classes.buttonWrapper}>
                <Button
                    className={classes.buttonStakeLif}
                    onClick={() => {history.push(`/my-organizations/${orgId}/lif-stake`, { id: orgId })}}>
                  <Typography variant={'inherit'} noWrap className={classes.buttonTitle}>
                    Submit Líf
                  </Typography>
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <img src={trustTopIllustration} alt={'illustration'}/>
            </Grid>
          </Grid>
        </Container>
      </div>
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
                  Líf deposit is a small amount of cryptocurrency that is staked when you register your organization profile on the Marketplace. This action minimizes spam registrations and proves your commitment to the cause.
                </Typography>
                <div style={{ marginTop: '30px'}}>
                  <SaveButton onClick={() => history.push(`/my-organizations/${orgId}/lif-stake`, { id: orgId })}>
                    Manage Líf Stake
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
      {DIRECTORIES_ENABLED && canManage &&
        <Directories />
      }
      {DIRECTORIES_ENABLED && !canManage &&
        <PublicDirectories />
      }
      <Gps
        canManage={canManage}
        organization={organization}
      />
      <Owner owner={owner} />
      {canManage &&
        <Personnel
          orgid={orgId}
        />
      }
      <Agents
        canManage={canManage}
        orgid={orgId}
        owner={owner}
        agents={agents}
      />
      <Services
        orgid={orgId}
        owner={owner}
        services={services}
        canManage={canManage}
      />
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


    </div>
  )
}

const mapStateToProps = state => {
  return {
    organization: selectItem(state),
    subs: selectSubs(state),
    assertions: selectAssertions(state),
    walletAddress: selectSignInAddress(state),
    isFetchingDeposit: selectLifDepositDataFetching(state),
    orgIdLifDepositAmount: selectOrgIdLifDepositAmount(state)
  }
};

const mapDispatchToProps = {
  fetchOrganizationInfo,
  fetchOrganizationSubsInfo,
  setOrgId,
  resetOrgId
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
