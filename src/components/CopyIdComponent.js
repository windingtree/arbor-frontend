import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ButtonCommon from './Button';
import CopyIcon from '../assets/SvgComponents/CopyIcon';
import { strCenterEllipsis, copyStrToClipboard } from '../utils/helpers';
import colors from '../styles/colors';

const styles = makeStyles({
  idInfo: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  id: {
    lineHeight: 1.2,
    color: colors.greyScale.dark
  },
  subtitle: {
    fontWeight: 400
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
});

export default function CopyIdComponent(props) {
  const classes = styles();
  const { leftElement, id, fontWeight, fontSize, color } = props;

  const hiddenId = strCenterEllipsis(id);

  return (
    <div className={classes.idInfo}>
      <Typography variant={'subtitle2'} className={classes.id} style={{ fontWeight: fontWeight, fontSize: fontSize }}>
        {leftElement} <Typography variant={'inherit'} className={classes.subtitle} style={{ color: color }}>{hiddenId}</Typography>
      </Typography>
      <ButtonCommon
        onClick={() => copyStrToClipboard(id)}
        className={classes.copyButton}
      >
        <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
      </ButtonCommon>
    </div>
  )
}

CopyIdComponent.propTypes = {
  id: PropTypes.string.isRequired,
  leftElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
  fontWeight: PropTypes.number
};

CopyIdComponent.defaultProps = {
  fontSize: '12px',
  fontWeight: 400,
  color: colors.greyScale.common
};