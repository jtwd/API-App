// Dependencies
import React, { Component } from 'react';
import classnames from 'classnames';


/** Class representing a Flash Message component */
class FlashMessage extends Component {
  /**
   * Binds this to the onClick function
   * @param props
   */
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  /**
   * Handles Close button clicks.
   * Calls the deleteFlashMessage function with the Id of the message
   */
  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  /**
   * Renders Flash Message
   * @returns {JSX} - FlashMessage component
   */
  render() {
    const { type, text} = this.props.message;

    return (
      <div className={classnames('alert', { 'alert-success': type === 'success', 'alert-danger': type === 'error' })}>
        <button
          className="close"
          onClick={this.onClick}>
          <span>&times;</span>
        </button>
        {text}
      </div>
    );
  }
};

export default FlashMessage;