import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Item from '../item/index';

function CartPopup({ cart, onClose, onRemoveItem }) {
  return (
    <div className="CartPopup__overlay">
      <div className="CartPopup">
        <h2 className="CartPopup__title">Корзина</h2>
        <div className="CartPopup__items">
          {cart.map(item => (
            <Item
              key={item.code}
              item={{ ...item, quantity: item.quantity || 1 }}
              mode="cart"
              showQuantity={true}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
        <div className="CartPopup__total">
          Итого: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('ru-RU')} &#8381;
        </div>
        <button className="CartPopup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

CartPopup.propTypes = {
  cart: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default CartPopup;
