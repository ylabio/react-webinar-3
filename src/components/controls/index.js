import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {getNumberFormat, plural} from "../../utils";

function Controls({onOpenModal, totalPriceCart, countItemCart}){
    return (
    <div className='Controls'>
      <div className='Controls-cart-info'>
        <p>В корзине: <strong>{countItemCart ? `${countItemCart} ${plural(countItemCart, {one: 'товар', few: 'товара', many: 'товаров'})} / ${getNumberFormat(totalPriceCart)} ₽  ` : 'пусто'}</strong></p>
      </div>
      <button className='Controls-btn' onClick={() => onOpenModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
    onOpenModal: PropTypes.func,
    totalPriceCart: PropTypes.number,
    countItemCart: PropTypes.number,
};

Controls.defaultProps = {
    onOpenModal: () => {}
};

export default React.memo(Controls);
