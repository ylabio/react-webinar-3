import React from 'react';
import PropTypes from 'prop-types';
import cart from '../../assets/images/cart.svg'
import { plural, formatPrice } from '../../utils';
import './style.css';

function Cart({ totalPrice = 0, itemsCount = 0, onShowModal }) {
  return (
    <div className="Cart">
      <div className="Cart-info" onClick={onShowModal}>
        <img src={cart} alt="Корзина" />
        <div className="Cart-info_info">
          {!itemsCount
            ? 'Пусто'
            : `${itemsCount} ${plural(itemsCount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${formatPrice(totalPrice)}`}
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onShowModal: PropTypes.func.isRequired,
};

export { Cart };