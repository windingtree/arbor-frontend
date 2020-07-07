import { spawn } from 'redux-saga/effects';
import { saga as fetchProfileOrganizationsSaga } from '../ducks/fetchProfile';
import { saga as fetchSearchOrganizationsSaga } from '../ducks/fetchSearchResults';
import { saga as fetchOrganizationInfoSaga } from '../ducks/fetchOrganizationInfo';
import { saga as fetchSignInSaga } from '../ducks/signIn';
import { saga as wizardSaga } from '../ducks/wizard';
import { saga as lifDepositSaga} from '../ducks/lifDeposit';
import { saga as backendStatus} from '../ducks/backendStatus';
import { saga as joinSaga} from '../ducks/join';
import { saga as orgActiveStatus} from '../ducks/orgActiveStatus';

//Add all sagas here
export default function* rootSaga() {
  yield spawn(fetchProfileOrganizationsSaga);
  yield spawn(fetchSearchOrganizationsSaga);
  yield spawn(fetchOrganizationInfoSaga);
  yield spawn(fetchSignInSaga);
  yield spawn(wizardSaga);
  yield spawn(lifDepositSaga);
  yield spawn(backendStatus);
  yield spawn(joinSaga);
  yield spawn(orgActiveStatus);
}
