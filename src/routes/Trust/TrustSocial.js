import React, {useState, useEffect} from "react";
import {Container, Typography, Grid, Card, Box, Button, Tooltip, TextField, CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import _ from 'lodash';

import history from '../../redux/history';
import {copyStrToClipboard} from '../../utils/helpers';
import {wizardConfig} from '../../utils/legalEntity';
import {WizardStepHosting, WizardStepMetaMask, Dialog} from '../../components';

import {selectSuccessState, selectPendingState, selectWizardOrgidJson, extendOrgidJson, resetTransactionStatus} from '../../ducks/wizard';

import colors from '../../styles/colors';
import {ArrowLeftIcon, CopyIcon, verifySocialMediaSvg, facebookIconSvg, instagramIconSvg, twitterIconSvg, listPlaceholderSvg, twitterBig, facebookBig, instagramBig} from '../../assets/SvgComponents';

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
  card: {
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    borderRadius: '6px',
    backgroundColor: colors.primary.white
  },
  cardContent: {
    padding: '36px',
    boxSizing: 'border-box'
  },
  cardSubtitle: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.45,
    color: colors.greyScale.dark
  },
  cardSubtitleWrapper: {
    paddingTop: '16px'
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
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
  },
  socialCardIcon: {
    marginRight: "15px"
  },
  copyButton: {
    padding: '4px',
    minWidth: 'auto',
    backgroundColor: 'transparent',
    marginLeft: '6px'
  },
  iconCopy: {
    width: '20px',
    height: '20px',
    color: colors.secondary.green,
  },
  dialogContent: {
    width: '440px'
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
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: colors.secondary.peach,
  },
  howTextListItem: {
    position: 'relative',
  },
  howListTexts: {
    display: 'inline-block',
    marginLeft: '23px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  howListPlaceholder: {
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
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.45,
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
  },
  cardTitleWrapper: {
    display: 'flex',
  },
  form: {
    paddingTop: '30px'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'start',
    color: colors.greyScale.darkest
  },
  dialogSubtitleWrapper: {
    padding: '20px 0 32px 0'
  },
  dialogSubtitle: {
    fontSize: '16px',
    lineHeight: 1.45,
    fontWeight: 400,
    color: colors.greyScale.common
  },
  dialogButtonWrapper: {
    display: 'table',
    paddingTop: '10px',
    margin: '0 auto'
  },
  dialogButton: {
    height: '44px',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
    textTransform: 'none',
    padding: '6px 20px'
  },
  dialogButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  progressWrapper: {
    display: 'table',
    margin: '0 auto'
  }
});

const LightTooltip = withStyles({
  tooltip: {
    maxWidth: '240px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.secondary.cyan,
    fontSize: '12px',
    fontWeight: 400,
    padding: '10px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap'
  }
})(Tooltip);

function TrustSocial(props) {
  const classes = styles();
  const [activeSocial, setActiveSocial] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [verification, setVerification] = useState(false);
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const {successTransaction, pendingTransaction} = props;
  const contacts = (!!history.location.state && !!history.location.state.contacts) ? history.location.state.contacts : false;
  const orgid = (!!history.location.state && !!history.location.state.orgid) ? history.location.state.orgid : 'undefined';
  const {twitter, facebook, instagram} = contacts;

  useEffect(() => {
    if(!contacts) {
      history.goBack()
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    props.resetTransactionStatus();
  }, [isModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const socialsControllers = [
    'Twitter',
    'Facebook',
    'Instagram',
  ];

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  function copyIdWithFeedback(str) {
    handleTooltipOpen();
    return copyStrToClipboard(str)
  }

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

  const copyToClipboard = (code) => {
    return (
      <span>
        <Typography variant={'caption'} className={classes.verifyingCode}>{code.length < 16 ? code : ` My ORG.ID is ${code.substr(0,6)}...${code.substr(-4)}`}</Typography>
        <span>
          <LightTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={'Copied to clipboard'}
            placement={'top-start'}
          >
            <Button onClick={() => copyIdWithFeedback(code)} className={classes.copyButton}>
              <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
            </Button>
          </LightTooltip>
        </span>
      </span>
    )
  };

  const renderStepsList = (steps, verifyingCode) => {
    let listItems = [...steps.map((text, index) => {
        let verifyingCodePlaceholder = text.indexOf('%');
        let transformedText = text;
        if (verifyingCodePlaceholder !== -1) {
          transformedText = transformedText.slice(0, verifyingCodePlaceholder);
        }
        return (
          <li key={index.toString()} className={classes.howTextListItem}>
            <span className={classes.howListDot}/>
            <Typography variant={'caption'} className={classes.howListTexts}>{transformedText}</Typography>
            {verifyingCodePlaceholder > 0 ? copyToClipboard(verifyingCode) : null}
          </li>
        )
      }
    )];

    let listItemsWithPlaceholders = [];

    for (let i = 0; i < listItems.length; i++) {
      listItemsWithPlaceholders.push(listItems[i]);
      if (i !== listItems.length - 1) {
        listItemsWithPlaceholders.push(<img key={(i + listItems.length).toString()} className={classes.howListPlaceholder} src={listPlaceholderSvg} alt={"|"}/>)
      }
    }

    return listItemsWithPlaceholders;
  };

  const handleChangeActiveSocial = (e) => {
    const item = e.target.innerHTML;
    const itemIndex = socialsControllers.indexOf(item);

    if (activeSocial === itemIndex) return;
    setActiveSocial(itemIndex);
    setVerification(false);
  };

  const verifyingCodes = [orgid, orgid, orgid];

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  const dialogStepsContent = (stepIndex) => {
    const content = wizardConfig[stepIndex];
    const { type } = content;

    switch (type) {
      case 'step_hosting': return <WizardStepHosting data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      case 'step_metamask': return <WizardStepMetaMask data={content} action={'edit'} handleNext={handleNext} key={stepIndex} index={stepIndex} stepTitle={false}/>;
      default: return (
        <div key={stepIndex}>Step <pre>${content.name}</pre> has unknown type: <pre>{content.type}</pre></div>
      );
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleMoveToOrganization = () => {
    handleCloseModal();
    history.replace('/trust/social', `/my-organizations/${orgid}`);
  };

  const setDialog = () => {
    const isPendingState = !!pendingTransaction;
    const isSuccessState = successTransaction;
    const isDialogState = !isPendingState && !isSuccessState;
    return (
      <Dialog
        handleClose={handleCloseModal}
        isOpen={isModalOpen}
        children={(
          <div className={classes.dialogContent}>
            {isDialogState &&
            dialogStepsContent(activeStep)
            }
            {isPendingState &&
            <div className={classes.progressWrapper}>
              <CircularProgress/>
            </div>
            }
            {isSuccessState &&
            <>
              <Typography variant={'caption'} className={classes.dialogTitle}>{`Your ${socialsControllers[activeSocial]} successfully verified!`}</Typography>
              <div className={classes.dialogSubtitleWrapper}>
                <Typography variant={'subtitle2'} className={classes.dialogSubtitle}>Well done! You could continue verify other trust steps</Typography>
              </div>
              <div className={classes.dialogButtonWrapper}>
                <Button onClick={handleMoveToOrganization} className={classes.dialogButton}>
                  <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                    Back to organization
                  </Typography>
                </Button>
              </div>
            </>
            }
          </div>
        )}
      />
    )
  };

  const handleFirstStepClick = () => {
    const type = props.socials[activeSocial].type;
    switch (type) {
      case "Twitter": window.open(`https://twitter.com/`, '_blank'); break;
      case "Facebook": window.open(`https://facebook.com/`, '_blank'); break;
      case "Instagram": window.open(`https://instagram.com/`, '_blank'); break;
      default: console.warn('Unexpected activeSocial type', type);
    }
    setVerification(!verification);
  };

  return (
    <div>
      <div className={classes.topDiv}>
        <Container className={classes.topSectionWrapper} style={{backgroundColor: colors.greyScale.moreLighter}}>
          <Box className={classes.screenHeader}>
            <div className={classes.backButtonWrapper}>
              <Button onClick={history.goBack}>
                <Typography className={classes.backButtonLabel}>
                  <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                  Back to organization profile
                </Typography>
              </Button>
            </div>
          </Box>
          <Grid item style={{display: 'flex'}}>
            <div className={classes.topWithCards}>
              <Typography className={classes.mainTitle} variant={'h1'}>Verify your social media</Typography>
              <Box>
                {facebook &&
                <Card className={classes.socialAddressCard}>
                  <img className={classes.socialCardIcon} src={facebookIconSvg} alt={"fb"}/>
                  <Typography>{facebook}</Typography>
                </Card>
                }
                {twitter &&
                <Card className={classes.socialAddressCard}>
                  <img className={classes.socialCardIcon} src={twitterIconSvg} alt={"tw"}/>
                  <Typography>{twitter}</Typography>
                </Card>
                }
                {instagram &&
                <Card className={classes.socialAddressCard}>
                  <img className={classes.socialCardIcon} src={instagramIconSvg} alt={"ig"}/>
                  <Typography>{instagram}</Typography>
                </Card>
                }
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
      </div>
      <Container className={classes.howSection}>
        <div>
          <Typography className={classes.howTitle}>
            How it works
          </Typography>
          <Grid container justify={'space-between'}>
            <Grid item className={classes.stepsCardsWrapper}>
              <Typography className={classes.paragraph}>Copy specific messages for Twitter, Instagram and
                Facebook and post them on behalf of your corporate profiles. Follow specific
                instructions for each network.
              </Typography>
              {renderSocialsControllers()}
            </Grid>
            <Grid item style={{width: '45%'}}>
              <Card className={classes.card}>
                <div className={classes.cardContent}>
                  <div className={classes.cardTitleWrapper}>
                    <Typography className={classes.verifyCardTitle}>
                      {props.socials[activeSocial].title}
                    </Typography> <img src={props.socials[activeSocial].logo} alt={"logo"}/>
                  </div>
                  {
                    verification ? (
                      <>
                        <div className={classes.cardSubtitleWrapper}>
                          <Typography variant={'subtitle1'} className={classes.cardSubtitle}>
                            Paste a direct link to your verification post below
                          </Typography>
                          <Formik
                            initialValues={{ link: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                              setSubmitting(false);
                              const type = props.socials[activeSocial].type.toLowerCase();
                              let trust = _.get(props.orgidJson, 'trust', []);
                              _.remove(trust, o => o.type === type);
                              trust.push({
                                type,
                                proof: values.link
                              });
                              props.extendOrgidJson({ trust });
                              handleOpenModal();
                            }}
                          >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                              }) => (
                                <form onSubmit={handleSubmit} className={classes.form}>
                                  <TextField
                                    name={'link'}
                                    autoComplete={'none'}
                                    variant={'filled'}
                                    label={`Link to your ${props.socials[activeSocial].type}`}
                                    fullWidth
                                    values={values.link}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={errors.link && touched.link ? errors.link : 'Open your post in a new window and copy the link from the address bar'}
                                  />
                                  <Button type="submit" disabled={isSubmitting} className={classes.buttonVerify}>
                                    <Typography variant={'caption'} className={classes.buttonVerifyTitle}>{`Verify ${props.socials[activeSocial].type}`}</Typography>
                                  </Button>
                                </form>
                            )}
                          </Formik>
                        </div>
                      </>
                    ) : (
                      <>
                        <ul style={{marginTop: '30px'}}>
                          {renderStepsList(props.socials[activeSocial].steps, verifyingCodes[activeSocial])}
                        </ul>
                        <Button className={classes.buttonVerify} onClick={handleFirstStepClick}>
                          <Typography variant={'subtitle2'} noWrap className={classes.buttonVerifyTitle}>
                            {props.socials[activeSocial].button}
                          </Typography>
                        </Button></>
                    )
                  }
                  {setDialog()}
                </div>
              </Card>
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
      type: 'Twitter',
      logo: twitterBig,
      title: "Verify your Twitter account",
      steps: [
        "Copy this text: %verifying code%",
        "Click on Open Twitter button",
        "Post this message to your feed and share the link with us",
        "Congratulations, your account is verified!"
      ],
      button: "Open Twitter"
    },
    {
      type: 'Facebook',
      logo: facebookBig,
      title: "Verify your Facebook account",
      steps: [
        "Copy this text: %verifying code%",
        "Click on Open Facebook button to open your account",
        "Post that as a comment under one of your posts on behalf of your corporate profile",
        "Congratulations, your account is verified!"
      ],
      button: "Open Facebook"
    },
    {
      type: 'Instagram',
      logo: instagramBig,
      title: "Verify your Instagram account",
      steps: [
        "Copy this text: %verifying code%",
        "Click on Open Instagram button to open your account",
        "Post that as a comment under one of your posts on behalf of your corporate profile",
        "Congratulations, your account is verified!"
      ],
      button: "Open Instagram"
    }
  ]
};

const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state),
    pendingTransaction: selectPendingState(state),
    successTransaction: selectSuccessState(state),
  }
};

const mapDispatchToProps = {
  extendOrgidJson,
  resetTransactionStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(TrustSocial);
