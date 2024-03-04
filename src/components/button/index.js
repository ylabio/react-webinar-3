import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Button = ({ btnText, onClick }) => {
  return (
    <button className="Button" onClick={onClick}>
      {btnText}
    </button>
  );
};

Button.propTypes = {
  btnText: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default React.memo(Button);
