import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({onClickFunc, text}) {
  return (
      <button className='Button' onClick={() => onClickFunc()}>{text}</button>
  )
}

Button.propTypes = {
  onClickFunc: PropTypes.func,
  text: PropTypes.string
};

Button.defaultProps = {
  onClickFunc: () => {},
  text: ''
}

export default React.memo(Button);
