// components/cart-button/index.js
import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import CarIcon from '../../assets/svg/CartIcon';
import './style.css';

function CartButton({ totalItems, totalAmount, onClick }) {
  return (
    <button className="cart-button" onClick={onClick}>
      <div className="cart-icon">
        <CarIcon/>
      </div>
      {totalItems > 0 ? (
        <div className="cart-info">
          {totalItems} {plural(totalItems, {one: 'товар', few: 'товара', many: 'товаров'})} / {totalAmount.toLocaleString()} ₽
        </div>
      ) : (
        <div className="cart-empty">Пусто</div>
      )}
    </button>
  );
}

CartButton.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default React.memo(CartButton);
