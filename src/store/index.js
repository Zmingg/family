import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {makeRootReducer} from './reducers'
import {persistStore} from 'redux-persist'
import {composeWithDevTools} from 'redux-devtools-extension';

/** 初始化 State */
const preloadedState = {
  passport: {}
};

/** 导出 Store */
const configureStore = (preloadedState) => {

  const store = createStore(
    makeRootReducer(),
    preloadedState,
    composeWithDevTools(applyMiddleware(
      thunkMiddleware,
    ))
  );

  store.asyncReducers = {};

  return store;

};

const store = configureStore(preloadedState);

const persistor = persistStore(store);

export {store, persistor};
