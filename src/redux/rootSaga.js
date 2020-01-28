import { spawn } from 'redux-saga/effects';
import { saga as fetchAllOrganizationsSaga } from '../ducks/fetchOrganizations';
import { saga as fetchSignInSaga } from '../ducks/signIn';

//Add all sagas here
export default function* rootSaga() {
  yield spawn(fetchAllOrganizationsSaga);
  yield spawn(fetchSignInSaga);
}
