import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import history from '../redux/history';

import { selectSignInStatus } from '../ducks/signIn';

import DefaultRoute from '../components/DefaultRoute';
//Common routes
import Home from './Home';
import Search from './Search';
import ArbitrableDirectories from './ArbitrableDirectories';
import Directory from './Directory';
import DirectoryRegistrationRequests from './DirectoryRegistrationRequests';
import DirectoryDisputes from './DirectoryDisputes';
import DirectoryRegistered from './DirectoryRegistered';
import Organization from './Organization/Organization';
import OrganizationChallenge from './Organization/OrganizationChallenge';
import Authorization from './Authorization/Authorization';
import Trust from './Trust/Trust';
import TrustLifStake from './Trust/TrustLifStake';
import TOS from './TOS'
import FAQ from './FAQ';
import NotFound from './NotFound';
//Private routes
import PrivateRoute from '../components/PrivateRoute';
import Wizard from './Wizard';
import Edit from './Edit';
import Profile from './Profile';

import CreateAccount from '../components/CreateAccount';
import ConfirmAccount from '../components/ConfirmAccount';
import EmailSent from '../components/EmailSent';
import MetamaskRequired from '../components/MetamaskRequired';

class RootRouter extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            exact path='/'
            component={Home}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            exact path='/directories'
            component={ArbitrableDirectories}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/directories/registered/:directoryId'
            component={DirectoryRegistered}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/directories/requests/:directoryId'
            component={DirectoryRegistrationRequests}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/directories/disputes/:directoryId'
            component={DirectoryDisputes}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/directories/:directory'
            component={Directory}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/search'
            component={Search}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/organization/:orgId'
            component={Organization}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/challenge/:orgId/:directoryId/:challengeId'
            component={OrganizationChallenge}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/authorization'
            component={Authorization}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/trust'
            component={Trust}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/tos'
            component={TOS}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/faq'
            component={FAQ}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/my-organizations/wizard'
            component={Wizard}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/my-organizations/:orgId/edit'
            component={Edit}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/my-organizations/:orgId/lif-stake'
            component={TrustLifStake}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/my-organizations/:orgId'
            component={Organization}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/my-organizations'
            component={Profile}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/join'
            component={CreateAccount}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path='/my-organizations/:profileId?'
            component={ConfirmAccount}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/email-sent'
            component={EmailSent}
          />
          <DefaultRoute
            isAuthenticated={isAuthenticated}
            path='/metamask-required'
            component={MetamaskRequired}
          />
          <DefaultRoute
            path='/404'
            component={NotFound}/>
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
    isAuthenticated: selectSignInStatus(state)
  }
};


export default connect(mapStateToProps, null)(RootRouter);
