import React from 'react';
import { numberFormat } from '../../../utils';
import './style.css';

export const CartTotalPrice = (props) => {

  return ( props.cartItemsPrice ?
    <div className='Cart-total-price'>
      <span className='price-text'>Итого</span>
      {`${numberFormat(props.cartItemsPrice)} \u20bd`}
    </div>
    :
    <h2 className='Cart-empty'>Корзина пуста</h2>
  )
}