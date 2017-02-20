// @flow

// Dependencies
import React, { Component, PropTypes } from 'react';

// Project imports
import {
  NavigationBar,
  FlashMessagesList,
} from '../components';


/** Represents the the App class */
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  /**
   * Renders the App component - which contains:
   * Nav Bar
   * FlashMessageList
   * Children
   * @returns {JSX} App
   */
  render() {
    return (
      <div className="App container">
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}