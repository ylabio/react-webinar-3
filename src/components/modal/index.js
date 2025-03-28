import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './style.css';

function Modal({ isOpen, onClose, children }) {
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="Modal-overlay" onClick={e => handleClose(e)}>
      <div className="Modal-container">
        <button className="Modal-btnClose" onClick={onClose}>
          <CrossIcon />
        </button>
        <div className="Modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

const CrossIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m17.88 16 5.733-5.72a1.34 1.34 0 0 0-1.893-1.893L16 14.12l-5.72-5.733a1.339 1.339 0 1 0-1.893 1.893L14.12 16l-5.733 5.72a1.333 1.333 0 0 0 0 1.893 1.333 1.333 0 0 0 1.893 0L16 17.88l5.72 5.733a1.335 1.335 0 0 0 1.893 0 1.335 1.335 0 0 0 0-1.893L17.88 16Z"
      fill="#878787"
    />
  </svg>
);

export default Modal;
