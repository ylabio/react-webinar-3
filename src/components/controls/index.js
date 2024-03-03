import React from "react";
import PropTypes from 'prop-types';
import {plural, numberWithSpaces} from "../../utils";
import './style.css';

function Controls({modalOpen, cart}) {
  
  const cartPrice = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

  return (
    <div className='Controls'>
      <div className='Controls-basket'>
        В корзине: <b>{cart.length ? ` ${cart.length} ${plural(cart.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })}` : '0 товаров'} / {numberWithSpaces(cartPrice)} ₽</b>
      </div>
      <button className='Controls-button' onClick={() => modalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  modalOpen: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired
};

Controls.defaultProps = {
  modalOpen: () => {}
}
export default React.memo(Controls);