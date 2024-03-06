import React from "react";
import Head from "../head";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ children, onClose}) {
  return (
    <div className="Modal">
      <div className="Modal-content">
        <Head title="Корзина">
          <button className="Head-closeBtn" onClick={onClose}>
            Закрыть
          </button>
        </Head>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
