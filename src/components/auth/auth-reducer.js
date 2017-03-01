// Dependencies


// Project imports
import {
  REQ_LOGIN,
  REQ_LOGIN_SUCCESS,
  REQ_LOGIN_FAILURE,
  LOGOUT,
  SET_CURRENT_USER,
} from '../../actions';


// Define initial state (for auth)
const initialState = {
  isAuthenticated: false,
  user: {},
  token: '',
  isLoading: false,
  error: null,
};

/**
 * Auth reducer, takes an action and state and
 * performs transformations on the state based on the action type
 * @param state
 * @param action
 * @returns {Object} - updated state
 */
export default (state = initialState, action = {}) => {
  switch(action.type) {
    case REQ_LOGIN:
      return {
        ...state,
        isLoading: true,
      };

    case REQ_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.Item.Token,
        isAuthenticated: true,
        error: null
      };

    case REQ_LOGIN_FAILURE:

      return {
        ...state,
        isLoading: false,
        token: '',
        error: action.payload.message,
      };

    case LOGOUT:
      return {
        ...state,
        token: '',
        isAuthenticated: false,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
      };

    default:
      return state;
  }
}