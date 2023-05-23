import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onModalOpen, totalPrice, cart}) {

  return (
    <div className='Controls'>
      <p className='controls-title'>В корзине:<span
        className='controls-counter'>{cart.length > 0 ? `${cart.length} ${plural(cart.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${totalPrice.toLocaleString()} ₽` : 'пусто'}</span></p>
      <button onClick={() => onModalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: PropTypes.func,
  totalPrice: PropTypes.number,
  cart: PropTypes.array
};

Controls.defaultProps = {
  onModalOpen: () => {
  },
  totalPrice: 0,
  cart: []
}

export default React.memo(Controls);
