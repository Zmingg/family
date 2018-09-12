import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {makeRootReducer} from './reducers'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../api/saga'

const sagaMiddleware = createSagaMiddleware();

const debug = require('debug')('api');

/** 初始化 State */
const preloadedState = {
  passport: {}
};

/** 导出 Store */
const configureStore = (preloadedState) => {

  const store = createStore(
    makeRootReducer(),
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  sagaMiddleware.run(mySaga);

  debug(store.getState());

  return store;

};

export default configureStore(preloadedState);
