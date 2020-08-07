import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { all, takeEvery, call, put, select } from 'redux-saga/effects';

import { ApiGetGasPrice, getOrgidContract } from './utils/ethereum';
import { selectSignInAddress, selectWeb3 } from "./signIn";
import { selectItem } from './fetchOrganizationInfo';

import { fetchOrganizationInfoWithRefresh } from './fetchOrganizationInfo';
import { fetchProfileOrganizations } from './fetchProfile';

/**
 * Constants
 */
export const moduleName = 'activeStatus';
const prefix = `${appName}/${moduleName}`;
const SAVE_STATUS_REQUEST = `${prefix}/SAVE_STATUS_REQUEST`;
const SAVE_STATUS_SUCCESS = `${prefix}/SAVE_STATUS_SUCCESS`;
const SAVE_STATUS_FAILURE = `${prefix}/SAVE_STATUS_FAILURE`;
const TRANSTACTION_REQUEST = `${prefix}/TRANSTACTION_REQUEST`;
const TRANSTACTION_SUCCESS = `${prefix}/TRANSTACTION_SUCCESS`;
const TRANSTACTION_FAILURE = `${prefix}/TRANSTACTION_FAILURE`;
const TRANSTACTION_RESET = `${prefix}/TRANSTACTION_RESET`;

const initialState = {
  isFetching: false,
  isFetched: false,
  transactionHash: null,
  pendingTransaction: false,
  successTransaction: false,
  error: null
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case SAVE_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null
      });
    case SAVE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        error: null
      });
    case SAVE_STATUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    case TRANSTACTION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        transactionHash: payload.tx,
        pendingTransaction: true,
        successTransaction: false,
        error: null
      });
    case TRANSTACTION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        pendingTransaction: false,
        successTransaction: true,
        error: null
      });
    case TRANSTACTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        pendingTransaction: false,
        successTransaction: false,
        error: error
      });
    case TRANSTACTION_RESET:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        transactionHash: null,
        pendingTransaction: false,
        successTransaction: false,
        error: null
      });

    default:
      return state;
  }
}

/**
 * Actions
 */
export function saveActiveStatus() {
  return {
    type: SAVE_STATUS_REQUEST
  }
}

export function saveActiveStatusSuccess() {
  return {
    type: SAVE_STATUS_SUCCESS
  }
}

export function saveActiveStatusFailure(error) {
  return {
    type: SAVE_STATUS_FAILURE,
    error
  }
}

export function getActiveStatusTransactionStatus(payload) {
  return {
    type: TRANSTACTION_REQUEST,
    payload
  }
}

export function transactionStatusSuccess() {
  return {
    type: TRANSTACTION_SUCCESS
  }
}

export function transactionStatusFailure(error) {
  return {
    type: TRANSTACTION_FAILURE,
    error
  }
}

export function resetActiveStatusTransaction(payload) {
  return {
    type: TRANSTACTION_RESET,
    payload
  }
}

/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const getIsFetching = createSelector(
  stateSelector,
  ({
    isFetching
  }) => isFetching
);

export const getError = createSelector(
  stateSelector,
  ({
    error
  }) => error
);

export const getTransactionHash = createSelector(
  stateSelector,
  ({
    transactionHash
  }) => transactionHash
);

export const getTransactionPending = createSelector(
  stateSelector,
  ({
    pendingTransaction
  }) => pendingTransaction
);

export const getIsSuccessTransaction = createSelector(
  stateSelector,
  ({
    successTransaction
  }) => successTransaction
);

/**
 * API
 */
const apiSendToggleActiveState = (web3, data, gasPrice) => {
  const orgidContract = getOrgidContract(web3);
  const {
    orgid,
    address
  } = data;

  return new Promise((resolve, reject) => {
    // Create the transaction
    orgidContract.methods.toggleActiveState(orgid)

      // Send it to the network
      .send(
        // Options: only from address
        {
          from: address,
          gasPrice
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

const apiGetTxStatus = (web3, transactionHash) => {
  return new Promise((resolve, reject) => {
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
    }, 10 * 60 * 1000); // 10 min
  });
}

/**
 * Sagas
 */
function* startTransactionStatusSaga({
  payload
}) {
  try {
    const web3 = yield select(selectWeb3);
    yield call(apiGetTxStatus, web3, payload.tx);
    yield put(transactionStatusSuccess());
    const organization = yield select(selectItem);
    yield put(fetchOrganizationInfoWithRefresh({
      id: organization.orgid
    }));
    yield put(fetchProfileOrganizations({
      owner: organization.owner
    }));
    yield put(saveActiveStatusSuccess());
  } catch (error) {
    yield put(transactionStatusFailure(error));
  }
}

function* startSaveActiveStatusSaga() {
  try {
    const web3 = yield select(selectWeb3);
    const gasPrice = yield call(ApiGetGasPrice, web3);
    const address = yield select(selectSignInAddress);
    const organization = yield select(selectItem);
    const tx = yield call(
      apiSendToggleActiveState,
      web3, {
        orgid: organization.orgid,
        address
      },
      gasPrice
    );
    yield put(getActiveStatusTransactionStatus({
      tx
    }));
  } catch (error) {
    yield put(saveActiveStatusFailure(error));
  }
}

export const saga = function* () {
  return yield all([
    takeEvery(SAVE_STATUS_REQUEST, startSaveActiveStatusSaga),
    takeEvery(TRANSTACTION_REQUEST, startTransactionStatusSaga)
  ]);
};
