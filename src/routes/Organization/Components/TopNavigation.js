import React from "react";
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography, CircularProgress, Grid } from "@material-ui/core";
import history from "../../../redux/history";
import { ArrowLeftIcon, EyeIcon, EditIcon } from '../../../assets/SvgComponents';
import colors from '../../../styles/colors';

const styles = makeStyles({
  itemTrustInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '15px'
  },
  publicTrustLevelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemTrustInfoBase: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '46px',
    backgroundColor: colors.primary.white,
    color: colors.greyScale.common,
    border: 'none',
    padding: '0 22px'
  },
  itemStage: {
    color: colors.primary.white,
    width: '266px',
    boxSizing: 'border-box',
    marginLeft: '11px',
    padding: '0 26px',
    cursor: 'pointer'
  },
  tooltipRef: {
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer'
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    marginLeft: '-7px',
    opacity: .5,
    color: colors.greyScale.common,
    transition: `opacity .3s ease, color .3s ease`,
    '&:hover': {
      opacity: 1,
      color: colors.secondary.green
    }
  },
  itemTrustInfoTitle: {
    fontSize: '14px',
    fontWeight: 400,
  },
  itemStageTitle: {
    fontSize: '16px',
    fontWeight: 500
  },
  iconTrustLevel: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 4px 0 14px'
  },
  trustLevelValue: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    color: colors.primary.black
  },
  stageIcon: {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  },
  screenHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px 0 20px 0',
    '&> .MUIbutton': {}
  },
  viewModeContainer: {
    ['@media (max-width: 768px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'space-between',
      marginTop: 0,
      marginBottom: '-30px'
    }
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
  goTrust: {
    backgroundColor: '#98CCB0',
    borderRadius: '4px',
    height: '48px',
    color: 'white',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0.005em',
    textTransform: 'none',
    padding: '0 70px 0 70px',
    '&:hover': {
      backgroundColor: '#98CCB0'
    }
  },
  lifIcon: {
    marginRight: '8px',
    color: 'black'
  }
});

function TopNavigation(props) {
  const classes = styles();
  const { organization, canManage } = props;
  const { orgid: id, jsonContent } = organization;
  const orgidType = _.get(organization, 'orgidType', '') === 'legalEntity' ? 'legalEntity' : 'organizationalUnit';
  const editState = {action: 'edit', type: orgidType, id, jsonContent};

  if (!canManage) {
    return null;
  }

  return (
    <Container>
      <Box className={classes.screenHeader}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Button onClick={() => {
              history.push('/my-organizations');
            }}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                See all organizations
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {!id &&
              <CircularProgress size={16} />
            }
            {id &&
              <Grid container justify='flex-end' spacing={4} className={classes.viewModeContainer}>
                <Grid item>
                  <Button
                    onClick={() => history.push(`/organization/${id}`, {id})}
                  >
                    <Typography variant={'caption'} className={classes.buttonLabel}>
                      <EyeIcon viewBox={'0 0 16 12'} className={[classes.itemActionButtonIcon, classes.eyeIcon].join(' ')}/>
                      Public view
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => history.push(`/my-organizations/${id}/edit`, editState)}
                  >
                    <Typography variant={'caption'} className={classes.buttonLabel}>
                      <EditIcon viewBox={'0 0 14 14 '}
                                className={[classes.itemActionButtonIcon, classes.editIcon].join(' ')}/>
                      Edit profile
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default TopNavigation;
