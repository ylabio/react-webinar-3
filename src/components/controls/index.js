import React, { useEffect, useState } from "react";
import {plural} from "../../utils";
import PropTypes from 'prop-types';
import Modal from "../modal"
import './style.css';

function Controls(props) {
  const totalPrice = props.cart.reduce((acc, item) => acc + item.price * item.amount, 0);

  if(!props.isCart){
    return (
      <div className='Controls'>
        <div className="Cart">
          В корзине: <b>{props.cart.length > 0 ? `${props.cart.length} ${plural(props.cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${totalPrice} ₽` : "пусто"}</b>
        </div>
        <div className="Controls-actions">
          <button onClick={props.onToggleModal}>Перейти</button>
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
