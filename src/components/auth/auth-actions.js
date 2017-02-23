// Dependencies
import axios from 'axios';

// Project imports
import { API_URL } from '../../constants';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {
  REQ_LOGIN,
  REQ_LOGIN_SUCCESS,
  REQ_LOGIN_FAILURE,
  LOGOUT,
} from '../../actions';


const ROOT_URL = `${API_URL}system/token`;

/**
 * Action creator to send a login request
 * @returns {{type, user: *}} - Action
 */
export function _reqLogin() {
  return {
    type: REQ_LOGIN,
  }
}

/**
 * Action creator to signal a successful login request
 * @param user {Object} - details of the logged in user and jwtToken
 * @returns {{type, user: *}} - Action
 */
export function _reqLoginSuccess(data) {
  const token = data.Item.Token;

  localStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);

  return {
    type: REQ_LOGIN_SUCCESS,
    payload: data,
  }
}

/**
 * Action creator to signal a failed login request
 * @param error {Object} - details of the error that caused the failed request
 * @returns {{type, user: *}} - Action
 */
export function _reqLoginFailure(error) {
  return {
    type: REQ_LOGIN_FAILURE,
    payload: error,
  }
}

export function login(data) {
  const newData = {
    Username: data.email,
    Password: data.password,
  };
  return dispatch => {
    dispatch(_reqLogin());
    return axios.post(ROOT_URL, newData)
      .then(res => {
        dispatch(_reqLoginSuccess(res.data));
      })
      .catch(error => {
        dispatch(_reqLoginFailure(error));
      })
  };
}

/**
 * Login action - posts login data to the API with a promise
 * Promise returns with a token (if login is successful).
 * Token is then saved to localStorage for persistence,
 * then set in the header of future axios requests (setAuthorizationToken)
 * 'setCurrentUser' action is then dispatch to update global state
 * @param data
 * @returns {function(*)}
 */
/*
export function login(data) {
  const newData = {
    Username: data.email,
    Password: data.password,
  };
  return dispatch => {
    return axios.post(`${API_URL}system/token`, newData).then(res => {
      console.log(res);
      const token = res.data.Item.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(token));
    });
  }
}
*/

/**
 * Logs a user out of the system by:
 * - clearing token from localStorage
 * - removing Authorization header from axios requests
 * @returns {function(*)}
 */
export function logout() {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);

  return {
    type: LOGOUT,
  }
}