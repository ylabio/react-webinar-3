import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls(props){
  return (
    <div className='Controls'>
      <div className='Item-basket'>{'В корзине: '}</div>
        <div className='Item-basket'>
          {props.calculatePrice > 0 ?
            <span className={'textBold'}> {props.totalGoods} {plural(props.totalGoods, {one: 'товар', few: 'товара', many:'товаров'})} / {props.calculatePrice} ₽ </span>
            : <span className={'textBold'}> пусто </span>}
        </div>
      <button
          onClick={() => props.setActive(true)}
          className='Basket-actions'>
          Перейти
      </button>
    </div>
  )
}

Controls.propTypes = {
  calculatePrice: PropTypes.number,
  setActive: PropTypes.func,
  totalGoods:PropTypes.number
};

Controls.defaultProps = {
  setActive: () => {},
}

export default React.memo(Controls);
