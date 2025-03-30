import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import CartIcon from './cart-icon';

function Controls({ totalPrice = 0, onOpenModal = () => {}, countCart = 0 }) {
  return (
    <div className="Controls">
      <div
        className="Controls-container"
        onClick={() => {
          if (countCart > 0) {
            onOpenModal(true);
          }
        }}
      >
        <CartIcon />

        {countCart === 0 && <b>Пусто</b>}
        {countCart > 0 && (
          <b>{`${countCart} ${plural(countCart, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${totalPrice.toLocaleString('ru-RU')} ₽`}</b>
        )}
      </div>
    </div>
  );
}

Controls.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  countCart: PropTypes.number.isRequired,
};

export default memo(Controls);
