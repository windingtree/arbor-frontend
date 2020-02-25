import _ from 'lodash';
import {appName} from "../utils/constants";
import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import {createSelector} from "reselect";
import { keccak256 } from 'js-sha3';
import { callApi } from "../redux/api";

//region == [Constants] ================================================================================================
export const moduleName = 'wizard';
const prefix = `${appName}/${moduleName}`;

const REWRITE_ORGID_JSON_REQUEST = `${prefix}/EXTEND_ORGID_JSON_REQUEST`;
const REWRITE_ORGID_JSON_SUCCESS = `${prefix}/EXTEND_ORGID_JSON_SUCCESS`;
const REWRITE_ORGID_JSON_FAILURE = `${prefix}/EXTEND_ORGID_JSON_FAILURE`;

const EXTEND_ORGID_JSON_REQUEST = `${prefix}/EXTEND_ORGID_JSON_REQUEST`;
const EXTEND_ORGID_JSON_SUCCESS = `${prefix}/EXTEND_ORGID_JSON_SUCCESS`;
const EXTEND_ORGID_JSON_FAILURE = `${prefix}/EXTEND_ORGID_JSON_FAILURE`;

const SAVE_MEDIA_TO_ARBOR_REQUEST = `${prefix}/SAVE_MEDIA_TO_ARBOR_REQUEST`;
const SAVE_MEDIA_TO_ARBOR_SUCCESS = `${prefix}/SAVE_MEDIA_TO_ARBOR_SUCCESS`;
const SAVE_MEDIA_TO_ARBOR_FAILURE = `${prefix}/SAVE_MEDIA_TO_ARBOR_FAILURE`;

const SAVE_ORGID_JSON_TO_ARBOR_REQUEST = `${prefix}/SAVE_ORGID_JSON_TO_ARBOR_REQUEST`;
const SAVE_ORGID_JSON_TO_ARBOR_SUCCESS = `${prefix}/SAVE_ORGID_JSON_TO_ARBOR_SUCCESS`;
const SAVE_ORGID_JSON_TO_ARBOR_FAILURE = `${prefix}/SAVE_ORGID_JSON_TO_ARBOR_FAILURE`;

const SAVE_ORGID_JSON_URI_REQUEST = `${prefix}/SAVE_ORGID_JSON_URI_REQUEST`;
const SAVE_ORGID_JSON_URI_SUCCESS = `${prefix}/SAVE_ORGID_JSON_URI_SUCCESS`;
const SAVE_ORGID_JSON_URI_FAILURE = `${prefix}/SAVE_ORGID_JSON_URI_FAILURE`;

const SET_PENDING_STATE_TO_TRANSACTION_REQUEST = `${prefix}/SET_PENDING_STATE_TO_TRANSACTION_REQUEST`;
const SET_PENDING_STATE_TO_TRANSACTION_SUCCESS = `${prefix}/SET_PENDING_STATE_TO_TRANSACTION_SUCCESS`;
const SET_PENDING_STATE_TO_TRANSACTION_FAILURE = `${prefix}/SET_PENDING_STATE_TO_TRANSACTION_FAILURE`;

//rewrite pending and this state ? move to another duck
const FETCH_TRANSACTION_STATE_REQUEST = `${prefix}/FETCH_TRANSACTION_STATE_REQUEST`;
const FETCH_TRANSACTION_STATE_SUCCESS = `${prefix}/FETCH_TRANSACTION_STATE_SUCCESS`;
const FETCH_TRANSACTION_STATE_FAILURE = `${prefix}/FETCH_TRANSACTION_STATE_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  orgidJson: {
    "@context": "https://windingtree.com/ns/did/v1",
    "id": `did:orgid:0x${keccak256(`${Date.now()}${Math.random()}`)}`,
    "created": new Date().toJSON(),
    "publicKey": [],
    "service": [],
    "trust": {}
  },
  orgidUri: null,
  orgidHash: null,
  pending: null,
  success: null,
  error: null
};
//endregion

//region == [Reducer] ==================================================================================================
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    // REQUEST
    case REWRITE_ORGID_JSON_REQUEST:
    case EXTEND_ORGID_JSON_REQUEST:
    case SAVE_MEDIA_TO_ARBOR_REQUEST:
    case SAVE_ORGID_JSON_TO_ARBOR_REQUEST:
    case SAVE_ORGID_JSON_URI_REQUEST:
    case SET_PENDING_STATE_TO_TRANSACTION_REQUEST:
    case FETCH_TRANSACTION_STATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    // SUCCESS
    case REWRITE_ORGID_JSON_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: payload,
        orgidHash: `0x${keccak256(JSON.stringify(payload, null, 2))}`,
        pending: null,
        error: null
      });
    case EXTEND_ORGID_JSON_SUCCESS:
      if (payload) {
        payload.updated = new Date().toJSON();
      }
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: payload,
        orgidHash: `0x${keccak256(JSON.stringify(payload, null, 2))}`,
        error: null
      });
    case SAVE_MEDIA_TO_ARBOR_SUCCESS:
      const orgidJsonUpdates = _.merge({}, state.orgidJson, {
        updated: new Date().toJSON(),
        media: {
          logo: payload
        }
      });
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: orgidJsonUpdates,
        orgidHash: `0x${keccak256(JSON.stringify(orgidJsonUpdates, null, 2))}`,
        error: null
      });
    case SAVE_ORGID_JSON_TO_ARBOR_SUCCESS:
    case SAVE_ORGID_JSON_URI_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidUri: payload,
        pending: null,
        error: null
      });
    case SET_PENDING_STATE_TO_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        pending: payload.data,
        success: null,
        error: null
      });
    case FETCH_TRANSACTION_STATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        pending: null,
        success: payload,
        error: null
      });
    // FAILURE
    case REWRITE_ORGID_JSON_FAILURE:
    case EXTEND_ORGID_JSON_FAILURE:
    case SAVE_MEDIA_TO_ARBOR_FAILURE:
    case SAVE_ORGID_JSON_URI_FAILURE:
    case SAVE_ORGID_JSON_TO_ARBOR_FAILURE:
    case FETCH_TRANSACTION_STATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    case SET_PENDING_STATE_TO_TRANSACTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: payload.err
      });
    default:
      return state;
  }
}
//endregion

//region == [Selectors] ================================================================================================
const stateSelector = state => state[moduleName];

export const selectWizardOrgidJson = createSelector(
  stateSelector,
  wizard => wizard.orgidJson
);

export const selectWizardOrgidUri = createSelector(
  stateSelector,
  wizard => wizard.orgidUri
);

export const selectWizardOrgidHash = createSelector(
  stateSelector,
  wizard => wizard.orgidHash
);

export const selectPendingState = createSelector(
  stateSelector,
  wizard => wizard.pending
);

export const selectSuccessState = createSelector(
  stateSelector,
  wizard => wizard.success
);
//endregion

//region == [ACTIONS] ==================================================================================================
//region == [ACTIONS: rewriteOrgidJson] ================================================================================
export function rewriteOrgidJson(payload) {
  return {
    type: EXTEND_ORGID_JSON_REQUEST,
    payload
  }
}

function rewriteOrgidJsonSuccess(payload) {
  return {
    type: EXTEND_ORGID_JSON_SUCCESS,
    payload
  }
}

function rewriteOrgidJsonFailure(error) {
  return {
    type: EXTEND_ORGID_JSON_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: extendOrgidJson] =================================================================================
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
//endregion

//region == [ACTIONS: saveMediaToArbor] ============================================================================
export function saveMediaToArbor(payload) {
  return {
    type: SAVE_MEDIA_TO_ARBOR_REQUEST,
    payload
  }
}

function saveMediaToArborSuccess(payload) {
  return {
    type: SAVE_MEDIA_TO_ARBOR_SUCCESS,
    payload
  }
}

function saveMediaToArborFailure(error) {
  return {
    type: SAVE_MEDIA_TO_ARBOR_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: saveOrgidJsonToArbor] ============================================================================
export function saveOrgidJsonToArbor(payload) {
  return {
    type: SAVE_ORGID_JSON_TO_ARBOR_REQUEST,
    payload
  }
}

function saveOrgidJsonToArborSuccess(payload) {
  return {
    type: SAVE_ORGID_JSON_TO_ARBOR_SUCCESS,
    payload
  }
}

function saveOrgidJsonToArborFailure(error) {
  return {
    type: SAVE_ORGID_JSON_TO_ARBOR_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: saveOrgidUri] ====================================================================================
export function saveOrgidUri(payload) {
  return {
    type: SAVE_ORGID_JSON_URI_REQUEST,
    payload
  }
}

function saveOrgidUriSuccess(payload) {
  return {
    type: SAVE_ORGID_JSON_URI_SUCCESS,
    payload
  }
}

function saveOrgidUriFailure(error) {
  return {
    type: SAVE_ORGID_JSON_URI_FAILURE,
    error
  }
}
//endregion
//region == [ACTIONS: setPendingStateToTransaction] ====================================================================================
export function setPendingStateToTransaction(payload) {
  return {
    type: SET_PENDING_STATE_TO_TRANSACTION_REQUEST,
    payload
  }
}

function setPendingStateToTransactionSuccess(payload) {
  return {
    type: SET_PENDING_STATE_TO_TRANSACTION_SUCCESS,
    payload
  }
}

function setPendingStateToTransactionFailure(error) {
  return {
    type: SET_PENDING_STATE_TO_TRANSACTION_REQUEST,
    error
  }
}
//endregion
//region == [ACTIONS: setSuccessStateToTransaction] ====================================================================================
export function fetchTransactionState(payload) {
  return {
    type: FETCH_TRANSACTION_STATE_REQUEST,
    payload
  }
}

function fetchTransactionStateSuccess(payload) {
  return {
    type: FETCH_TRANSACTION_STATE_SUCCESS,
    payload
  }
}

function fetchTransactionStateFailure(error) {
  return {
    type: FETCH_TRANSACTION_STATE_REQUEST,
    error
  }
}
//endregion
//endregion

//region == [SAGAS] ====================================================================================================
function* rewriteOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(rewriteOrgidJsonSuccess(result));
  } catch(error) {
    yield put(rewriteOrgidJsonFailure(error));
  }
}

function* extendOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(extendOrgidJsonSuccess(result));
  } catch(error) {
    yield put(extendOrgidJsonFailure(error));
  }
}

function* saveMediaToArborSaga({payload}) {
  try {
    const { data: { uri }} = yield call(ApiPostMedia, payload);

    yield put(saveMediaToArborSuccess(uri));
  } catch(error) {
    yield put(saveMediaToArborFailure(error));
  }
}

function* saveOrgidJsonToArborSaga({payload}) {
  const orgidJson = yield select(selectWizardOrgidJson);

  try {
    const { data: { uri }} = yield call(ApiPostOrgidJson, { address: payload, orgidJson});

    yield put(saveOrgidJsonToArborSuccess(uri));
  } catch(error) {
    yield put(saveOrgidJsonToArborFailure(error));
  }
}

function* saveOrgidUriSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(saveOrgidUriSuccess(result));
  } catch(error) {
    yield put(saveOrgidUriFailure(error));
  }
}

function* setPendingStateToTransactionSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(setPendingStateToTransactionSuccess(result));
  } catch(error) {
    yield put(setPendingStateToTransactionFailure(error));
  }
}

function* fetchTransactionStateSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(fetchTransactionStateSuccess(result));
  } catch(error) {
    yield put(fetchTransactionStateFailure(error));
  }
}

export const saga = function* () {
  return yield all([
    takeEvery(REWRITE_ORGID_JSON_REQUEST, rewriteOrgidJsonSaga),
    takeEvery(EXTEND_ORGID_JSON_REQUEST, extendOrgidJsonSaga),
    takeEvery(SAVE_MEDIA_TO_ARBOR_REQUEST, saveMediaToArborSaga),
    takeEvery(SAVE_ORGID_JSON_TO_ARBOR_REQUEST, saveOrgidJsonToArborSaga),
    takeEvery(SAVE_ORGID_JSON_URI_REQUEST, saveOrgidUriSaga),
    takeEvery(SET_PENDING_STATE_TO_TRANSACTION_REQUEST, setPendingStateToTransactionSaga),
    takeEvery(FETCH_TRANSACTION_STATE_REQUEST, fetchTransactionStateSaga),
  ])
};
//endregion

//region == [API] ======================================================================================================
function ApiPostMedia(data) {
  const { address, id, file } = data;
  const fd = new FormData();
  fd.append('media', file, file.name);
  fd.append('address', address);
  fd.append('id', id);

  return callApi(`media`, 'POST', { body: fd });
}

function ApiPostOrgidJson(data) {
  return callApi(`json`, 'POST', { body: JSON.stringify(data),  headers: { 'Content-Type': 'application/json' } });
}
//endregion
