import React from "react";
import { Link } from 'react-router-dom';
import history from '../redux/history';
import { Card, CardContent, CardMedia, Grid, Typography, Button, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import ChevronCircleIcon from '../assets/SvgComponents/ChevronCircleIcon';
import ImageErrorIcon from '../assets/SvgComponents/ImageErrorIcon';
import CopyIdComponent from './CopyIdComponent';
import CardsGridList from './CardsGridList';
import OrgsGridItem from './OrgsGridItem';

import colors from '../styles/colors';

const styles = makeStyles({
  item: {
    position: 'relative',
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${colors.greyScale.lightest}`,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    margin: '6px 0'
  },
  linkToProfileView: {
    textTransform: 'none',
    textDecoration: 'none',
    textAlign: 'start',
    backgroundColor: colors.primary.white,
    outline: 'none',
  },
  itemImg: {
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    background: colors.primary.black,
  },
  itemImgError: {
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    background: colors.primary.accent,
  },
  itemImgErrorIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '22px',
    height: '22px',
  },
  itemInfo: {
    width: '80%',
    marginLeft: '12px'
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '7px'
  },
  errorMessage: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.greyScale.darkest
  },
  errorExpiresAt: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.primary.accent
  },
  errorButton: {
    position: 'relative',
    top: '5px',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    textTransform: 'none',
  },
  errorButtonLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: colors.primary.white,
    padding: '2px 12px'
  },
  icon: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 6px 0 9px'
  },
  label: {
    color: colors.greyScale.common
  },
  trustLevelValue: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.1,
    color: colors.primary.black
  },
  addSubOrgButtonWrapper: {
    position: 'relative',
    top: '12px'
  },
  addSubOrgButton: {
    textTransform: 'none'
  },
  buttonTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.secondary.cyan
  },
  subOrgsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '10px',
  },
  subOrgsLabel: {
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'none',
    color: colors.primary.black
  },
  openSubOrgsButton: {
    position: 'relative',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundImage: 'linear-gradient(35.28deg, rgba(236, 111, 149, 0.1) 0%, rgba(252, 184, 113, 0.1) 100%)',
    minWidth: 'auto',
    padding: '0'
  },
  badge: {
    background: 'red',
    borderRadius: '5px',
  },
  subOrgDropdown: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subsListWrapper: {
    position: 'relative',
    maxHeight: '310px',
    overflow: 'hidden'
  },
  subsListOverflowOpacity: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    height: '100%',
    width: '264px',
    background: 'linear-gradient(to right, transparent, white)',
  }
});

export default function OrgsListItem(props) {
  const classes = styles();
  const {
    id,
    img,
    name,
    trustLevel,
    subs,
    isSub,
    social,
    stage,
    tel,
    web,
    email,
    verified,
    address,
    entityName,
    entityTrustLevel,
    details,
    agents,
    isSubsOpen,
    toggleSubsOpen,
    error
  } = props;

  return (
    <Card className={classes.item}
          style={{ backgroundColor: error ? colors.secondary.error : colors.primary.white }}
    >
      <CardContent style={{ padding: '20px' }}>
        <Grid container justify="space-between" alignItems='flex-start' wrap='nowrap'>
          <Grid item container wrap='nowrap' style={{ width: '85%' }}>
            <Link to={{
              pathname: `/my-organizations/${id}`,
              state: {
                id: id,
                img: img,
                isSub: isSub,
                name: name,
                trustLevel: trustLevel,
                social: social,
                verified: verified,
                address: address,
                subs: subs,
                details: details,
                agents: agents,
                stage: stage,
                tel: tel,
                web: web,
                email: email,
                entityName: entityName,
                entityTrustLevel: entityTrustLevel
              }
            }} className={classes.linkToProfileView}>
              {
                img ? (
                  <CardMedia label={'Organization picture'} image={img.src} className={classes.itemImg}/>
                ) : error ? (
                  <div className={classes.itemImgError}>
                    <ImageErrorIcon viewbow={'0 0 22 22'} className={classes.itemImgErrorIcon}/>
                  </div>
                ) : <div className={classes.itemImg}/>
              }
            </Link>
            <div className={classes.itemInfo}>
              <Link to={{
                pathname: `/my-organizations/${id}`,
                state: {
                  id: id,
                  img: img,
                  isSub: isSub,
                  name: name,
                  trustLevel: trustLevel,
                  social: social,
                  verified: verified,
                  address: address,
                  subs: subs,
                  details: details,
                  agents: agents,
                  stage: stage,
                  tel: tel,
                  web: web,
                  email: email,
                  entityName: entityName,
                  entityTrustLevel: entityTrustLevel
                }
              }} className={classes.linkToProfileView}>
                <Typography
                  variant={'subtitle2'}
                  className={classes.itemName}
                  style={{ color: error ? colors.primary.accent : colors.greyScale.darkest }}
                  noWrap
                >
                  {name}
                </Typography>
              </Link>
              {
                error ? (
                  <Typography variant={'subtitle2'} className={classes.errorMessage} noWrap>{error.message}</Typography>
                ) : (
                  <CopyIdComponent id={id} leftElement={'ID: '} style={{ zIndex: 100 }}/>
                )
              }
            </div>
          </Grid>
          {
            error ? (
              <Grid item container alignItems={'flex-end'} justify={'space-between'} direction={'column'}>
                <Typography variant={'caption'} className={classes.errorExpiresAt}>
                  Will be deleted in {error.expiresAt}
                </Typography>
                <Button onClick={() => 'try again'} className={classes.errorButton}>
                  <Typography variant={'caption'} className={classes.errorButtonLabel}>Try again</Typography>
                </Button>
              </Grid>
            ) : (
              <Grid item container alignItems={'flex-end'} justify={'space-between'} direction={'column'}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant={'caption'} className={classes.label}>Trust level: </Typography>
                  <TrustLevelIcon
                    viewBox={'0 0 16 16'}
                    className={classes.icon}
                  />
                  <Typography variant={'caption'} className={classes.trustLevelValue}>{trustLevel}</Typography>
                </div>
                <div className={classes.addSubOrgButtonWrapper}>
                  <Button
                    onClick={() => history.push('/my-organizations/wizard/general', { type: 'entity', parent: id })}
                    className={classes.addSubOrgButton}
                  >
                    <Typography variant={'caption'} className={classes.buttonTitle} noWrap>+ Add organizational unit</Typography>
                  </Button>
                </div>
              </Grid>
            )
          }
        </Grid>
        {
          !error ? subs.length !== 0 ? (
            <div>
              <div className={classes.subOrgsContainer}>
                <Typography variant={'inherit'} className={classes.subOrgsLabel}>
                  Organizational units ({subs.length})
                </Typography>
                <Button
                  onClick={() => toggleSubsOpen(!isSubsOpen)}
                  className={classes.openSubOrgsButton}
                >
                  <ChevronCircleIcon
                    viewBox={'0 0 16 16'}
                    style={{
                      width: '16px',
                      height: '16px',
                      color: colors.primary.accent,
                      transition: 'transform .5s ease',
                      transform: isSubsOpen ? 'rotate(180deg)' : 'rotate(0)'
                    }}
                  />
                </Button>
              </div>
              <Collapse in={isSubsOpen}>
                <div className={classes.subsListWrapper}>
                  <CardsGridList spacing={2} justify="flex-start" alignItems="flex-start" style={{ marginTop: '12px' }}>
                    {
                      subs.map((item, index) => (
                        <Grid item key={index.toString()} style={{ width: '264px' }}>
                          <OrgsGridItem
                            id={item.id}
                            isSub={item.isSub}
                            entityName={item.entityName}
                            name={item.subName}
                            entityTrustLevel={item.entityTrustLevel}
                            type={item.type}
                          />
                        </Grid>
                      ))
                    }
                  </CardsGridList>
                  <div className={classes.subsListOverflowOpacity}/>
                </div>
              </Collapse>
            </div>
          ) : null : null
        }
      </CardContent>
    </Card>
  )
};

OrgsListItem.defaultProps = {
  id: '0xnfjrfh774854nre7ns8r8f8fd',
  img: null,
  name: 'Default Organization',
  trustLevel: '5',
  subs: [
    {
      id: '0x67jrfh774854nre7ns8r8f85g',
      entityName: 'Default Organization',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Travel Agency',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8f6ig',
      entityName: 'Default Organization',
      subName: 'Default subOrg with very long name',
      isSub: true,
      type: 'Hotel',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8fmju',
      entityName: 'Default Organization',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Travel Agency',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8f88o',
      entityName: 'Default Organization',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Insurance',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8f54f',
      entityName: 'Default Organization',
      subName: 'Suuuuuubbbooooooorg',
      isSub: true,
      type: 'Hotel',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8fnh6',
      entityName: 'Default Organization',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Travel Agency',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8fgd3',
      entityName: 'Default Organization',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Airline',
      entityTrustLevel: '5'
    },
    {
      id: '0x67jrfh774854nre7ns8r8f77g',
      entityName: 'Default Organization',
      subName: 'Default subOrg',
      isSub: true,
      type: 'Insurance',
      entityTrustLevel: '5'
    },
  ],
  isSub: false,
  error: false
  // error: {
  //   expiresAt: '2h: 20m: 5s',
  //   message: 'Something went wrong and organisation was not created. We saved all you info and you can try again'
  // }
};
