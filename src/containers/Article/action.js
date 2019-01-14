import {User} from '../../api/services/index';
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

const fetchUser = (state, action) => ({
  type: 'USER_FETCH_REQUESTED',
  payload: {userId: 1}
});

const mapDispatch = dispatch => bindActionCreators({
  getUsers,
  fetchUser
}, dispatch);

export default mapDispatch;
