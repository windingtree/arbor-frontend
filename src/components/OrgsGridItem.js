import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, CardMedia, Button, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';
import _ from 'lodash';

import {setRandomDefaultImage} from "../utils/helpers";

import CopyIdComponent from './CopyIdComponent';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import EntityTrustLevelIcon from '../assets/SvgComponents/EntityTrustLevelIcon';
import ImageErrorIcon from '../assets/SvgComponents/ImageErrorIcon';

import colors from '../styles/colors';

const styles = makeStyles({
  item: {
    position: 'relative',
    width: '100%',
    height: '287px',
    borderRadius: '8px',
    border: `1px solid ${colors.greyScale.lighter}`,
    boxSizing: 'border-box',
    boxShadow: 'none',
    transition: 'box-shadow .3s ease',
    '&:hover': {
      boxShadow: '0px 4px 12px rgba(10, 23, 51, 0.04), 0 4px 12px rgba(10, 23, 51, 0.04)',
    }
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

const bgColorsForTypes = {
  'hotel': colors.secondary.green,
  'airline': colors.secondary.yellow,
  'ota': colors.secondary.pink,
  'insurance': colors.secondary.intenseGreen,
};

export default function OrgsGridItem(props) {
  const classes = styles();
  const { organization, canManage, error } = props;
  const { orgid, parent, logo, proofsQty, name, subs, subsidiaries, directory } = organization;
  const subOrganizations = _.isEmpty(subs) ? subsidiaries : subs;
  const isSub = !_.isEmpty(parent);

  return (
    <Card className={classes.item}>
      <CardContent style={{ padding: '12px' }}>
        <Link to={{
          pathname: `/${canManage ? 'my-organizations' : 'organization'}/${orgid}`,
          state: { id: orgid }
        }} className={classes.linkToProfileView}
        >
          {
            logo ? (
              <CardMedia image={logo} className={classes.itemImg}/>
            ) : error ? (
              <div className={classes.itemErrorImage}>
                <ImageErrorIcon viewbow={'0 0 22 22'} className={classes.itemImgErrorIcon}/>
              </div>
            ) : (
              <CardMedia label={'Organization picture'} image={setRandomDefaultImage(orgid, directory)} className={classes.itemImg}/>
            )
          }
        </Link>
        {!error && isSub &&
        <div className={classes.itemMarksWrapper}>
          {directory &&
          <Typography variant={'subtitle2'} className={classes.itemMark} style={{ backgroundColor: '#98CCB0' }}>
            {directory === 'ota' ? 'Travel' : directory}
          </Typography>
          }
        </div>
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
        {error &&
        <div className={classes.errorMessageWrapper}>
          <Ellipsis clamp={3}>
            {error.message}
          </Ellipsis>
        </div>
        }
      </CardContent>
      {
        !error ? isSub ? (
          <Box className={classes.legalEntityInfo}>
            <div className={classes.entityTitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.entityTitle} noWrap>
                Operated by: <Typography variant={'caption'}>{parent.name}</Typography>
              </Typography>
            </div>
            <div className={classes.entityInfoItem}>
              <EntityTrustLevelIcon viewBox={'0 0 12 12'} className={classes.entityIcon}/>
              <Typography variant={'subtitle2'} className={classes.entityTrustLevel}>
                {parent.proofsQty}
              </Typography>
            </div>
          </Box>
        ) : (
          subOrganizations && subOrganizations.length !== 0
        ) ? (
          <div className={classes.entitySubOrgsWrapper}>
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Includes {subOrganizations.length} sub-organization{subOrganizations.length === 1 ? '' : 's'}:</Typography>
            <Grid container spacing={1} justify="flex-start" alignItems="center" className={classes.entitySubOrgsList}>
              {
                subOrganizations.map((item, index) => {
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
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Does not include organizational units</Typography>
          </CardContent>
        ) : null
      }
      {error &&
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
      }
    </Card>
  )
}

OrgsGridItem.propTypes = {
  organization: PropTypes.object.isRequired,
  canManage: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
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
