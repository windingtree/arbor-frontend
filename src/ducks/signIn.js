import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { put, takeLatest, all } from 'redux-saga/effects';

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
  data: {},
  isAuth: false, //TODO delete later, when user object with come with token
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
        isAuth: false,
        error: null
      });
    case FETCH_SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        data: payload,
        isAuth: true,
        error: null
      });
    case FETCH_SIGN_IN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        isAuth: false,
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
  signIn => signIn.isAuth
);

export const selectSignInError = createSelector(
  stateSelector,
  signIn => signIn.error
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
function* fetchSignInSaga({payload}) {
  try {
    //TODO add request to plugin
    yield put(fetchSignInSuccess(payload));
  } catch (error) {
    yield put(fetchSignInFailure(error));
  }
}

export const saga = function*() {
  yield all([takeLatest(FETCH_SIGN_IN_REQUEST, fetchSignInSaga)]);
};