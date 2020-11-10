import Web3 from 'web3';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../redux/history';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import Identicon from '../../components/Identicon';
import CopyTextComponent from '../../components/CopyTextComponent';
import ActionButton from './Components/ActionButton';
import EvidenceDialog from './Components/EvidenceDialog';
import AppealDialog from './Components/AppealDialog';
import {
  ARBITRATOR_ADDRESS
} from '../../utils/constants';
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
  getChallengeInfo,
  getOrganizationData,
  getEvidenceEvent,
  getBlock,
  sendMethod,
  getArbitratorContract,
  getArbitratorOwner,
  disputeStatus,
  appealPeriod,
  appealDisputes,
  getCurrentRuling,
  getRoundInfo,
  getMultiplierDivisor
} from '../../ducks/utils/ethereum';
import {
  setRandomDefaultImage,
  strCenterEllipsis
} from '../../utils/helpers';
import {
  serializeJson,
  isResponseTimeout,
  isAppealPossible,
  responseTimeoutTitle,
  timeToLocalString,
  amountFromWei,
  Party
} from '../../utils/directories';
import { fetchJson } from '../../redux/api';
import LinkIcon from '../../assets/SvgComponents/link.svg';
import CopyIcon from '../../assets/SvgComponents/copy-icon.svg';
import CloseIcon from '../../assets/SvgComponents/mobile-menu-icon-close.svg';
import colors from '../../styles/colors';

const styles = makeStyles({
  pageContainer: {
    margin: '20px 0 20px 0'
  },
  pageHeader: {
    margin: '64px 0 32px 0'
  },
  pageOrgInfoContainer: {
    margin: '0 0 32px 0'
  },
  pageEvidenceHeaderContainer: {
    margin: 0
  },
  challengeTitle: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px',
    whiteSpace: 'nowrap'
  },
  statusLabel: {
    display: 'block',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '14px',
    backgroundColor: '#EFEFEF',
    color: '#5E666A',
    padding: '4px 6px',
    borderRadius: '4px',
    '&.mr24': {
      marginRight: '24px'
    },
    '&.green': {
      backgroundColor: '#98CCB0',
      color: 'white'
    },
    '&.red': {
      backgroundColor: '#FAC8C0',
      color: '#42424F'
    },
    '&.yellow': {
      backgroundColor: '#FCE8B6',
      color: '#5E666A'
    },
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
    ['@media (max-width:1024px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
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
    ['@media (max-width:1024px)']: { // eslint-disable-line no-useless-computed-key
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
  },
  evidenceTitle: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px'
  },
  evidenceTitleRightContainer: {
    textAlign: 'right'
  },
  evidenceRoundTitle: {
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#2E2E31'
  },
  evidenceLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'flex-start',
    alignItems: 'center'
  },
  evidenceOtherContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'flex-start',
    alignItems: 'center',
    marginBottom: '16px'
  },
  identiconStyle: {
    marginRight: '24px'
  },
  greyHLine: {
    flexGrow: 1,
    height: '1px',
    borderTop: '1px solid #EFEFEF',
    position: 'relative',
    '&.rightColumn:after': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '96%',
      right: 0,
      bottom: 0,
      backgroundColor: 'white'
    }
  },
  greyCenter: {
    alignSelf: 'stretch',
    width: '1px',
    borderLeft: '1px solid #EFEFEF',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: 0,
      bottom: '50%',
      backgroundColor: 'white'
    }
  },
  greyVLine: {
    alignSelf: 'stretch',
    width: '1px',
    borderLeft: '1px solid #EFEFEF'
  },
  cardWrapper: {
    padding: '16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #EFEFEF',
    boxSizing: 'border-box',
    boxShadow: '0px 6px 24px #F3F3F6',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#42424F',
    marginBottom: '14px'
  },
  cardDescription: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#42424F',
    marginBottom: '24px'
  },
  cardDate: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#8F999F'
  },
  fileLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    marginBottom: '24px',
    '& > a': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#2E2E31',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '& > a:visited': {
      color: '#2E2E31'
    }
  },
  fileLinkIcon: {
    marginRight: '8px'
  },
  fileLinkNotValid: {
    color: 'red'
  },
  cardsWrapper: {
    position: 'relative',
    padding: '16px 0',
    '&.leftColumn': {
      paddingRight: '16px'
    },
    '&.rightColumn': {
      paddingLeft: '16px',
      marginTop: '-57px'
    }
  },
  actionButtonLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    color: '#3E9693',
    textTransform: 'none'
  },
  dialogButtonRedSmall: {
    backgroundImage: colors.gradients.orange,
    borderRadius: '6px',
    textTransform: 'none',
    color: colors.primary.white,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
    padding: '10px 20px'
  },
  actionButtonIndicator: {
    marginLeft: '10px'
  },
  arbitratorAction: {
    marginBottom: '10px'
  },
  inlineComponentTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#3E9693',
    marginBottom: '24px'
  },
  appealSubtitle: {
    marginBottom: '24px'
  },
  fundedAppealsContainer: {
    marginBottom: '16px'
  },
  fundedAppealsTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '17px',
    color: '#42424F',
    marginBottom: '8px'
  },
  fundedAppealsLabel: {
    fontSize: '14px',
    marginBottom: '6px',
    paddingLeft: '6px',
    '& > b': {
      fontWeight: 'bold'
    }
  }
});

const equalAddresses = (address1, address2) => address1 && address2 && address1.toLowerCase() === address2.toLowerCase();

const getWinner = currentRuling => {
  switch (Number(currentRuling)) {
      case 0:
          return 'none';
      case 1:
          return 'requester';
      case 2:
          return 'challenger';
      default:
          return 'not selected';
  }
};

const validateFile = (uri, jsonData) => {
  const hash = Web3.utils.soliditySha3(serializeJson(jsonData));
  const fileName = uri.match(/([A-Fa-f0-9]{64})(\.json)$/);
  if (!fileName || `0x${fileName[1]}` !== hash) {
      throw new Error('Evidence file is not valid');
  }
  return true;
};

const fetchFiles = async events => Promise.all(events.map(
  ev => new Promise(
      resolve => fetchJson(ev._evidence)
          .then(content => {
              console.log('Evidence Json:', content);
              resolve({
                  ...ev,
                  content,
                  validated: validateFile(ev._evidence, content, true)
              });
          })
          .catch(error => {
              resolve({
                  ...ev,
                  evidence: null,
                  content: {},
                  validated: false,
                  error
              });
          })
  )
));

const loadEvidenceFiles = async evidence => {
  const requester = await fetchFiles(evidence.requester);
  const other = await fetchFiles(evidence.other);
  return {
    requester,
    other
  }
};

const fetchChallengeInfo = async (web3, directory, orgId, challengeId) => {
  const challenge = await getChallengeInfo(
    web3,
    directory.address,
    orgId,
    challengeId
  );
  console.log('Challenge:', challenge);

  let dStatus;
  let aPeriod;
  let aDispute;
  let currentRuling;

  if (challenge.disputed) {
      dStatus = await disputeStatus(
          web3,
          challenge.disputeID
      );
      console.log('disputeStatus:', dStatus);

      if (Number(dStatus) === 1) {
          aPeriod = await appealPeriod(
              web3,
              challenge.disputeID
          );
          aPeriod = {
              start: Number(aPeriod.start) * 1000,
              end: Number(aPeriod.end) * 1000
          };
          console.log('appealPeriod:', aPeriod);
      }

      aDispute = await appealDisputes(
          web3,
          challenge.disputeID
      );
      console.log('appealDisputes:', aDispute);

      currentRuling = await getCurrentRuling(
          web3,
          challenge.disputeID
      );
      console.log('Ruling:', currentRuling);
  }

  const arbitratorOwner = await getArbitratorOwner(web3);

  const organization = await getOrganizationData(
    web3,
    directory.address,
    orgId
  );
  console.log('Organization data:', organization);

  const currentRound = Number(challenge.numberOfRounds) - 1;
  const roundInfo = await getRoundInfo(
    web3,
    directory.address,
    orgId,
    challengeId,
    currentRound
  );
  console.log('Round:', roundInfo);

  const multiplierDivisor = await getMultiplierDivisor(web3, directory.address);

  let evidence = await getEvidenceEvent(
    web3,
    directory.address,
    challenge.arbitrator,
    orgId,
    challengeId
  );
  console.log('Evidence events:', evidence);

  evidence = await Promise.all(
    evidence.map(async evd => {
      const block = await getBlock(web3, evd.blockNumber , false);
      return {
        ...evd,
        block
      };
    })
  );
  console.log('Evidence events with block:', evidence);

  const splittedEvidence = evidence
    .reduce(
      (a, v) => {
        if (v.returnValues._party.toLowerCase() === organization.requester.toLowerCase()) {
          a.requester.push({
            ...v.returnValues,
            block: v.block
          });
        } else {
          a.other.push({
            ...v.returnValues,
            block: v.block
          });
        }
        return a;
      },
      {
        requester: [],
        other: []
      }
    );

  return {
    challengeId,
    disputeStatus: dStatus,
    appealPeriod: aPeriod,
    appealDispute: aDispute,
    currentRuling,
    roundInfo,
    multiplierDivisor,
    arbitratorOwner,
    orgId,
    ...challenge,
    organization,
    evidence: splittedEvidence
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
              <Typography className={classes.statusLabel + ` ${challenge.resolved ? 'green' : ''}`}>
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

const FileLink = props => {
  const classes = styles();
  const {
    fileName,
    fileUri,
    isValidated
  } = props;

  return (
    <Typography className={classes.fileLinkWrapper}>
      <img
        className={classes.fileLinkIcon}
        src={LinkIcon}
        width='16px' height='16px'
        alt={fileUri}
      />
      <a
        href={fileUri}
        target='_blank'
        rel='noopener noreferrer'
      >
        {fileName}
      </a>
      {!isValidated &&
        <Typography variant='inherit'  className={classes.fileLinkNotValid}>
          &nbsp;(not valid)
        </Typography>
      }
    </Typography>
  );
};

const ActionsBlock = ({ title, children }) => {
  const classes = styles();
  return (
    <div className={classes.cardWrapper}>
      {title &&
        <Typography className={classes.inlineComponentTitle}>
          {title}
        </Typography>
      }
      {children}
    </div>
  );
};

const EvidenceCard = props => {
  const classes = styles();
  const {
    error,
    content: {
      name,
      description,
      fileTypeExtension,
      fileURI
    },
    block: {
      timestamp
    },
    validated,
    isOther,
    _party,
    challenger,
    _evidence
  } = props;
  const isPartyChallenger = isOther && _party && challenger &&
    _party.toLowerCase() === challenger.toLowerCase();

  return (
    <Grid container direction='column' className={classes.cardWrapper}>
      {isOther &&
        <Grid item className={classes.evidenceOtherContainer}>
          <div>
            <Typography className={classes.statusLabel + ` mr24 ${isPartyChallenger ? 'red' : 'grey'}`}>
              {isPartyChallenger ? 'challenger' : 'supporter'}
            </Typography>
          </div>
          <Identicon
            className={classes.identiconStyle}
            address={_party.toLowerCase()}
            icon={CopyIcon}
          />
        </Grid>
      }
      {error &&
      <>
        <Grid item>
          <Typography className={classes.cardName}>
            Unable to fetch the evidence
          </Typography>
        </Grid>
        <Grid item>
          <FileLink
            fileName={`evidence.pdf`}
            fileUri={_evidence}
            isValidated={validated}
          />
        </Grid>
        <Grid item>
          {timestamp &&
            <Typography className={classes.cardDate}>
              {new Date(timestamp * 1000).toUTCString()}
            </Typography>
          }
        </Grid>
      </>
      }
      {!error &&
        <>
          <Grid item>
            <Typography className={classes.cardName}>
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.cardDescription}>
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <FileLink
              fileName={`evidence.${fileTypeExtension}`}
              fileUri={fileURI}
              isValidated={validated}
            />
          </Grid>
          <Grid item>
            {timestamp &&
              <Typography className={classes.cardDate}>
                {new Date(timestamp * 1000).toUTCString()}
              </Typography>
            }
          </Grid>
        </>
      }
    </Grid>
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
    // isOrgDirectoriesFetching,
    // setOrgId,
    // resetOrgId,
    directories,
    // orgDirectories
  } = props;

  const [errors, setErrors] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [directory, setDirectory] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [evidenceRequester, setEvidenceRequester] = useState([]);
  const [evidenceOther, setEvidenceOther] = useState([]);
  const [isChallengeFetching, setIsChallengeFetching] = useState(false);
  const [giveRulingNONESending, setGiveRulingNONESending] = useState(false);
  const [giveRulingRequesterSending, setGiveRulingRequesterSending] = useState(false);
  const [giveRulingChallengerSending, setGiveRulingChallengerSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    fetchOrganizationInfo({ id: orgId });
  }, [orgId, fetchOrganizationInfo]);

  // useEffect(() => {
  //   if (orgId) {
  //     setOrgId(orgId);
  //   }

  //   return () => {
  //     resetOrgId();
  //   };
  // }, [setOrgId, resetOrgId, orgId]);

  useEffect(() => {
    if (orgId && directoryId) {
      const directoryInfo = directories
        .filter(d => d.address === directoryId)[0];
      setDirectory(directoryInfo);
    }
  }, [directories, orgId, directoryId]);

  const updateChallengeInfo = useCallback(() => {
    setErrors([]);
    setIsChallengeFetching(true);
    fetchChallengeInfo(web3, directory, orgId, challengeId)
        .then(info => {
          console.log('Challenge stor:', info);
          setChallenge(info);
          setIsChallengeFetching(false);
        })
        .catch(error => {
          console.log('!!!!!', error);
          setErrors(errors => [...errors, error]);
          setIsChallengeFetching(false);
        });
  }, [web3, directory, orgId, challengeId]);

  useEffect(() => {
    if (directory && orgId && challengeId !== undefined) {
      updateChallengeInfo();
    }
  }, [directory, orgId, challengeId, updateChallengeInfo]);

  useEffect(() => {
    if (challenge) {
      loadEvidenceFiles(challenge.evidence)
        .then(files => {
          console.log('####', files);
          setEvidenceRequester(files.requester);
          setEvidenceOther(files.other);
        })
        .catch(error => {
          setErrors(errors => [...errors, error]);
          setIsChallengeFetching(false);
        });
    }
  }, [challenge]);

  const giveRulingAction = (disputeId, party) => {
    setErrors([]);
    if (!ARBITRATOR_ADDRESS) {
      throw new Error('Arbitrator features are disabled');
    }
    let progressCallback;
    switch (party) {
        case 0:
            progressCallback = setGiveRulingNONESending;
            break;
        case 1:
            progressCallback = setGiveRulingRequesterSending;
            break;
        case 2:
            progressCallback = setGiveRulingChallengerSending;
            break;
        default:
            throw new Error('Wrong party');
    }
    progressCallback(true);
    if (challenge.appealDispute && challenge.appealDispute.appealDisputeID !== '0') {
        disputeId = challenge.appealDispute.appealDisputeID;
        console.log('Using of appealDisputeID instead of DisputeID');
    }
    console.log('Give Ruling:', [
      disputeId,
      party
    ]);
    sendMethod(
      web3,
      walletAddress,
      directory.address,
      getArbitratorContract,
      'giveRuling',
      [
        disputeId,
        party
      ]
    )
      .then(() => {
        updateChallengeInfo();
        progressCallback(false);
      })
      .catch(error => {
        setErrors(errors => [...errors, error]);
        progressCallback(false);
      });
};

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
          isFetching={isIndexFetching || isChallengeFetching}
          challenge={challenge}
          walletAddress={walletAddress}
        />
      </Grid>
      <Grid item className={classes.pageOrgInfoContainer}>
        <OrganizationInfo
          isFetching={isIndexFetching || isOrgInfoFetching}
          organization={organization}
          directory={directory}
        />
      </Grid>
      <Grid item className={classes.pageEvidenceHeaderContainer}>
        <Container>
          <Grid container
            direction='row'
            alignItems='center'
          >
            <Grid item xs>
              <Typography className={classes.evidenceTitle}>
                Requester’s evidence
              </Typography>
            </Grid>
            <Grid item zeroMinWidth={true}>
              <Typography className={classes.evidenceRoundTitle}>
                Round {challenge.numberOfRounds}
                {challenge.resolved &&
                  <>
                    &nbsp;(winner: {getWinner(challenge.currentRuling)})
                  </>
                }
                {(!challenge.resolved && !challenge.disputed) &&
                  <>
                    &nbsp;(status: acceptance)
                  </>
                }
                {(challenge.disputed && !challenge.resolved) &&
                  <>
                    &nbsp;(status: {challenge.disputeStatus === '0' ? 'waiting' : challenge.disputeStatus === '1' ? 'appealable' : 'solved'})
                  </>
                }
              </Typography>
            </Grid>
            <Grid item xs className={classes.evidenceTitleRightContainer}>
              <Typography className={classes.evidenceTitle}>
                Other evidence
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Grid container
            direction='row'
            alignItems='center'
          >
            <Grid item xs
              className={classes.evidenceLeftContainer}
            >
              <Identicon
                className={classes.identiconStyle}
                address={challenge.organization.requester}
                color='#42424F'
                icon={CopyIcon}
              />
              <div>
                <Typography className={classes.statusLabel + ` yellow`}>
                  requester
                </Typography>
              </div>
              <div className={classes.greyHLine} />
            </Grid>
            <Grid item zeroMinWidth={true} className={classes.greyCenter}>
            </Grid>
            <Grid item xs>
              <div className={classes.greyHLine + ' rightColumn'} />
            </Grid>
          </Grid>
          <Grid container
            direction='row'
            alignItems='flex-start'
          >
            <Grid item xs className={classes.cardsWrapper + ' leftColumn'}>
              {evidenceRequester.map((evidence, i) => (
                  <EvidenceCard
                    key={i}
                    {...evidence}
                  />
              ))}
              {(evidenceRequester.length === 0 && !equalAddresses(walletAddress, challenge.organization.requester)) &&
                <ActionsBlock>
                  No evidence from requester party submitted yet
                </ActionsBlock>
              }
              {challenge.appealPeriod &&
                <ActionsBlock
                  title={'Appeal management'}
                >
                  <Typography className={classes.appealSubtitle}>
                    Challenge has been ruled and "{getWinner(challenge.currentRuling)}" has been chosen as a winner.
                    Ruling result can be appealed until {timeToLocalString(challenge.appealPeriod.end)}
                  </Typography>
                  {challenge.roundInfo &&
                    <div className={classes.fundedAppealsContainer}>
                      <Typography className={classes.fundedAppealsTitle}>
                        Funded Appeal (by parties):
                      </Typography>
                      <ul>
                        {challenge.roundInfo.paidFees.map((value, i) => (
                          <li key={i} className={classes.fundedAppealsLabel}>
                            <b>{Party[i]}</b>: {amountFromWei(value, challenge.multiplierDivisor)} ETH
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                  <AppealDialog
                    {...props}
                    inline
                    timeoutTitle={
                      isAppealPossible(challenge)
                        ? `Available until ${timeToLocalString(challenge.appealPeriod.end)}`
                        : `Appealing has been closed at ${timeToLocalString(challenge.appealPeriod.end)}`
                    }
                    isDisabled={currentTime && !isAppealPossible(challenge)}
                    isOpened={walletAddress && challenge.appealPeriod && challenge.appealPeriod.end}
                    handleClose={() => {}}
                    setOrgId={updateChallengeInfo}
                    directory={directory}
                    challenge={challenge}
                  />
                </ActionsBlock>
              }
              {!challenge.resolved &&
                <>
                  {!walletAddress &&
                    <ActionButton
                      onClick={() => {
                        history.push('/authorization/signin', { follow: history.location.pathname });
                      }}
                    >
                      Sign In to see available actions
                    </ActionButton>
                  }
                  <EvidenceDialog
                    {...props}
                    inline
                    dialogTitle='Accept Challenge'
                    timeoutTitle={`Available until ${responseTimeoutTitle(directory, challenge.organization)}`}
                    actionMethod='acceptChallenge'
                    isDisabled={currentTime && !isResponseTimeout(directory, challenge.organization)}
                    isOpened={walletAddress && !challenge.disputed && equalAddresses(walletAddress, challenge.organization.requester)}
                    handleClose={() => {}}
                    setOrgId={updateChallengeInfo}
                    directory={directory}
                  />
                  <EvidenceDialog
                    {...props}
                    inline
                    dialogTitle='Submit New Evidence'
                    timeoutTitle={`Available until the challenge not resolved`}
                    actionMethod='submitEvidence'
                    isOpened={walletAddress && challenge.disputed && !challenge.resolved && equalAddresses(walletAddress, challenge.organization.requester)}
                    handleClose={() => {}}
                    setOrgId={updateChallengeInfo}
                    directory={directory}
                    noFunding
                  />
                </>
              }
            </Grid>
            <Grid item zeroMinWidth={true} className={classes.greyVLine}></Grid>
            <Grid item xs className={classes.cardsWrapper + ' rightColumn'}>
              {evidenceOther.map((evidence, i) => (
                <EvidenceCard
                  key={i}
                  isOther={true}
                  challenger={challenge.challenger}
                  {...evidence}
                />
              ))}
              {(evidenceOther.length === 0 && (challenge.resolved || !walletAddress || equalAddresses(walletAddress, challenge.organization.requester))) &&
                <ActionsBlock>
                  No evidence from other parties submitted yet
                </ActionsBlock>
              }
              <EvidenceDialog
                {...props}
                inline
                dialogTitle='Submit New Evidence'
                timeoutTitle={`Available until the challenge not resolved`}
                actionMethod='submitEvidence'
                isOpened={walletAddress && challenge.disputed && !challenge.resolved && !equalAddresses(walletAddress, challenge.organization.requester)}
                handleClose={() => {}}
                setOrgId={updateChallengeInfo}
                directory={directory}
                noFunding
              />
              {(ARBITRATOR_ADDRESS && !challenge.resolved && equalAddresses(challenge.arbitratorOwner, walletAddress)) &&
                <ActionsBlock title={'Arbitrator actions'}>
                  <Grid container direction='column'>
                    <Grid item className={classes.arbitratorAction}>
                      <Button
                        className={classes.dialogButtonRedSmall}
                        disabled={
                            !walletAddress ||
                            giveRulingNONESending ||
                            (currentTime && challenge.appealPeriod && Date.now() <= challenge.appealPeriod.end)
                        }
                        onClick={() => giveRulingAction(
                            challenge.disputeID,
                            0
                        )}
                      >
                        Juror: set NONE as Winner
                        {giveRulingNONESending &&
                          <div className={classes.actionButtonIndicator}>
                              <CircularProgress size='16px' color='secondary' />
                          </div>
                        }
                      </Button>
                    </Grid>
                    <Grid item className={classes.arbitratorAction}>
                      <Button
                        className={classes.dialogButtonRedSmall}
                        disabled={
                            !walletAddress ||
                            giveRulingRequesterSending ||
                            (currentTime && challenge.appealPeriod && Date.now() <= challenge.appealPeriod.end)
                        }
                        onClick={() => giveRulingAction(
                            challenge.disputeID,
                            1
                        )}
                      >
                        Juror: set Requester as Winner
                        {giveRulingRequesterSending &&
                          <div className={classes.actionButtonIndicator}>
                              <CircularProgress size='16px' color='secondary' />
                          </div>
                        }
                      </Button>
                    </Grid>
                    <Grid item className={classes.arbitratorAction}>
                      <Button
                        className={classes.dialogButtonRedSmall}
                        disabled={
                          !walletAddress ||
                          giveRulingChallengerSending ||
                          (currentTime && challenge.appealPeriod && Date.now() <= challenge.appealPeriod.end)
                        }
                        onClick={() => giveRulingAction(
                          challenge.disputeID,
                            2
                        )}
                      >
                        Juror: set Challenger as Winner
                        {giveRulingChallengerSending &&
                          <div className={classes.actionButtonIndicator}>
                              <CircularProgress size='16px' color='secondary' />
                          </div>
                        }
                      </Button>
                    </Grid>
                  </Grid>
                </ActionsBlock>
              }
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {errors.length > 0 &&
        <Grid item>
          {errors.map((error, i) => (
            <Typography key={i}>
              {error.message}
            </Typography>
          ))}
        </Grid>
      }
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
