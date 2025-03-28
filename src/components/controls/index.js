import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../shared/icons/cart-icon';
import { plural } from '../../utils';

function Controls({ totalPrice, totalCartCount, onOpenModal = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={() => onOpenModal()}>
        <CartIcon />

        {totalCartCount
          ? `${totalPrice} ₽ / ${totalCartCount} ${plural(totalCartCount, { one: 'товар', few: 'товара', many: 'товаров' })}`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  totalPrice: PropTypes.number,
  totalCartCount: PropTypes.number,
  onOpenModal: PropTypes.func,
};

export default React.memo(Controls);
