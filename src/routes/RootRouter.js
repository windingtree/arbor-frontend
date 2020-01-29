import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import history from '../redux/history';

import { selectSignInStatus } from '../ducks/signIn';

import Header from '../components/Header';
import Footer from '../components/Footer';
//Common routes
import Home from './Home';
import Search from './Search';
import Directories from './Directories';
import Directory from './Directory';
import Organization from './Organization';
import Authorization from './Authorization/Authorization';
import TOS from './TOS'
import FAQ from './FAQ';
import PrivacyPolicy from './PrivacyPolicy';
import NotFound from './NotFound';
//Private routes
import PrivateRoute from '../components/PrivateRoute';
import Wizard from './Wizard/Wizard';
import Profile from './Profile';

import { Container } from '@material-ui/core';
import Trust from './Trust/Trust';

class RootRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuth } = this.props;

    return (
      <Router history={history}>
        <Header isAuthenticated={isAuth}/>
        <Container style={{ minHeight: '100vh', width: '100%', overflow: 'hidden', padding: '20px 0' }}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/directories' render={routeProps => <Directories {...routeProps}/>} />
            <Route path='/directories/:directory' render={routeProps => <Directory {...routeProps}/>} />
            <Route path='/search' render={routeProps => <Search {...routeProps}/>} />
            <Route path='/organization' component={Organization}/>
            <Route path='/authorization' render={routeProps => <Authorization {...routeProps}/>} />
            <Route path='/trust' render={routeProps => <Trust {...routeProps}/>} />
            <Route path='/tos' render={routeProps => <TOS {...routeProps}/>} />
            <Route path='/privacy-policy' render={routeProps => <PrivacyPolicy {...routeProps}/>} />
            <Route path='/faq' render={routeProps => <FAQ {...routeProps}/>} />
            <PrivateRoute
              isAuthenticated={isAuth}
              path='/my-organizations/'
              component={Profile}
            />
            <Route path='/my-organizations/wizard' component={Wizard}/>
            <Route path='/my-organizations/:orgId' render={routeProps => <Organization {...routeProps}/>}/>
            <Route path='/404' component={NotFound}/>
            <Route>
              <Redirect to='/404' />
            </Route>
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