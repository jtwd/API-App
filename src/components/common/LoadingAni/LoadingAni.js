import React,  { PropTypes } from 'react';
import Loading from 'react-loading';

import './LoadingAni.css';

const loadingType = 'bars';
const loadingColor = '#666666';
const loadingDelay = 0;

const LoadingAni = (props) => {
  let classnames = '';

  if (props.cover) {
    classnames = ' cover'
  }

  return (
    <div className={`LoadingAni ${classnames}`}>
      <Loading
        color={loadingColor}
        type={loadingType}
        delay={loadingDelay} />
    </div>
  );
};

LoadingAni.propTypes = {
  cover: PropTypes.bool,
};

LoadingAni.defaultProps = {
  cover: false,
}

export default LoadingAni;