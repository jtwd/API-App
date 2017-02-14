// Dependencies
import isEmpty from 'lodash/isEmpty';

// Project imports
import { SET_CURRENT_USER } from '../../actionTypes';


// Define initial state (for auth)
const initialState = {
  isAuthenticated: false,
  user: {},
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
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    default:
      return state
  }
}