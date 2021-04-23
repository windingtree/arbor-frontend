import { applyMiddleware, createStore, compose } from 'redux';
// import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  whitelist: [],// 'wizard'
  key: 'root',
  storage,
};

const reducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);
const store = createStore(reducer, enhancer);
export let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}
