import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ active }) {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content"></div>
    </div>
  );
}

Modal.propTypes = {
  onAdd: PropTypes.func,
};

Modal.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Modal);
