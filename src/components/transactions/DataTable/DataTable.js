// Dependencies
import React from 'react';
import dateformat from 'dateformat';

// Project imports
import { Table, unsafe } from 'reactable';
import './DataTable.css';


/** Represent class for the DataTable component */
class DataTable extends React.Component {
  /**
   * Formats data object and config settings for the table
   * @param props
   */
  constructor(props) {
    super(props);

    // format data for Data table columns
    this.tableData = props.rows.map((row) => {
      return {
        'PaymentID': row.PaymentId,
        'First Name': row.EntrantDetail.FirstName,
        'Last Name': row.EntrantDetail.LastName,
        'Email Address': row.Entrant.EmailAddress,
        'Created': dateformat(row.CreatedDate, "yyyy-mm-dd"),
        '': unsafe('<a href="/transactions/' + row.FlowId + '" class="btn btn-primary btn-sm">View</a>') // Link to Transaction details
      }
    });

    // Configuration options for data table
    this.tableConfig = {
      itemsPerPage: 10,
      pageButtonLimit: 5,
      sortable: [
        'First Name',
        'Last Name',
        'Email Address',
        'Created'
      ],
      defaultSort: {
        column: 'Created',
        direction: 'asc'
      },
      filterable: [
        'PaymentID',
        'EmailAddress'
      ]
    };
  }
  /**
   * Renders DataTable containing all transactions
   * @returns {JSX} - DataTable component
   */
  render() {
    const config = this.tableConfig;
    return (
      <div className="table-wrapper">
        <Table
          className="table"
          data={this.tableData}
          itemsPerPage={config.itemsPerPage}
          pageButtonLimit={config.pageButtonLimit}
          sortable={config.sortable}
          defaultSort={config.defaultSort}
          filterable={config.filterable}
        />
      </div>
    )
  }
}

export default DataTable;