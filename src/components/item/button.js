import PropTypes from "prop-types";
import React from "react";

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  onClick: () => {
  },
}


export default React.memo(Button);