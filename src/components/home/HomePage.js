// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Project imports
import Greeting from '../common/Greeting/Greeting';


/** Represents the Home component */
class HomePage extends Component {
  /**
   * Renders Home component
   * @returns {JSX} -  Home component
   */
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Greeting
        isAuthenticated={isAuthenticated}
        title="JayWin admin" />
    )
  }

}

/**
 * Takes global state and returns the bits this component needs
 * @param state
 * @returns {{auth: *}}
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

// Connect state/actions to the component
export default connect(
  mapStateToProps // state
)(HomePage);
