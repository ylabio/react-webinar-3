import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import './style.css';
import ModalCloseIcon from './modal-close-icon';
import PropTypes from 'prop-types';

function Modal({ active = false, onClose = () => {}, children }) {
  useEffect(() => {
    // заблокировать прокрутку страницы при открытии модалки
    if (active) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {createPortal(
        <div
          className="Modal"
          onClick={e => {
            if (e.target === e.currentTarget) onClose(false);
          }}
        >
          <div className="Modal-wrapper">
            <div className="Modal-close" onClick={() => onClose(false)}>
              <ModalCloseIcon />
            </div>

            <div className="Modal-content">{children}</div>
          </div>
        </div>,

        document.body,
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
