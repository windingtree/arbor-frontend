import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  withStyles
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import colors from '../styles/colors';

const DialogContent = withStyles({
  root: {
    '&:first-child': {
      paddingTop: '80px'
    }
  }
})(MuiDialogContent);

const styles =  makeStyles({
  dialogContainer: {
    '& > .MuiDialog-paper > .MuiDialogContent-root:first-child': {
      paddingTop: '80px'
    }
  },
  dialogContentWrapper: {
    position: 'relative',
    padding: '80px 100px',
    boxSizing: 'border-box'
  },
  dialogCloseButtonWrapper: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  dialogCloseButton: {
    padding: '4px',
    borderRadius: '50%',
    minWidth: 'auto',
    '& .MuiButton-label > .MuiSvgIcon-root': {
      fill: colors.greyScale.common
    }
  },
  dialogCloseButtonIcon: {
    fontSize: 'medium',
  },
});

export default function DialogComponent(props) {
  const classes = styles();
  const {handleClose, isOpen, children} = props;
  return (
    <Dialog onClose={handleClose} open={isOpen} className={classes.dialogContainer}>
      <DialogContent className={classes.dialogContentWrapper}>
        <DialogActions className={classes.dialogCloseButtonWrapper}>
          <Button onClick={handleClose} className={classes.dialogCloseButton}>
            <CloseIcon className={classes.dialogCloseButtonIcon}/>
          </Button>
        </DialogActions>
        {children}
      </DialogContent>
    </Dialog>
  )
}