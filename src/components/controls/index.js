import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls(props){

    let  totalGoods = props.basket.length ?
        props.basket.reduce((acc, curr)=>{return acc + curr.quantity},0)
    : 0


  return (
    <div className='Controls'>
      <div className='Item-basket'>{'В корзине: '}</div>
          <div className='Item-basket'>
              {props.calculatePrice > 0 ?
                  <span className={'textBold'}> {totalGoods} {plural(totalGoods, {one: 'товар', few: 'товара', many:'товаров'})} / {props.calculatePrice} ₽ </span>
                  : <span className={'textBold'}> пусто </span>
              }

          </div>


      <button
          // onClick={() => onAdd()}
          className='Basket-actions'>
          Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  calculatePrice: PropTypes.number,
  basket: PropTypes.array,
    // onAdd: PropTypes.func,
};

Controls.defaultProps = {
  // onAdd: () => {},
}

export default React.memo(Controls);
