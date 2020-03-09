import _ from 'lodash';
import { createSelector } from 'reselect';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { appName, LIF_DEPOSIT_AMOUNT, ORGID_PROXY_ADDRESS } from '../utils/constants';
import { getOrgidContract, getLifTokenContract, getCurrentBlockNumber, getGasPrice } from '../utils/helpers'
import { selectSignInAddress } from "./signIn";

// region == [CONSTANTS] ===============================================
export const moduleName = 'deposit';
const prefix = `${appName}/${moduleName}`;

const ENRICH_LIF_DATA_REQUEST = `${prefix}/ENRICH_LIF_DATA_REQUEST`;
const ENRICH_LIF_DATA_SUCCESS = `${prefix}/ENRICH_LIF_DATA_SUCCESS`;
const ENRICH_LIF_DATA_FAILURE = `${prefix}/ENRICH_LIF_DATA_FAILURE`;

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
  requiredOrgIdLifDeposit: LIF_DEPOSIT_AMOUNT,

  lifTokenBalance: false,
  lifTokenAllowanceAmountForOrgId: 0,
  orgIdLifDepositAmount: 0,
  orgIdLifWithdrawalExist: false,
  orgIdLifWithdrawalValue: null,
  orgIdLifWithdrawalTime: null,
  currentBlockNumber: null,

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
    case ENRICH_LIF_DATA_REQUEST:
    case ALLOW_DEPOSIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        allowance: false,
        error: null,
      });
    case MAKE_DEPOSIT_REQUEST:
    case FETCH_WITHDRAWAL_STATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        error: null,
      });
    // SUCCESS //
    case ENRICH_LIF_DATA_SUCCESS:
      return Object.assign({}, state, {
      isFetching: false,
      isFetched: true,
      error: null,
      ...payload
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
    case ENRICH_LIF_DATA_FAILURE:
    case ALLOW_DEPOSIT_FAILURE:
    case MAKE_DEPOSIT_FAILURE:
    case FETCH_WITHDRAWAL_STATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    default:
      return initialState;
  }
}
// endregion

// region == [SELECTORS] ===============================================
const stateSelector = state => state[moduleName];

export const selectLifTokenBalance = createSelector(
  stateSelector,
  deposit => deposit.lifTokenBalance
);

export const selectLifTokenAllowanceAmountForOrgId = createSelector(
  stateSelector,
  deposit => deposit.lifTokenAllowanceAmountForOrgId
);

export const selectOrgIdLifDepositAmount = createSelector(
  stateSelector,
  deposit => deposit.orgIdLifDepositAmount
);

export const selectOrgIdLifWithdrawalExist =  createSelector(
  stateSelector,
  deposit => deposit.orgIdLifWithdrawalExist
);

export const selectOrgIdLifWithdrawalValue =  createSelector(
  stateSelector,
  deposit => deposit.orgIdLifWithdrawalValue
);

export const selectOrgIdLifWithdrawalTime =  createSelector(
  stateSelector,
  deposit => deposit.orgIdLifWithdrawalTime
);

export const selectCurrentBlockNumber =  createSelector(
  stateSelector,
  deposit => deposit.currentBlockNumber
);


// endregion

// region == [ACTIONS] =================================================
export function enrichLifData(payload) {
  return {
    type: ENRICH_LIF_DATA_REQUEST,
    payload
  }
}

function enrichLifDataSuccess(payload) {
  return {
    type: ENRICH_LIF_DATA_SUCCESS,
    payload
  }
}

function enrichLifDataFailure(error) {
  return {
    type: ENRICH_LIF_DATA_FAILURE,
    error
  }
}

export function allowDeposit(payload) {
  return {
    type: ALLOW_DEPOSIT_REQUEST,
    payload
  }
}

function allowDepositSuccess(payload) {
  return {
    type: ALLOW_DEPOSIT_SUCCESS,
    payload
  }
}

function allowDepositFailure(error) {
  return {
    type: ALLOW_DEPOSIT_FAILURE,
    error
  }
}

export function makeDeposit(payload) {
  return {
    type: MAKE_DEPOSIT_REQUEST,
    payload
  }
}

function makeDepositSuccess(payload) {
  return {
    type: MAKE_DEPOSIT_SUCCESS,
    payload
  }
}

function makeDepositFailure(error) {
  return {
    type: MAKE_DEPOSIT_FAILURE,
    error
  }
}


// endregion

// region == [SAGAS] ===================================================
function* enrichLifDataSaga({payload}) {
  console.log('enrichLifDataSaga', payload);
  try {
    const {orgid} = payload;
    console.log('[.]', 'enrichLifDataSaga');
    const userAddress = yield select(selectSignInAddress);
    console.log('userAddress', userAddress);
    // lifTokenBalance
    console.log('>>>', 'yield call(ApiGetLifTokenBalance, userAddress)');
    const lifTokenBalance = yield call(ApiGetLifTokenBalance, userAddress);
    // lifTokenAllowanceAmountForOrgId
    console.log('>>>', 'yield call(lifTokenAllowanceAmountForOrgId, userAddress)');
    const lifTokenAllowanceAmountForOrgId = yield call(ApiGetLifTokenAllowanceAmountForOrgId, userAddress);
    // OrgIdLifTokenDepositedAmount
    const {
      deposit: orgIdLifDepositAmount
    } = yield call(ApiGetOrgIdLifTokenDepositedAmount, orgid);
    // lifTokenWithdrawDelay
    // OrgIdLifTokenWithdrawalRequest
    const {
      exist: orgIdLifWithdrawalExist,
      value: orgIdLifWithdrawalValue,
      withdrawTime: orgIdLifWithdrawalTime,
  } = yield call(ApiGetOrgIdLifTokenWithdrawalRequest, userAddress);
    console.log('balance', lifTokenBalance);

    const currentBlockNumber = yield call(ApiGetCurrentBlockNumber);

    yield put(enrichLifDataSuccess({
      lifTokenBalance,
      lifTokenAllowanceAmountForOrgId,
      orgIdLifDepositAmount,
      orgIdLifWithdrawalExist,
      orgIdLifWithdrawalValue,
      orgIdLifWithdrawalTime,
      currentBlockNumber
    }));
  } catch(error) {
    yield put(enrichLifDataFailure(error))
  }
}

function* allowDepositSaga({payload})  {
  console.log('makeDepositSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);

    const isSuccess = yield call(ApiIncreaseAllowance, userAddress);
    if(!isSuccess) throw 'Unable allow deposit';
    yield put(allowDepositSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(allowDepositFailure(error))
  }
}

function* makeDepositSaga({payload}) {
  console.log('makeDepositSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);
    const { orgid } = payload;

    yield call(ApiAddDeposit, userAddress, orgid);
    yield put(makeDepositSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(makeDepositFailure(error))
  }
}

export const saga = function*() {
  yield all([
    takeEvery(ENRICH_LIF_DATA_REQUEST, enrichLifDataSaga),
    takeEvery(ALLOW_DEPOSIT_REQUEST, allowDepositSaga),
    takeEvery(MAKE_DEPOSIT_REQUEST, makeDepositSaga),
  ])
};
// endregion

// region == [API] =====================================================
function ApiGetLifTokenBalance(userAddress) {
  console.log('[.]', 'ApiGetLifTokenBalance');
  const lifContract = getLifTokenContract();
  return new Promise((resolve, reject) => {
    try {
      lifContract.balanceOf(userAddress, (error, balance) => {
        if (error) return reject(error);
        // Get decimals
        lifContract.DECIMALS((error, decimals) => {
          if (error) return reject(error);
          balance = balance.div(10**decimals).toNumber();
          resolve(balance)
        });
      });
    } catch (e) {
      reject(`Error in ApiGetLifTokenBalance: ${e.toString()}`);
    }
  });
}

function ApiGetLifTokenAllowanceAmountForOrgId(_owner, _spender = ORGID_PROXY_ADDRESS) {
  console.log('[.]', 'ApiGetLifTokenAllowanceAmountForOrgId');
  const lifContract = getLifTokenContract();
  return new Promise((resolve, reject) => {
    try {
      lifContract.allowance(_owner, _spender, (error, allowed) => {
        if (error) return reject(error);
        // Get decimals
        lifContract.DECIMALS((error, decimals) => {
          if (error) return reject(error);
          allowed = allowed.div(10**decimals).toNumber();
          resolve(allowed)
        });
      });
    } catch (e) {
      reject(`Error in ApiGetLifTokenAllowanceAmountForOrgId: ${e.toString()}`);
    }
  });
}

function ApiGetOrgIdLifTokenDepositedAmount(orgId) {
  console.log('[.]', 'ApiGetOrgIdLifTokenDepositedAmount', orgId);
  const orgidContract = getOrgidContract();
  return new Promise((resolve, reject) => {
    try {
      orgidContract.getOrganization(orgId, (error, [exist, orgId, orgJsonUri, orgJsonHash, parentEntity, owner, director, state, directorConfirmed, deposit]) => {
        console.log('<<< orgidContract.getOrganization', 'args', exist, orgId, orgJsonUri, orgJsonHash, parentEntity, owner, director, state, directorConfirmed, deposit);
        if (error) return reject(error);
        // Get decimals
        resolve({
          deposit: deposit.toNumber()
        });
      });
    } catch (e) {
      reject(`Error in ApiGetOrgIdLifTokenDepositedAmount: ${e.toString()}`);
    }
  });
}

function ApiGetOrgIdLifTokenWithdrawalRequest(userAddress) {
  console.log('[.]', 'ApiGetOrgIdLifTokenWithdrawalRequest');
  const orgidContract = getOrgidContract();
  return new Promise((resolve, reject) => {
    try {
      orgidContract.getWithdrawalRequest(userAddress, (error, [exist, value, withdrawTime]) => {
        console.log('<<< orgidContract.getWithdrawalRequest', 'args', exist, value.toNumber(), withdrawTime.toNumber());
        if (error) return reject(error);
        // Get decimals
        resolve({
          exist,
          value: value.toNumber(),
          withdrawTime: withdrawTime.toNumber()
        });
      });
    } catch (e) {
      reject(`Error in ApiGetOrgIdLifTokenWithdrawalRequest: ${e.toString()}`);
    }
  });
}

function ApiGetCurrentBlockNumber() {
  console.log('[.]', 'ApiGetCurrentBlockNumber');
  return getCurrentBlockNumber()
}

function ApiIncreaseAllowance(userAddress) {
  const lifContract = getLifTokenContract();
  return new Promise((resolve, reject) => {
    lifContract.DECIMALS((error, decimals) => {
      if (error) return reject(error);
      lifContract.increaseApproval(
        ORGID_PROXY_ADDRESS, `${LIF_DEPOSIT_AMOUNT}${(10**decimals).toString().substr(1)}`,
        { from: userAddress, gas: 500000, gasPrice: getGasPrice() },
        (error, success) => {
          if(error) reject(error);
          resolve(success);
        }
      )
    });
  })
}

function ApiAddDeposit(userAddress, orgid) {
  const orgidContract = getOrgidContract();
  const lifContract = getLifTokenContract();
  return new Promise((resolve, reject) => {
    lifContract.DECIMALS((error, decimals) => {
      if (error) return reject(error);
      orgidContract.addDeposit(
        orgid, `${LIF_DEPOSIT_AMOUNT}${(10**decimals).toString().substr(1)}`,
        { from: userAddress, gas: 500000, gasPrice: getGasPrice() },
        (error, data) => {
          if(error) reject(error);
          resolve(data);
        }
      )
    });
  });
}


/*
function ApiGetWithdrawalRequest(data) {

}
*/
// endregion
