import _ from 'lodash';
import { appName, ORGID_ABI, ORGID_PROXY_ADDRESS } from "../utils/constants";
import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import {createSelector} from "reselect";
import { keccak256 } from 'js-sha3';
import { callApi } from "../redux/api";

//region == [Constants] ================================================================================================
export const moduleName = 'wizard';
const prefix = `${appName}/${moduleName}`;

const REWRITE_ORGID_JSON_REQUEST = `${prefix}/REWRITE_ORGID_JSON_REQUEST`;
const REWRITE_ORGID_JSON_SUCCESS = `${prefix}/REWRITE_ORGID_JSON_SUCCESS`;
const REWRITE_ORGID_JSON_FAILURE = `${prefix}/REWRITE_ORGID_JSON_FAILURE`;

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

const SEND_CREATE_LEGAL_ENTITY_REQUEST = `${prefix}/SEND_CREATE_LEGAL_ENTITY_REQUEST`;
const SEND_CREATE_LEGAL_ENTITY_SUCCESS = `${prefix}/SEND_CREATE_LEGAL_ENTITY_SUCCESS`;
const SEND_CREATE_LEGAL_ENTITY_FAILURE = `${prefix}/SEND_CREATE_LEGAL_ENTITY_FAILURE`;

const SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST = `${prefix}/SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST`;
const SEND_CREATE_ORGANIZATIONAL_UNIT_SUCCESS = `${prefix}/SEND_CREATE_ORGANIZATIONAL_UNIT_SUCCESS`;
const SEND_CREATE_ORGANIZATIONAL_UNIT_FAILURE = `${prefix}/SEND_CREATE_ORGANIZATIONAL_UNIT_FAILURE`;

const SEND_EDITING_REQUEST = `${prefix}/SEND_EDITING_REQUEST`;
const SEND_EDITING_SUCCESS = `${prefix}/SEND_EDITING_SUCCESS`;
const SEND_EDITING_FAILURE = `${prefix}/SEND_EDITING_FAILURE`;

const GET_TRANSACTION_STATUS_REQUEST = `${prefix}/GET_TRANSACTION_STATUS_REQUEST`;
const GET_TRANSACTION_STATUS_SUCCESS = `${prefix}/GET_TRANSACTION_STATUS_SUCCESS`;
const GET_TRANSACTION_STATUS_FAILURE = `${prefix}/GET_TRANSACTION_STATUS_FAILURE`;

const SET_PENDING_STATE_TO_TRANSACTION_REQUEST = `${prefix}/SET_PENDING_STATE_TO_TRANSACTION_REQUEST`;
const SET_PENDING_STATE_TO_TRANSACTION_SUCCESS = `${prefix}/SET_PENDING_STATE_TO_TRANSACTION_SUCCESS`;
const SET_PENDING_STATE_TO_TRANSACTION_FAILURE = `${prefix}/SET_PENDING_STATE_TO_TRANSACTION_FAILURE`;

//maybe rewrite pendingTransaction and this state ? move to another duck
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
  pendingTransaction: false,
  successTransaction: false,
  error: null
};
//endregion

//region == [Reducer] ==================================================================================================
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;



  switch(type) {
    /////////////
    // REQUEST //
    /////////////
    case REWRITE_ORGID_JSON_REQUEST:
    case EXTEND_ORGID_JSON_REQUEST:
    case SAVE_MEDIA_TO_ARBOR_REQUEST:
    case SAVE_ORGID_JSON_TO_ARBOR_REQUEST:
    case SAVE_ORGID_JSON_URI_REQUEST:
    case SEND_CREATE_LEGAL_ENTITY_REQUEST:
    case SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST:
    case SET_PENDING_STATE_TO_TRANSACTION_REQUEST:
    case FETCH_TRANSACTION_STATE_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case GET_TRANSACTION_STATUS_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        isFetched: false,
        pendingTransaction: true,
        successTransaction: false,
        error: null
      });
    /////////////
    // SUCCESS //
    /////////////
    case REWRITE_ORGID_JSON_SUCCESS:
      return {
        isFetching: false,
        isFetched: true,
        orgidJson: payload,
        orgidHash: `0x${keccak256(JSON.stringify(payload, null, 2))}`,
        error: null
      };
    case EXTEND_ORGID_JSON_SUCCESS:
      if (payload) {
        payload.updated = new Date().toJSON();
      }
      return _.merge({}, state, {
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
      return {
        isFetching: false,
        isFetched: true,
        orgidJson: orgidJsonUpdates,
        orgidHash: `0x${keccak256(JSON.stringify(orgidJsonUpdates, null, 2))}`,
        error: null
      };
    case SAVE_ORGID_JSON_TO_ARBOR_SUCCESS:
    case SAVE_ORGID_JSON_URI_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        orgidUri: payload,
        error: null
      });
    case SEND_CREATE_LEGAL_ENTITY_SUCCESS:
      return  _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        error: null
      });
    case SEND_CREATE_ORGANIZATIONAL_UNIT_SUCCESS:
      return  _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        error: null
      });
    case GET_TRANSACTION_STATUS_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        pendingTransaction: false,
        successTransaction: true,
        error: null
      });
    case SET_PENDING_STATE_TO_TRANSACTION_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        pendingTransaction: payload,
        successTransaction: null,
        error: null
      });
    case FETCH_TRANSACTION_STATE_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        pendingTransaction: null,
        successTransaction: payload,
        error: null
      });
    /////////////
    // FAILURE //
    /////////////
    case REWRITE_ORGID_JSON_FAILURE:
    case EXTEND_ORGID_JSON_FAILURE:
    case SAVE_MEDIA_TO_ARBOR_FAILURE:
    case SAVE_ORGID_JSON_URI_FAILURE:
    case SAVE_ORGID_JSON_TO_ARBOR_FAILURE:
    case SEND_CREATE_LEGAL_ENTITY_FAILURE:
    case SEND_CREATE_ORGANIZATIONAL_UNIT_FAILURE:
    case FETCH_TRANSACTION_STATE_FAILURE:
    case SET_PENDING_STATE_TO_TRANSACTION_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    case GET_TRANSACTION_STATUS_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        isFetched: false,
        pendingTransaction: false,
        successTransaction: false,
        error: error
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
  wizard => wizard.pendingTransaction
);

export const selectSuccessState = createSelector(
  stateSelector,
  wizard => wizard.successTransaction
);
//endregion

//region == [ACTIONS] ==================================================================================================
//region == [ACTIONS: rewriteOrgidJson] ================================================================================
export function rewriteOrgidJson(payload) {
  return {
    type: REWRITE_ORGID_JSON_REQUEST,
    payload
  }
}

function rewriteOrgidJsonSuccess(payload) {
  return {
    type: REWRITE_ORGID_JSON_SUCCESS,
    payload
  }
}

function rewriteOrgidJsonFailure(error) {
  return {
    type: REWRITE_ORGID_JSON_FAILURE,
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

//region == [ACTIONS: sendCreateLegalEntityRequest] ====================================================================================
export function sendCreateLegalEntityRequest(payload) {
  return {
    type: SEND_CREATE_LEGAL_ENTITY_REQUEST,
    payload
  }
}

function sendCreateLegalEntitySuccess(payload) {
  return {
    type: SEND_CREATE_LEGAL_ENTITY_SUCCESS,
    payload
  }
}

function sendCreateLegalEntityFailure(error) {
  return {
    type: SEND_CREATE_LEGAL_ENTITY_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: sendCreateOrganizationalUnitRequest] ====================================================================================
export function sendCreateOrganizationalUnitRequest(payload) {
  return {
    type: SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST,
    payload
  }
}

function sendCreateOrganizationalUnitSuccess(payload) {
  return {
    type: SEND_CREATE_ORGANIZATIONAL_UNIT_SUCCESS,
    payload
  }
}

function sendCreateOrganizationalUnitFailure(error) {
  return {
    type: SEND_CREATE_ORGANIZATIONAL_UNIT_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: getTransactionStatus] ====================================================================================
export function getTransactionStatus(payload) {
  return {
    type: GET_TRANSACTION_STATUS_REQUEST,
    payload
  }
}

function getTransactionStatusSuccess(payload) {
  return {
    type: GET_TRANSACTION_STATUS_SUCCESS,
    payload
  }
}

function getTransactionStatusFailure(error) {
  return {
    type: GET_TRANSACTION_STATUS_FAILURE,
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
    type: SET_PENDING_STATE_TO_TRANSACTION_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: fetchTransactionState] ====================================================================================
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
    type: FETCH_TRANSACTION_STATE_FAILURE,
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

function* sendCreateLegalEntitySaga({payload}) {
  try {
    const result = yield call(ApiCreateLegalEntity, payload);

    yield put(getTransactionStatus(result));
    yield put(sendCreateLegalEntitySuccess(result));
  } catch(error) {
    yield put(sendCreateLegalEntityFailure(error));
  }
}

function* sendCreateOrganizationalUnitSaga({payload}) {
  try {
    const result = yield call(ApiCreateOrganizationalUnit, payload);

    yield call(getTransactionStatus, result);
    yield put(sendCreateOrganizationalUnitSuccess(result));
  } catch(error) {
    yield put(sendCreateOrganizationalUnitFailure(error));
  }
}

function* getTransactionStatusSaga({payload}) {
  try {
    const result = yield call(ApiGetTxStatus, payload);

    yield put(getTransactionStatusSuccess(result));
  } catch(error) {
    yield put(getTransactionStatusFailure(error));
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
    takeEvery(SEND_CREATE_LEGAL_ENTITY_REQUEST, sendCreateLegalEntitySaga),
    takeEvery(SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST, sendCreateOrganizationalUnitSaga),
    takeEvery(GET_TRANSACTION_STATUS_REQUEST, getTransactionStatusSaga),
    takeEvery(SET_PENDING_STATE_TO_TRANSACTION_REQUEST, setPendingStateToTransactionSaga),
    takeEvery(FETCH_TRANSACTION_STATE_REQUEST, fetchTransactionStateSaga),
  ])
};
//endregion

//region == [utils] ====================================================================================================
function getWeb3() {
  if (typeof window.web3 === 'undefined') {
    alert('MetaMask not found. If you just install MetaMask please refresh page to continue');
    throw `MetaMask not found`
  }
  return window.web3
}

function getOrgidContract() {
  const web3 = getWeb3();
  const orgidAbi = web3.eth.contract(ORGID_ABI); // todo: load ABI on this step only from backend to optimize react size
  return  orgidAbi.at(ORGID_PROXY_ADDRESS); // todo: can be loaded from back-end as well
}

function getGasPrice() {
  const web3 = getWeb3();
  return web3.toWei("10", "gwei"); // todo: calculate gwei
}
//region

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

function ApiCreateLegalEntity(data) {
  const orgidContract = getOrgidContract();
  const { orgidUri, orgidHash, address, orgidJson } = data;
  const orgidId = orgidJson.id.replace('did:orgid:', '');

  return new Promise((resolve, reject) => {
    orgidContract.createOrganization(
      orgidId, orgidUri, orgidHash,
      { from: address, gas: 500000, gasPrice: getGasPrice() },
      (err, data) => { if(err) return reject(err); console.log('data', data); resolve(data); }
    );
  });
}

function ApiCreateOrganizationalUnit(data) {
  const orgidContract = getOrgidContract();
  const { parent: { orgid: orgidParent }, orgidUri, orgidHash, address, orgidJson } = data;
  const orgidId = orgidJson.id.replace('did:orgid:', '');

  return new Promise((resolve, reject) => {
    orgidContract.createSubsidiary(
      orgidParent, orgidId, address /*subsidiaryDirector*/, orgidUri, orgidHash,
      { from: address, gas: 500000, gasPrice: getGasPrice() },
      (err, data) => { if(err) return reject(err);resolve(data); }
    );
  });
}

function ApiEditOrganization() {
  // return txId
}

function ApiGetTxStatus(transactionIn) {
  return new Promise((resolve, reject) => {
    const web3 = getWeb3();
    let interval = setInterval(() => {
      web3.eth.getTransactionReceipt(transactionIn, (err, data) => {
        if (err) {
          reject(err);
          return clearInterval(interval);
        } else if (data) {
          resolve(data);
          return clearInterval(interval);
        } else {
          console.log(`...waiting for ... ${transactionIn}`)
        }
      })
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
    }, 60000);
  })
}

//endregion
