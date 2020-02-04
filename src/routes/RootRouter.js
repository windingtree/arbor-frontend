import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import history from '../redux/history';

import { selectSignInStatus } from '../ducks/signIn';

import DefaultRoute from '../components/DefaultRoute';
//Common routes
import Home from './Home';
import Search from './Search';
import Directories from './Directories';
import Directory from './Directory';
import Organization from './Organization';
import Authorization from './Authorization/Authorization';
import Trust from './Trust/Trust';
import TOS from './TOS'
import FAQ from './FAQ';
import PrivacyPolicy from './PrivacyPolicy';
import NotFound from './NotFound';
//Private routes
import PrivateRoute from '../components/PrivateRoute';
import Wizard from './Wizard/Wizard';
import Profile from './Profile';

class RootRouter extends Component {
  render() {
    const { isAuth } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <DefaultRoute
            isAuthenticated={isAuth}
            exact path='/'
            component={Home}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            exact path='/directories'
            component={Directories}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/directories/:directory'
            component={Directory}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/search'
            component={Search}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/organization'
            component={Organization}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/authorization'
            component={Authorization}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/trust'
            component={Trust}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/tos'
            component={TOS}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/privacy-policy'
            component={PrivacyPolicy}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/faq'
            component={FAQ}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/my-organizations/wizard'
            component={Wizard}
          />
          <DefaultRoute
            isAuthenticated={isAuth}
            path='/my-organizations/:orgId'
            component={Organization}
          />
          <PrivateRoute
            isAuthenticated={isAuth}
            path='/my-organizations/'
            component={Profile}
          />
          <Route
            path='/404' component={NotFound}/>
          <Route>
            <Redirect to='/404' />
          </Route>
        </Switch>
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