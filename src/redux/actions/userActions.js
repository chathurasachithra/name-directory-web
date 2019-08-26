import { handleRequest } from '../services/APIService';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const getUserProfile = (id) => dispatch => {
  handleRequest('get', `user/profile/${id}`, true).then( (results) => {
    return dispatch ({
      type: FETCH_USER_PROFILE,
      payload: results.data
    });
  })
};

export const login = (data) => dispatch => {
  handleRequest('post', `login`, null, data).then( (results) => {
    return dispatch ({
      type: LOGIN,
      payload: results.data
    });
  }).catch((error) => {
    return dispatch ({
      type: LOGIN_ERROR,
      payload: JSON.parse(error.response)
    });
  });
};

export const logout = () => dispatch => {
  return dispatch({
    type: LOGOUT,
    payload: null
  });
};