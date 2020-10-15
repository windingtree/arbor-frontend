import { createSelector } from 'reselect';
import { all, takeEvery, takeLatest, call, put, select, delay, fork, take, cancel } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
    appName
} from '../utils/constants';
import {
    getDirIndexContract,
    getLifTokenContract,
    getArbDirContract,
    getBlock
} from './utils/ethereum';
import {
    selectWeb3,
    selectSignInAddress,
    SET_DEFAULT_WEB3,
    FETCH_SIGN_IN_SUCCESS
} from './signIn';
import { getSegmentMeta } from '../utils/directories';

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
const ETH_BALANCE_SET = `${prefix}/ETH_BALANCE_SET`;

const ORG_DIRECTORIES_SET = `${prefix}/ORG_DIRECTORIES_SET`;

const DIR_RESET_STATE = `${prefix}/DIR_RESET_STATE`;

const initialState = {
    isIndexFetching: false,
    isIndexFetched: false,
    isPolling: false,
    isOrgDirectoriesFetched: false,
    isOrgRequestedStatusFetched: false,

    directories: [],
    orgId: null,
    orgDirectories: [],
    directoryId: '',
    lifBalance: '0',
    lifAllowance: '0',
    ethBalance: '0',
    orgRequested: false,

    indexError: null,
    pollingError: null
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
                directories: payload.directories.map(dir => getSegmentMeta(dir))
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
        case ETH_BALANCE_SET:
            return Object.assign({}, state, {
                ethBalance: payload.balance
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

export const setEthBalance = payload => {
    return {
        type: ETH_BALANCE_SET,
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
    ({ isIndexFetching }) => isIndexFetching
);

export const isIndexFetched = createSelector(
    stateSelector,
    ({ isIndexFetched }) => isIndexFetched
);

export const isPolling = createSelector(
    stateSelector,
    ({ isPolling }) => isPolling
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

export const ethBalance = createSelector(
    stateSelector,
    ({ ethBalance }) => ethBalance
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
            const requesterDepositRaw = await dir.methods.requesterDeposit().call();
            const challengeDepositRaw = await dir.methods.challengeBaseDeposit().call();
            const responseTimeout = await dir.methods.responseTimeout().call();
            const executionTimeout = await dir.methods.executionTimeout().call();
            const withdrawTimeout = await dir.methods.withdrawTimeout().call();
            const reqOrganizations = await dir.methods.getRequestedOrganizations(0, 0).call();
            const organizations = await dir.methods.getOrganizations(0, 0).call();
            const challenges = await Promise.all(
                [...organizations, ...reqOrganizations]
                    .map(orgId => dir.methods.getNumberOfDisputes(orgId).call())
            );
            const numberOfChallenges = challenges.reduce(
                (a,v) => Number(a) + Number(v),
                0
            );

            return {
                address: id,
                segment,
                entities: Number(entities),
                numberOfChallenges,
                numberOfRequests: Number(numberOfRequests),
                requesterDepositRaw,
                requesterDeposit: Number(web3.utils.fromWei(requesterDepositRaw, 'ether')),
                challengeDepositRaw,
                challengeDeposit: Number(web3.utils.fromWei(challengeDepositRaw, 'ether')),
                responseTimeout,
                executionTimeout,
                withdrawTimeout
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
    const orgData = await dir.methods.organizationData(orgId).call();
    let challenges;
    if ([3, 4, 5].includes(Number(orgData.status))) {
        const numChallenges = await dir.methods.getNumberOfChallenges(orgId).call();
        challenges = await Promise.all(
            Array(Number(numChallenges))
                .fill(null)
                .map((_, i) => dir.methods.getChallengeInfo(orgId, i).call())
        );
    }
    return {
        ...orgData,
        ...(challenges ? { challenges } : {})
    }
};

const fetchOrganizationRegistrations = (web3, orgId, directories) => Promise.all(
    directories.map(
        d => fetchRegistrationData(web3, orgId, d.address)
    )
);

const fetchEthBalance = async (web3, owner) => {
    const balance = await web3.eth.getBalance(owner);
    return web3.utils.fromWei(balance, 'ether');
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
        let ethBalance;
        let allowance;
        let requestData;
        let orgDirectories = [];
        store = yield select(directoriesStor);

        if (store.isPolling) {
            return;
        }

        yield put(startPollingSuccess());

        store = yield select(directoriesStor);
        const owner = yield select(selectSignInAddress);
        const web3 = yield select(selectWeb3);

        while (store.isPolling && !store.pollingError) {
            if (count > 1800) {
                throw new Error('Too much polling cycles');
            }

            if (owner) {
                balance = yield call(fetchLifBalance, web3, owner);
                yield put(setLifBalance({ balance }));
                ethBalance = yield call(fetchEthBalance, web3, owner);
                yield put(setEthBalance({ balance: ethBalance }));
            }

            if (store.directoryId && store.orgId) {

                if (owner) {
                    allowance = yield call(fetchLifAllowance, web3, owner, store.directoryId);
                    yield put(setAllowance({ allowance }));
                }

                requestData = yield call(fetchRegistrationData, web3, store.orgId, store.directoryId);
                yield put(setRequested({ orgRequested: requestData.ID === store.orgId && Number(requestData.status) > 0 }));
            }

            orgDirectories = yield call(
                fetchOrganizationRegistrations,
                web3,
                store.orgId,
                store.directories
            );
            // console.log('@@@', orgDirectories);
            yield put(setOrgDirectories({
                orgDirectories
            }));

            yield delay(5000);
            store = yield select(directoriesStor);
            count++;
        };

    } catch(error) {
        console.log('Polling error!', error);
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
