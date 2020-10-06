import { createSelector } from 'reselect';
import { all, takeEvery, takeLatest, call, put, select, delay, spawn, fork, take, cancel } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { appName } from '../utils/constants';
import {
    getDirIndexContract,
    getLifTokenContract,
    getArbDirContract,
    ApiGetGasPrice,
    getBlock,
} from './utils/ethereum';
import {
    selectWeb3,
    selectSignInAddress,
    SET_DEFAULT_WEB3,
    FETCH_SIGN_IN_SUCCESS
} from './signIn';

/**
 * Constants
 */
export const moduleName = 'directories';
const prefix = `${appName}/${moduleName}`;

const DIR_INDEX_REQUEST = `${prefix}/DIR_INDEX_REQUEST`;
const DIR_INDEX_SUCCESS = `${prefix}/DIR_INDEX_SUCCESS`;
const DIR_INDEX_FAILURE = `${prefix}/DIR_INDEX_FAILURE`;

const POLLING_START = `${prefix}/POLLING_START`;
const POLLING_START_SUCCESS = `${prefix}/POLLING_START_SUCCESS`;
const POLLING_STOP = `${prefix}/POLLING_STOP`;
const POLLING_FAILURE = `${prefix}/POLLING_FAILURE`;

const ORG_SET = `${prefix}/ORG_SET`;
const DIRECTORY_SET = `${prefix}/DIRECTORY_SET`;
const LIF_BALANCE_SET = `${prefix}/LIF_BALANCE_SET`;
const LIF_ALLOWANCE_SET = `${prefix}/LIF_ALLOWANCE_SET`;
const ORG_REQUESTED_SET = `${prefix}/ORG_REQUESTED_SET`;

const ORG_DIRECTORIES_SET = `${prefix}/ORG_DIRECTORIES_SET`;

const DIR_RESET_STATE = `${prefix}/DIR_RESET_STATE`;

const initialState = {
    isIndexFetching: false,
    isIndexFetched: false,
    isPolling: false,
    isApprovalTransaction: false,
    isRegisterTransaction: false,
    isOrgDirectoriesFetched: false,
    isOrgRequestedStatusFetched: false,

    directories: [],
    orgId: null,
    orgDirectories: [],
    directoryId: '',
    lifBalance: '0',
    lifAllowance: '0',
    orgRequested: false,

    indexError: null,
    pollingError: null,
    approvalError: null,
    registerError: null
};

/**
 * Reducer
 */
export default (state = initialState, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case DIR_INDEX_REQUEST:
            return Object.assign({}, state, {
                isIndexFetching: true,
                indexError: null
            });
        case DIR_INDEX_SUCCESS:
            return Object.assign({}, state, {
                isIndexFetching: false,
                isIndexFetched: true,
                indexError: null,
                directories: payload.directories
            });
        case DIR_INDEX_FAILURE:
            return Object.assign({}, state, {
                isIndexFetching: false,
                indexError: error
            });

        case POLLING_START:
            return Object.assign({}, state, {
                orgId: payload.orgId,
                pollingError: null
            });
        case POLLING_START_SUCCESS:
            return Object.assign({}, state, {
                isPolling: true,
                pollingError: null
            });
        case POLLING_STOP:
            return Object.assign({}, state, {
                isPolling: false,
                orgDirectories: [],
                isOrgDirectoriesFetched: false,
                pollingError: null
            });
        case POLLING_FAILURE:
            return Object.assign({}, state, {
                isPolling: false,
                pollingError: error
            });

        case ORG_SET:
            return Object.assign({}, state, {
                orgId: payload.orgId
            });
        case DIRECTORY_SET:
            return Object.assign({}, state, {
                directoryId: payload.directory
            });
        case LIF_BALANCE_SET:
            return Object.assign({}, state, {
                lifBalance: payload.balance
            });
        case LIF_ALLOWANCE_SET:
            return Object.assign({}, state, {
                lifAllowance: payload.allowance
            });
        case ORG_REQUESTED_SET:
            return Object.assign({}, state, {
                isOrgRequestedStatusFetched: true,
                orgRequested: payload.orgRequested
            });
        case ORG_DIRECTORIES_SET:
            return Object.assign({}, state, {
                isOrgDirectoriesFetched: true,
                orgDirectories: payload.orgDirectories
            });

        case DIR_RESET_STATE:
            return Object.assign({}, state, {
                directoryId: '',
                lifBalance: '0',
                lifAllowance: '0',
                isOrgRequestedStatusFetched: false,
                orgRequested: false
            });
        default:
            return state;
    }
}

/**
 * Actions
 */
export const fetchDirectories = () => {
    return {
        type: DIR_INDEX_REQUEST
    }
}

export const fetchDirectoriesSuccess = payload => {
    return {
        type: DIR_INDEX_SUCCESS,
        payload
    }
}

export const fetchDirectoriesFailure = error => {
    return {
        type: DIR_INDEX_FAILURE,
        error
    }
}

export const setOrgId = payload => {
    return {
        type: ORG_SET,
        payload
    }
};

export const setDirectory = payload => {
    return {
        type: DIRECTORY_SET,
        payload
    }
};

export const setLifBalance = payload => {
    return {
        type: LIF_BALANCE_SET,
        payload
    }
};

export const setAllowance = payload => {
    return {
        type: LIF_ALLOWANCE_SET,
        payload
    }
};

export const setRequested = payload => {
    return {
        type: ORG_REQUESTED_SET,
        payload
    }
};

export const startPolling = orgId => {
    return {
        type: POLLING_START,
        payload: {
            orgId
        }
    }
}

export const setOrgDirectories = payload => {
    return {
        type: ORG_DIRECTORIES_SET,
        payload
    }
}

export const startPollingSuccess = () => {
    return {
        type: POLLING_START_SUCCESS
    }
}

export const stopPolling = () => {
    return {
        type: POLLING_STOP
    }
}

export const pollingFailure = error => {
    return {
        type: POLLING_FAILURE,
        error
    }
}

export const resetState = () => {
    return {
        type: DIR_RESET_STATE
    }
}

/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const directoriesStor = createSelector(
    stateSelector,
    store => store
);

export const isIndexFetching = createSelector(
    stateSelector,
    ({ isFetching }) => isFetching
);

export const isIndexFetched = createSelector(
    stateSelector,
    ({ isIndexFetched }) => isIndexFetched
);

export const isPolling = createSelector(
    stateSelector,
    ({ isPolling }) => isPolling
);

export const isApprovalTransaction = createSelector(
    stateSelector,
    ({ isApprovalTransaction }) => isApprovalTransaction
);

export const isRegisterTransaction = createSelector(
    stateSelector,
    ({ isRegisterTransaction }) => isRegisterTransaction
);

export const directories = createSelector(
    stateSelector,
    ({ directories }) => directories
);

export const selectedDirectory = createSelector(
    stateSelector,
    ({ directoryId }) => directoryId
);

export const lifBalance = createSelector(
    stateSelector,
    ({ lifBalance }) => lifBalance
);

export const lifAllowance = createSelector(
    stateSelector,
    ({ lifAllowance }) => lifAllowance
);

export const isOrgRequestedFetched = createSelector(
    stateSelector,
    ({ isOrgRequestedStatusFetched }) => isOrgRequestedStatusFetched
);

export const isOrgRequested = createSelector(
    stateSelector,
    ({ orgRequested }) => orgRequested
);

export const indexError = createSelector(
    stateSelector,
    ({ indexError }) => indexError
);

export const pollingError = createSelector(
    stateSelector,
    ({ pollingError }) => pollingError
);

export const approvalError = createSelector(
    stateSelector,
    ({ approvalError }) => approvalError
);

export const registerError = createSelector(
    stateSelector,
    ({ registerError }) => registerError
);

export const orgDirectoriesFetched = createSelector(
    stateSelector,
    ({ isOrgDirectoriesFetched }) => isOrgDirectoriesFetched
);

export const orgDirectories = createSelector(
    stateSelector,
    ({ orgDirectories }) => orgDirectories
);

/**
 * Utils
 */

// Get directories details
const fetchDirectoriesDetails = async (web3, ids = []) => Promise.all(
    ids.map(
        async (id) => {
            const dir = getArbDirContract(web3, id);
            const segment = await dir.methods.getSegment().call();
            const entities = await dir.methods.getOrganizationsCount(0, 0).call();
            const numberOfRequests = await dir.methods.getRequestedOrganizationsCount(0, 0).call();
            const numberOfChallenges = await dir.methods.getNumberOfChallenges(id).call();
            const requesterDepositRaw = await dir.methods.requesterDeposit().call();

            return {
                address: id,
                segment,
                entities,
                numberOfChallenges,
                numberOfRequests,
                requesterDepositRaw,
                requesterDeposit: web3.utils.fromWei(requesterDepositRaw, 'ether')
            };
        }
    )
);

/**
 * API
 */

const fetchLifBalance = async (web3, owner) => {
    const lif = getLifTokenContract(web3);
    const balance = await lif.methods.balanceOf(owner).call();
    return web3.utils.fromWei(balance, 'ether');
};

const fetchLifAllowance = async (web3, owner, spender) => {
    const lif = getLifTokenContract(web3);
    const allowance = await lif.methods.allowance(owner, spender).call();
    return web3.utils.fromWei(allowance, 'ether');
};

const fetchRegistrationData = async (web3, orgId, dirId) => {
    const dir = getArbDirContract(web3, dirId);
    return dir.methods.organizationData(orgId).call();
};

const fetchOrganizationRegistrations = (web3, orgId, directories) => Promise.all(
    directories.map(
        d => fetchRegistrationData(web3, orgId, d.address)
    )
);

const sendApproval = async (web3, owner, spender, amount, gasPrice) => {
    const lif = getLifTokenContract(web3);
    return new Promise((resolve, reject) => {
        lif.methods.approve(spender, amount)
            .send({
                from: owner,
                gasPrice
            })
            .on('receipt', receipt => {
                resolve(receipt);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const sendRegisterToAdd = async (web3, owner, orgId, dirAddress, gasPrice) => {
    const dir = getArbDirContract(web3, dirAddress);
    return new Promise((resolve, reject) => {
        dir.methods.requestToAdd(orgId)
            .send({
                from: owner,
                gasPrice
            })
            .on('receipt', receipt => {
                resolve(receipt);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export const subscribeDirectoriesEventsChannel = (web3, fromBlock, directories) => {
    return eventChannel(emitter => {
        const subscriptions = directories.map(({ address }) => {
            const dir = getArbDirContract(web3, address);
            return dir.events.allEvents(
                {
                    fromBlock
                },
                (error, _) => {
                    if (error) {
                        return emitter(fetchDirectoriesFailure(error));
                    }
                    emitter(fetchDirectories());
                    emitter(END);
                }
            );
        });
        return () => subscriptions.forEach(d => d.unsubscribe());
    });
};

/**
 * Sagas
 */

function* subscribeDirectoriesSaga() {
    const web3 = yield select(selectWeb3);
    const directoriesList = yield select(directories);
    const block = yield call(getBlock, web3, 'latest');
    const dirsEvents = yield call(
        subscribeDirectoriesEventsChannel,
        web3,
        block.number,
        directoriesList
    );
    while (true) {
        const eventAction = yield take(dirsEvents);
        yield put(eventAction);
    };
}

function* startPollingSaga() {
    try {
        let count = 0;
        let store;
        let balance;
        let allowance;
        let requestData;
        store = yield select(directoriesStor);

        if (store.isPolling) {
            return;
        }

        yield spawn(startPolingParticipationSaga);
        yield put(startPollingSuccess());
        store = yield select(directoriesStor);
        const owner = yield select(selectSignInAddress);
        const web3 = yield select(selectWeb3);

        while (store.isPolling && !store.pollingError) {
            if (count > 1800) {
                throw new Error('Too much polling cycles');
            }

            balance = yield call(fetchLifBalance, web3, owner);
            yield put(setLifBalance({ balance }));

            if (store.directoryId) {
                allowance = yield call(fetchLifAllowance, web3, owner, store.directoryId);
                yield put(setAllowance({ allowance }));
                requestData = yield call(fetchRegistrationData, web3, store.orgId, store.directoryId);
                yield put(setRequested({ orgRequested: requestData.ID === store.orgId && Number(requestData.status) > 0 }));
            }

            yield delay(1500);
            store = yield select(directoriesStor);
            count++;
        };

    } catch(error) {
        yield put(pollingFailure(error))
    }
}

function* startPolingParticipationSaga() {
    try {
        let count = 0;
        let orgDirectories = [];
        let store;
        store = yield select(directoriesStor);

        if (store.isPolling) {
            return;
        }

        yield put(startPollingSuccess());
        store = yield select(directoriesStor);
        const web3 = yield select(selectWeb3);

        while (store.isPolling && !store.pollingError) {
            if (count > 1800) {
                throw new Error('Too much polling cycles');
            }

            orgDirectories = yield call(
                fetchOrganizationRegistrations,
                web3,
                store.orgId,
                store.directories
            );
            yield put(setOrgDirectories({
                orgDirectories
            }));

            yield delay(3000);
            store = yield select(directoriesStor);
            count++;
        };

    } catch(error) {
        yield put(pollingFailure(error))
    }
}

function* startFetchDirectoriesSaga() {
    try {
        const web3 = yield select(selectWeb3);
        const index = getDirIndexContract(web3);
        const directories = yield index.methods.getSegments().call();
        const directoriesDetails = yield call(fetchDirectoriesDetails, web3, directories);
        yield put(fetchDirectoriesSuccess({
            directories: directoriesDetails
        }));
        const subscriptionSaga = yield fork(subscribeDirectoriesSaga);
        yield take(DIR_INDEX_REQUEST);
        yield cancel(subscriptionSaga);
    } catch (error) {
        yield put(fetchDirectoriesFailure(error));
    }
}

export const saga = function* () {
    return yield all([
        takeLatest(SET_DEFAULT_WEB3, startFetchDirectoriesSaga),
        takeEvery(DIR_INDEX_REQUEST, startFetchDirectoriesSaga),
        takeEvery(FETCH_SIGN_IN_SUCCESS, startFetchDirectoriesSaga),
        takeEvery(POLLING_START, startPollingSaga)
    ]);
};
