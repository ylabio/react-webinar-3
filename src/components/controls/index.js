import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../shared/icons/cart-icon';
import { plural } from '../../utils';

function Controls({ totalPrice, cartItemsCount, onOpenModal = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={() => onOpenModal()}>
        <CartIcon />

        {cartItemsCount
          ? `${Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(totalPrice)} / ${cartItemsCount} ${plural(cartItemsCount, { one: 'товар', few: 'товара', many: 'товаров' })}`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  totalPrice: PropTypes.number,
  cartItemsCount: PropTypes.number,
  onOpenModal: PropTypes.func,
};

export default React.memo(Controls);
