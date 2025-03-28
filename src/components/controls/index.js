import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../shared/icons/cart-icon';
import { plural } from '../../utils';

function Controls({ totalPrice, totalCartCount }) {
  return (
    <div className="Controls">
      <button>
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
};

export default React.memo(Controls);
