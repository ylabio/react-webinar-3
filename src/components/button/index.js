import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Button({style, children, callback, param}) {
  return (
    <button className={(`Button ${style ? style : ''}`).trim()} onClick={(event) => {
      param !== undefined ? callback(param) : callback();
      event.stopPropagation();
      }
    }>
      {children}
    </button>
  )
}

// Typechecking with PropTypes:
Button.propTypes = {
  style: PropTypes.string,
  children: PropTypes.node,
  callback: PropTypes.func.isRequired,
  param: PropTypes.number,
};

// Default values for properties:
Button.defaultProps = {
  style: 'Button_item',
  callback: () => {},
};

export default React.memo(Button);
