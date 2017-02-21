// Dependencies
import React, { Component } from 'react';

// Project imports
import {
  PageHead,
  PromotionsTable,
} from '../../../components';


class PromotionsPage extends Component {
  render() {
    return (
      <div className="Page">
        <PageHead title="Promotion Setup">
          <button className="btn btn-primary AddNewButton"><strong>+</strong> &nbsp;Create New Promotion</button>
        </PageHead>
        <PromotionsTable />
      </div>
    );
  }
}

export default PromotionsPage;