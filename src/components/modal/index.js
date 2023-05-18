import React from 'react'
import { createPortal } from 'react-dom';
import './style.css';

function Modal({children}) {
  return createPortal(
    <div className="Modal">
      {children}
    </div>,
    document.getElementById("modal")
);
}

export default Modal