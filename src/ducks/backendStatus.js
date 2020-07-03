import { appName } from '../utils/constants';
import { createSelector } from 'reselect';
import { all, takeEvery, takeLatest, call, put, delay, select } from 'redux-saga/effects';
import { callApi } from '../redux/api';

/**
 * Constants
 */
export const moduleName = 'backendStatus';
const prefix = `${appName}/${moduleName}`;
const BACKEND_STATUS_REQUEST = `${prefix}/BACKEND_STATUS_REQUEST`;
const BACKEND_STATUS_SUCCESS = `${prefix}/BACKEND_STATUS_SUCCESS`;
const BACKEND_STATUS_FAILURE = `${prefix}/BACKEND_STATUS_FAILURE`;

const initialState = {
    isPolling: false,
    isFetching: false,
    isFetched: false,
    connected: true,
    reconnection: false,
    error: null
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
    const { type, payload, error} = action;

    switch (type) {
        case BACKEND_STATUS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isFetched: false,
                error: null
            });
        case BACKEND_STATUS_SUCCESS:
            return Object.assign({}, state, {
                isPolling: true,
                isFetching: false,
                isFetched: true,
                connected: payload.connected || false,
                reconnection: payload.reconnection || false,
                error: null
            });
        
        case BACKEND_STATUS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: false,
                connected: false,
                reconnection: false,
                error: error
            });

        default:
            return state;
    }
}

/**
 * Actions
 */
export function startBackendStatusPolling() {
    return {
        type: BACKEND_STATUS_REQUEST
    }
}

export function fetchBackendStatusSuccess(payload) {
    return {
        type: BACKEND_STATUS_SUCCESS,
        payload
    }
}

export function fetchBackendStatusFailure(error) {
    return {
        type: BACKEND_STATUS_FAILURE,
        error
    }
}

/**
 * Selectors
 */
const stateSelector = state => state[moduleName];

export const getBackendStatusIsPolling = createSelector(
    stateSelector,
    ({ isPolling }) => isPolling
);

export const getBackendConnectionStatus = createSelector(
    stateSelector,
    ({ connected }) => connected
);

export const getBackendIsReconnection = createSelector(
    stateSelector,
    ({ reconnection }) => reconnection
);

/**
 * API
 * */
function ApiFetchBackendConnectionStatus() {
    return callApi('stats/connection');
}

/**
 * Sagas
 */

function* init () {
    try {
        yield put(startBackendStatusPolling());
    } catch (error) {
        yield put(fetchBackendStatusFailure(error));
    }
}

function* fetchBackendConnectionStatusSaga () {
    try {
        const result = yield call(ApiFetchBackendConnectionStatus);
        yield put(fetchBackendStatusSuccess(result));
    } catch (error) {
        yield put(fetchBackendStatusFailure(error));
    }
}

function* startBackendConnectionStatusPollingSaga () {
    const isPolling = yield select(getBackendStatusIsPolling);
    
    if (isPolling) {
        return; // Only one poller is allowed
    }
    
    while (true) {
        try {
            yield fetchBackendConnectionStatusSaga();
            yield delay(3000);
        } catch (error) {
            yield put(fetchBackendStatusFailure(error));
        }
    }
}

export const saga = function*() {
    return yield all([
        takeLatest('persist/REHYDRATE', init), // Start polling on App start
        takeEvery(BACKEND_STATUS_REQUEST, startBackendConnectionStatusPollingSaga)
    ]);
};
