// Dependencies
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Project imports
import App from './App';
import {
  HomePage,
  LoginPage,
  PromotionsPage,
  ReportsPage,
  TransactionsPage,
  TransactionDetailsPage,
} from './pages';

import { requireAuth } from '../components'; // higher order component


/** Routes component */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="promotions" component={requireAuth(PromotionsPage)} />
    <Route path="reports" component={requireAuth(ReportsPage)} />
    <Route path="transactions" component={requireAuth(TransactionsPage)} />
    <Route path="transactions/:id" component={requireAuth(TransactionDetailsPage)} />
  </Route>
)

