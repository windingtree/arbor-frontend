import React, {useState} from "react";
import {Button, Collapse, Container, Fade, Grid, Typography} from "@material-ui/core";
import DefaultImage from "../../../assets/images/default-image.jpg";
import CopyIdComponent from "../../../components/CopyIdComponent";
import colors from "../../../styles/colors";
import Ellipsis from "react-dotdotdot";
import {
  TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
  TrustLevelIcon,
  EntityTrustLevelIcon,
  TelegramSocialIcon,
  MediumSocialIcon,
  InstagramSocialIcon,
  DetailsIllustration,
  MaximizeIcon,
  MinimizeIcon
} from '../../../assets/SvgComponents';
import _ from "lodash";
import {makeStyles} from "@material-ui/core/styles";


const styles = makeStyles({
  itemMainInfo: {
    position: 'relative',
    paddingBottom: '58px'
  },
  itemTrustInfoTitle: {
    fontSize: '14px',
    fontWeight: 400,
  },
  iconTrustLevel: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 4px 0 14px'
  },
  trustLevelValue: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    color: colors.primary.black
  },
  stageIcon: {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  },
  orgMainInfoWrapper: {
    padding: '20px 0',
  },
  orgImageWrapper: {
    position: 'relative',
    width: '450px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  orgImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  idInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  publicTrustLevelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  orgNameWrapper: {
    width: '100%',
    marginTop: '7px'
  },
  orgName: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  orgAddressWrapper: {
    margin: '24px 0 23px 0'
  },
  orgAddress: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.greyScale.dark,
  },
  mapLink: {
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: colors.secondary.cyan,
    marginLeft: '4px'
  },
  orgInfoFieldsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  orgInfoFieldWrapper: {
    width: '50%',
    margin: '5px 0'
  },
  orgInfoFieldTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.greyScale.dark,
  },
  orgInfoField: {
    textDecoration: 'none',
    fontWeight: 400,
    color: colors.greyScale.common
  },
  entityInfoItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '10%'
  },
  entityIcon: {
    width: '10px',
    height: '12px',
    color: colors.greyScale.common,
    marginRight: '4px'
  },
  entityValue: {
    color: colors.greyScale.darkest,
    fontSize: '12px',
    lineHeight: 1.2
  },
  socialInline: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '42px'
  },
  socialLink: {
    fontSize: '16px',
    lineHeight: 1.03,
    fontWeight: 500,
    color: colors.greyScale.darkest,
    textDecoration: 'none',
    textTransform: 'capitalize',
    marginRight: '29px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  socialIcon: {
    fontSize: 'large',
    marginRight: '10px'
  },
  iconFacebook: {
    color: colors.social.facebook,
  },
  iconVerify: {
    margin: '0 0 0 8px'
  },
  iconTelegram: {
    width: '18px',
    height: '15px'
  },
  iconTwitter: {
    color: colors.social.twitter,
  },
  iconMedium: {
    width: '17px',
    height: '14px'
  },
  iconInstagram: {
    width: '17px',
    height: '17px',
  },
  iconGitHub: {
    color: colors.primary.black
  },
  iconLinkedin: {
    color: colors.social.linkedin,
  },
  toggleOpenDetailsButtonContainer: {
    position: 'absolute',
    right: '0',
    bottom: '14px',
  },
  hideDetailsButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  toggleOpenDetailsButton: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.03,
    color: colors.secondary.peach,
    textTransform: 'none',
  },
  iconToggleDetailsOpen: {
    width: '20px',
    height: '20px',
    marginLeft: '14px',
    verticalAlign: 'middle'
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: colors.secondary.yellowLight,
    marginTop: '20px',
  },
  detailsContent: {
    position: 'relative',
    padding: '100px 0',
    overflow: 'hidden'
  },
  detailsGrid: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '0 15px'
    }
  },
  detailsIllustrationWrapper: {
    textAlign: 'center'
  },
  detailsIllustration: {
    width: '100%',
    maxWidth: '360px'
  },
  details: {
    fontSize: '16px',
    lineHeight: 1.7,
    fontWeight: 400,
    color: colors.greyScale.dark,
    paddingBottom: '40px'
  },
  detailsTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px',
    display: 'block',
  },
  line: {
    position: 'relative',
    top: '-2px',
    width: '20%',
    height: '4px',
    background: 'linear-gradient(88.72deg, #EC6F95 0.94%, #FCB871 100%)',
  },
  buttonWrapper: {
    width: '100%',
    margin: '20px 0'
  },
  button: {
    width: '100%',
    position: 'relative',
    fontSize: '16px',
    fontWeight: 500,
    color: colors.secondary.cyan,
    textTransform: 'none',
    boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
    backgroundColor: colors.primary.white,
    borderRadius: '8px',
    padding: '20px 0'
  }
});

function Info(props) {
  const classes = styles();
  const [isOpen, toggleOpen] = useState(false);
  const {organization, canManage} = props;
  const {orgid: id, proofsQty, avatar, name, parent, isWebsiteProved} = organization;
  const isSub = !!parent;
  const type = isSub ? 'entity' : 'legalEntity';
  const address = _.get(organization, `jsonContent.${type}.locations[0].address`, {});
  const contacts = _.get(organization, `jsonContent.${type}.contacts[0]`, {});
  const description = _.get(organization, `jsonContent.organizationalUnit.description`, null);
  const longDescription = _.get(organization, `jsonContent.organizationalUnit.longDescription`, null);
  const entityName = _.get(organization, `parent.name`, '');
  const entityTrustLevel = _.get(organization, `parent.proofsQty`, 0);
  const socials = [];
  const possibleSocial = {
    'facebook': 'FB',
    'telegram': 'TG',
    'twitter': 'TW',
    'instagram': 'IG',
    'linkedin': 'LN'
  };
  _.each(possibleSocial, (short, name) => {
    if (contacts[name]) socials.push({
      network: name,
      link: contacts[name],
      verified: !!organization[`isSocial${short}Proved`]
    })
  });
  const icon = (socialNetwork) => {
    switch (socialNetwork) {
      case 'twitter':
        return <TwitterIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>;
      case 'facebook':
        return <FacebookIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>;
      case 'telegram':
        return <TelegramSocialIcon className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>;
      case 'medium':
        return <MediumSocialIcon className={[classes.socialIcon, classes.iconMedium].join(' ')}/>;
      case 'instagram':
        return <InstagramSocialIcon className={[classes.socialIcon, classes.iconInstagram].join(' ')}/>;
      case 'github':
        return <GitHubIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>;
      case 'linkedin':
        return <LinkedInIcon className={[classes.socialIcon, classes.iconLinkedin].join(' ')}/>;
      default:
        return null;
    }
  };


  return (
    <div>
      <Container className={classes.itemMainInfo}>
        <Grid container className={classes.orgMainInfoWrapper} wrap={'nowrap'}>

          {/* TOP-LEFT-BLOCK: IMAGE =================================================================================*/}
          <Grid item style={{width: '44%'}}>
            <div className={classes.orgImageWrapper}>
              {
                avatar ? (
                  <img className={classes.orgImage} src={avatar} alt={'Organization'}/>
                ) : (
                  <img className={classes.orgImage} src={DefaultImage} alt={'Organization'}/>
                )
              }
            </div>
          </Grid>

          {/* TOP-RIGHT-BLOCK: INFO =================================================================================*/}
          <Grid item style={{width: '56%'}}>
            <div className={classes.idInfoContainer}>
              <CopyIdComponent id={id || '0xLOADING'} leftElement={'Org ID: '} fontWeight={500}/>
              {
                canManage || (
                  <div className={classes.publicTrustLevelWrapper}>
                    <Typography variant={'caption'} className={classes.itemTrustInfoTitle}
                                style={{color: colors.greyScale.common}}>Trust level: </Typography>
                    <TrustLevelIcon className={classes.iconTrustLevel}/>
                    <Typography variant={'subtitle2'} className={classes.trustLevelValue}>{proofsQty}</Typography>
                  </div>
                )
              }
            </div>
            <div className={classes.orgNameWrapper}>
              <Typography variant={'h6'} className={classes.orgName} noWrap>{name}</Typography>
            </div>
            <div className={classes.orgAddressWrapper}>
              {
                address ? (
                  <div>
                    <Ellipsis clamp={1} tagName={'span'}
                              className={classes.orgAddress}>{address.street_address}</Ellipsis>
                    <p className={classes.orgAddress}>
                      {`${address.city}, ${address.locality}`}
                      <a href={'https://www.google.com.ua/maps/'} className={classes.mapLink}>show on the map</a>
                    </p>
                  </div>
                ) : (
                  <Typography variant={'caption'} className={classes.orgAddress}>No address specified</Typography>
                )
              }
            </div>
            <div className={classes.orgInfoFieldsContainer}>
              <div className={classes.orgInfoFieldWrapper}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Phone: '}
                  <a href={`tel:${contacts.phone}`} className={classes.orgInfoField}>{contacts.phone}</a>
                </Typography>
              </div>
              <div className={classes.orgInfoFieldWrapper}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Email: '}
                  <a href={`mailto:${contacts.email}`} className={classes.orgInfoField}>{contacts.email}</a>
                </Typography>
              </div>
              <div className={classes.orgInfoFieldWrapper} style={{width: '100%'}}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Website: '}
                  <a href={contacts.website} target={'_blank'} className={classes.orgInfoField}>{contacts.website}</a>
                  {
                    isWebsiteProved ? (
                      <TrustLevelIcon className={classes.iconTrustLevel} style={{verticalAlign: 'text-bottom'}}/>
                    ) : null
                  }
                </Typography>
              </div>
              {
                isSub ? (
                  <div className={classes.orgInfoFieldWrapper}
                       style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Typography variant={'caption'} className={classes.orgInfoFieldTitle} style={{maxWidth: '88%'}}
                                noWrap>
                      Legal entity: <Typography variant={'inherit'}
                                                className={classes.orgInfoField}>{entityName}</Typography>
                    </Typography>
                    <div className={classes.entityInfoItem}>
                      <EntityTrustLevelIcon viewBox={'0 0 12 12'} className={classes.entityIcon}/>
                      <Typography variant={'subtitle2'} className={classes.entityValue}>
                        {entityTrustLevel}
                      </Typography>
                    </div>
                  </div>
                ) : null
              }
            </div>
          </Grid>
        </Grid>

        {/* SOCIAL NETWORK LINKS ====================================================================================*/}
        <div className={classes.socialInline}>
          {
            socials.map((social, index) => {
              return (
                <a key={index.toString()} href={social.link} className={classes.socialLink}>
                  {icon(social.network)}
                  <Typography variant={'inherit'}>{social.network}</Typography>
                  {social.verified &&
                  <TrustLevelIcon className={[classes.iconTrustLevel, classes.iconVerify].join(' ')}/>}
                </a>
              )
            })
          }
        </div>
        {canManage && isSub && (description || longDescription) && (
          <Fade in={!isOpen}>
            <div className={classes.toggleOpenDetailsButtonContainer}>
              <Button onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
                <Typography variant={'inherit'}>
                  Show organization details <MaximizeIcon viewBox={'0 0 20 20'}
                                                          className={classes.iconToggleDetailsOpen}/>
                </Typography>
              </Button>
            </div>
          </Fade>
        )}
      </Container>
      {
        (description || longDescription) ? (
          canManage ? (
            <Collapse in={isOpen} className={classes.detailsContainer}>
              <Container className={classes.detailsContent}>
                <Grid className={classes.detailsGrid} container>
                  <Grid item md={9} xs={12} className={classes.details}>
                    <Typography variant={'inherit'} className={classes.detailsTitle}>{description}</Typography>
                    <Typography variant={'inherit'}>{longDescription}</Typography>
                  </Grid>
                  <Grid className={classes.detailsIllustrationWrapper} item md={3} xs={12}><img
                    src={DetailsIllustration} alt={'Details illustration'}
                    className={classes.detailsIllustration}/>
                  </Grid>
                </Grid>
                <div className={classes.hideDetailsButtonWrapper}>
                  <div className={classes.line}/>
                  <Button onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
                    <Typography variant={'inherit'}>
                      Hide organization details <MinimizeIcon viewBox={'0 0 20 20'}
                                                              className={classes.iconToggleDetailsOpen}/>
                    </Typography>
                  </Button>
                </div>
              </Container>
            </Collapse>
          ) : (
            <div className={classes.detailsContainer}>
              <Container className={classes.detailsContent}>
                <Grid className={classes.detailsGrid} container>
                  <Grid item md={9} xs={12} className={classes.details}>
                    <Typography variant={'inherit'} className={classes.detailsTitle}>{description}</Typography>
                    <Typography variant={'inherit'}>{longDescription}</Typography>

                  </Grid>
                  <Grid className={classes.detailsIllustrationWrapper} item md={3} xs={12}><img
                    src={DetailsIllustration} alt={'Details illustration'}
                    className={classes.detailsIllustration}/>
                  </Grid>
                </Grid>
                <div className={classes.line}/>
              </Container>
            </div>
          )
        ) : null
      }
    </div>
  )
}

export default Info;
