import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ApiClient from '../api'

const persistConfig = {
  key: 'root',
  whitelist: ['passport', 'runSaga'],
  storage,
};

const makeRootReducer = (asyncReducers = {}) => {
  return persistReducer(persistConfig, combineReducers({
    /** 以下添加初始reducers */
    runSaga: (state = {}, action) => state,
    passport: (state = {}, action) => state,
    services: (state = {}, action) => new ApiClient(),
    /** 动态reducer */
    ...asyncReducers,
  }));
};

const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export {makeRootReducer, injectReducer};