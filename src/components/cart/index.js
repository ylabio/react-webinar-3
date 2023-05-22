import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Cart({ setActive, count, total }) {
  return (
    <div className='cart'>
      <div className='cart-row' >
        В корзине:
        {count ?
          <span>{` ${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${total} ₽`}</span>
          :
          <span> пусто</span>
        }
      </div>
      <button onClick={() => setActive(true)}>Перейти</button>
    </div>
  )
}

Cart.propTypes = {
  setActive: PropTypes.func,
  count: PropTypes.number,
  total: PropTypes.number
};
Cart.defaultProps = {
  setActive: () => { }
}

export default React.memo(Cart);
