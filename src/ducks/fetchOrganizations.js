import { appName } from '../utils/constants';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { callApi } from '../redux/api';

/**
 * Constants
 */
export const moduleName = 'organizations';
const prefix = `${appName}/${moduleName}`;
const FETCH_ALL_ORGANIZATIONS_REQUEST = `${prefix}/FETCH_ALL_ORGANIZATIONS_REQUEST`;
const FETCH_ALL_ORGANIZATIONS_SUCCESS = `${prefix}/FETCH_ALL_ORGANIZATIONS_SUCCESS`;
const FETCH_ALL_ORGANIZATIONS_FAILURE = `${prefix}/FETCH_ALL_ORGANIZATIONS_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  data: [],
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    case FETCH_ALL_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case FETCH_ALL_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        data: payload,
        error: null
      });
    case FETCH_ALL_ORGANIZATIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    default:
      return state;
  }
}

/**
 * Selectors
 * */

/**
 * Actions
 * */
export function fetchAllOrganizations() {
  return {
    type: FETCH_ALL_ORGANIZATIONS_REQUEST,
  }
}

function fetchAllOrganizationsSuccess(payload) {
  return {
    type: FETCH_ALL_ORGANIZATIONS_SUCCESS,
    payload
  }
}

function fetchAllOrganizationsFailure(error) {
  return {
    type: FETCH_ALL_ORGANIZATIONS_FAILURE,
    error
  }
}

/**
 * Sagas
 * */
function* fetchAllOrganizationsSaga({payload}) {
  try {
    const result = yield call(ApiFetchAllOrganizations, payload);

    yield put(fetchAllOrganizationsSuccess(result));
  } catch(error) {
    yield put(fetchAllOrganizationsFailure(error));
  }
}

export const saga = function* () {
  return yield all([takeEvery(FETCH_ALL_ORGANIZATIONS_REQUEST, fetchAllOrganizationsSaga)])
};

/**
 * Api
 * */
//TODO: replace with real api request
function ApiFetchAllOrganizations() {
  return callApi('orgids/');
}