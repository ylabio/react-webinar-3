import React from 'react';
import './style.css';
import Item from '../item';

function Cart({ data, onClose, onDeleteItem }) {
  const total = data.reduce((acc, el) => el.price * el.quantity, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-content">
        <div className="cart-header">
          <p>Корзина</p>
          <div className="cart-close" onClick={onClose}></div>
        </div>
        <ul className="List cart-list">
          {data.map(item => (
            <li key={item.code} className="List-item">
              <Item item={item} onDelete={onDeleteItem} isCartItem={true} className="cart-item" />
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <p>
            <strong>Итого:</strong>
          </p>
          <p>
            <strong>{total} ₽</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
