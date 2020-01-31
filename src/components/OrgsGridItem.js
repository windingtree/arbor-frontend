import React from 'react';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';

import ButtonCommon from './Button';

import DefaultImage from '../assets/images/default-image.jpg';
import CopyIcon from '../assets/SvgComponents/CopyIcon';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import EntityTrustLevelIcon from '../assets/SvgComponents/EntityTrustLevelIcon';

import { copyStrToClipboard, strCenterEllipsis } from '../utils/helpers';
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
  itemImg: {
    position: 'relative',
    width: '100%',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden',
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
    fontFamily: 'Inter',
    fontSize: '12px',
    lineHeight: 1.2,
    backgroundColor: colors.primary.black,
    color: colors.primary.white,
    borderRadius: '4px',
    marginRight: '8px',
    padding: '5px 12px',
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
    padding: '8px 0',
  },
  idInfo: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  id: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.greyScale.darkest
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: '12px',
    color: colors.greyScale.common,
    opacity: .7
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
    color: colors.primary.accent,
  },
  icon: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    marginRight: '6px'
  },
  trustLevelValue: {
    fontFamily: 'Inter',
    fontWeight: 600,
    color: colors.greyScale.darkest,
    fontSize: '14px',
    lineHeight: 1.2,
  },
  itemNameWrapper: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.2,
    height: '38px',
    overflow: 'hidden',
    color: colors.greyScale.darkest,
  },
  legalEntityInfo: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '220px',
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
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.primary.black
  },
  entityIcon: {
    width: '10px',
    height: '12px',
    color: colors.greyScale.common,
    marginRight: '4px'
  },
  entityTrustLevel: {
    fontFamily: 'Inter',
    color: colors.greyScale.darkest,
    fontSize: '12px',
    lineHeight: 1.2
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
  entitySubOrgItemEllipsis: {
    width: '20px',
    height: '50%',
    display: 'block',
    background: 'linear-gradient(to right, transparent, white)',
    position: 'absolute',
    bottom: 0,
    right: 0
  }
});

export default function OrgsGridItem(props) {
  const classes = styles();
  const {
    id,
    img = null,
    isSub = false,
    type = 'Travel Agency',
    trustLevel = '4',
    name = 'Default Organization with extremely long long long long name',
    subs = ['1', 'a', '0xkk', 'f', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5'],
    entityName = 'Default Corporation',
    entityTrustLevel = '5'
  } = props;

  const hiddenId = strCenterEllipsis(id);

  const bgColorsForTypes = {
    'Hotel': colors.primary.accent,
    'Airline': colors.secondary.yellow,
    'Travel Agency': colors.secondary.pink,
    'Insurance': colors.greyScale.common,
  };

  return (
    <Card className={isSub ? [classes.item, classes.itemSubOrg].join(' ') : classes.item}>
      <CardContent style={{ padding: '12px' }}>
        {
          img ? <CardMedia image={img.src} className={classes.itemImg}/> : <CardMedia label={'Organization picture'} image={DefaultImage} className={classes.itemImg}/>
        }
        {
          isSub && (
            <div className={classes.itemMarksWrapper}>
              <Typography variant={'subtitle2'} className={classes.itemMark}>SubOrg</Typography>
              {
                type && (
                  <Typography variant={'subtitle2'} className={classes.itemMark} style={{ backgroundColor: bgColorsForTypes[type] }}>
                    {type}
                  </Typography>
                )
              }
            </div>
          )
        }
        <div className={classes.idInfoWrapper}>
          <div className={classes.idInfo}>
            <Typography variant={'subtitle2'} className={classes.id}>
              ID: <Typography variant={'caption'} className={classes.subtitle}>{hiddenId}</Typography>
            </Typography>
            <ButtonCommon
              onClick={() => copyStrToClipboard(id)}
              className={classes.copyButton}
            >
              <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
            </ButtonCommon>
          </div>
          <div className={classes.idInfo}>
            <TrustLevelIcon viewBox={'0 0 16 16'} className={classes.icon}/>
            <Typography variant={'subtitle2'} className={classes.trustLevelValue}>
              {trustLevel}
            </Typography>
          </div>
        </div>
        <div className={classes.itemNameWrapper}>
          <Ellipsis clamp={2}>
            {name}
          </Ellipsis>
        </div>
      </CardContent>
      {
        isSub ? (
          <Box className={classes.legalEntityInfo}>
            <div className={classes.entityTitleWrapper}>
              <Typography variant={'subtitle2'} className={classes.entityTitle} noWrap>
                Legal entity: <Typography variant={'caption'} className={classes.subtitle}>{entityName}</Typography>
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
          subs.length !== 0
        ) ? (
          <div className={classes.entitySubOrgsWrapper}>
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Include {subs.length} SubOrgs:</Typography>
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
              <div className={classes.entitySubOrgItemEllipsis}/>
            </Grid>
          </div>
        ) : (
          <CardContent className={classes.entitySubOrgsWrapper} style={{ marginBottom: '40px', }}>
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Does not include SubOrg</Typography>
          </CardContent>
        )
      }
    </Card>
  )
}

OrgsGridItem.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string,
  isSub: PropTypes.bool,
  type: PropTypes.string,
  trustLevel: PropTypes.string,
  name: PropTypes.string,
  subs: PropTypes.arrayOf(PropTypes.object),
  entityName: PropTypes.string,
  entityTrustLevel: PropTypes.string,
};