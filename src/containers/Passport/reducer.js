import {
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  SET_PASSPORT
} from './action';

const initialState = {
  userInfo: {}
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload['data']
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload['data']
      };
    }
    case USER_INFO_FAILED,
      USER_LOGIN_FAILED: {
      return {
        ...state,
        error: action.payload['error']
      };
    }
    case SET_PASSPORT: {
      return {
        ...state,
        userInfo: action.payload,
        auth: true
      };
    }
    default: return state;
  }
}

export default reducer;