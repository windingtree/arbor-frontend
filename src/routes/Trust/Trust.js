import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import TrustGeneral from './TrustGeneral';
import TrustSocial from './TrustSocial';
import TrustWebsite from './TrustWebsite';
import TrustSSL from './TrustSSL';
import TrustLifStake from './TrustLifStake';

export default function Trust() {
  return (
    <Switch>
      <Route path={'/trust/general'} component={TrustGeneral}/>
      <Route path='/trust/website' component={TrustWebsite}/>
      <Route path='/trust/social' component={TrustSocial}/>
      <Route path='/trust/ssl' component={TrustSSL}/>
      <Route path='/trust/lif-stake' component={TrustLifStake}/>
      <Redirect exact path={'/trust'} to={'/trust/general'}/>
    </Switch>
  );
}
