import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({ cartPrice, cartLength, setModalActive }) {
  return (
    <div className='Controls'>
      <div className='Controls-cart'>
        <span>В корзине:<b>{cartLength ? ` ${cartLength} ${plural(cartLength, {one: 'товар', few: 'товара', many: 'товаров'})} / ${cartPrice.toLocaleString() + ' ₽'}` : ' пусто'}</b></span>
      </div>
      <button onClick={() => setModalActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.array,
};


export default React.memo(Controls);
