import React, { useEffect, useState } from "react";
import {plural} from "../../utils";
import PropTypes from 'prop-types';
import Modal from "../modal"
import './style.css';

function Controls({onToggleModal, cart, isCart}) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

  if(!isCart){
    return (
      <div className='Controls'>
        <div className="Cart">
          В корзине: <b>{cart.length > 0 ? `${cart.length} ${plural(cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${totalPrice} ₽` : "пусто"}</b>
        </div>
        <div className="Controls-actions">
          <button onClick={onToggleModal}>Перейти</button>
        </div>
      </div>
    )
  }
  return(
    <div className="Controls"></div>
  )
}

Controls.propTypes = {
  onToggleModal: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired
};

Controls.defaultProps = {
  onToggleModal: () => {}
}

export default React.memo(Controls);
