import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../CloseIcon';
import './style.css';

function Modal({ isOpen = false, onClose = () => {}, totalPrice = 0, formatPrice, children }) {
  const dialogRef = useRef(null);
  const modalBoxRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      dialog.close();
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} className="Modal" style={{ padding: 0 }}>
      <div ref={modalBoxRef} className="Modal-content">
        <h2 className="Modal-title">Корзина</h2>

        <div className="Modal-box">
          <ul className="Modal-list">{children}</ul>
          <div className="Modal-total">
            <b className="Modal-total-label">Итого:</b>
            <b className="Modal-total-price">{formatPrice(totalPrice)} ₽</b>
          </div>
        </div>

        <button className="Modal-close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  totalPrice: PropTypes.number,
  formatPrice: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(Modal);
