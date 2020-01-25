import { spawn } from 'redux-saga/effects';
import { saga as allOrganizationsSaga } from '../ducks/fetchOrganizations'

//Add all sagas here
export default function* rootSaga() {
  yield spawn(allOrganizationsSaga);
}
