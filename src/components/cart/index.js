import React from 'react';
import PropTypes from 'prop-types';
import CartIcon from '../cart-icon/index';
import { plural, productsPlural } from '../../utils';
import { numberFormat } from '../../utils';
import './style.css';

function Cart({ totalPrice, totalItems, onCartClick }) {
  return (
    <div className="Cart">
      <div className="Cart-container">
        <button onClick={onCartClick}>
          <CartIcon />
          {totalItems
            ? `${totalItems} ${plural(totalItems, productsPlural)} / ${numberFormat(totalPrice)} ₽`
            : 'Пусто'}
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default React.memo(Cart);
