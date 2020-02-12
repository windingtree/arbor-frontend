import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Typography, ClickAwayListener, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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

const LightTooltip = withStyles({
  tooltip: {
    maxWidth: '240px',
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.secondary.cyan,
    fontSize: '12px',
    fontWeight: 400,
    padding: '10px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap'
  }
})(Tooltip);

export default function CopyIdComponent(props) {
  const classes = styles();
  const { leftElement, id, fontWeight, fontSize, color } = props;

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  function copyIdWithFeedback(str) {
    handleTooltipOpen();
    return copyStrToClipboard(str)
  }

  const hiddenId = strCenterEllipsis(id);

  return (
    <div className={classes.idInfo}>
      <Typography variant={'subtitle2'} className={classes.id} style={{ fontWeight: fontWeight, fontSize: fontSize }}>
        {leftElement} <Typography variant={'inherit'} className={classes.subtitle} style={{ color: color }}>{hiddenId}</Typography>
      </Typography>
      <ClickAwayListener
        onClickAway={handleTooltipClose}
      >
        <div>
          <LightTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={'ID copied to clipboard'}
            placement={'top-start'}
          >
            <Button
              onClick={() => copyIdWithFeedback(id)}
              className={classes.copyButton}
            >
              <CopyIcon viewBox={'0 0 16 16'} className={classes.iconCopy}/>
            </Button>
          </LightTooltip>
        </div>
      </ClickAwayListener>
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