import React, {useState} from "react";
import { Redirect } from 'react-router-dom';
import history from '../../redux/history';
import copy from 'copy-to-clipboard';

import {Container, Typography, Grid, Card, Box, Button} from '@material-ui/core';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';


import {makeStyles} from '@material-ui/core/styles';

import verifySocialMediaSvg from '../../assets/SvgComponents/verify-social-media.svg';
import facebookIconSvg from '../../assets/SvgComponents/facebook-icon.svg';
import instagramIconSvg from '../../assets/SvgComponents/instagram-icon.svg';
import twitterIconSvg from '../../assets/SvgComponents/twitter-icon.svg';
import listPlaceholderSvg from '../../assets/SvgComponents/list-placeholder.svg';
import twitterBig from '../../assets/SvgComponents/twitter-big.svg';
import facebookBig from '../../assets/SvgComponents/facebook-big.svg';
import instagramBig from '../../assets/SvgComponents/instagram-big.svg';
import copyIcon from '../../assets/SvgComponents/copy-icon.svg';

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
  topWithCards: {
    width: '65%',
    position: 'relative',
    zIndex: 1
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
    margin: '46px 0 15px 0'
  },
  socialAddressCard: {
    padding: '20px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '0 10px 10px 0',
  },
  socialCardIcon: {
    marginRight: "15px"
  },
  link: {
    color: colors.secondary.peach,
    fontWeight: 500
  },
  topSectionText: {
    color: colors.greyScale.dark,
    margin: '25px 0 20px 0',
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
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  howSection: {
    padding: '125px 0 106px 0',
    alignItems: 'center'
  },
  howTitle: {
    lineHeight: '44px',
    fontSize: '32px',
    fontWeight: 500,
    color: colors.greyScale.darkest
  },
  stepsCardsWrapper: {
    width: '50%',
  },
  verifyCardTitle: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px',
    color: colors.greyScale.darkest,
    alignSelf: 'center',
    marginRight: '25px'
  },
  howListDot: {
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
  howTextListItem: {
    position: 'relative',
  },
  howListTexts: {
    marginLeft: '23px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  howListPlaceholder: {
    height: '15px',
    marginLeft: '3px'
  },
  socialsControllers: {
    marginTop: '36px'
  },
  controllerItem: {
    position: 'relative',
    left: '-12px',
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
    letterSpacing: '0.1em',
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
  verifyingCode: {
    color: colors.primary.accent,
  },
  buttonVerify: {
    display: 'block',
    marginTop: '25px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px'
  },
  buttonVerifyTitle: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    color: colors.primary.white,
    textTransform: 'none',
    padding: '4px 14px'
  }
});


function TrustSocial(props) {

  const classes = styles();
  const [activeSocial, setActiveSocial] = useState(0);
  const contacts = (!!history.location.state && !!history.location.state.contacts) ? history.location.state.contacts : false;
  if (!contacts) history.push('/my-organizations/');
  const {twitter, facebook, instagram} = contacts;
  const socialsControllers = [
    'Twitter',
    'Facebook',
    'Instagram',
  ];


  const renderSocialsControllers = () => {
    const controllers = socialsControllers.map((item, index) => {
      return (

        <li className={index === activeSocial ? classes.activeController : classes.controllerItem}
            key={index.toString()} style={{margin: '8px 0'}}>
          <span className={classes.controllerLine}/>
          <button
            className={classes.controllerButton}
            onClick={handleChangeActiveSocial}
          >
            {item}
          </button>
        </li>
      )
    });

    return (
      <ul className={classes.socialsControllers}>{controllers}</ul>
    )
  };

  const copyToClipboardText = (verifyingCode) => {
    return <span onClick={copyToClipboard(verifyingCode)}>
            <text className={classes.verifyingCode}>{verifyingCode}</text>
            <img src={copyIcon} style={{marginLeft: '10px'}} alt={"copy"}/>
        </span>
  };

  const copyToClipboard = (verifyingCode) => () => {
    copy(verifyingCode);
  };

  const renderStepsList = (steps, verifyingCode) => {
    let listItems = [...steps.map((text, index) => {
        let verifyingCodePlaceholder = text.indexOf('%');
        let transformedText = text;
        if (verifyingCodePlaceholder !== -1) {
          transformedText = transformedText.slice(0, verifyingCodePlaceholder);
        }
        return <li key={index.toString()} className={classes.howTextListItem}>
          <span className={classes.howListDot}/>
          <Typography
            className={classes.howListTexts}>{transformedText}
            {verifyingCodePlaceholder > 0 ? copyToClipboardText(verifyingCode) : null}</Typography>
        </li>
      }
    )];

    let listItemsWithPlaceholders = [];

    for (let i = 0; i < listItems.length; i++) {
      listItemsWithPlaceholders.push(listItems[i]);
      if (i !== listItems.length - 1) {
        listItemsWithPlaceholders.push(<div><img className={classes.howListPlaceholder}
                                                 src={listPlaceholderSvg} alt={"|"}/>
        </div>)
      }
    }

    return listItemsWithPlaceholders;
  };

  const handleChangeActiveSocial = (e) => {
    const item = e.target.innerHTML;
    const itemIndex = socialsControllers.indexOf(item);

    if (activeSocial === itemIndex) return;
    setActiveSocial(itemIndex);
  };

  const verifyingCodes = [null, 'Ox000000_FACEBOOK', '0x0000000_INSTAGRAM'];

  return (
    <div>
      {!contacts ? <Redirect exact path={'/trust/social'} to={'/my-organizations'}/> :
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
          <Grid item style={{display: 'flex'}}>
            <div className={classes.topWithCards}>
              <Typography className={classes.mainTitle} variant={'h1'}>Verify your social
                media</Typography>
              <Box>
                {facebook && <Card className={classes.socialAddressCard}>
                  <img className={classes.socialCardIcon} src={facebookIconSvg} alt={"fb"}/>
                  <Typography>
                    {facebook}</Typography></Card>}
                {twitter &&
                <Card className={classes.socialAddressCard}>
                  <img className={classes.socialCardIcon} src={twitterIconSvg} alt={"tw"}/>
                  <Typography>{twitter}</Typography>
                </Card>
                }
                {instagram && <Card className={classes.socialAddressCard}>
                  <img className={classes.socialCardIcon} src={instagramIconSvg} alt={"ig"}/>
                  <Typography>
                    {instagram}</Typography></Card>}
              </Box>
              <Typography className={classes.topSectionText}>Your social media accounts are the main
                source of corporate news and announcements. Increase your trust level with every
                verified account.</Typography>
              <div className={classes.line}/>
            </div>
            <div className={classes.illustrationWrapper}>
              <img src={verifySocialMediaSvg} alt={'illustration'}/>
            </div>
          </Grid>
        </Container>
      </div>}
      <Container className={classes.howSection}>
        <div>
          <Typography className={classes.howTitle}>
            How it works
          </Typography>
          <Grid container justify={'space-between'}>
            <Grid className={classes.stepsCardsWrapper}>
              <Typography className={classes.paragraph}>Copy specific messages for Twitter, Instagram and
                Facebook and post them on behalf of your corporate profiles. Follow specific
                instructions for each network.
              </Typography>
              {renderSocialsControllers()}
            </Grid>
            <Grid style={{width: '45%'}}>
              <div style={{display: 'flex'}}>
                <Typography className={classes.verifyCardTitle}>
                  {props.socials[activeSocial].title}
                </Typography> <img src={props.socials[activeSocial].logo} alt={"logo"}/>
              </div>
              <ul style={{marginTop: '30px'}}>
                {renderStepsList(props.socials[activeSocial].steps, verifyingCodes[activeSocial])}
              </ul>
              <Button className={classes.buttonVerify}
                 onClick={() => {window.open('https://twitter.com/intent/tweet?text=Our%20ORG.ID%20is%20did:orgid:0x00000000000000000000000000000000000tree','popup','width=600,height=255'); return false;}}
              >
                <Typography variant={'subtitle2'} noWrap className={classes.buttonVerifyTitle}>
                  {props.socials[activeSocial].button}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

TrustSocial.defaultProps = {
  socials: [
    {
      logo: twitterBig,
      title: "Verify your Twitter account",
      steps: [
        "Click on Verify Twitter button",
        "Your Twitter account will pop up with a draft message",
        "Post this message to your feed",
        "Congratulations, your account is verified!"
      ],
      button: "Verify Twitter"
    },
    {
      logo: facebookBig,
      title: "Verify your Facebook account",
      steps: [
        "Copy this text: %verifying code%",
        "Click on Verify Facebook button",
        "Post that as a comment under one of your posts on behalf of your corporate profile",
        "Congratulations, your account is verified!"
      ],
      button: "Verify Facebook"
    },
    {
      logo: instagramBig,
      title: "Verify your Instagram account",
      steps: [
        "Copy this text: %verifying code%",
        "Click on Verify Instagram button",
        "Post that as a comment under one of your posts on behalf of your corporate profile",
        "Congratulations, your account is verified!"
      ],
      button: "Verify Instagram"
    }
  ]
};

export default TrustSocial;
