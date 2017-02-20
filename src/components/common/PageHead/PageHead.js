// Dependencies
import React from 'react';
import { PageHeader } from 'react-bootstrap';

// Project imports
import './PageHead.css';


const PageHead = (props) => (
  <header className="PageHead">
    <PageHeader>{props.title}</PageHeader>
  </header>
)

// props definition
PageHead.propTypes = {
  title: React.PropTypes.string.isRequired,
}

export default PageHead;