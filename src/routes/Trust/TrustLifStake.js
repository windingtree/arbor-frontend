import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Container, Typography, Grid, Card, Box, Button, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
// import moment from 'moment';

import { LIF_DEPOSIT_AMOUNT, CHAIN_ID } from "../../utils/constants";
import history from '../../redux/history';
import { selectSignInAddress } from '../../ducks/signIn';
import {
  enrichLifData,
  allowDeposit,
  makeDeposit,
  requestWithdrawal,
  requestFaucet,
  withdrawDeposit,

  selectLifTokenBalance,
  selectLifTokenAllowanceAmountForOrgId,
  selectOrgIdLifDepositAmount,
  selectOrgIdLifWithdrawalExist,
  selectOrgIdLifWithdrawalValue,
  selectOrgIdLifWithdrawalTime,
  selectCurrentBlockNumber,
  selectLifDepositDataFetching,
  selectError
} from '../../ducks/lifDeposit';

import Info from '../Organization/Components/Info';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';
// import trustTopIllustration from '../../assets/SvgComponents/lif-deposit-illustration.svg';
import lifWithdrawIllustration from '../../assets/SvgComponents/lif-deposit-withdraw.svg';
import { checkIcon, LifIcon1, LifIcon2, LifIcon3 } from '../../assets/SvgComponents';
import colors from '../../styles/colors';
import { selectItem } from "../../ducks/fetchOrganizationInfo";

const styles = makeStyles({
/*
  topDiv: {
    backgroundColor: colors.greyScale.moreLighter
  },
*/
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    marginLeft: '-8px'
  },
  backButtonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
/*
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
  line: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '2px',
    width: '36px',
    marginRight: '12px',
    backgroundColor: colors.primary.accent,
  },*/
  blockTitle: {
    lineHeight: '44px',
    fontSize: '32px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  stepsSection: {
    padding: '118px 0 106px 0',
  },
  stepsCardsWrapper: {
    width: '50%',
    margin: '43px 0 23px 0',
    paddingRight: '73px'
  },
  stepsCard: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '80px',
    boxSizing: 'border-box',
    padding: '32px 20px 32px 12px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  stepsCardImg: {
    position: 'absolute',
  },
  stepCountText: {
    margin: '0 14px 0 92px',
    fontSize: '14px',
    fontWeight: 500,
    color: colors.greyScale.dark,
    lineHeight: 1.2,
    minWidth: '52px'
  },
  stepTex: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.greyScale.dark,
    lineHeight: 1.2,
  },
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  paragraphError: {
    marginTop: 0,
    lineHeight: '28px',
    color: colors.secondary.peach,
  },
  withdrawSectionDiv: {
    backgroundColor: colors.greyScale.moreLighter,
    padding: '100px 0'
  },
  lifWithdrawIllustration: {
    position: 'absolute',
    top: '2px',
    right: '-36px'
  },
  lifWithdrawIllustrationWrapper: {
    position: 'relative',
    width: '40%',
    minHeight: '360px'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '40px',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '10px',
  },
  buttonWrapper: {
    marginRight: '20px',
    '&:last-child': {
      marginRight: '0'
    }
  },
  buttonPurchaseWithdraw: {
    display: 'flex',
    alignContent: 'center',
    height: '44px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px'
  },
  buttonDisabled: {
    backgroundImage: 'none',
    backgroundColor: colors.greyScale.lightest,
    borderColor: colors.greyScale.lightest,
    boxShadow: 'none',
    '& span': {
      color: colors.greyScale.common
    }
  },
  checkIcon: {
    marginRight: '10px'
  },
  buttonTitle: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    color: colors.primary.white,
    textTransform: 'none',
    padding: '4px 14px'
  },
  timeToWithdrawalWrapper: {
    marginRight: '16px',
    maxWidth: '360px'
  },
  timeToWithdrawal: {
    fontSize: '18px',
    fontWeight: 400,
    color: colors.secondary.peach
  },
  withProgress: {
    display: 'flex',
    alignContent: 'center'
  }
});

const TrustLifStake = (props) => {
  const classes = styles();
  const { orgId: orgid } = useParams();
  const {
    organization,
    lifTokenBalance,
    lifTokenAllowanceAmountForOrgId,
    orgIdLifDepositAmount,
    orgIdLifWithdrawalExist,
    orgIdLifWithdrawalValue,
    orgIdLifWithdrawalTime,
    error,
    isFetching,
    enrichLifData,
    requestFaucet,
    allowDeposit,
    makeDeposit,
    requestWithdrawal,
    withdrawDeposit
  } = props;
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  useEffect(() => {
    if (orgid) {
      console.log('%cuseEffect, [address]', 'background-color:yellow; color: black', orgid);
      enrichLifData({ orgid });
    }
  }, [orgid, enrichLifData]);

  const currentTimestamp = Date.now();
  let timeWithdrawalInUnixTimestamp = (new Date(orgIdLifWithdrawalTime)).toISOString().split('T')[0]; //moment(orgIdLifWithdrawalTime, 'MMM DD');
  console.log(
    '@@@@@@##########',
    orgIdLifWithdrawalExist,
    orgIdLifWithdrawalValue > 0,
    currentTimestamp >= orgIdLifWithdrawalTime
  );

  const makeDepositButtonEnabled = lifTokenAllowanceAmountForOrgId >= LIF_DEPOSIT_AMOUNT &&
    (lifTokenBalance >= LIF_DEPOSIT_AMOUNT);

  const requestWithdrawalButtonEnabled = !orgIdLifWithdrawalExist &&
    (orgIdLifDepositAmount >= LIF_DEPOSIT_AMOUNT);

  const allowDepositButtonEnabled = !requestWithdrawalButtonEnabled &&
    !makeDepositButtonEnabled &&
    (lifTokenBalance >= LIF_DEPOSIT_AMOUNT);

  const makeWithdrawalButtonEnabled = orgIdLifWithdrawalExist &&
    orgIdLifWithdrawalValue > 0 &&
    (currentTimestamp >= orgIdLifWithdrawalTime);

  const makeWithdrawalButtonWait = orgIdLifWithdrawalExist &&
    (currentTimestamp < orgIdLifWithdrawalTime);

  return (
    <div>
      <Container>
        <Box className={classes.screenHeader}>
          <Button onClick={() => {
            history.push(`/my-organizations/${orgid}`, { id: orgid });
          }}>
            <Typography className={classes.backButtonLabel}>
              <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
              Back to organization profile
            </Typography>
          </Button>
        </Box>
      </Container>
      <Info organization={organization} canManage={true} orgIdLifDepositAmount={lifTokenBalance}/>
     {/* <div className={classes.topDiv}>
        <Container className={classes.topDiv}>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.mainTitle} variant={'h1'}>Submit your Líf
                deposit</Typography>
              <Typography className={classes.topText}>Líf deposit is a small amount of cryptocurrency that
                is staked when you register your organization profile on Winding Tree Marketplace. This action minimizes
                spam registrations and proves the seriousness of your intentions.</Typography>
              <div className={classes.line}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <img src={trustTopIllustration} alt={'illustration'}/>
            </Grid>
          </Grid>
        </Container>
      </div>*/}
      <Container className={classes.stepsSection}>
        <div>
          <Grid container justify={'space-between'}>
            <Grid item container spacing={4} className={classes.stepsCardsWrapper}>
              <Card className={classes.stepsCard}>
                <img className={classes.stepsCardImg} src={LifIcon1} alt={'icon'}/>
                <Typography noWrap className={classes.stepCountText}>Step 1.</Typography>
                <Typography className={classes.stepTex}>
                  Register on a decentralized stock exchange
                </Typography>
              </Card>
              <Card className={classes.stepsCard}>
                <img className={classes.stepsCardImg} src={LifIcon2} alt={'icon'}/>
                <Typography noWrap className={classes.stepCountText}>Step 2.</Typography>
                <Typography className={classes.stepTex}>
                  Purchase Líf to have at least {LIF_DEPOSIT_AMOUNT} in your wallet
                </Typography>
              </Card>
              <Card className={classes.stepsCard}>
                <img className={classes.stepsCardImg} src={LifIcon3} alt={'icon'}/>
                <Typography noWrap className={classes.stepCountText}>Step 3.</Typography>
                <Typography className={classes.stepTex}>
                  Click "Allow deposit", then "Make deposit" to submit your deposit
                </Typography>
              </Card>
            </Grid>
            <Grid item style={{width: '45%'}}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Protect your organization from fraud with Lif stake.
              </Typography>
              <Typography className={classes.paragraph}>
                The LIF deposit is a way of showing that you are serious. By staking Lif, other organizations and individuals out there will know that your business is serious and can be trusted more than ones that don't.
              </Typography>
              <Typography className={classes.paragraph}>
                A Lif deposit can be completed by staking {LIF_DEPOSIT_AMOUNT} Lif tokens in the ORGiD smart contract. Once completed other organizations will have an easier time of trusting you because of your investment in proving your organization.
              </Typography>

                <div className={classes.buttonsContainer}>
                  {
                    // Enable Ropsten faucet
                    (CHAIN_ID === '3') &&
                    (
                      <div className={classes.buttonWrapper}>
                        <Button
                            onClick={() => {
                              setCurrentAction('requestFaucet');
                              requestFaucet({ orgid });
                            }}
                            className={classes.buttonPurchaseWithdraw}>
                          <Typography variant={'inherit'} noWrap className={classes.buttonTitle}>
                            Get Líf
                          </Typography>
                          {isFetching && currentAction === 'requestFaucet' &&
                            <CircularProgress size={18} color={'secondary'} />
                          }
                        </Button>
                      </div>
                    )
                  }
                  <div className={classes.buttonWrapper}>
                    {/* LIF DEPOSIT: Allow deposit */}
                    <Button disabled={!allowDepositButtonEnabled}
                            onClick={() => {
                              setCurrentAction('allowDeposit');
                              allowDeposit({ orgid });
                            }}
                            className={ !allowDepositButtonEnabled ? [classes.buttonPurchaseWithdraw, classes.buttonDisabled].join(' ') : classes.buttonPurchaseWithdraw}>
                      <Typography variant={'inherit'} noWrap className={classes.buttonTitle}>
                        {
                          lifTokenAllowanceAmountForOrgId > 0 && <img src={checkIcon} alt={'allow'} className={classes.checkIcon}/>
                        }
                        Allow deposit
                      </Typography>
                      {(isFetching && currentAction === 'allowDeposit' && allowDepositButtonEnabled) &&
                        <CircularProgress size={18} color={'secondary'} />
                      }
                    </Button>
                  </div>
                  <div className={classes.buttonWrapper}>
                    {/* LIF DEPOSIT: Make deposit */}
                    <Button disabled={!makeDepositButtonEnabled}
                            onClick={() => {
                              setCurrentAction('makeDeposit');
                              makeDeposit({ orgid });
                            }}
                            className={ !makeDepositButtonEnabled ? [classes.buttonPurchaseWithdraw, classes.buttonDisabled].join(' ') : classes.buttonPurchaseWithdraw}>
                      <Typography variant={'inherit'} noWrap className={classes.buttonTitle}>
                        Make deposit
                      </Typography>
                      {(isFetching && currentAction === 'makeDeposit' && makeDepositButtonEnabled) &&
                        <CircularProgress size={18} color={'secondary'} />
                      }
                    </Button>
                  </div>
                </div>
              <div className={classes.errorContainer}>
                {(error && ['requestFaucet', 'allowDeposit', 'makeDeposit'].includes(currentAction)) &&
                  <Typography className={classes.paragraphError}>
                    {error}
                  </Typography>
                }
              </div>

            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.withdrawSectionDiv}>
        <Container>
          <Grid container justify={'space-around'} alignItems={'center'}
                wrap={'nowrap'}>
            <Grid item style={{width: '50%'}}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Request your Líf deposit withdrawal anytime
              </Typography>
              <Typography className={classes.paragraph}>
                You may request to withdraw your Líf deposit at any point. However, as a safety measure
                your Líf will be available to you after 30 days since your withdrawal request.
              </Typography>
              <Typography className={classes.paragraph}>
                With your deposit withdrawal, your organization’s trust level will be decreased respectively.
              </Typography>
              <Box>
                <div className={classes.buttonsContainer}>
                  {!(makeWithdrawalButtonWait || makeWithdrawalButtonEnabled) && (
                    <Button
                      disabled={!requestWithdrawalButtonEnabled}
                      onClick={() => {
                        setCurrentAction('requestWithdrawal');
                        requestWithdrawal({ orgid });
                      }}
                      className={ !requestWithdrawalButtonEnabled ? [classes.buttonPurchaseWithdraw, classes.buttonDisabled].join(' ') : classes.buttonPurchaseWithdraw}
                    >
                      <Typography variant={'inherit'} noWrap className={classes.buttonTitle}>
                        <span>Request withdrawal</span>
                      </Typography>
                      {(isFetching && currentAction === 'requestWithdrawal' && requestWithdrawalButtonEnabled) &&
                        <CircularProgress size={18} color={'secondary'} />
                      }
                    </Button>
                  )}
                  {(makeWithdrawalButtonWait || makeWithdrawalButtonEnabled) && (
                    <>
                      {
                        orgIdLifWithdrawalTime > 0 && (
                          <div className={classes.timeToWithdrawalWrapper}>
                            <Typography variant={'caption'} className={classes.timeToWithdrawal}>
                              You will be able to withdraw your deposit around {timeWithdrawalInUnixTimestamp}
                            </Typography>
                          </div>
                        )
                      }
                      <Button
                        disabled={!makeWithdrawalButtonEnabled}
                        onClick={() => {
                          setCurrentAction('requestWithdrawal');
                          withdrawDeposit({ orgid });
                        }}
                        className={ requestWithdrawalButtonEnabled ? [classes.buttonPurchaseWithdraw, classes.buttonDisabled].join(' ') : classes.buttonPurchaseWithdraw}
                      >
                        <Typography variant={'inherit'} noWrap className={classes.buttonTitle}>
                          <span>Withdraw</span>
                        </Typography>
                        {(isFetching && currentAction === 'requestWithdrawal' && makeWithdrawalButtonEnabled) &&
                          <CircularProgress size={18} color={'secondary'} />
                        }
                      </Button>
                    </>
                  )}
                </div>
                <div className={classes.errorContainer}>
                  {(error && ['requestWithdrawal'].includes(currentAction)) &&
                    <Typography className={classes.paragraphError}>
                      {error}
                    </Typography>
                  }
                </div>
              </Box>
            </Grid>
            <Grid item className={classes.lifWithdrawIllustrationWrapper}>
              <img src={lifWithdrawIllustration} alt={'illustration'}
                   className={classes.lifWithdrawIllustration}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  address: selectSignInAddress(state),
  lifTokenBalance: selectLifTokenBalance(state),
  lifTokenAllowanceAmountForOrgId: selectLifTokenAllowanceAmountForOrgId(state),
  orgIdLifDepositAmount: selectOrgIdLifDepositAmount(state),
  orgIdLifWithdrawalExist: selectOrgIdLifWithdrawalExist(state),
  orgIdLifWithdrawalValue: selectOrgIdLifWithdrawalValue(state),
  orgIdLifWithdrawalTime: selectOrgIdLifWithdrawalTime(state),
  currentBlockNumber: selectCurrentBlockNumber(state),
  isFetching: selectLifDepositDataFetching(state),
  error: selectError(state),
  organization: selectItem(state)
});

const mapDispatchToProps = {
  enrichLifData,
  allowDeposit,
  makeDeposit,
  requestWithdrawal,
  requestFaucet,
  withdrawDeposit
};

export default connect(mapStateToProps, mapDispatchToProps)(TrustLifStake);
