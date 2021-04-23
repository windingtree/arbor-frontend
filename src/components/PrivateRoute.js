import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import { selectSignInStatus } from '../ducks/signIn';

import DefaultRoute from './DefaultRoute';
import history from '../redux/history';

const PrivateRoute = props => {
  const location = useLocation();
  const {
    isAuthenticated
  } = props;

  if (history.location.search.includes('profileId')) {
    const profileId = history.location.search.substr(history.location.search.lastIndexOf('=')+1);
    sessionStorage.setItem('profileId', profileId);
  }

  if (!isAuthenticated) {
    console.log('Location:', location);
    // throw new Error('AAA');
    return <Route {...props} component={
      () => (
        <Redirect to={{
          pathname: '/authorization/signin',
          state: {
            follow: location.pathname,
            search: location.search
          }
        }}/>
      )
    }/>
  }

  return (
    <DefaultRoute {...props}/>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: selectSignInStatus(state),
});

export default connect(mapStateToProps, null)(PrivateRoute);
