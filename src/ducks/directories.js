import { createSelector } from 'reselect';
import { all, takeEvery, takeLatest, call, put, select, delay, fork, take, cancel } from 'redux-saga/effects';
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


// =================================



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
    indexError: null,
    indexFetching: false,
    directories: [],

    statsError: null,
    statsFetching: false,
    stats: []
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

export const orgDirectories = createSelector(
    stateSelector,
    ({ orgDirectories }) => orgDirectories
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

export const subscribeDirectoriesEventsChannel = (web3, fromBlock, directories) => {
    return eventChannel(emitter => {
        const subscriptions = directories.map(({ address }) => {
            const dir = getArbDirContract(web3, address);
            return dir.events.allEvents(
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
        const stats = yield call(fetchStats, web3, directoriesList);
        yield put(statsSuccess(stats));
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

export const saga = function* () {
    return yield all([
        takeLatest(SET_DEFAULT_WEB3, fetchDirectoriesSaga),
        takeEvery(DIR_INDEX_REQUEST, fetchDirectoriesSaga),
        takeEvery(DIR_INDEX_SUCCESS, fetchStatsSaga),
        takeEvery(DIR_STATS_REQUEST, fetchStatsSaga),
    ]);
};
