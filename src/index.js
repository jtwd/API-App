// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

// Project imports
import { setCurrentUser } from './components/auth/auth-actions';
import routes from './routes';
import rootReducer from './rootReducer';
import setAuthorizationToken from './components/auth/utils/setAuthorizationToken';


// Root element in DOM
const rootEle = document.getElementById('app');

/** API URL - which we pull off 'data-api-url' of base elements in the HTML */
export const API_URL = rootEle.getAttribute('data-api-url');

if (!rootEle) console.error('Root DOM element is missing. Looking for ID of "app"');
if(!API_URL) console.error('API URL is missing from the root DOM element. Looking for "data-api-url"');

// Configure store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), // thunk middleware
    window.devToolsExtension ? window.devToolsExtension() : f => f // enable Redux Dev Tools
  )
);

/** check for an existing jwt token (is logged in) */
if (localStorage.jwtToken) { // there is a jwtToken in locaStorage
  setAuthorizationToken(localStorage.jwtToken); // set Authorization headers on axios async calls
  store.dispatch(setCurrentUser(localStorage.jwtToken)); // Dispatch action to update global state
}

// render app
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  rootEle
);