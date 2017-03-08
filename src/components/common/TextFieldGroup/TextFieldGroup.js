// Dependencies
import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

// Project imports
import './TextFieldGroup.css';


/**
 * Renders a re-usable text field
 * @param {String} field - identifier for the field (name)
 * @param {String} value - fields current value
 * @param {String} label - label text
 * @param {String} error - error message
 * @param {String} type - input type (text, email etc)
 * @param {Function} onChange
 * @returns {JSX} - TextFieldGroup component
 * @constructor
 */
const TextFieldGroup = ({
  input,
  label,
  type="text",
  errorMsg,
  meta: {
    touched,
    error,
    invalid,
    warning
  }
}) => {
  return (
    <FormGroup controlId={input.name} validationState={(touched && invalid) ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        {...input}
        type={type}
      />
      {(errorMsg && touched && invalid) ? (<span className="help-block">{error}</span>) : ''}
    </FormGroup>
  );
};

// Define default values for component props
TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;