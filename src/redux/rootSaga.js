import { spawn } from 'redux-saga/effects';
import { saga as fetchSearchOrganizationsSaga } from '../ducks/fetchSearchResults';
import { saga as fetchOrganizationInfoSaga } from '../ducks/fetchOrganizationInfo';
import { saga as fetchSignInSaga } from '../ducks/signIn';
import { saga as extendWizardSaga } from '../ducks/wizard';

//Add all sagas here
export default function* rootSaga() {
  yield spawn(fetchSearchOrganizationsSaga);
  yield spawn(fetchOrganizationInfoSaga);
  yield spawn(fetchSignInSaga);
  yield spawn(extendWizardSaga);
}
