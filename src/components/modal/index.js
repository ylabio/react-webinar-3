import React from "react";
import Head from "../head";
import PropTypes from "prop-types";
import "./style.css";

function Modal({title, children, onClose}) {
  return (
    <div className="Modal">
      <div className="Modal-content">
        <Head title={title}>
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
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
