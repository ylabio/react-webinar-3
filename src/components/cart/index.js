import React from 'react';
import PropTypes from 'prop-types';
import cart from '../../images/cart.svg';
import { plural } from '../../utils';
import './style.css';

function Cart({ totalPrice = 0, itemsCount = 0 }) {
  return (
    <div className="Cart">
      <div className="Cart-info">
        <img src={cart} alt="Значок корзины" />
        <div className="Cart-info_info">
          {!itemsCount
            ? 'Пусто'
            : `${itemsCount} ${plural(itemsCount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${totalPrice} \u20BD`}
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
};

export { Cart };
