import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { CURRENCY } from '../../constants';

function Cart({ store }) {
  const cart = store.getCart();
  const sum = store.getCartSum();
  const cartItems = useMemo(() => Object.values(cart), [cart]);

  return (
    <div className="Cart">
      <h2 className="Cart__title">Корзина</h2>
      <ul className="List Cart-list">
        {!cartItems.length && <div>Пусто</div>}
        {cartItems.map(el => (
          <li key={el.code} className="List-item">
            <div className="Item">
              <div className="Item-title">
                <b>{el.title}</b>
              </div>
              <div className="Item-body">
                <div className="Item-text">{el.count} шт</div>
                <div className="Item-price">{el.price} {CURRENCY}</div>
              </div>
              <button className="Cart__btn" onClick={() => store.deleteItemFromCart(el.code)}>
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="Cart__total">
        <div className="Total-container">
          <div>Итого:</div>
          <div>{sum} {CURRENCY}</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
