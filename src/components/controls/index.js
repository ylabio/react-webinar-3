import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Controls({totalPrice, list, cart}) {
  // const text =
  // totalItemsInCart > 0
  //   ? `В корзине: ${totalItemsInCart ? totalItemsInCart : ''} ${plural(totalItemsInCart, {one: 'товар', few: 'товара', many: 'товаров'})} | Цена: ${totalPrice} ₽`
  //   : 'Пусто ';
  return (
    <div className='Controls'>
      <p className="Controls-cart">В корзине:</p>
      <div className="Controls-total">
        {cart.length === 0 ? ' Пусто' : `${cart.length} ${plural(totalItemsInCart, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalPrice()}₽`}
      </div>
      <button /*onClick={() => onAdd()}*/>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.func,
};


export default React.memo(Controls);
