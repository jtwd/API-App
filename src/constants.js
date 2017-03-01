// environment API url's
const LIVE_API_URL = 'https://jaywintropicana.jywng.co/admin/';
const DEV_API_URL =  'https://jaywintropicana.jywng.co/admin/'; //'https://jaywin.local/admin/';

let apiUrl;
if (process.env.NODE_ENV === 'production') {
  apiUrl = LIVE_API_URL;
} else {
  apiUrl = DEV_API_URL;
}

export const API_URL = apiUrl;

export const FLASH_MESSAGE_TIMEOUT = 4000;

// Flash message Error Types
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const DATA_LOAD_ERROR = 'DATA_LOAD_ERROR';

export const MODALS = {
  NONE: 'NONE',
  DELETE_PROMO: 'DELETE_PROMO',
};

export const KEYS = {
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  UP: 38,
};