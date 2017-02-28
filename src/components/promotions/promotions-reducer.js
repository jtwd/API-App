// Dependencies
import _ from 'lodash';

// Project imports
import {
  REQ_PROMOS,
  REQ_PROMOS_SUCCESS,
  REQ_PROMOS_FAILURE,
} from '../../actions';


// Define initial state (for auth)
const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  items: [],
  meta: {},
};

/**
 * Promotions reducer, takes an action and state and
 * performs transformations on the state based on the action type
 * @param state
 * @param action
 * @returns {Object} - updated state
 */
export default (state = initialState, action = {}) => {
  switch(action.type) {
    case REQ_PROMOS:
      return {
        isLoading: true,
        isLoaded: false,
      };
    case REQ_PROMOS_SUCCESS:
      const newPromoItems = _.mapKeys(action.payload.Items, 'Id');
      return {
        isLoading: false,
        isLoaded: true,
        items: newPromoItems,
        meta: action.payload.Meta,
      };
    case REQ_PROMOS_FAILURE:
      return {
        isLoading: false,
        isLoaded: false,
        error: action.payload,
      };

    default:
      return state
  }
}
