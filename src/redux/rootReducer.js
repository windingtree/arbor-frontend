import { combineReducers } from "redux";
import fetchSearchOrganizations, { moduleName as searchModule } from '../ducks/fetchSearchResults';
import fetchSignIn, { moduleName as signInModule } from '../ducks/signIn';
import extendWizard, { moduleName as wizardModule } from '../ducks/wizard';


//Add all reducers here
export default combineReducers({
  [searchModule]: fetchSearchOrganizations,
  [signInModule]: fetchSignIn,
  [wizardModule]: extendWizard,
});
