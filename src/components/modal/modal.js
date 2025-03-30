import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';
import './style.css';

function Modal({ children, title, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const overlay = document.querySelector('.Modal__overlay');
      if (overlay) {
        overlay.classList.add('Modal__overlay--active');
      }
    }, 2);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Modal__overlay">
      <div className="Modal__container">
        <div className="Modal__header">
          <h3>{title}</h3>
          <FiX onClick={onClose} className="Modal__close__icon" />
        </div>
        <div className="Modal__body">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.node,
};

export default Modal;
