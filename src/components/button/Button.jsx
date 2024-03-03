import React from 'react'
import PropTypes from "prop-types";
import "./style.css"

function Button({title, onClick}) {

  return (
    <div className="Action">
      <button onClick={onClick}>{title}</button>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick: () => {}
}

export default Button