// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

// Project imports
import { login } from '../auth-actions';
import { addFlashMessage } from '../../flash/flash-actions';
import TextFieldGroup from '../../common/TextFieldGroup';


/**
 * Validates login form input
 * @param {Object} data - The login data thew user has entered
 * @returns {{ errors: (Object), isValid: (Boolean) }}
 * @returns {Object} - With an object of field 'errors' & a boolen 'isValid' for the form
 */
function validateInput(data) {
  let errors = {};

  if(data.identifier.trim() === '') {
    errors.identifier = "This field is required";
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
class LoginForm extends React.Component {
  /**
   * Creates login form - sets initial state and bind 'this' for common functions
   * @param {Object} props - Props passed to the LoginForm component
   */
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Sets error state if the form is not valid
   * @returns {Boolean} isValid - from the validateInput function
   */
  isValid() {
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
  onSubmit(e) {
    e.preventDefault(); // stop the default submit

    if(this.isValid()) { // if the form is valid
      this.setState({ errors: {}, isLoading: true}); // update loading state
      this.props.login(this.state).then(
        (res) => { // successful login
          this.context.router.push('/transactions'); // redirect user
        },
        (err) => { // login error
          this.setState({ isLoading: false }); // update loading state
          this.props.addFlashMessage({ // add flash error message
            type: 'error',
            text: 'Invalid Login credentials',
          });
        }
      );
    }
  }

  /**
   * Change handler for TextFieldGroups (input)
   * sets state on itself with the new input value
   * @param {Object} e - Event object of the change event
   */
  onChange(e) {
    const ele = e.target;
    this.setState({ [ele.name]: ele.value});
  }

  /**
   * Renders the login form
   * @returns {JSX} - HTML for the login form
   */
  render() {
    const {
      identifier,
      password,
      errors,
      isLoading } = this.state; // get items off of state

    // empty error messages
    let identifierError = "";
    let passwordError = "";

    if(typeof errors !== "undefined") { // if there are errors
      if (typeof errors.identifier !== "undefined") { // if there is an error on identifier
        identifierError = errors.identifier; // assign error message
      }
      if (typeof errors.password !== "undefined") { // if there is an error on password
        passwordError = errors.password; // assign error message
      }
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        <TextFieldGroup
          field="identifier"
          value={identifier}
          label="Email address"
          error={identifierError}
          onChange={this.onChange} />

        <TextFieldGroup
          field="password"
          value={password}
          label="Password"
          type="password"
          error={passwordError}
          onChange={this.onChange} />

        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-lg">Login</button>
        </div>

      </form>
    );
  }
}

// Define props supplied by context
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired // react router from context (used to redirect successful login)
};

// use connect to pass state/action to component as props
export default connect(
  null, // state
  { login, addFlashMessage } // actions
)(LoginForm);