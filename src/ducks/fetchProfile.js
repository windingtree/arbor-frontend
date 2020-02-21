import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { callApi } from '../redux/api';
import _ from 'lodash';

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
      const index = [];
      window['payload_orgin'] = JSON.parse(JSON.stringify(payload));

      payload.data.forEach(({ orgid }, i) => { index[orgid] = i });

      payload.data.forEach((org, i) => {
        if(org.parent) {
          if(!payload.data[index[org.parent.orgid]].subs) payload.data[index[org.parent.orgid]].subs = [];
          payload.data[index[org.parent.orgid]].subs.push(org);
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
function* fetchProfileOrganizationsSaga({payload}) {
  try {
    const result = yield call(ApiFetchProfileOrganizations, payload);

    yield put(fetchProfileOrganizationsSuccess(result));
  } catch(error) {
    yield put(fetchProfileOrganizationsFailure(error));
  }
}

export const saga = function* () {
  return yield all([
    takeEvery(FETCH_PROFILE_ORGANIZATIONS_REQUEST, fetchProfileOrganizationsSaga),
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

  return callApi(`orgids/?page[number]=${page}&page[size]=${per_page}&${otherParams}`);
}
