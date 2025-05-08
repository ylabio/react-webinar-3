import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalLayout from '../modal-layout';
import CartContent from '../cart-content';
import './style.css';

function CartModal({ cart, onClose, onRemove }) {
  return createPortal(
    <div className="CartModal-backdrop">
      <ModalLayout title="Корзина" onClose={onClose}>
        <CartContent cart={cart} onRemove={onRemove} />
      </ModalLayout>
    </div>,
    document.body,
  );
}

CartModal.propTypes = {
  cart: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
