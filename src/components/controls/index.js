import React, { useEffect, useState } from "react";
import {plural} from "../../utils";
import PropTypes from 'prop-types';
import Modal from "../modal"
import './style.css';

function Controls(props) {

  if(props.amount != undefined){
    return (
      <div className='Controls'>
        <div className="Cart">
          В корзине: <b>{props.amount > 0 ? `${props.amount} ${plural(props.amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${props.totalPrice} ₽` : "пусто"}</b>
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
