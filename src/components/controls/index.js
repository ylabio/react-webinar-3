import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import IconCart from '../icons/icon-cart';

function Controls({ quantity, totalPrice, onCartOpen = () => {} }) {
  const isCartEmpty = quantity === 0;

  return (
    <div className="Controls">
      <button onClick={() => onCartOpen()} disabled={isCartEmpty} >
        <IconCart />
        { !isCartEmpty ? `${quantity} ${plural(quantity, { one: 'товар',  few: 'товара', many: 'товаров', other: 'товаров' })} /
        ${totalPrice} ₽` : 'Пусто' }
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  quantity: PropTypes.string,
  totalPrice: PropTypes.string,
};

export default React.memo(Controls);
