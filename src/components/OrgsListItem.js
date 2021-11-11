import React, { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import history from '../redux/history';
import { Card, CardContent, Grid, Typography, Button, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import ChevronCircleIcon from '../assets/SvgComponents/ChevronCircleIcon';
import ImageErrorIcon from '../assets/SvgComponents/ImageErrorIcon';
import CopyIdComponent from './CopyIdComponent';
import CardsGridList from './CardsGridList';
import OrgsGridItem from './OrgsGridItem';
import {setRandomDefaultImage} from "../utils/helpers";

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
  itemImgWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: '48px',
    height: '48px',
    borderRadius: '4px',
  },
  itemImg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.5)',
  },
  itemRealImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  itemImgError: {
    background: colors.primary.accent,
  },
  itemImgErrorIcon: {
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
    background: 'linear-gradient(to right, rgba(255,255,255,0), white)',
  },
  stateDisabled: {
    color: colors.primary.accent
  }
});

export default function OrgsListItem(props) {
  const classes = styles();
  const [isSubsOpen, toggleSubsOpen] = useState(false);
  const {canManage, organization, error} = props;
  const {orgid: id, logo, name, proofsQty, subs, orgidType } = organization;

  const imgError = useCallback(function onImgError(e) {
    if (e.target) {
      e.target.onerror = null;
      e.target.className = classes.itemImg;
      e.target.src = setRandomDefaultImage(id, orgidType || 'hotel');
    }
    return true;
  }, [classes, id, orgidType]);

  const fixOldDomain = path => path.replace('arbor.fm', 'marketplace.windingtree.com');

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
              }
            }} className={classes.linkToProfileView}>
              {
                logo ? (
                  <div className={classes.itemImgWrapper}>
                    <img alt={'logo'} src={fixOldDomain(logo)} className={classes.itemRealImg} onError={imgError}/>
                  </div>
                ) : error ? (
                  <div className={[classes.itemImgWrapper, classes.itemImgError].join(' ')}>
                    <ImageErrorIcon viewbow={'0 0 22 22'} className={[classes.itemImg, classes.itemImgErrorIcon].join(' ')}/>
                  </div>
                ) : (
                  <div className={classes.itemImgWrapper}>
                    <img src={setRandomDefaultImage(id, orgidType)} alt={'logo'} className={classes.itemImg}/>
                  </div>
                )
              }
            </Link>
            <div className={classes.itemInfo}>
              <Link to={{
                pathname: `/my-organizations/${id}`,
                state: {
                  id: id,
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
                  <CopyIdComponent id={id} leftElement={''} style={{ zIndex: 100 }}/>
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
                  <Typography variant={'caption'} className={classes.label}>Trust</Typography>
                  <TrustLevelIcon
                    viewBox={'0 0 16 16'}
                    className={classes.icon}
                  />
                  <Typography variant={'caption'} className={classes.trustLevelValue}>{proofsQty}</Typography>
                </div>
                <div>
                {!organization.state &&
                  <Typography variant={'caption'} className={classes.label}>Active status: <span className={classes.stateDisabled}>Disabled</span></Typography>
                }
                </div>
                <div className={classes.addSubOrgButtonWrapper}>
                  <Button
                    onClick={() => history.push('/my-organizations/wizard', { type: 'organizationalUnit', parent: { orgid: id, name } })}
                    className={classes.addSubOrgButton}
                  >
                    <Typography variant={'caption'} className={classes.buttonTitle} noWrap>Add Business Unit</Typography>
                  </Button>
                </div>
              </Grid>
            )
          }
        </Grid>
        {
          !error && subs && subs.length !== 0 ? (
            <div>
              <div className={classes.subOrgsContainer}>
                <Typography variant={'inherit'} className={classes.subOrgsLabel}>
                  Business Units ({subs.length})
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
                          <OrgsGridItem organization={item} canManage={canManage}/>
                        </Grid>
                      ))
                    }
                  </CardsGridList>
                  <div className={classes.subsListOverflowOpacity}/>
                </div>
              </Collapse>
            </div>
          ) : null
        }
      </CardContent>
    </Card>
  )
};

/*
OrgsListItem.defaultProps = {
  ...
  error: false
  // error: {
  //   expiresAt: '2h: 20m: 5s',
  //   message: 'Something went wrong and organisation was not created. We saved all you info and you can try again'
  // }
};
*/
