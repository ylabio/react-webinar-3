import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { createPortal } from "react-dom";
import Overlay from "../overlay";

const modalElement = document.getElementById("modal")

function Modal({ children, onClose } ) {
  return createPortal(
    (
      <>
        <div className="modal">
          <button onClick={onClose} className="modal__close" aria-label="Закрыть">
            <img src="/icons/cancel.svg" alt="Закрыть" width={24} height={24} />
          </button>
          {children}
        </div>
        <Overlay />
      </>
    ), modalElement
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Modal)