// Dependencies
import React, { Component } from 'react';

// Project imports
import { Greeting } from '../../../components';
import './HomePage.css';


/** Represents the Home component */
class HomePage extends Component {
  /**
   * Renders Home component
   * @returns {JSX} -  Home component
   */
  render() {

    return (
      <div>
        <Greeting
          title={["JayWin admin", "Welcome back to JayWin admin"]}
          message={["You need to be logged in to use this app", "You are logged in and ready to go!"]}
          btnTo={["login", "promotions"]}
          btnText={["Login", "Promotion setup"]}
          hero={true}
        />
      </div>
    )
  }

}

export default HomePage;