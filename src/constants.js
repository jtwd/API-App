// environment API url's
const LIVE_API_URL = 'https://jaywintropicana.jywng.co/admin';
const DEV_API_URL = 'http://jaywin.local/admin/';

let apiUrl;
if (process.env.NODE_ENV === 'production') {
  apiUrl = LIVE_API_URL;
} else {
  apiUrl = DEV_API_URL;
}

export const API_URL = apiUrl;

// Flash message Error Types
export const LOGIN_ERROR = 'LOGIN_ERROR';