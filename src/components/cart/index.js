import React from 'react';
import './style.css';
import Item from '../item/index';
import CancelIcon from '../../assets/icons/Cancel.svg';

function Cart({ toggleCart, cartList, deleteItemCart, total }) {
  return (
    <div className="Cart" onClick={e => e.stopPropagation()}>
      <div className="Cart-close" onClick={toggleCart}>
        <CancelIcon width={32} height={32} fill="blue" />
      </div>
      <div className="Cart-header">
        <span>Корзина</span>
      </div>

      {cartList.length > 0 ? (
        <ul className="Cart-items-list">
          {cartList.map(el => (
            <li key={el.code} className="Cart-items-list-item">
              <Item deleteItemCart={deleteItemCart} itemInCart={true} item={el} />
            </li>
          ))}
          <div className="Cart-footer">
            <div className="Cart-footer-total">
              Итого: <span>{total.toLocaleString()} ₽</span>
            </div>
          </div>
        </ul>
      ) : (
        <p className="Cart-empty">Корзина пуста</p>
      )}
    </div>
  );
}

export default React.memo(Cart);
