import React from 'react';
import history from '../redux/history';
import PropTypes from 'prop-types';
import { Grid, Container, Typography, Collapse, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
import ButtonCommon from './Button';
import AddSubOrgCard from './AddSubOrgCard';
import CopyIdComponent from './CopyIdComponent';

import colors from '../styles/colors';

const styles = makeStyles({
  itemTrustInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '15px'
  },
  itemTrustInfoBase: {
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
  infoIcon: {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    marginLeft: '-7px'
  },
  itemTrustInfoTitle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.2
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
    marginRight: '56px'
  },
  orgImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  orgNameWrapper: {
    width: '100%',
    marginTop: '7px'
  },
  orgName: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1.2,
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
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: colors.secondary.green,
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
    lineHeight: 1.2,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  agentsContent: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1.2,
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
    lineHeight: 1.2,
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

export default function OrgProfileView(props) {
  const classes = styles();
  const {
    stage,
    tel,
    web,
    email,
    verified,
    subs,
    social,
    isOpen,
    toggleOpen,
    details,
    agents
  } = props;

  const {
    id,
    trustLevel,
    img,
    name,
    address,
    isSub,
    entityName,
    entityTrustLevel,
  } = history.location.state;

  return (
    <div>
      <Container>
        <div className={classes.itemTrustInfoContainer}>
          <div className={classes.itemTrustInfoBase}>
            <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
            <Typography variant={'caption'} className={classes.itemTrustInfoTitle}>Trust level: </Typography>
            <TrustLevelIcon viewBox={'0 0 16 16'} className={classes.iconTrustLevel}/>
            <Typography variant={'subtitle2'} className={classes.trustLevelValue}>{trustLevel}</Typography>
          </div>
          {
            !isSub ? (
              <div className={[classes.itemTrustInfoBase, classes.itemStage].join(' ')}>
                <StageIcon viewBox={'0 0 20 20'} className={classes.stageIcon}/>
                <Typography variant={'caption'} className={[classes.itemTrustInfoTitle, classes.itemStageTitle].join(' ')}>{stage}</Typography>
              </div>
            ) : null
          }
        </div>
        <Grid container className={classes.orgMainInfoWrapper} wrap={'nowrap'}>
          <Grid item>
            <div className={classes.orgImageWrapper}>
              {
                img ? (
                    <img className={classes.orgImage} src={img} alt={'Organization'}/>
                ): (
                    <img className={classes.orgImage} src={DefaultImage} alt={'Organization'}/>
                )
              }
            </div>
          </Grid>
          <Grid item>
            <CopyIdComponent id={id} leftElement={'Org ID: '} fontWeight={500}/>
            <div className={classes.orgNameWrapper}>
              <Typography variant={'h6'} className={classes.orgName} noWrap>{name}</Typography>
            </div>
            <div className={classes.orgAddressWrapper}>
              {
                address ? (
                  <div>
                    <Ellipsis clamp={2} tagName={'span'} className={classes.orgAddress}>{address}</Ellipsis>
                    <a href={'https://www.google.com.ua/maps/'} className={classes.mapLink}>show on the map</a>
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
                  <a href={`tel:${tel}`} className={classes.orgInfoField}>{tel}</a>
                </Typography>
              </div>
              <div className={classes.orgInfoFieldWrapper}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Email: '}
                  <a href={`mailto:${email}`} className={classes.orgInfoField}>{email}</a>
                </Typography>
              </div>
              <div className={classes.orgInfoFieldWrapper} style={{ width: '100%' }}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Website: '}
                  <a href={web} target={'_blank'} className={classes.orgInfoField}>{web}</a>
                  {
                    verified ? (
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
        <div className={classes.socialInline}>
          {
            social.map((item, index) => {
              const icon = (socialType) => {
                switch(socialType[0]) {
                  case 'twitter':
                    return (
                      <TwitterIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>
                    );
                  case 'facebook':
                    return (
                      <FacebookIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>
                    );
                  case 'telegram':
                    return (
                      <TelegramSocialIcon viewBox={'0 0 18 15'} className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>
                    );
                  case 'medium':
                    return (
                      <MediumSocialIcon viewBox={'0 0 14 17'} className={[classes.socialIcon, classes.iconMedium].join(' ')}/>
                    );
                  case 'instagram':
                    return (
                      <InstagramSocialIcon viewBox={'0 0 17 17'} className={[classes.socialIcon, classes.iconInstagram].join(' ')}/>
                    );
                  case 'github':
                    return (
                      <GitHubIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>
                    );
                  case 'linkedin':
                    return (
                      <LinkedInIcon className={[classes.socialIcon, classes.iconLinkedin].join(' ')}/>
                    );
                  default:
                    return null;
                }
              };
              return (
                <a key={index.toString()} href={Object.values(item)[0]} className={classes.socialLink}>
                  {
                    icon(Object.keys(item))
                  }
                  <Typography variant={'inherit'}>{Object.keys(item)[0]}</Typography>
                  {
                    Object.values(item)[1] ? (
                      <TrustLevelIcon viewBox={'0 0 16 16'} className={[classes.iconTrustLevel, classes.iconVerify].join(' ')}/>
                    ) : null
                  }
                </a>
              )
            })
          }
        </div>
        <Fade in={!isOpen}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonCommon onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
              <Typography variant={'inherit'}>
                Show organization details <MaximizeIcon viewBox={'0 0 20 20'} className={classes.iconToggleDetailsOpen}/>
              </Typography>
            </ButtonCommon>
          </div>
        </Fade>
      </Container>
      <Collapse in={isOpen} className={classes.detailsContainer}>
        <Container className={classes.detailsContent}>
          <div className={classes.details}>
            <Typography variant={'inherit'} className={classes.detailsTitle}>{details.title}</Typography>
            <Typography variant={'inherit'}>{details.text}</Typography>
            <div className={classes.line}/>
          </div>
          <img src={DetailsIllustration} alt={'Details illustration'} className={classes.detailsIllustration}/>
          <div className={classes.hideDetailsButtonWrapper}>
            <ButtonCommon onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
              <Typography variant={'inherit'}>
                Hide organization details <MinimizeIcon viewBox={'0 0 20 20'} className={classes.iconToggleDetailsOpen}/>
              </Typography>
            </ButtonCommon>
          </div>
        </Container>
      </Collapse>
      {
        subs.length !== 0 ? (
          <div className={classes.subsWrapper}>
            <Container className={classes.subsContent}>
              <Typography variant={'h6'} className={classes.subsTitle}>
                Sub organizations ({subs.length})
              </Typography>
              <CardsGridList spacing={2}>
                {
                  subs.map((item, index) => {
                    return (
                      <Grid item key={index.toString()} style={{ width: '264px' }}>
                        <OrgsGridItem
                          id={item.id}
                          isSub={item.isSub}
                          type={item.type}
                          entityName={name}
                          entityTrustLevel={trustLevel}
                          name={item.subName}
                        />
                      </Grid>
                    )
                  })
                }
                <Grid item style={{ width: '264px' }}>
                  <AddSubOrgCard/>
                </Grid>
              </CardsGridList>
            </Container>
          </div>
        ) : null
      }
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
                id={id}
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
              <ButtonCommon onClick={() => console.log('add agent')} className={classes.button}>
                <Typography variant={'inherit'}>+ Add Agent key</Typography>
              </ButtonCommon>
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
                                <ButtonCommon onClick={() => console.log('delete agent')} className={classes.deleteAgentButton}>
                                  <Typography variant={'inherit'}>Delete agent key</Typography>
                                </ButtonCommon>
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
    </div>
  )
}

OrgProfileView.propTypes = {
  id: PropTypes.string,
  //TODO define prop types
};

OrgProfileView.defaultProps = {
  id: '0x3288gjgndk48d8dsjsf8f9ssjsj88f',
  stage: 'Step 2. Submit LIF stake ',
  trustLevel: '1',
  img: null,
  name: 'Default organization',
  address: 'Default address with extremely long description and it will go on the second line',
  tel: '+33144385600',
  web: 'all.accor.com',
  email: 'all.accor@gmail.com',
  verified: true,
  subs: [
    {
      id: '0x67jrfh774854nre7ns8r8f85g',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Travel Agency',
    },
    {
      id: '0x67jrfh774854nre7ns8r8f6ig',
      subName: 'Default subOrg with very long name',
      isSub: true,
      type: 'Hotel',
    },
  ],
  isSub: false,
  entityName: 'Default Corp',
  entityTrustLevel: '5',
  social: [
    {
      facebook: 'https://facebook.com/',
      verified: false
    },
    {
      telegram: 'https://web.telegram.org/',
      verified: false
    },
    {
      twitter: 'https://twitter.com/',
      verified: true
    },
    {
      instagram: 'https://instagram.com/',
      verified: false
    }
  ],
  details: {
    title: 'Details. User title example',
    text: 'Located just a few steps from some of the oldest and most precious ruins in Rome, including the Colosseum and the Roman Forum, offering 5 star service boasts charming views of the Campidoglio, Palatin Hill, Roman Forum, Venice Square. It\'s the only luxury residence in Rome which actually houses Roman ruins inside it. At the entrance, a passageway leads you to a Cryptoporticus, an exquisite stone gallery with engravings that can be traced back to 2,000 years ago. The five star service accommodations are carefully decorated in a modern style and are luxuriously furnished. On the roof terrace you can enjoy free snacks from 17:00 to 20:00. This inn is pet friendly.'
  },
  agents: [
    {
      id: '0xcdmfkfkslamsmssmooc55dc8dcdf',
      comment: 'Default agent'
    },
    {
      id: '0xcdmfkfkslamsmssmooc557fjfnde4',
      comment: 'Default agent'
    },
    {
      id: '0xcdmfkfkslamsmssmooc55dh54ddcf',
      comment: ''
    },
    {
      id: '0xcdmfkfkslamsmssmooc55dcdmk6fd',
      comment: 'Nice guy'
    },
  ]
};