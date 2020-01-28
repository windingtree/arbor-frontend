import React from 'react';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';

import ButtonCommon from './Button';

import DefaultImage from '../assets/images/default-image.jpg';
import CopyIcon from '../assets/SvgIconsComponents/CopyIcon';
import TrustLevelIcon from '../assets/SvgIconsComponents/TrustLevelIcon';
import EntityTrustLevelIcon from '../assets/SvgIconsComponents/EntityTrustLevelIcon';

import colors from '../styles/colors';

const styles = makeStyles({
  item: {
    borderRadius: '8px',
    border: '1px solid',
    borderColor: colors.greyScale.lightest,
    boxShadow: '0 0 20px rgba(188, 194, 211, 0.25)',
  },
  itemSubOrg: {
    borderColor: colors.greyScale.light,
    boxShadow: '0 4px 12px rgba(10, 23, 51, 0.04)',
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
  idInfoItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
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
    color: colors.greyScale.darkest,
  },
  legalEntityInfo: {
    padding: '8px 16px',
    borderTop: '1px solid',
    borderTopColor: colors.greyScale.light,
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
    width: '90%',
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
    paddingTop: '0',
  },
  entitySubOrgsList: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: '48px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  entitySubOrgItem: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    marginRight: '4px',
    marginBottom: '4px',
    backgroundColor: colors.primary.black
  },
  entitySubOrgItemEllipsis: {
    width: '26px',
    height: '24px',
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
    type = 'Hotel',
    trustLevel = '4',
    name = 'Default Organization with extremely long long long long name',
    subs = ['1', 'a', '0xkk', 'f', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '5'],
    entityName = 'Default Corporation',
    entityTrustLevel = '5'
  } = props;

  const hiddenId = `${id.substr(0,4)}...${id.substr(-4,4)}`;

  const copyTextToClipboard = (str) => {
    navigator.clipboard.writeText(str).then(resolve =>  resolve);
  };

  return (
    <Card className={isSub ? [classes.item, classes.itemSubOrg].join(' ') : classes.item}>
      <CardContent>
        {
          img ? <CardMedia image={img.src} className={classes.itemImg}/> : <CardMedia label={'Organization picture'} image={DefaultImage} className={classes.itemImg}/>
        }
        {
          isSub && (
            <div className={classes.itemMarksWrapper}>
              <Typography variant={'subtitle2'} className={classes.itemMark}>SubOrg</Typography>
              <Typography variant={'subtitle2'} className={[classes.itemMark, classes.itemMarkType].join(' ')}>
                {type}
              </Typography>
            </div>
          )
        }
        <div className={classes.idInfoWrapper}>
          <div className={classes.idInfoItem}>
            <Typography variant={'subtitle2'} className={classes.id}>
              ID: <Typography variant={'caption'} className={classes.subtitle}>{hiddenId}</Typography>
            </Typography>
            <ButtonCommon
              onClick={() => copyTextToClipboard(id)}
              className={classes.copyButton}
            >
              <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
            </ButtonCommon>
          </div>
          <div className={classes.idInfoItem}>
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
          <CardContent className={classes.entitySubOrgsWrapper}>
            <Typography variant={'subtitle2'} className={classes.entityTitle}>Include {subs.length} SubOrgs:</Typography>
            <Grid container className={classes.entitySubOrgsList}>
              {
                subs.map((item, index) => {
                  let arrayOfColors = [ colors.primary.black, colors.primary.accent, colors.secondary.yellow ];
                  return (
                    <Grid item key={index.toString()} className={classes.entitySubOrgItem} style={{ backgroundColor: arrayOfColors[index] }}/>
                  )
                })
              }
              <div className={classes.entitySubOrgItemEllipsis}/>
            </Grid>
          </CardContent>
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
  isSub: PropTypes.array,
  type: PropTypes.string,
  trustLevel: PropTypes.string,
  name: PropTypes.string,
  subs: PropTypes.arrayOf(PropTypes.object),
  entityName: PropTypes.string,
  entityTrustLevel: PropTypes.number,
};