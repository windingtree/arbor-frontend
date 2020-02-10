import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Ellipsis from 'react-dotdotdot';

import CopyIdComponent from './CopyIdComponent';

import DefaultImage from '../assets/images/default-image.jpg';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import EntityTrustLevelIcon from '../assets/SvgComponents/EntityTrustLevelIcon';

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
    lineHeight: 1.2,
  },
  itemNameWrapper: {
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
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.2,
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
  entitySubOrgOverflowOpacity: {
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
    img,
    isSub,
    type,
    address,
    trustLevel,
    name,
    subs,
    entityName,
    entityTrustLevel,
    error
  } = props;

  const bgColorsForTypes = {
    'Hotel': colors.secondary.green,
    'Airline': colors.secondary.yellow,
    'Travel Agency': colors.secondary.pink,
    'Insurance': colors.secondary.intenseGreen,
  };

  return (
    <Card className={isSub ? [classes.item, classes.itemSubOrg].join(' ') : classes.item}>
      <Link to={{
        pathname: `/organization/${id}`,
        state: {
          id: id,
          img: img,
          isSub: isSub,
          name: name,
          trustLevel: trustLevel,
          type: type,
          address: address,
          subs: subs,
          entityName: entityName,
          entityTrustLevel: entityTrustLevel
        }
      }} className={classes.linkToProfileView}
      >
        <CardContent style={{ padding: '12px' }}>
          {
            img ? <CardMedia image={img.src} className={classes.itemImg}/> : <CardMedia label={'Organization picture'} image={DefaultImage} className={classes.itemImg}/>
          }
          {
            isSub && (
              <div className={classes.itemMarksWrapper}>
                <Typography variant={'subtitle2'} className={classes.itemMark}>Org Unit</Typography>
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
            <CopyIdComponent id={id} leftElement={'ID: '}/>
            <div className={classes.trustLevelInfo}>
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
                  Legal entity: <Typography variant={'caption'}>{entityName}</Typography>
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
                <div className={classes.entitySubOrgOverflowOpacity}/>
              </Grid>
            </div>
          ) : (
            <CardContent className={classes.entitySubOrgsWrapper} style={{ marginBottom: '40px', }}>
              <Typography variant={'subtitle2'} className={classes.entityTitle}>Does not include SubOrg</Typography>
            </CardContent>
          )
        }
      </Link>
    </Card>
  )
}

OrgsGridItem.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string,
  isSub: PropTypes.bool,
  type: PropTypes.string,
  address: PropTypes.string,
  trustLevel: PropTypes.string,
  name: PropTypes.string,
  subs: PropTypes.arrayOf(PropTypes.object),
  entityName: PropTypes.string,
  entityTrustLevel: PropTypes.string,
};

OrgsGridItem.defaultProps = {
  img: null,
  isSub: false,
  type: 'Travel Agency',
  address: '18 avenue de Suffren Entrée au 22 rue Jean Rey\n' +
    'Paris, France ',
  trustLevel: '4',
  name: 'Default Organization with extremely long long long long name',
  subs: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, ],
  entityName: 'Default Corporation',
  entityTrustLevel: '5'
};