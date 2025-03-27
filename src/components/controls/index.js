import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import CartIcon from './cart-icon';
import './style.css';

function Controls({ cart = [], onVisible = () => { } }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const cartIcon = CartIcon();

  return (
    <div className="Controls">
      <button className='Controls__cart-visible-btn' onClick={() => onVisible()}>
        {cartIcon}
        {cart.length
          ? `${cart.length} ${plural(cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${totalPrice.toLocaleString()} ₽`
          : 'Пусто'}
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
  onVisible: PropTypes.func,
};

export default React.memo(Controls);
