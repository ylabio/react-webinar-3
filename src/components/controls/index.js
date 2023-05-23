import React from "react";
import PropTypes from 'prop-types';
import { declOfNum } from '../../utils'
import './style.css';

function Controls({setActive, productsCount, productsPrice}){

  return (
    <div className='Controls'>
      <p className='Controls__backet-info'>
        В корзине:{productsCount?<span className='Controls__price'>{`${productsCount} ${declOfNum(productsCount, ['товар', 'товара', 'товаров'])} / ${Intl.NumberFormat('ru-RU').format(productsPrice)} ₽`}</span>:  <span className='Controls__price'>{`пусто`}</span>}
      </p>
      <button className="Controls__close-btn" onClick={() => setActive(true)}>Перейти</button>
    </div>
  )
}


Controls.propTypes = {
  setActive: PropTypes.func,
  productsCount: PropTypes.number,
  productsPrice:  PropTypes.number
};

export default React.memo(Controls);
