import {User} from '../../api';
import {bindActionCreators} from 'redux';

export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

const getUserInfoSuccess = (json) => {
  return {
    type: USER_INFO_SUCCESS,
    payload: {
      data: json
    },
    receivedAt: Date.now()
  }
}

const getUserInfoFailed = (error) => {
  return {
    type: USER_INFO_FAILED,
    payload: {
      error: error
    },
    receivedAt: Date.now()
  }
}

const loginSuccess = (json) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      data: json
    },
    receivedAt: Date.now()
  }
}

const loginFailed = (error) => {
  return {
    type: USER_LOGIN_FAILED,
    payload: {
      error: error
    },
    receivedAt: Date.now()
  }
}

const getUserInfo = () => dispatch => User.getUserInfo()
  .then(json => dispatch(getUserInfoSuccess(json)))
  .catch(e => dispatch(getUserInfoFailed(e)));

const authLogin = ({user, pass}) => dispatch => User.checkAuth({user, pass})
  .then(json => dispatch(loginSuccess(json)))
  .catch(e => dispatch(loginFailed(e)));

const mapDispatch = dispatch => bindActionCreators({
  getUserInfo,
  authLogin
}, dispatch);

export default mapDispatch;