// Dependencies
import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


const Input = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => {
  const validationStatus = (touched && error) ? 'error' : null;

  return (
    <FormGroup
      controlId={input.name}
      validationState={validationStatus}>

      <ControlLabel>{label}</ControlLabel>

      <FormControl
        type={type}
        placeholder={placeholder}
        {...input} />
      <FormControl.Feedback />

      {touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <HelpBlock>{warning}</HelpBlock>))}

    </FormGroup>
  );
};

export default Input;