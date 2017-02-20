// Dependencies
import shortid from 'shortid';
import findIndex from 'lodash/findIndex'

// Project imports
import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from '../../actionTypes';


/**
 * Reducer for Flash Messages - Performs actions to modify state
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      let id = action.message.id ? action.message.id : shortid.generate();
      return [
        ...state,
        {
          id: id,
          type: action.message.type,
          text: action.message.text,
        }
      ];

    case DELETE_FLASH_MESSAGE:
      // find the index of the message by ID
      const index = findIndex(state, { id: action.id });

      // delete message from array
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default:
      return state;
  }

}