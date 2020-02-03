import React from "react";
import {Card, CardContent, CardMedia, Grid, Typography, Collapse} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CopyIcon from '../assets/SvgComponents/CopyIcon';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import ChevronCircleIcon from '../assets/SvgComponents/ChevronCircleIcon';
import ButtonCommon from './Button';
import OrgsGridList from './OrgsGridList';
import OrgsGridItem from './OrgsGridItem';

import { copyStrToClipboard, strCenterEllipsis } from '../utils/helpers';

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
  itemImg: {
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    background: colors.primary.black,
  },
  itemInfo: {
    width: '80%',
    marginLeft: '12px'
  },
  itemName: {
    fontFamily: 'Inter',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.greyScale.darkest,
    marginBottom: '7px'
  },
  idInfo: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: '4px'
  },
  label: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.greyScale.common
  },
  copyButton: {
    padding: '4px',
    minWidth: 'auto',
    backgroundColor: 'transparent',
    marginLeft: '6px'
  },
  iconCopy: {
    width: '12.8px',
    height: '12.8px',
    color: colors.secondary.green,
  },
  icon: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 6px 0 9px'
  },
  trustLevelValue: {
    fontFamily: 'Inter',
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
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.primary.accent
  },
  subOrgsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '10px',
  },
  subOrgsLabel: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.2,
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
    isOpen,
    handleOpenSubs
  } = props;

  const hiddenId = strCenterEllipsis(id);

  return (
    <Card className={classes.item}>
      <CardContent style={{ padding: '20px' }}>
        <Grid container justify="space-between" alignItems='flex-start' wrap='nowrap'>
          <Grid item container wrap='nowrap' style={{ width: '85%' }}>
            {
              img ? (
                <CardMedia label={'Organization picture'} image={img.src} className={classes.itemImg}/>
              ) : <div className={classes.itemImg}/>
            }
            <div className={classes.itemInfo}>
              <Typography variant={'subtitle2'} className={classes.itemName} noWrap>{name}</Typography>
              <div className={classes.idInfo}>
                <Typography variant={'caption'} className={classes.label}>
                  ID: {hiddenId}
                </Typography>
                <ButtonCommon
                  onClick={() => copyStrToClipboard(id)}
                  className={classes.copyButton}
                >
                  <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
                </ButtonCommon>
              </div>
            </div>
          </Grid>
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
              <ButtonCommon
                onClick={() => console.log('add org')}
                className={classes.addSubOrgButton}
              >
                <Typography variant={'caption'} className={classes.buttonTitle} noWrap>+ Add sub organization</Typography>
              </ButtonCommon>
            </div>
          </Grid>
        </Grid>
        {
          subs.length !== 0 ? (
            <div>
              <div className={classes.subOrgsContainer}>
                <Typography variant={'inherit'} className={classes.subOrgsLabel}>
                  Suborganizations ({subs.length})
                </Typography>
                <ButtonCommon
                  onClick={handleOpenSubs}
                  className={classes.openSubOrgsButton}
                >
                  <ChevronCircleIcon
                    viewBox={'0 0 16 16'}
                    style={{
                      width: '16px',
                      height: '16px',
                      color: colors.primary.accent,
                      transition: 'transform .5s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'
                    }}
                  />
                </ButtonCommon>
              </div>
              <Collapse in={isOpen}>
                <OrgsGridList spacing={2} justify="flex-start" alignItems="flex-start" style={{ marginTop: '12px' }}>
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
                </OrgsGridList>
              </Collapse>
            </div>
          ) : null
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
};
