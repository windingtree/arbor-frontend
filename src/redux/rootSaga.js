import { spawn } from 'redux-saga/effects';
import { saga as fetchSearchOrganizationsSaga } from '../ducks/fetchSearchResults';
import { saga as fetchSignInSaga } from '../ducks/signIn';
import { saga as extendWizardSage } from '../ducks/wizard';

//Add all sagas here
export default function* rootSaga() {
  yield spawn(fetchSearchOrganizationsSaga);
  yield spawn(fetchSignInSaga);
  yield spawn(extendWizardSage);
}
