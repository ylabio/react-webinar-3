import React from 'react';
import { numberFormat } from '../../../utils';
import Controls from '../../controls';
import './style.css';

export const CartItem = (props) => {

  return (
    <li className='Cart-item'>
      <div className='Cart-item-code'>
        {props.item.code}
      </div>
      <div className='Cart-item-title'>
        {props.item.title}
      </div>
      <div className='Cart-item-price'>
        {`${numberFormat(props.item.price)} \u20bd`}
      </div>
      <div className="Cart-item-count">
        {`${props.item.count} шт`}
      </div>
      <Controls
        innerText='Удалить'
        onClick={() => props.onDeleteItem(props.item.code)}
      />
    </li>
  )
}