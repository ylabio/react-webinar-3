import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './style.css';
import ModalLayout from '../modal-layout';
import List from '../list';
import CartItem from '../item/cart-item';

function CartModal({ cart, onClose, onRemove }) {
  const items = cart;
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  return createPortal(
    <div className="CartModal-backdrop">
      <ModalLayout title="Корзина" onClose={onClose}>
        <List list={items} renderItem={item => <CartItem item={item} onRemove={onRemove} />} />
        <div className="CartModal-footer">
          <div className="CartModal-total-label">Итого:</div>
          <div className="CartModal-total-value">{totalPrice.toLocaleString()} ₽</div>
        </div>
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
