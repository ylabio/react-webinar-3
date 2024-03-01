import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onAction, action, children }) {
  return (
    <div className="Controls">
      {children}
      <button onClick={() => onAction()}>{action}</button>
    </div>
  );
}

Controls.propTypes = {
  onAction: PropTypes.func,
  action: PropTypes.string,
};

Controls.defaultProps = {
  onAction: () => {},
};

export default React.memo(Controls);
