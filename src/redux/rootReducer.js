import { combineReducers } from "redux";
import fetchAllOrganizations, { moduleName as organizationsModule } from '../ducks/fetchOrganizations';
import fetchSignIn, { moduleName as signInModule } from '../ducks/signIn';


//Add all reducers here
export default combineReducers({
  [organizationsModule]: fetchAllOrganizations,
  [signInModule]: fetchSignIn,
})