import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../redux/history';
import { useParams } from 'react-router-dom';
import { Container, Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchOrganizationInfo,
  isOrgInfoFetching,
  selectItem
} from '../../ducks/fetchOrganizationInfo';
import {
  setOrgId,
  resetOrgId,
  isIndexFetching,
  isOrgDirectoriesFetching,
  directories,
  orgDirectories,
  indexError,
  statsError,
  orgError
} from '../../ducks/directories';
import { selectWeb3, selectSignInAddress } from '../../ducks/signIn';
import {
  getChallengeInfo
} from '../../ducks/utils/ethereum';
import {
  setRandomDefaultImage,
  strCenterEllipsis
} from '../../utils/helpers';
import CopyTextComponent from '../../components/CopyTextComponent';
import LinkIcon from '../../assets/SvgComponents/link.svg';
import CloseIcon from '../../assets/SvgComponents/mobile-menu-icon-close.svg';
import colors from '../../styles/colors';

const styles = makeStyles({
  pageContainer: {
    margin: '20px 0 20px 0'
  },
  pageHeader: {
    margin: '64px 0 32px 0'
  },
  pageOrgInfoContatiner: {
    marginBottom: '32px'
  },
  challengeTitle: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px',
    whiteSpace: 'nowrap'
  },
  challengeStatusLabel: {
    display: 'block',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '14px',
    backgroundColor: '#EFEFEF',
    color: '#5E666A',
    padding: '4px 6px',
    borderRadius: '4px',
    '&.resolved': {
      backgroundColor: '#98CCB0',
      color: 'white'
    }
  },
  closeButton: {
    padding: '4px',
    borderRadius: '50%',
    minWidth: 'auto',
    '& .MuiButton-label > .MuiSvgIcon-root': {
      fill: colors.greyScale.common
    }
  },
  orgImageContainer: {
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '20px',
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '10px',
    }
  },
  orgImageWrapper: {
    position: 'relative',
    width: '220px',
    height: '100px',
    overflow: 'hidden',
    borderRadius: '6px',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      height: '290px'
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      height: '180px'
    }
  },
  orgImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  },
  orgInfoContainer: {},
  orgName: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px'
  },
  orgDirName: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '22px'
  }
});

const fetchChallengeInfo = async (web3, directory, orgId, challengeId) => {
  const challenge = await getChallengeInfo(
    web3,
    directory.address,
    orgId,
    challengeId
  );
  console.log('Challenge', challenge);

  return {
    challengeId,
    orgId,
    ...challenge
  };
};

const ChallengeHeader = props => {
  const classes = styles();
  const {
    walletAddress,
    isFetching,
    challenge
  } = props;
  const loaded = challenge && !isFetching;

  if (!loaded) {
    return (
      <CircularProgress
        size='24px'
      />
    );
  }

  return (
    <Container>
      <Grid container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <Grid container
            direction='row'
            justify='flex-start'
            alignItems='center'
            spacing={3}
          >
            <Grid item>
              <Typography noWrap className={classes.challengeTitle}>
                Challenge from&nbsp;
                <CopyTextComponent
                  title='Address copied to clipboard'
                  text={challenge.challenger}
                  label={strCenterEllipsis(challenge.challenger.split('x')[1])}
                  color='#42424F'
                  fontWeight='500'
                  fontSize='24px'
                />
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.challengeStatusLabel + ` ${challenge.resolved ? 'resolved' : ''}`}>
                {challenge.resolved ? 'resolved' : 'not resolved'}
              </Typography>
            </Grid>
            <Grid item>
              <CopyTextComponent
                title='Link copied to clipboard'
                text={window.location.href}
                label='Copy link'
                color='#3E9693'
                fontWeight={500}
                textDecoration='underline'
                icon={LinkIcon}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            fullWidth={false}
            className={classes.closeButton}
            onClick={() => {
              if (walletAddress && challenge.requester === walletAddress) {
                const gotTo = `/my-organization/${challenge.orgId}`;
                history.push(gotTo, { follow: gotTo });
              } else {
                history.push(`/organization/${challenge.orgId}`);
              }
            }}
          >
            <img
              src={CloseIcon}
              width='24px' height='24px'
              alt='Close'
            />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const OrganizationInfo = props => {
  const classes = styles();
  const {
    isFetching,
    organization,
    directory
  } = props;
  const loaded = organization && directory && !isFetching;

  if (!loaded) {
    return (
      <CircularProgress
        size='24px'
      />
    );
  }

  const {
    segment
  } = directory;
  const {
    orgid,
    logo,
    name
  } = organization;

  return (
    <Container>
      <Grid container
        direction='row'
        justify='flex-start'
        alignItems='flex-end'
        spacing={2}
      >
        <Grid item className={classes.orgImageContainer}>
          <div className={classes.orgImageWrapper}>
            {
              logo
                ? (
                  <img
                    className={classes.orgImage}
                    src={logo}
                    alt={orgid}
                  />
                )
                : (
                  <img
                    className={classes.orgImage}
                    src={setRandomDefaultImage(orgid || 'Loading', segment)}
                    alt={orgid}
                  />
                )
            }
          </div>
        </Grid>
        <Grid item className={classes.orgInfoContainer}>
          <div>
            <Typography variant='h3' className={classes.orgName}>
              {name}
            </Typography>
            <Typography className={classes.orgDirName}>
              Directory: {directory.title}
            </Typography>
          </div>
        </Grid>
        <Grid item>
          &nbsp;
        </Grid>
      </Grid>
    </Container>
  );
};

const Challenge = props => {
  const classes = styles();
  const { orgId, directoryId, challengeId } = useParams();
  const {
    web3,
    walletAddress,
    isOrgInfoFetching,
    fetchOrganizationInfo,
    organization,
    isIndexFetching,
    isOrgDirectoriesFetching,
    setOrgId,
    resetOrgId,
    directories,
    orgDirectories
  } = props;

  const [errors, setErrors] = useState([]);
  const [directory, setDirectory] = useState(null);
  const [challenge, setChallenge] = useState(null);

  const [isChallengeFetching, setIsChallengeFetching] = useState(false);

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
    if (orgDirectories && orgDirectories.length > 0 && orgId && directoryId) {
      const directoryInfo = directories
        .filter(d => d.address === directoryId)[0];
      const orgInfo = orgDirectories
        .filter(
          d => (d.ID === orgId && d.address === directoryId)
        )[0];
      setDirectory({
        ...directoryInfo,
        organization: orgInfo
      });
    }
  }, [directories, orgDirectories, orgId, directoryId]);

  useEffect(() => {
    if (directory && orgId && challengeId !== undefined) {
      setErrors([]);
      setIsChallengeFetching(true);
      fetchChallengeInfo(web3, directory, orgId, challengeId)
        .then(info => {
          setChallenge(info);
          setIsChallengeFetching(false);
        })
        .catch(error => {
          setErrors([...errors, error]);
          setIsChallengeFetching(false);
        });
    }
  }, [directory, orgId, challengeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loaded = directory && organization && challenge;

  if (!loaded) {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.pageContainer}
      >
        <Grid item>
          <CircularProgress
            size='40px'
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction='column' className={classes.pageContainer}>
      <Grid item className={classes.pageHeader}>
        <ChallengeHeader
          isFetching={isIndexFetching || isOrgDirectoriesFetching || isChallengeFetching}
          challenge={challenge}
          walletAddress={walletAddress}
        />
      </Grid>
      <Grid item className={classes.pageOrgInfoContatiner}>
        <OrganizationInfo
          isFetching={isIndexFetching || isOrgDirectoriesFetching || isOrgInfoFetching}
          organization={organization}
          directory={directory}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isOrgInfoFetching: isOrgInfoFetching(state),
  organization: selectItem(state),
  web3: selectWeb3(state),
  walletAddress: selectSignInAddress(state),
  isIndexFetching: isIndexFetching(state),
  isOrgDirectoriesFetching: isOrgDirectoriesFetching(state),
  directories: directories(state),
  orgDirectories: orgDirectories(state),
  indexError: indexError(state),
  statsError: statsError(state),
  orgError: orgError(state)
});

const mapDispatchToProps = {
  fetchOrganizationInfo,
  setOrgId,
  resetOrgId
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
