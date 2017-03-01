// Dependencies
import React, { Component } from 'react';
import classnames from 'classnames';

// Project imports
import { FLASH_MESSAGE_TIMEOUT } from '../../../constants'


/** Class representing a Flash Message component */
class FlashMessage extends Component {
  /**
   * Binds this to the onClick function
   * @param props
   */
  constructor(props) {
    super(props);

    this.selfClosingTimeout = FLASH_MESSAGE_TIMEOUT;
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
    const { id, type, text, selfClosing } = this.props.message;
    const closeBtn = (
      <button
        className="close"
        onClick={this.onClick}>
        <span>&times;</span>
      </button>
    );

    if (selfClosing) {
      setTimeout(() => {
        this.props.deleteFlashMessage(id);
      }, this.selfClosingTimeout)
    }

    return (
      <div className={classnames('alert', { 'alert-success': type === 'success', 'alert-danger': type === 'error' })}>
        { selfClosing ? '' : closeBtn }
        {text}
      </div>
    );
  }
};

export default FlashMessage;