import { appName } from '../utils/constants';
import { getDirIndexContract, getArbDirContract } from './utils/ethereum';
import { createSelector } from 'reselect';
import { all, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { selectWeb3, SET_DEFAULT_WEB3 } from './signIn';

/**
 * Constants
 */
export const moduleName = 'directoriesIndex';
const prefix = `${appName}/${moduleName}`;
const DIR_INDEX_REQUEST = `${prefix}/DIR_INDEX_REQUEST`;
const DIR_INDEX_SUCCESS = `${prefix}/DIR_INDEX_SUCCESS`;
const DIR_INDEX_FAILURE = `${prefix}/DIR_INDEX_FAILURE`;

const initialState = {
    isFetching: false,
    isFetched: false,
    error: null,
    directories: [],
    directoriesDetails: []
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
    const { type, payload, error} = action;

    switch (type) {
        case DIR_INDEX_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isFetched: false,
                error: null
            });
        case DIR_INDEX_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                error: null,
                directories: payload.directories,
                directoriesDetails: payload.directoriesDetails
            });
        case DIR_INDEX_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: false,
                error: error
            });
        default:
            return state;
    }
}

/**
 * Actions
 */
export function fetchDirectories() {
    return {
        type: DIR_INDEX_REQUEST
    }
}

export function fetchDirectoriesSuccess(payload) {
    return {
        type: DIR_INDEX_SUCCESS,
        payload
    }
}

export function fetchDirectoriesFailure(error) {
    return {
        type: DIR_INDEX_FAILURE,
        error
    }
}

/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const isDirectoriesFetching = createSelector(
    stateSelector,
    ({ isFetching }) => isFetching
);

export const isDirectoriesFetched = createSelector(
    stateSelector,
    ({ isFetched }) => isFetched
);

export const directoriesError = createSelector(
    stateSelector,
    ({ error }) => error
);

export const directoriesIds = createSelector(
    stateSelector,
    ({ directories }) => directories
);

export const directoriesList = createSelector(
    stateSelector,
    ({ directoriesDetails }) => directoriesDetails
);

/**
 * Get directories details
 */

const fetchDirectoriesDetails = async (web3, ids = []) => Promise.all(
    ids.map(
        async (id) => {
            const dir = getArbDirContract(web3, id);
            const segment = await dir.methods.getSegment().call();
            const entities = await dir.methods.getOrganizationsCount(0, 0).call();
            const numberOfChallenges = await dir.methods.getNumberOfChallenges(id).call();

            return {
                address: id,
                segment,
                entities,
                numberOfChallenges
            };
        }
    )
);

/**
 * Sagas
 */

function* startFetchDirectoriesSaga() {
    try {
        const web3 = yield select(selectWeb3);
        const index = getDirIndexContract(web3);
        const directories = yield index.methods.getSegments().call();
        const directoriesDetails = yield call(fetchDirectoriesDetails, web3, directories);
        yield put(fetchDirectoriesSuccess({
            directories,
            directoriesDetails
        }));
    } catch (error) {
        yield put(fetchDirectoriesFailure(error));
    }
}

export const saga = function* () {
    return yield all([
        takeLatest(SET_DEFAULT_WEB3, startFetchDirectoriesSaga), // Fetch directories on start
        takeEvery(DIR_INDEX_REQUEST, startFetchDirectoriesSaga)
    ]);
};
