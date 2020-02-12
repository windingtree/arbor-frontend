import { appName } from '../utils/constants';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { callApi } from '../redux/api';

/**
 * Constants
 */
export const moduleName = 'searchResults';
const prefix = `${appName}/${moduleName}`;
const FETCH_SEARCH_ORGANIZATIONS_REQUEST = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_REQUEST`;
const FETCH_SEARCH_ORGANIZATIONS_SUCCESS = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_SUCCESS`;
const FETCH_SEARCH_ORGANIZATIONS_FAILURE = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_FAILURE`;
const FETCH_SEARCH_RESULTS_NEXT_PAGE_REQUEST = `${prefix}/FETCH_SEARCH_RESULTS_NEXT_PAGE_REQUEST`;
const FETCH_SEARCH_RESULTS_NEXT_PAGE_SUCCESS = `${prefix}/FETCH_SEARCH_RESULTS_NEXT_PAGE_SUCCESS`;
const FETCH_SEARCH_RESULTS_NEXT_PAGE_FAILURE = `${prefix}/FETCH_SEARCH_RESULTS_NEXT_PAGE_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  data: [],
  pageCount: 0,
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    case FETCH_SEARCH_ORGANIZATIONS_REQUEST:
    case FETCH_SEARCH_RESULTS_NEXT_PAGE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case FETCH_SEARCH_ORGANIZATIONS_SUCCESS:
      const totalCount = payload.length;
      const limit = 12;
      const pageCount = Math.ceil(totalCount / limit);

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        data: payload,
        pageCount: pageCount,
        error: null
      });
    case FETCH_SEARCH_RESULTS_NEXT_PAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        data: payload,
        error: null,
      });
    case FETCH_SEARCH_ORGANIZATIONS_FAILURE:
    case FETCH_SEARCH_RESULTS_NEXT_PAGE_FAILURE:
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
export function fetchSearchOrganizations() {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_REQUEST,
  }
}

function fetchSearchOrganizationsSuccess(payload) {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_SUCCESS,
    payload
  }
}

function fetchSearchOrganizationsFailure(error) {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_FAILURE,
    error
  }
}

export function fetchSearchNextPage(payload) {
  return {
    type: FETCH_SEARCH_RESULTS_NEXT_PAGE_REQUEST,
    payload
  }
}

function fetchSearchNextPageSuccess(payload) {
  return {
    type: FETCH_SEARCH_RESULTS_NEXT_PAGE_SUCCESS,
    payload
  }
}

function fetchSearchNextPageFailure(error) {
  return {
    type: FETCH_SEARCH_RESULTS_NEXT_PAGE_FAILURE,
    error
  }
}

/**
 * Sagas
 * */
function* fetchSearchOrganizationsSaga({payload}) {
  try {
    const result = yield call(ApiFetchSearchOrganizations, payload);

    yield put(fetchSearchOrganizationsSuccess(result));
  } catch(error) {
    yield put(fetchSearchOrganizationsFailure(error));
  }
}

export const saga = function* () {
  return yield all([takeEvery(FETCH_SEARCH_ORGANIZATIONS_REQUEST, fetchSearchOrganizationsSaga)])
};

/**
 * Api
 * */
//TODO: replace with real api request
function ApiFetchSearchOrganizations() {
  return callApi('orgids/');
}