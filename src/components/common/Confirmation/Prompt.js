import React, { PropTypes } from 'react';
import { Modal, Button, Input, HelpBlock } from 'react-bootstrap'
import { confirmable } from 'react-confirm';

class Prompt extends React.Component {

  refCallback(ref) {
    this.inputRef = ref;
  }

  handleOnClick() {
    const { proceed } = this.props;

    if (this.inputRef.getValue().trim() === '') {
      const $promptErr = document.getElementById('prompt-error');
      $promptErr.innerHTML = 'Required';
      $promptErr.classList.add('error');
    }
    return () => {
      proceed({
        input: this.inputRef.getValue(),
      });
    }
  }

  render() {
    const {
      show,
      proceed,
      title,
      dismiss,
      cancel,
      message
    } = this.props;

    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{ title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
            <Input ref={::this.refCallback} type='text' />
            <HelpBlock id="prompt-error" ></HelpBlock>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={cancel}>Cancel</Button>
            <Button className='button-l' bsStyle="default" onClick={this.handleOnClick()}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}


export default confirmable(Prompt);