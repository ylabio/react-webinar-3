import React from "react";
import PropTypes from "prop-types";
import "./style.css";


function Modal({ isModalOpen, children}) {

  const className = isModalOpen ? "Modal_open" : "";

  return (
    <div className={`Modal ${className}`}>
      <div className="Modal__wrapper">
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
};

export default React.memo(Modal);
