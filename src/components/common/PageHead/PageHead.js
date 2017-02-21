// Dependencies
import React from 'react';
import { PageHeader } from 'react-bootstrap';

// Project imports
import './PageHead.css';


const PageHead = (props) => (
  <header className="PageHead">
    <PageHeader>{props.title}</PageHeader>
    {props.children}
  </header>
);

// props definition
PageHead.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.element,
};

export default PageHead;