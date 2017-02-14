// Project imports
import {
  SET_TRANSACTIONS,
  SET_FLOW_DETAILS,
} from '../../actionTypes';


// Define initial state
const initialState = {
  list: false,
  details: false
};

/**
 * Reducer for transactions, performs tasks on the state with actions
 * @param {Object} state - global state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_TRANSACTIONS:
      return Object.assign({}, state, {
        list: action.transactions
      });

    case SET_FLOW_DETAILS:
      return Object.assign({}, state, {
        details: action.flowDetails
      });

    default:
      return state
  }
}