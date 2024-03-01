import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ isShown, onClose, children }) {
  if (!isShown) return null;

  return (
    <div className={"Modal"} onClick={onClose}>
      <div className={"Modal-overlay"}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  isShown: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default Modal;
