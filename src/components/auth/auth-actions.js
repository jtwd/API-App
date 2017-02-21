// Dependencies
import axios from 'axios';

// Project imports
import { API_URL } from '../../constants';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../../actions';


/**
 * Action creator to set a user as being logged in
 * @param user {String} - token from loggin (this could be changed to user info)
 * @returns {{type, user: *}} - Action
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
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
export function login(data) {
  const newData = {
    Username: data.email,
    Password: data.password,
  };
  return dispatch => {
    return axios.post(`${API_URL}system/token`, newData).then(res => {
      const token = res.data.Item.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(token));
    })
  }
}

/**
 * Logs a user out of the system by:
 * - clearing token from localStorage
 * - removing Authorization header from axios requests
 * - dispatching 'setCurrentUser' with empty object to update global state
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}