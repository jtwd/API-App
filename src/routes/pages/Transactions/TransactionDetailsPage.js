// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import dateformat from 'dateformat';

// Project imports
import { fetchFlowDetails } from '../../../components/transactions/transactions-actions';
import EvidenceItem from '../../../components/transactions/EvidenceItem/EvidenceItem';
import './TransactionDetails.css';


/** Represents the class for the TransactionDetailsPage */
class TransactionDetailsPage extends React.Component {
  /**
   * Before the component mounts, call the action to fetch flow details
   */
  componentWillMount() {
    this.props.fetchFlowDetails(this.props.params.id);
  }

  /**
   * Renders evidence items
   * @param {array} evidenceItems
   * @returns {JSX} evidence items
   */
  renderEvidence(evidenceItems) {
    return evidenceItems.map((eviItem) => {
      return (
        <EvidenceItem key={eviItem.Id} evidenceId={eviItem.Id} />
      )
    })
  }

  /**
   * Renders line for address only if content is provided
   * @param add
   * @returns {*}
   */
  renderAddressLine(add) {
    if (add === '') {
      return '';
    }
    return (<div>{add}</div>);
  }

  /**
   * Renders order items content for order table
   * @param {array} items - order items
   * @returns {JSX}
   */
  renderOrderItems(items) {
    return items.map((item) => {
      return(
        <tr key={item.Id}>
          <td>{item.CollectionRewardType.Name}</td>
          <td>{item.Quantity}</td>
        </tr>
      )
    });
  }

  /**
   * Renders the TransactionDetailsPage component
   * @returns {JSX} TransactionDetailsPage
   */
  render() {
    const { flowDetails } = this.props;
    const heading = (<div className="panel"><h1>Transaction Details</h1></div>);

    // loading
    if (!flowDetails) {
      return (
        <div>
          {heading}
          <h3>Loading...</h3>
        </div>
      )
    }

    return (
      <div>
        {heading}
        <div className="panel panel-default">
          <header className="panel-heading">
            <h2 className="panel-title">Customer details</h2>
          </header>
          <div className="panel-body">
            <h2>{flowDetails.EntrantDetail.FirstName} {flowDetails.EntrantDetail.LastName}</h2>
            <div className="row">
              <div className="col-md-6">

                <table className="table-details">
                  <tbody>
                    <tr>
                      <th>Email address:&nbsp;</th>
                      <td><a href={`mailto:${flowDetails.Entrant.EmailAddress}`}>{flowDetails.Entrant.EmailAddress}</a></td>
                    </tr>
                    <tr>
                      <th>Telephone no:&nbsp;</th>
                      <td>{flowDetails.TelephoneNumber }</td>
                    </tr>
                    <tr>
                      <th>Created:&nbsp;</th>
                      <td>{dateformat(flowDetails.CreatedDate)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table-details">
                  <tbody>
                    <tr>
                      <th>Postal address:&nbsp;</th>
                      <td>
                        {this.renderAddressLine(flowDetails.EntrantDetail.Address1)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.Address2)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.City)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.State)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.PostalCode)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <section className="row section-order">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title">Order details</h2>
            </div>
            <div className="panel-body">
              <table className="table-details table-order table-bordered table-striped" width="100%">
                <thead>
                  <tr>
                    <th width="65%">Product</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderOrderItems(flowDetails.CollectionRewards)}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="row section-evidence">
          {this.renderEvidence(flowDetails.CollectionEvidence)}
        </section>

        <footer className="page-footer">
          <div className="container">
            <Link to="/transactions" className="btn btn-primary">&lt; Back to transactions list</Link>
          </div>
        </footer>

      </div>
    );
  }
}

/**
 * Takes global state and returns only the bits the component needs
 * @param state
 * @returns {{flowDetails: (object|boolean)}}
 */
function mapStateToProps(state) {
  return {
    flowDetails: state.transactions.details
  }
}

// Connect state/actions to component as props
export default connect(
  mapStateToProps, // state
  {fetchFlowDetails} // action
)(TransactionDetailsPage);
