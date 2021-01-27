import React, { useState } from 'react';
import { Tooltip, Typography, ClickAwayListener } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { copyStrToClipboard } from '../utils/helpers';
import colors from '../styles/colors';

const styles = makeStyles({
  text: {
    color: colors.greyScale.dark,
    fontWeight: 400,
    cursor: 'pointer'
  },
  iconCopy: {
    width: '16px',
    height: '16px',
    color: colors.secondary.green,
    marginLeft: '4px',
    marginBottom: '-3px',
    cursor: 'pointer'
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

export default props => {
  const classes = styles();
  const {
    text,
    label,
    title,
    fontWeight,
    fontSize,
    color,
    textDecoration,
    icon
  } = props;

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  function copyWithFeedback(str) {
    handleTooltipOpen();
    return copyStrToClipboard(str)
  }

  return (
    <ClickAwayListener
      onClickAway={handleTooltipClose}
    >
      <LightTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title || 'Copied to clipboard'}
          placement='top-start'
        >
          <Typography
            component={'span'}
            variant='inherit'
            onClick={() => copyWithFeedback(text)}
          >
            <Typography
              className={classes.text}
              variant='inherit'
              style={{
                fontWeight:
                fontWeight,
                fontSize: fontSize,
                color: color,
                textDecoration: textDecoration
              }}
            >
              {label}
              {icon &&
                <img
                  src={icon}
                  width='16px' height='16px'
                  alt='Copy'
                  className={classes.iconCopy}
                />
              }
            </Typography>
          </Typography>
        </LightTooltip>
    </ClickAwayListener>
  )
};
