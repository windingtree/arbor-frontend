import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { callApi } from '../redux/api';
/**
 * Constants
 * */
export const moduleName = 'orgInfo';
const prefix = `${appName}/${moduleName}`;
const FETCH_ORGANIZATION_INFO_REQUEST = `${prefix}/FETCH_ORGANIZATION_INFO_REQUEST`;
const FETCH_ORGANIZATION_INFO_SUCCESS = `${prefix}/FETCH_ORGANIZATION_INFO_SUCCESS`;
const FETCH_ORGANIZATION_INFO_FAILURE = `${prefix}/FETCH_ORGANIZATION_INFO_FAILURE`;

const FETCH_ORGANIZATION_SUBS_INFO_REQUEST = `${prefix}/FETCH_ORGANIZATION_SUBS_INFO_REQUEST`;
const FETCH_ORGANIZATION_SUBS_INFO_SUCCESS = `${prefix}/FETCH_ORGANIZATION_SUBS_INFO_SUCCESS`;
const FETCH_ORGANIZATION_SUBS_INFO_FAILURE = `${prefix}/FETCH_ORGANIZATION_SUBS_INFO_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  item: {},
  subs: [],
  error: null
};

/**
 * Reducer
 * */
export default function reducer(state = initialState, action) {
  const { type, payload, error} = action;

  switch (type) {
    case FETCH_ORGANIZATION_INFO_REQUEST:
    case FETCH_ORGANIZATION_SUBS_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case FETCH_ORGANIZATION_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        item: payload.data,
        error: null
      });
    case FETCH_ORGANIZATION_SUBS_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        subs: payload.data,
        error: null,
      });
    case FETCH_ORGANIZATION_INFO_FAILURE:
    case FETCH_ORGANIZATION_SUBS_INFO_FAILURE:
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
 * Actions
 * */
export function fetchOrganizationInfo(payload) {
  return {
    type: FETCH_ORGANIZATION_INFO_REQUEST,
    payload
  }
}

function fetchOrganizationInfoSuccess(payload) {
  return {
    type: FETCH_ORGANIZATION_INFO_SUCCESS,
    payload
  }
}

function fetchOrganizationInfoFailure(error) {
  return {
    type: FETCH_ORGANIZATION_INFO_FAILURE,
    error
  }
}

export function fetchOrganizationSubsInfo(payload) {
  return {
    type: FETCH_ORGANIZATION_SUBS_INFO_REQUEST,
    payload
  }
}

function fetchOrganizationSubsInfoSuccess(payload) {
  return {
    type: FETCH_ORGANIZATION_SUBS_INFO_SUCCESS,
    payload
  }
}

function fetchOrganizationSubsInfoFailure(error) {
  return {
    type: FETCH_ORGANIZATION_SUBS_INFO_FAILURE,
    error
  }
}

/**
 * Selectors
 * */
const stateSelector = state => state[moduleName];

export const selectItem = createSelector(
  stateSelector,
  orgInfo => orgInfo.item
);

export const selectSubs = createSelector(
  stateSelector,
  orgInfo => orgInfo.subs
);

/**
 * Sagas
 * */
function* fetchOrganizationInfoSaga({payload}) {
  try {
    const result = yield call(ApiFetchOrganizationInfo, payload);

    yield put(fetchOrganizationInfoSuccess(result));
  } catch(error) {
    yield put(fetchOrganizationInfoFailure(error));
  }
}

function* fetchOrganizationSubsInfoSaga({payload}) {
  try {
    const result = yield call(ApiFetchOrganizationSubsInfo, payload);

    yield put(fetchOrganizationSubsInfoSuccess(result));
  } catch(error) {
    yield put(fetchOrganizationSubsInfoFailure(error));
  }
}

export const saga = function*() {
  return yield all([
    takeEvery(FETCH_ORGANIZATION_INFO_REQUEST, fetchOrganizationInfoSaga),
    takeEvery(FETCH_ORGANIZATION_SUBS_INFO_REQUEST, fetchOrganizationSubsInfoSaga),
  ]);
};

/**
 * API
 * */
function ApiFetchOrganizationInfo(data) {
  return callApi(`orgids/${data.id}`);
}

function ApiFetchOrganizationSubsInfo(data) {
  return callApi(`orgids/?parent.orgid=${data.id}`);
}
