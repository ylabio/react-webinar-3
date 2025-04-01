import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import { CartInfo } from '../cart-info';
import CartItem from '../cart-item';
import ModalHeader from '../modal-header';
import EmptyState from '../empty-state';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartContent({ cart = [], totalPrice, onShowModal, onDeleteItem }) {
  const cn = bem('CartContent');

  const renderCartItem = React.useCallback(
    item => (
      <CartItem
        code={item.code}
        title={item.title}
        price={item.price}
        quantity={item.quantity}
        onDelete={onDeleteItem}
      />
    ),
    [onDeleteItem]
  );

  return (
    <>
      <ModalHeader title="Корзина" onClose={onShowModal} />
      {cart.length ? (
        <>
          <List items={cart} renderItem={renderCartItem} />
          <CartInfo price={totalPrice} />
        </>
      ) : (
        <EmptyState text="Пусто" />
      )}
    </>
  );
}

CartContent.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onShowModal: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export { CartContent }; 