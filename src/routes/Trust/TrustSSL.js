import React, { useEffect } from "react";
import _ from 'lodash';
import history from '../../redux/history';
import {Container, Typography, Grid, Card, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';
import trustTopIllustation from '../../assets/SvgComponents/what-if-illustration.svg';
import trustEVIllustation from '../../assets/SvgComponents/trust-ev-illustration.svg';
import rapidSSlLogo from '../../assets/SvgComponents/partner-rapid-ssl.svg';
import symantecLogo from '../../assets/SvgComponents/partner-symantec.svg';
import thawteLogo from '../../assets/SvgComponents/partner-thawte.svg';
import geoTrustLogo from '../../assets/SvgComponents/partner-geotrust.svg';
import comodoLogo from '../../assets/SvgComponents/partner-comodo.svg';

import colors from '../../styles/colors';

const styles = makeStyles({
  topDiv: {
    backgroundColor: colors.greyScale.moreLighter
  },
  topSectionWrapper: {
    padding: '30px 40px 65px 40px',
  },
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginLeft: '-8px'
  },
  buttonLabel: {
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
    margin: '46px 0 15px 0'
  },
  entityNameCard: {
    padding: '20px 15px',
    marginBottom: '35px',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  entityName: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.secondary.intenseGreen,
  },
  evcText: {
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
  partnersSection: {
    padding: '118px 0 106px 0',
  },
  partnerCardsWrapper: {
    width: '43%',
    height: 'min-content',
    margin: '43px 0 0 0',
  },
  partnerCardContainer: {
    height: 'min-content'
  },
  partnerCard: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '220px',
    height: '80px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  partnersTextListDot: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    content: '""',
    backgroundColor: colors.secondary.peach,
    fontWeight: 'bold',
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '12px',
    border: '12px',
  },
  partnersTextListItem: {
    position: 'relative',
    marginBottom: '16px',
  },
  partnersTextListTexts: {
    marginLeft: '23px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: colors.greyScale.dark,
  },
  verifiedAutoSectionDiv: {
    backgroundColor: colors.greyScale.moreLighter,
    padding: '54px 0'
  },
  trustEvIllustration: {
    width: '100%',
    minHeight: '360px'
  },
});

const TrustSSL = () => {
  const classes = styles();
  const name = _.get(history, 'location.state.name', 'default');
  const isVerified = _.get(history, 'location.state.isWebsiteVerified', false);

  useEffect(() => {
    if(name === 'default' && !isVerified) {
      history.goBack();
    }
  });

  return (
    <div>
      <div className={classes.topDiv}>
        <Container className={classes.topSectionWrapper}
                   style={{backgroundColor: colors.greyScale.moreLighter}}>
          <Box className={classes.screenHeader}>
            <div className={classes.buttonWrapper}>
              <Button onClick={history.goBack}>
                <Typography className={classes.buttonLabel}>
                  <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                  Back to organization profile
                </Typography>
              </Button>
            </div>
          </Box>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.mainTitle} variant={'h1'}>Verify your legal entity</Typography>
              <Card className={classes.entityNameCard}>
                <Typography variant={'subtitle1'} className={classes.entityName} align={'center'}>{name}</Typography>
              </Card>
              <Typography className={classes.evcText}>Extended Validation Certificate offers the highest
                available levels of trust and
                authentication to your website.</Typography>
              <div className={classes.line}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <img src={trustTopIllustation} alt={'illustration'}/>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container className={classes.partnersSection}>
        <div>
          <Grid container justify={'space-between'}>
            <Grid item container spacing={4} className={classes.partnerCardsWrapper}>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={rapidSSlLogo} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={symantecLogo} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={thawteLogo} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={geoTrustLogo} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={comodoLogo} alt={'partner'}/>
                </Card>
              </Grid>
              <Grid item className={classes.partnerCardContainer}>
                <Card className={classes.partnerCard}>
                  <img src={symantecLogo} alt={'partner'}/>
                </Card>
              </Grid>
            </Grid>
            <Grid item style={{width: '45%'}}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                Request an Extended Validation Certificate
              </Typography>
              <Typography className={classes.paragraph}>There are numerous Certificate
                Authorities that can issue an Extended Validation
                Certificate for your organization. You are free to request a legal entity verification from
                an authority of your choice.
              </Typography>
              <Typography className={classes.paragraph}>
                Here is what will be verified:
              </Typography>
              <ul style={{marginTop: '42px'}}>
                <li className={classes.partnersTextListItem}>
                  <span className={classes.partnersTextListDot}/>
                  <Typography className={classes.partnersTextListTexts}> Legal status and country of jurisdiction</Typography>
                </li>
                <li className={classes.partnersTextListItem}><span
                  className={classes.partnersTextListDot}/>
                  <Typography className={classes.partnersTextListTexts}>Operational status</Typography>
                </li>
                <li className={classes.partnersTextListItem}><span
                  className={classes.partnersTextListDot}/>
                  <Typography className={classes.partnersTextListTexts}>Identity of the business owner</Typography>
                </li>
                <li className={classes.partnersTextListItem}>
                  <span className={classes.partnersTextListDot}/>
                  <Typography className={classes.partnersTextListTexts}>Exclusive domain ownership</Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.verifiedAutoSectionDiv}>
        <Container>
          <Grid container justify={'space-around'} alignItems={'center'}
                wrap={'nowrap'}>
            <Grid item xs={12} lg={6}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                If you already have an EV SSL Certificate, your legal entity will be verified
                automatically!
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.trustEvIllustrationWrapper}>
              <img src={trustEVIllustation} alt={'illustration'} className={classes.trustEvIllustration}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
};

export default TrustSSL;
