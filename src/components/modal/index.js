import React from "react";
import './style.css';
import { createPortal } from "react-dom";
import Overlay from "../overlay";

const modalElement = document.getElementById("modal")

function Modal({ children }) {
  return createPortal(
    (
      <>
        <div className="modal">
          <button className="modal__close" aria-label="Закрыть">
            <img src="/icons/cancel.svg" alt="Закрыть" width={24} height={24} />
          </button>
          {children}
        </div>
        <Overlay />
      </>
    ), modalElement
  )
}

export default React.memo(Modal)