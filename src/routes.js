// Dependencies
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Project imports
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/Login/LoginPage';
import TransactionsPage from './components/transactions/Pages/TransactionsPage';
import TransactionDetailsPage from './components/transactions/Pages/TransactionDetailsPage';
import PromotionsPage from './components/promotions/PromotionsPage';
import requireAuth from './components/auth/utils/requireAuth'; // higher order component


/** Routes component */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage} />
    <Route path="promotions" component={requireAuth(PromotionsPage)} />
    <Route path="transactions" component={requireAuth(TransactionsPage)} />
    <Route path="transactions/:id" component={requireAuth(TransactionDetailsPage)} />
  </Route>
)
