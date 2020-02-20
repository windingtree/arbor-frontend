import React from "react";
import history from '../../redux/history';

import {Container, Typography, Grid, Card, Box, Button} from '@material-ui/core';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';


import {makeStyles} from '@material-ui/core/styles';
import trustTopIllustation from '../../assets/SvgComponents/lif-deposit-illustration.svg';
import lifWithdrawIllustration from '../../assets/SvgComponents/lif-deposit-withdraw.svg';

import insuranceIcon from '../../assets/SvgComponents/Insurance-illustration.svg';
import colors from '../../styles/colors';


const styles = makeStyles({
  topDiv: {
    backgroundColor: colors.greyScale.moreLighter
  },
  topSectionWrapper: {
    padding: '30px 40px 75px 40px',
  },
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonWrapper: {
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
  },
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
    margin: '43px 0 0 0',
  },
  stepsCard: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '80px',
    boxSizing: 'border-box',
    padding: '23px 20px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  stepCountText: {
    margin: '0 14px 0 30px',
    fontSize: '14px',
    lineHeight: '16px',
    minWidth: '52px'
  },
  stepTex: {
    fontSize: '14px',
    lineHeight: '16px',
  },
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
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
  buttonPurchaseWithdraw: {
    display: 'block',
    marginTop: '70px',
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
  }
});

const TrustLifStake = () => {

  const classes = styles();

  return (
    <div>
      <div className={classes.topDiv}>
        <Container className={classes.topSectionWrapper}
                   style={{backgroundColor: colors.greyScale.moreLighter}}>
          <Box className={classes.screenHeader}>
            <div className={classes.backButtonWrapper}>
              <Button onClick={history.goBack}>
                <Typography className={classes.backButtonLabel}>
                  <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                  Back to all organizations
                </Typography>
              </Button>
            </div>
          </Box>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.mainTitle} variant={'h1'}>Submit your Líf
              deposit</Typography>
              <Typography className={classes.topText}>Líf deposit is a small amount of cryptocurrency that
                is staked when you register your organization profile on Arbor. This action minimizes
                spam registrations and proves the seriousness of your intentions.</Typography>
              <div className={classes.line}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <img src={trustTopIllustation} alt={'illustration'}/>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container className={classes.stepsSection}>
        <div>
          <Grid container justify={'space-between'}>
            <Grid item container spacing={4} className={classes.stepsCardsWrapper}>
              <Box width={"100%"}>
                <Card className={classes.stepsCard}>
                  <img src={insuranceIcon} alt={'icon'}/>
                  <Typography noWrap className={classes.stepCountText}>Step 1.</Typography>
                  <Typography className={classes.stepTex}>
                    Register on a decentralized stock exchange
                  </Typography>
                </Card>
              </Box>
              <Box width={"100%"}>
                <Card className={classes.stepsCard}>
                  <img src={insuranceIcon} alt={'icon'}/>
                  <Typography noWrap className={classes.stepCountText}>Step 2.</Typography>
                  <Typography className={classes.stepTex}>
                    Purchase Líf to have at least 1000 in your Metamask account
                  </Typography>
                </Card>
              </Box>
              <Box width={"100%"}>
                <Card className={classes.stepsCard}>
                  <img src={insuranceIcon} alt={'icon'}/>
                  <Typography noWrap className={classes.stepCountText}>Step 3.</Typography>
                  <Typography className={classes.stepTex}>
                    Click "Purchase Lif" to submit your deposit
                  </Typography>
                </Card>
              </Box>
            </Grid>
            <Grid item style={{width: '45%'}}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Participate in platform governance with Líf deposit
              </Typography>
              <Typography className={classes.paragraph}>Líf deposit gives your the right to participate in
                platform governance.
              </Typography>
              <Typography className={classes.paragraph}>
                Before you proceed, make sure that you have at least 1000 Líf in
                your Metamask account. Líf deposit will automatically generate Lög tokens required for
                voting.
              </Typography>
              <Button className={classes.buttonPurchaseWithdraw}>
                <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle}>
                  Purchase Lif
                </Typography>
              </Button>
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
                Withdraw your Líf deposit anytime
              </Typography>
              <Typography className={classes.paragraph}>
                You may request to withdraw your Líf deposit at any point. However, as a safety measure
                your Líf will be available to you after 30 days since your withdrawal request.
              </Typography>
              <Typography className={classes.paragraph}>
                With your deposit withdrawal, you lose the right to participate in platform governance.
                Your organization’s trust level will be decreased respectively.
              </Typography>
              <Box>
                <Button className={classes.buttonPurchaseWithdraw}>
                  <Typography variant={'subtitle2'} noWrap className={classes.buttonTitle}>
                    Withdraw your deposit
                  </Typography>
                </Button>
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


export default TrustLifStake;