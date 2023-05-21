import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, getFormattedPrice } from '../../utils';

function Controls({totalPrice, productsAmount, onCartOpen}){
  const cartInfo = productsAmount > 0 ?
    `${productsAmount} ${plural(productsAmount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${getFormattedPrice(totalPrice)}` :
    `пусто`;

  return (
    <div className='Controls'>
      <div className='Controls-info'>В корзине: <b>{cartInfo}</b></div>
      <button onClick={onCartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  productsNumber: PropTypes.number,
  totalPrice: PropTypes.number,
  onCartOpen: PropTypes.func,
};

Controls.defaultProps = {
  cartTotal: {productsAmount: 0, totalPrice: 0},
  onCartOpen: () => {}
}

export default React.memo(Controls);
