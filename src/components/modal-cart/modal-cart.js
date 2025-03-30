import React from 'react';
import Modal from '../modal/modal.js';
import CartList from '../cart-list/cart-list.js';
import PropTypes from 'prop-types';

function ModalCart({ onClose, totalPrice, cart, onDeleteItem }) {
  return (
    <Modal onClose={onClose} title="Корзина">
      <CartList items={cart} onDeleteItem={onDeleteItem} totalPrice={totalPrice} />
    </Modal>
  );
}

ModalCart.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ModalCart;
