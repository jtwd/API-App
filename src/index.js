// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

// Project imports
import routes from './routes/routes';
import rootReducer from './rootReducer';
import setAuthorizationToken from './components/auth/utils/setAuthorizationToken';
import { setCurrentUser } from './actions';
import './index.css';


// Root element in DOM
const rootEle = document.getElementById('app');

/* API URL - which we pull off 'data-api-url' of base elements in the HTML */
// export const API_URL = rootEle.getAttribute('data-api-url');

if (!rootEle) console.error('Root DOM element is missing. Looking for ID of "app"');
// if(!API_URL) console.error('API URL is missing from the root DOM element. Looking for "data-api-url"');

// Configure store
export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), // thunk middleware
    window.devToolsExtension ? window.devToolsExtension() : f => f // enable Redux Dev Tools
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(localStorage.jwtToken));
}

// render app
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  rootEle
);