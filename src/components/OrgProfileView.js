import React from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import InfoIcon from '../assets/SvgComponents/InfoIcon';
import TrustLevelIcon from '../assets/SvgComponents/TrustLevelIcon';
import StageIcon from '../assets/SvgComponents/StageIcon';

import colors from '../styles/colors';

const styles = makeStyles({
  itemTrustInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    padding: '0 14px'
  },
  itemStage: {
    backgroundColor: colors.secondary.green,
    borderColor: colors.secondary.green,
    color: colors.primary.white,
    marginLeft: '10px'
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    marginRight: '6px'
  },
  itemTrustInfoTitle: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.2
  },
  itemStageTitle: {
    fontSize: '16px',
    fontWeight: 500
  },
  trustLevelIcon: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 6px 0 10px'
  },
  trustLevelValue: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    color: colors.primary.black
  },
});

export default function OrgProfileView(props) {
  const classes = styles();
  const {
    trustLevel = '1'
  } = props;

  return (
    <div>
      <Container>
        <div className={classes.itemTrustInfoContainer}>
          <div className={classes.itemTrustInfoBase}>
            <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
            <Typography variant={'caption'} className={classes.itemTrustInfoTitle}>Trust level: </Typography>
            <TrustLevelIcon viewBox={'0 0 16 16'} className={classes.trustLevelIcon}/>
            <Typography variant={'subtitle2'} className={classes.trustLevelValue}>{trustLevel}</Typography>
          </div>
          <div className={[classes.itemTrustInfoBase, classes.itemStage].join(' ')}>
            <StageIcon viewBox={'0 0 20 20'} style={{ marginRight: '10px' }}/>
            <Typography variant={'caption'} className={[classes.itemTrustInfoTitle, classes.itemStageTitle].join(' ')}>Step 2. Submit LIF stake </Typography>
          </div>
        </div>
      </Container>
    </div>
  )
}