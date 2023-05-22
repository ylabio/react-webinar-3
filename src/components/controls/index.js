import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

function Controls({onTaggle, basket}){
  let amount = basket.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className='Controls'>
      <div className='Controls-stat'>
        В корзине: <span className="Controls-products">{basket.length ? `${basket.length} ${plural(basket.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${amount.toLocaleString()} ₽` : 'пусто'}</span>
      </div>
      <button onClick={() => onTaggle()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onTaggle: PropTypes.func
};

Controls.defaultProps = {
  onTaggle: () => {}
}

export default React.memo(Controls);
