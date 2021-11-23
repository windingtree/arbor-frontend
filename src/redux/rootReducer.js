import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import fetchProfileOrganizations, { moduleName as profileModule } from '../ducks/fetchProfile';
import fetchSearchOrganizations, { moduleName as searchModule } from '../ducks/fetchSearchResults';
import fetchOrganizationInfo, { moduleName as orgInfoModule } from '../ducks/fetchOrganizationInfo';
import fetchSignIn, { moduleName as signInModule } from '../ducks/signIn';
import extendWizard, { moduleName as wizardModule } from '../ducks/wizard';
import fetchLifDeposit, { moduleName as depositModule } from '../ducks/lifDeposit';
import backendStatus, { moduleName as backendStatusModule } from '../ducks/backendStatus';
import joinOrganisations, {moduleName as joinOrganisationsModule} from '../ducks/join';
import orgActiveStatus, {moduleName as orgActiveStatusModule} from '../ducks/orgActiveStatus';
import directories, { moduleName as directoriesModule } from '../ducks/directories';

const signInPersistConfig = {
  storage,
  key: 'signIn',
  blacklist: ['web3']
}

//Add all reducers here
export default combineReducers({
  [profileModule]: fetchProfileOrganizations,
  [searchModule]: fetchSearchOrganizations,
  [orgInfoModule]: fetchOrganizationInfo,
  [signInModule]: persistReducer(signInPersistConfig, fetchSignIn),
  [wizardModule]: extendWizard,
  [depositModule]: fetchLifDeposit,
  [backendStatusModule]: backendStatus,
  [joinOrganisationsModule]: joinOrganisations,
  [orgActiveStatusModule]: orgActiveStatus,
  [directoriesModule]: directories
});
