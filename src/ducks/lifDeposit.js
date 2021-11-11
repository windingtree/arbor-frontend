import { createSelector } from 'reselect';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { appName, LIF_DEPOSIT_AMOUNT, LIF_DEPOSIT_ADDRESS } from '../utils/constants';
import {
  ApiGetGasPrice,
  getLifTokenContract,
  getLifDepositContract,
  getCurrentBlockNumber,
} from './utils/ethereum';
import { selectSignInAddress, selectWeb3 } from "./signIn";

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

const REQUEST_WITHDRAWAL_REQUEST = `${prefix}/REQUEST_WITHDRAWAL_REQUEST`;
const REQUEST_WITHDRAWAL_SUCCESS = `${prefix}/REQUEST_WITHDRAWAL_SUCCESS`;
const REQUEST_WITHDRAWAL_FAILURE = `${prefix}/REQUEST_WITHDRAWAL_FAILURE`;

const WITHDRAWAL_REQUEST = `${prefix}/WITHDRAWAL_REQUEST`;
const WITHDRAWAL_SUCCESS = `${prefix}/WITHDRAWAL_SUCCESS`;
const WITHDRAWAL_FAILURE = `${prefix}/WITHDRAWAL_FAILURE`;

const REQUEST_FAUCET_REQUEST = `${prefix}/REQUEST_FAUCET_REQUEST`;
const REQUEST_FAUCET_SUCCESS = `${prefix}/REQUEST_FAUCET_SUCCESS`;
const REQUEST_FAUCET_FAILURE = `${prefix}/REQUEST_FAUCET_FAILURE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  requiredOrgIdLifDeposit: LIF_DEPOSIT_AMOUNT,

  lifTokenBalance: 0,
  lifTokenAllowanceAmountForOrgId: 0,
  orgIdLifDepositAmount: 0,
  orgIdLifWithdrawalExist: false,
  orgIdLifWithdrawalValue: 0,
  orgIdLifWithdrawalTime: 0,
  currentBlockNumber: 0,

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
    case MAKE_DEPOSIT_REQUEST:
    case REQUEST_WITHDRAWAL_REQUEST:
    case WITHDRAWAL_REQUEST:
    case REQUEST_FAUCET_REQUEST:
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
    case MAKE_DEPOSIT_SUCCESS:
    case REQUEST_WITHDRAWAL_SUCCESS:
    case WITHDRAWAL_SUCCESS:
    case REQUEST_FAUCET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        error: null
      });
    // FAILURE //
    case ENRICH_LIF_DATA_FAILURE:
    case ALLOW_DEPOSIT_FAILURE:
    case MAKE_DEPOSIT_FAILURE:
    case REQUEST_WITHDRAWAL_FAILURE:
    case WITHDRAWAL_FAILURE:
    case REQUEST_FAUCET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        error: error
      });
    default:
      return state;
  }
}
// endregion

// region == [SELECTORS] ===============================================
const stateSelector = state => state[moduleName];

export const selectLifTokenBalance = createSelector(
  stateSelector,
  ({ lifTokenBalance }) => lifTokenBalance
);

export const selectLifDepositDataFetching = createSelector(
  stateSelector,
  ({ isFetching }) => isFetching
);

export const selectLifTokenAllowanceAmountForOrgId = createSelector(
  stateSelector,
  ({ lifTokenAllowanceAmountForOrgId }) => lifTokenAllowanceAmountForOrgId
);

export const selectOrgIdLifDepositAmount = createSelector(
  stateSelector,
  ({ orgIdLifDepositAmount }) => orgIdLifDepositAmount
);

export const selectOrgIdLifWithdrawalExist =  createSelector(
  stateSelector,
  ({ orgIdLifWithdrawalExist }) => orgIdLifWithdrawalExist
);

export const selectOrgIdLifWithdrawalValue =  createSelector(
  stateSelector,
  ({ orgIdLifWithdrawalValue }) => orgIdLifWithdrawalValue
);

export const selectOrgIdLifWithdrawalTime =  createSelector(
  stateSelector,
  ({ orgIdLifWithdrawalTime }) => orgIdLifWithdrawalTime
);

export const selectCurrentBlockNumber =  createSelector(
  stateSelector,
  ({ currentBlockNumber }) => currentBlockNumber
);

export const selectError = createSelector(
  stateSelector,
  ({ error }) => error ? error.message : error
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

export function requestWithdrawal(payload) {
  return {
    type: REQUEST_WITHDRAWAL_REQUEST,
    payload
  }
}

export function withdrawDeposit(payload) {
  return {
    type: WITHDRAWAL_REQUEST,
    payload
  }
}

function requestWithdrawalSuccess(payload) {
  return {
    type: REQUEST_WITHDRAWAL_SUCCESS,
    payload
  }
}

function requestWithdrawalFailure(error) {
  return {
    type: REQUEST_WITHDRAWAL_FAILURE,
    error
  }
}

function withdrawalSuccess(payload) {
  return {
    type: WITHDRAWAL_SUCCESS,
    payload
  }
}

function withdrawalFailure(error) {
  return {
    type: WITHDRAWAL_FAILURE,
    error
  }
}

export function requestFaucet(payload) {
  return {
    type: REQUEST_FAUCET_REQUEST,
    payload
  }
}

function requestFaucetSuccess(payload) {
  return {
    type: REQUEST_FAUCET_SUCCESS,
    payload
  }
}

function requestFaucetFailure(error) {
  return {
    type: REQUEST_FAUCET_FAILURE,
    error
  }
}


// endregion

// region == [SAGAS] ===================================================
function* enrichLifDataSaga({payload}) {
  console.log('enrichLifDataSaga', payload);
  try {
    const { orgid } = payload;
    console.log('[.]', 'enrichLifDataSaga');
    const userAddress = yield select(selectSignInAddress);
    const web3 = yield select(selectWeb3);
    console.log('userAddress', userAddress);
    // lifTokenBalance
    console.log('>>>', 'yield call(ApiGetLifTokenBalance, web3, userAddress)');
    let lifTokenBalance;
    let lifTokenAllowanceAmountForOrgId;

    if (userAddress) {
      lifTokenBalance = yield call(ApiGetLifTokenBalance, web3, userAddress);
      console.log('balance', lifTokenBalance);
      // lifTokenAllowanceAmountForOrgId
      console.log('>>>', 'yield call(lifTokenAllowanceAmountForOrgId, web3, userAddress)');
      lifTokenAllowanceAmountForOrgId = yield call(ApiGetLifTokenAllowanceAmountForOrgId, web3, userAddress);
      console.log('lifTokenAllowanceAmountForOrgId', lifTokenAllowanceAmountForOrgId);
    }

    // OrgIdLifTokenDepositedAmount
    let orgIdLifDepositAmount = yield call(ApiGetOrgIdLifTokenDepositedAmount, web3, orgid);
    // lifTokenWithdrawDelay
    // OrgIdLifTokenWithdrawalRequest
    const {
      exist,
      value,
      withdrawTime,
    } = yield call(ApiGetOrgIdLifTokenWithdrawalRequest, web3, orgid);

    const currentBlockNumber = yield call(ApiGetCurrentBlockNumber, web3);
    yield put(enrichLifDataSuccess({
      lifTokenBalance: Number(lifTokenBalance),
      lifTokenAllowanceAmountForOrgId: Number(lifTokenAllowanceAmountForOrgId),
      orgIdLifDepositAmount: Number(orgIdLifDepositAmount),
      orgIdLifWithdrawalExist: Boolean(exist),
      orgIdLifWithdrawalValue: Number(value),
      orgIdLifWithdrawalTime: Number(withdrawTime) * 1000,
      currentBlockNumber
    }));
  } catch(error) {
    yield put(enrichLifDataFailure(error))
  }
}

function* allowDepositSaga({payload})  {
  console.log('allowDepositSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);
    const web3 = yield select(selectWeb3);
    const gasPrice = yield call(ApiGetGasPrice, web3);

    const isSuccess = yield call(ApiIncreaseAllowance, web3, userAddress, gasPrice);
    if(!isSuccess) throw 'Unable allow deposit'; // eslint-disable-line  no-throw-literal
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
    const web3 = yield select(selectWeb3);
    const { orgid } = payload;
    const gasPrice = yield call(ApiGetGasPrice, web3);

    yield call(ApiAddDeposit, web3, userAddress, orgid, gasPrice);
    yield put(makeDepositSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(makeDepositFailure(error))
  }
}

function* requestWithdrawalSaga({payload}) {
  console.log('requestWithdrawalSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);
    const web3 = yield select(selectWeb3);
    const { orgid } = payload;
    const gasPrice = yield call(ApiGetGasPrice, web3);

    yield call(ApiPostWithdrawalRequest, web3, userAddress, orgid, gasPrice);
    yield put(requestWithdrawalSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(requestWithdrawalFailure(error))
  }
}

function* withdrawDepositSaga({payload}) {
  console.log('withdrawDepositSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);
    const web3 = yield select(selectWeb3);
    const { orgid } = payload;
    const gasPrice = yield call(ApiGetGasPrice, web3);

    yield call(ApiPostWithdrawDeposit, web3, userAddress, orgid, gasPrice);
    yield put(withdrawalSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(withdrawalFailure(error))
  }
}

function* requestFaucetSaga({payload}) {
  console.log('requestFaucetSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);
    const web3 = yield select(selectWeb3);
    const isAllowed = yield call(ApiCheckFaucetBalance, web3, userAddress);

    if (!isAllowed) {
      yield put(requestFaucetFailure(new Error('You have reached your faucet limit')));
      return;
    }

    const gasPrice = yield call(ApiGetGasPrice, web3);

    yield call(ApiRequestFaucet, web3, userAddress, gasPrice);
    yield put(requestFaucetSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(requestFaucetFailure(error))
  }
}

export const saga = function*() {
  yield all([
    takeEvery(ENRICH_LIF_DATA_REQUEST, enrichLifDataSaga),
    takeEvery(ALLOW_DEPOSIT_REQUEST, allowDepositSaga),
    takeEvery(MAKE_DEPOSIT_REQUEST, makeDepositSaga),
    takeEvery(REQUEST_WITHDRAWAL_REQUEST, requestWithdrawalSaga),
    takeEvery(WITHDRAWAL_REQUEST, withdrawDepositSaga),
    takeEvery(REQUEST_FAUCET_REQUEST, requestFaucetSaga),
  ])
};
// endregion

// region == [API] =====================================================
// Get the LIF Token Balance of user
const ApiGetLifTokenBalance = (web3, userAddress) => {
  console.log('[.]', 'ApiGetLifTokenBalance');
  let lifContract = getLifTokenContract(web3);

  return new Promise((resolve, reject) => {
    lifContract.methods.balanceOf(userAddress)
    .call()
    .then(balance => {
      resolve(web3.utils.fromWei(balance));
    })
    .catch(error => reject(error));
  });
}

// Get the LIF Spending allowance for the user (ERC20 function)
const ApiGetLifTokenAllowanceAmountForOrgId = (web3, _owner, _spender = LIF_DEPOSIT_ADDRESS) => {
  console.log('[.]', 'ApiGetLifTokenAllowanceAmountForOrgId');
  let lifContract = getLifTokenContract(web3);

  return new Promise((resolve, reject) => {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', _owner, _spender);
      lifContract.methods.allowance(_owner, _spender)
      .call()
      .then(allowance => {
        console.log('<<< orgidContract.allowance', web3.utils.fromWei(allowance));
        resolve(web3.utils.fromWei(allowance));
      })
      .catch(error => reject(error));
  });
}

// Get the LIF Deposit amount for the Org.ID
const ApiGetOrgIdLifTokenDepositedAmount = (web3, orgId) => {
  let lifDepositContract = getLifDepositContract(web3);

  return new Promise((resolve, reject) => {
    console.log('[.]', '@@@@@@@@@@@@@@@@ ApiGetOrgIdLifTokenDepositedAmount', orgId);
    lifDepositContract.methods.balanceOf(orgId)
    .call()
    .then(balance => {
      console.log('<<<<<< lifDepositContract.balanceOf', orgId, balance);
      resolve(web3.utils.fromWei(balance));
    })
    .catch(error => reject(error));
  });
}

// Check if a withdrawal request exists
const ApiGetOrgIdLifTokenWithdrawalRequest = (web3, orgid) => {
  console.log('[.]', 'ApiGetOrgIdLifTokenWithdrawalRequest');
  let lifDepositContract = getLifDepositContract(web3);

  return new Promise((resolve, reject) => {
    lifDepositContract.methods.getWithdrawalRequest(orgid)
    .call()
    .then(withdrawalRequest => {
      console.log('<<< lifDepositContract.getWithdrawalRequest', withdrawalRequest);
      resolve({
        exist: withdrawalRequest.exists,
        value: web3.utils.fromWei(withdrawalRequest.value),
        withdrawTime: withdrawalRequest.withdrawTime
      });
    })
    .catch(error => reject(error));
  });
}

const ApiGetCurrentBlockNumber = web3 => getCurrentBlockNumber(web3);

// Increase the allowance to be spent by ORG.ID contract - ERC20 function
const ApiIncreaseAllowance = (web3, userAddress, gasPrice) => {
  const lifContract = getLifTokenContract(web3);
  let allowedTokens = web3.utils.toWei(String(LIF_DEPOSIT_AMOUNT));

  return new Promise((resolve, reject) => {
    lifContract.methods.increaseApproval(
      LIF_DEPOSIT_ADDRESS,
      allowedTokens
    )
    .send({
      from: userAddress,
      gasPrice
    })
    .on('receipt', receipt => {
      resolve(receipt);
    })
    .on('error', (error, receipt) => {
      reject({error, receipt});
    });
  });
}

// Request funds from the Faucet (Ropsten only)
const ApiRequestFaucet = (web3, userAddress, gasPrice) => {
  //const lifContract = getLifFaucetContract();
  const lifContract = getLifTokenContract(web3);

  return new Promise((resolve, reject) => {
    lifContract.methods.faucetLif()
    .send({
      from: userAddress,
      gasPrice
    })
    .on('receipt', receipt => {
      resolve(receipt);
    })
    .on('error', (error, receipt) => {
      reject({error, receipt});
    });
  });
}

const ApiCheckFaucetBalance = async (web3, userAddress) => {
  const lifContract = getLifTokenContract(web3);
  const MAX_LIF_FAUCET = await lifContract
    .methods.MAX_LIF_FAUCET()
    .call();
  const balance = await await lifContract
    .methods.balanceOf(userAddress)
    .call();
  return Number(balance) < Number(MAX_LIF_FAUCET);
}

// Add a deposit on the contract
const ApiAddDeposit = (web3, userAddress, orgid, gasPrice) => {
  let lifDepositContract = getLifDepositContract(web3);

  return new Promise((resolve, reject) => {
    console.log('Start addDeposit', orgid, web3.utils.toWei(String(LIF_DEPOSIT_AMOUNT)));
    lifDepositContract.methods.addDeposit(
      orgid,
      web3.utils.toWei(String(LIF_DEPOSIT_AMOUNT))
    )
    .send({
      from: userAddress,
      gasPrice
    })
    .on('receipt', receipt => {
      resolve(receipt);
    })
    .on('error', (error, receipt) => {
      reject({error, receipt});
    });
  });
}

// Create a withdrawal request
const ApiPostWithdrawalRequest = (web3, userAddress, orgid, gasPrice) => {
  let lifDepositContract = getLifDepositContract(web3);
  console.log('[..]', 'Post Withdrawal request');

  return new Promise((resolve, reject) => {
    lifDepositContract.methods.submitWithdrawalRequest(
      orgid,
      web3.utils.toWei(String(LIF_DEPOSIT_AMOUNT))
    )
    .send({
      from: userAddress,
      gasPrice
    })
    .on('receipt', receipt => {
      resolve(receipt);
    })
    .on('error', (error, receipt) => {
      reject({error, receipt});
    });
  });
}

const ApiPostWithdrawDeposit = (web3, userAddress, orgid, gasPrice) => {
  let lifDepositContract = getLifDepositContract(web3);
  console.log('[..]', 'Post Withdraw deposit');

  return new Promise((resolve, reject) => {
    lifDepositContract.methods.withdrawDeposit(
      orgid
    )
    .send({
      from: userAddress,
      gasPrice
    })
    .on('receipt', receipt => {
      resolve(receipt);
    })
    .on('error', (error, receipt) => {
      reject({error, receipt});
    });
  });
}
