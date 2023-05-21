import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button({children, ...props}) {
  return (
      <button {...props} className='Button'>
          {children}
      </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  style: PropTypes.object,
};

Button.defaultProps = {
  type: 'button',
};


export default React.memo(Button);
