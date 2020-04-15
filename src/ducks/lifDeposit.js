import { createSelector } from 'reselect';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { appName, LIF_DEPOSIT_AMOUNT, ORGID_PROXY_ADDRESS } from '../utils/constants';
import { getOrgidContract, getLifTokenContract, getCurrentBlockNumber, getWeb3 } from '../web3/w3'
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

const REQUEST_WITHDRAWAL_REQUEST = `${prefix}/REQUEST_WITHDRAWAL_REQUEST`;
const REQUEST_WITHDRAWAL_SUCCESS = `${prefix}/REQUEST_WITHDRAWAL_SUCCESS`;
const REQUEST_WITHDRAWAL_FAILURE = `${prefix}/REQUEST_WITHDRAWAL_FAILURE`;

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

export function requestWithdrawal(payload) {
  return {
    type: REQUEST_WITHDRAWAL_REQUEST,
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
    let orgIdLifDepositAmount = yield call(ApiGetOrgIdLifTokenDepositedAmount, orgid);
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
  console.log('allowDepositSaga', payload);
  try {
    const userAddress = yield select(selectSignInAddress);

    const isSuccess = yield call(ApiIncreaseAllowance, userAddress);
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
    const { orgid } = payload;

    yield call(ApiAddDeposit, userAddress, orgid);
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
    const { orgid } = payload;

    yield call(ApiPostWithdrawalRequest, userAddress, orgid);
    yield put(requestWithdrawalSuccess({}));
    yield put(enrichLifData(payload));
  } catch(error) {
    yield put(requestWithdrawalFailure(error))
  }
}

export const saga = function*() {
  yield all([
    takeEvery(ENRICH_LIF_DATA_REQUEST, enrichLifDataSaga),
    takeEvery(ALLOW_DEPOSIT_REQUEST, allowDepositSaga),
    takeEvery(MAKE_DEPOSIT_REQUEST, makeDepositSaga),
    takeEvery(REQUEST_WITHDRAWAL_REQUEST, requestWithdrawalSaga),
  ])
};
// endregion

// region == [API] =====================================================
// Get the LIF Token Balance of user
function ApiGetLifTokenBalance(userAddress) {
  console.log('[.]', 'ApiGetLifTokenBalance');
  let lifContract = getLifTokenContract();
  let web3 = getWeb3();

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
function ApiGetLifTokenAllowanceAmountForOrgId(_owner, _spender = ORGID_PROXY_ADDRESS) {
  console.log('[.]', 'ApiGetLifTokenAllowanceAmountForOrgId');
  let lifContract = getLifTokenContract();
  let web3 = getWeb3();

  return new Promise((resolve, reject) => {
      lifContract.methods.allowance(_owner, _spender)
      .call()
      .then(allowance => {
        resolve(web3.utils.fromWei(allowance));
      })
      .catch(error => reject(error));
  });
}

// Get the LIF Deposit amount for the Org.ID
function ApiGetOrgIdLifTokenDepositedAmount(orgId) {
  console.log('[.]', 'ApiGetOrgIdLifTokenDepositedAmount', orgId);
  let orgidContract = getOrgidContract();
  let web3 = getWeb3();

  return new Promise((resolve, reject) => {
    orgidContract.methods.getOrganization(orgId)
    .call()
    .then(organization => {
      console.log('<<< orgidContract.getOrganization', organization);
      resolve(web3.utils.fromWei(organization.deposit));
    })
    .catch(error => reject(error));
  });
}

// Check if a withdrawal request exists
function ApiGetOrgIdLifTokenWithdrawalRequest(userAddress) {
  console.log('[.]', 'ApiGetOrgIdLifTokenWithdrawalRequest');
  let orgidContract = getOrgidContract();
  let web3 = getWeb3();

  return new Promise((resolve, reject) => {
    orgidContract.methods.getWithdrawalRequest(userAddress)
    .call()
    .then(withdrawalRequest => {
      console.log('<<< orgidContract.getWithdrawalRequest', withdrawalRequest);
      resolve({
        exist: withdrawalRequest.exist,
        value: web3.utils.fromWei(withdrawalRequest.value),
        withdrawTime: withdrawalRequest.withdrawTime
      });
    })
    .catch(error => reject(error));
  });

}

function ApiGetCurrentBlockNumber() {
  return getCurrentBlockNumber()
}

// Increase the allowance to be spent by ORG.ID contract - ERC20 function
function ApiIncreaseAllowance(userAddress) {
  const lifContract = getLifTokenContract();
  let web3 = getWeb3();

  return new Promise((resolve, reject) => {
    lifContract.methods.increaseApproval(
      ORGID_PROXY_ADDRESS,
      web3.utils.toWei(LIF_DEPOSIT_AMOUNT)
    )
    .send(
      { from: userAddress },
      (error, success) => {
        if(error) reject(error);
        resolve(success);
      }
    );
  });
}

// Add a deposit on the contract
function ApiAddDeposit(userAddress, orgid) {
  const orgidContract = getOrgidContract();
  let web3 = getWeb3();

  return new Promise((resolve, reject) => {

    orgidContract.methods.addDeposit(
      orgid,
      web3.utils.toWei(LIF_DEPOSIT_AMOUNT)
    )
    .send(
      { from: userAddress },
      (error, data) => {
        if(error) reject(error);
        resolve(data);
      }
    );

  });
}

// Create a withdrwal request
function ApiPostWithdrawalRequest(userAddress, orgid) {
  const orgidContract = getOrgidContract();
  let web3 = getWeb3();
  console.log('[..]', 'Post Withdrawal request');

  return new Promise((resolve, reject) => {
    orgidContract.methods.submitWithdrawalRequest(
      orgid,
      web3.utils.toWei(LIF_DEPOSIT_AMOUNT)
    )
    .send(
      { from: userAddress },
      (error, data) => {
        if(error) return reject(error);
        resolve(data);
      }
    );
  });
}
// endregion
