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

Button.defaultProps = {
  onClick: () => {},
};


export default React.memo(Button);
