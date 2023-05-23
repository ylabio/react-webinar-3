import React from 'react';
import {numberFormat, plural} from "../../utils";
import Controls from "../controls/index";
import './style.css';

export const CartBlock = (props) => {

  return (
    <div className='Cart-block'>
      <div>
        В корзине:
        <span className='Cart-block-text'>
          {
            props.cartItemsCount ? 
              ` ${props.cartItemsCount} ${plural(props.cartItemsCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${numberFormat(props.cartItemsPrice)} \u20bd`
              : 
              ' пусто'
          }
        </span>
      </div>
      <Controls 
        innerText='Перейти'
        onClick={() => props.setIsCartShow(true)}
      />
    </div>
  )
}