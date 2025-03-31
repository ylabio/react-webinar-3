import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import CartItem from '../cart-item';
import List from '../list';

function CartModal({ isOpen, onClose, cart, total, onDelete }) {
  if (!isOpen) return null;

  const isEmpty = cart.length === 0;

  return (
    <Modal title="Корзина" onClose={onClose} total={total}>
      {isEmpty ? (
        <p className="Cart-empty">Ваша корзина пуста</p>
      ) : (
        <List list={cart} renderItem={item => <CartItem item={item} onDelete={onDelete} />} />
      )}
    </Modal>
  );
}

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
