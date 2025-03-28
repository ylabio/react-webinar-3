import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cart({ cart = [], onRemoveItem = () => {}, totalPrice = 0 }) {
  return (
    <div className="Cart">
      <h2>Корзина</h2>
      <ul className="Cart-list">
        {cart.length > 0 ? (
          cart.map(item => (
            <li key={item.code} className="Cart-item">
              <span className='Cart-item-title'>{item.title}</span>
              <span className='Cart-item-quantity'>{item.quantity + ' ' + 'шт'}</span>
              <span className='Cart-item-price'>{new Intl.NumberFormat('ru-RU').format(item.price)} ₽</span>
              <button onClick={() => onRemoveItem(item.code)} className="Cart-remove">
                Удалить
              </button>
            </li>
          ))
        ) : (
          <p>Корзина пуста</p>
        )}
      </ul>
      <div className="Cart-total">
        <span className='Cart-total-total'>{'Итого: '}</span>
        <span className='Cart-total-price'>{' ' + new Intl.NumberFormat('ru-RU').format(totalPrice) + '₽'}</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Cart;
