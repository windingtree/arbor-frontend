import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { callApi } from '../redux/api';
import history from '../redux/history';
import _ from 'lodash';

/**
 * Constants
 */
export const moduleName = 'searchResults';
const prefix = `${appName}/${moduleName}`;
const FETCH_ALL_ORGANIZATIONS_REQUEST = `${prefix}/FETCH_ALL_ORGANIZATIONS_REQUEST`;
const FETCH_ALL_ORGANIZATIONS_SUCCESS = `${prefix}/FETCH_ALL_ORGANIZATIONS_SUCCESS`;
const FETCH_ALL_ORGANIZATIONS_FAILURE = `${prefix}/FETCH_ALL_ORGANIZATIONS_FAILURE`;
const FETCH_SEARCH_ORGANIZATIONS_REQUEST = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_REQUEST`;
const FETCH_SEARCH_ORGANIZATIONS_SUCCESS = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_SUCCESS`;
const FETCH_SEARCH_ORGANIZATIONS_FAILURE = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_FAILURE`;
const FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_REQUEST = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_REQUEST`;
const FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_SUCCESS = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_SUCCESS`;
const FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_FAILURE = `${prefix}/FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  items: [],
  meta: {
    page: 1,
    per_page: 4,
  },
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    case FETCH_ALL_ORGANIZATIONS_REQUEST:
    case FETCH_SEARCH_ORGANIZATIONS_REQUEST:
    case FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case FETCH_ALL_ORGANIZATIONS_SUCCESS:
    case FETCH_SEARCH_ORGANIZATIONS_SUCCESS:
    case FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        items: payload.data,
        meta: payload.meta,
        error: null
      });
    case FETCH_ALL_ORGANIZATIONS_FAILURE:
    case FETCH_SEARCH_ORGANIZATIONS_FAILURE:
    case FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_FAILURE:
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
const stateSelector = state => state[moduleName];

export const itemsSelector = createSelector(
  stateSelector,
  searchResults => searchResults.items
);

export const isFetchingSelector = createSelector(
  stateSelector,
  searchResults => searchResults.isFetching
);

export const isFetchedSelector = createSelector(
  stateSelector,
  searchResults => searchResults.isFetched
);

export const metaSelector = createSelector(
  stateSelector,
  searchResults => searchResults.meta
);

/**
 * Actions
 * */
export function fetchAllOrganizations(payload) {
  return {
    type: FETCH_ALL_ORGANIZATIONS_REQUEST,
    payload
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

export function fetchSearchOrganizations(payload) {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_REQUEST,
    payload
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

export function fetchSearchOrganizationsByType(payload) {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_REQUEST,
    payload
  }
}

function fetchSearchOrganizationsByTypeSuccess(payload) {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_SUCCESS,
    payload
  }
}

function fetchSearchOrganizationsByTypeFailure(error) {
  return {
    type: FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_FAILURE,
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

function* fetchSearchOrganizationsSaga({payload}) {
  try {
    const result = yield call(ApiFetchSearchOrganizations, payload);

    yield put(fetchSearchOrganizationsSuccess(result));
  } catch(error) {
    yield put(fetchSearchOrganizationsFailure(error));
  }
}

function* fetchSearchOrganizationsByTypeSaga({payload}) {
  try {
    const result = yield call(ApiFetchSearchByType, payload);

    yield put(fetchSearchOrganizationsByTypeSuccess(result));
    yield call(history.push, { pathname: `/directories/${payload.type}` });
  } catch(error) {
    yield put(fetchSearchOrganizationsByTypeFailure(error));
  }
}

export const saga = function* () {
  return yield all([
    takeEvery(FETCH_ALL_ORGANIZATIONS_REQUEST, fetchAllOrganizationsSaga),
    takeEvery(FETCH_SEARCH_ORGANIZATIONS_REQUEST, fetchSearchOrganizationsSaga),
    takeEvery(FETCH_SEARCH_ORGANIZATIONS_BY_TYPE_REQUEST, fetchSearchOrganizationsByTypeSaga),
  ])
};

/**
 * Api
 * */
function ApiFetchAllOrganizations(data) {
  const page = _.get(data, 'page', 1);
  const per_page = _.get(data, 'per_page', 12);
  return callApi(`orgids?page[number]=${page}&page[size]=${per_page}`);
}

function ApiFetchSearchOrganizations(data) {
  const page = _.get(data, 'page', 1);
  const per_page = _.get(data, 'per_page', 12);
  delete data['page'];
  delete data['per_page'];
  const otherParams = _.map(data, (value, param) => {
    if(value === '' || value == null) {
      delete data[param[value]]
    } else {
      return `${param}=${value}`
    }
  }).filter(item => item !== undefined).join('&');
  console.log(otherParams);
  return callApi(`orgids/?${otherParams}&page[number]=${page}&page[size]=${per_page}`);
}

function ApiFetchSearchByType(data) {
  const page = _.get(data, 'page', 1);
  const per_page = _.get(data, 'per_page', 12);
  return callApi(`orgids/?directory=${data.type}&page[number]=${page}&page[size]=${per_page}`)
}
