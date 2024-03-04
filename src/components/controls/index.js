import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, numberFormat } from "../../utils";

function Controls({ cart, openModal }) {
  return (
    <div className='Controls'>
      <div className="Controls-cart">
        <span>В корзине: <b>{cart.items.length ? `${cart.items.length} ${plural(cart.items.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${numberFormat(cart.sum)} ₽` : "пусто"}</b></span>
      </div>
      <button onClick={() => openModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default React.memo(Controls);
