import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import colors from '../styles/colors';

const styles = makeStyles({
  item: {
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(188, 194, 211, 0.25)'
  },
  itemImg: {
    position: 'relative',
    width: '100%',
    height: '100px',
    backgroundColor: colors.greyScale.common
  },
  itemMarksWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  itemMark: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: colors.primary.black,
    color: colors.primary.white,
    borderRadius: '4px',
    marginRight: '8px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  itemMarkType: {
    backgroundColor: colors.primary.accent
  },
  idInfoWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  idInfoItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCopy: {
    color: colors.primary.accent,
    marginLeft: '6px',
  },
  icon: {
    color: colors.secondary.yellow,
  }

});

export default function OrgsGridItem(props) {
  const classes = styles();
  const {
    id,
    img = null,
    subOrg = true,
    type = 'Hotel',
    trustLevel = '4',
    name = 'Default Organization',
  } = props;

  return (
    <Card className={classes.item}>
      <CardContent>
        {
          img ? <CardMedia image={img.src}/> : <div className={classes.itemImg}/>
        }
        {
          subOrg && (
            <div className={classes.itemMarksWrapper}>
              <div>
                <p className={classes.itemMark}>SubOrg</p>
              </div>
              <div>
                <p className={[classes.itemMark, classes.itemMarkType].join(' ')}>
                  {type}
                </p>
              </div>
            </div>
          )
        }
        <div className={classes.idInfoWrapper}>
          <div className={classes.idInfoItem}>
            <Typography variant={'subtitle2'}>
              {'ID: '} <Typography variant={'caption'}>{id.slice(0, 9)}</Typography>
            </Typography>
            <FileCopyOutlinedIcon className={classes.iconCopy}/>
          </div>
          <div className={classes.idInfoItem}>
            <VerifiedUserIcon className={classes.icon}/>
            <Typography variant={'subtitle2'}>
              {trustLevel}
            </Typography>
          </div>
        </div>
        <Typography variant={'h6'}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  )
}