import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED
} from './action';

const initialState = {
  users: [],
  article: []
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload['data']
      };
    }
    case GET_USERS_FAILED: {
      return {
        ...state,
        error: action.payload['error']
      };
    }
    default: return state;
  }
}

export default reducer;