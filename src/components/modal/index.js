import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import closeBtn from '../../assets/close.png';
import './style.css';

const modalRoot = document.getElementById('root');

const Modal = ({ isOpen = false, onClose = () => {}, totalPrice = 0, children = <></> }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="Modal" onClick={onClose}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        <div className="Modal-content-head">
          <h2 className="Modal-content-head-title">Корзина</h2>
          <button className="Modal-content-head-close-button" onClick={onClose}>
            <img src={closeBtn} alt="close-button" />
          </button>
        </div>
        {children}
        <div className="Modal-content-summary">
          <div className="Modal-content-summary-quantity">Итого:</div>
          <div className="Modal-content-summary-price">{formatPrice(totalPrice || 0)} ₽</div>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  totalPrice: PropTypes.number,
  children: PropTypes.node,
};

export default React.memo(Modal);
