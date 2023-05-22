import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";
import {memo} from "react";

function Controls({uniqTotal, cartSum, setShowCart}){
  const status = uniqTotal + " " +
    plural(uniqTotal, {one: 'товар', few: 'товара', many: 'товаров'}) + " / " +
    cartSum.toLocaleString('ru-RU') + " ₽"
  return (
    <div className='Controls'>
      <span>
        В корзине:<span className='Controls-status'>{uniqTotal > 0 ? status : 'пусто'}</span>
      </span>
      <button onClick={() => setShowCart(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  uniqTotal:PropTypes.number,
  cartSum:PropTypes.number,
  setShowCart:PropTypes.func
};

export default memo(Controls);