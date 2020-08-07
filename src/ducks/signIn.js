import { appName } from '../utils/constants';
import history from '../redux/history';
import { createSelector } from 'reselect';
import { all, call, put, takeLatest, delay } from 'redux-saga/effects';

/**
 * Constants
 */
export const moduleName = 'signIn';
const prefix = `${appName}/${moduleName}`;
const FETCH_SIGN_IN_REQUEST = `${prefix}/FETCH_SIGN_IN_REQUEST`;
const FETCH_SIGN_IN_SUCCESS = `${prefix}/FETCH_SIGN_IN_SUCCESS`;
const FETCH_SIGN_IN_FAILURE = `${prefix}/FETCH_SIGN_IN_FAILURE`;
const FETCH_LOGOUT_REQUEST = `${prefix}/FETCH_LOGOUT_REQUEST`;
export const ACCOUNT_CHANGE = `${prefix}/ACCOUNT_CHANGE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  web3: null,
  address: false,
  isAuthenticated: false,
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action ) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_SIGN_IN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        isAuthenticated: false,
        error: null
      });
    case FETCH_SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        web3: payload.web3,
        address: payload.address,
        isAuthenticated: true,
        error: null
      });
    case FETCH_SIGN_IN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        isAuthenticated: false,
        error: error
      });
    case FETCH_LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        web3: null,
        address: false,
        isAuthenticated: false,
        error: null
      });
    case ACCOUNT_CHANGE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        address: payload,
        isAuthenticated: true,
        error: null
      });
    default:
      return state
  }
}


/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const selectSignInStatus = createSelector(
  stateSelector,
  signIn => signIn.isAuthenticated
);

export const selectSignInError = createSelector(
  stateSelector,
  signIn => signIn.error
);

export const selectSignInAddress = createSelector(
  stateSelector,
  signIn => signIn.address
);

export const selectWeb3 = createSelector(
  stateSelector,
  signIn => signIn.web3
);

/**
 * Actions
 */
export function fetchSignInRequest(payload) {
  return {
    type: FETCH_SIGN_IN_REQUEST,
    payload
  }
}

export function logOutRequest(payload) {
  return {
    type: FETCH_LOGOUT_REQUEST,
    payload
  }
}

export function accountChangeRequest(payload) {
  return {
    type: ACCOUNT_CHANGE,
    payload
  }
}

function fetchSignInSuccess(payload) {
  return {
    type: FETCH_SIGN_IN_SUCCESS,
    payload
  }
}

function fetchSignInFailure(error) {
  return {
    type: FETCH_SIGN_IN_FAILURE,
    error
  }
}

// Promise for account change
const accountChange = web3 => new Promise(resolve => {
  web3.currentProvider.on('accountsChanged', resolve);
});

/**
 * Sagas
 * */
// Sign-in saga
function* fetchSignInSaga({ payload }) {
  try {
    // Connection Success
    yield put(fetchSignInSuccess(payload));

    // Move to My Organizations
    yield call(history.push, { pathname: '/my-organizations' });

    // Only wait for account changes
    while (true) {
      const web3 = payload.web3;

      if(web3 && web3.currentProvider.on !== undefined) {
        // EIP 1193 Method
        let accounts = yield accountChange(web3);
        yield put(accountChangeRequest(accounts[0]));
      }

      delay(1000);
    }

  } catch (error) {
    // Connection Failure
    yield put(fetchSignInFailure(error));
    yield call(history.push, { pathname: '/authorization' });
  }
}


// Main saga
export const saga = function*() {
  yield all([
    takeLatest(FETCH_SIGN_IN_REQUEST, fetchSignInSaga),
  ]);
};
