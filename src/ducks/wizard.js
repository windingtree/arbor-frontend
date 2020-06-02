import _ from 'lodash';
import {all, takeEvery, call, put, select} from 'redux-saga/effects';
import {createSelector} from "reselect";
import {keccak256} from 'js-sha3';
import {appName} from "../utils/constants";
import {callApi} from "../redux/api";
import {getWeb3, getOrgidContract} from "../web3/w3";
import {idGenerator} from "../utils/helpers";
import {Validator} from 'jsonschema';
import orgidSchema from '@windingtree/org.json-schema';

//region == [Constants] ================================================================================================
export const moduleName = 'wizard';
const prefix = `${appName}/${moduleName}`;

const REWRITE_ORGID_JSON_REQUEST = `${prefix}/REWRITE_ORGID_JSON_REQUEST`;
const REWRITE_ORGID_JSON_SUCCESS = `${prefix}/REWRITE_ORGID_JSON_SUCCESS`;
const REWRITE_ORGID_JSON_FAILURE = `${prefix}/REWRITE_ORGID_JSON_FAILURE`;

const EXTEND_ORGID_JSON_REQUEST = `${prefix}/EXTEND_ORGID_JSON_REQUEST`;
const EXTEND_ORGID_JSON_SUCCESS = `${prefix}/EXTEND_ORGID_JSON_SUCCESS`;
const EXTEND_ORGID_JSON_FAILURE = `${prefix}/EXTEND_ORGID_JSON_FAILURE`;

const ADD_AGENT_KEY_REQUEST = `${prefix}/ADD_AGENT_KEY_REQUEST`;
const ADD_AGENT_KEY_SUCCESS = `${prefix}/ADD_AGENT_KEY_SUCCESS`;
const ADD_AGENT_KEY_FAILURE = `${prefix}/ADD_AGENT_KEY_FAILURE`;

const REMOVE_AGENT_KEY_REQUEST = `${prefix}/REMOVE_AGENT_KEY_REQUEST`;
const REMOVE_AGENT_KEY_SUCCESS = `${prefix}/REMOVE_AGENT_KEY_SUCCESS`;
const REMOVE_AGENT_KEY_FAILURE = `${prefix}/REMOVE_AGENT_KEY_FAILURE`;

const ADD_ASSERTION_REQUEST = `${prefix}/ADD_ASSERTION_REQUEST`;
const ADD_ASSERTION_SUCCESS = `${prefix}/ADD_ASSERTION_SUCCESS`;
const ADD_ASSERTION_FAILURE = `${prefix}/ADD_ASSERTION_FAILURE`;

const REMOVE_ASSERTION_REQUEST = `${prefix}/REMOVE_ASSERTION_REQUEST`;
const REMOVE_ASSERTION_SUCCESS = `${prefix}/REMOVE_ASSERTION_SUCCESS`;
const REMOVE_ASSERTION_FAILURE = `${prefix}/REMOVE_ASSERTION_FAILURE`;

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

const SEND_CHANGE_ORGID_URI_AND_HASH_REQUEST = `${prefix}/SEND_CHANGE_ORGID_URI_AND_HASH_REQUEST`;
const SEND_CHANGE_ORGID_URI_AND_HASH_SUCCESS = `${prefix}/SEND_CHANGE_ORGID_URI_AND_HASH_SUCCESS`;
const SEND_CHANGE_ORGID_URI_AND_HASH_FAILURE = `${prefix}/SEND_CHANGE_ORGID_URI_AND_HASH_FAILURE`;

const GET_TRANSACTION_STATUS_REQUEST = `${prefix}/GET_TRANSACTION_STATUS_REQUEST`;
const GET_TRANSACTION_STATUS_SUCCESS = `${prefix}/GET_TRANSACTION_STATUS_SUCCESS`;
const GET_TRANSACTION_STATUS_FAILURE = `${prefix}/GET_TRANSACTION_STATUS_FAILURE`;

const RESET_TRANSACTION_STATUS = `${prefix}/RESET_TRANSACTION_STATUS`;

const SET_TRANSACTION_HASH = `${prefix}/SET_TRANSACTION_HASH`;

const initialState = {
  isFetching: false,
  isFetched: false,
  isSaved: false,
  orgidJson: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://windingtree.com/ns/orgid/v1'
    ],
    id: idGenerator(),
    created: new Date().toJSON(),
    publicKey: [],
    service: [],
    trust: {}
  },
  orgidUri: null,
  orgidHash: null,
  transactionHash: null,
  pendingTransaction: false,
  successTransaction: false,
  error: null
};
//endregion

//region == [Reducer] ==================================================================================================
export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  const statePublicKey = _.get(state.orgidJson, 'publicKey', []);
  const publicKey = statePublicKey.slice();
  let orgidJsonUpdates;

  switch(type) {
    /////////////
    // REQUEST //
    /////////////
    case REWRITE_ORGID_JSON_REQUEST:
    case EXTEND_ORGID_JSON_REQUEST:
    case ADD_AGENT_KEY_REQUEST:
    case REMOVE_AGENT_KEY_REQUEST:
    case ADD_ASSERTION_REQUEST:
    case REMOVE_ASSERTION_REQUEST:
    case SAVE_MEDIA_TO_ARBOR_REQUEST:
    case SAVE_ORGID_JSON_TO_ARBOR_REQUEST:
    case SAVE_ORGID_JSON_URI_REQUEST:
    case SEND_CREATE_LEGAL_ENTITY_REQUEST:
    case SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST:
    case SEND_CHANGE_ORGID_URI_AND_HASH_REQUEST:
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
    case SET_TRANSACTION_HASH:
      return _.merge({}, state, {
        transactionHash: payload
      });
    case RESET_TRANSACTION_STATUS:
      return _.merge({}, state, {
        transactionHash: null,
        pendingTransaction: false,
        successTransaction: false,
      });
    /////////////
    // SUCCESS //
    /////////////
    // The initial organization is successful
    case REWRITE_ORGID_JSON_SUCCESS:
      orgidJsonUpdates = payload;

      // Checking for merge of different orgids
      if(state.orgidJson.id && payload.id && payload.id !== state.orgidJson.id) {
        orgidJsonUpdates = payload;
      }
      state.orgidJson = payload;

      // Return the merged state
      return {
        isFetching: false,
        isFetched: true,
        orgidJson: orgidJsonUpdates,
        orgidHash: `0x${keccak256(JSON.stringify(orgidJsonUpdates, null, 2))}`,
        error: null
      };
    
    // The Organization JSON extension is successful
    case EXTEND_ORGID_JSON_SUCCESS:
      // Update the content by merging the payload with the current JSON
      orgidJsonUpdates = Object.assign({}, state.orgidJson, {
        ...payload,
        updated: new Date().toJSON()
      });

      console.log(`[IN EXTEND_ORGID_JSON_SUCCESS] ${JSON.stringify(state.orgidJson)} | ${JSON.stringify(payload)} => ${JSON.stringify(orgidJsonUpdates)}`);
      
      // Checking for merge of different orgids
      if(state.orgidJson.id && payload.id && payload.id !== state.orgidJson.id) {
        console.error(`[IN EXTEND_ORGID_JSON_SUCCESS] Attempting to merge different orgids, extension canceled.`);
        orgidJsonUpdates = state.orgidJson;
      }

      // Checking for mixed organnization types
      if(orgidJsonUpdates.organizationalUnit && orgidJsonUpdates.legalEntity) {
        console.error(`[IN EXTEND_ORGID_JSON_SUCCESS] Organization created with mixed types, extension canceled.`);
        orgidJsonUpdates = state.orgidJson;
      }

      // Merge the state
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: orgidJsonUpdates,
        orgidHash: `0x${keccak256(JSON.stringify(orgidJsonUpdates, null, 2))}`,
        error: null
      });

    case ADD_AGENT_KEY_SUCCESS:
      publicKey.push(payload);
      const updatedJsonWithAgentKey = _.merge({}, state.orgidJson, {
        ...state.orgidJson,
        publicKey
      });

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithAgentKey,
        orgidHash: `0x${keccak256(JSON.stringify(updatedJsonWithAgentKey, null, 2))}`,
        error: null
      });
    case REMOVE_AGENT_KEY_SUCCESS:
      publicKey.splice(payload, 1);
      const updatedJsonWithoutAgentKey = Object.assign({}, state.orgidJson, {
        ...state.orgidJson,
        publicKey
      });

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithoutAgentKey,
        orgidHash: `0x${keccak256(JSON.stringify(updatedJsonWithoutAgentKey, null, 2))}`,
        error: null
      });
    case ADD_ASSERTION_SUCCESS:
      const updatedJsonWithAddedAssertion = {
        ...state.orgidJson,
        trust: {
          ...state.orgidJson.trust,
          assertions: Array.from(
            new Set([
              ...(state.orgidJson.trust.assertions || []),
              ...[payload]
            ])
          )
        }
      };
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithAddedAssertion,
        orgidHash: `0x${keccak256(JSON.stringify(updatedJsonWithAddedAssertion, null, 2))}`,
        error: null
      });
    case REMOVE_ASSERTION_SUCCESS:
      const updatedJsonWithRemovedAssertion = {
        ...state.orgidJson,
        trust: {
          ...state.orgidJson.trust,
          assertions: (state.orgidJson.trust.assertions || [])
            .filter(a => JSON.stringify(a) !== JSON.stringify(payload))
        }
      };
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithRemovedAssertion,
        orgidHash: `0x${keccak256(JSON.stringify(updatedJsonWithRemovedAssertion, null, 2))}`,
        error: null
      });
    case SAVE_MEDIA_TO_ARBOR_SUCCESS:
      orgidJsonUpdates = Object.assign({}, state.orgidJson, {
        ...state.orgidJson,
        updated: new Date().toJSON(),
        media: { logo: payload }
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
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        orgidUri: payload,
        error: null
      });
    case SEND_CREATE_LEGAL_ENTITY_SUCCESS:
    case SEND_CREATE_ORGANIZATIONAL_UNIT_SUCCESS:
    case SEND_CHANGE_ORGID_URI_AND_HASH_SUCCESS:
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
    /////////////
    // FAILURE //
    /////////////
    case REWRITE_ORGID_JSON_FAILURE:
    case EXTEND_ORGID_JSON_FAILURE:
    case ADD_AGENT_KEY_FAILURE:
    case ADD_ASSERTION_FAILURE:
    case REMOVE_ASSERTION_FAILURE:
    case SAVE_MEDIA_TO_ARBOR_FAILURE:
    case SAVE_ORGID_JSON_URI_FAILURE:
    case SAVE_ORGID_JSON_TO_ARBOR_FAILURE:
    case SEND_CREATE_LEGAL_ENTITY_FAILURE:
    case SEND_CREATE_ORGANIZATIONAL_UNIT_FAILURE:
    case SEND_CHANGE_ORGID_URI_AND_HASH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    case GET_TRANSACTION_STATUS_FAILURE:
      return Object.assign({}, state, {
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

export const selectError = createSelector(
  stateSelector,
  wizard => wizard.error
);

export const selectTransactionHash = createSelector(
  stateSelector,
  wizard => wizard.transactionHash
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

//region == [ACTIONS: addAgentKey] =================================================================================
export function addAgentKey(payload) {
  return {
    type: ADD_AGENT_KEY_REQUEST,
    payload
  }
}

function addAgentKeySuccess(payload) {
  return {
    type: ADD_AGENT_KEY_SUCCESS,
    payload
  }
}

function addAgentKeyFailure(error) {
  return {
    type: ADD_AGENT_KEY_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: removeAgentKey] =================================================================================
export function removeAgentKey(payload) {
  return {
    type: REMOVE_AGENT_KEY_REQUEST,
    payload
  }
}

function removeAgentKeySuccess(payload) {
  return {
    type: REMOVE_AGENT_KEY_SUCCESS,
    payload
  }
}

function removeAgentKeyFailure(error) {
  return {
    type: REMOVE_AGENT_KEY_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: addAssertion] =================================================================================
export function addAssertion(payload) {
  return {
    type: ADD_ASSERTION_REQUEST,
    payload
  }
}

export function addAssertionSuccess(payload) {
  return {
    type: ADD_ASSERTION_SUCCESS,
    payload
  }
}

export function addAssertionFailure(error) {
  return {
    type: ADD_ASSERTION_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: removeAssertion] =================================================================================
export function removeAssertion(payload) {
  return {
    type: REMOVE_ASSERTION_REQUEST,
    payload
  }
}

export function removeAssertionSuccess(payload) {
  return {
    type: REMOVE_ASSERTION_SUCCESS,
    payload
  }
}

export function removeAssertionFailure(error) {
  return {
    type: REMOVE_ASSERTION_FAILURE,
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

//region == [ACTIONS: sendChangeOrgidUriAndHashRequest] ====================================================================================
//EDIT organization
export function sendChangeOrgidUriAndHashRequest(payload) {
  return {
    type: SEND_CHANGE_ORGID_URI_AND_HASH_REQUEST,
    payload
  }
}

function sendChangeOrgidUriAndHashSuccess(payload) {
  return {
    type: SEND_CHANGE_ORGID_URI_AND_HASH_SUCCESS,
    payload
  }
}

function sendChangeOrgidUriAndHashFailure(error) {
  return {
    type: SEND_CHANGE_ORGID_URI_AND_HASH_FAILURE,
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

function setTransactionHash(payload) {
  return {
    type: SET_TRANSACTION_HASH,
    payload
  };
}
//endregion

//region == [ACTIONS: resetTransactionStatus] ====================================================================================
export function resetTransactionStatus() {
  return {
    type: RESET_TRANSACTION_STATUS,
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
    //ValidateOrgidSchema(result);
    yield put(extendOrgidJsonSuccess(result));
  } catch(error) {
    yield put(extendOrgidJsonFailure(error));
  }
}

function* addAgentKeyToOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addAgentKeySuccess(result));
  } catch(error) {
    yield put(addAgentKeyFailure(error));
  }
}

function* removeAgentKeyFromOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(removeAgentKeySuccess(result));
  } catch(error) {
    yield put(removeAgentKeyFailure(error));
  }
}

function* addAssertionToOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addAssertionSuccess(result));
  } catch(error) {
    yield put(addAssertionFailure(error));
  }
}

function* removeAssertionFromOrgidJsonSaga({payload}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(removeAssertionSuccess(result));
  } catch(error) {
    yield put(removeAssertionFailure(error));
  }
}

function* saveMediaToArborSaga({payload}) {
  try {
    if(payload.file === null) {
      yield put(saveMediaToArborSuccess(null));
    } else {
      const { data: { uri }} = yield call(ApiPostMedia, payload);
      yield put(saveMediaToArborSuccess(uri));
    }
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
    const result = yield call(ApiSendCreateLegalEntity, payload);

    yield put(getTransactionStatus(result));
    yield put(sendCreateLegalEntitySuccess(result));
  } catch(error) {
    yield put(sendCreateLegalEntityFailure(error));
  }
}

function* sendCreateOrganizationalUnitSaga({payload}) {
  try {
    const result = yield call(ApiSendCreateOrganizationalUnit, payload);

    yield put(getTransactionStatus(result));
    yield put(sendCreateOrganizationalUnitSuccess(result));
  } catch(error) {
    yield put(sendCreateOrganizationalUnitFailure(error));
  }
}

function* sendChangeOrgidUriAndHashSaga({payload}) {
  try {
    const result = yield call(ApiSendChangeOrgidUriAndHash, payload);

    yield put(getTransactionStatus(result));
    yield put(sendChangeOrgidUriAndHashSuccess(result));
  } catch(error) {
    yield put(sendChangeOrgidUriAndHashFailure(error));
  }
}

function* getTransactionStatusSaga({payload}) {
  try {
    yield put(setTransactionHash(payload));
    const result = yield call(ApiGetTxStatus, payload);

    yield put(getTransactionStatusSuccess(result));
  } catch(error) {
    yield put(getTransactionStatusFailure(error));
  }
}

export const saga = function* () {
  return yield all([
    takeEvery(REWRITE_ORGID_JSON_REQUEST, rewriteOrgidJsonSaga),
    takeEvery(EXTEND_ORGID_JSON_REQUEST, extendOrgidJsonSaga),
    takeEvery(ADD_AGENT_KEY_REQUEST, addAgentKeyToOrgidJsonSaga),
    takeEvery(REMOVE_AGENT_KEY_REQUEST, removeAgentKeyFromOrgidJsonSaga),
    takeEvery(ADD_ASSERTION_REQUEST, addAssertionToOrgidJsonSaga),
    takeEvery(REMOVE_ASSERTION_REQUEST, removeAssertionFromOrgidJsonSaga),
    takeEvery(SAVE_MEDIA_TO_ARBOR_REQUEST, saveMediaToArborSaga),
    takeEvery(SAVE_ORGID_JSON_TO_ARBOR_REQUEST, saveOrgidJsonToArborSaga),
    takeEvery(SAVE_ORGID_JSON_URI_REQUEST, saveOrgidUriSaga),
    takeEvery(SEND_CREATE_LEGAL_ENTITY_REQUEST, sendCreateLegalEntitySaga),
    takeEvery(SEND_CREATE_ORGANIZATIONAL_UNIT_REQUEST, sendCreateOrganizationalUnitSaga),
    takeEvery(SEND_CHANGE_ORGID_URI_AND_HASH_REQUEST, sendChangeOrgidUriAndHashSaga),
    takeEvery(GET_TRANSACTION_STATUS_REQUEST, getTransactionStatusSaga),
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

function ApiSendCreateLegalEntity(data) {
  const orgidContract = getOrgidContract();
  const { orgidUri, orgidHash, address, orgidJson } = data;
  const orgidId = orgidJson.id.replace('did:orgid:', '');

  return new Promise((resolve, reject) => {
    // Create the transaction
    orgidContract.methods.createOrganization(
      orgidId, orgidUri, orgidHash
    )

    // Send it to the network
    .send(
      // Options: only from address
      { from: address },

      // Callback
      (error, transactionHash) => {
        if(error) {
          return reject(error);
        }
        console.log('transactionHash', transactionHash);
        resolve(transactionHash); 
      }
    );
  });
}

function ApiSendCreateOrganizationalUnit(data) {
  const orgidContract = getOrgidContract();
  const { parent: { orgid: orgidParent }, orgidUri, orgidHash, address, orgidJson } = data;
  const orgidId = orgidJson.id.replace('did:orgid:', '');

  return new Promise((resolve, reject) => {
    console.log(`createSubsidiary ${orgidId} from parent ${orgidParent}`);
    // Create the transaction
    orgidContract.methods.createSubsidiary(
      orgidParent,
      orgidId,
      address, /*subsidiaryDirector*/
      orgidUri,
      orgidHash
    )
    
    // Send transaction to the network
    .send(
      // Options
      { from: address },

      // Callback
      (error, transactionHash) => {
        if(error) return reject(error);
        resolve(transactionHash); 
      }
    );
  });
}

function ApiSendChangeOrgidUriAndHash(data) {
  const orgidContract = getOrgidContract();
  const { orgidUri, orgidHash, address, orgidJson } = data;
  const orgidId = orgidJson.id.replace('did:orgid:', '');

  return new Promise((resolve, reject) => {
    orgidContract.methods.changeOrgJsonUriAndHash(
      orgidId, orgidUri, orgidHash
    )

    .send(
      // Options
      { from: address },
      
      // Callback
      (error, transactionHash) => {
        if(error) {
          return reject(error);
        }
        console.log('transactionHash', transactionHash);
        resolve(transactionHash); 
      }
    );
  });
}

function ApiGetTxStatus(transactionHash) {
  return new Promise((resolve, reject) => {
    const web3 = getWeb3();
    let interval = setInterval(() => {
      web3.eth.getTransactionReceipt(transactionHash, (err, data) => {
        if (err) {
          reject(err);
          return clearInterval(interval);
        } else if (data) {
          resolve(data);
          return clearInterval(interval);
        } else {
          console.log(`...waiting for ... ${transactionHash}`)
        }
      })
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      reject(new Error(
        `Transaction status not obtained during long time. 
        You can get a transaction status on Etherscan. 
        Transaction Hash: ${transactionHash}`
      ));
    }, 10 * 60 * 1000);// 10 min
  })
}

// Validate a JSON document according to scehma
export function validateOrgidSchema(orgidJson) {
  // Load the JSON schema validator
  let validator = new Validator();

  // Perform the validation
  let validation = validator.validate(orgidJson, orgidSchema);
  return validation;
}

//endregion
