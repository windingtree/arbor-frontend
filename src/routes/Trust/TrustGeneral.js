import React, { useRef, useEffect } from 'react';
import {Container, Typography, Grid, Card, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import trustTopIllustration from '../../assets/SvgComponents/trust-g-top.svg';
import cardWebsiteIllustration from '../../assets/SvgComponents/trust-g-website.svg';
import cardTwitterIllustration from '../../assets/SvgComponents/trust-g-twitter.svg';
import cardLockIllustration from '../../assets/SvgComponents/trust-g-lock.svg';
// import cardLifIllustration from '../../assets/SvgComponents/trust-g-lif.svg';
import MetamaskIllustration from '../../assets/SvgComponents/trust-metamask-illustration.svg';

import stepsBg from '../../assets/SvgComponents/tiles-bg.svg';

import verifyWebsiteSvg from '../../assets/SvgComponents/verify-your-website.svg';
import verifyYourLegalEntity from '../../assets/SvgComponents/verifyYourLegalEntity.svg';
import globeIconSvg from '../../assets/SvgComponents/globe-icon.svg';

import rapidSSLSvg from '../../assets/SvgComponents/partner-rapid-ssl.svg';
import symantecSvg from '../../assets/SvgComponents/partner-symantec.svg';
import thawteSvg from '../../assets/SvgComponents/partner-thawte.svg';
import geotrustSvg from '../../assets/SvgComponents/partner-geotrust.svg';
import comodoSvg from '../../assets/SvgComponents/partner-comodo.svg';
import liMarker from '../../assets/SvgComponents/marker.svg';
import evSSLok from '../../assets/SvgComponents/trust-ev-illustration.svg';
// import trustLifDeposit from '../../assets/SvgComponents/trust-lif-deposit.svg';
import trustSocial from '../../assets/SvgComponents/verify-social-media.svg';

import iconFacebook from '../../assets/SvgComponents/facebook-icon.svg';
// import iconInstagram from '../../assets/SvgComponents/instagram-icon.svg';
import iconLinkedin from '../../assets/SvgComponents/linkedin-icon.svg';


import colors from '../../styles/colors';

const styles = makeStyles({
  topDiv: {
    width: '100%',
    backgroundColor: colors.secondary.yellowLight,
    paddingBottom: '108px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '30px'
    }
  },
  grayDiv: {
    width: '100%',
    backgroundColor: '#FAFBFC',
    paddingTop: '98px',
    paddingBottom: '98px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '30px'
    }
  },
  grayDivNoTop: {
    width: '100%',
    backgroundColor: '#FAFBFC',
    paddingTop: 0,
    paddingBottom: '98px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '30px'
    }
  },
  whiteDiv: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: '98px',
    paddingBottom: '98px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      paddingBottom: '30px'
    }
  },
  graySpacer: {
    width: '100%',
    marginBottom: '98px'
  },
  rightFrame: {
    marginLeft: '98px'
  },
  topSectionWrapper: {
    padding: '57px 30px 20px 30px',
  },
  mainTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    margin: '85px 0 40px 0'
  },
  grayTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    margin: '0 0 20px 0'
  },
  grayTitleSm: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    margin: '0 0 20px 0'
  },
  topText: {
    color: colors.greyScale.dark,
    marginBottom: '19px',
    lineHeight: '28px'
  },
  topIllustrationWrapper: {
    '& img':
      {
        width: '100%'
      }
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
    padding: '118px 30px 106px 30px',
  },
  verificationsWrapper: {
    width: '50%',
    height: 'min-content',
    margin: '43px 0 0 0',
  },
  verification: {
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 500,
    padding: '5px 25px 5px 10px',
    display: 'flex',
    alignItems: 'center',
    height: '130px',
    backgroundColor: colors.primary.white,
    border: '0 none',
    borderRadius: '0',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  verificationSmall: {
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 500,
    padding: '27px 27px 27px 27px',
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    backgroundColor: colors.primary.white,
    border: '0 none',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  verificationSmallSocial: {
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 500,
    padding: '16px 16px 16px 16px',
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: colors.primary.white,
    border: '0 none',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  verificationIconSocial: {
    margin: '0 8px 0 0',
    alignSelf: 'flex-start'
  },
  socialLabel: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0.005em',
    color: '#5072B6'
  },
  socialCardContent: {
    display: 'flex',
    alignItems: 'start',
    alignContent: 'stretch'
  },
  verificationLogo: {
    width: '80%',
    margin: 'auto auto'
  },
  list: {
    listStyle: 'none',
    listStyleImage: `url(${liMarker})`,
    marginLeft: '14px',
    padding: 0,
    '& li': {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16px',
      color: '#5E666A',
      paddingLeft: '12px',
      marginBottom: '16px'
    },
    '& li::marker': {
      color: '#F58F7F'
    }
  },
  verificationContent: {
    display: 'flex'
  },
  verificationIconTitle: {
    fontSize: '18px',
    fontWeight: '500'
  },
  verificationIcon: {
    margin: '7px 15px 0',
    alignSelf: 'flex-start'
  },
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  stepsSectionWrapper: {
    background: `linear-gradient(180deg, ${colors.greyScale.moreLighter} 75%, ${colors.primary.white} 25%)`,
    padding: '0 30px'
  },
  stepsSection: {
    padding: '87px 15px 87px 0',
    backgroundImage: `url(${stepsBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom'
  },
  stepControllers: {
    textAlign: 'right'
  },
  controllerItem: {
    position: 'relative',
    left: '-12px',
  },
  stepControllerItem: {
    left: 'auto',
    right: '-12px'
  },
  activeController: {
    '& button': {
      color: colors.primary.accent
    },
    '& > span': {
      width: '36px'
    }
  },
  controllerButton: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.1,
    backgroundColor: 'transparent',
    letterSpacing: '.009em',
    outline: 'none',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: colors.greyScale.common,
    transition: 'color .3s ease'
  },
  controllerLine: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '2px',
    width: '0',
    marginRight: '12px',
    backgroundColor: colors.primary.accent,
    transition: 'width .3s ease'
  },
  stepControllerLine: {
    marginRight: '0',
    marginLeft: '12px'
  },
  stepCardsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '80px'
  },
  stepCard: {
    boxSizing: 'border-box',
    width: '550px',
    padding: '60px 48px',
    borderRadius: '6px',
    overflow: 'visible',
    boxShadow: "0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)",
  },
  stepCardPreTitle: {
    color: colors.secondary.peach,
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase'
  },
  stepCardTitle: {
    fontSize: '24px',
    lineHeight: '28px',
    marginTop: '15px'
  },
  orgIdBadge: {
    margin: '25px 0 15px 0',
    padding: '20px 15px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
    color: colors.secondary.peach,
    background: colors.gradients.orangeDegOpacity,
    borderRadius: '8px',
  },
  stepCardIconWrapper: {
    position: 'relative',
  },
  stepCardIcon: {
    position: 'absolute',
    top: '-100px',
    left: '-88px'
  },
  trustPointsBadge: {
    width: '100px',
    height: '75px',
    alignItems: 'center',
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'space-evenly',
    left: '24px',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  trustPointBadgeText: {
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '44px'
  },
  moreVerifiedSection: {
    margin: '70px 0 130px 0'
  },
  metamaskIllustration: {
    width: '100%'
  },
  metamaskIllustrationWrapper: {
    width: '55%',
    position: 'relative'
  },
  registerSection: {
    display: 'flex',
    padding: '84px 14px'
  },
  registerTitle: {
    color: colors.greyScale.darkest,
    lineHeight: '44px',
    fontWeight: 500,
    fontSize: '32px'
  },
  registerButton: {
    padding: '16px 28px',
    margin: '15px 0 0 145px',
    textTransform: 'none',
    borderColor: 'transparent',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  registerButtonTitle: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    color: colors.primary.white
  },
  websiteAddressCard: {
    padding: '20px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '35px',
    width: 'min-content',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    borderRadius: '6px'
  },
  link: {
    color: colors.secondary.peach,
    fontWeight: 500
  },
  topSectionText: {
    color: colors.greyScale.dark,
    marginBottom: '19px',
    lineHeight: '28px'
  },
  topContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between'
  }
});

function TrustGeneral() {
  const classes = styles();

  const websiteRef = useRef(null);
  const socialRef = useRef(null);
  const legalEntityRef = useRef(null);
  // const lifDeositRef = useRef(null);

  useEffect(() => {
      window.scrollTo(0, 0)
  }, []);

  const scrollToRef = ref => ref.current.scrollIntoView({behavior: 'smooth'});

  return (
    <div>
      <div className={classes.topDiv}>
        <Container className={classes.topSectionWrapper}>
          <Grid container spacing={5} direction="row">
            <Grid item xs={12} md={6}>
              <div><Typography className={classes.mainTitle} variant={'h1'}>How can I prove that my company is
                <b style={{color: colors.secondary.peach}}> trustworthy</b>
              </Typography>
                <Typography className={classes.topText}>Why are you here? Probably, you own a business or
                  work at a company that wants to participate in the global economy and find reliable
                  partners to scale and prosper.
                </Typography>
                <div className={classes.line}/>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.topIllustrationWrapper}>
                <img src={trustTopIllustration} alt={'illustration'}/>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container className={classes.partnersSection}>
        <div>
          <Grid container spacing={5} justify={'space-between'}>
            <Grid item container spacing={4} xs={12} lg={5} className={classes.verificationsWrapper}>
              <Grid item xs={6}>
                <Card className={classes.verification} onClick={() => scrollToRef(websiteRef)}>
                  <div className={classes.verificationContent}>
                    <img className={classes.verificationIcon} src={cardWebsiteIllustration}
                         alt={'img'}/>
                    <Typography className={classes.verificationIconTitle}>Website<br/> ownership</Typography>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card className={classes.verification} onClick={() => scrollToRef(socialRef)}>
                  <div className={classes.verificationContent}>
                    <img className={classes.verificationIcon} src={cardTwitterIllustration}
                         alt={'img'}/>
                    <Typography className={classes.verificationIconTitle}>Social media verification</Typography>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card className={classes.verification} onClick={() => scrollToRef(legalEntityRef)}>
                  <div className={classes.verificationContent}>
                    <img className={classes.verificationIcon} src={cardLockIllustration} alt={'img'}/>
                    <Typography className={classes.verificationIconTitle}>Legal entity verification</Typography>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={6}>
                {/* <Card className={classes.verification} onClick={() => scrollToRef(lifDeositRef)}>
                  <div className={classes.verificationContent}>
                    <img className={classes.verificationIcon} src={cardLifIllustration} alt={'img'}/>
                    <Typography className={classes.verificationIconTitle}>Líf deposit submission</Typography>
                  </div>
                </Card> */}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={1}/>
            <Grid item xs={12} lg={6}>
              <Typography className={classes.paragraph}>In a literally borderless digital world where
                companies emerge and vanish as we speak, how can you be confident in your business
                partners?
              </Typography>
              <Typography className={classes.paragraph}>
                In most cases, you need to perform a lengthy KYB check to confirm that a company is
                registered in a certain country or region, is engaged in a certain type of legitimate
                business and is represented by a real affiliated employee.
              </Typography>
              <Typography className={classes.paragraph}>Doing KYB checks on your own is slow and expensive
                Less so, when you work with intermediaries, but it exposes yourself to the risk of yours
                and your partner’s business information being leaked or misused.</Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
      
      <div ref={websiteRef} className={classes.grayDiv}>
        <Container className={classes.topContent}>
          <Grid container justify='space-between' alignItems='flex-start'>
            <Grid item xs={6}>
              <Typography className={classes.grayTitle} variant={'h1'}>Verify your website</Typography>
              <Card className={classes.websiteAddressCard}>
                <img className={classes.verificationIconSocial} src={globeIconSvg} alt={"icon"}/>
                <Typography className={classes.link} noWrap={true}>https://yourwebsitexample.com/</Typography></Card>
                <Typography className={classes.topSectionText}>
                  Most users get acquainted with companies via their websites. Prove that you are a proud owner of your corporate website in a few steps.
                </Typography>
                <Typography className={classes.topSectionText}>
                  Go to your organization profile/trust proofs, download the txt file and upload it to your server or paste info to DNS zone. That is a solid proof that you own the website.
                </Typography>
                <div className={classes.line}/>
            </Grid>
            <Grid item xs={6}>
              <img src={verifyWebsiteSvg} alt={'illustration'}/>
            </Grid>
          </Grid>          
        </Container>
        <div className={classes.graySpacer}></div>
        <Container ref={legalEntityRef} className={classes.topContent}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.grayTitle} variant={'h1'}>Verify your legal entity</Typography>
              <Typography className={classes.topSectionText}>
                Extended Validation Certificate offers the highest available levels of trust and authentication to your website.
              </Typography>
              <div className={classes.line}/>
            </Grid>
            <Grid item xs={6} style={{ marginRight: '-25px' }}>
              <img src={verifyYourLegalEntity} alt={'illustration'}/>
            </Grid>
          </Grid>          
        </Container>
      </div>

      <div className={classes.whiteDiv}>
        <Container className={classes.topContent}>
          <Grid container justify='space-between' alignItems='flex-start'>
            <Grid item xs={5}>
              <div>
                <Grid container spacing={5} justify={'space-between'}>
                  <Grid item xs={6}>
                    <Card className={classes.verificationSmall}>
                      <img className={classes.verificationLogo} src={rapidSSLSvg} alt={'SSL provider'}/>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card className={classes.verificationSmall}>
                      <img className={classes.verificationLogo} src={symantecSvg} alt={'SSL provider'}/>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container spacing={5} justify={'space-between'}>
                  <Grid item xs={6}>
                    <Card className={classes.verificationSmall}>
                      <img className={classes.verificationLogo} src={thawteSvg} alt={'SSL provider'}/>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card className={classes.verificationSmall}>
                      <img className={classes.verificationLogo} src={geotrustSvg} alt={'SSL provider'}/>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container spacing={5} justify={'space-between'}>
                  <Grid item xs={6}>
                    <Card className={classes.verificationSmall}>
                      <img className={classes.verificationLogo} src={comodoSvg} alt={'SSL provider'}/>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div className={classes.rightFrame}>
                <Typography className={classes.grayTitleSm} variant={'h1'}>Request an Extended Validation Certificate</Typography>
                <Typography className={classes.topSectionText}>
                  There are numerous Certificate Authorities that can issue an Extended Validation Certificate for your company. You are free to request a legal entity verification from the Authority of your choice.
                </Typography>
                <Typography className={classes.topSectionText}>
                  Here is what will be verified:
                </Typography>
                <ul className={classes.list}>
                  <li>
                    Legal status and country of jurisdiction
                  </li>
                  <li>
                    Operational status
                  </li>
                  <li>
                    Identity of the business owner
                  </li>
                  <li>
                    Exclusive domain ownership
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className={classes.grayDiv}>
        <Container className={classes.topContent}>
          <Grid container justify={'space-between'}>
            <Grid item xs={6}>
              <Typography className={classes.grayTitleSm} variant={'h1'}>
                If you already have an EV SSL Certificate, your legal entity will be verified automatically!
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <img style={{ marginLeft: '12%' }} src={evSSLok} alt={'EV SSL'}/>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* <div ref={lifDeositRef} className={classes.grayDivNoTop}>
        <Container className={classes.topContent}>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item xs={6}>
              <Typography className={classes.grayTitle} variant={'h1'}>
                Submit your Líf deposit
              </Typography>
              <Typography className={classes.topSectionText}>
                Líf deposit is a small amount of cryptocurrency that is staked when you register your organization profile on Winding Tree Marketplace. 
                This action minimizes spam registrations and proves your commitment to the cause.
              </Typography>
              <div className={classes.line}/>
            </Grid>
            <Grid item xs={6}>
              <img src={trustLifDeposit} alt={'EV SSL'}/>
            </Grid>
          </Grid>
        </Container>
      </div> */}

      <div ref={socialRef} className={classes.grayDivNoTop}>
        <Container className={classes.topContent}>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item xs={7}>
              <Typography className={classes.grayTitle} variant={'h1'}>
                Verify your social media
              </Typography>
              <Grid container spacing={2} justify={'flex-start'}>
                <Grid item xs={4}>
                  <Card className={classes.verificationSmallSocial}>
                    <div className={classes.socialCardContent}>
                      <img className={classes.verificationIconSocial} src={iconFacebook} alt={'facebook'}/>
                      <Typography className={classes.socialLabel}>
                        /legal entity profile
                      </Typography>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.verificationSmallSocial}>
                    <div className={classes.socialCardContent}>
                      <img className={classes.verificationIconSocial} src={iconLinkedin} alt={'linkedin'}/>
                      <Typography className={classes.socialLabel}>
                        /legal entity profile
                      </Typography>
                    </div>
                  </Card>
                </Grid>
                {/* <Grid item xs={4}> */}
                {/*   <Card className={classes.verificationSmallSocial}> */}
                {/*     <div className={classes.socialCardContent}> */}
                {/*       <img className={classes.verificationIconSocial} src={iconInstagram} alt={'instagram'}/> */}
                {/*       <Typography className={classes.socialLabel}> */}
                {/*         /legal entity profile */}
                {/*       </Typography> */}
                {/*     </div> */}
                {/*   </Card> */}
                {/* </Grid> */}
              </Grid>
              <div style={{marginBottom: '34px'}} />
              <Typography className={classes.topSectionText}>
                Your social media accounts are the main source of corporate news and announcements. Improve your trust level with every verified account.
              </Typography>
              <div className={classes.line}/>
            </Grid>
            <Grid item xs={5}>
              <img src={trustSocial} alt={'Social Accounts'}/>
            </Grid>
          </Grid>
        </Container>
      </div>
      
      <Grid className={classes.moreVerifiedSection}>
        <Container>
          <Grid container spacing={5} wrap={'nowrap'}>
            <Grid item xs={12} md={6} className={classes.metamaskIllustrationWrapper}>
              <img src={MetamaskIllustration} alt={'illustration'}
                   className={classes.metamaskIllustration}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                More verification methods are on their way!
              </Typography>
              <Typography className={classes.paragraph}>
                We will soon introduce a few more verification methods. Next on our list are verifiable
                credentials from countries that have developed encryption laws and policies, as well as
                credentials from certification authorities in different industries.
              </Typography>
              <Typography className={classes.paragraph}>
                If you represent one of those certification authorities, you can offer Winding Tree Marketplace community
                an option to use your credentials on the platform. To do so, create your organization
                profile on Winding Tree Marketplace and start signing credentials you issue.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid style={{backgroundColor: colors.secondary.yellowLight, display:'none'}}>
        <Container className={classes.registerSection}>
          <Grid container spacing={5} direction="row">
            <Grid xs={12} md={7} item>
              <Typography className={classes.registerTitle} variant={'h4'}>
                Join Winding Tree Marketplace today and find trusted partners for your business
              </Typography>
            </Grid>
            <Grid xs={12} md={5} item>
              <Button className={classes.registerButton} onClick={(event) => {
                event.preventDefault();
                window.open('https://metamask.io/');
              }}>
                <Typography className={classes.registerButtonTitle} noWrap>Register with
                  MetaMask</Typography>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  )
}

export default TrustGeneral;
