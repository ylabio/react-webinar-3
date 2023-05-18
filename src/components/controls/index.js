import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({ onOpenCart, cartItems, totalPrice }){

  return (
    <div className='Controls'>
      <div className='Controls-info'>
        <p>{`В корзине: `}</p>
        {cartItems.length === 0 ? <p className='bold-text'>пусто</p> : <p className='bold-text'>{`${cartItems.length} ${plural(cartItems.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalPrice.toLocaleString()} ₽`}</p>}
      </div>
      <button className='Controls-button' onClick={() => onOpenCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  cartItems: PropTypes.array,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  onOpenCart: () => {},
  cartItems: [],
  totalPrice: 0
}

export default React.memo(Controls);
