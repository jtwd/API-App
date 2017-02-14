// Dependencies
import React from 'react';
import classnames from 'classnames';


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
const TextFieldGroup = ({ field, value, label, error, type, onChange}) => {
  return (
    <div className={classnames("form-group", { 'has-error': error})}>
      <label className="control-label">{label}</label>
      <input
        type={type}
        name={field}
        className="form-control"
        value={value}
        onChange={onChange} />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

// Define default values for component props
TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;