// Dependencies
import axios from 'axios';

// Project imports
import { API_URL } from '../../constants';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {
  REQ_LOGIN,
  REQ_LOGIN_SUCCESS,
  REQ_LOGIN_FAILURE,
  SET_CURRENT_USER,
  LOGOUT,
} from '../../actions';


const ROOT_URL = `${API_URL}system/token`;

/**
 * Action creator to send a login request
 * @returns {{type, user: *}} - Action
 */
function _reqLogin() {
  return {
    type: REQ_LOGIN,
  }
}

/**
 * Action creator to signal a successful login request
 * @param data {Object} - details of the logged in user and jwtToken
 * @returns {{type, user: *}} - Action
 */
function _reqLoginSuccess(data) {
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
function _reqLoginFailure(error) {
  return {
    type: REQ_LOGIN_FAILURE,
    payload: error,
  }
}

/**
 * Login action - posts login data to the API with a promise
 * It dispatches REQ_LOGIN to indicate the start of the request
 * Promise returns with a token (if login is successful).
 * - Dispatches REQ_LOGIN_SUCCESS with payload of token
 * Promise returns with an error (if login was not successful)
 * - Dispatches REQ_LOGIN_FAILURE with payload of error
 * @param data
 * @returns {function(*)}
 */
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

export function setCurrentUser(token) {
  return {
    type: SET_CURRENT_USER,
    token,
  }
}