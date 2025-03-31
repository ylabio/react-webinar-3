import React from 'react';
import CancelIcon from './assets/icons/CancelIcon.jsx';
import './style.css';

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <CancelIcon className="modal-close-icon" color="#878787" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
