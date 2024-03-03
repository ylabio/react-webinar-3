import React from "react";
import PropTypes from "prop-types";
import "./style.css";
// кастомный button
function Button(props) {
  const { children, callback, ...otherProps } = props;

  return (
    <button className="Button" onClick={callback} {...otherProps}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

Button.defaultProps = {
  callback: () => {},
};

export default React.memo(Button);
