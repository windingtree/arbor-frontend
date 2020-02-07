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
      <Route path='/my-organizations/wizard/general' component={WizardGeneral}/>
      <Route path='/my-organizations/wizard/details' component={WizardDetails}/>
      <Route path='/my-organizations/wizard/hosting' component={WizardHosting}/>
      <Route path='/my-organizations/wizard/metamask' component={WizardMetamask}/>
      <Route path='/my-organizations/wizard/creating-in-progress' component={WizardCreating}/>
      <Route path='/my-organizations/wizard/success' component={WizardSuccess}/>
      <Redirect exact path='/my-organizations/wizard' to='/my-organizations/wizard/general'/>
    </Switch>
  )
}

export default Wizard;