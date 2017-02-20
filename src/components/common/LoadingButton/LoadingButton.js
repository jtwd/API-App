import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';


export default class LoadingButton extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    type: PropTypes.string,
  };
  static defaultProps = {
    type: 'submit',
  };

  render() {
    let { isLoading, type } = this.props;
    return (
      <Button
        bsStyle="primary"
        disabled={isLoading}
        type={type}>
        {isLoading ? 'Loading...' : this.props.children}

      </Button>
    );
  }
};
