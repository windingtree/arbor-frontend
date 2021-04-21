import Web3 from 'web3';
import _ from 'lodash';
import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { createSelector } from "reselect";

import { appName } from "../utils/constants";
import { callApi, createUniqueFileName } from "../redux/api";
import { Validator } from 'jsonschema';
import orgidSchema from '@windingtree/org.json-schema';
import { selectWeb3 } from "./signIn";
import { ApiGetGasPrice, getOrgidContract } from './utils/ethereum';

import { resetJoin } from './join';

const addOrUpdateObjByParam = (arr = [], obj, param) => {
  let update;
  arr = arr.map(
    o => {
      if (o[param] === obj[param]) {
        o = obj;
        update = true;
      }
      return o;
    }
  );
  if (!update) {
    arr.push(obj);
  }
  return arr;
};

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

const ADD_SERVICE_REQUEST = `${prefix}/ADD_SERVICE_REQUEST`;
const ADD_SERVICE_SUCCESS = `${prefix}/ADD_SERVICE_SUCCESS`;
const ADD_SERVICE_FAILURE = `${prefix}/ADD_SERVICE_FAILURE`;

const REMOVE_SERVICE_REQUEST = `${prefix}/REMOVE_SERVICE_REQUEST`;
const REMOVE_SERVICE_SUCCESS = `${prefix}/REMOVE_SERVICE_SUCCESS`;
const REMOVE_SERVICE_FAILURE = `${prefix}/REMOVE_SERVICE_FAILURE`;

const ADD_PAYMENT_REQUEST = `${prefix}/ADD_PAYMENT_REQUEST`;
const ADD_PAYMENT_SUCCESS = `${prefix}/ADD_PAYMENT_SUCCESS`;
const ADD_PAYMENT_FAILURE = `${prefix}/ADD_PAYMENT_FAILURE`;

const REMOVE_PAYMENT_REQUEST = `${prefix}/REMOVE_PAYMENT_REQUEST`;
const REMOVE_PAYMENT_SUCCESS = `${prefix}/REMOVE_PAYMENT_SUCCESS`;
const REMOVE_PAYMENT_FAILURE = `${prefix}/REMOVE_PAYMENT_FAILURE`;

const ADD_ASSERTION_REQUEST = `${prefix}/ADD_ASSERTION_REQUEST`;
const ADD_ASSERTION_SUCCESS = `${prefix}/ADD_ASSERTION_SUCCESS`;
const ADD_ASSERTION_FAILURE = `${prefix}/ADD_ASSERTION_FAILURE`;

const REMOVE_ASSERTION_REQUEST = `${prefix}/REMOVE_ASSERTION_REQUEST`;
const REMOVE_ASSERTION_SUCCESS = `${prefix}/REMOVE_ASSERTION_SUCCESS`;
const REMOVE_ASSERTION_FAILURE = `${prefix}/REMOVE_ASSERTION_FAILURE`;

const ADD_GPS_COORDINATES = `${prefix}/ADD_GPS_COORDINATES`;
const ADD_GPS_COORDINATES_SUCCESS = `${prefix}/ADD_GPS_COORDINATES_SUCCESS`;
const ADD_GPS_COORDINATES_FAILURE = `${prefix}/ADD_GPS_COORDINATES_FAILURE`;

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

// Fix orgJson structure in old broken versions
const fixJsonRequiredProps = json => ({
  '@context': [
    'https://www.w3.org/ns/did/v1',
    'https://windingtree.com/ns/orgid/v1'
  ],
  ...json,
  publicKey: [
    ...(json.publicKey ? json.publicKey : [])
  ],
  service: [
    ...(json.service ? json.service : [])
  ],
  trust: {
    ...(json.trust ? json.trust : {}),
    assertions: [
      ...(json.trust && json.trust.assertions ? json.trust.assertions : [])
    ]
  }
});

const initialState = {
  isFetching: false,
  isFetched: false,
  isSaved: false,
  orgidJson: {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://windingtree.com/ns/orgid/v1'
    ],
    publicKey: [],
    service: [],
    trust: {
      assertions: []
    }
  },
  orgidUri: null,
  orgidHash: null,
  transactionHash: null,
  pendingTransaction: false,
  successTransaction: false,
  error: null
};

//region == [Reducer] ==================================================================================================
export default function reducer(state = initialState, action) {
  const {
    type,
    payload,
    error
  } = action;

  state.orgidJson = fixJsonRequiredProps(state.orgidJson);
  const statePublicKey = _.get(state.orgidJson, 'publicKey', []);
  const stateService = _.get(state.orgidJson, 'service', []);
  const statePayment = _.get(state.orgidJson, 'payment', []);
  const publicKey = statePublicKey.slice();
  const service = stateService.slice();
  const payment = statePayment.slice();
  const orgidType = state.orgidJson.legalEntity ? 'legalEntity' : 'organizationalUnit';

  let orgidJsonUpdates;

  // START: fixes for wrong records in current json
  if (state.orgidJson.media && state.orgidJson.media.logo !== '') {
    state.orgidJson[orgidType].media = {
      logo: state.orgidJson.media.logo
    };
  }
  delete state.orgidJson.media; // fix for wrong structured json

  if (state.orgidJson[orgidType] &&
    state.orgidJson[orgidType].media &&
    state.orgidJson[orgidType].media.logo === '') {
      delete state.orgidJson[orgidType].media.logo;
  }

  if (state.orgidJson.service &&
    state.orgidJson.service.length > 0) {

    state.orgidJson.service = state.orgidJson.service.map(
      s => {
        s.id = s.id.replace('_', '');
        return s;
      }
    );
  }

  if (state.orgidJson.publicKey &&
    state.orgidJson.publicKey.length > 0) {

    state.orgidJson.publicKey = state.orgidJson.publicKey.map(
      s => {
        s.id = s.id.replace('_', '');
        return s;
      }
    );
  }
  // STOP: fixes

  switch (type) {
    /////////////
    // REQUEST //
    /////////////
    case REWRITE_ORGID_JSON_REQUEST:
    case EXTEND_ORGID_JSON_REQUEST:
    case ADD_AGENT_KEY_REQUEST:
    case REMOVE_AGENT_KEY_REQUEST:
    case ADD_SERVICE_REQUEST:
    case REMOVE_SERVICE_REQUEST:
    case ADD_PAYMENT_REQUEST:
    case REMOVE_PAYMENT_REQUEST:
    case ADD_ASSERTION_REQUEST:
    case REMOVE_ASSERTION_REQUEST:
    case ADD_GPS_COORDINATES:
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
      if (state.orgidJson.id && payload.id && payload.id !== state.orgidJson.id) {
        orgidJsonUpdates = payload;
      }
      state.orgidJson = payload;

      // Return the merged state
      return {
        isFetching: false,
          isFetched: true,
          orgidJson: orgidJsonUpdates,
          orgidHash: Web3.utils.soliditySha3(JSON.stringify(orgidJsonUpdates, null, 2)),
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
      if (state.orgidJson.id && payload.id && payload.id !== state.orgidJson.id) {
        console.error(`[IN EXTEND_ORGID_JSON_SUCCESS] Attempting to merge different orgids, extension canceled.`);
        orgidJsonUpdates = state.orgidJson;
      }

      // Checking for mixed organization types
      if (orgidJsonUpdates.organizationalUnit && orgidJsonUpdates.legalEntity) {
        console.error(`[IN EXTEND_ORGID_JSON_SUCCESS] Organization created with mixed types, extension canceled.`);
        orgidJsonUpdates = state.orgidJson;
      }

      if (orgidJsonUpdates.organizationalUnit && orgidJsonUpdates.organizationalUnit.type) {
        if (!Array.isArray(orgidJsonUpdates.organizationalUnit.type)) {
          orgidJsonUpdates.organizationalUnit.type = orgidJsonUpdates.organizationalUnit.type.split(',').map(v => v.trim());
        }
      }

      // Merge the state
      return _.merge({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: orgidJsonUpdates,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(orgidJsonUpdates, null, 2)),
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
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithAgentKey, null, 2)),
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
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithoutAgentKey, null, 2)),
        error: null
      });

    case ADD_SERVICE_SUCCESS:
      service.push(payload);
      const updatedJsonWithService = _.merge({}, state.orgidJson, {
        ...state.orgidJson,
        service
      });

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithService,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithService, null, 2)),
        error: null
      });

    case REMOVE_SERVICE_SUCCESS:
      service.splice(payload, 1);
      const updatedJsonWithoutService = Object.assign({}, state.orgidJson, {
        ...state.orgidJson,
        service
      });

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithoutService,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithoutService, null, 2)),
        error: null
      });

    case ADD_PAYMENT_SUCCESS:
      payment.push(payload);
      const updatedJsonWithPayment = _.merge({}, state.orgidJson, {
        ...state.orgidJson,
        payment
      });

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithPayment,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithPayment, null, 2)),
        error: null
      });

    case REMOVE_PAYMENT_SUCCESS:
      payment.splice(payload, 1);
      const updatedJsonWithoutPayment = Object.assign({}, state.orgidJson, {
        ...state.orgidJson,
        payment
      });

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithoutPayment,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithoutPayment, null, 2)),
        error: null
      });

    case ADD_ASSERTION_SUCCESS:
      const newAssertion = {
        type: payload.type,
        claim: payload.claim,
        proof: (
          typeof payload.proof === 'object'
            ? payload.proof.id
            : payload.proof
        )
      };
      const newCredential = (
        typeof payload.proof === 'object'
          ? payload.proof
          : undefined
      );
      const updatedJsonWithAddedAssertion = {
        ...state.orgidJson,
        trust: {
          ...state.orgidJson.trust,
          assertions: addOrUpdateObjByParam(
            state.orgidJson.trust.assertions || [],
            newAssertion,
            'claim'
          ),
          credentials: addOrUpdateObjByParam(
            state.orgidJson.trust.credentials || [],
            newCredential,
            'id'
          )
        }
      };
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithAddedAssertion,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithAddedAssertion, null, 2)),
        error: null
      });
    case REMOVE_ASSERTION_SUCCESS:
      let orgidJson = state.orgidJson;
      // Remove credential in case of VC proof
      if (payload.proof.match(/^did:orgid/)) {
        orgidJson = {
          ...orgidJson,
          trust: {
            ...orgidJson.trust,
            credentials: orgidJson.trust.credentials.filter(
              c => c.id !== payload.proof
            )
          }
        };
      }
      const updatedJsonWithRemovedAssertion = {
        ...orgidJson,
        trust: {
          ...orgidJson.trust,
          assertions: (orgidJson.trust.assertions || []).filter(
            a => JSON.stringify(a) !== JSON.stringify(payload)
          )
        }
      };
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithRemovedAssertion,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithRemovedAssertion, null, 2)),
        error: null
      });

    case ADD_GPS_COORDINATES_SUCCESS:
      const addressKey = orgidType === 'legalEntity'
        ? 'registeredAddress'
        : 'address';
      const updatedJsonWithCoordinates = {
        ...state.orgidJson,
        [orgidType]: {
          ...state.orgidJson[orgidType],
          [addressKey]: {
            ...(state.orgidJson[orgidType][addressKey] ? state.orgidJson[orgidType][addressKey] : {}),
            gps: payload.join(',')
          }
        }
      };
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: updatedJsonWithCoordinates,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(updatedJsonWithCoordinates, null, 2)),
        error: null
      });
    case SAVE_MEDIA_TO_ARBOR_SUCCESS:
      orgidJsonUpdates = Object.assign({}, fixJsonRequiredProps(state.orgidJson), {
        ...state.orgidJson,
        ...({
          [orgidType]: {
            ...state.orgidJson[orgidType],
            media: {
              logo: payload
            }
          }
        }),
        updated: new Date().toJSON()
      });
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        orgidJson: orgidJsonUpdates,
        orgidHash: Web3.utils.soliditySha3(JSON.stringify(orgidJsonUpdates, null, 2)),
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
      return _.merge({}, state, {
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
    case REMOVE_AGENT_KEY_FAILURE:
    case ADD_SERVICE_FAILURE:
    case REMOVE_SERVICE_FAILURE:
    case ADD_PAYMENT_FAILURE:
    case REMOVE_PAYMENT_FAILURE:
    case ADD_ASSERTION_FAILURE:
    case REMOVE_ASSERTION_FAILURE:
    case ADD_GPS_COORDINATES_FAILURE:
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

export const selectFetchedState = createSelector(
  stateSelector,
  wizard => wizard.isFetched
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

//region == [ACTIONS: addGpsCoordinates] =================================================================================
export function addGpsCoordinates(payload) {
  return {
    type: ADD_GPS_COORDINATES,
    payload
  }
}

function addGpsCoordinatesSuccess(payload) {
  return {
    type: ADD_GPS_COORDINATES_SUCCESS,
    payload
  }
}

function addGpsCoordinatesFailure(error) {
  return {
    type: ADD_GPS_COORDINATES_FAILURE,
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

//region == [ACTIONS: addService] =================================================================================
export function addService(payload) {
  return {
    type: ADD_SERVICE_REQUEST,
    payload
  }
}

function addServiceSuccess(payload) {
  return {
    type: ADD_SERVICE_SUCCESS,
    payload
  }
}

function addServiceFailure(error) {
  return {
    type: ADD_SERVICE_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: removeService] =================================================================================
export function removeService(payload) {
  return {
    type: REMOVE_SERVICE_REQUEST,
    payload
  }
}

function removeServiceSuccess(payload) {
  return {
    type: REMOVE_SERVICE_SUCCESS,
    payload
  }
}

function removeServiceFailure(error) {
  return {
    type: REMOVE_SERVICE_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: addPayment] =================================================================================
export function addPayment(payload) {
  return {
    type: ADD_PAYMENT_REQUEST,
    payload
  }
}

function addPaymentSuccess(payload) {
  return {
    type: ADD_PAYMENT_SUCCESS,
    payload
  }
}

function addPaymentFailure(error) {
  return {
    type: ADD_PAYMENT_FAILURE,
    error
  }
}
//endregion

//region == [ACTIONS: removePayment] =================================================================================
export function removePayment(payload) {
  return {
    type: REMOVE_PAYMENT_REQUEST,
    payload
  }
}

function removePaymentSuccess(payload) {
  return {
    type: REMOVE_PAYMENT_SUCCESS,
    payload
  }
}

function removePaymentFailure(error) {
  return {
    type: REMOVE_PAYMENT_FAILURE,
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
function* rewriteOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);
    console.log('Rewrite request', result);

    yield put(rewriteOrgidJsonSuccess(result));
  } catch (error) {
    yield put(rewriteOrgidJsonFailure(error));
  }
}

function* extendOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);
    //ValidateOrgidSchema(result);
    yield put(extendOrgidJsonSuccess(result));
  } catch (error) {
    yield put(extendOrgidJsonFailure(error));
  }
}

function* addAgentKeyToOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addAgentKeySuccess(result));
  } catch (error) {
    yield put(addAgentKeyFailure(error));
  }
}

function* removeAgentKeyFromOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(removeAgentKeySuccess(result));
  } catch (error) {
    yield put(removeAgentKeyFailure(error));
  }
}

function* addServiceToOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addServiceSuccess(result));
  } catch (error) {
    yield put(addServiceFailure(error));
  }
}

function* removeServiceFromOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(removeServiceSuccess(result));
  } catch (error) {
    yield put(removeServiceFailure(error));
  }
}

function* addPaymentToOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addPaymentSuccess(result));
  } catch (error) {
    yield put(addPaymentFailure(error));
  }
}

function* removePaymentFromOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(removePaymentSuccess(result));
  } catch (error) {
    yield put(removePaymentFailure(error));
  }
}

function* addAssertionToOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addAssertionSuccess(result));
  } catch (error) {
    yield put(addAssertionFailure(error));
  }
}

function* addGpsCoordinatesSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(addGpsCoordinatesSuccess(result));
  } catch (error) {
    yield put(addGpsCoordinatesFailure(error));
  }
}

function* removeAssertionFromOrgidJsonSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(removeAssertionSuccess(result));
  } catch (error) {
    yield put(removeAssertionFailure(error));
  }
}

function* saveMediaToArborSaga({
  payload
}) {
  try {
    if (payload.file === null) {
      yield put(saveMediaToArborSuccess(null));
    } else {
      const {
        data: {
          uri
        }
      } = yield call(ApiPostMedia, payload);
      yield put(saveMediaToArborSuccess(uri));
    }
  } catch (error) {
    yield put(saveMediaToArborFailure(error));
  }
}

function* saveOrgidJsonToArborSaga({
  payload
}) {
  const orgidJson = yield select(selectWizardOrgidJson);

  try {
    const {
      data: {
        uri
      }
    } = yield call(ApiPostOrgidJson, {
      address: payload,
      orgidJson
    });

    yield put(saveOrgidJsonToArborSuccess(uri));
  } catch (error) {
    yield put(saveOrgidJsonToArborFailure(error));
  }
}

function* saveOrgidUriSaga({
  payload
}) {
  try {
    const result = yield call((data) => data, payload);

    yield put(saveOrgidUriSuccess(result));
  } catch (error) {
    yield put(saveOrgidUriFailure(error));
  }
}

function* sendCreateLegalEntitySaga({
  payload
}) {
  try {
    const web3 = yield select(selectWeb3);
    let gasPrice;
    if (payload.gasPrice) {
      gasPrice = payload.gasPrice;
      delete payload.gasPrice;
      console.log('@@@@ Gas price:', gasPrice);
    } else {
      gasPrice = yield call(ApiGetGasPrice, web3);
    }
    const result = yield call(ApiSendCreateLegalEntity, web3, payload, gasPrice);

    yield put(getTransactionStatus(result));
    yield put(sendCreateLegalEntitySuccess(result));
  } catch (error) {
    yield put(sendCreateLegalEntityFailure(error));
  }
}

function* sendCreateOrganizationalUnitSaga({
  payload
}) {
  try {
    const web3 = yield select(selectWeb3);
    let gasPrice;
    if (payload.gasPrice) {
      gasPrice = payload.gasPrice;
      delete payload.gasPrice;
      console.log('@@@@ Gas price:', gasPrice);
    } else {
      gasPrice = yield call(ApiGetGasPrice, web3);
    }
    const result = yield call(ApiSendCreateOrganizationalUnit, web3, payload, gasPrice);

    yield put(getTransactionStatus(result));
    yield put(sendCreateOrganizationalUnitSuccess(result));
  } catch (error) {
    yield put(sendCreateOrganizationalUnitFailure(error));
  }
}

function* sendChangeOrgidUriAndHashSaga({
  payload
}) {
  try {
    const web3 = yield select(selectWeb3);
    let gasPrice;
    if (payload.gasPrice) {
      gasPrice = payload.gasPrice;
      delete payload.gasPrice;
      console.log('@@@@ Gas price:', gasPrice);
    } else {
      gasPrice = yield call(ApiGetGasPrice, web3);
    }
    const result = yield call(ApiSendChangeOrgidUriAndHash, web3, payload, gasPrice);

    yield put(getTransactionStatus(result));
    yield put(sendChangeOrgidUriAndHashSuccess(result));
  } catch (error) {
    yield put(sendChangeOrgidUriAndHashFailure(error));
  }
}

function* getTransactionStatusSaga({
  payload
}) {
  try {
    yield put(setTransactionHash(payload));
    const web3 = yield select(selectWeb3);
    const result = yield call(ApiGetTxStatus, web3, payload);
    sessionStorage.removeItem('profileId');
    yield put(resetJoin());
    yield put(getTransactionStatusSuccess(result));
  } catch (error) {
    yield put(getTransactionStatusFailure(error));
  }
}

export const saga = function* () {
  return yield all([
    takeEvery(REWRITE_ORGID_JSON_REQUEST, rewriteOrgidJsonSaga),
    takeEvery(EXTEND_ORGID_JSON_REQUEST, extendOrgidJsonSaga),
    takeEvery(ADD_AGENT_KEY_REQUEST, addAgentKeyToOrgidJsonSaga),
    takeEvery(REMOVE_AGENT_KEY_REQUEST, removeAgentKeyFromOrgidJsonSaga),
    takeEvery(ADD_SERVICE_REQUEST, addServiceToOrgidJsonSaga),
    takeEvery(REMOVE_SERVICE_REQUEST, removeServiceFromOrgidJsonSaga),
    takeEvery(ADD_PAYMENT_REQUEST, addPaymentToOrgidJsonSaga),
    takeEvery(REMOVE_PAYMENT_REQUEST, removePaymentFromOrgidJsonSaga),
    takeEvery(ADD_ASSERTION_REQUEST, addAssertionToOrgidJsonSaga),
    takeEvery(REMOVE_ASSERTION_REQUEST, removeAssertionFromOrgidJsonSaga),
    takeEvery(ADD_GPS_COORDINATES, addGpsCoordinatesSaga),
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
const ApiPostMedia = (data) => {
  const {
    address,
    id,
    file
  } = data;
  const fd = new FormData();
  fd.append('media', file, createUniqueFileName(file.name));
  fd.append('address', address);
  fd.append('id', id);

  return callApi(`media`, 'POST', {
    body: fd
  });
}

const ApiPostOrgidJson = (data) => {
  return callApi(`json`, 'POST', {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const ApiSendCreateLegalEntity = async (web3, data, gasPrice) => {
  const orgidContract = getOrgidContract(web3);
  const {
    orgidUri,
    address,
    solt,
    orgidJson
  } = data;

  // %(
  const hash = Web3.utils.soliditySha3(JSON.stringify(orgidJson, null, 2));

  const gas = await orgidContract.methods.createOrganization
    .apply(orgidContract, [
      solt,
      hash,
      orgidUri,
      '',
      ''
    ])
    .estimateGas({
      from: address,
      gasPrice
    });

  return new Promise((resolve, reject) => {
    // Create the transaction
    orgidContract.methods.createOrganization(
        solt,
        hash,
        orgidUri,
        '',
        ''
      )

      // Send it to the network
      .send(
        // Options: only from address
        {
          from: address,
          gasPrice,
          gas
        },

        // Callback
        (error, transactionHash) => {
          if (error) {
            return reject(error);
          }
          console.log('transactionHash', transactionHash);
          resolve(transactionHash);
        }
      );
  });
}

const ApiSendCreateOrganizationalUnit = async (web3, data, gasPrice) => {
  const orgidContract = getOrgidContract(web3);
  const {
    parent: {
      orgid: orgidParent
    },
    orgidUri,
    orgidJson,
    address,
    solt
  } = data;
  // const orgidId = orgidJson.id.replace('did:orgid:', '');

  // %(
  const hash = Web3.utils.soliditySha3(JSON.stringify(orgidJson, null, 2));

  const gas = await orgidContract.methods.createUnit
    .apply(orgidContract, [
      solt,
      orgidParent,
      address,
      hash,
      orgidUri,
      '',
      ''
    ])
    .estimateGas({
      from: address,
      gasPrice
    });

  return new Promise((resolve, reject) => {
    // Create the transaction
    orgidContract.methods.createUnit(
        solt,
        orgidParent,
        address,
        hash,
        orgidUri,
        '',
        ''
      )

      // Send transaction to the network
      .send(
        // Options
        {
          from: address,
          gasPrice,
          gas
        },

        // Callback
        (error, transactionHash) => {
          if (error) return reject(error);
          resolve(transactionHash);
        }
      );
  });
}

const ApiSendChangeOrgidUriAndHash = async (web3, data, gasPrice) => {
  const orgidContract = getOrgidContract(web3);
  const {
    orgidUri,
    address,
    orgidJson
  } = data;
  const orgidId = orgidJson.id.replace('did:orgid:', '');

  // %(
  const hash = Web3.utils.soliditySha3(JSON.stringify(orgidJson, null, 2));

  const gas = await orgidContract.methods.setOrgJson
    .apply(orgidContract, [
      orgidId,
      hash,
      orgidUri,
      '',
      ''
    ])
    .estimateGas({
      from: address,
      gasPrice
    });

  return new Promise((resolve, reject) => {
    orgidContract.methods.setOrgJson(
        orgidId,
        hash,
        orgidUri,
        '',
        ''
      )

      .send(
        // Options
        {
          from: address,
          gasPrice,
          gas
        },

        // Callback
        (error, transactionHash) => {
          if (error) {
            return reject(error);
          }
          console.log('transactionHash', transactionHash);
          resolve(transactionHash);
        }
      );
  });
}

export const ApiGetTxStatus = (web3, transactionHash) => new Promise(
  (resolve, reject) => {
    let interval = setInterval(() => {
      web3.eth.getTransactionReceipt(transactionHash, (err, data) => {
        if (err) {
          reject(err);
          return clearInterval(interval);
        } else if (data) {
          setTimeout(() => {
            resolve(data);
          }, 1500);
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
    }, 10 * 60 * 1000); // 10 min
  }
);

// Validate a JSON document according to schema
export const validateOrgidSchema = orgidJson => {
  // Load the JSON schema validator
  let validator = new Validator();

  // Perform the validation
  return validator.validate(orgidJson, orgidSchema);
}
