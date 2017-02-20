// @flow

// Dependencies
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Project imports
import './Greeting.css';


/**
 * Display a salutation based on authentication status
 * @param {Boolean} isAuthenticated
 * @param {Sring} title
 * @returns {JSX} - Greeting component
 * @constructor
 */
class Greeting extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    title: PropTypes.arrayOf(PropTypes.string),
    message: PropTypes.arrayOf(PropTypes.string),
    btnTo: PropTypes.arrayOf(PropTypes.string),
    btnText: PropTypes.arrayOf(PropTypes.string),
    hero: PropTypes.bool,
  };
  static defaultProps = {
    hero: false,
  };

  /**
   * Renders a title based on authenticated status
   * @param {array} title - Logged in/out titles
   * @param {number} i - which title to show [0: logged out | 1: logged in]
   * @returns {JSX} - Greeting title
   */
  renderTitle(title: array<string>, i: number) {
    if (!title) return '';
    return (<h1>{title[i]}</h1>);
  }

  /**
   * Renders a message based on authenticated status
   * @param {array} msg - Logged in/out messages
   * @param {number} i - which message to show [0: logged out | 1: logged in]
   * @returns {JSX} - Greeting message
   */
  renderMessage(msg: array<string>, i: number) {
    if (!msg) return '';
    return (<p>{msg[i]}</p>);
  }

  /**
   * Renders a button based on authenticated status
   * @param {array} to - Logged in/out button distination route
   * @param {array} text - Logged in/out button text
   * @param {number} i - which btn to show [0: logged out | 1: logged in]
   * @returns {JSX} - Greeting button
   */
  renderButton(to: array<string>, text: array<string>, i: number) {
    if (!to || !text) return '';
    return (<Link to={to[i]} className="btn btn-primary btn-lg">{text[i]}</Link>);
  }

  render() {
    const {
      isAuthenticated,
      title,
      message,
      btnTo,
      btnText,
      hero,
    } = this.props
    const i = isAuthenticated ? 1 : 0;
    const heroClass = hero ? 'jumbotron' : '';

    return (
      <div className={`Greeting ${heroClass}`}>
        {this.renderTitle(title, i)}
        {this.renderMessage(message, i)}
        {this.renderButton(btnTo, btnText, i)}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Greeting);