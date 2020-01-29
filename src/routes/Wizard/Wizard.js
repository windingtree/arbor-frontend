import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import WizardGeneral from './WizardGeneral';
import WizardDetails from './WizardDetails';
import WizardHosting from './WizardHosting';
import WizardMetamask from './WizardMetamask';
import WizardCreating from './WizardCreating';
import WizardSuccess from './WizardSuccess';

function Wizard(props){
  return (
    <Switch>
      <Route path='/wizard/general' component={WizardGeneral}/>
      <Route path='/wizard/details' component={WizardDetails}/>
      <Route path='/wizard/hosting' component={WizardHosting}/>
      <Route path='/wizard/metamask' component={WizardMetamask}/>
      <Route path='/wizard/creating-in-progress' component={WizardCreating}/>
      <Route path='/wizard/success' component={WizardSuccess}/>
      <Redirect exact path='/wizard' to='/wizard/general'/>
    </Switch>
  )
}

export default Wizard;