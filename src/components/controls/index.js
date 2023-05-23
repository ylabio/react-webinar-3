import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Cart from "../cart";
import { plural } from "../../utils";

function Controls({sumFromCart, toggleShow, count}){

  return (
    <div className='Controls'>
      <span className="products-sum">В корзине: <b> { count ? count + ' ' + plural(count, {one: 'товар', few: 'товара', many: 'товаров'}) + ' / ' + sumFromCart.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ') + ' ₽' : ' пусто ' }</b></span>
      <button onClick={toggleShow}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  toggleShow: PropTypes.func
};

Controls.defaultProps = {
  toggleShow: () => {}
}

export default React.memo(Controls);
