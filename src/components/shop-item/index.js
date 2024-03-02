import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ShopItem({ item, onAdd }) {

  const cn = bem('ShopItem')

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <div>{item.code}</div>
        <div>{item.title}</div>
      </div>
      <div className={cn('right')}>
        <div>{item.price} ₽</div>
        <button onClick={() => onAdd(item.code)}>Добавить</button>
      </div>
    </div>
  )
}

ShopItem.PropTypes = {}

export default React.memo(ShopItem);