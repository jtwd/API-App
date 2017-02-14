// Dependencies
import { combineReducers } from 'redux';

// Project imports
import authReducer from './components/auth/auth-reducer';
import flashReducer from './components/flash/flash-reducer';
import transactionsReducer from './components/transactions/transactions-reducer';

/** Combined reducers to define global state object */
export default combineReducers({
  auth: authReducer,
  flash: flashReducer,
  transactions: transactionsReducer,
});