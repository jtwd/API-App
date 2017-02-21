// Dependencies
import axios from 'axios';

// Project imports
import {
  SET_TRANSACTIONS,
  SET_FLOW_DETAILS,
} from '../../actions';
import { API_URL } from '../../constants';


const maxRecords = 10000; // maximum number of records to be returned

/**
 * Action creator to set list of transactions onto state
 * @param {Array} transactions - List of transactions
 * @returns {{type, transactions: *}}
 */
export function setTransactions(transactions) {
  return {
    type: SET_TRANSACTIONS,
    transactions,
  }
}

/**
 * Action creator to set flow details onto state
 * @param flowDetails
 * @returns {{type, flowDetails: *}}
 */
export function setFlowDetails(flowDetails) {
  return {
    type: SET_FLOW_DETAILS,
    flowDetails,
  }
}

/**
 * Async request to the API for transactions data
 * When returned, a action is dispatched to set data to state (setTransactions)
 * @param {String} modState - Moderated state for transactions
 * @returns {function(*)} - Promise returning transaction data
 */
export function fetchTransactions(modState = 'Pending') {
  return dispatch => {
    return axios.get(`${API_URL}paypal-transaction/evidence-moderation?moderationState=${modState}&state=Executed&pageSize=${maxRecords}&orderBy=CreatedDate&orderByDescending=true`).then(res => {
      dispatch(setTransactions(res.data.Items));
    })
  }
}

/**
 * Async request for Flow Details
 * When returned, an action is dispatched to set the data to state
 * @param {String} id - Flow ID
 * @returns {function(*)}
 */
export function fetchFlowDetails(id) {
  return dispatch => {
    return axios.get(`${API_URL}flow/${id}`).then(res => {
      dispatch(setFlowDetails(res.data.Item));
    })
  }
}
