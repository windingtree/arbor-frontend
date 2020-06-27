import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import history from '../redux/history';
import { getJoinRequest } from '../ducks/join';
import JoinOrganizationItem from './JoinOrganizationItem';

export const styles = makeStyles(theme => ({
  mainContainer: {
    padding: '100px 0'
  },
  pageTitle: {
    fontSize: '36px',
    lineHeight: '42px',
    fontWeight: 500,
    paddingBottom: '60px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
      lineHeight: '44px',
    }
  }
}));

const ConfirmAccount = props => {
  const classes = styles();
  const dispatch = useDispatch();
  const {joinOrganizations} = useSelector(state => state.join);
  const profileId = history.location.search.substr(history.location.search.lastIndexOf('=')+1);

  useEffect(() => {
    dispatch(getJoinRequest(profileId));
  }, [dispatch, profileId]);
  
  return (
    <div className={classes.mainContainer}>
      <Container className={classes.mainContent}>
        <Typography variant={'h2'} className={classes.pageTitle}>My organizations</Typography>
        <JoinOrganizationItem
          legalName={Object.keys(joinOrganizations).length ? joinOrganizations[profileId].legalName : ''}
        />
      </Container>
    </div>
  );
}

export default ConfirmAccount;
