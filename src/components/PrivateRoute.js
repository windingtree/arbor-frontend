import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { selectSignInStatus } from '../ducks/signIn';
import DefaultRoute from './DefaultRoute';

class PrivateRoute extends Component {
  render() {
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

