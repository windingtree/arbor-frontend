import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../redux/history';

import { selectSignInStatus } from '../ducks/signIn';

import Header from '../components/Header';
import Footer from '../components/Footer';
//Common routes
import Home from './Home';
import Search from './Search';
import Directories from './Directories';
import Authorization from './Authorization';
import NotFound from './NotFound';
//Private routes
import PrivateRoute from '../components/PrivateRoute';
import Profile from './Profile';

import { Container } from '@material-ui/core';

class RootRouter extends Component {
  renderAuthorizationComponent = (routeProps) => {
    return <Authorization {...routeProps} />;
  };

  render() {
    const { isAuth } = this.props;

    return (
      <Router history={history}>
        <Header isAuthenticated={isAuth}/>
        <Container style={{ minHeight: '100vh', width: '100%', overflow: 'hidden', padding: '20px 0' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/directories' component={Directories} />
            <Route path='/search' component={Search} />
            <Route path='/authorization' render={this.renderAuthorizationComponent} />
            <PrivateRoute
              isAuthenticated={isAuth}
              path='/my-organizations/'
              component={Profile}
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: selectSignInStatus(state)
  }
};


export default connect(mapStateToProps, null)(RootRouter);