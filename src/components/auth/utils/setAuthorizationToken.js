// Dependencies
import axios from 'axios';

/**
 * sets/removes the authorization header with the Bearer token
 * @param token
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}