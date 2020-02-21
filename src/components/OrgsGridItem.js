import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, CardMedia, Button, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';

import CopyIdComponent from './CopyIdComponent';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import EntityTrustLevelIcon from '../assets/SvgComponents/EntityTrustLevelIcon';
import ImageErrorIcon from '../assets/SvgComponents/ImageErrorIcon';
//default images
import DefaultHotelImage1 from '../assets/images/default-image-hotel-1.svg';
import DefaultHotelImage2 from '../assets/images/default-image-hotel-2.svg';
import DefaultHotelImage3 from '../assets/images/default-image-hotel-3.svg';
import DefaultHotelImage4 from '../assets/images/default-image-hotel-4.svg';
import DefaultHotelImage5 from '../assets/images/default-image-hotel-5.svg';
import DefaultHotelImage6 from '../assets/images/default-image-hotel-6.svg';
import DefaultHotelImage7 from '../assets/images/default-image-hotel-7.svg';
import DefaultHotelImage8 from '../assets/images/default-image-hotel-8.svg';
import DefaultHotelImage9 from '../assets/images/default-image-hotel-9.svg';
import DefaultAirlineImage1 from '../assets/images/default-image-airline-1.svg';
import DefaultAirlineImage2 from '../assets/images/default-image-airline-2.svg';
import DefaultAirlineImage3 from '../assets/images/default-image-airline-3.svg';
import DefaultAirlineImage4 from '../assets/images/default-image-airline-4.svg';
import DefaultAirlineImage5 from '../assets/images/default-image-airline-5.svg';
import DefaultAirlineImage6 from '../assets/images/default-image-airline-6.svg';

import colors from '../styles/colors';

const styles = makeStyles({
  item: {
    position: 'relative',
    width: '100%',
    height: '287px',
    borderRadius: '8px',
    border: `1px solid ${colors.greyScale.lightest}`,
    boxSizing: 'border-box',
    boxShadow: '0 0 20px rgba(188, 194, 211, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
  },
  itemSubOrg: {
    borderColor: colors.greyScale.lighter,
    boxShadow: '0px 4px 12px rgba(10, 23, 51, 0.04), 0 4px 12px rgba(10, 23, 51, 0.04)',
  },
  linkToProfileView: {
    textTransform: 'none',
    textDecoration: 'none',
    textAlign: 'start',
    backgroundColor: colors.primary.white,
    outline: 'none',
  },
  itemImg: {
    position: 'relative',
    width: '100%',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  itemErrorImage: {
    position: 'relative',
    width: '100%',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: colors.primary.accent
  },
  itemImgErrorIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '37px',
    height: '37px',
  },
  itemMarksWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '8px 0',
  },
  itemMark: {
    position: 'relative',
    display: 'inline-block',
    fontSize: '12px',
    backgroundColor: colors.primary.black,
    color: colors.primary.white,
    borderRadius: '4px',
    marginRight: '8px',
    padding: '5px 12px',
    textTransform: 'capitalize'
  },
  itemMarkType: {
    backgroundColor: colors.primary.accent,
  },
  idInfoWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '8px',
  },
  trustLevelInfo: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    marginRight: '6px'
  },
  trustLevelValue: {
    fontWeight: 600,
    color: colors.greyScale.darkest,
    fontSize: '14px',
  },
  itemNameWrapper: {
    fontSize: '16px',
    fontWeight: 500,
    height: '38px',
    overflow: 'hidden',
    paddingTop: '8px'
  },
  errorMessageWrapper: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    paddingTop: '5px',
  },
  legalEntityInfo: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 16px',
    borderTop: `1px solid ${colors.greyScale.light}`,
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center'
  },
  entityInfoItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '10%'
  },
  entityTitleWrapper: {
    width: '88%',
  },
  entityTitle: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.primary.black,
    '& span': {
      color: colors.greyScale.common
    }
  },
  entityIcon: {
    width: '10px',
    height: '12px',
    color: colors.greyScale.common,
    marginRight: '4px'
  },
  entityTrustLevel: {
    color: colors.greyScale.darkest,
    fontSize: '12px',
  },
  entitySubOrgsWrapper: {
    padding: '0 12px 12px 12px',
  },
  entitySubOrgsList: {
    position: 'relative',
    maxHeight: '48px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  entitySubOrgItem: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: colors.primary.black,
  },
  entitySubOrgOverflowOpacity: {
    width: '20px',
    height: '50%',
    display: 'block',
    background: 'linear-gradient(to right, rgba(255,255,255,0), white)',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  errorInfoWrapper: {
    position: 'relative',
    top: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 12px 12px 12px'
  },
  errorExpiresAt: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.primary.accent
  },
  errorButton: {
    position: 'relative',
    backgroundImage: colors.gradients.orange,
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '6px',
    textTransform: 'none',
  },
  errorButtonLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: colors.primary.white,
    padding: '2px 4px',
  },
});

export default function OrgsGridItem(props) {
  const classes = styles();
  const {
    orgid,
    img,
    isSub,
    orgidType,
    proofsQty,
    name,
    subs,
    canManage,
    entityName,
    entityTrustLevel,
    error
  } = props;

  const bgColorsForTypes = {
    'hotel': colors.secondary.green,
    'airline': colors.secondary.yellow,
    'ota': colors.secondary.pink,
    'insurance': colors.secondary.intenseGreen,
  };

  const setRandomDefaultImage = () => {
    function getRandomIndex(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let arrayOfDefaultImages = [];
    if (orgidType === 'hotel' || orgidType === 'legalEntity' || orgidType === 'ota' || orgidType === 'insurance') arrayOfDefaultImages.push(DefaultHotelImage1, DefaultHotelImage2, DefaultHotelImage3, DefaultHotelImage4, DefaultHotelImage5, DefaultHotelImage6, DefaultHotelImage7, DefaultHotelImage8, DefaultHotelImage9);
    if (orgidType === 'airline') arrayOfDefaultImages.push(DefaultAirlineImage1, DefaultAirlineImage2, DefaultAirlineImage3, DefaultAirlineImage4, DefaultAirlineImage5, DefaultAirlineImage6);
    const randomIndex = getRandomIndex(arrayOfDefaultImages.length);
    return arrayOfDefaultImages[randomIndex];
  };

  return (
    <Card className={isSub ? [classes.item, classes.itemSubOrg].join(' ') : classes.item} style={{ backgroundColor: error ? colors.secondary.error : colors.primary.white }}>
      <CardContent style={{ padding: '12px' }}>
        <Link to={{
          pathname: `/${canManage ? 'my-organizations' : 'organization'}/${orgid}`,
          state: { id: orgid }
        }} className={classes.linkToProfileView}
        >
          {
            img ? (
              <CardMedia image={img.src} className={classes.itemImg}/>
            ) : error ? (
              <div className={classes.itemErrorImage}>
                <ImageErrorIcon viewbow={'0 0 22 22'} className={classes.itemImgErrorIcon}/>
              </div>
            ) : (
              <CardMedia label={'Organization picture'} image={setRandomDefaultImage()} className={classes.itemImg}/>
            )
          }
        </Link>
        {
          !error ? isSub ? (
            <div className={classes.itemMarksWrapper}>
              {
                orgidType && (
                  <Typography variant={'subtitle2'} className={classes.itemMark} style={{ backgroundColor: bgColorsForTypes[orgidType] }}>
                    {orgidType}
                  </Typography>
                )
              }
            </div>
          ) : null : null
        }
        {
          !error ? (
            <div className={classes.idInfoWrapper}>
              <CopyIdComponent id={orgid} leftElement={''}/>
              <div className={classes.trustLevelInfo}>
                <TrustLevelIcon className={classes.icon}/>
                <Typography variant={'subtitle2'} className={classes.trustLevelValue}>
                  {proofsQty}
                </Typography>
              </div>
            </div>
          ) : null
        }
        <Link to={{
          pathname: `/${canManage ? 'my-organizations' : 'organization'}/${orgid}`,
          state: { id: orgid }
        }} className={classes.linkToProfileView}
        >
          <div className={classes.itemNameWrapper} style={{ color: error ? colors.primary.accent : colors.greyScale.darkest }}>
            <Ellipsis clamp={2}>
              {name}
            </Ellipsis>
          </div>
        </Link>
        {
          error ? (
            <div className={classes.errorMessageWrapper}>
              <Ellipsis clamp={3}>
                {error.message}
              </Ellipsis>
            </div>
          ) : null
        }
      </CardContent>
      {
        !error ? isSub ? (
          <Box className={classes.legalEntityInfo}>
            <div className={classes.entityTitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.entityTitle} noWrap>
                Managed by: <Typography variant={'caption'}>{entityName}</Typography>
              </Typography>
            </div>
            <div className={classes.entityInfoItem}>
              <EntityTrustLevelIcon viewBox={'0 0 12 12'} className={classes.entityIcon}/>
              <Typography variant={'subtitle2'} className={classes.entityTrustLevel}>
                {entityTrustLevel}
              </Typography>
            </div>
          </Box>
        ) : (
          subs && subs.length !== 0
        ) ? (
          <div className={classes.entitySubOrgsWrapper}>
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Include {subs.length} sub-organization{subs.length === 1 ? 's' : ''}:</Typography>
            <Grid container spacing={1} justify="flex-start" alignItems="center" className={classes.entitySubOrgsList}>
              {
                subs.map((item, index) => {
                  let arrayOfColors = [ colors.primary.black, colors.primary.accent, colors.secondary.yellow ];
                  const bgColor = (index) => {
                    if(+index === 0) {
                      return arrayOfColors[0]
                    } else if((+index + 1) % 3 === 0) {
                      return arrayOfColors[2]
                    } else if((+index + 2) % 3 === 0) {
                      return arrayOfColors[1]
                    } else {
                      return arrayOfColors[0]
                    }
                  };
                  return (
                    <Grid item key={index.toString()}>
                      <div className={classes.entitySubOrgItem} style={{ backgroundColor: bgColor(index) }}/>
                    </Grid>
                  )
                })
              }
              <div className={classes.entitySubOrgOverflowOpacity}/>
            </Grid>
          </div>
        ) : (
          <CardContent className={classes.entitySubOrgsWrapper} style={{ marginBottom: '40px', }}>
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Does not include sub-organizations</Typography>
          </CardContent>
        ) : null
      }
      {
        error ? (
          <div className={classes.errorInfoWrapper}>
            <div>
              <Typography variant={'subtitle2'} className={classes.errorExpiresAt}>
                Will be deleted in
                <div>{error.expiresAt}</div>
              </Typography>
            </div>
            <Button className={classes.errorButton}>
              <Typography variant={'caption'} className={classes.errorButtonLabel}>Try again</Typography>
            </Button>
          </div>
        ) : null
      }
    </Card>
  )
}

OrgsGridItem.propTypes = {
  orgid: PropTypes.string.isRequired,
  img: PropTypes.string,
  isSub: PropTypes.bool,
  orgidType: PropTypes.string,
  address: PropTypes.string,
  proofsQty: PropTypes.any,
  name: PropTypes.string,
  subs: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)]),
  parent: PropTypes.object,
  entityName: PropTypes.string,
  entityTrustLevel: PropTypes.any,
};

/*
OrgsGridItem.defaultProps = {
  ...
  error: false
  // error: {
  //   expiresAt: '2h : 20m : 05s',
  //   message: 'Something went wrong and your sub-organization was not created. We will save your input for a few hours.',
  // }
};
*/
