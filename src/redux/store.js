import { logger } from 'redux-logger/src';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
const middleware =
  process.env.REACT_APP_ENV === 'dev' || process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
    : applyMiddleware(sagaMiddleware);
const store = createStore(persistedReducer, middleware);
persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}