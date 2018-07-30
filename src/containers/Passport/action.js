import {User} from '../../api';
import {bindActionCreators} from 'redux';

export const
  USER_INFO_SUCCESS = 'USER_INFO_SUCCESS',
  USER_INFO_FAILED = 'USER_INFO_FAILED',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',
  SET_PASSPORT = 'SET_PASSPORT';

const getUserInfoSuccess = (json) => {
  return {
    type: USER_INFO_SUCCESS,
    payload: json
  }
}

const getUserInfoFailed = (error) => {
  return {
    type: USER_INFO_FAILED,
    payload: error
  }
}

const loginSuccess = (json) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: json,
  }
}

const loginFailed = (error) => {
  return {
    type: USER_LOGIN_FAILED,
    payload: error
  }
}

const setPassport = (user) => {
  return {
    type: SET_PASSPORT,
    payload: user,
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
  authLogin,
  setPassport: (user) => dispatch => dispatch(setPassport(user))
}, dispatch);

export default mapDispatch;
