import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist'
import {makeRootReducer} from './reducers'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'

const debug = require('debug')('api');
const sagaMiddleware = createSagaMiddleware()

/** 初始化 State */
const preloadedState = {
  passport: {},
};

/** 导出 Store */
const configureStore = (preloadedState) => {

  const store = {
    ...createStore(
      makeRootReducer(),
      preloadedState,
      composeWithDevTools(applyMiddleware(sagaMiddleware)),
    ),
    runSaga: sagaMiddleware.run,
  };

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(makeRootReducer(store.asyncReducers));
      store.runSaga(mySaga);
    });
  }

  store.runSaga(mySaga);

  debug(store.getState());

  return store;
};

const store = configureStore(preloadedState);

const persistor = persistStore(store);

export {store, persistor};
