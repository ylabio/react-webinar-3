import './style.css';
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';
import List from '../list';

function CartList({
  onDeleteItem = () => {},
  cart = [],
  sumPrice = 0,
  list = [],
  onClose = () => {},
}) {
  //закрываем корзину, если все товары удалены
  useLayoutEffect(() => {
    if (cart.length === 0) onClose(false);
  }, [cart.length]);

  return (
    <div className="Cart">
      <div className="Cart-content">
        <h1>Корзина</h1>

        <List
          list={cart}
          renderItem={cartItem => (
            <li key={cartItem.code}>
              <CartItem
                item={list.find(item => item.code === cartItem.code)}
                count={cartItem.count}
                onDeleteItem={onDeleteItem}
              />
            </li>
          )}
        />

        <div className="Cart-total">
          <b>Итого:</b>
          <b>{`${sumPrice.toLocaleString('ru-RU')} ₽`}</b>
        </div>
      </div>
    </div>
  );
}

CartList.propTypes = {
  onDeleteItem: PropTypes.func,
  sumPrice: PropTypes.number,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default CartList;
