// Dependencies
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import { Panel } from 'react-bootstrap';

// Project imports
import {
  login,
  addFlashMessage,
  deleteFlashMessage,
} from '../../../actions';

import { TextFieldGroup, LoadingButton, LoadingAni } from '../../index';
import { LOGIN_ERROR } from '../../../constants';


/**
 * Validates login form input
 * @param {Object} data - The login data thew user has entered
 * @returns {{ errors: (Object), isValid: (Boolean) }}
 * @returns {Object} - With an object of field 'errors' & a boolen 'isValid' for the form
 */
function validateInput(data) {
  let errors = {};

  if(data.email.trim() === '') {
    errors.email = "This field is required";
  } else {
    if (!validator.isEmail(data.email)) {
      errors.email = "Please enter a valid email";
    }
  }

  if(data.password.trim() === '') {
    errors.password = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

/** Class representing the Login Form */
class LoginForm extends Component {
  static propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  /**
   * Creates login form - sets initial state and bind 'this' for common functions
   * @param {Object} props - Props passed to the LoginForm component
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  /**
   * Sets error state if the form is not valid
   * @returns {Boolean} isValid - from the validateInput function
   */
  _isValid() {
    const { errors, isValid } = validateInput(this.state); // check for errors

    if(!isValid) { // if the form is not valid
      this.setState({ errors }); // update state with errors object
    }

    return isValid;
  }

  /**
   * Submit handler for login form. Runs the 'login' action is the form is valid.
   * If successful redirects the user else shows a error flash message.
   * @param {Object} e - Event object of the submit
   */
  _onSubmit(e) {
    e.preventDefault(); // stop the default submit

    if(this._isValid()) { // if the form is valid
      this.setState({ errors: {}, isLoading: true}); // update loading state
      this.props.deleteFlashMessage(LOGIN_ERROR);
      this.props.login(this.state).then(
        (res) => {
          if (this.props.submitError) {
            this.props.addFlashMessage({
              id: LOGIN_ERROR,
              type: 'error',
              text: this.props.submitError,
            });
          } else {
            this.context.router.push('/');
          }
        },
        (err) => {
          console.log('err', this);
        }
      );
    }
  }

  /**
   * Change handler for TextFieldGroups (input)
   * sets state on itself with the new input value
   * @param {Object} e - Event object of the change event
   */
  _onChange(e) {
    const ele = e.target;
    this.setState({ [ele.name]: ele.value});
  }

  /**
   * Renders the login form
   * @returns {JSX} - HTML for the login form
   */
  render() {
    const {
      email,
      password,
      errors } = this.state; // get items off of state

    const { isLoading } = this.props;

    const panelTitle = (<h1>Login</h1>);
    const panelFooter = (
      <div className="text-right">
        <LoadingButton isLoading={isLoading} type="submit">Login</LoadingButton>
      </div>
    );

    // empty error messages
    let emailError = "";
    let passwordError = "";

    if(typeof errors !== "undefined") { // if there are errors
      if (typeof errors.email !== "undefined") { // if there is an error on identifier
        emailError = errors.email; // assign error message
      }
      if (typeof errors.password !== "undefined") { // if there is an error on password
        passwordError = errors.password; // assign error message
      }
    }

    return (
      <form className="LoginForm" onSubmit={this._onSubmit}>
        <Panel
          header={panelTitle}
          footer={panelFooter}>

          <TextFieldGroup
            field="email"
            value={email}
            type={email}
            label="Email address"
            error={emailError}
            isLoading={isLoading}
            onChange={this._onChange} />

          <TextFieldGroup
            field="password"
            value={password}
            label="Password"
            type="password"
            error={passwordError}
            isLoading={isLoading}
            onChange={this._onChange} />

        </Panel>
        { isLoading ? <LoadingAni cover={true} /> : ''}
      </form>
    );
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    submitError: state.auth.error,
  }
}

// use connect to pass state/action to component as props
export default connect(
  mapStateToProps, // state
  {
    login,
    addFlashMessage,
    deleteFlashMessage
  } // actions
)(LoginForm);