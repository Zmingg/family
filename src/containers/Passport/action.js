import {User} from '../../api';
import {bindActionCreators} from 'redux';

export const
  USER_INFO_SUCCESS = 'USER_INFO_SUCCESS',
  USER_INFO_FAILED = 'USER_INFO_FAILED',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',
  SET_PASSPORT = 'SET_PASSPORT';

export default {

  auth (state, payload) {
    return {
      ...state,
      auth: true,
      token: payload
    };
  }

}

