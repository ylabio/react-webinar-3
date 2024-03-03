import React, { useEffect, useState } from "react";
import {plural} from "../../utils"
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd, cart}) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className='Controls'>
      {/* <button onClick={() => onAdd()}>Добавить</button> */}
      <div className="Cart">
        В корзине: <b>{cart.length > 0 ? `${cart.length} ${plural(cart.length, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${totalPrice} ₽` : "пусто"}</b>
      </div>
      <div className="Controls-actions">
        <button>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
