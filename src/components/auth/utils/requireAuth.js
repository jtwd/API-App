// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Project imports
import { addFlashMessage, deleteFlashMessage } from '../../flash/flash-actions';
import { LOGIN_ERROR } from '../../../constants';


/**
 * High order component that checks if the user is logged in.
 * If not, user is redirected.
 * If the user is, render the supplied component
 * @param {JSX} ComposedComponent - Props passed to the LoginForm component
 */
export default function(ComposedComponent) {
  /** Class representing a higher order authentication check */
  class Authenticate extends React.Component {
    /**
     * Before the component is mounted, check authentication.
     * If false, add flash message error and redirect
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.deleteFlashMessage(LOGIN_ERROR);
        this.props.addFlashMessage({
          id: LOGIN_ERROR,
          type: 'error',
          text: 'You need to Login to access this page',
          selfClosing: true,
        });
        this.context.router.push('/login');
      }
    }

    /**
     * When props change, check authentication and redirect if false
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    /**
     * Renders ComposedComponent that was passed originally
     * @returns {JSX}
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  // Define components props
  /*Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
  };*/

  // Define props taken from context
  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired, // get router from context for redirecting
  };

  /**
   * Get isAuthenticated from state
   * @param {Object} state - Global state
   * @returns {{isAuthenticated: (*|boolean)}}
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  // maps state and actions to props
  return connect(
    mapStateToProps, // state
    { addFlashMessage, deleteFlashMessage } // actions
  )(Authenticate);
}
