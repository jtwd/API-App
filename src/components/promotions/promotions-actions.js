// Dependencies
import axios from 'axios';

// Project imports
import { API_URL } from '../../constants';
import {
  REQ_PROMOS,
  REQ_PROMOS_SUCCESS,
  REQ_PROMOS_FAILURE,
} from '../../actions';


const ROOT_URL = `${API_URL}promotion`;

function _reqPromos() {
  console.log('_reqPromos');
  return {
    type: REQ_PROMOS,
  };
}

function _reqPromosSuccess(data) {
  console.log('_reqPromosSuccess');
  return {
    type: REQ_PROMOS_SUCCESS,
    payload: data,
  };
}

function _reqPromosFailure(errorMsg) {
  console.log('_reqPromosFailure', errorMsg);
  return {
    type: REQ_PROMOS_FAILURE,
    payload: errorMsg,
  };
}

export function fetchPromotions() {
  return dispatch => {
    dispatch(_reqPromos());
    return axios.get(ROOT_URL)
      .then(res => {
        if (res.status === 200) {
          dispatch(_reqPromosSuccess(res.data));
        }
      })
      .catch(error => {
        dispatch(_reqPromosFailure(error.message));
      });
  };
}

/*
export function login(data) {
  const newData = {
    Username: data.email,
    Password: data.password,
  };
  return dispatch => {
    return axios.post(`${API_URL}system/token`, newData).then(res => {
      const token = res.data.Item.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(token));
    })
  }
}
  */