import React from "react";
import PropTypes from "prop-types";
import './style.css'

function Button({name, onClick}) {
  return (
    <button onClick={() => onClick()}>{name}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string
};

Button.defaultProps = {
  onClick: () => {}
};

export default React.memo(Button);