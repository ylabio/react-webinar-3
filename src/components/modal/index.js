import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import './style.css';
import ModalCloseIcon from './modal-close-icon';

export function Modal({ active = false, onClose = () => {}, children }) {
  if (!active) return null;

  useEffect(() => {
    // заблокировать прокрутку страницы при открытии модалки
    if (active) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [active]);

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
