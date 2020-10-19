import { createSelector } from 'reselect';
import { all, takeEvery, throttle, call, put, select, delay, fork, take, cancel, spawn } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
    appName
} from '../utils/constants';
import {
    selectWeb3,
    selectSignInAddress,
    SET_DEFAULT_WEB3,
    FETCH_SIGN_IN_SUCCESS
} from './signIn';
import {
    getDirIndexContract,
    getArbDirContract
} from './utils/ethereum';
import { getSegmentMeta } from '../utils/directories';

/**
 * Constants
 */
export const moduleName = 'directories';
const prefix = `${appName}/${moduleName}`;

const DIR_INDEX_FAILURE = `${prefix}/DIR_INDEX_FAILURE`;
const DIR_INDEX_REQUEST = `${prefix}/DIR_INDEX_REQUEST`;
const DIR_INDEX_SUCCESS = `${prefix}/DIR_INDEX_SUCCESS`;

const DIR_STATS_FAILURE = `${prefix}/DIR_STATS_FAILURE`;
const DIR_STATS_REQUEST = `${prefix}/DIR_STATS_REQUEST`;
const DIR_STATS_SUCCESS = `${prefix}/DIR_STATS_SUCCESS`;

const ORG_SET = `${prefix}/ORG_SET`;
const ORG_RESET = `${prefix}/ORG_RESET`;
const ORG_FAILURE = `${prefix}/ORG_FAILURE`;
const ORG_SUCCESS = `${prefix}/ORG_SUCCESS`;

// =================================



const POLLING_START = `${prefix}/POLLING_START`;
const POLLING_START_SUCCESS = `${prefix}/POLLING_START_SUCCESS`;
const POLLING_STOP = `${prefix}/POLLING_STOP`;
const POLLING_FAILURE = `${prefix}/POLLING_FAILURE`;


const DIRECTORY_SET = `${prefix}/DIRECTORY_SET`;
const LIF_BALANCE_SET = `${prefix}/LIF_BALANCE_SET`;
const LIF_ALLOWANCE_SET = `${prefix}/LIF_ALLOWANCE_SET`;
const ORG_REQUESTED_SET = `${prefix}/ORG_REQUESTED_SET`;
const ETH_BALANCE_SET = `${prefix}/ETH_BALANCE_SET`;

const ORG_DIRECTORIES_SET = `${prefix}/ORG_DIRECTORIES_SET`;

const DIR_RESET_STATE = `${prefix}/DIR_RESET_STATE`;

const initialState = {
    indexError: null,
    indexFetching: false,
    directories: [],

    statsError: null,
    statsFetching: false,
    stats: [],

    orgError: null,
    orgId: null,
    orgDirectoriesFetching: false,
    orgDirectories: []
};

/**
 * Reducer
 */
export default (state = initialState, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case DIR_INDEX_REQUEST:
            return {
                ...state,
                indexFetching: true
            };
        case DIR_INDEX_SUCCESS:
            return {
                ...state,
                indexFetching: false,
                directories: payload.directories.map(dir => getSegmentMeta(dir))
            };

        case DIR_STATS_REQUEST:
            return {
                ...state,
                statsFetching: true
            };
        case DIR_STATS_SUCCESS:
            return {
                ...state,
                statsFetching: false,
                stats: payload.stats
            };

        case ORG_SET:
            return {
                ...state,
                orgDirectoriesFetching: true,
                orgId: payload.orgId
            };
        case ORG_SUCCESS:
            return {
                ...state,
                orgDirectoriesFetching: false,
                orgDirectories: payload.directories
            };
        case ORG_RESET:
            return {
                ...state,
                orgDirectoriesFetching: false,
                orgId: null,
                orgDirectories: []
            };

        // Errors
        case DIR_INDEX_FAILURE:
            return {
                ...state,
                indexFetching: false,
                indexError: error
            };
        case DIR_STATS_FAILURE:
            return {
                ...state,
                statsFetching: false,
                statsError: error
            };
        case ORG_FAILURE:
            return {
                ...state,
                orgDirectoriesFetching: false,
                orgError: error
            };
        default:
            return state;
    }
}

/**
 * Actions
 */

export const indexFailure = error => ({
    type: DIR_INDEX_FAILURE,
    error
});

export const indexRequest = () => ({
    type: DIR_INDEX_REQUEST
});

export const indexSuccess = directories => ({
    type: DIR_INDEX_SUCCESS,
    payload: {
        directories
    }
});

export const statsFailure = error => ({
    type: DIR_STATS_FAILURE,
    error
});

export const statsRequest = () => ({
    type: DIR_STATS_REQUEST
});

export const statsSuccess = stats => ({
    type: DIR_STATS_SUCCESS,
    payload: {
        stats
    }
});

export const orgFailure = error => ({
    type: ORG_FAILURE,
    error
});

export const setOrgId = orgId => ({
    type: ORG_SET,
    payload: {
        orgId
    }
});

export const orgDirectoriesSuccess = directories => ({
    type: ORG_SUCCESS,
    payload: {
        directories
    }
});

export const resetOrgId = () => ({
    type: ORG_RESET
});

// ========================================


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

export const resetState = () => {
    return {
        type: DIR_RESET_STATE
    }
}

/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const indexError = createSelector(
    stateSelector,
    ({ indexError }) => indexError
);

export const isIndexFetching = createSelector(
    stateSelector,
    ({ indexFetching }) => indexFetching
);

export const directories = createSelector(
    stateSelector,
    ({ directories }) => directories
);

export const statsError = createSelector(
    stateSelector,
    ({ statsError }) => statsError
);

export const isStatsFetching = createSelector(
    stateSelector,
    ({ statsFetching }) => statsFetching
);

export const stats = createSelector(
    stateSelector,
    ({ stats }) => stats
);

export const orgError = createSelector(
    stateSelector,
    ({ orgError }) => orgError
);

export const isOrgDirectoriesFetching = createSelector(
    stateSelector,
    ({ orgDirectoriesFetching }) => orgDirectoriesFetching
);

export const orgDirectories = createSelector(
    stateSelector,
    ({ orgDirectories }) => orgDirectories
);

export const selectedOrgId = createSelector(
    stateSelector,
    ({ orgId }) => orgId
);


// ============================================================

export const directoriesStor = createSelector(
    stateSelector,
    store => store
);

export const isIndexFetched = createSelector(
    stateSelector,
    ({ isIndexFetched }) => isIndexFetched
);

export const isPolling = createSelector(
    stateSelector,
    ({ isPolling }) => isPolling
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



/**
 * Utils
 */



/**
 * API
 */
const fetchDirectories = (web3, ids) => Promise.all(
    ids.map(async address => {
        const dir = getArbDirContract(web3, address);
        const segment = await dir.methods.getSegment().call();
        const governor = await dir.methods.governor().call();
        const arbitrator = await dir.methods.arbitrator().call();
        const arbitratorExtraData = await dir.methods.arbitratorExtraData().call();
        const requesterDepositRaw = await dir.methods.requesterDeposit().call();
        const requesterDeposit = Number(web3.utils.fromWei(requesterDepositRaw, 'ether'));
        const challengeBaseDepositRaw = await dir.methods.challengeBaseDeposit().call();
        const challengeBaseDeposit = Number(web3.utils.fromWei(challengeBaseDepositRaw, 'ether'));
        const executionTimeout = Number(await dir.methods.executionTimeout().call());
        const responseTimeout = Number(await dir.methods.responseTimeout().call());
        const withdrawTimeout = Number(await dir.methods.withdrawTimeout().call());
        const winnerStakeMultiplier = Number(await dir.methods.winnerStakeMultiplier().call());
        const loserStakeMultiplier = Number(await dir.methods.loserStakeMultiplier().call());
        const sharedStakeMultiplier = Number(await dir.methods.sharedStakeMultiplier().call());
        const MULTIPLIER_DIVISOR = Number(await dir.methods.MULTIPLIER_DIVISOR().call());

        return {
            address,
            segment,
            governor,
            arbitrator,
            arbitratorExtraData,
            requesterDepositRaw,
            requesterDeposit,
            challengeBaseDepositRaw,
            challengeBaseDeposit,
            executionTimeout,
            responseTimeout,
            withdrawTimeout,
            winnerStakeMultiplier,
            loserStakeMultiplier,
            sharedStakeMultiplier,
            MULTIPLIER_DIVISOR
        };
    })
);

const fetchStats = (web3, directories) => Promise.all(
    directories.map(async ({ address }) => {
        const dir = getArbDirContract(web3, address);
        const entities = Number(await dir.methods.getOrganizationsCount(0, 0).call());
        const numberOfRequests = Number(await dir.methods.getRequestedOrganizationsCount(0, 0).call());
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
            address,
            entities,
            numberOfRequests,
            numberOfChallenges
        };
    })
);

const fetchIndex = async web3 => {
    const index = getDirIndexContract(web3);
    const ids = await index.methods.getSegments().call();
    return fetchDirectories(web3, ids);
};

const fetchOrgDirectories = async (web3, directories, orgId) => Promise.all(
    directories.map(async ({ address }) => {
        const dir = getArbDirContract(web3, address);
        const orgData = await dir.methods.organizationData(orgId).call();
        let challenges = [];
        const numChallenges = Number(await dir.methods.getNumberOfChallenges(orgId).call());
        if (numChallenges > 0) {
            challenges = await Promise.all(
                Array(numChallenges)
                    .fill(null)
                    .map((_, i) => dir.methods.getChallengeInfo(orgId, i).call())
            );
        }
        return {
            address,
            ...orgData,
            challenges
        }
    })
);

export const subscribeDirectoriesEventsChannel = (web3, fromBlock, directories) => {
    return eventChannel(emitter => {
        const subscriptions = directories.map(({ address }) => {
            const dir = getArbDirContract(web3, address);
            const subscription = dir.events.allEvents(
                {
                    fromBlock
                },
                (error, evt) => {
                    if (error) {
                        return emitter(statsFailure(error));
                    }
                    console.log('Directory Event:', evt);
                    emitter(statsRequest());
                }
            );
            console.log('Subscribed to directory:', [
                address,
                fromBlock
            ], subscription);
            return subscription;
        });
        console.log('Subscribed Directories channel');
        return () => subscriptions.forEach(d => d.unsubscribe());
    });
};

/**
 * Sagas
 */
function* subscribeDirectoriesSaga() {
    const web3 = yield select(selectWeb3);
    const directoriesList = yield select(directories);
    const dirsEvents = yield call(
        subscribeDirectoriesEventsChannel,
        web3,
        'latest',
        directoriesList
    );
    while (true) {
        const eventAction = yield take(dirsEvents);
        yield put(eventAction);
    };
}

function* fetchStatsSaga() {
    try {
        const web3 = yield select(selectWeb3);
        const directoriesList = yield select(directories);
        yield delay(5000);
        const stats = yield call(fetchStats, web3, directoriesList);
        console.log('New stats:', stats);
        yield put(statsSuccess(stats));
        const orgId = yield select(selectedOrgId);
        const orgFetching = yield select(isOrgDirectoriesFetching);
        if (orgId && !orgFetching) {
            yield put(setOrgId(orgId));
        }
    } catch (error) {
        yield put(statsFailure(error));
    }
}

function* fetchDirectoriesSaga() {
    try {
        const web3 = yield select(selectWeb3);
        const directories = yield call(fetchIndex, web3);
        yield put(indexSuccess(directories));
        const subscriptionSaga = yield fork(subscribeDirectoriesSaga);
        yield take(DIR_INDEX_REQUEST);
        yield cancel(subscriptionSaga);
    } catch (error) {
        yield put(indexFailure(error));
    }
}

function* fetchOrgDirectoriesSaga({ payload }) {
    try {
        const orgId = payload.orgId;
        const web3 = yield select(selectWeb3);
        const directoriesList = yield select(directories);
        const orgDirectories = yield call(fetchOrgDirectories, web3, directoriesList, orgId);
        yield put(orgDirectoriesSuccess(orgDirectories));
    } catch (error) {
        yield put(orgFailure(error));
    }
}

export const saga = function* () {
    return yield all([
        takeEvery(SET_DEFAULT_WEB3, fetchDirectoriesSaga),
        takeEvery(DIR_INDEX_REQUEST, fetchDirectoriesSaga),
        throttle(1500, DIR_INDEX_SUCCESS, fetchStatsSaga),
        throttle(1500, DIR_STATS_REQUEST, fetchStatsSaga),
        throttle(1500, ORG_SET, fetchOrgDirectoriesSaga)
    ]);
};
