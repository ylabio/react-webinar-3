import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import CartIcon from './cart-icon';
import './style.css';

function Controls({ cartItemsCount, cartTotalPrice, toggleVisible = () => { } }) {
  const cartIcon = CartIcon();

  return (
    <div className="Controls">
      <button className='Controls__cart-visible-btn' onClick={() => toggleVisible()}>
        {cartIcon}
        {cartItemsCount
          ? `${cartItemsCount} ${plural(cartItemsCount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${cartTotalPrice.toLocaleString()} ₽`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartItemsCount: PropTypes.number.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  toggleVisible: PropTypes.func.isRequired,
};

export default React.memo(Controls);
