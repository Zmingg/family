import {combineReducers} from 'redux';

const makeRootReducer = (asyncReducers = {}) => {
  return combineReducers({
    /** 动态reducer */
    ...asyncReducers,
    /** 以下添加初始reducers */
    passport: (state = {}, action) => state
  });
};

const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

const createReducer = (initialState, ACTION_HANDLES) => (
  (state = initialState, action) => {
    const handler = ACTION_HANDLES[action.type];
    return handler ? handler(state, action) : state;
  }
);

export {makeRootReducer, injectReducer, createReducer};