import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {makeRootReducer} from './reducers'

/** 初始化 State */
const preloadedState = {
  passport: {}
};

/** 导出 Store */
const configureStore = (preloadedState) => {
  const store = createStore(
    makeRootReducer(preloadedState),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
    )
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;

};

export default configureStore(preloadedState);
