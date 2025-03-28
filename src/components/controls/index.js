import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from '../icons/cart-icon';
import { localeNumber, plural } from '../../utils';

function Controls({ onModalOpen = () => {}, store }) {
  const cartPrice = store.getCartPrice();
  const cartItem = store.getCartItem();

  return (
    <div className="Controls">
      <button className="Controls-button" onClick={() => onModalOpen()}><CartIcon />{cartPrice === 0 ? 'Пусто' : `${cartItem} ${plural(cartItem, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${localeNumber(cartPrice)} ₽`}</button>
    </div>
  );
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
  getCartPrice: PropTypes.func,
};

export default React.memo(Controls);
