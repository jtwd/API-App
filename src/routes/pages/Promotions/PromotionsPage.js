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
        <PageHead title="Promotion Setup" />
        <PromotionsTable />
      </div>
    );
  }
}

export default PromotionsPage;