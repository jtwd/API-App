// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Project imports
import { logout } from '../../auth/auth-actions';


/** Represents class for the NavigationBar component */
class NavigationBar extends Component {
  /**
   * Click handler for Logout link.
   * Runs the 'logout' action when clicked
   * @param {Object} e - event "click" object
   */
  logout(e) {
    e.preventDefault(); // stop event propigation
    this.props.logout();
  }

  /**
   * Renders the NavigationBar component
   * @returns {JSX} NavigationBar
   */
  render() {
    const { isAuthenticated } = this.props.auth;

    // Links for logged in users
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/promotions">Setup</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/transactions">Rewards</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>);

    // Link for logged out users
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">JayWin</Link>
          </div>

          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

/**
 * Takes global state and returns only the bits the component needs
 * @param state
 * @returns {{auth: *}}
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

// Connect state/actions to component through props
export default connect(
  mapStateToProps, // state
  { logout } // actions
)(NavigationBar);
