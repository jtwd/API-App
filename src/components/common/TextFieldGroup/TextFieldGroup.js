// Dependencies
import React from 'react';
import classnames from 'classnames';
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
const TextFieldGroup = ({ field, value, label, error, type, onChange, isLoading}) => {
  return (
    <FormGroup className={classnames("form-group", { 'has-error': error})}>
      <ControlLabel htmlFor={field}>{label}</ControlLabel>
      <FormControl
        id={field}
        type={type}
        name={field}
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
      {error && <span className="help-block">{error}</span>}
    </FormGroup>
  );
};

// Define default values for component props
TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;