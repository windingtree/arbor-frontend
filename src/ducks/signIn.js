import { appName } from '../utils/constants';
import history from '../redux/history';
import GetWeb3 from '../redux/web3';
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

/**
 * Sagas
 * */
function* fetchSignInSaga() {
  try {
    yield call(GetWeb3);
    const accounts = yield call(window.ethereum.enable);
    const account = accounts[0];

    yield put(fetchSignInSuccess(account));
    yield call(history.push, { pathname: '/my-organizations' });
  } catch (error) {
    yield put(fetchSignInFailure(error));
  }
}

export const saga = function*() {
  yield all([takeLatest(FETCH_SIGN_IN_REQUEST, fetchSignInSaga)]);
};
