// Dependencies
import React from 'react';

// Project imports
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/Messages/FlashMessagesList';


/** Represents the class for the App component */
class App extends React.Component {
  /**
   * Renders the App component - which contains:
   * Nav Bar
   * FlashMessageList
   * Children
   * @returns {JSX} App
   */
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;