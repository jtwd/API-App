// Dependencies
import React from 'react';
import axios from 'axios';

// Project imports
import { API_URL } from '../../../index';
import './EvidenceItem.css';


/** Represents class for EvidenceItem component */
class EvidenceItem extends React.Component {
  /**
   * Initialises internal state and react id prop
   * @param props
   */
  constructor(props) {
    super(props);

    this.id = this.props.evidenceId;
    this.state = { imgData: null }
  }

  /**
   * Before the component mounts, an async request is sent to retrieve
   * the evidence item (image) details.
   * When it returns set state on the imgData property
   */
  componentDidMount() {
    axios.get(`${API_URL}collection-evidence/${this.id}`).then(res => {
      this.setState({ imgData: res.data.Item });
    });
  }

  /**
   * Click handler to the approved/reject/reset buttons
   * Sends async request to update status of the evidence
   * and sets state when it returns
   * @param status
   */
  onClick(status) {
    const url = `${API_URL}collection-evidence/${this.id}/state`;
    const data = {
      State: status
    };
    let stateIndex;

    if(status === 'Submitted') stateIndex = 0;
    if(status === 'Approved') stateIndex = 1;
    if(status === 'Rejected') stateIndex = 2;

    let tempData = Object.assign({}, this.state.imgData, { State: stateIndex, StateDescription: status});

    axios.put(url, data).then(res => {
      this.setState({ imgData: tempData });
    });
  }

  /**
   * Renders the EvidenceItem component
   * @returns {JSX} EvidenceItem
   */
  render() {
    if (this.state.imgData === null) { // Component is loading
      return (
        <div className="col-md-6 text-center">
          <article className={`panel panel-default`}>
            <header className="panel-heading">
              <h3 className="panel-title">Evidence item</h3>
            </header>
            <div className="panel-body">
              <h4 className="text-center">Loading...</h4>
            </div>
            <footer className="panel-footer" />
          </article>
        </div>
      )
    };

    const image = this.state.imgData;

    // set conditional classname for component state
    let panelClass;
    switch(image.StateDescription) {
      case 'Approved':
        panelClass = 'success';
        break;

      case 'Rejected':
        panelClass = 'danger';
        break;

      case 'Submitted':
        panelClass = 'default';
        break;

      default:
        panelClass = 'default';
    }

    // Approved/Reject buttons
    const buttons = (
      <div className="btn-group-wrapper">
        <div className="btn-group">
          <button className="btn btn-danger" onClick={() => { this.onClick('Rejected') }}>Reject</button>
          <button className="btn btn-success" onClick={() => { this.onClick('Approved') }}>Approve</button>
        </div>
      </div>
    );

    // Reset button with state indicator
    const reset = (
      <div className="btn-group-wrapper">
        <div><strong className={`text-${panelClass}`}>{image.StateDescription}</strong></div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => { this.onClick('Submitted') }}>Reset</button>
        </div>
      </div>
    );

    return (
      <div className="col-md-6">
        <article className={`panel panel-${panelClass}`}>
          <header className="panel-heading">
            <h3 className="panel-title">Evidence item</h3>
          </header>
          <div className="panel-body">
            <img src={`data:${image.ContentType};base64, ${image.File}`} className="img-responsive" alt="Evidence asset" />
          </div>
          <footer className="panel-footer">
            {image.StateDescription === 'Submitted' ? buttons : reset} /* ternary to show button or reset based on state description */
          </footer>
        </article>
      </div>
    );
  }
}

export default EvidenceItem;
