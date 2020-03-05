import { appName, ORGID_ABI, ORGID_PROXY_ADDRESS } from '../utils/constants';
import _ from 'lodash';
import { createSelector } from 'reselect';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';

// region == [CONSTANTS] ===============================================
export const moduleName = 'deposit';
const prefix = `${appName}/${moduleName}`;
const GET_LIF_TOKEN_REQUEST = `${prefix}/GET_LIF_TOKEN_REQUEST`;
const GET_LIF_TOKEN_SUCCESS = `${prefix}/GET_LIF_TOKEN_SUCCESS`;
const GET_LIF_TOKEN_FAILURE = `${prefix}/GET_LIF_TOKEN_FAILURE`;

const GET_BALANCE_REQUEST = `${prefix}/GET_BALANCE_REQUEST`;
const GET_BALANCE_SUCCESS = `${prefix}/GET_BALANCE_SUCCESS`;
const GET_BALANCE_FAILURE = `${prefix}/GET_BALANCE_FAILURE`;

const ALLOW_DEPOSIT_REQUEST = `${prefix}/ALLOW_DEPOSIT_REQUEST`;
const ALLOW_DEPOSIT_SUCCESS = `${prefix}/ALLOW_DEPOSIT_SUCCESS`;
const ALLOW_DEPOSIT_FAILURE = `${prefix}/ALLOW_DEPOSIT_FAILURE`;

const MAKE_DEPOSIT_REQUEST = `${prefix}/MAKE_DEPOSIT_REQUEST`;
const MAKE_DEPOSIT_SUCCESS = `${prefix}/MAKE_DEPOSIT_SUCCESS`;
const MAKE_DEPOSIT_FAILURE = `${prefix}/MAKE_DEPOSIT_FAILURE`;

const FETCH_WITHDRAWAL_STATE_REQUEST = `${prefix}/FETCH_WITHDRAWAL_STATE_REQUEST`;
const FETCH_WITHDRAWAL_STATE_SUCCESS = `${prefix}/FETCH_WITHDRAWAL_STATE_SUCCESS`;
const FETCH_WITHDRAWAL_STATE_FAILURE = `${prefix}/FETCH_WITHDRAWAL_STATE_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  lifToken: null,
  balance: null,
  deposit: null,
  allowance: false,
  withdrawStatus: {
    available: false,
    availableAt: {},
  },
  error: null,
};
// endregion

// region == [REDUCER] =================================================
export default function reducer(state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    // REQUEST //
    case GET_LIF_TOKEN_REQUEST:
    case ALLOW_DEPOSIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        allowance: false,
        error: null,
      });
    case GET_BALANCE_REQUEST:
    case MAKE_DEPOSIT_REQUEST:
    case FETCH_WITHDRAWAL_STATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null,
      });
    // SUCCESS //
    case GET_LIF_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        lifToken: payload,
        allowance: false,
        error: null
      });
    case GET_BALANCE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        balance: payload,
        allowance: false,
        error: null
      });
    case ALLOW_DEPOSIT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        allowance: true,
        error: null
      });
    case MAKE_DEPOSIT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        deposit: payload,
        error: null
      });
    case FETCH_WITHDRAWAL_STATE_SUCCESS:
      const withdrawStatus = _.merge({}, state.withdrawStatus, payload);

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        withdrawStatus,
        error: null
      });
    // FAILURE //
    case GET_LIF_TOKEN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        lifToken: null,
        allowance: false,
        error: error
      });
    case GET_BALANCE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    case ALLOW_DEPOSIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        allowance: false,
        error: error
      });
    case MAKE_DEPOSIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        deposit: null,
        error: error
      });
    default:
      return initialState;
  }
}
// endregion

// region == [SELECTORS] ===============================================
const stateSelector = state => state[moduleName];

export const selectLifToken = createSelector(
  stateSelector,
  deposit => deposit.lifToken
);

export const selectAllowance = createSelector(
  stateSelector,
  deposit => deposit.allowance
);

export const selectBalance = createSelector(
  stateSelector,
  deposit => deposit.balance
);

export const selectDeposit = createSelector(
  stateSelector,
  deposit => deposit.deposit
);

export const selectWithdrawStatus =  createSelector(
  stateSelector,
  deposit => deposit.withdrawStatus
);
// endregion

// region == [ACTIONS] =================================================
export function getLifToken() {
  return {
    type: GET_LIF_TOKEN_REQUEST,
  }
}

function getLifTokenSuccess(payload) {
  return {
    type: GET_LIF_TOKEN_SUCCESS,
    payload
  }
}

function getLifTokenFailure(error) {
  return {
    type: GET_LIF_TOKEN_FAILURE,
    error
  }
}

export function getBalance(payload) {
  return {
    type: GET_BALANCE_REQUEST,
    payload
  }
}

function getBalanceSuccess(payload) {
  return {
    type: GET_BALANCE_SUCCESS,
    payload
  }
}

function getBalanceFailure(error) {
  return {
    type: GET_BALANCE_FAILURE,
    error
  }
}
// endregion

// region == [SAGAS] ===================================================
function* getLifTokenSaga() {
  try {
    const result = yield call(ApiGetLifToken);

    yield put(getLifTokenSuccess(result));
  } catch(error) {
    yield put(getLifTokenFailure(error))
  }
}

function* getBalanceSaga({payload}) {
  try {
    const lifAddress = select(selectLifToken);
    const balance = yield call(lifAddress.balanceOf, payload);

    yield put(getBalanceSuccess(balance.toNumber()));
  } catch(error) {
    yield put(getBalanceFailure(error));
  }
}

export const saga = function*() {
  yield all([
    takeEvery(GET_LIF_TOKEN_REQUEST, getLifTokenSaga),
    takeEvery(GET_BALANCE_REQUEST, getBalanceSaga),
  ])
};
// endregion

// region == [utils] ====================================================
function getWeb3() {
  if (typeof window.web3 === 'undefined') {
    alert('MetaMask not found. If you just install MetaMask please refresh page to continue');
    throw new Error(`MetaMask not found`);
  }
  return window.web3
}

function getOrgidContract() {
  const web3 = getWeb3();
  const orgidAbi = web3.eth.contract(ORGID_ABI); // todo: load ABI on this step only from backend to optimize react size
  return orgidAbi.at(ORGID_PROXY_ADDRESS); // todo: can be loaded from back-end as well
}

// endregion

// region == [API] =====================================================
function ApiGetLifToken() {
  const orgidContract = getOrgidContract();
  return orgidContract.owner();
}

function ApiIncreaseAllowance(data) {
  const orgidContract = getOrgidContract();
  const { orgid, value } = data;

  return new Promise((resolve, reject) => {
    orgidContract.increaseApproval(
      orgid, value,
      (data, error) => {
        if(error) reject(error);
        resolve(data);
      }
    )
  })
}

function ApiMakeDeposit(data) {
  const orgidContract = getOrgidContract();
  const { orgid, value } = data;
  return new Promise((resolve, reject) => {
    orgidContract.transfer(
      orgid, value,
      (data, error) => {
        if(error) reject(error);
        resolve(data);
      }
    )
  })
}

function ApiGetWithdrawalRequest(data) {

}
// endregion