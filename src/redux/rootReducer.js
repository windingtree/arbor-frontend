import { combineReducers } from "redux";
import fetchAllOrganizations, { moduleName as organizationsModule } from '../ducks/fetchOrganizations';

//Add all reducers here
export default combineReducers({
  [organizationsModule]: fetchAllOrganizations,
})