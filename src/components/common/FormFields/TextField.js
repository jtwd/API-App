import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


const TextField = ({
  input,
  label,
  type,
  meta: {
    touched,
    error,
    invalid,
    warning
  }}) => (

  <FormGroup controlId={input.name} validationState={touched && invalid ? 'error' : null}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    <FormControl.Feedback />
  </FormGroup>

);

export default TextField;