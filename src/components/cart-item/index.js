import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartItem({item, onDelete}) {

  const cn = bem('CartItem')

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <div>{item.code}</div>
        <div>{item.title}</div>
      </div>
      <div className={cn('right')}>
        <div>{item.price} ₽</div>
        <div>{item.basketCount} шт</div>
        <button onClick={() => onDelete(item.code)}>Удалить</button>
      </div>
    </div>
  )
}

CartItem.PropTypes = {}

export default React.memo(CartItem);