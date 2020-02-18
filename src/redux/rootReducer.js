import { combineReducers } from "redux";
import fetchProfileOrganizations, { moduleName as profileModule } from '../ducks/fetchProfile';
import fetchSearchOrganizations, { moduleName as searchModule } from '../ducks/fetchSearchResults';
import fetchOrganizationInfo, { moduleName as orgInfoModule } from '../ducks/fetchOrganizationInfo';
import fetchSignIn, { moduleName as signInModule } from '../ducks/signIn';
import extendWizard, { moduleName as wizardModule } from '../ducks/wizard';


//Add all reducers here
export default combineReducers({
  [profileModule]: fetchProfileOrganizations,
  [searchModule]: fetchSearchOrganizations,
  [orgInfoModule]: fetchOrganizationInfo,
  [signInModule]: fetchSignIn,
  [wizardModule]: extendWizard,
});
