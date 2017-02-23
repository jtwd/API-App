// ********************
// Action Constants
// ********************

// Auth
export const REQ_LOGIN = 'REQ_LOGIN';
export const REQ_LOGIN_SUCCESS = 'REQ_LOGIN_SUCCESS';
export const REQ_LOGIN_FAILURE = 'REQ_LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

/* Flash */
export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE';

/* Promotions */
export const REQ_PROMOS = 'REQ_PROMOTIONS';
export const REQ_PROMOS_SUCCESS = 'REQ_PROMOTIONS_SUCCESS';
export const REQ_PROMOS_FAILURE = 'REQ_PROMOTIONS_FAILURE';

/* Transactions */
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_FLOW_DETAILS = 'SET_FLOW_DETAILS';


// Auth
export {
  setCurrentUser,
  login,
  logout,
} from './components/auth/auth-actions';

// Flash
export {
  addFlashMessage,
  deleteFlashMessage,
} from './components/flash/flash-actions';

// Promotions
export {
  fetchPromotions
} from './components/promotions/promotions-actions';
