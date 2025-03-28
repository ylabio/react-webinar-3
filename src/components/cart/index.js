import React from 'react';
import './style.css';
import Item from '../item';

function Cart({ data, onClose, onDeleteItem }) {
  const total = data.reduce((acc, el) => el.price * el.quantity, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p>Корзина</p>
          <div className="modal-close" onClick={onClose}>
            &times;
          </div>
        </div>
        <ul className="List">
          {data.map(item => (
            <li key={item.code} className="List-item">
              <Item item={item} onDelete={onDeleteItem} isCartItem={true} />
            </li>
          ))}
        </ul>
        <p className="cart-total">Итого: {total} ₽</p>
      </div>
    </div>
  );
}

export default Cart;
