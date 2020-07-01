import { appName } from '../utils/constants';
import history from '../redux/history';
import {getWeb3, connect, onAccountsChanged} from '../web3/w3';
import { createSelector } from 'reselect';
import { all, call, put, takeLatest } from 'redux-saga/effects';
/**
 * Constants
 * */
export const moduleName = 'signIn';
const prefix = `${appName}/${moduleName}`;
const FETCH_SIGN_IN_REQUEST = `${prefix}/FETCH_SIGN_IN_REQUEST`;
const FETCH_SIGN_IN_SUCCESS = `${prefix}/FETCH_SIGN_IN_SUCCESS`;
const FETCH_SIGN_IN_FAILURE = `${prefix}/FETCH_SIGN_IN_FAILURE`;
export const ACCOUNT_CHANGE_NOTIF = `${prefix}/ACCOUNT_CHANGE_NOTIF`;

const initialState = {
  isFetching: false,
  isFetched: false,
  address: false,
  isAuthenticated: false,
  error: null
};

/***
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
        address: payload,
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
    case ACCOUNT_CHANGE_NOTIF:
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
 * */
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

/**
 * Actions
 * */
export function fetchSignInRequest(payload) {
  return {
    type: FETCH_SIGN_IN_REQUEST,
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

function accountChangeRequest(payload) {
  return {
    type: ACCOUNT_CHANGE_NOTIF,
    payload
  }
}

// Promise for account change
const accountChange = () => new Promise(resolve => {
  onAccountsChanged(accounts => {
    resolve(accounts);
  });
});

/**
 * Sagas
 * */
// Sign-in saga
function* fetchSignInSaga() {
  try {
    // Web3 connection
    let w3 = getWeb3();
    if(w3 === undefined) {
      yield call(history.push, { pathname: '/authorization/register' });
    }
    let accounts = yield connect();

    // Connexion Success
    yield put(fetchSignInSuccess(accounts[0]));

    // Move to My Organizations
    yield call(history.push, { pathname: '/my-organizations' });

    // Only wait for account changes
    while(true) {
      let accounts = yield accountChange();
      yield put(accountChangeRequest(accounts[0]));
    }

  } catch (error) {
    // Connexion Failure
    yield put(fetchSignInFailure(error));
    yield call(alert, 'Please, install MetaMask plugin at your browser extensions store and return to us');
    yield call(history.push, { pathname: '/authorization/register' });
  }
}


// Main saga
export const saga = function*() {
  yield all([
    takeLatest(FETCH_SIGN_IN_REQUEST, fetchSignInSaga),
  ]);
};
