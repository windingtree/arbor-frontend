import React, { useState } from "react";
import history from '../redux/history';
import { Container, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import EyeIcon from '../assets/SvgComponents/EyeIcon';
import EditIcon from '../assets/SvgComponents/EditIcon';
import OrgProfileView from '../components/OrgProfileView';

import colors from '../styles/colors';

const styles = makeStyles({
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '19px'
  },
  buttonWrapper: {
    marginLeft: '-8px'
  },
  buttonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
  eyeIcon: {
    width: '15px',
    height: '12px'
  },
  editIcon: {
    width: '14px',
    height: '14px'
  },
  itemActionButton: {
    marginLeft: '20px'
  },
  itemActionButtonIcon: {
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '9px'
  },
});

export default function Organization(props) {
  const [isOpen, toggleOpen] = useState(false);
  const classes = styles();

  const {
    id,
    prevDirectory
  } = history.location.state;

  return (
      <div>
        <Container>
          <Box className={classes.screenHeader}>
            <div className={classes.buttonWrapper}>
              <Button onClick={history.goBack}>
                <Typography variant={'caption'} className={classes.buttonLabel}>
                  <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                  Back to all organizations
                  {
                    prevDirectory && <span>in {prevDirectory}</span>
                  }
                </Typography>
              </Button>
            </div>
            {
              history.location.pathname !== `/organization/${id}` ? (
                <div>
                  <Button onClick={() => null}>
                    <Typography variant={'caption'} className={classes.buttonLabel}>
                      <EyeIcon viewBox={'0 0 16 12'} className={[classes.itemActionButtonIcon, classes.eyeIcon].join(' ')}/>
                      Public organization view
                    </Typography>
                  </Button>
                  <Button onClick={() => null} className={classes.itemActionButton}>
                    <Typography variant={'caption'} className={classes.buttonLabel}>
                      <EditIcon viewBox={'0 0 14 14 '} className={[classes.itemActionButtonIcon, classes.editIcon].join(' ')}/>
                      Edit organization profile
                    </Typography>
                  </Button>
                </div>
              ) : null
            }
          </Box>
        </Container>
        <OrgProfileView
          isOpen={isOpen}
          toggleOpen={toggleOpen}
        />
      </div>
  )
}
