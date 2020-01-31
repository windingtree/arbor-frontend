import React from "react";
import history from '../redux/history';
import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import EyeIcon from '../assets/SvgComponents/EyeIcon';
import EditIcon from '../assets/SvgComponents/EditIcon';
import OrgProfileView from '../components/OrgProfileView';
import ButtonCommon from '../components/Button';

import colors from '../styles/colors';

const styles = makeStyles({
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonLabel: {
    fontFamily: 'Inter',
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
    marginRight: '10px'
  },
  eyeIcon: {
    width: '15px',
    height: '12px'
  },
  editIcon: {
    width: '14px',
    height: '14px'
  },
  itemActionButtonIcon: {
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '4px'
  },
});

export default function Organization(props) {
  const classes = styles();
  const {
    prevDirectoryName = 'hotels'
  } = props;

  return (
      <div>
        <Container style={{ paddingBottom: '20px'}}>
          <Box className={classes.screenHeader}>
            <ButtonCommon onClick={history.goBack}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                Back to all organizations
                {
                  history.location.pathname === '/directories' ? (
                    <span>in {prevDirectoryName}</span>
                  ) : null
                }
              </Typography>
            </ButtonCommon>
            {
              history.location.pathname === '/organization' ? (
                <div>
                  <ButtonCommon onClick={() => null} className={classes.itemActionButton}>
                    <Typography variant={'caption'} className={classes.buttonLabel}>
                      <EyeIcon viewBox={'0 0 16 12'} className={[classes.itemActionButtonIcon, classes.eyeIcon].join(' ')}/>
                      Public profile view
                    </Typography>
                  </ButtonCommon>
                  <ButtonCommon onClick={() => null} className={classes.itemActionButton}>
                    <Typography variant={'caption'} className={classes.buttonLabel}>
                      <EditIcon viewBox={'0 0 14 14 '} className={[classes.itemActionButtonIcon, classes.editIcon].join(' ')}/>
                      Edit organization
                    </Typography>
                  </ButtonCommon>
                </div>
              ) : null
            }
          </Box>
        </Container>
        <OrgProfileView/>
      </div>
  )
}
