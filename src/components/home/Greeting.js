// Dependencies
import React from 'react';
import { Link } from 'react-router';

/**
 * Display a salutation based on authentication status
 * @param {Boolean} isAuthenticated
 * @param {Sring} title
 * @returns {JSX} - Greeting component
 * @constructor
 */
const Greeting = ({ isAuthenticated, title}) => {

  const login = (
    <div>
      <h1>{title}</h1>
      <p>You need to be logged in to use this app.</p>
      <Link to="login" className="btn btn-primary btn-lg">Login</Link>
    </div>
  );

  const loggedIn = (
    <div>
      <h1>Welcome back!</h1>
      <p>You are logged in. Now you can use the app</p>
      <Link to="transactions" className="btn btn-primary btn-lg">Use this thing!</Link>
    </div>
  );

  return (
    <div className="jumbotron">
      { isAuthenticated ? loggedIn : login }
    </div>
  );
};

export default Greeting;