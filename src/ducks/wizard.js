import _ from 'lodash';
import {appName} from "../utils/constants";
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {createSelector} from "reselect";
import Web3 from 'web3';

/**
 * Constants
 */
export const moduleName = 'wizard';
const prefix = `${appName}/${moduleName}`;
const EXTEND_ORGID_JSON_REQUEST = `${prefix}/EXTEND_ORGID_JSON_REQUEST`;
const EXTEND_ORGID_JSON_SUCCESS = `${prefix}/EXTEND_ORGID_JSON_SUCCESS`;
const EXTEND_ORGID_JSON_FAILURE = `${prefix}/EXTEND_ORGID_JSON_FAILURE`;

// const SAVE_ORGID_JSON_FILE_REQUEST = `${prefix}/EXTEND_ORGID_JSON_REQUEST`;
// const SAVE_ORGID_JSON_FILE_SUCCESS = `${prefix}/EXTEND_ORGID_JSON_SUCCESS`;
// const SAVE_ORGID_JSON_FILE_FAILURE = `${prefix}/EXTEND_ORGID_JSON_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  orgidJson: {
    "@context": "https://windingtree.com/ns/did/v1",
    "created": new Date().toJSON(),
    "publicKey": [],
    "service": [],
    "trust": {}
  },
  orgidUri: null,
  orgidHash: null,
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;
  if (payload) {
    payload.updated = new Date().toJSON();
  }

  switch(type) {
    case EXTEND_ORGID_JSON_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case EXTEND_ORGID_JSON_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: payload,
        orgidHash: Web3.utils.keccak256(JSON.stringify(payload, null, 2)),
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
