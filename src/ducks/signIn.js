import Portis from '@portis/web3';
import Web3 from 'web3';
import {
  appName,
  INFURA_PROVIDER_WSS,
  PORTIS_ID,
  PORTIS_DEFAULT_NETWORK
} from '../utils/constants';
import history from '../redux/history';
import { createSelector } from 'reselect';
import { all, call, put, takeLatest, select, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

let portis;

/**
 * Constants
 */
export const moduleName = 'signIn';
const prefix = `${appName}/${moduleName}`;
export const FETCH_SIGN_IN_REQUEST = `${prefix}/FETCH_SIGN_IN_REQUEST`;
export const FETCH_SIGN_IN_SUCCESS = `${prefix}/FETCH_SIGN_IN_SUCCESS`;
export const FETCH_SIGN_IN_FAILURE = `${prefix}/FETCH_SIGN_IN_FAILURE`;
export const FETCH_LOGOUT_REQUEST = `${prefix}/FETCH_LOGOUT_REQUEST`;
export const OPEN_PORTIS_WALLET = `${prefix}/OPEN_PORTIS_WALLET`;
export const SET_DEFAULT_WEB3 = `${prefix}/SET_DEFAULT_WEB3`;
export const ACCOUNT_CHANGE = `${prefix}/ACCOUNT_CHANGE`;

const initialState = {
  isFetching: false,
  isFetched: false,
  provider: null,
  web3: null,
  address: false,
  isAuthenticated: false,
  error: null
};

/**
 * Reducer
 */
export default function reducer( state = initialState, action ) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_SIGN_IN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        isAuthenticated: false,
        error: null
      });
    case SET_DEFAULT_WEB3:
      return {
        web3: payload.web3,
        error: null
      };
    case FETCH_SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        provider: payload.provider,
        web3: payload.web3,
        address: payload.address,
        isAuthenticated: true,
        error: null
      });
    case FETCH_SIGN_IN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        isAuthenticated: false,
        error: error
      });
    case FETCH_LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        provider: null,
        web3: null,
        address: false,
        isAuthenticated: false,
        error: null
      });
    case ACCOUNT_CHANGE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        address: payload,
        isAuthenticated: true,
        error: null
      });
    default:
      return state
  }
}


/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const selectSignInStatus = createSelector(
  stateSelector,
  signIn => signIn.isAuthenticated
);

export const selectSignInError = createSelector(
  stateSelector,
  signIn => signIn.error
);

export const selectSignInAddress = createSelector(
  stateSelector,
  signIn => signIn.address
);

export const selectWeb3 = createSelector(
  stateSelector,
  signIn => signIn.web3
);

export const selectProvider = createSelector(
  stateSelector,
  signIn => signIn.provider
);

/**
 * Actions
 */
export function setDefaultWeb3(payload) {
  return {
    type: SET_DEFAULT_WEB3,
    payload
  }
}

export function fetchSignInRequest(payload) {
  return {
    type: FETCH_SIGN_IN_REQUEST,
    payload
  }
}

export function logOutRequest() {
  return {
    type: FETCH_LOGOUT_REQUEST
  }
}

export function accountChangeRequest(payload) {
  return {
    type: ACCOUNT_CHANGE,
    payload
  }
}

function fetchSignInSuccess(payload) {
  return {
    type: FETCH_SIGN_IN_SUCCESS,
    payload
  }
}

function fetchSignInFailure(error) {
  return {
    type: FETCH_SIGN_IN_FAILURE,
    error
  }
}

export function openPortis() {
  return {
    type: OPEN_PORTIS_WALLET
  }
}

/**
 * Event Channels
 */

export const subscribePortisEventChannel = portis => {
  return eventChannel(emitter => {
    portis.onError(error => emitter(fetchSignInFailure(error)));
    portis.onLogin(address => emitter(fetchSignInRequest({
      web3: new Web3(portis.provider),
      address,
      provider: 'portis'
    })));
    portis.onLogout(() => {
      emitter(logOutRequest());
      emitter(END)
    });
    portis.onActiveWalletChanged(address => emitter(accountChangeRequest(address)));

    return () => {};
  });
};

export const subscribeMetamaskEventChannel = web3 => {
  return eventChannel(emitter => {
    const handleNewAccounts = accounts => {
      if (accounts.length === 0) {
        emitter(logOutRequest());
        emitter(END);
      } else {
        emitter(accountChangeRequest(accounts[0]));
      }
    };
    const handleChainChange = () => {
      emitter(END);
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleNewAccounts);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {};
  });
};

const openPortisPopUp = async () => {
  portis.showPortis();
};

/**
 * Sagas
 */

function* setDefaultWeb3Saga() {
  try {
    yield put(setDefaultWeb3({
      web3: new Web3(INFURA_PROVIDER_WSS)
    }));
  } catch (error) {
    // Connection Failure
    yield put(fetchSignInFailure(error));
  }
}

function* subscribePortisSaga(portis) {
  const portisEvents = yield call(subscribePortisEventChannel, portis);
  yield openPortisPopUp();

  while (true) {
    const eventAction = yield take(portisEvents);
    yield put(eventAction);
  }
}

function* subscribeMetamaskSaga(web3) {
  const metamaskEvents = yield call(subscribeMetamaskEventChannel, web3);

  while (true) {
    const eventAction = yield take(metamaskEvents);
    yield put(eventAction);
  }
}

function* openPortisSaga() {
  const provider = yield select(selectProvider);

  if (provider !== 'portis') {
    portis = new Portis(PORTIS_ID, PORTIS_DEFAULT_NETWORK);
    yield subscribePortisSaga(portis);
  } else {
    yield openPortisPopUp();
  }
}

function* startOnSignInSagas() {
  const provider = yield select(selectProvider);
  const web3 = yield select(selectWeb3);

  if (provider === 'metamask') {
    yield subscribeMetamaskSaga(web3);
  }
}

// Sign-in saga
function* fetchSignInSaga({ payload }) {
  try {
    // Connection Success
    yield put(fetchSignInSuccess(payload));

    const {
      follow,
      search
    } = history.location.state || {};
    console.log('Location history:', history.location);
    if (follow) {
      yield call(history.push, {
        pathname: follow,
        search
      });
    } else {
      yield call(history.push, '/my-organizations');
    }
  } catch (error) {
    // Connection Failure
    yield put(fetchSignInFailure(error));
    yield call(history.push, { pathname: '/authorization' });
  }
}


// Main saga
export const saga = function*() {
  yield all([
    takeLatest('persist/REHYDRATE', setDefaultWeb3Saga),
    takeLatest(FETCH_SIGN_IN_REQUEST, fetchSignInSaga),
    takeLatest(OPEN_PORTIS_WALLET, openPortisSaga),
    takeLatest(FETCH_SIGN_IN_SUCCESS, startOnSignInSagas)
  ]);
};
