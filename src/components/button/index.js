import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Button({onClick, children}) {
  return (
    <button className={'Button'} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};


export default React.memo(Button);
