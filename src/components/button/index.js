import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function Button ({
  children = '', 
  onClick = () => {}, 
  type = 'purple'
}) {
  return (
    <button
      className={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['red', 'purple', 'transparent']),
};

export default Button;