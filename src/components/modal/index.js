import React from "react";
import Head from "../head/index";
import List from "../list/index";
import PropTypes from "prop-types";
import "./style.css";

const Modal = ({
  showModal,

  children,
}) => {
  return (
    <div
      className="Modal"
      style={showModal ? { display: "flex" } : { display: "none" }}
    >
      <div className="Modal-container">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
};

export default Modal;
