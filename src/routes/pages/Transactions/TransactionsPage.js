// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Project imports
import { fetchTransactions } from '../../../components/transactions/transactions-actions';
import DataTable from '../../../components/transactions/DataTable/DataTable';


/** Represents class for TransactionsPage component */
class TransactionsPage extends React.Component {
  /**
   * Defines initial state
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      mod_state: 'Pending',
    }
  }

  /**
   * Before the components mounts, run action to fetch transactions from the API
   */
  componentWillMount() {
    this.props.fetchTransactions(this.state.mod_state);
  }

  /**
   * Change event for table filter
   * Runs the function passed to it, with the value on the event object
   * @param {function} fn - function to call
   * @param {object} e - event
   */
  onFilterChange(fn, e) {
    fn(e.target.value);
  }

  /**
   * Renders the TransactionsPage component
   * @returns {JSX} TransactionsPage
   */
  render() {
    const { transactions, fetchTransactions } = this.props;
    const heading = (<div className="panel"><h1>Transactions</h1></div>);

    // loading
    if (!transactions) {
      return (
        <div>
          {heading}
          <h3>Loading...</h3>
        </div>
      )
    }

    // Empty list
    if (transactions.length === 0) {
      return (
        <div>
          {heading}
          <h3>There are currently no transactions</h3>
        </div>
      );
    }

    return (
      <div className="page-container">
        {heading}

        <div className="filter form-group">
          <label htmlFor="status-filter">Status filter: </label><br/>
          <select
            id="status-filter"
            className="form-control"
            onChange={(e) => { this.onFilterChange(fetchTransactions, e)}}>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="panel panel-default">
          <DataTable rows={transactions} />
        </div>
      </div>
    );
  }
}

/**
 * Takes global state and returns just the bits the component needs
 * @param state
 * @returns {{transactions: (number|*|boolean)}}
 */
function mapStateToProps(state) {
  return {
    transactions: state.transactions.list
  }
}

export default connect(
  mapStateToProps, // state
  {fetchTransactions} // action
)(TransactionsPage);
