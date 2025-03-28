import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import IconCart from '../icon-cart';

function Controls({ cart, onCartOpen = () => {} }) {
  const cartItemsCount = cart.length;
  const isCartEmpty = cartItemsCount === 0;
  const totalPrice = cart.reduce((acc, i) => acc += (i.price * i.addedToCartCount), 0);
  return (
    <div className="Controls">
      <button onClick={() => onCartOpen()} disabled={isCartEmpty} >
        <IconCart />
        { !isCartEmpty ? `${cartItemsCount} ${plural(cartItemsCount, { one: 'товар',  few: 'товара', many: 'товаров', other: 'товаров' })} /
        ${totalPrice} ₽` : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  cart: PropTypes.object,
};

export default React.memo(Controls);
