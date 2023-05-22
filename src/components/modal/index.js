import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Modal = ({closeCb, children, title }) => {

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="cart-header">
          <h2>{title}</h2>
          <button onClick={closeCb}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  setShowModal: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string
};

Modal.defaultProps = {
  setShowModal: () => {},
  children: <div></div>,
  title: 'Modal'
};

export default Modal;
