import React, { PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { confirmable } from 'react-confirm';

class Confirmation extends React.Component {
  render() {
    const {
      okLabel = 'OK',
      cancelLabel = 'Cancel',
      type = 'Delete',
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
    } = this.props;

    let btnStyle = 'primary'
    if (type === 'Delete') btnStyle = 'danger';

    return (
      <div className="static-modal">
        <Modal show={show} bsSize="small" onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirmation}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={cancel}>{cancelLabel}</Button>
            <Button className='button-l' bsStyle={btnStyle} onClick={proceed}>{okLabel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Confirmation.propTypes = {
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
}

export default confirmable(Confirmation);