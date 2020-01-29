import React from "react";
import { Switch, Route } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';

import TrustGeneral from './TrustGeneral';
import TrustSocial from './TrustSocial';
import TrustWebsite from './TrustWebsite';
import TrustSSL from './TrustSSL';
import TrustLifStake from './TrustLifStake';

export default function Trust(props) {
  return (
    <Switch>
      <Route path={props.match} component={TrustGeneral}/>
      <Route path='/trust/website' component={TrustWebsite}/>
      <Route path='/trust/social' component={TrustSocial}/>
      <Route path='/trust/ssl' component={TrustSSL}/>
      <Route path='/trust/lif-stake' component={TrustLifStake}/>
    </Switch>
  );
}
