import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../cartIcon';
import { plural, formatPrice } from '../../utils';

function Controls({ cartItemsCount, cartTotalPrice, onOpenCart }) {

  return (
    <div className="Controls">
      <button onClick={onOpenCart}>
        <div className="Cart-content">
        <CartIcon />
          <span>
            {cartItemsCount}{' '}
            {plural(cartItemsCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
              other: 'товара',
            })}{' '}
            / </span>
          <span> {formatPrice(cartTotalPrice)} </span>
        </div>
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartItemsCount: PropTypes.number.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

export default React.memo(Controls);
