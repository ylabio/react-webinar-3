import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, formatPrice, getTotalPrice } from '../../utils';

function Cart({ cartList, openModal = () => {} }) {
  return (
    <div className="Cart">
      <button onClick={openModal}>{
      cartList.length === 0 ?
      'Пусто' : 
      `${cartList.length} ${plural(cartList.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${formatPrice(getTotalPrice(cartList))}`
    }</button>
    </div>
  );
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })).isRequired,
  openModal: PropTypes.func,
};


export default React.memo(Cart);
