import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { selectSignInStatus } from '../ducks/signIn';

import DefaultRoute from './DefaultRoute';
import history from '../redux/history';

class PrivateRoute extends Component {
  render() {
    if (history.location.search.includes('profileId')) {
      const profileId = history.location.search.substr(history.location.search.lastIndexOf('=')+1);
      sessionStorage.setItem('profileId', profileId);
    }
    if(!this.props.isAuthenticated) {
      const renderComponent = () => <Redirect to={{ pathname: '/authorization'}}/>
      return <Route {...this.props} component={renderComponent}/>
    } else {
      return <DefaultRoute {...this.props}/>
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: selectSignInStatus(state),
  }
};

export default connect(mapStateToProps, null)(PrivateRoute);

