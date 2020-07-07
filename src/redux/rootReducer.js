import { combineReducers } from "redux";
import fetchProfileOrganizations, { moduleName as profileModule } from '../ducks/fetchProfile';
import fetchSearchOrganizations, { moduleName as searchModule } from '../ducks/fetchSearchResults';
import fetchOrganizationInfo, { moduleName as orgInfoModule } from '../ducks/fetchOrganizationInfo';
import fetchSignIn, { moduleName as signInModule } from '../ducks/signIn';
import extendWizard, { moduleName as wizardModule } from '../ducks/wizard';
import fetchLifDeposit, { moduleName as depositModule } from '../ducks/lifDeposit';
import backendStatus, { moduleName as backendStatusModule } from '../ducks/backendStatus';
import joinOrganisations, {moduleName as joinOrganisationsModule} from '../ducks/join';
import orgActiveStatus, {moduleName as orgActiveStatusModule} from '../ducks/orgActiveStatus';

//Add all reducers here
export default combineReducers({
  [profileModule]: fetchProfileOrganizations,
  [searchModule]: fetchSearchOrganizations,
  [orgInfoModule]: fetchOrganizationInfo,
  [signInModule]: fetchSignIn,
  [wizardModule]: extendWizard,
  [depositModule]: fetchLifDeposit,
  [backendStatusModule]: backendStatus,
  [joinOrganisationsModule]: joinOrganisations,
  [orgActiveStatusModule]: orgActiveStatus
});
