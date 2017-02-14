// Project imports
import { ADD_FLASH_MESSAGE } from '../../actionTypes';
import { DELETE_FLASH_MESSAGE } from '../../actionTypes';


/**
 * Action creator for adding new flash message
 * @param {String} message - Message for the flash message
 * @returns {{type, message}} - Action object
 */
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  }
}

/**
 * Action creator for deleting flash message by id
 * @param id - id of the flash message to be deleted
 * @returns {{type, id}} - Action object
 */
export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id,
  }
}