import {User} from '../../api';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

function getUsersSuccess(json) {
  return {
    type: GET_USERS_SUCCESS,
    payload: {
      data: json
    },
    receivedAt: Date.now()
  }
}

function getUsersFailed(error) {
  return {
    type: GET_USERS_FAILED,
    payload: {
      error: error
    },
    receivedAt: Date.now()
  }
}

const fetchPosts = () => dispatch => User.getUsers()
  .then(json => dispatch(getUsersSuccess(json)))
  .catch(e => dispatch(getUsersFailed(json)));

export {fetchPosts};