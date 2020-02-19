import React, { useState } from 'react';
import history from '../redux/history';
import PropTypes from 'prop-types';
import { Grid, Container, Typography, Button, Collapse, Fade, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';
//Icons
import InfoIcon from '../assets/SvgComponents/InfoIcon';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import EntityTrustLevelIcon from '../assets/SvgComponents/EntityTrustLevelIcon';
import StageIcon from '../assets/SvgComponents/StageIcon';
import DefaultImage from '../assets/images/default-image.jpg';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramSocialIcon from '../assets/SvgComponents/TelegramSocialIcon';
import FacebookIcon from '@material-ui/icons/Facebook';
import MediumSocialIcon from '../assets/SvgComponents/MediumSocialIcon';
import InstagramSocialIcon from '../assets/SvgComponents/InstagramSocialIcon';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import MaximizeIcon from '../assets/SvgComponents/MaximizeIcon';
import MinimizeIcon from '../assets/SvgComponents/MinimizeIcon';
import DetailsIllustration from '../assets/SvgComponents/detailsIllustration.svg';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
//Components
import CardsGridList from './CardsGridList';
import OrgsGridItem from './OrgsGridItem';
import AddSubOrgCard from './AddSubOrgCard';
import CopyIdComponent from './CopyIdComponent';

import colors from '../styles/colors';
import _ from "lodash";

const styles = makeStyles({
  itemMainInfo: {
    position: 'relative',
    paddingBottom: '58px'
  },
  itemTrustInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '15px'
  },
  itemTrustInfoBase: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '46px',
    borderRadius: '4px',
    backgroundColor: colors.primary.white,
    color: colors.greyScale.common,
    border: `1px solid ${colors.greyScale.lightest}`,
    padding: '0 22px'
  },
  itemStage: {
    backgroundColor: colors.secondary.green,
    borderColor: colors.secondary.green,
    color: colors.primary.white,
    width: '270px',
    boxSizing: 'border-box',
    marginLeft: '11px',
    padding: '0 26px'
  },
  tooltipRef: {
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer'
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    marginLeft: '-7px',
    opacity: .5,
    color: colors.greyScale.common,
    transition: `opacity .3s ease, color .3s ease`,
    '&:hover': {
      opacity: 1,
      color: colors.secondary.green
    }
  },
  itemTrustInfoTitle: {
    fontSize: '14px',
    fontWeight: 400,
  },
  itemStageTitle: {
    fontSize: '16px',
    fontWeight: 500
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
    position: 'absolute',
    bottom: '83px',
    right: '0'
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
  detailsIllustration: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '0'
  },
  details: {
    position: 'relative',
    width: '70%',
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
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '20%',
    height: '4px',
    background: 'linear-gradient(88.72deg, #EC6F95 0.94%, #FCB871 100%)',
  },
  subsWrapper: {
    width: '100%',
    backgroundColor: colors.greyScale.moreLighter
  },
  subsContent: {
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  subsTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  agentsContent: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    padding: '60px 0'
  },
  agentsTitleWrapper: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  agentsSubtitle: {
    fontSize: '16px',
    lineHeight: 1.4
  },
  ownerInfoWrapper: {
    margin: '30px 0'
  },
  ownerInfo: {
    marginTop: '10px'
  },
  agentTitle: {
    fontWeight: 500,
    fontSize: '18px',
    color: colors.greyScale.darkest,
  },
  keyIcon: {
    fontSize: 'large',
    color: colors.greyScale.common,
    verticalAlign: 'sub',
    opacity: .5,
    marginRight: '14px'
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
  },
  agentItemWrapper: {
    padding: '10px 0',
    borderBottom: `1px solid ${colors.greyScale.lightest}`,
  },
  deleteAgentButton: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    float: 'right',
    color: colors.secondary.peach,
    textTransform: 'none',
  },
});

const LightTooltip = withStyles({
  tooltip: {
    maxWidth: '240px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.greyScale.common,
    fontSize: '12px',
    fontWeight: 400,
    padding: '12px',
    boxSizing: 'border-box'
  }
})(Tooltip);

const allTodo = {
  social: {
    step: 'Step 1. Confirm social network',
    link: '/trust/social',
    title: 'Verify your social media profiles',
    description: 'Post a specific message or comment on behalf of your corporate profiles on Twitter, Facebook and Instagram to prove your ownership.'
  },
  website: {
    step: 'Step 2. Confirm Website',
    link: '/trust/website',
    title: 'Verify your website ownership',
    description: 'It’s easy to prove that a website is linked to your organization profile via a DNS record or a text file in the root directory. '
  },
  ssl: {
    step: 'Step 3. Submit LIF stake',
    link: '/trust/lif-stake',
    title: 'Submit your Líf deposit and participate in platform governance ',
    description: 'Líf deposit serves as an anti-spam protection. You are required to submit 1000 Líf ($100) for every organization profile you create.'
  },
  lif: {
    step: 'Step 4. Setup Extended SSL',
    link: '/trust/ssl',
    title: 'Request an Extended Validation Certificate',
    description: 'Request a legal entity verification from a Certificate Authority of your choice. '
  }
};

const getTodo = (item) => {
  const todo = [];
  if (!(item.isSocialFBProved || item.isSocialTWProved || item.isSocialIGProved || item.isSocialLNProved)) todo.push(allTodo.social);
  if (!item.isWebsiteProved) todo.push(allTodo.website);
  if (!item.isSslProved) todo.push(allTodo.ssl);
  if (!item.isLifProved) todo.push(allTodo.lif);
  return todo;
};

function OrgProfileView(props) {
  const classes = styles();
  const [isOpen, toggleOpen] = useState(false);
  const {item, subs} = props;
  const { orgid: id, proofsQty, avatar, name, parent, isWebsiteProved, owner } = item;
  const todo = getTodo(item);
  const isSub = !!parent;
  const type = isSub ? 'entity' : 'legalEntity';
  const address = _.get(item, `jsonContent.${type}.locations[0].address`, {});
  const contacts = _.get(item, `jsonContent.${type}.contacts[0]`, {});
  const agents = _.get(item, `jsonContent.publicKey`, []);
  const description = _.get(item, `jsonContent.organizationalUnit.description`, false);
  const longDescription = _.get(item, `jsonContent.organizationalUnit.longDescription`, false);
  const entityName = _.get(item, `parent.name`, '');
  const entityTrustLevel = _.get(item, `parent.proofsQty`, 0);

  const social = [];
  const possibleSocial = {
    'facebook': 'FB',
    'telegram': 'TG',
    'twitter': 'TW',
    'instagram': 'IG',
    'linkedin': 'LN'
  };
  _.each(possibleSocial, (short, name) => {
    if (contacts[name]) social.push({ network: name, link: contacts[name], verified: !!item[`isSocial${short}Proved`]})
  });

  const ownOrganization = history.location.pathname === `/my-organizations/${id}`;

  return (
    <div>
      <Container className={classes.itemMainInfo}>
        {
          ownOrganization && (
            <div className={classes.itemTrustInfoContainer}>
              <div className={classes.itemTrustInfoBase}>
                <LightTooltip
                  title={'Your Trust level reflects the number of completed trust steps.'}
                  placement={'top-start'}
                >
                  <button className={classes.tooltipRef}>
                    <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
                  </button>
                </LightTooltip>
                <Typography variant={'caption'} className={classes.itemTrustInfoTitle}>Trust level: </Typography>
                <TrustLevelIcon viewBox={'0 0 16 16'} className={classes.iconTrustLevel}/>
                <Typography variant={'subtitle2'} className={classes.trustLevelValue}>{proofsQty}</Typography>
              </div>
              {
                todo.length ? (
                  <div className={[classes.itemTrustInfoBase, classes.itemStage].join(' ')} onClick={() => history.push(todo[0].link, { id })}>
                    <StageIcon viewBox={'0 0 20 20'} className={classes.stageIcon}/>
                    <Typography variant={'caption'} className={[classes.itemTrustInfoTitle, classes.itemStageTitle].join(' ')}>{todo[0].step}</Typography>
                  </div>
                ) : null
              }
            </div>
          )
        }
        <Grid container className={classes.orgMainInfoWrapper} wrap={'nowrap'}>

          {/* TOP-LEFT-BLOCK: IMAGE =================================================================================*/}
          <Grid item style={{ width: '44%' }}>
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
          <Grid item style={{ width: '56%' }}>
            <div className={classes.idInfoContainer}>
              <CopyIdComponent id={id || '0xLOADING'} leftElement={'Org ID: '} fontWeight={500}/>
              {
                ownOrganization || (
                  <div className={classes.publicTrustLevelWrapper}>
                    <Typography variant={'caption'} className={classes.itemTrustInfoTitle} style={{ color: colors.greyScale.common }}>Trust level: </Typography>
                    <TrustLevelIcon viewBox={'0 0 16 16'} className={classes.iconTrustLevel}/>
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
                    <Ellipsis clamp={1} tagName={'span'} className={classes.orgAddress}>{address.street_address}</Ellipsis>
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
              <div className={classes.orgInfoFieldWrapper} style={{ width: '100%' }}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Website: '}
                  <a href={contacts.website} target={'_blank'} className={classes.orgInfoField}>{contacts.website}</a>
                  {
                    isWebsiteProved ? (
                      <TrustLevelIcon viewBox={'0 0 16 16'} className={classes.iconTrustLevel} style={{ verticalAlign: 'text-bottom' }}/>
                    ) : null
                  }
                </Typography>
              </div>
              {
                isSub ? (
                  <div className={classes.orgInfoFieldWrapper} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant={'caption'} className={classes.orgInfoFieldTitle} style={{ maxWidth: '88%' }} noWrap>
                      Legal entity: <Typography variant={'inherit'} className={classes.orgInfoField}>{entityName}</Typography>
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
            social.map((item, index) => {
              const icon = (socialNetwork) => {
                switch(socialNetwork) {
                  case 'twitter':   return <TwitterIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>;
                  case 'facebook':  return <FacebookIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>;
                  case 'telegram':  return <TelegramSocialIcon className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>;
                  case 'medium':    return <MediumSocialIcon className={[classes.socialIcon, classes.iconMedium].join(' ')}/>;
                  case 'instagram': return <InstagramSocialIcon className={[classes.socialIcon, classes.iconInstagram].join(' ')}/>;
                  case 'github':    return <GitHubIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>;
                  case 'linkedin':  return <LinkedInIcon className={[classes.socialIcon, classes.iconLinkedin].join(' ')}/>;
                  default: return null;
                }
              };
              return (
                <a key={index.toString()} href={item.link} className={classes.socialLink}>
                  {
                    icon(item.network)
                  }
                  <Typography variant={'inherit'}>{item.network}</Typography>
                  {
                    item.isWebsiteProved ? (
                      <TrustLevelIcon viewBox={'0 0 16 16'} className={[classes.iconTrustLevel, classes.iconVerify].join(' ')}/>
                    ) : null
                  }
                </a>
              )
            })
          }
        </div>
        {/* ORG DETAILS =============================================================================================*/}
        {
          ownOrganization && isSub && (description || longDescription) && (
            <Fade in={!isOpen}>
              <div className={classes.toggleOpenDetailsButtonContainer}>
                <Button onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
                  <Typography variant={'inherit'}>
                    Show organization details <MaximizeIcon viewBox={'0 0 20 20'} className={classes.iconToggleDetailsOpen}/>
                  </Typography>
                </Button>
              </div>
            </Fade>
          )
        }
      </Container>
      {
        (description || longDescription) ? (
          ownOrganization ? (
            <Collapse in={isOpen} className={classes.detailsContainer}>
              <Container className={classes.detailsContent}>
                <div className={classes.details}>
                  <Typography variant={'inherit'} className={classes.detailsTitle}>{description}</Typography>
                  <Typography variant={'inherit'}>{longDescription}</Typography>
                  <div className={classes.line}/>
                </div>
                <img src={DetailsIllustration} alt={'Details illustration'} className={classes.detailsIllustration}/>
                <div className={classes.hideDetailsButtonWrapper}>
                  <Button onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
                    <Typography variant={'inherit'}>
                      Hide organization details <MinimizeIcon viewBox={'0 0 20 20'} className={classes.iconToggleDetailsOpen}/>
                    </Typography>
                  </Button>
                </div>
              </Container>
            </Collapse>
          ) : (
            <div className={classes.detailsContainer}>
              <Container className={classes.detailsContent}>
                <div className={classes.details}>
                  <Typography variant={'inherit'} className={classes.detailsTitle}>{description}</Typography>
                  <Typography variant={'inherit'}>{longDescription}</Typography>
                  <div className={classes.line}/>
                </div>
                <img src={DetailsIllustration} alt={'Details illustration'} className={classes.detailsIllustration}/>
              </Container>
            </div>
          )
        ): null
      }
      {/* SUB ORGANIZATIONS =========================================================================================*/}
      {
        subs.length !== 0 ? (
          <div className={classes.subsWrapper}>
            <Container className={classes.subsContent}>
              <Typography variant={'h6'} className={classes.subsTitle}>
                Organizational units ({subs.length})
              </Typography>
              <CardsGridList spacing={2}>
                {
                  subs.map((item, index) => {
                    return (
                      <Grid item key={index.toString()} style={{ width: '264px' }}>
                        <OrgsGridItem
                          orgid={item.orgid}
                          isSub={!!item.parent}
                          orgidType={item.orgidType}
                          entityName={item.parent.name}
                          entityTrustLevel={item.parent.proofsQty}
                          name={item.name}
                        />
                      </Grid>
                    )
                  })
                }
                {
                  ownOrganization && (
                    <Grid item style={{ width: '264px' }}>
                      <AddSubOrgCard/>
                    </Grid>
                  )
                }
              </CardsGridList>
            </Container>
          </div>
        ) : null
      }
      {/* AGENTS ====================================================================================================*/}
      {
        ownOrganization && (
          <Container>
            <div className={classes.agentsContent}>
              <div className={classes.agentsTitleWrapper}>
                <Typography variant={'inherit'}>Manage owners and agents</Typography>
              </div>
              <div>
                <Typography variant={'inherit'} className={classes.agentsSubtitle}>
                  Assign agents that could act on behalf of your organization. You can add public keys of your employees (or devices) that will be able to sign and encrypt communication on behalf of your organization
                </Typography>
              </div>
              <div className={classes.ownerInfoWrapper}>
                <Typography variant={'inherit'} className={classes.agentTitle}>Owner</Typography>
                <div className={classes.ownerInfo}>
                  <CopyIdComponent
                    id={owner}
                    leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                    fontSize={'14px'}
                    color={colors.greyScale.dark}
                  />
                </div>
              </div>
              <div className={classes.agentsListContainer}>
                <div className={classes.agentInfoWrapper}>
                  <Typography variant={'inherit'} className={classes.agentTitle}>Agents</Typography>
                </div>
                <div className={classes.buttonWrapper}>
                  <Button onClick={() => console.log('add agent')} className={classes.button}>
                    <Typography variant={'inherit'}>+ Add Agent key</Typography>
                  </Button>
                </div>
                {
                  agents.length !== 0 ? (
                    <div>
                      <ul>
                        {
                          agents.map((item, index) => {
                            return (
                              <li key={index.toString()} className={classes.agentItemWrapper}>
                                <Grid container justify={'space-between'} alignItems={'center'}>
                                  <Grid item xs={2}>
                                    <CopyIdComponent
                                      id={item.id}
                                      leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                                      fontSize={'14px'}
                                      color={colors.greyScale.dark}
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Typography>{item.comment}</Typography>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <Button onClick={() => console.log('delete agent')} className={classes.deleteAgentButton}>
                                      <Typography variant={'inherit'}>Delete agent key</Typography>
                                    </Button>
                                  </Grid>
                                </Grid>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <Typography>You have no agents</Typography>
                    </div>
                  )
                }
              </div>
            </div>
          </Container>
        )
      }
      {/* TODOLIST ==================================================================================================*/}
    </div>
  )
}

OrgProfileView.propTypes = {
  id: PropTypes.string,
  address: PropTypes.object,
  contacts: PropTypes.object,
};

export default OrgProfileView;
