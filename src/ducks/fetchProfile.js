import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { callApi } from '../redux/api';
import _ from 'lodash';
import { ACCOUNT_CHANGE } from './signIn'

/**
 * Constants
 */
export const moduleName = 'profile';
const prefix = `${appName}/${moduleName}`;
const FETCH_PROFILE_ORGANIZATIONS_REQUEST = `${prefix}/FETCH_PROFILE_ORGANIZATIONS_REQUEST`;
const FETCH_PROFILE_ORGANIZATIONS_SUCCESS = `${prefix}/FETCH_PROFILE_ORGANIZATIONS_SUCCESS`;
const FETCH_PROFILE_ORGANIZATIONS_FAILURE = `${prefix}/FETCH_PROFILE_ORGANIZATIONS_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  organizations: [],
  meta: {
    page: 1,
    per_page: 12,
  },
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    case FETCH_PROFILE_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case FETCH_PROFILE_ORGANIZATIONS_SUCCESS:
      // window['payload_orgin'] = JSON.parse(JSON.stringify(payload));

      const index = payload.data.reduce(
        (a, { orgid }, i) => {
          a[orgid] = i;
          return a;
        },
        {}
      );

      payload.data.forEach((org, i) => {
        if (org.parent) {

          if (index[org.parent.orgid] !== undefined) {

            if (!payload.data[index[org.parent.orgid]].subs) {
              payload.data[index[org.parent.orgid]].subs = [];
            }

            payload.data[index[org.parent.orgid]].subs.push(org);
          }

          delete payload.data[i];
        }
      });
      payload.data = _.compact(payload.data);

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        organizations: payload.data,
        meta: payload.meta,
        error: null
      });
    case FETCH_PROFILE_ORGANIZATIONS_FAILURE:
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

export const profileOrganizationsSelector = createSelector(
  stateSelector,
  profile => profile.organizations
);

export const isFetchedSelector = createSelector(
  stateSelector,
  profile => profile.isFetched
);

export const metaSelector = createSelector(
  stateSelector,
  profile => profile.meta
);

/**
 * Actions
 * */
export function fetchProfileOrganizations(payload) {
  return {
    type: FETCH_PROFILE_ORGANIZATIONS_REQUEST,
    payload
  }
}

function fetchProfileOrganizationsSuccess(payload) {
  return {
    type: FETCH_PROFILE_ORGANIZATIONS_SUCCESS,
    payload
  }
}

function fetchProfileOrganizationsFailure(error) {
  return {
    type: FETCH_PROFILE_ORGANIZATIONS_FAILURE,
    error
  }
}


/**
 * Sagas
 * */
// Saga to fetch the organizations from the profile
function* fetchProfileOrganizationsSaga({payload}) {
  try {
    const result = yield call(ApiFetchProfileOrganizations, payload);

    yield put(fetchProfileOrganizationsSuccess(result));
  } catch(error) {
    yield put(fetchProfileOrganizationsFailure(error));
  }
}

// Saga to reload the profile on account change
function* reloadProfileSaga({payload}) {
  yield fetchProfileOrganizationsSaga({payload: {owner: payload}});
}

// Main saga listening to explicit requests and account changes
export const saga = function* () {
  return yield all([
    takeEvery(FETCH_PROFILE_ORGANIZATIONS_REQUEST, fetchProfileOrganizationsSaga),
    takeEvery(ACCOUNT_CHANGE, reloadProfileSaga),
  ])
};

/**
 * Api
 * */

function ApiFetchProfileOrganizations(data) {
  const page = _.get(data, 'page', 1);
  const per_page = _.get(data, 'per_page', 100);
  delete data['page'];
  delete data['per_page'];
  const otherParams = _.map(data, (value, param) => `${param}=${value}`).join('&');

  return callApi(`orgids/?all=true&page[number]=${page}&page[size]=${per_page}&${otherParams}`);
}
