// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Project imports
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../flash-actions';


/** Represents class for FlashMessageList */
class FlashMessagesList extends Component {
  /**
   * Renders FlashMessageList
   * @returns {JSX} - FlashMessageList component
   */
  render() {
    const messageData = this.props.messages;
    let messages =[];

    if(messageData) {
      messages = this.props.messages.map(message =>
        <FlashMessage
          key={message.id}
          message={message}
          deleteFlashMessage={this.props.deleteFlashMessage}/>
      );
    }

    return (
      <div>
        {messages}
      </div>
    );
  }
}

/**
 * Takes state and returns the bits we want to pass to the component
 * In the case: flashMessages
 * @param state
 * @returns {{messages: *}}
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  }
}

// Connect state/actions to the component
export default connect(
  mapStateToProps, // state
  { deleteFlashMessage } // actions
)(FlashMessagesList);