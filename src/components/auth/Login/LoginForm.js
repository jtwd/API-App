// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Panel } from 'react-bootstrap';

// Project imports
// -Components
import {
  LoadingButton,
  LoadingAni,
  Input
} from '../../../components';
// -Actions
import {
  login,
  addFlashMessage,
  deleteFlashMessage
} from '../../../actions';
// -Flash message types
import { LOGIN_ERROR } from '../../../constants';


class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  static propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    submitError: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.validate = {
      required: value => value ? undefined : 'Required',
      email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
    }
  }

  render() {
    const { handleSubmit, submitting, isLoading, submitError } = this.props;
    const { deleteFlashMessage, addFlashMessage, login } = this.props;
    const { router } = this.context;

    const panelTitle = <h1>Login</h1>;
    const panelFooter = <div className="text-right"><LoadingButton isLoading={submitting} type="submit">Login</LoadingButton></div>;

    const _onSubmit = (values) => {
      deleteFlashMessage(LOGIN_ERROR);
      login(values).then(
        (res) => {
          if (submitError) {
            addFlashMessage({
              id: LOGIN_ERROR,
              type: 'error',
              text: submitError,
            });
          } else {
            deleteFlashMessage(LOGIN_ERROR);
            router.push('/');
          }
        },
        (err) => {
          addFlashMessage({
            id: LOGIN_ERROR,
            type: 'error',
            text: submitError,
          });
        }
      );
    }

    return (
      <form onSubmit={handleSubmit(_onSubmit)}>
        <Panel
          header={panelTitle}
          footer={panelFooter}>

          <Field name="email" type="text"
                 component={Input} label="Email address"
                 validate={[this.validate.required, this.validate.email]} />

          <Field name="password" type="password"
                 component={Input} label="Password"
                 validate={this.validate.required} />

        </Panel>
        { isLoading ? <LoadingAni cover={true} /> : ''}
      </form>
    )
  }
};

LoginForm = reduxForm({
  form: 'LoginForm' // a unique identifier for this form
})(LoginForm);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    submitError: state.auth.error,
  }
}

LoginForm = connect(
  mapStateToProps,
  {
    login,
    addFlashMessage,
    deleteFlashMessage,
  }
)(LoginForm);

export default LoginForm;