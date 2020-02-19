import React, {useState} from 'react';
import {Container, Typography, Grid, Card, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import trustTopIllustration from '../../assets/SvgComponents/trust-g-top.svg';
import cardWebsiteIllustration from '../../assets/SvgComponents/trust-g-website.svg';
import cardTwitterIllustration from '../../assets/SvgComponents/trust-g-twitter.svg';
import cardLockIllustration from '../../assets/SvgComponents/trust-g-lock.svg';
import cardLifIllustration from '../../assets/SvgComponents/trust-g-lif.svg';
import MetamaskIllustration from '../../assets/SvgComponents/trust-metamask-illustration.svg';

import trustPointsIcon from '../../assets/SvgComponents/trust-lvl-icon.svg';
import stepOrgidIcon from '../../assets/SvgComponents/trust-step-orgid-icon.svg';
import stepMetamaskIcon from '../../assets/SvgComponents/trust-step-mm-icon.svg';
import stepWebsiteIcon from '../../assets/SvgComponents/trust-step-website-icon.svg';
import stepEntityIcon from '../../assets/SvgComponents/trust-step-legal-entity-icon.svg';
import stepSocialIcon from '../../assets/SvgComponents/trust-step-social-icon.svg';
import stepLifIcon from '../../assets/SvgComponents/trust-step-lif-icon.svg';
import stepDirectoryIcon from '../../assets/SvgComponents/trust-step-directory-icon.svg';
import stepsBg from '../../assets/SvgComponents/tiles-bg.svg';


import colors from '../../styles/colors';

const styles = makeStyles({
  topDiv: {
    backgroundColor: colors.secondary.yellowLight
  },
  topSectionWrapper: {
    padding: '57px 40px 135px 40px',
  },
  mainTitle: {
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest,
    margin: '85px 0 40px 0'
  },
  topText: {
    color: colors.greyScale.dark,
    marginBottom: '19px',
    lineHeight: '28px'
  },
  topIllustrationWrapper: {
    position: 'absolute',
    top: '95px',
    right: '258px'
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
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '220px',
    height: '130px',
    backgroundColor: colors.primary.white,
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  verificationIcon: {
    margin: '50px 15px 0 15px',
    alignSelf: 'flex-start'
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
  joinControllerItem: {
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
    left: '24px'
  },
  trustPointBadgeText: {
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '44px'
  },
  moreVerifiedSection: {
    margin: '150px 0 130px 0'
  },
  metamaskIllustration: {
    position: 'absolute',
    top: '-36px',
    right: '38px'
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
  }
});


function TrustGeneral(props) {
  const [activeStep, setActiveStep] = useState(0);
  const classes = styles();

  const stepCards = [
    {
      title: 'Create ORG.ID, your own unique business identifier',
      trustPoints: 0,
      icon: stepOrgidIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          It looks like this:
        </Typography>
        <div className={classes.orgIdBadge}>
          0x48da4438c2373053a52a80ee04c3ce3834e1080a
        </div>
        <Typography className={classes.paragraph}>
          As we use Ethereum blockchain, you have an exclusive control over your data and profile!
        </Typography>
      </Grid>
    },
    {
      title: 'Add information on your company’s business activities',
      trustPoints: 0,
      icon: stepMetamaskIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          Are you operating a hotel, managing an online travel agency or working for an airline? Add these details as
          you fill in your company profile.
        </Typography>
        <Typography className={classes.paragraph}>
          At this point, other members of Arbor community see that there is a new company registered and wait for your
          information to be verified.
        </Typography>
      </Grid>
    },
    {
      title: 'Prove that your company owns a certain website',
      trustPoints: 1,
      icon: stepWebsiteIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          There are two ways to share credible information about your company: claims and credentials.
        </Typography>
        <Typography className={classes.paragraph}>
          Claims are the facts about your company that can be verified without involving third parties. Verify your
          corporate website ownership to secure your first trust point.
        </Typography>
      </Grid>
    },
    {
      title: 'Verify your company\'s legal entity information',
      trustPoints: 2,
      icon: stepEntityIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          Extended Validation Certificate belongs to credentials – facts about the company that can be verified by third
          parties.
        </Typography>
        <Typography className={classes.paragraph}>
          Certificate Authorities validate your legal information and issue an EV Certificate. An icon that appears next
          to your domain in the browser search bar signals that your company is officially registered and operating.
        </Typography>
      </Grid>
    },
    {
      title: 'Prove that your company owns certain social media accounts',
      trustPoints: 3,
      icon: stepSocialIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          Well-established social media accounts can mean a lot to your potential partners. Verify your corporate
          profiles on Twitter, Facebook and Instagram within a few minutes!
        </Typography>
      </Grid>
    },
    {
      title: 'Submit your Líf deposit to protect Arbor registry against spam',
      trustPoints: 4,
      icon: stepLifIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          Depositing a certain amount of Líf shows other organizations on the platform that you couldn't possibly create
          more than a few records, otherwise it would be too expensive.
        </Typography>
        <Typography className={classes.paragraph}>
          Líf deposit makes your organization a true citizen of this decentralized global commerce platform and allows
          you to participate in the platform governance.
        </Typography>
      </Grid>
    },
    {
      title: 'Register your organization in one of the directories',
      trustPoints: 5,
      icon: stepDirectoryIcon,
      content: <Grid container>
        <Typography className={classes.paragraph}>
          Register your organization in one of the directories to make it easily discoverable. Each directory has its
          own rules that your organization has to comply with in order to be listed.
        </Typography>
        <Typography className={classes.paragraph}>
          Once your organization gets verified by community, it achieves the ultimate trust level!
        </Typography>
      </Grid>
    }
  ];

  const stepControllers = [
    'step 1: org.id',
    'step 2: business activities',
    'step 3: website',
    'step 4: legal entity',
    'step 5: social media',
    'step 6: lif deposit',
    'step 7: directories'
  ];

  const renderStepControllers = () => {
    const controllers = stepControllers.map((item, index) => {
      const name = index === activeStep ? item : item.slice(0, 6);
      return (
        <li className={index === activeStep ? classes.activeController : classes.controllerItem}
            key={index.toString()} style={{margin: '15px 0'}}>
          <span className={classes.controllerLine}/>
          <button
            className={classes.controllerButton}
            onClick={handleChangeActiveStep}
          >
            {name}
          </button>
        </li>
      )
    });

    return (
      <ul className={classes.stepControllers}>{controllers}</ul>
    )
  };

  const handleChangeActiveStep = (e) => {
    const item = e.target.innerHTML;
    const itemIndex = parseInt(item[5]) - 1; // 5th char of "step N"

    if (activeStep === itemIndex) return;
    setActiveStep(itemIndex);
  };

  const renderStepCard = (activeStep) => {
    return <div style={{display: 'flex'}}>
      <Card className={classes.stepCard}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography className={classes.stepCardPreTitle}>step {activeStep + 1}.</Typography>
          <div className={classes.stepCardIconWrapper}>
            <img className={classes.stepCardIcon} src={stepCards[activeStep].icon} alt="icon"/>
          </div>
        </div>
        <Typography className={classes.stepCardTitle}>{stepCards[activeStep].title}</Typography>
        {stepCards[activeStep].content}
      </Card>
      <Card className={classes.trustPointsBadge}>
        <img src={trustPointsIcon} alt="trust points"/>
        <Typography className={classes.trustPointBadgeText}>{stepCards[activeStep].trustPoints}</Typography>
      </Card></div>
  };

  return (

    <div>
      <div className={classes.topDiv}>
        <Container className={classes.topSectionWrapper}>
          <Grid item style={{width: '50%'}}>
            <div><Typography className={classes.mainTitle} variant={'h1'}>How can I prove that my company is
              <b style={{color: colors.secondary.peach}}> trustworthy</b>
            </Typography>
              <Typography className={classes.topText}>Why are you here? Probably, you own a business or
                work at a company that wants to participate in the global economy and find reliable
                partners to scale and prosper.</Typography>
              <div className={classes.line}/>
            </div>
          </Grid>
          <Grid>
            <div className={classes.topIllustrationWrapper}>
              <img src={trustTopIllustration} alt={'illustration'}/>
            </div>
          </Grid>
        </Container>
      </div>
      <Container className={classes.partnersSection}>
        <div>
          <Grid container justify={'space-between'}>
            <Grid item container spacing={2} className={classes.verificationsWrapper}>
              <Grid item>
                <Card className={classes.verification}>
                  <img className={classes.verificationIcon} src={cardWebsiteIllustration}
                       alt={'img'}/>
                  <Typography>Website ownership</Typography>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.verification}>
                  <img className={classes.verificationIcon} src={cardTwitterIllustration}
                       alt={'img'}/>
                  <Typography>Social media verification</Typography>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.verification}>
                  <img className={classes.verificationIcon} src={cardLockIllustration} alt={'img'}/>
                  <Typography>Legal entity verification</Typography>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.verification}>
                  <img className={classes.verificationIcon} src={cardLifIllustration} alt={'img'}/>
                  <Typography>Líf deposit submission</Typography>
                </Card>
              </Grid>
            </Grid>
            <Grid item style={{width: '45%'}}>
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
      <Grid style={{backgroundColor: colors.greyScale.moreLighter}}>
        <Container className={classes.stepsSection}>
          <Grid style={{width: '50%'}}>
            <Typography variant={'h3'} className={classes.blockTitle}>
              How to achieve the ultimate trust level?
            </Typography>
            <Typography className={classes.paragraph}>
              Arbor allows organizations all over the world to opt-in and verify themselves without involving a
              third-party
              intermediary.
            </Typography>
          </Grid>
          <Grid className={classes.stepCardsWrapper} container justify={'space-between'}>
            {renderStepCard(activeStep)}
            {renderStepControllers()}
          </Grid>
        </Container>
      </Grid>
      <Grid className={classes.moreVerifiedSection}>
        <Container>
          <Grid container wrap={'nowrap'}>
            <Grid item className={classes.metamaskIllustrationWrapper}>
              <img src={MetamaskIllustration} alt={'illustration'}
                   className={classes.metamaskIllustration}/>
            </Grid>
            <Grid item style={{width: '50%'}}>
              <Typography variant={'h3'} className={classes.blockTitle}>
                More verification methods are on their way!
              </Typography>
              <Typography className={classes.paragraph}>
                We will soon introduce a few more verification methods. Next on our list are verifiable
                credentials from countries that have developed encryption laws and policies, as well as
                credentials from certification authorities in different industries.
              </Typography>
              <Typography className={classes.paragraph}>
                If you represent one of those certification authorities, you can offer Arbor community
                an option to use your credentials on the platform. To do so, create your organization
                profile on Arbor and start signing credentials you issue.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid style={{backgroundColor: colors.secondary.yellowLight}}>
        <Container className={classes.registerSection}>
          <Grid style={{width: '53%'}} item>
            <Typography className={classes.registerTitle} variant={'h4'}>
              Join Arbor today and find trusted partners for your business
            </Typography>
          </Grid>
          <Grid item>
            <Button className={classes.registerButton}>
              <Typography className={classes.registerButtonTitle} noWrap>Register with
                MetaMask</Typography>
            </Button>
          </Grid>
        </Container>
      </Grid>
    </div>
  )
}

export default TrustGeneral;
