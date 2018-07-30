import {User} from '../../api';
import {bindActionCreators} from 'redux';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

const getUsersSuccess = (json) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: json
  }
}

const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED,
    payload: error
  }
}

const getUsers = () => dispatch => User.getUsers()
  .then(json => dispatch(getUsersSuccess(json)))
  .catch(e => dispatch(getUsersFailed(e)));

const mapDispatch = dispatch => bindActionCreators({
  getUsers
}, dispatch);

export default mapDispatch;
