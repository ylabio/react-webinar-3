import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import CartIcon from './cart-icon';

function Controls({ totalUniqueItems = 0, totalPrice = 0, onOpenModal = () => {} }) {
  return (
    <div className="Controls">
      <div
        className="Controls-container"
        onClick={() => {
          if (totalUniqueItems > 0) {
            onOpenModal(true);
          }
        }}
      >
        <CartIcon />

        {totalUniqueItems === 0 && <b>Пусто</b>}
        {totalUniqueItems > 0 && (
          <b>{`${totalUniqueItems} ${plural(totalUniqueItems, {
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
  totalUniqueItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default memo(Controls);
