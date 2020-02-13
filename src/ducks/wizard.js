import {appName} from "../utils/constants";
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {createSelector} from "reselect";

/**
 * Constants
 */
export const moduleName = 'wizard';
const prefix = `${appName}/${moduleName}`;
const EXTEND_ORGID_JSON_REQUEST = `${prefix}/EXTEND_ORGID_JSON_REQUEST`;
const EXTEND_ORGID_JSON_SUCCESS = `${prefix}/EXTEND_ORGID_JSON_SUCCESS`;
const EXTEND_ORGID_JSON_FAILURE = `${prefix}/EXTEND_ORGID_JSON_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  orgidJson: {},
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    case EXTEND_ORGID_JSON_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case EXTEND_ORGID_JSON_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: payload,
        error: null
      });
    case EXTEND_ORGID_JSON_FAILURE:
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
 */
const stateSelector = state => state[moduleName];

export const selectWizardOrgidJson = createSelector(
  stateSelector,
  wizard => wizard.orgidJson
);

/**
 * Actions
 */

export function extendOrgidJson(payload) {
  return {
    type: EXTEND_ORGID_JSON_REQUEST,
    payload
  }
}

function extendOrgidJsonSuccess(payload) {
  return {
    type: EXTEND_ORGID_JSON_SUCCESS,
    payload
  }
}

function extendOrgidJsonFailure(error) {
  return {
    type: EXTEND_ORGID_JSON_FAILURE,
    error
  }
}

/**
 * Sagas
 */
function* extendOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(extendOrgidJsonSuccess(result));
  } catch(error) {
    yield put(extendOrgidJsonFailure(error));
  }
}

export const saga = function* () {
  return yield all([takeEvery(EXTEND_ORGID_JSON_REQUEST, extendOrgidJsonSaga)])
};
