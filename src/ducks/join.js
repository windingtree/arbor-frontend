import { all, call, put, takeLatest } from 'redux-saga/effects';

import { createSelector } from "reselect";
import history from '../redux/history';
import { callApi } from '../redux/api';

export const moduleName ='join';

const GET_JOIN_REQUST = 'GET_JOIN_REQUST';
const GET_JOIN_SUCCESS = 'GET_JOIN_SUCCESS';
const GET_JOIN_FAILURE = 'GET_JOIN_FAILURE';
const RESET_JOIN = 'RESET_JOIN';
const POST_JOIN_REQUST = 'POST_JOIN_REQUST';
const POST_JOIN_SUCCESS = 'POST_JOIN_SUCCESS';
const POST_JOIN_FAILURE = 'POST_JOIN_FAILURE';

const initialState = {
  isFetching: false,
  joinOrganizations: {},
  error: null
};

export default function reducer( state = initialState, action) {
  const { type, payload, error } = action;

  switch(type) {
    case GET_JOIN_REQUST: 
      return {
        ...state,
        isFetching: true
      };
    case GET_JOIN_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        joinOrganizations: {...state.joinOrganizations, ...payload}
      };
    case GET_JOIN_FAILURE: 
      return {
        ...state,
        isFetching: false,
        error: error
      };
    case POST_JOIN_REQUST: 
      return {
        ...state,
        isFetching: true
      };
    case POST_JOIN_SUCCESS: 
      return {
        ...state,
        isFetching: false
      };
    case POST_JOIN_FAILURE: 
      return {
        ...state,
        isFetching: false,
        error: error
      };
    case RESET_JOIN:
      return initialState;
    default:
      return state;
  }
}

// Join Actions
export const getJoinRequest = payload => ({
  type: GET_JOIN_REQUST,
  payload
});
export const getJoinSuccess = payload => ({
  type: GET_JOIN_SUCCESS,
  payload
});
export const getJoinFailure = error => ({
  type: GET_JOIN_FAILURE,
  error
});
export const postJoinRequest = payload => ({
  type: POST_JOIN_REQUST,
  payload
});
export const postJoinSuccess = () => ({
  type: POST_JOIN_SUCCESS
});
export const postJoinFailure = error => ({
  type: POST_JOIN_FAILURE,
  error
});
export const resetJoin = () => ({
  type: RESET_JOIN
});

// Join Selectors
const stateSelector = state => state.join;

export const isJoinFetching = createSelector(
  stateSelector,
  join => join.isFetching
);

export const getJoinOrganizations = createSelector(
  stateSelector,
  join => join.joinOrganizations
);

// Join Sagas
function* getJoinRequestSaga({payload}) {
  try {
    const response = yield call(ApiGetJoinOrganizations, payload);
    yield put(getJoinSuccess({[payload]: response}));
  } catch(error) {
    yield put(getJoinFailure(error))
  }
};

function* postJoinRequestSaga({payload}) {
  try {
    const response = yield call(ApiPostJoinOrganizations, payload);
    yield put(postJoinSuccess(response));
    yield call(history.push, { pathname: `/email-sent` }, { profileId: response.profileId });
  } catch(error) {
    yield put(postJoinFailure(error))
  }
};

// Main saga listening to explicit requests and join calls
export const saga = function* () {
  return yield all([
    takeLatest(POST_JOIN_REQUST, postJoinRequestSaga),
    takeLatest(GET_JOIN_REQUST, getJoinRequestSaga)
  ])
};

// Join Api
const ApiGetJoinOrganizations = data => {
  return callApi(`drafts/${data}`, 'GET');
};
const ApiPostJoinOrganizations = data => {
  return callApi('drafts', 'POST', { body: JSON.stringify(data),  headers: { 'Content-Type': 'application/json' }});
};

