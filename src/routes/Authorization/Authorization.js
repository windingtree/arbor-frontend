import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './SignIn';
import Registration from './Registration';

function Authorization() {
  return (
    <Switch>
      <Route exact path="/authorization/signin" component={SignIn} />
      <Route exact path="/authorization/register" component={Registration} />
      <Redirect exact path="/authorization" to="/authorization/signin" />
    </Switch>
  )
}

export default Authorization;

