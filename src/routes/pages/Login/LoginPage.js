// Dependencies
import React from 'react';

// Project imports
import { LoginForm } from '../../../components';
import './LoginPage.css';


/** Class representing the Login Page */
export default class LoginPage extends React.Component {
  /**
   * Renders the login page
   * @returns {JSX} - HTML for the login page
   */
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    );
  }
}